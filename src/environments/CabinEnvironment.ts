import {
  Scene,
  Engine,
  Vector3,
  Color3,
  Color4,
  HemisphericLight,
  PointLight,
  FreeCamera,
  MeshBuilder,
  StandardMaterial,
  Mesh,
} from '@babylonjs/core';

import { LunaCharacter } from '../companion/LunaCharacter.ts';

export class CabinEnvironment {
  public scene: Scene;
  public camera!: FreeCamera;
  public luna!: LunaCharacter;

  private moonViewportMesh!: Mesh;

  private lunaApproachProgress: number = 0;
  private isLunaApproaching: boolean = true;
  private onAwakenedCallback?: () => void;
  private isRechargeMode: boolean = false;

  constructor(engine: Engine, onAwakened?: () => void, isRechargeMode: boolean = false) {
    this.scene = new Scene(engine);
    this.scene.clearColor = new Color4(0.04, 0.06, 0.1, 1.0);
    this.onAwakenedCallback = onAwakened;
    this.isRechargeMode = isRechargeMode;
    this.isLunaApproaching = !isRechargeMode;

    this.setupCamera();
    this.setupLighting();
    this.setupCabinRoom();
    this.setupViewportWindow();
    this.setupHibernationBerth();
    this.setupLuna();
    this.setupAnimations();

    if (this.isRechargeMode) {
      setTimeout(() => {
        if (this.onAwakenedCallback) {
          this.onAwakenedCallback();
        }
      }, 350);
    }
  }

  // --------------------------------------------------
  // CAMERA
  // --------------------------------------------------

  private setupCamera(): void {
    const canvas = this.scene.getEngine().getRenderingCanvas();

    this.camera = new FreeCamera(
      'cabinFPVCamera',
      new Vector3(0, 1.35, -1.8),
      this.scene
    );

    this.camera.setTarget(new Vector3(0, 1.35, 1.0));

    // Slightly wider field of view
    this.camera.fov = 0.95;

    this.camera.attachControl(canvas, true);

    this.camera.minZ = 0.1;
    this.camera.maxZ = 100;
  }

  // --------------------------------------------------
  // LIGHTING
  // --------------------------------------------------

  private setupLighting(): void {
    const cabinAmbient = new HemisphericLight(
      'cabinAmbient',
      new Vector3(0, 1, 0),
      this.scene
    );

    cabinAmbient.intensity = 0.4;
    cabinAmbient.diffuse = new Color3(0.4, 0.5, 0.7);
    cabinAmbient.groundColor = new Color3(0.1, 0.12, 0.18);

    const consoleGlow = new PointLight(
      'consoleLight',
      new Vector3(0, 2.2, 0.5),
      this.scene
    );

    consoleGlow.intensity = 1.2;
    consoleGlow.diffuse = new Color3(0.27, 0.85, 0.91);
    consoleGlow.range = 8;

    const berthLight = new PointLight(
      'berthLight',
      new Vector3(0, 2.5, -1.6),
      this.scene
    );

    berthLight.intensity = 0.8;
    berthLight.diffuse = new Color3(0.95, 0.8, 0.5);
    berthLight.range = 4.5;
  }

  // --------------------------------------------------
  // PROCEDURAL CABIN ROOM
  // --------------------------------------------------

  private setupCabinRoom(): void {
    const hullWallMat = new StandardMaterial(
      'cabinHull',
      this.scene
    );

    hullWallMat.diffuseColor = new Color3(0.12, 0.15, 0.22);
    hullWallMat.specularColor = new Color3(0.1, 0.12, 0.15);

    const floorMat = new StandardMaterial(
      'cabinFloor',
      this.scene
    );

    floorMat.diffuseColor = new Color3(0.08, 0.1, 0.14);
    floorMat.specularColor = new Color3(0.2, 0.25, 0.3);

    const metalFrameMat = new StandardMaterial(
      'cabinFrame',
      this.scene
    );

    metalFrameMat.diffuseColor = new Color3(0.25, 0.28, 0.35);

    // Floor
    const floor = MeshBuilder.CreateBox(
      'floor',
      { width: 6, height: 0.2, depth: 8 },
      this.scene
    );

    floor.position.y = -0.1;
    floor.material = floorMat;

    // Ceiling
    const ceiling = MeshBuilder.CreateBox(
      'ceiling',
      { width: 6, height: 0.2, depth: 8 },
      this.scene
    );

    ceiling.position.y = 3.2;
    ceiling.material = hullWallMat;

    // Back wall
    const backWall = MeshBuilder.CreateBox(
      'backWall',
      { width: 6, height: 3.2, depth: 0.2 },
      this.scene
    );

    backWall.position = new Vector3(0, 1.5, -4.0);
    backWall.material = hullWallMat;

    // Left wall
    const leftWall = MeshBuilder.CreateBox(
      'leftWall',
      { width: 0.2, height: 3.2, depth: 8 },
      this.scene
    );

    leftWall.position = new Vector3(-3.0, 1.5, 0);
    leftWall.material = hullWallMat;

    // Right wall
    const rightWall = MeshBuilder.CreateBox(
      'rightWall',
      { width: 0.2, height: 3.2, depth: 8 },
      this.scene
    );

    rightWall.position = new Vector3(3.0, 1.5, 0);
    rightWall.material = hullWallMat;

    // Forward bulkhead arch
    const bulkheadLeft = MeshBuilder.CreateBox(
      'bulkheadL',
      { width: 1.2, height: 3.2, depth: 0.3 },
      this.scene
    );

    bulkheadLeft.position = new Vector3(-2.4, 1.5, 3.8);
    bulkheadLeft.material = metalFrameMat;

    const bulkheadRight = MeshBuilder.CreateBox(
      'bulkheadR',
      { width: 1.2, height: 3.2, depth: 0.3 },
      this.scene
    );

    bulkheadRight.position = new Vector3(2.4, 1.5, 3.8);
    bulkheadRight.material = metalFrameMat;

    // Console desk
    const deskMat = new StandardMaterial(
      'deskMat',
      this.scene
    );

    deskMat.diffuseColor = new Color3(0.15, 0.18, 0.24);

    const consoleDesk = MeshBuilder.CreateBox(
      'consoleDesk',
      { width: 3.6, height: 0.9, depth: 1.2 },
      this.scene
    );

    consoleDesk.position = new Vector3(0, 0.45, 3.0);
    consoleDesk.material = deskMat;

    // Hologram screen
    const screenMat = new StandardMaterial(
      'holoScreenMat',
      this.scene
    );

    screenMat.emissiveColor = new Color3(0.15, 0.7, 0.85);
    screenMat.alpha = 0.85;

    const holoScreen = MeshBuilder.CreateBox(
      'holoScreen',
      { width: 2.8, height: 0.6, depth: 0.05 },
      this.scene
    );

    holoScreen.position = new Vector3(0, 1.25, 3.2);
    holoScreen.rotation.x = -0.2;
    holoScreen.material = screenMat;
  }

  // --------------------------------------------------
  // VIEWPORT WINDOW
  // --------------------------------------------------

  private setupViewportWindow(): void {
    const windowFrameMat = new StandardMaterial(
      'winFrame',
      this.scene
    );

    windowFrameMat.diffuseColor = new Color3(0.05, 0.07, 0.1);

    const glassMat = new StandardMaterial(
      'viewportGlass',
      this.scene
    );

    glassMat.diffuseColor = new Color3(0.1, 0.3, 0.4);
    glassMat.alpha = 0.25;

    const windowGlass = MeshBuilder.CreatePlane(
      'winGlass',
      { width: 3.6, height: 2.0 },
      this.scene
    );

    windowGlass.position = new Vector3(0, 2.0, 3.9);
    windowGlass.material = glassMat;

    // Space backdrop
    const spaceBackdropMat = new StandardMaterial(
      'spaceBackdrop',
      this.scene
    );

    spaceBackdropMat.emissiveColor = new Color3(0.01, 0.02, 0.05);
    spaceBackdropMat.disableLighting = true;

    const backdrop = MeshBuilder.CreatePlane(
      'spaceBackdrop',
      { width: 16, height: 10 },
      this.scene
    );

    backdrop.position = new Vector3(0, 2.0, 8.0);
    backdrop.material = spaceBackdropMat;

    // Moon outside viewport
    this.moonViewportMesh = MeshBuilder.CreateSphere(
      'viewportMoon',
      { diameter: 2.4, segments: 16 },
      this.scene
    );

    this.moonViewportMesh.position = new Vector3(1.8, 2.2, 7.5);

    const moonMat = new StandardMaterial(
      'vpMoonMat',
      this.scene
    );

    moonMat.diffuseColor = new Color3(0.8, 0.82, 0.85);
    moonMat.emissiveColor = new Color3(0.15, 0.15, 0.18);

    this.moonViewportMesh.material = moonMat;
  }

  // --------------------------------------------------
  // HIBERNATION BERTH
  // --------------------------------------------------

  private setupHibernationBerth(): void {
    const berthMat = new StandardMaterial(
      'berthMat',
      this.scene
    );

    berthMat.diffuseColor = new Color3(0.2, 0.23, 0.3);

    const paddingMat = new StandardMaterial(
      'padMat',
      this.scene
    );

    paddingMat.diffuseColor = new Color3(0.08, 0.12, 0.18);

    // Bed frame
    const bedFrame = MeshBuilder.CreateBox(
      'bedFrame',
      { width: 1.6, height: 0.6, depth: 2.4 },
      this.scene
    );

    bedFrame.position = new Vector3(0, 0.3, -1.8);
    bedFrame.material = berthMat;

    // Mattress
    const mattress = MeshBuilder.CreateBox(
      'mattress',
      { width: 1.4, height: 0.2, depth: 2.2 },
      this.scene
    );

    mattress.position = new Vector3(0, 0.65, -1.8);
    mattress.material = paddingMat;
  }

  // --------------------------------------------------
  // LUNA
  // --------------------------------------------------

  private setupLuna(): void {
    this.luna = new LunaCharacter(
      this.scene,
      'CabinLuna'
    );

    if (this.isRechargeMode) {
      this.luna.setPosition(new Vector3(0.15, 1.35, 0.8));
      this.luna.setExpression('witty');
    } else {
      this.luna.setPosition(new Vector3(0.8, 1.25, 2.2));
      this.luna.setExpression('curious');
    }
  }

  // --------------------------------------------------
  // ANIMATIONS
  // --------------------------------------------------

  private setupAnimations(): void {
    // Luna's initial position
    const startPos = new Vector3(
      0.8,
      1.25,
      2.2
    );

    // Luna stops farther away from the camera
    const endPos = new Vector3(
      0.15,
      1.35,
      0.8
    );

    this.scene.onBeforeRenderObservable.add(() => {
      const dt =
        this.scene.getEngine().getDeltaTime() * 0.001;

      // Luna animations
      this.luna.update(dt);

      this.luna.setLookAt(this.camera.position);

      // Rotate Moon outside viewport
      if (this.moonViewportMesh) {
        this.moonViewportMesh.rotation.y += dt * 0.05;
      }

      // Luna approaching sequence
      if (this.isLunaApproaching) {
        this.lunaApproachProgress += dt * 0.55;

        const t = Math.min(
          this.lunaApproachProgress,
          1.0
        );

        // Ease-out cubic
        const ease = 1 - Math.pow(1 - t, 3);

        const currentPos = Vector3.Lerp(
          startPos,
          endPos,
          ease
        );

        this.luna.setPosition(currentPos);

        if (t >= 1.0) {
          this.isLunaApproaching = false;

          this.luna.setExpression('happy');

          if (this.onAwakenedCallback) {
            this.onAwakenedCallback();
          }
        }
      }
    });
  }

  // --------------------------------------------------
  // DISPOSE
  // --------------------------------------------------

  public dispose(): void {
    if (this.luna) {
      this.luna.dispose();
    }

    this.scene.dispose();
  }
}