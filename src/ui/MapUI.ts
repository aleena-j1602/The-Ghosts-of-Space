import { Vector3 } from '@babylonjs/core';
import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';

export class MapUI {
  private container: HTMLElement;
  private mapCanvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private isVisible: boolean = false;
  private closeBtn!: HTMLElement;

  private artifacts: ArtifactDefinition[] = [];
  private positionResolver?: (id: string) => { x: number; z: number } | undefined;
  private playerPos: Vector3 = new Vector3(0, 0, 0);
  private playerForward: Vector3 = new Vector3(0, 0, 1);
  private detectedArtifactId: string | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'map-overlay';
    this.container.className = 'map-overlay hidden';

    this.container.innerHTML = `
      <div class="map-window glass-card">
        <div class="map-header">
          <div class="map-header-left">
            <div class="card-tag">NAVIGATION RELAY // ORBITAL TELEMETRY</div>
            <h2>LUNAR SECTOR MAP: MARE TRANQUILLITATIS</h2>
          </div>
          <button id="btn-close-map" class="map-close-btn">&times;</button>
        </div>

        <div class="map-body">
          <div class="map-canvas-container">
            <canvas id="lunarMapCanvas" width="560" height="420"></canvas>
            <div class="map-crosshair"></div>
          </div>

          <div class="map-legend-panel">
            <h3>ARCHAEOLOGICAL TARGETS</h3>
            <div id="map-target-list" class="target-list">
              <!-- Dynamically populated -->
            </div>

            <div class="map-legend-keys">
              <div class="legend-item"><span class="legend-dot shelter-dot"></span> LANDING SHELTER (0, 0)</div>
              <div class="legend-item"><span class="legend-dot player-dot"></span> EXPLORER &amp; LUNA</div>
              <div class="legend-item"><span class="legend-dot target-dot"></span> RECOVERABLE ARTIFACT</div>
              <div class="legend-item"><span class="legend-dot recovered-dot"></span> SECURED ARCHIVE ENTRY</div>
            </div>
          </div>
        </div>

        <div class="map-footer">
          <span>PRESS [M] OR ESC TO CLOSE NAVIGATION</span>
          <span class="telemetry-tag">GRID RANGE: &plusmn;90 METERS</span>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);

    this.mapCanvas = this.container.querySelector('#lunarMapCanvas') as HTMLCanvasElement;
    this.ctx = this.mapCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.closeBtn = this.container.querySelector('#btn-close-map') as HTMLElement;

    this.bindEvents();
  }

  private bindEvents(): void {
    this.closeBtn.addEventListener('click', () => {
      this.hide();
    });

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'KeyM') {
        // Toggle map
        this.toggle();
      } else if (e.code === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
  }

  public setArtifacts(
    artifacts: ArtifactDefinition[],
    positionResolver?: (id: string) => { x: number; z: number } | undefined
  ): void {
    this.artifacts = artifacts;
    if (positionResolver) {
      this.positionResolver = positionResolver;
    }
    this.updateTargetList();
  }

  private getArtifactCoords(art: ArtifactDefinition): { x: number; z: number } {
    if (this.positionResolver) {
      const p = this.positionResolver(art.id);
      if (p) return { x: p.x, z: p.z };
    }
    if (art.id === 'a11-lm5-descent') return { x: 32, z: 22 };
    if (art.id === 'a12-lm6-ascent') return { x: -28, z: 32 };
    if (art.id === 'a15-lm10-ascent') return { x: 14, z: -38 };
    return { x: 0, z: 0 };
  }

  public setDetectedArtifact(id: string | null): void {
    this.detectedArtifactId = id;
    this.updateTargetList();
  }

  public toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  public show(): void {
    this.isVisible = true;
    this.container.classList.remove('hidden');
    this.container.style.opacity = '1';
    this.drawMap();
  }

  public hide(): void {
    this.isVisible = false;
    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.classList.add('hidden');
    }, 300);
  }

  public isOpen(): boolean {
    return this.isVisible;
  }

  public update(playerPos: Vector3, playerForward: Vector3): void {
    this.playerPos.copyFrom(playerPos);
    this.playerForward.copyFrom(playerForward);

    if (this.isVisible) {
      this.drawMap();
    }
  }

  private updateTargetList(): void {
    const listEl = this.container.querySelector('#map-target-list');
    if (!listEl) return;

    listEl.innerHTML = this.artifacts
      .map((art) => {
        const isDetected = this.detectedArtifactId === art.id;
        const statusClass = art.isCollected ? 'status-secured' : isDetected ? 'status-detected' : 'status-undiscovered';
        const statusText = art.isCollected ? 'SECURED' : isDetected ? 'LUNA DETECTED' : 'APPROX. COORDS';
        const coords = this.getArtifactCoords(art);
        const year = art.dates.launch ? new Date(art.dates.launch).getUTCFullYear() : (art.dates.landing ? new Date(art.dates.landing).getUTCFullYear() : 1969);

        return `
          <div class="target-card ${statusClass}">
            <div class="target-info">
              <span class="target-name">${art.commonName}</span>
              <span class="target-coords">[X: ${coords.x.toFixed(0)}, Z: ${coords.z.toFixed(0)}] &bull; ${year} &bull; ${art.agency.split('—')[0].trim()}</span>
            </div>
            <span class="target-badge">${statusText}</span>
          </div>
        `;
      })
      .join('');
  }

  private drawMap(): void {
    if (!this.ctx) return;
    const w = this.mapCanvas.width;
    const h = this.mapCanvas.height;

    // Clear background
    this.ctx.fillStyle = '#070a14';
    this.ctx.fillRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2;
    const mapScale = 2.2; // pixels per meter

    // 1. Grid lines
    this.ctx.strokeStyle = 'rgba(70, 217, 232, 0.08)';
    this.ctx.lineWidth = 1;

    for (let x = -80; x <= 80; x += 20) {
      const cx = centerX + x * mapScale;
      this.ctx.beginPath();
      this.ctx.moveTo(cx, 0);
      this.ctx.lineTo(cx, h);
      this.ctx.stroke();
    }

    for (let z = -80; z <= 80; z += 20) {
      const cy = centerY - z * mapScale; // inverted Z for canvas Y
      this.ctx.beginPath();
      this.ctx.moveTo(0, cy);
      this.ctx.lineTo(w, cy);
      this.ctx.stroke();
    }

    // Concentric range circles
    this.ctx.strokeStyle = 'rgba(70, 217, 232, 0.12)';
    [25, 50, 75].forEach((dist) => {
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, dist * mapScale, 0, Math.PI * 2);
      this.ctx.stroke();
    });

    // 2. Landing Site Shelter at (0, 0)
    this.ctx.fillStyle = '#22c55e';
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#22c55e';
    this.ctx.font = '10px Consolas, monospace';
    this.ctx.fillText('HABITAT SHELTER (0,0)', centerX + 10, centerY + 4);

    // 3. Artifact markers
    this.artifacts.forEach((art) => {
      const coords = this.getArtifactCoords(art);
      const ax = centerX + coords.x * mapScale;
      const ay = centerY - coords.z * mapScale;

      if (art.isCollected) {
        // Collected: Green Checkmark / Hexagon
        this.ctx.fillStyle = '#22c55e';
        this.ctx.beginPath();
        this.ctx.arc(ax, ay, 5, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = '#8b9bb0';
        this.ctx.font = '9px Consolas, monospace';
        this.ctx.fillText(`${art.commonName} (SECURED)`, ax + 8, ay + 3);
      } else if (this.detectedArtifactId === art.id) {
        // Pinging / Detected by Luna: Glowing cyan pulsing ring
        const pulse = 6 + Math.sin(performance.now() * 0.006) * 4;
        this.ctx.strokeStyle = '#46d9e8';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(ax, ay, pulse, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.fillStyle = '#46d9e8';
        this.ctx.beginPath();
        this.ctx.arc(ax, ay, 4, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = '#46d9e8';
        this.ctx.font = '10px Consolas, monospace';
        this.ctx.fillText(`SIGNAL: ${art.commonName}`, ax + 10, ay + 3);
      } else {
        // Known Coordinates: Amber diamond
        this.ctx.fillStyle = '#f5b942';
        this.ctx.beginPath();
        this.ctx.rect(ax - 3, ay - 3, 6, 6);
        this.ctx.fill();

        this.ctx.fillStyle = '#8b9bb0';
        this.ctx.font = '9px Consolas, monospace';
        this.ctx.fillText(art.commonName, ax + 8, ay + 3);
      }
    });

    // 4. Explorer & Luna position
    const px = centerX + this.playerPos.x * mapScale;
    const py = centerY - this.playerPos.z * mapScale;

    // Direction cone
    const angle = Math.atan2(-this.playerForward.z, this.playerForward.x);
    this.ctx.fillStyle = 'rgba(70, 217, 232, 0.2)';
    this.ctx.beginPath();
    this.ctx.moveTo(px, py);
    this.ctx.arc(px, py, 22, angle - 0.45, angle + 0.45);
    this.ctx.closePath();
    this.ctx.fill();

    // Explorer Dot
    this.ctx.fillStyle = '#46d9e8';
    this.ctx.shadowColor = '#46d9e8';
    this.ctx.shadowBlur = 8;
    this.ctx.beginPath();
    this.ctx.arc(px, py, 5, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowBlur = 0; // reset
  }
}
