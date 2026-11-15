import { GameState } from '../core/GameState.ts';
import { Vector3 } from '@babylonjs/core';
import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';

export class HUD {
  private container: HTMLElement;
  private gameState: GameState;

  // Elements
  private missionDayEl!: HTMLElement;
  private energyFillEl!: HTMLElement;
  private suitFillEl!: HTMLElement;
  private lunaFillEl!: HTMLElement;
  private capacityFillEl!: HTMLElement;
  private coordsEl!: HTMLElement;
  private progressCountEl!: HTMLElement;

  // Proximity & Interaction Widgets
  private radarWidget!: HTMLElement;
  private radarDistanceEl!: HTMLElement;
  private radarFillEl!: HTMLElement;
  private interactPrompt!: HTMLElement;
  private interactNameEl!: HTMLElement;
  private lunaAlertBubble!: HTMLElement;
  private lunaAlertText!: HTMLElement;

  // Shuttle Option Card
  private returnToShuttleCard!: HTMLElement;
  private shuttleCardTitle!: HTMLElement;
  private shuttleCardSub!: HTMLElement;
  private btnReturnShuttle!: HTMLElement;
  private onReturnToShuttleCallback?: () => void;

  private onMapClickCallback?: () => void;
  private onToggleSensorMuteCallback?: () => void;
  private levelTagEl!: HTMLElement;
  private levelTitleEl!: HTMLElement;

  private radarMuteBtn: HTMLElement | null = null;
  private radarMuteIcon: HTMLElement | null = null;
  private radarMuteText: HTMLElement | null = null;
  private guideMuteBtn: HTMLElement | null = null;
  private guideMuteIcon: HTMLElement | null = null;
  private guideMuteStatus: HTMLElement | null = null;

  private minimapCanvas: HTMLCanvasElement | null = null;
  private minimapCtx: CanvasRenderingContext2D | null = null;

  // Numerical indicator elements
  private suitPctEl!: HTMLElement;
  private energyPctEl!: HTMLElement;
  private lunaPctEl!: HTMLElement;
  private capacityPctEl!: HTMLElement;

  // Minimap tracking state
  private artifacts: ArtifactDefinition[] = [];
  private getArtifactPosition?: (id: string) => Vector3 | undefined;
  private detectedArtifact: ArtifactDefinition | null = null;
  private lastPlayerPos: Vector3 = new Vector3(0, 0, 0);
  private lastPlayerForward: Vector3 = new Vector3(0, 0, 1);

  constructor() {
    this.gameState = GameState.getInstance();

    this.container = document.createElement('div');
    this.container.id = 'game-hud';
    this.container.className = 'game-hud hidden';

    this.container.innerHTML = `
      <!-- Top Left: Mission & Level Info -->
      <div class="hud-top-left glass-card">
        <div id="hud-level-tag" class="hud-level-tag">SECTOR // MOON &bull; MARE TRANQUILLITATIS</div>
        <div id="hud-level-title" class="hud-level-title">LEVEL 1: THE SILENT MOON</div>
        <div class="hud-mission-stats">
          <div class="stat-badge">
            <span class="label">MISSION DAY</span>
            <span id="hud-mission-day" class="val highlight-amber">1 / 15</span>
          </div>
          <div class="stat-badge">
            <span class="label">ARTIFACTS RECOVERED</span>
            <span id="hud-artifact-progress" class="val highlight-cyan">0 / 3</span>
          </div>
        </div>
      </div>

      <!-- Top Right: Vital Resource Gauges -->
      <div class="hud-top-right glass-card">
        <div class="resource-row">
          <div class="resource-info">
            <span class="resource-name">SUIT INTEGRITY</span>
            <span id="suit-pct" class="resource-pct">100%</span>
          </div>
          <div class="progress-bar"><div id="suit-fill" class="progress-fill cyan-fill" style="width: 100%"></div></div>
        </div>

        <div class="resource-row">
          <div class="resource-info">
            <span class="resource-name">PLAYER ENERGY</span>
            <span id="energy-pct" class="resource-pct">100%</span>
          </div>
          <div class="progress-bar"><div id="energy-fill" class="progress-fill amber-fill" style="width: 100%"></div></div>
        </div>

        <div class="resource-row">
          <div class="resource-info">
            <span class="resource-name">LUNA BATTERY</span>
            <span id="luna-pct" class="resource-pct">100%</span>
          </div>
          <div class="progress-bar"><div id="luna-fill" class="progress-fill cyan-fill" style="width: 100%"></div></div>
        </div>

        <div class="resource-row">
          <div class="resource-info">
            <span class="resource-name">RECOVERY CAPACITY</span>
            <span id="capacity-pct" class="resource-pct">3 / 3</span>
          </div>
          <div class="progress-bar"><div id="capacity-fill" class="progress-fill green-fill" style="width: 100%"></div></div>
        </div>
      </div>

      <!-- Center Floating Widgets: Luna Radar & Interaction Prompt -->
      <div class="hud-center-notifications">
        <!-- Proximity Radar -->
        <div id="proximity-radar" class="proximity-radar glass-card hidden">
          <div class="radar-header">
            <span class="radar-pulse-dot"></span>
            <span class="radar-title">LUNA DETECTION SENSOR // METALLIC SIGNATURE</span>
            <span id="radar-distance" class="radar-dist">18.5m</span>
            <button id="btn-radar-mute" class="hud-sensor-mute-btn" title="Toggle Luna Sensor Audio [U]">
              <span id="radar-mute-icon">🔊</span>
              <span id="radar-mute-text">AUDIO</span>
            </button>
          </div>
          <div class="progress-bar radar-bar">
            <div id="radar-signal-fill" class="progress-fill cyan-fill" style="width: 45%"></div>
          </div>
        </div>

        <!-- Luna Alert Speech Banner -->
        <div id="luna-alert-bubble" class="luna-alert-bubble glass-card hidden">
          <span class="luna-alert-tag">LUNA ALERT:</span>
          <span id="luna-alert-text">"Explorer! I'm detecting an unusual metallic signature nearby!"</span>
        </div>

        <!-- Interactive Key Prompt -->
        <div id="interaction-prompt" class="interaction-prompt glass-card hidden">
          <div class="prompt-key-badge"><kbd>E</kbd></div>
          <div class="prompt-text-group">
            <span class="prompt-action">PRESS [E] TO SCAN &amp; EXAMINE</span>
            <span id="prompt-artifact-name" class="prompt-artifact-name">APOLLO 11 EAGLE</span>
          </div>
        </div>

        <!-- Small Option Card near tracker: Return to Shuttle -->
        <div id="return-to-shuttle-card" class="return-to-shuttle-card glass-card hidden">
          <div class="shuttle-card-info">
            <span class="shuttle-badge">LEVEL OBJECTIVE COMPLETE</span>
            <span id="shuttle-card-title" class="shuttle-card-title">ALL 3 PROBES SECURED</span>
            <span id="shuttle-card-sub" class="shuttle-card-sub">Shuttle primed for orbital departure</span>
          </div>
          <button id="btn-quick-return-shuttle" class="btn-return-shuttle glow-ready" type="button">
            <kbd>R</kbd> <span>RETURN TO SHUTTLE ▶</span>
          </button>
        </div>
      </div>

      <!-- Bottom-Left: Minimap HUD -->
      <div id="hud-minimap-container" class="hud-minimap-container">
        <div class="minimap-bezel">
          <div class="minimap-header">
            <span class="minimap-title-tag">RADAR MINIMAP</span>
            <span class="minimap-poi-pill">SURFACE GRID</span>
          </div>
          <div class="minimap-canvas-wrapper" id="minimap-wrapper">
            <canvas id="minimapCanvas" width="150" height="150"></canvas>
            <span class="compass-marker marker-n">N</span>
            <span class="compass-marker marker-s">S</span>
            <span class="compass-marker marker-e">E</span>
            <span class="compass-marker marker-w">W</span>
          </div>
          <div class="minimap-footer">
            <button id="btn-minimap-expand" class="minimap-expand-btn">
              EXPAND MAP <kbd>M</kbd>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Center: Telemetry & Controls Prompt -->
      <div class="hud-bottom-center">
        <div class="controls-guide-bar glass-card">
          <span class="key-pill"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> MOVE</span>
          <span class="key-pill"><kbd>SHIFT</kbd> SPRINT</span>
          <span class="key-pill"><kbd>MOUSE</kbd> ROTATE CAMERA</span>
          <span class="key-pill"><kbd>WHEEL</kbd> ZOOM</span>
          <span class="key-pill"><kbd>E</kbd> INTERACT</span>
          <span class="key-pill sensor-toggle-pill" id="btn-guide-mute" title="Toggle Sensor Beeps"><kbd>U</kbd> <span id="guide-mute-icon">🔊</span> SENSOR: <span id="guide-mute-status">ON</span></span>
          <button id="btn-toggle-map" class="hud-map-btn"><kbd>M</kbd> OPEN MAP</button>
        </div>
        <div class="coordinates-pill">
          COORDINATES: <span id="hud-coords" class="coords-val">X: 0.0 &bull; Z: 4.5</span>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);

    this.missionDayEl = this.container.querySelector('#hud-mission-day') as HTMLElement;
    this.progressCountEl = this.container.querySelector('#hud-artifact-progress') as HTMLElement;
    this.levelTagEl = this.container.querySelector('#hud-level-tag') as HTMLElement;
    this.levelTitleEl = this.container.querySelector('#hud-level-title') as HTMLElement;
    this.suitFillEl = this.container.querySelector('#suit-fill') as HTMLElement;
    this.energyFillEl = this.container.querySelector('#energy-fill') as HTMLElement;
    this.lunaFillEl = this.container.querySelector('#luna-fill') as HTMLElement;
    this.capacityFillEl = this.container.querySelector('#capacity-fill') as HTMLElement;
    this.coordsEl = this.container.querySelector('#hud-coords') as HTMLElement;

    // Numerical indicator element references
    this.suitPctEl = this.container.querySelector('#suit-pct') as HTMLElement;
    this.energyPctEl = this.container.querySelector('#energy-pct') as HTMLElement;
    this.lunaPctEl = this.container.querySelector('#luna-pct') as HTMLElement;
    this.capacityPctEl = this.container.querySelector('#capacity-pct') as HTMLElement;

    this.radarWidget = this.container.querySelector('#proximity-radar') as HTMLElement;
    this.radarDistanceEl = this.container.querySelector('#radar-distance') as HTMLElement;
    this.radarFillEl = this.container.querySelector('#radar-signal-fill') as HTMLElement;
    this.interactPrompt = this.container.querySelector('#interaction-prompt') as HTMLElement;
    this.interactNameEl = this.container.querySelector('#prompt-artifact-name') as HTMLElement;
    this.lunaAlertBubble = this.container.querySelector('#luna-alert-bubble') as HTMLElement;
    this.lunaAlertText = this.container.querySelector('#luna-alert-text') as HTMLElement;

    // Return to shuttle card elements
    this.returnToShuttleCard = this.container.querySelector('#return-to-shuttle-card') as HTMLElement;
    this.shuttleCardTitle = this.container.querySelector('#shuttle-card-title') as HTMLElement;
    this.shuttleCardSub = this.container.querySelector('#shuttle-card-sub') as HTMLElement;
    this.btnReturnShuttle = this.container.querySelector('#btn-quick-return-shuttle') as HTMLElement;

    this.btnReturnShuttle?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.onReturnToShuttleCallback) {
        this.onReturnToShuttleCallback();
      }
    });

    // Sensor mute elements
    this.radarMuteBtn = this.container.querySelector('#btn-radar-mute') as HTMLElement;
    this.radarMuteIcon = this.container.querySelector('#radar-mute-icon') as HTMLElement;
    this.radarMuteText = this.container.querySelector('#radar-mute-text') as HTMLElement;
    this.guideMuteBtn = this.container.querySelector('#btn-guide-mute') as HTMLElement;
    this.guideMuteIcon = this.container.querySelector('#guide-mute-icon') as HTMLElement;
    this.guideMuteStatus = this.container.querySelector('#guide-mute-status') as HTMLElement;

    const mapBtn = this.container.querySelector('#btn-toggle-map');
    mapBtn?.addEventListener('click', () => {
      if (this.onMapClickCallback) this.onMapClickCallback();
    });

    const triggerToggleMute = (e: Event) => {
      e.stopPropagation();
      if (this.onToggleSensorMuteCallback) {
        this.onToggleSensorMuteCallback();
      }
    };

    this.radarMuteBtn?.addEventListener('click', triggerToggleMute);
    this.guideMuteBtn?.addEventListener('click', triggerToggleMute);

    // Minimap Canvas & Controls
    this.minimapCanvas = this.container.querySelector('#minimapCanvas') as HTMLCanvasElement;
    if (this.minimapCanvas) {
      this.minimapCtx = this.minimapCanvas.getContext('2d');
    }
    const minimapBtn = this.container.querySelector('#btn-minimap-expand');
    const minimapWrapper = this.container.querySelector('#minimap-wrapper');
    minimapBtn?.addEventListener('click', () => {
      if (this.onMapClickCallback) this.onMapClickCallback();
    });
    minimapWrapper?.addEventListener('click', () => {
      if (this.onMapClickCallback) this.onMapClickCallback();
    });
  }

  public setOnMapClick(cb: () => void): void {
    this.onMapClickCallback = cb;
  }

  public setOnToggleSensorMute(cb: () => void): void {
    this.onToggleSensorMuteCallback = cb;
  }

  public setSensorMuted(muted: boolean): void {
    if (muted) {
      if (this.radarMuteIcon) this.radarMuteIcon.textContent = '🔇';
      if (this.radarMuteText) this.radarMuteText.textContent = 'MUTED';
      if (this.guideMuteIcon) this.guideMuteIcon.textContent = '🔇';
      if (this.guideMuteStatus) this.guideMuteStatus.textContent = 'OFF';
      this.radarMuteBtn?.classList.add('muted');
      this.guideMuteBtn?.classList.add('muted');
    } else {
      if (this.radarMuteIcon) this.radarMuteIcon.textContent = '🔊';
      if (this.radarMuteText) this.radarMuteText.textContent = 'AUDIO';
      if (this.guideMuteIcon) this.guideMuteIcon.textContent = '🔊';
      if (this.guideMuteStatus) this.guideMuteStatus.textContent = 'ON';
      this.radarMuteBtn?.classList.remove('muted');
      this.guideMuteBtn?.classList.remove('muted');
    }
  }

  public setLevelInfo(sectorTag: string, levelTitle: string): void {
    if (this.levelTagEl) {
      this.levelTagEl.innerHTML = sectorTag;
    }
    if (this.levelTitleEl) {
      this.levelTitleEl.textContent = levelTitle;
    }
  }

  public show(): void {
    this.container.classList.remove('hidden');
    this.container.style.opacity = '1';
  }

  public hide(): void {
    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.classList.add('hidden');
    }, 400);
  }

  public showLunaAlert(text: string): void {
    this.lunaAlertText.textContent = text;
    this.lunaAlertBubble.classList.remove('hidden');
    this.lunaAlertBubble.style.opacity = '1';

    setTimeout(() => {
      this.lunaAlertBubble.style.opacity = '0';
      setTimeout(() => {
        this.lunaAlertBubble.classList.add('hidden');
      }, 500);
    }, 4500);
  }

  public showReturnToShuttleCard(title: string, sub: string, onReturn?: () => void): void {
    if (!this.returnToShuttleCard) return;
    if (this.shuttleCardTitle) this.shuttleCardTitle.textContent = title;
    if (this.shuttleCardSub) this.shuttleCardSub.textContent = sub;
    if (onReturn) this.onReturnToShuttleCallback = onReturn;

    this.returnToShuttleCard.classList.remove('hidden');
    this.returnToShuttleCard.style.opacity = '1';
  }

  public hideReturnToShuttleCard(): void {
    if (!this.returnToShuttleCard) return;
    this.returnToShuttleCard.style.opacity = '0';
    setTimeout(() => {
      this.returnToShuttleCard?.classList.add('hidden');
    }, 250);
  }

  public isReturnToShuttleCardVisible(): boolean {
    return Boolean(this.returnToShuttleCard && !this.returnToShuttleCard.classList.contains('hidden'));
  }

  public setArtifacts(
    artifacts: ArtifactDefinition[],
    getPosition?: (id: string) => Vector3 | undefined
  ): void {
    this.artifacts = artifacts;
    if (getPosition) {
      this.getArtifactPosition = getPosition;
    }
  }

  public updateRadar(detected: ArtifactDefinition | null, distance: number, signalStrength: number, canInteract: boolean): void {
    this.detectedArtifact = detected;
    if (detected) {
      this.radarWidget.classList.remove('hidden');
      this.radarDistanceEl.textContent = `${distance.toFixed(1)}m`;
      this.radarFillEl.style.width = `${(signalStrength * 100).toFixed(0)}%`;

      if (canInteract) {
        this.interactPrompt.classList.remove('hidden');
        this.interactNameEl.textContent = (detected.commonName || detected.officialName).toUpperCase();
      } else {
        this.interactPrompt.classList.add('hidden');
      }
    } else {
      this.radarWidget.classList.add('hidden');
      this.interactPrompt.classList.add('hidden');
    }
  }

  public updateMinimap(
    playerPos: Vector3,
    playerForward?: Vector3,
    detectedArtifactId?: string | null
  ): void {
    this.lastPlayerPos.copyFrom(playerPos);
    if (playerForward) {
      this.lastPlayerForward.copyFrom(playerForward);
    }
    if (detectedArtifactId !== undefined) {
      this.detectedArtifact =
        this.artifacts.find((a) => a.id === detectedArtifactId) ?? null;
    }
    this.renderMinimap();
  }

  public update(playerPos?: Vector3, playerForward?: Vector3): void {
    if (this.missionDayEl) {
      this.missionDayEl.textContent = `${this.gameState.missionDay} / ${this.gameState.maxMissionDays}`;
    }
    if (this.progressCountEl) {
      this.progressCountEl.textContent = `${this.gameState.artifactsCollected} / ${this.gameState.recoveryTarget}`;
    }

    // Live numeric resource percentages
    const suitVal = Math.round(this.gameState.resources.suitIntegrity);
    const energyVal = Math.round((this.gameState.resources.energy / this.gameState.resources.maxEnergy) * 100);
    const lunaVal = Math.round(this.gameState.resources.lunaBattery);
    const capacityVal = Math.max(0, Math.round(this.gameState.resources.recoveryCapacity));

    if (this.suitPctEl) {
      this.suitPctEl.textContent = `${suitVal}%`;
    }
    if (this.energyPctEl) {
      this.energyPctEl.textContent = `${energyVal}%`;
    }
    if (this.lunaPctEl) {
      this.lunaPctEl.textContent = `${lunaVal}%`;
    }
    if (this.capacityPctEl) {
      this.capacityPctEl.textContent = `${capacityVal} / 3`;
    }

    // Status bar visual fills
    if (this.suitFillEl) {
      this.suitFillEl.style.width = `${suitVal}%`;
    }
    if (this.energyFillEl) {
      this.energyFillEl.style.width = `${energyVal}%`;
    }
    if (this.lunaFillEl) {
      this.lunaFillEl.style.width = `${lunaVal}%`;
    }
    if (this.capacityFillEl) {
      this.capacityFillEl.style.width = `${(capacityVal / 3) * 100}%`;
    }

    if (this.coordsEl && playerPos) {
      this.coordsEl.textContent = `X: ${playerPos.x.toFixed(1)} • Z: ${playerPos.z.toFixed(1)}`;
    }
    if (playerPos) {
      this.lastPlayerPos.copyFrom(playerPos);
      if (playerForward) {
        this.lastPlayerForward.copyFrom(playerForward);
      }
      this.renderMinimap();
    }
  }

  private getArtifactCoords(art: ArtifactDefinition): { x: number; z: number } {
    if (this.getArtifactPosition) {
      const pos = this.getArtifactPosition(art.id);
      if (pos) {
        return { x: pos.x, z: pos.z };
      }
    }
    // Fallback known coordinates for Moon & Mars
    if (art.id === 'a11-lm5-descent') return { x: 32, z: 22 };
    if (art.id === 'a12-lm6-ascent') return { x: -28, z: 32 };
    if (art.id === 'a15-lm10-ascent') return { x: 14, z: -38 };
    if (art.id === 'viking-1-lander') return { x: -35, z: 25 };
    if (art.id === 'sojourner') return { x: 42, z: -18 };
    if (art.id === 'opportunity') return { x: -15, z: -45 };
    return { x: 0, z: 0 };
  }

  private renderMinimap(): void {
    if (!this.minimapCtx || !this.minimapCanvas) return;
    const ctx = this.minimapCtx;
    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = cx - 4;

    ctx.clearRect(0, 0, w, h);

    // 1. Radar circular background
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 12, 24, 0.94)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(70, 217, 232, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Clip to circular radar boundary
    ctx.clip();

    // 2. Concentric range rings (approx 20m, 40m, 60m radius)
    [0.33, 0.66, 1.0].forEach((scale) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(70, 217, 232, 0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 3. Coordinate crosshairs
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx, cy + r);
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx + r, cy);
    ctx.strokeStyle = 'rgba(70, 217, 232, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Map scale: map ~60m world radius to (r - 12) pixels
    const mapScale = (r - 12) / 60;

    // 4. Habitat / Shuttle Landing Base at (0,0)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(cx - 3, cy - 3, 6, 6);
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.7)';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - 3, cy - 3, 6, 6);

    // 5. Artifact points of interest
    this.artifacts.forEach((art) => {
      const coords = this.getArtifactCoords(art);
      const ax = cx + coords.x * mapScale;
      const ay = cy - coords.z * mapScale;

      if (art.isCollected) {
        // Collected: Green marker
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.detectedArtifact && this.detectedArtifact.id === art.id) {
        // Detected / Pinging: Cyan pulsating ring
        const pulse = 4 + Math.sin(performance.now() * 0.008) * 2;
        ctx.strokeStyle = '#46d9e8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ax, ay, pulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#46d9e8';
        ctx.beginPath();
        ctx.arc(ax, ay, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Known Target: Amber marker
        ctx.fillStyle = '#f5b942';
        ctx.beginPath();
        ctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 6. Player position & orientation
    const px = cx + this.lastPlayerPos.x * mapScale;
    const py = cy - this.lastPlayerPos.z * mapScale;

    // Orientation cone & direction arrow
    const fwd = this.lastPlayerForward;
    const angle = Math.atan2(-fwd.z, fwd.x);

    // Semi-transparent field-of-view cone
    ctx.fillStyle = 'rgba(70, 217, 232, 0.28)';
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, 14, angle - 0.45, angle + 0.45);
    ctx.closePath();
    ctx.fill();

    // Directional heading arrow
    ctx.strokeStyle = '#46d9e8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + Math.cos(angle) * 9, py + Math.sin(angle) * 9);
    ctx.stroke();

    // Player blip (cyan glowing dot)
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#46d9e8';
    ctx.shadowColor = '#46d9e8';
    ctx.shadowBlur = 8;
    ctx.fill();

    // 7. Coordinates readout tag at bottom of radar
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(70, 217, 232, 0.85)';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.lastPlayerPos.x.toFixed(1)}, ${this.lastPlayerPos.z.toFixed(1)}`, cx, cy + r - 5);

    ctx.restore();
  }
}
