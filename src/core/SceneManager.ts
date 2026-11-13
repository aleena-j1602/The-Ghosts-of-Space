import { Engine, Scene } from '@babylonjs/core';
import { SpaceEnvironment } from '../environments/SpaceEnvironment.ts';
import { CabinEnvironment } from '../environments/CabinEnvironment.ts';
import { MoonEnvironment } from '../environments/MoonEnvironment.ts';
import { InputManager } from './InputManager.ts';
import { LunaCharacter } from '../companion/LunaCharacter.ts';

export class SceneManager {
  private engine: Engine;
  private inputManager: InputManager;
  private spaceEnvironment: SpaceEnvironment | null = null;
  private cabinEnvironment: CabinEnvironment | null = null;
  private moonEnvironment: MoonEnvironment | null = null;
  private activeSceneName: string = 'SpaceEnvironment';

  constructor(engine: Engine, inputManager: InputManager) {
    this.engine = engine;
    this.inputManager = inputManager;
  }

  public initSpaceCinematic(): void {
    this.disposeCurrent();
    this.spaceEnvironment = new SpaceEnvironment(this.engine);
    this.activeSceneName = 'SpaceEnvironment';

    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.spaceEnvironment?.scene) {
        this.spaceEnvironment.scene.render();
      }
    });
  }

  public switchToCabin(onLunaAwakened?: () => void): CabinEnvironment {
    this.disposeCurrent();
    this.cabinEnvironment = new CabinEnvironment(this.engine, onLunaAwakened);
    this.activeSceneName = 'CabinEnvironment';

    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.cabinEnvironment?.scene) {
        this.cabinEnvironment.scene.render();
      }
    });

    return this.cabinEnvironment;
  }

  public switchToMoon(
    playLandingCinematic: boolean = true,
    onLandingComplete?: () => void,
    onLunaAlert?: (message: string) => void
  ): MoonEnvironment {
    this.disposeCurrent();
    this.moonEnvironment = new MoonEnvironment(
      this.engine,
      this.inputManager,
      playLandingCinematic,
      onLandingComplete,
      onLunaAlert
    );
    this.activeSceneName = 'MoonEnvironment';

    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.moonEnvironment?.scene) {
        this.moonEnvironment.scene.render();
      }
    });

    return this.moonEnvironment;
  }

  public getMoonEnvironment(): MoonEnvironment | null {
    return this.moonEnvironment;
  }

  public getLunaCharacter(): LunaCharacter | null {
    if (this.cabinEnvironment) {
      return this.cabinEnvironment.luna;
    }
    if (this.moonEnvironment) {
      return this.moonEnvironment.lunaFollower.luna;
    }
    return null;
  }

  public getActiveSceneName(): string {
    return this.activeSceneName;
  }

  public getActiveScene(): Scene | null {
    if (this.activeSceneName === 'SpaceEnvironment') {
      return this.spaceEnvironment?.scene ?? null;
    }
    if (this.activeSceneName === 'CabinEnvironment') {
      return this.cabinEnvironment?.scene ?? null;
    }
    if (this.activeSceneName === 'MoonEnvironment') {
      return this.moonEnvironment?.scene ?? null;
    }
    return null;
  }

  private disposeCurrent(): void {
    if (this.spaceEnvironment) {
      this.spaceEnvironment.dispose();
      this.spaceEnvironment = null;
    }
    if (this.cabinEnvironment) {
      this.cabinEnvironment.dispose();
      this.cabinEnvironment = null;
    }
    if (this.moonEnvironment) {
      this.moonEnvironment.dispose();
      this.moonEnvironment = null;
    }
  }

  public dispose(): void {
    this.disposeCurrent();
  }
}
