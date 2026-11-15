import { SettingsManager, AudioSettings } from '../systems/SettingsManager.ts';

export class PauseMenuUI {
  private container: HTMLElement;
  private settingsManager: SettingsManager;

  private isMenuOpen: boolean = false;
  private currentView: 'menu' | 'settings' = 'menu';
  private listeningActionId: string | null = null;
  private currentConfirmType: 'restart' | 'menu' | null = null;

  // Callbacks
  private onResumeCallback?: () => void;
  private onRestartLevelCallback?: () => void;
  private onReturnToMainMenuCallback?: () => void;

  // Cached DOM elements
  private menuViewEl!: HTMLElement;
  private settingsViewEl!: HTMLElement;
  private confirmDialogEl!: HTMLElement;
  private confirmTitleEl!: HTMLElement;
  private confirmMsgEl!: HTMLElement;
  private confirmBtnOk!: HTMLElement;
  private levelTitleEl!: HTMLElement;
  private conflictAlertEl!: HTMLElement;

  // Sliders and readouts
  private sensSlider!: HTMLInputElement;
  private sensValEl!: HTMLElement;
  private masterSlider!: HTMLInputElement;
  private masterValEl!: HTMLElement;
  private musicSlider!: HTMLInputElement;
  private musicValEl!: HTMLElement;
  private sfxSlider!: HTMLInputElement;
  private sfxValEl!: HTMLElement;
  private dialogueSlider!: HTMLInputElement;
  private dialogueValEl!: HTMLElement;
  private keyBindingsListEl!: HTMLElement;

  private boundKeydownHandler: (e: KeyboardEvent) => void;

  constructor() {
    this.settingsManager = SettingsManager.getInstance();

    this.container = document.createElement('div');
    this.container.id = 'pause-menu-overlay';
    this.container.className = 'pause-menu-overlay hidden';

    this.container.innerHTML = `
      <div class="pause-backdrop"></div>

      <!-- MAIN PAUSE VIEW -->
      <div id="pause-main-view" class="pause-card glass-card">
        <div class="pause-header">
          <div class="pause-status-pill">
            <span class="pulse-dot-cyan"></span>
            <span>EXPEDITION STATUS // PAUSED</span>
          </div>
          <h1 class="pause-main-title">MISSION PAUSED</h1>
          <p id="pause-level-name" class="pause-sector-title">SECTOR // MARE TRANQUILLITATIS</p>
        </div>

        <div class="pause-nav-buttons">
          <button id="btn-pause-resume" class="btn-pause-nav btn-primary glow-ready" type="button">
            <span class="btn-icon">▶</span>
            <span class="btn-label">RESUME EXPEDITION</span>
            <kbd class="pause-kbd">ESC</kbd>
          </button>

          <button id="btn-pause-settings" class="btn-pause-nav btn-secondary" type="button">
            <span class="btn-icon">⚙</span>
            <span class="btn-label">SETTINGS &amp; CONTROLS</span>
          </button>

          <button id="btn-pause-restart" class="btn-pause-nav btn-secondary" type="button">
            <span class="btn-icon">↺</span>
            <span class="btn-label">RESTART CURRENT LEVEL</span>
          </button>

          <button id="btn-pause-main-menu" class="btn-pause-nav btn-danger" type="button">
            <span class="btn-icon">⏏</span>
            <span class="btn-label">RETURN TO MAIN MENU</span>
          </button>
        </div>

        <div class="pause-footer-hint">
          <span>PRESS <kbd>ESC</kbd> OR CLICK RESUME TO CONTINUE EXPEDITION</span>
        </div>
      </div>

      <!-- SETTINGS & CONTROLS VIEW -->
      <div id="pause-settings-view" class="pause-card settings-card glass-card hidden">
        <div class="settings-header">
          <div class="settings-header-left">
            <div class="pause-status-pill">
              <span class="pulse-dot-cyan"></span>
              <span>SYSTEM CONFIGURATION // LOCAL PREFERENCES</span>
            </div>
            <h2 class="settings-title">SETTINGS &amp; CONTROLS</h2>
          </div>
          <button id="btn-settings-back" class="btn-secondary settings-back-btn" type="button">
            ◀ BACK TO PAUSE MENU <kbd>ESC</kbd>
          </button>
        </div>

        <div id="settings-conflict-alert" class="settings-alert-banner hidden">
          <span class="alert-icon">⚠</span>
          <span id="settings-conflict-text">Key conflict detected!</span>
        </div>

        <div class="settings-scroll-body">
          <!-- 1. MOUSE & CAMERA SENSITIVITY -->
          <div class="settings-section">
            <div class="section-header">
              <div class="section-title-group">
                <span class="section-tag">INPUT SENSITIVITY</span>
                <h3>MOUSE &amp; CAMERA SENSITIVITY</h3>
              </div>
              <button id="btn-reset-sens" class="btn-text-action" type="button">RESET TO DEFAULT</button>
            </div>
            <p class="section-desc">Adjust orbital third-person camera rotation speed. Changes take effect immediately.</p>
            <div class="slider-control-row">
              <span class="slider-label">LOOK SENSITIVITY:</span>
              <input id="slider-mouse-sens" type="range" min="0.2" max="3.0" step="0.05" value="1.0" class="sci-fi-slider" />
              <span id="label-mouse-sens" class="slider-value-badge">1.00x</span>
            </div>
          </div>

          <!-- 2. AUDIO VOLUME CHANNELS -->
          <div class="settings-section">
            <div class="section-header">
              <div class="section-title-group">
                <span class="section-tag">AUDIO CHANNELS</span>
                <h3>INDEPENDENT AUDIO MIX</h3>
              </div>
              <button id="btn-reset-audio" class="btn-text-action" type="button">RESET AUDIO MIX</button>
            </div>
            <p class="section-desc">Fine-tune individual telemetry channels for soundtrack, sensor alerts, and LUNA dialogue.</p>

            <div class="audio-sliders-grid">
              <div class="slider-control-row">
                <span class="slider-label">MASTER VOLUME:</span>
                <input id="slider-master-vol" type="range" min="0" max="100" step="1" value="100" class="sci-fi-slider" />
                <span id="label-master-vol" class="slider-value-badge">100%</span>
              </div>

              <div class="slider-control-row">
                <span class="slider-label">BACKGROUND MUSIC:</span>
                <input id="slider-music-vol" type="range" min="0" max="100" step="1" value="70" class="sci-fi-slider" />
                <span id="label-music-vol" class="slider-value-badge">70%</span>
              </div>

              <div class="slider-control-row">
                <span class="slider-label">SOUND EFFECTS (SFX &amp; SENSORS):</span>
                <input id="slider-sfx-vol" type="range" min="0" max="100" step="1" value="80" class="sci-fi-slider" />
                <span id="label-sfx-vol" class="slider-value-badge">80%</span>
              </div>

              <div class="slider-control-row">
                <span class="slider-label">LUNA &amp; SUIT DIALOGUE:</span>
                <input id="slider-dialogue-vol" type="range" min="0" max="100" step="1" value="90" class="sci-fi-slider" />
                <span id="label-dialogue-vol" class="slider-value-badge">90%</span>
              </div>
            </div>
          </div>

          <!-- 3. KEYBOARD REBINDING -->
          <div class="settings-section">
            <div class="section-header">
              <div class="section-title-group">
                <span class="section-tag">KEYBOARD MAPPINGS</span>
                <h3>CUSTOMIZABLE KEYBOARD CONTROLS</h3>
              </div>
              <button id="btn-reset-keys" class="btn-text-action" type="button">RESTORE ALL DEFAULT KEYS</button>
            </div>
            <p class="section-desc">Click any key assignment button, then press the desired replacement key on your keyboard.</p>

            <div id="key-bindings-container" class="key-bindings-table">
              <!-- Dynamically populated key rows -->
            </div>
          </div>
        </div>

        <div class="settings-footer">
          <button id="btn-reset-all-settings" class="btn-secondary" type="button">RESTORE ALL DEFAULTS</button>
          <button id="btn-settings-done" class="btn-primary glow-ready" type="button">APPLY &amp; RETURN ▶</button>
        </div>
      </div>

      <!-- CONFIRMATION MODAL (RESTART OR MENU) -->
      <div id="pause-confirm-dialog" class="pause-confirm-overlay hidden">
        <div class="confirm-card glass-card">
          <div class="confirm-warning-icon">⚠</div>
          <h3 id="confirm-dialog-title" class="confirm-title">CONFIRM LEVEL RESTART</h3>
          <p id="confirm-dialog-msg" class="confirm-msg">
            Are you sure you want to restart this sector? Unsaved progress in the current level will be reset. Previously secured levels remain intact.
          </p>
          <div class="confirm-actions">
            <button id="btn-confirm-cancel" class="btn-secondary" type="button">CANCEL</button>
            <button id="btn-confirm-ok" class="btn-danger glow-danger" type="button">CONFIRM RESTART</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);

    this.cacheElements();
    this.bindEvents();

    this.boundKeydownHandler = (e: KeyboardEvent) => this.handleGlobalKeydown(e);
    window.addEventListener('keydown', this.boundKeydownHandler);
  }

  private cacheElements(): void {
    this.menuViewEl = this.container.querySelector('#pause-main-view') as HTMLElement;
    this.settingsViewEl = this.container.querySelector('#pause-settings-view') as HTMLElement;
    this.confirmDialogEl = this.container.querySelector('#pause-confirm-dialog') as HTMLElement;
    this.confirmTitleEl = this.container.querySelector('#confirm-dialog-title') as HTMLElement;
    this.confirmMsgEl = this.container.querySelector('#confirm-dialog-msg') as HTMLElement;
    this.confirmBtnOk = this.container.querySelector('#btn-confirm-ok') as HTMLElement;
    this.levelTitleEl = this.container.querySelector('#pause-level-name') as HTMLElement;
    this.conflictAlertEl = this.container.querySelector('#settings-conflict-alert') as HTMLElement;

    this.sensSlider = this.container.querySelector('#slider-mouse-sens') as HTMLInputElement;
    this.sensValEl = this.container.querySelector('#label-mouse-sens') as HTMLElement;

    this.masterSlider = this.container.querySelector('#slider-master-vol') as HTMLInputElement;
    this.masterValEl = this.container.querySelector('#label-master-vol') as HTMLElement;
    this.musicSlider = this.container.querySelector('#slider-music-vol') as HTMLInputElement;
    this.musicValEl = this.container.querySelector('#label-music-vol') as HTMLElement;
    this.sfxSlider = this.container.querySelector('#slider-sfx-vol') as HTMLInputElement;
    this.sfxValEl = this.container.querySelector('#label-sfx-vol') as HTMLElement;
    this.dialogueSlider = this.container.querySelector('#slider-dialogue-vol') as HTMLInputElement;
    this.dialogueValEl = this.container.querySelector('#label-dialogue-vol') as HTMLElement;

    this.keyBindingsListEl = this.container.querySelector('#key-bindings-container') as HTMLElement;
  }

  private bindEvents(): void {
    // Main pause buttons
    this.container.querySelector('#btn-pause-resume')?.addEventListener('click', () => {
      this.resume();
    });

    this.container.querySelector('#btn-pause-settings')?.addEventListener('click', () => {
      this.showView('settings');
    });

    this.container.querySelector('#btn-pause-restart')?.addEventListener('click', () => {
      this.promptConfirm('restart');
    });

    this.container.querySelector('#btn-pause-main-menu')?.addEventListener('click', () => {
      this.promptConfirm('menu');
    });

    // Settings back & done buttons
    this.container.querySelector('#btn-settings-back')?.addEventListener('click', () => {
      this.showView('menu');
    });
    this.container.querySelector('#btn-settings-done')?.addEventListener('click', () => {
      this.showView('menu');
    });

    // Confirmation buttons
    this.container.querySelector('#btn-confirm-cancel')?.addEventListener('click', () => {
      this.hideConfirm();
    });
    this.confirmBtnOk?.addEventListener('click', () => {
      this.executeConfirm();
    });

    // Sensitivity slider
    this.sensSlider?.addEventListener('input', () => {
      const val = parseFloat(this.sensSlider.value);
      this.sensValEl.textContent = `${val.toFixed(2)}x`;
      this.settingsManager.setSensitivity(val);
    });

    this.container.querySelector('#btn-reset-sens')?.addEventListener('click', () => {
      this.settingsManager.resetSensitivity();
      this.syncUIFromSettings();
    });

    // Audio sliders
    const updateAudioFromSliders = () => {
      const audio: Partial<AudioSettings> = {
        masterVolume: parseInt(this.masterSlider.value, 10),
        musicVolume: parseInt(this.musicSlider.value, 10),
        sfxVolume: parseInt(this.sfxSlider.value, 10),
        dialogueVolume: parseInt(this.dialogueSlider.value, 10),
      };
      this.masterValEl.textContent = `${audio.masterVolume}%`;
      this.musicValEl.textContent = `${audio.musicVolume}%`;
      this.sfxValEl.textContent = `${audio.sfxVolume}%`;
      this.dialogueValEl.textContent = `${audio.dialogueVolume}%`;
      this.settingsManager.setAudioSettings(audio);
    };

    this.masterSlider?.addEventListener('input', updateAudioFromSliders);
    this.musicSlider?.addEventListener('input', updateAudioFromSliders);
    this.sfxSlider?.addEventListener('input', updateAudioFromSliders);
    this.dialogueSlider?.addEventListener('input', updateAudioFromSliders);

    this.container.querySelector('#btn-reset-audio')?.addEventListener('click', () => {
      this.settingsManager.resetAudioSettings();
      this.syncUIFromSettings();
    });

    // Keys reset
    this.container.querySelector('#btn-reset-keys')?.addEventListener('click', () => {
      this.settingsManager.resetKeyBindings();
      this.hideConflictAlert();
      this.renderKeyBindings();
    });

    // Reset all settings
    this.container.querySelector('#btn-reset-all-settings')?.addEventListener('click', () => {
      this.settingsManager.resetAllToDefaults();
      this.hideConflictAlert();
      this.syncUIFromSettings();
    });
  }

  private handleGlobalKeydown(e: KeyboardEvent): void {
    if (!this.isMenuOpen) return;

    // Handle key rebinding capture
    if (this.listeningActionId) {
      e.preventDefault();
      e.stopPropagation();

      const actionId = this.listeningActionId;
      this.listeningActionId = null;

      if (e.code === 'Escape') {
        this.hideConflictAlert();
        this.renderKeyBindings();
        return;
      }

      const res = this.settingsManager.setKeyBinding(actionId, e.code);
      if (!res.success) {
        const friendly = SettingsManager.getFriendlyKeyName(e.code);
        this.showConflictAlert(`CONFLICT: Key "${friendly}" is already assigned to "${res.conflictLabel}"! Reassignment cancelled.`);
      } else {
        this.hideConflictAlert();
      }
      this.renderKeyBindings();
      return;
    }

    // Handle ESC key inside Pause Menu
    if (e.code === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      this.handleEscape();
    }
  }

  public handleEscape(): void {
    if (this.currentConfirmType) {
      this.hideConfirm();
      return;
    }
    if (this.currentView === 'settings') {
      this.showView('menu');
      return;
    }
    this.resume();
  }

  public open(levelDisplayName?: string): void {
    this.isMenuOpen = true;
    this.currentView = 'menu';
    this.listeningActionId = null;
    this.hideConfirm();
    this.hideConflictAlert();

    if (levelDisplayName && this.levelTitleEl) {
      this.levelTitleEl.textContent = levelDisplayName;
    }

    this.syncUIFromSettings();
    this.showView('menu');

    this.container.classList.remove('hidden');
    this.container.style.opacity = '1';
  }

  public close(): void {
    this.isMenuOpen = false;
    this.listeningActionId = null;
    this.hideConfirm();
    this.hideConflictAlert();

    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.classList.add('hidden');
    }, 250);
  }

  public resume(): void {
    this.close();
    if (this.onResumeCallback) {
      this.onResumeCallback();
    }
  }

  public isOpen(): boolean {
    return this.isMenuOpen;
  }

  private showView(view: 'menu' | 'settings'): void {
    this.currentView = view;
    this.listeningActionId = null;
    this.hideConflictAlert();

    if (view === 'menu') {
      this.menuViewEl.classList.remove('hidden');
      this.settingsViewEl.classList.add('hidden');
    } else {
      this.menuViewEl.classList.add('hidden');
      this.settingsViewEl.classList.remove('hidden');
      this.syncUIFromSettings();
    }
  }

  private syncUIFromSettings(): void {
    // Sensitivity
    const sens = this.settingsManager.getSensitivity();
    if (this.sensSlider) this.sensSlider.value = sens.toString();
    if (this.sensValEl) this.sensValEl.textContent = `${sens.toFixed(2)}x`;

    // Audio
    const audio = this.settingsManager.getAudioSettings();
    if (this.masterSlider) this.masterSlider.value = audio.masterVolume.toString();
    if (this.masterValEl) this.masterValEl.textContent = `${audio.masterVolume}%`;

    if (this.musicSlider) this.musicSlider.value = audio.musicVolume.toString();
    if (this.musicValEl) this.musicValEl.textContent = `${audio.musicVolume}%`;

    if (this.sfxSlider) this.sfxSlider.value = audio.sfxVolume.toString();
    if (this.sfxValEl) this.sfxValEl.textContent = `${audio.sfxVolume}%`;

    if (this.dialogueSlider) this.dialogueSlider.value = audio.dialogueVolume.toString();
    if (this.dialogueValEl) this.dialogueValEl.textContent = `${audio.dialogueVolume}%`;

    // Key bindings
    this.renderKeyBindings();
  }

  private renderKeyBindings(): void {
    if (!this.keyBindingsListEl) return;
    this.keyBindingsListEl.innerHTML = '';

    const bindings = this.settingsManager.getKeyBindings();

    bindings.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'key-binding-row';

      const isListening = this.listeningActionId === item.id;
      const friendlyKey = SettingsManager.getFriendlyKeyName(item.code);
      const friendlyAlt = item.altCode ? SettingsManager.getFriendlyKeyName(item.altCode) : null;

      const altDisplay = friendlyAlt ? `<span class="key-alt-badge">/ ${friendlyAlt}</span>` : '';

      row.innerHTML = `
        <div class="key-info">
          <span class="key-action-label">${item.label}</span>
          <span class="key-action-desc">${item.description}</span>
        </div>
        <div class="key-assign-cell">
          ${
            item.isReserved
              ? `<span class="key-reserved-badge" title="System reserved key"><kbd>${friendlyKey}</kbd> <em>(LOCKED)</em></span>`
              : `<button class="btn-key-rebind ${isListening ? 'listening' : ''}" type="button" data-action="${item.id}">
                  ${isListening ? '<span class="pulse-dot-amber"></span> PRESS KEY...' : `<kbd>${friendlyKey}</kbd>`}
                </button>
                ${altDisplay}`
          }
        </div>
      `;

      const btnRebind = row.querySelector('.btn-key-rebind');
      btnRebind?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.startListening(item.id);
      });

      this.keyBindingsListEl.appendChild(row);
    });
  }

  private startListening(actionId: string): void {
    this.hideConflictAlert();
    this.listeningActionId = actionId;
    this.renderKeyBindings();
  }

  private showConflictAlert(msg: string): void {
    if (!this.conflictAlertEl) return;
    const txt = this.conflictAlertEl.querySelector('#settings-conflict-text');
    if (txt) txt.textContent = msg;
    this.conflictAlertEl.classList.remove('hidden');
  }

  private hideConflictAlert(): void {
    this.conflictAlertEl?.classList.add('hidden');
  }

  // Confirmation modal logic
  private promptConfirm(type: 'restart' | 'menu'): void {
    this.currentConfirmType = type;
    if (type === 'restart') {
      if (this.confirmTitleEl) this.confirmTitleEl.textContent = 'CONFIRM LEVEL RESTART';
      if (this.confirmMsgEl) {
        this.confirmMsgEl.textContent =
          'Are you sure you want to restart the current sector? Unsaved progress and collected artifacts in this active level will be reset. Previously secured levels remain intact.';
      }
      if (this.confirmBtnOk) {
        this.confirmBtnOk.textContent = 'RESTART LEVEL ↺';
        this.confirmBtnOk.className = 'btn-danger glow-danger';
      }
    } else {
      if (this.confirmTitleEl) this.confirmTitleEl.textContent = 'RETURN TO MAIN MENU';
      if (this.confirmMsgEl) {
        this.confirmMsgEl.textContent =
          'Are you sure you want to exit to the Main Menu? Your current mission progress is safely preserved in local records.';
      }
      if (this.confirmBtnOk) {
        this.confirmBtnOk.textContent = 'EXIT TO MENU ⏏';
        this.confirmBtnOk.className = 'btn-primary glow-ready';
      }
    }
    this.confirmDialogEl?.classList.remove('hidden');
  }

  private hideConfirm(): void {
    this.currentConfirmType = null;
    this.confirmDialogEl?.classList.add('hidden');
  }

  private executeConfirm(): void {
    const type = this.currentConfirmType;
    this.hideConfirm();
    this.close();

    if (type === 'restart') {
      if (this.onRestartLevelCallback) {
        this.onRestartLevelCallback();
      }
    } else if (type === 'menu') {
      if (this.onReturnToMainMenuCallback) {
        this.onReturnToMainMenuCallback();
      }
    }
  }

  // Callback setters
  public setOnResume(cb: () => void): void {
    this.onResumeCallback = cb;
  }

  public setOnRestartLevel(cb: () => void): void {
    this.onRestartLevelCallback = cb;
  }

  public setOnReturnToMainMenu(cb: () => void): void {
    this.onReturnToMainMenuCallback = cb;
  }

  public dispose(): void {
    window.removeEventListener('keydown', this.boundKeydownHandler);
    this.container.remove();
  }
}
