
import { Vector3 } from '@babylonjs/core';
import { LunaFollower } from './LunaFollower.ts';
import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';
import { SettingsManager } from '../systems/SettingsManager.ts';

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

  // Investigation/interaction lock — set when E is pressed at a probe.
  // Prevents auto-resume logic from restarting pings during investigation.
  private investigationMuted: boolean = false;

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

      const sfxVol = SettingsManager.getInstance().getEffectiveSfxVolume();
      if (sfxVol <= 0.001) return;

      gain.gain.setValueAtTime(0.04 * sfxVol, now);

      gain.gain.exponentialRampToValueAtTime(
        0.001 * sfxVol,
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
  // STOP ACTIVE OSCILLATORS
  // --------------------------------------------------

  public stopActiveOscillators(): void {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // Oscillator may already be stopped.
      }
    });
    this.activeOscillators.clear();
  }

  // --------------------------------------------------
  // STOP RADAR SOUND
  // --------------------------------------------------

  public stopRadarPing(): void {
    // Prevent any further pings for this artifact.
    this.radarMuted = true;
    this.stopActiveOscillators();
    console.log('Luna radar ping stopped.');
  }

  // --------------------------------------------------
  // STOP RADAR DUE TO INVESTIGATION (E pressed at probe)
  // Sets the investigation lock so auto-resume cannot re-enable pings.
  // --------------------------------------------------

  public stopRadarForInvestigation(): void {
    this.investigationMuted = true;
    this.stopActiveOscillators();
    console.log('Luna radar ping locked for investigation.');
  }

  // --------------------------------------------------
  // RESUME RADAR SOUND
  // --------------------------------------------------

  public resumeRadarPing(): void {
    // Only resume if the investigation lock is not active.
    if (this.investigationMuted) return;
    this.radarMuted = false;
    this.lastPingTime = 0;
  }

  // --------------------------------------------------
  // RESUME RADAR FOR A NEW SEARCH SEQUENCE
  // Clears the investigation lock and re-enables pings.
  // Call this when a new artifact search begins or artifact is collected.
  // --------------------------------------------------

  public resumeRadarForNewSearch(): void {
    this.investigationMuted = false;
    this.radarMuted = false;
    this.lastPingTime = 0;
    console.log('Luna radar ping resumed for new search.');
  }

  // --------------------------------------------------
  // TOGGLE SENSOR AUDIO MUTE
  // --------------------------------------------------

  public toggleMute(): boolean {
    if (this.radarMuted || this.investigationMuted) {
      this.resumeRadarForNewSearch();
      return false;
    } else {
      this.stopRadarPing();
      return true;
    }
  }

  public isMuted(): boolean {
    return this.radarMuted || this.investigationMuted;
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
      // Only play if radar has not been muted, investigation lock is not active,
      // and the player has not yet reached the site's interaction radius.
      if (!this.radarMuted && !this.investigationMuted && minDistance > this.interactRadius) {

        const now = performance.now();

        const pingInterval =
          500 + (1 - signalStrength) * 1200;

        if (
          now - this.lastPingTime > pingInterval
        ) {
          this.playRadarPing(signalStrength);
          this.lastPingTime = now;
        }
      } else if (minDistance <= this.interactRadius) {
        // Automatically deactivate active detection pings when player reaches the site
        this.stopActiveOscillators();
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
