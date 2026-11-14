export class InputManager {
  private keyStates: Map<string, boolean> = new Map();
  private onKeyDownBound: (e: KeyboardEvent) => void;
  private onKeyUpBound: (e: KeyboardEvent) => void;

  constructor() {
    this.onKeyDownBound = (e: KeyboardEvent) => {
      this.keyStates.set(e.code, true);
    };

    this.onKeyUpBound = (e: KeyboardEvent) => {
      this.keyStates.set(e.code, false);
    };

    window.addEventListener('keydown', this.onKeyDownBound);
    window.addEventListener('keyup', this.onKeyUpBound);
  }

  public isKeyDown(code: string): boolean {
    return this.keyStates.get(code) === true;
  }

  public dispose(): void {
    window.removeEventListener('keydown', this.onKeyDownBound);
    window.removeEventListener('keyup', this.onKeyUpBound);
    this.keyStates.clear();
  }
}
