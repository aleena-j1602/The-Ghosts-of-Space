import { Vector3 } from '@babylonjs/core';
import { LunaFollower } from './LunaFollower.ts';
import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';

export interface DetectionState {
  detectedArtifact: ArtifactDefinition | null;
  distance: number;
  signalStrength: number; // 0 to 1
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

  // UI callbacks
  private onAlertCallback?: (message: string) => void;

  constructor(lunaFollower: LunaFollower, onAlert?: (message: string) => void) {
    this.lunaFollower = lunaFollower;
    this.onAlertCallback = onAlert;
  }

  private initAudio(): void {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playRadarPing(pitchMultiplier: number = 1.0): void {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.type = 'sine';
      const now = this.audioCtx.currentTime;
      const freq = (520 + pitchMultiplier * 400);

      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq + 150, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // Audio failed silently
    }
  }

  public update(
    playerPos: Vector3,
    artifacts: ArtifactDefinition[],
    getPosition?: (id: string) => Vector3 | undefined
  ): DetectionState {
    let closestArtifact: ArtifactDefinition | null = null;
    let minDistance = Infinity;

    for (const art of artifacts) {
      if (art.isCollected) continue;

      let artPos: Vector3 | undefined = getPosition?.(art.id);
      if (!artPos) {
        // Fallback default coordinates if resolver is not provided
        if (art.id === 'a11-lm5-descent') artPos = new Vector3(32, 0, 22);
        else if (art.id === 'a12-lm6-ascent') artPos = new Vector3(-28, 0, 32);
        else if (art.id === 'a15-lm10-ascent') artPos = new Vector3(14, 0, -38);
        else artPos = new Vector3(0, 0, 0);
      }

      const dist = Vector3.Distance(playerPos, artPos);

      if (dist < minDistance) {
        minDistance = dist;
        closestArtifact = art;
      }
    }

    if (closestArtifact && minDistance <= this.detectionRadius) {
      // Compute signal strength (1.0 at 0m, 0.0 at 32m)
      const signalStrength = Math.max(0, 1 - (minDistance / this.detectionRadius));

      if (this.currentDetected?.id !== closestArtifact.id) {
        this.currentDetected = closestArtifact;
        this.hasAlertedForCurrent = false;
      }

      // Visual reaction from Luna
      this.lunaFollower.setExpression('alert');

      // Periodic audio radar ping based on proximity
      const now = performance.now();
      const pingInterval = 500 + (1 - signalStrength) * 1200; // Faster pings as player gets closer
      if (now - this.lastPingTime > pingInterval) {
        this.playRadarPing(signalStrength);
        this.lastPingTime = now;
      }

      // First-time vocal alert from Luna
      if (!this.hasAlertedForCurrent) {
        this.hasAlertedForCurrent = true;
        if (this.onAlertCallback) {
          this.onAlertCallback(`"Explorer! I'm detecting an unusual metallic signature nearby!"`);
        }
      }

      return {
        detectedArtifact: closestArtifact,
        distance: minDistance,
        signalStrength: signalStrength,
        canInteract: minDistance <= this.interactRadius,
      };
    } else {
      if (this.currentDetected) {
        this.currentDetected = null;
        this.hasAlertedForCurrent = false;
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
}
