export class IntroUI {
  private titleOverlay: HTMLElement;
  private vignetteOverlay: HTMLElement;
  private briefingOverlay: HTMLElement;

  private onEnterCabinCallback: (() => void) | null = null;
  private onConfirmMissionCallback: (() => void) | null = null;

  constructor() {
    // 1. Cinematic Title Overlay
    this.titleOverlay = document.createElement('div');
    this.titleOverlay.id = 'cinematic-title-overlay';
    this.titleOverlay.className = 'cinematic-overlay';
    this.titleOverlay.innerHTML = `
      <div class="cinematic-title-content">
        <div class="organization-badge">SPACE HERITAGE ARCHIVE // DEEP RECOVERY</div>
        <h1 class="cinematic-main-title">GHOSTS OF SPACE</h1>
        <p class="cinematic-tagline">
          &ldquo;Some machines were sent to explore the unknown. Someone has to bring their stories home.&rdquo;
        </p>
        <div class="cinematic-actions">
          <button id="btn-enter-cabin" class="btn-primary">
            <span class="btn-icon">▶</span> ENTER SPACECRAFT INTERIOR
          </button>
          <button id="btn-skip-cinematic" class="btn-secondary">
            SKIP CINEMATIC
          </button>
        </div>
      </div>
    `;

    // 2. Awakening Dark / Blur Vignette
    this.vignetteOverlay = document.createElement('div');
    this.vignetteOverlay.id = 'awakening-vignette';
    this.vignetteOverlay.className = 'awakening-vignette hidden';

    // 3. Holographic Mission Briefing Overlay
    this.briefingOverlay = document.createElement('div');
    this.briefingOverlay.id = 'briefing-overlay';
    this.briefingOverlay.className = 'briefing-overlay hidden';
    this.briefingOverlay.innerHTML = `
      <div class="briefing-card glass-card">
        <div class="briefing-header">
          <div class="card-tag">MISSION ASSIGNMENT // LEVEL 1</div>
          <h2>THE SILENT MOON</h2>
          <span class="badge-status">DIRECTIVE APPROVED</span>
        </div>
        <div class="briefing-grid">
          <div class="briefing-col">
            <div class="briefing-item">
              <span class="label">PRIMARY TARGET:</span>
              <span class="val">3 Historical Lunar Artifacts</span>
            </div>
            <div class="briefing-item">
              <span class="label">KNOWN ASSETS:</span>
              <span class="val">Apollo 11 Eagle, Rover (LRV), ALSEP</span>
            </div>
            <div class="briefing-item">
              <span class="label">MISSION DEADLINE:</span>
              <span class="val highlight-amber">14 In-Game Days</span>
            </div>
          </div>
          <div class="briefing-col">
            <div class="briefing-item">
              <span class="label">COMPANION:</span>
              <span class="val highlight-cyan">LUNA (Diagnostics: 100%)</span>
            </div>
            <div class="briefing-item">
              <span class="label">PRIMARY PROTOCOL:</span>
              <span class="val">Scan, Inspect Components, Archive Data</span>
            </div>
            <div class="briefing-item">
              <span class="label">FALLBACK PROTOCOL:</span>
              <span class="val">Earth Recuperation (Zero Loss)</span>
            </div>
          </div>
        </div>
        <div class="briefing-footer">
          <button id="btn-confirm-mission" class="btn-primary full-width">
            CONFIRM MISSION &amp; PREPARE DESCENT ▶
          </button>
        </div>
      </div>
    `;

    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.appendChild(this.vignetteOverlay);
      appContainer.appendChild(this.titleOverlay);
      appContainer.appendChild(this.briefingOverlay);
    }

    this.bindEvents();
  }

  private bindEvents(): void {
    const btnEnter = this.titleOverlay.querySelector('#btn-enter-cabin');
    const btnSkip = this.titleOverlay.querySelector('#btn-skip-cinematic');
    const btnConfirm = this.briefingOverlay.querySelector('#btn-confirm-mission');

    btnEnter?.addEventListener('click', () => {
      this.hideTitle();
      if (this.onEnterCabinCallback) this.onEnterCabinCallback();
    });

    btnSkip?.addEventListener('click', () => {
      this.hideTitle();
      if (this.onEnterCabinCallback) this.onEnterCabinCallback();
    });

    btnConfirm?.addEventListener('click', () => {
      this.hideBriefing();
      if (this.onConfirmMissionCallback) this.onConfirmMissionCallback();
    });
  }

  public setOnEnterCabin(cb: () => void): void {
    this.onEnterCabinCallback = cb;
  }

  public setOnConfirmMission(cb: () => void): void {
    this.onConfirmMissionCallback = cb;
  }

  public showTitle(): void {
    this.titleOverlay.classList.remove('hidden');
    this.titleOverlay.style.opacity = '1';
  }

  public hideTitle(): void {
    this.titleOverlay.style.opacity = '0';
    setTimeout(() => {
      this.titleOverlay.classList.add('hidden');
    }, 600);
  }

  public triggerAwakening(durationMs: number = 3000): void {
    this.vignetteOverlay.classList.remove('hidden');
    this.vignetteOverlay.style.opacity = '1';

    // Gradually clear the blur and darkness
    setTimeout(() => {
      this.vignetteOverlay.style.transition = `opacity ${durationMs}ms ease-out`;
      this.vignetteOverlay.style.opacity = '0';
      setTimeout(() => {
        this.vignetteOverlay.classList.add('hidden');
      }, durationMs);
    }, 400);
  }

  public showBriefing(): void {
    this.briefingOverlay.classList.remove('hidden');
    this.briefingOverlay.style.opacity = '0';
    setTimeout(() => {
      this.briefingOverlay.style.transition = 'opacity 0.6s ease-out';
      this.briefingOverlay.style.opacity = '1';
    }, 50);
  }

  public hideBriefing(): void {
    this.briefingOverlay.style.opacity = '0';
    setTimeout(() => {
      this.briefingOverlay.classList.add('hidden');
    }, 600);
  }
}
