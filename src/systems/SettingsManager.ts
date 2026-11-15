export interface KeyBindingItem {
  id: string;
  label: string;
  description: string;
  code: string;
  altCode?: string;
  isReserved?: boolean;
}

export interface AudioSettings {
  masterVolume: number;   // 0 - 100
  musicVolume: number;    // 0 - 100
  sfxVolume: number;      // 0 - 100
  dialogueVolume: number; // 0 - 100
}

export interface GameSettingsData {
  mouseSensitivity: number; // 0.2 - 3.0, default 1.0
  keyBindings: Record<string, { code: string; altCode?: string }>;
  audio: AudioSettings;
}

export const DEFAULT_KEY_BINDINGS: KeyBindingItem[] = [
  { id: 'forward', label: 'Move Forward', description: 'Walk/Run forward', code: 'KeyW', altCode: 'ArrowUp' },
  { id: 'backward', label: 'Move Backward', description: 'Walk/Run backward', code: 'KeyS', altCode: 'ArrowDown' },
  { id: 'left', label: 'Strafe Left', description: 'Step left', code: 'KeyA', altCode: 'ArrowLeft' },
  { id: 'right', label: 'Strafe Right', description: 'Step right', code: 'KeyD', altCode: 'ArrowRight' },
  { id: 'sprint', label: 'Sprint', description: 'Hold to run faster', code: 'ShiftLeft', altCode: 'ShiftRight' },
  { id: 'interact', label: 'Interact / Scan', description: 'Examine & scan artifacts', code: 'KeyE' },
  { id: 'recharge', label: 'Habitat / Recharge', description: 'Enter shelter or return to shuttle', code: 'KeyR' },
  { id: 'report', label: 'Transmit Report', description: 'Astrogation telemetry designer', code: 'KeyT' },
  { id: 'sensor', label: 'Toggle Sensor Audio', description: 'Mute / Unmute LUNA audio sensor', code: 'KeyU' },
  { id: 'map', label: 'Sector Map', description: 'Open archaeological navigation map', code: 'KeyM' },
  { id: 'pause', label: 'Pause / Resume', description: 'Pause expedition & open settings', code: 'Escape', isReserved: true },
];

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  masterVolume: 100,
  musicVolume: 70,
  sfxVolume: 80,
  dialogueVolume: 90,
};

export const DEFAULT_MOUSE_SENSITIVITY = 1.0;

export class SettingsManager {
  private static instance: SettingsManager;
  private static readonly STORAGE_KEY = 'GHOSTS_OF_SPACE_SETTINGS_V1';

  private mouseSensitivity: number = DEFAULT_MOUSE_SENSITIVITY;
  private keyBindings: Map<string, KeyBindingItem> = new Map();
  private audio: AudioSettings = { ...DEFAULT_AUDIO_SETTINGS };

  private audioListeners: Set<(settings: AudioSettings) => void> = new Set();
  private sensitivityListeners: Set<(sens: number) => void> = new Set();
  private generalListeners: Set<() => void> = new Set();

  private constructor() {
    this.initDefaults();
    this.loadFromStorage();
  }

  public static getInstance(): SettingsManager {
    if (!SettingsManager.instance) {
      SettingsManager.instance = new SettingsManager();
    }
    return SettingsManager.instance;
  }

  private initDefaults(): void {
    this.mouseSensitivity = DEFAULT_MOUSE_SENSITIVITY;
    this.audio = { ...DEFAULT_AUDIO_SETTINGS };
    this.keyBindings.clear();
    DEFAULT_KEY_BINDINGS.forEach((item) => {
      this.keyBindings.set(item.id, { ...item });
    });
  }

  public loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(SettingsManager.STORAGE_KEY);
      if (!raw) return;

      const data: Partial<GameSettingsData> = JSON.parse(raw);

      if (typeof data.mouseSensitivity === 'number' && !isNaN(data.mouseSensitivity)) {
        this.mouseSensitivity = Math.max(0.2, Math.min(3.0, data.mouseSensitivity));
      }

      if (data.audio) {
        this.audio = {
          masterVolume: Math.max(0, Math.min(100, data.audio.masterVolume ?? DEFAULT_AUDIO_SETTINGS.masterVolume)),
          musicVolume: Math.max(0, Math.min(100, data.audio.musicVolume ?? DEFAULT_AUDIO_SETTINGS.musicVolume)),
          sfxVolume: Math.max(0, Math.min(100, data.audio.sfxVolume ?? DEFAULT_AUDIO_SETTINGS.sfxVolume)),
          dialogueVolume: Math.max(0, Math.min(100, data.audio.dialogueVolume ?? DEFAULT_AUDIO_SETTINGS.dialogueVolume)),
        };
      }

      if (data.keyBindings) {
        Object.entries(data.keyBindings).forEach(([id, binding]) => {
          const current = this.keyBindings.get(id);
          if (current && !current.isReserved && binding.code) {
            current.code = binding.code;
            if (binding.altCode) {
              current.altCode = binding.altCode;
            }
          }
        });
      }

      console.log('[SettingsManager] Settings loaded successfully from localStorage.');
    } catch (err) {
      console.warn('[SettingsManager] Could not load settings from storage, using defaults:', err);
    }
  }

  public saveToStorage(): boolean {
    try {
      const bindingsObj: Record<string, { code: string; altCode?: string }> = {};
      this.keyBindings.forEach((item, id) => {
        bindingsObj[id] = { code: item.code, altCode: item.altCode };
      });

      const data: GameSettingsData = {
        mouseSensitivity: this.mouseSensitivity,
        audio: { ...this.audio },
        keyBindings: bindingsObj,
      };

      localStorage.setItem(SettingsManager.STORAGE_KEY, JSON.stringify(data));
      this.notifyGeneralChange();
      return true;
    } catch (err) {
      console.warn('[SettingsManager] Could not save settings to localStorage:', err);
      return false;
    }
  }

  // Mouse Sensitivity
  public getSensitivity(): number {
    return this.mouseSensitivity;
  }

  public setSensitivity(val: number): void {
    const clamped = Math.max(0.2, Math.min(3.0, Math.round(val * 100) / 100));
    this.mouseSensitivity = clamped;
    this.sensitivityListeners.forEach((cb) => cb(clamped));
    this.saveToStorage();
  }

  public resetSensitivity(): void {
    this.setSensitivity(DEFAULT_MOUSE_SENSITIVITY);
  }

  // Audio Controls
  public getAudioSettings(): AudioSettings {
    return { ...this.audio };
  }

  public setAudioSettings(audio: Partial<AudioSettings>): void {
    if (audio.masterVolume !== undefined) {
      this.audio.masterVolume = Math.max(0, Math.min(100, audio.masterVolume));
    }
    if (audio.musicVolume !== undefined) {
      this.audio.musicVolume = Math.max(0, Math.min(100, audio.musicVolume));
    }
    if (audio.sfxVolume !== undefined) {
      this.audio.sfxVolume = Math.max(0, Math.min(100, audio.sfxVolume));
    }
    if (audio.dialogueVolume !== undefined) {
      this.audio.dialogueVolume = Math.max(0, Math.min(100, audio.dialogueVolume));
    }
    this.notifyAudioChange();
    this.saveToStorage();
  }

  public resetAudioSettings(): void {
    this.setAudioSettings(DEFAULT_AUDIO_SETTINGS);
  }

  public getEffectiveMusicVolume(): number {
    return (this.audio.masterVolume / 100) * (this.audio.musicVolume / 100);
  }

  public getEffectiveSfxVolume(): number {
    return (this.audio.masterVolume / 100) * (this.audio.sfxVolume / 100);
  }

  public getEffectiveDialogueVolume(): number {
    return (this.audio.masterVolume / 100) * (this.audio.dialogueVolume / 100);
  }

  // Key Bindings
  public getKeyBindings(): KeyBindingItem[] {
    return Array.from(this.keyBindings.values());
  }

  public getBinding(actionId: string): KeyBindingItem | undefined {
    return this.keyBindings.get(actionId);
  }

  public getCodesForAction(actionId: string): string[] {
    const item = this.keyBindings.get(actionId);
    if (!item) return [];
    const codes = [item.code];
    if (item.altCode) codes.push(item.altCode);
    return codes;
  }

  public isKeyForAction(code: string, actionId: string): boolean {
    const item = this.keyBindings.get(actionId);
    if (!item) return false;
    return item.code === code || item.altCode === code;
  }

  public checkConflict(targetActionId: string, newCode: string): { hasConflict: boolean; conflictingActionLabel?: string } {
    // ESC is permanently reserved for Pause / Resume
    if (newCode === 'Escape' && targetActionId !== 'pause') {
      return { hasConflict: true, conflictingActionLabel: 'Pause / Resume (Reserved System Key)' };
    }

    for (const [id, item] of this.keyBindings.entries()) {
      if (id === targetActionId) continue;
      if (item.code === newCode || item.altCode === newCode) {
        return { hasConflict: true, conflictingActionLabel: item.label };
      }
    }
    return { hasConflict: false };
  }

  public setKeyBinding(actionId: string, newCode: string): { success: boolean; conflictLabel?: string } {
    const item = this.keyBindings.get(actionId);
    if (!item) return { success: false };
    if (item.isReserved) return { success: false, conflictLabel: 'This action has a reserved system key' };

    const conflict = this.checkConflict(actionId, newCode);
    if (conflict.hasConflict) {
      return { success: false, conflictLabel: conflict.conflictingActionLabel };
    }

    item.code = newCode;
    this.saveToStorage();
    return { success: true };
  }

  public resetKeyBindings(): void {
    DEFAULT_KEY_BINDINGS.forEach((def) => {
      const cur = this.keyBindings.get(def.id);
      if (cur) {
        cur.code = def.code;
        cur.altCode = def.altCode;
      }
    });
    this.saveToStorage();
  }

  public resetAllToDefaults(): void {
    this.initDefaults();
    this.saveToStorage();
    this.sensitivityListeners.forEach((cb) => cb(this.mouseSensitivity));
    this.notifyAudioChange();
  }

  // Observable registration
  public onAudioChange(cb: (settings: AudioSettings) => void): () => void {
    this.audioListeners.add(cb);
    return () => this.audioListeners.delete(cb);
  }

  public onSensitivityChange(cb: (sens: number) => void): () => void {
    this.sensitivityListeners.add(cb);
    return () => this.sensitivityListeners.delete(cb);
  }

  public onSettingsChange(cb: () => void): () => void {
    this.generalListeners.add(cb);
    return () => this.generalListeners.delete(cb);
  }

  private notifyAudioChange(): void {
    const settings = this.getAudioSettings();
    this.audioListeners.forEach((cb) => cb(settings));
  }

  private notifyGeneralChange(): void {
    this.generalListeners.forEach((cb) => cb());
  }

  // Human-friendly key code formatting
  public static getFriendlyKeyName(code: string): string {
    if (!code) return 'NONE';
    if (code.startsWith('Key')) return code.substring(3).toUpperCase();
    if (code.startsWith('Digit')) return code.substring(5);
    if (code.startsWith('Numpad')) return `Num ${code.substring(6)}`;

    const mapping: Record<string, string> = {
      Escape: 'ESC',
      Space: 'SPACE',
      ShiftLeft: 'L-SHIFT',
      ShiftRight: 'R-SHIFT',
      ControlLeft: 'L-CTRL',
      ControlRight: 'R-CTRL',
      AltLeft: 'L-ALT',
      AltRight: 'R-ALT',
      ArrowUp: 'UP ARROW',
      ArrowDown: 'DOWN ARROW',
      ArrowLeft: 'LEFT ARROW',
      ArrowRight: 'RIGHT ARROW',
      Tab: 'TAB',
      Enter: 'ENTER',
      Backspace: 'BACKSPACE',
      Minus: '-',
      Equal: '=',
      BracketLeft: '[',
      BracketRight: ']',
      Semicolon: ';',
      Quote: "'",
      Backquote: '`',
      Comma: ',',
      Period: '.',
      Slash: '/',
    };

    return mapping[code] || code.toUpperCase();
  }
}
