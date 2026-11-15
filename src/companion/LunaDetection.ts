
import { Vector3 } from '@babylonjs/core';
import { LunaFollower } from './LunaFollower.ts';
import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';

export interface DetectionState {
  detectedArtifact: ArtifactDefinition | null;
  distance: number;
  signalStrength: number;
  canInteract: boolean;
}

export class LunaDetection {
  private lunaFollower: LunaFollower;

  private detectionRadius: number = 32.0;
  private interactRadius: number = 4.8;

  private currentDetected: ArtifactDefinition | null = null;
  private hasAlertedForCurrent: boolean = false;

  // Audio radar ping
  private audioCtx: AudioContext | null = null;
  private lastPingTime: number = 0;

  // Track currently playing radar sounds
  private activeOscillators: Set<OscillatorNode> = new Set();

  // Radar control
  private radarMuted: boolean = false;

  // UI callbacks
  private onAlertCallback?: (message: string) => void;

  constructor(
    lunaFollower: LunaFollower,
    onAlert?: (message: string) => void
  ) {
    this.lunaFollower = lunaFollower;
    this.onAlertCallback = onAlert;
  }

  // --------------------------------------------------
  // AUDIO INITIALIZATION
  // --------------------------------------------------

  private initAudio(): void {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as {
          webkitAudioContext: typeof AudioContext;
        }).webkitAudioContext;

      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume();
    }
  }

  // --------------------------------------------------
  // RADAR PING
  // --------------------------------------------------

  private playRadarPing(
    pitchMultiplier: number = 1.0
  ): void {
    try {
      // Do not play if radar has been muted.
      if (this.radarMuted) return;

      this.initAudio();

      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.type = 'sine';

      const now = this.audioCtx.currentTime;
      const freq = 520 + pitchMultiplier * 400;

      osc.frequency.setValueAtTime(freq, now);

      osc.frequency.exponentialRampToValueAtTime(
        freq + 150,
        now + 0.08
      );

      gain.gain.setValueAtTime(0.04, now);

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.12
      );

      // Track active oscillator.
      this.activeOscillators.add(osc);

      osc.onended = () => {
        this.activeOscillators.delete(osc);

        osc.disconnect();
        gain.disconnect();
      };

      osc.start(now);
      osc.stop(now + 0.14);

    } catch {
      // Audio failed silently.
    }
  }

  // --------------------------------------------------
  // STOP RADAR SOUND
  // --------------------------------------------------

  public stopRadarPing(): void {
    // Prevent any further pings for this artifact.
    this.radarMuted = true;

    // Immediately stop all currently playing pings.
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // Oscillator may already be stopped.
      }
    });

    this.activeOscillators.clear();

    console.log('Luna radar ping stopped.');
  }

  // --------------------------------------------------
  // RESUME RADAR SOUND
  // --------------------------------------------------

  public resumeRadarPing(): void {
    this.radarMuted = false;
    this.lastPingTime = 0;
  }

  // --------------------------------------------------
  // TOGGLE SENSOR AUDIO MUTE
  // --------------------------------------------------

  public toggleMute(): boolean {
    if (this.radarMuted) {
      this.resumeRadarPing();
      return false;
    } else {
      this.stopRadarPing();
      return true;
    }
  }

  public isMuted(): boolean {
    return this.radarMuted;
  }

  // --------------------------------------------------
  // UPDATE DETECTION
  // --------------------------------------------------

  public update(
    playerPos: Vector3,
    artifacts: ArtifactDefinition[],
    getPosition?: (id: string) => Vector3 | undefined
  ): DetectionState {

    let closestArtifact: ArtifactDefinition | null = null;
    let minDistance = Infinity;

    for (const art of artifacts) {

      if (art.isCollected) continue;

      let artPos: Vector3 | undefined =
        getPosition?.(art.id);

      if (!artPos) {
        // Fallback default coordinates.
        if (art.id === 'a11-lm5-descent') {
          artPos = new Vector3(32, 0, 22);
        } else if (art.id === 'a12-lm6-ascent') {
          artPos = new Vector3(-28, 0, 32);
        } else if (art.id === 'a15-lm10-ascent') {
          artPos = new Vector3(14, 0, -38);
        } else {
          artPos = new Vector3(0, 0, 0);
        }
      }

      const dist = Vector3.Distance(
        playerPos,
        artPos
      );

      if (dist < minDistance) {
        minDistance = dist;
        closestArtifact = art;
      }
    }

    // --------------------------------------------------
    // ARTIFACT DETECTED
    // --------------------------------------------------

    if (
      closestArtifact &&
      minDistance <= this.detectionRadius
    ) {

      const signalStrength = Math.max(
        0,
        1 - (minDistance / this.detectionRadius)
      );

      // A new artifact has been detected.
      if (
        this.currentDetected?.id !== closestArtifact.id
      ) {
        this.currentDetected = closestArtifact;
        this.hasAlertedForCurrent = false;

        // Enable radar for the newly detected artifact.
        this.resumeRadarPing();
      }

      // Visual reaction from Luna.
      this.lunaFollower.setExpression('alert');

      // Periodic audio radar ping.
      // Only play if radar has not been muted.
      if (!this.radarMuted) {

        const now = performance.now();

        const pingInterval =
          500 + (1 - signalStrength) * 1200;

        if (
          now - this.lastPingTime > pingInterval
        ) {
          this.playRadarPing(signalStrength);
          this.lastPingTime = now;
        }
      }

      // First-time vocal alert from Luna.
      if (!this.hasAlertedForCurrent) {

        this.hasAlertedForCurrent = true;

        if (this.onAlertCallback) {
          this.onAlertCallback(
            `"Explorer! I'm detecting an unusual metallic signature nearby!"`
          );
        }
      }

      return {
        detectedArtifact: closestArtifact,
        distance: minDistance,
        signalStrength: signalStrength,
        canInteract: minDistance <= this.interactRadius,
      };

    } else {

      // No artifact detected.
      if (this.currentDetected) {

        this.currentDetected = null;
        this.hasAlertedForCurrent = false;

        // Allow radar to work for the next detection.
        this.resumeRadarPing();

        this.lunaFollower.setExpression('neutral');
      }

      return {
        detectedArtifact: null,
        distance: Infinity,
        signalStrength: 0,
        canInteract: false,
      };
    }
  }

  // --------------------------------------------------
  // DISPOSE AUDIO
  // --------------------------------------------------

  public dispose(): void {
    this.stopRadarPing();

    if (this.audioCtx) {
      void this.audioCtx.close();
      this.audioCtx = null;
    }
  }
}
