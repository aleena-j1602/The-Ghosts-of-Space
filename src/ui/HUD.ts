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
            <span id="hud-mission-day" class="val highlight-amber">1 / 14</span>
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
      </div>

      <!-- Bottom-Left: Minimap HUD -->
      <div id="hud-minimap-container" class="hud-minimap-container">
        <div class="minimap-bezel">
          <div class="minimap-header">
            <span class="minimap-title-tag">RADAR MINIMAP</span>
            <span class="minimap-poi-pill">SURFACE GRID</span>
          </div>
          <div class="minimap-canvas-wrapper" id="minimap-wrapper">
            <canvas id="minimapCanvas" width="180" height="180"></canvas>
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

    this.radarWidget = this.container.querySelector('#proximity-radar') as HTMLElement;
    this.radarDistanceEl = this.container.querySelector('#radar-distance') as HTMLElement;
    this.radarFillEl = this.container.querySelector('#radar-signal-fill') as HTMLElement;
    this.interactPrompt = this.container.querySelector('#interaction-prompt') as HTMLElement;
    this.interactNameEl = this.container.querySelector('#prompt-artifact-name') as HTMLElement;
    this.lunaAlertBubble = this.container.querySelector('#luna-alert-bubble') as HTMLElement;
    this.lunaAlertText = this.container.querySelector('#luna-alert-text') as HTMLElement;

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

  public updateRadar(detected: ArtifactDefinition | null, distance: number, signalStrength: number, canInteract: boolean): void {
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

  public update(playerPos?: Vector3): void {
    if (this.missionDayEl) {
      this.missionDayEl.textContent = `${this.gameState.missionDay} / ${this.gameState.maxMissionDays}`;
    }
    if (this.progressCountEl) {
      this.progressCountEl.textContent = `${this.gameState.artifactsCollected} / ${this.gameState.recoveryTarget}`;
    }
    if (this.suitFillEl) {
      this.suitFillEl.style.width = `${this.gameState.resources.suitIntegrity}%`;
    }
    if (this.energyFillEl) {
      this.energyFillEl.style.width = `${(this.gameState.resources.energy / this.gameState.resources.maxEnergy) * 100}%`;
    }
    if (this.lunaFillEl) {
      this.lunaFillEl.style.width = `${this.gameState.resources.lunaBattery}%`;
    }
    if (this.capacityFillEl) {
      this.capacityFillEl.style.width = `${(this.gameState.resources.recoveryCapacity / 3) * 100}%`;
    }
    if (this.coordsEl && playerPos) {
      this.coordsEl.textContent = `X: ${playerPos.x.toFixed(1)} • Z: ${playerPos.z.toFixed(1)}`;
    }
    if (playerPos) {
      this.renderMinimap(playerPos);
    }
  }

  private renderMinimap(playerPos: Vector3): void {
    if (!this.minimapCtx || !this.minimapCanvas) return;
    const ctx = this.minimapCtx;
    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = cx - 4;

    ctx.clearRect(0, 0, w, h);

    // Radar circular background
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 12, 24, 0.92)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(70, 217, 232, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Concentric range rings
    [0.35, 0.7, 1.0].forEach((scale) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(70, 217, 232, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx, cy + r);
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx + r, cy);
    ctx.strokeStyle = 'rgba(70, 217, 232, 0.15)';
    ctx.stroke();

    // Center player icon (cyan glowing dot)
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#46d9e8';
    ctx.shadowColor = '#46d9e8';
    ctx.shadowBlur = 8;
    ctx.fill();

    // Coordinates tag at bottom of radar
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(70, 217, 232, 0.75)';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${playerPos.x.toFixed(0)}, ${playerPos.z.toFixed(0)}`, cx, cy + r - 6);

    ctx.restore();
  }
}
