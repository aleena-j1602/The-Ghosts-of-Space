import { Engine, Scene, Vector3 } from '@babylonjs/core';
import { SpaceEnvironment } from '../environments/SpaceEnvironment.ts';
import { CabinEnvironment } from '../environments/CabinEnvironment.ts';
import { MoonEnvironment } from '../environments/MoonEnvironment.ts';
import { MarsEnvironment } from '../environments/MarsEnvironment.ts';
import { ResearchCabinEnvironment } from '../environments/ResearchCabinEnvironment.ts';
import { InputManager } from './InputManager.ts';
import { LunaCharacter } from '../companion/LunaCharacter.ts';

export class SceneManager {
  private engine: Engine;
  private inputManager: InputManager;
  private spaceEnvironment: SpaceEnvironment | null = null;
  private cabinEnvironment: CabinEnvironment | null = null;
  private moonEnvironment: MoonEnvironment | null = null;
  private marsEnvironment: MarsEnvironment | null = null;
  private researchCabinEnvironment: ResearchCabinEnvironment | null = null;
  private activeSceneName: string = 'SpaceEnvironment';

  constructor(engine: Engine, inputManager: InputManager) {
    this.engine = engine;
    this.inputManager = inputManager;
  }

  public initSpaceCinematic(): SpaceEnvironment {
    this.disposeCurrent();
    this.spaceEnvironment = new SpaceEnvironment(this.engine);
    this.activeSceneName = 'SpaceEnvironment';

    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.spaceEnvironment?.scene) {
        this.spaceEnvironment.scene.render();
      }
    });

    return this.spaceEnvironment;
  }

  public skipSpaceCinematic(): void {
    if (this.spaceEnvironment) {
      this.spaceEnvironment.dispose();
      this.spaceEnvironment = null;
    }
  }

  public switchToClosingCinematic(): SpaceEnvironment {
    this.disposeCurrent();
    this.spaceEnvironment = new SpaceEnvironment(this.engine, true);
    this.activeSceneName = 'SpaceEnvironment';

    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.spaceEnvironment?.scene) {
        this.spaceEnvironment.scene.render();
      }
    });

    return this.spaceEnvironment;
  }

  public switchToCabin(onLunaAwakened?: () => void, skipToAwakened: boolean = false): CabinEnvironment {
    this.disposeCurrent();
    this.cabinEnvironment = new CabinEnvironment(this.engine, onLunaAwakened, false, skipToAwakened);
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

  public pauseMoonAndSwitchToCabin(onReady?: () => void): CabinEnvironment {
    this.engine.stopRenderLoop();
    if (this.cabinEnvironment) {
      this.cabinEnvironment.dispose();
      this.cabinEnvironment = null;
    }
    this.cabinEnvironment = new CabinEnvironment(this.engine, onReady, true);
    this.activeSceneName = 'CabinEnvironment';

    this.engine.runRenderLoop(() => {
      if (this.cabinEnvironment?.scene) {
        this.cabinEnvironment.scene.render();
      }
    });

    return this.cabinEnvironment;
  }

  public returnToMoonFromCabin(): MoonEnvironment {
    if (this.cabinEnvironment) {
      this.cabinEnvironment.dispose();
      this.cabinEnvironment = null;
    }

    if (!this.moonEnvironment) {
      return this.switchToMoon(false);
    }

    this.activeSceneName = 'MoonEnvironment';
    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.moonEnvironment?.scene) {
        this.moonEnvironment.scene.render();
      }
    });

    // Reattach camera and player controls
    const canvas = this.engine.getRenderingCanvas();
    if (canvas && this.moonEnvironment.camera?.camera) {
      this.moonEnvironment.camera.camera.attachControl(canvas, true);
    }

    // Place explorer beside the landed shuttle on lunar surface facing the spacecraft
    const spawnPos = MoonEnvironment.SPAWN_POS;
    this.moonEnvironment.astronaut.setPosition(spawnPos);
    const dir = MoonEnvironment.SHUTTLE_CENTER.subtract(spawnPos);
    dir.y = 0;
    dir.normalize();
    this.moonEnvironment.playerController.setFacing(dir);
    if (this.moonEnvironment.camera?.camera) {
      const alpha = Math.atan2(-dir.z, -dir.x);
      this.moonEnvironment.camera.camera.target = spawnPos.add(new Vector3(0, 1.4, 0));
      this.moonEnvironment.camera.camera.alpha = alpha;
    }
    this.moonEnvironment.playerController.setEnabled(true);

    return this.moonEnvironment;
  }

  public switchToMars(
    playLandingCinematic: boolean = true,
    onLandingComplete?: () => void,
    onLunaAlert?: (message: string) => void
  ): MarsEnvironment {
    this.disposeCurrent();
    this.marsEnvironment = new MarsEnvironment(
      this.engine,
      this.inputManager,
      playLandingCinematic,
      onLandingComplete,
      onLunaAlert
    );
    this.activeSceneName = 'MarsEnvironment';

    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.marsEnvironment?.scene) {
        this.marsEnvironment.scene.render();
      }
    });

    return this.marsEnvironment;
  }

  public pauseMarsAndSwitchToCabin(onReady?: () => void): CabinEnvironment {
    this.engine.stopRenderLoop();
    if (this.cabinEnvironment) {
      this.cabinEnvironment.dispose();
      this.cabinEnvironment = null;
    }
    this.cabinEnvironment = new CabinEnvironment(this.engine, onReady, true);
    this.activeSceneName = 'CabinEnvironment';

    this.engine.runRenderLoop(() => {
      if (this.cabinEnvironment?.scene) {
        this.cabinEnvironment.scene.render();
      }
    });

    return this.cabinEnvironment;
  }

  public returnToMarsFromCabin(): MarsEnvironment {
    if (this.cabinEnvironment) {
      this.cabinEnvironment.dispose();
      this.cabinEnvironment = null;
    }

    if (!this.marsEnvironment) {
      return this.switchToMars(false);
    }

    this.activeSceneName = 'MarsEnvironment';
    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.marsEnvironment?.scene) {
        this.marsEnvironment.scene.render();
      }
    });

    // Reattach camera and player controls
    const canvas = this.engine.getRenderingCanvas();
    if (canvas && this.marsEnvironment.camera?.camera) {
      this.marsEnvironment.camera.camera.attachControl(canvas, true);
    }

    // Place explorer right outside the shuttle ramp on Martian surface
    this.marsEnvironment.astronaut.setPosition(new Vector3(0, 0, 4.5));
    this.marsEnvironment.playerController.setEnabled(true);

    return this.marsEnvironment;
  }

  public switchToResearchCabin(onReady?: () => void): ResearchCabinEnvironment {
    this.disposeCurrent();
    this.researchCabinEnvironment = new ResearchCabinEnvironment(this.engine, onReady);
    this.activeSceneName = 'ResearchCabinEnvironment';

    this.engine.stopRenderLoop();
    this.engine.runRenderLoop(() => {
      if (this.researchCabinEnvironment?.scene) {
        this.researchCabinEnvironment.scene.render();
      }
    });

    return this.researchCabinEnvironment;
  }

  public getSpaceEnvironment(): SpaceEnvironment | null {
    return this.spaceEnvironment;
  }

  public getCabinEnvironment(): CabinEnvironment | null {
    return this.cabinEnvironment;
  }

  public getMoonEnvironment(): MoonEnvironment | null {
    return this.moonEnvironment;
  }

  public getMarsEnvironment(): MarsEnvironment | null {
    return this.marsEnvironment;
  }

  public getResearchCabinEnvironment(): ResearchCabinEnvironment | null {
    return this.researchCabinEnvironment;
  }

  public getLunaCharacter(): LunaCharacter | null {
    if (this.researchCabinEnvironment) {
      return this.researchCabinEnvironment.luna;
    }
    if (this.cabinEnvironment) {
      return this.cabinEnvironment.luna;
    }
    if (this.moonEnvironment) {
      return this.moonEnvironment.lunaFollower.luna;
    }
    if (this.marsEnvironment) {
      return this.marsEnvironment.lunaFollower.luna;
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
    if (this.activeSceneName === 'MarsEnvironment') {
      return this.marsEnvironment?.scene ?? null;
    }
    if (this.activeSceneName === 'ResearchCabinEnvironment') {
      return this.researchCabinEnvironment?.scene ?? null;
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
    if (this.marsEnvironment) {
      this.marsEnvironment.dispose();
      this.marsEnvironment = null;
    }
    if (this.researchCabinEnvironment) {
      this.researchCabinEnvironment.dispose();
      this.researchCabinEnvironment = null;
    }
  }

  public dispose(): void {
    this.disposeCurrent();
  }
}
