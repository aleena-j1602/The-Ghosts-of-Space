export class InputManager {
  private keysDown: Set<string> = new Set();

  constructor() {
    this.initListeners();
  }

  private initListeners(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      this.keysDown.add(e.code);
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      this.keysDown.delete(e.code);
    });
  }

  public isKeyDown(code: string): boolean {
    return this.keysDown.has(code);
  }

  public dispose(): void {
    this.keysDown.clear();
  }
}
