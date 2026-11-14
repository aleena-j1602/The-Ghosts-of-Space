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
  TransformNode,
  SceneLoader,
} from '@babylonjs/core';

import '@babylonjs/loaders/glTF';

import { LunaCharacter } from '../companion/LunaCharacter.ts';

export class ResearchCabinEnvironment {
  public scene: Scene;
  public camera!: FreeCamera;
  public luna!: LunaCharacter;

  private hologramNode!: TransformNode;

  private nebulaMeshes: Mesh[] = [];
  private asteroidMeshes: Mesh[] = [];

  private onReadyCallback?: () => void;
  private disposed: boolean = false;

  constructor(engine: Engine, onReady?: () => void) {
    this.scene = new Scene(engine);
    this.scene.clearColor = new Color4(0.015, 0.02, 0.04, 1.0);
    this.onReadyCallback = onReady;

    this.setupCamera();
    this.setupLighting();
    this.setupLaboratoryArchitecture();
    this.setupObservationBay();
    this.setupAstrogationTable();
    this.setupScienceStations();
    this.setupLuna();

    // Load the Cabin GLB model
    this.loadCabinPack();

    this.setupAnimationLoop();

    setTimeout(() => {
      if (!this.disposed && this.onReadyCallback) {
        this.onReadyCallback();
      }
    }, 400);
  }

  // --------------------------------------------------
  // FIRST-PERSON CAMERA & CONTROLS
  // --------------------------------------------------

  private setupCamera(): void {
    const canvas = this.scene.getEngine().getRenderingCanvas();

    this.camera = new FreeCamera(
      'researchCabinCamera',
      new Vector3(0, 1.6, -2.5),
      this.scene
    );

    this.camera.setTarget(new Vector3(0, 1.45, 1.2));
    this.camera.fov = 0.95;
    this.camera.speed = 0.18;
    this.camera.angularSensibility = 2500;

    this.camera.keysUp = [87];
    this.camera.keysDown = [83];
    this.camera.keysLeft = [65];
    this.camera.keysRight = [68];

    this.camera.attachControl(canvas, true);
    this.camera.minZ = 0.1;
    this.camera.maxZ = 120;
  }

  // --------------------------------------------------
  // LIGHTING
  // --------------------------------------------------

  private setupLighting(): void {
    const ambientLight = new HemisphericLight(
      'researchAmbient',
      new Vector3(0, 1, 0),
      this.scene
    );

    ambientLight.intensity = 0.38;
    ambientLight.diffuse = new Color3(0.3, 0.42, 0.65);
    ambientLight.groundColor = new Color3(0.08, 0.1, 0.16);

    const holoLight = new PointLight(
      'holoPointLight',
      new Vector3(0, 1.6, 0.8),
      this.scene
    );

    holoLight.intensity = 1.6;
    holoLight.diffuse = new Color3(0.2, 0.85, 0.95);
    holoLight.range = 7;

    const stationLight = new PointLight(
      'stationPointLight',
      new Vector3(-2.8, 2.0, 1.0),
      this.scene
    );

    stationLight.intensity = 0.9;
    stationLight.diffuse = new Color3(0.95, 0.72, 0.2);
    stationLight.range = 5.5;

    const viewportLight = new PointLight(
      'viewportPointLight',
      new Vector3(0, 2.2, 4.0),
      this.scene
    );

    viewportLight.intensity = 1.1;
    viewportLight.diffuse = new Color3(0.5, 0.65, 0.9);
    viewportLight.range = 8;
  }

  // --------------------------------------------------
  // RESEARCH LAB ARCHITECTURE
  // --------------------------------------------------

  private setupLaboratoryArchitecture(): void {
    const floorMat = new StandardMaterial('labFloorMat', this.scene);
    floorMat.diffuseColor = new Color3(0.08, 0.1, 0.14);
    floorMat.specularColor = new Color3(0.25, 0.3, 0.38);

    const wallMat = new StandardMaterial('labWallMat', this.scene);
    wallMat.diffuseColor = new Color3(0.11, 0.14, 0.2);
    wallMat.specularColor = new Color3(0.15, 0.18, 0.22);

    const frameMat = new StandardMaterial('labFrameMat', this.scene);
    frameMat.diffuseColor = new Color3(0.22, 0.26, 0.32);

    const seamGlowMat = new StandardMaterial('labSeamGlow', this.scene);
    seamGlowMat.emissiveColor = new Color3(0.15, 0.6, 0.8);

    // Floor
    const floor = MeshBuilder.CreateBox(
      'labFloor',
      { width: 9, height: 0.2, depth: 10 },
      this.scene
    );

    floor.position.y = -0.1;
    floor.material = floorMat;

    // Floor glowing conduit lines
    const conduitLeft = MeshBuilder.CreateBox(
      'floorConduitL',
      { width: 0.08, height: 0.02, depth: 8 },
      this.scene
    );

    conduitLeft.position = new Vector3(-1.8, 0.01, 0);
    conduitLeft.material = seamGlowMat;

    const conduitRight = MeshBuilder.CreateBox(
      'floorConduitR',
      { width: 0.08, height: 0.02, depth: 8 },
      this.scene
    );

    conduitRight.position = new Vector3(1.8, 0.01, 0);
    conduitRight.material = seamGlowMat;

    // Ceiling
    const ceiling = MeshBuilder.CreateBox(
      'labCeiling',
      { width: 9, height: 0.2, depth: 10 },
      this.scene
    );

    ceiling.position.y = 3.6;
    ceiling.material = wallMat;

    // Back Wall
    const backWall = MeshBuilder.CreateBox(
      'labBackWall',
      { width: 9, height: 3.6, depth: 0.2 },
      this.scene
    );

    backWall.position = new Vector3(0, 1.7, -5.0);
    backWall.material = wallMat;

    // Left Wall
    const leftWall = MeshBuilder.CreateBox(
      'labLeftWall',
      { width: 0.2, height: 3.6, depth: 10 },
      this.scene
    );

    leftWall.position = new Vector3(-4.5, 1.7, 0);
    leftWall.material = wallMat;

    // Right Wall
    const rightWall = MeshBuilder.CreateBox(
      'labRightWall',
      { width: 0.2, height: 3.6, depth: 10 },
      this.scene
    );

    rightWall.position = new Vector3(4.5, 1.7, 0);
    rightWall.material = wallMat;

    // Structural arch columns
    for (let z of [-2.5, 0.5, 3.2]) {
      const archL = MeshBuilder.CreateBox(
        `archL_${z}`,
        { width: 0.4, height: 3.6, depth: 0.3 },
        this.scene
      );

      archL.position = new Vector3(-4.3, 1.7, z);
      archL.material = frameMat;

      const archR = MeshBuilder.CreateBox(
        `archR_${z}`,
        { width: 0.4, height: 3.6, depth: 0.3 },
        this.scene
      );

      archR.position = new Vector3(4.3, 1.7, z);
      archR.material = frameMat;

      const beam = MeshBuilder.CreateBox(
        `archBeam_${z}`,
        { width: 8.8, height: 0.3, depth: 0.3 },
        this.scene
      );

      beam.position = new Vector3(0, 3.45, z);
      beam.material = frameMat;
    }
  }

  // --------------------------------------------------
  // PANORAMIC VIEWPORT, STARFIELD & COSMIC NEBULA
  // --------------------------------------------------

  private setupObservationBay(): void {
    const frameMat = new StandardMaterial('obsFrameMat', this.scene);
    frameMat.diffuseColor = new Color3(0.2, 0.24, 0.3);

    const glassMat = new StandardMaterial('obsGlassMat', this.scene);
    glassMat.diffuseColor = new Color3(0.1, 0.2, 0.3);
    glassMat.alpha = 0.25;

    // Forward bulkhead frame
    const bayLeft = MeshBuilder.CreateBox(
      'bayFrameL',
      { width: 2.2, height: 3.6, depth: 0.3 },
      this.scene
    );

    bayLeft.position = new Vector3(-3.4, 1.7, 4.8);
    bayLeft.material = frameMat;

    const bayRight = MeshBuilder.CreateBox(
      'bayFrameR',
      { width: 2.2, height: 3.6, depth: 0.3 },
      this.scene
    );

    bayRight.position = new Vector3(3.4, 1.7, 4.8);
    bayRight.material = frameMat;

    const bayTop = MeshBuilder.CreateBox(
      'bayFrameTop',
      { width: 9, height: 0.8, depth: 0.3 },
      this.scene
    );

    bayTop.position = new Vector3(0, 3.2, 4.8);
    bayTop.material = frameMat;

    const bayBottom = MeshBuilder.CreateBox(
      'bayFrameBottom',
      { width: 9, height: 0.8, depth: 0.3 },
      this.scene
    );

    bayBottom.position = new Vector3(0, 0.4, 4.8);
    bayBottom.material = frameMat;

    // Panoramic observation glass
    const viewGlass = MeshBuilder.CreateBox(
      'viewGlass',
      { width: 4.8, height: 2.2, depth: 0.05 },
      this.scene
    );

    viewGlass.position = new Vector3(0, 1.8, 4.8);
    viewGlass.material = glassMat;

    // Deep Space Starfield
    const starMat = new StandardMaterial('deepStarMat', this.scene);
    starMat.emissiveColor = new Color3(0.95, 0.97, 1.0);
    starMat.disableLighting = true;

    for (let i = 0; i < 400; i++) {
      const star = MeshBuilder.CreateSphere(
        `deepStar_${i}`,
        { diameter: Math.random() * 0.3 + 0.12, segments: 4 },
        this.scene
      );

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const dist = 75 + Math.random() * 30;

      star.position = new Vector3(
        dist * Math.sin(phi) * Math.cos(theta),
        dist * Math.cos(phi) + 10,
        dist * Math.sin(phi) * Math.sin(theta) + 20
      );

      star.material = starMat;
      star.freezeWorldMatrix();
    }

    // Cosmic Nebula Clouds
    const nebulaColors = [
      new Color3(0.5, 0.2, 0.8),
      new Color3(0.15, 0.65, 0.85),
      new Color3(0.85, 0.3, 0.6),
    ];

    nebulaColors.forEach((col, idx) => {
      const nebula = MeshBuilder.CreateSphere(
        `nebulaCloud_${idx}`,
        { diameter: 45 + idx * 10, segments: 10 },
        this.scene
      );

      nebula.position = new Vector3(
        -25 + idx * 25,
        20 + idx * 5,
        65 + idx * 15
      );

      nebula.scaling = new Vector3(1.6, 0.9, 0.7);

      const nebMat = new StandardMaterial(`nebMat_${idx}`, this.scene);
      nebMat.emissiveColor = col;
      nebMat.alpha = 0.22;
      nebMat.disableLighting = true;

      nebula.material = nebMat;
      this.nebulaMeshes.push(nebula);
    });

    // Drifting Asteroid Belt
    for (let a = 0; a < 6; a++) {
      const asteroid = MeshBuilder.CreateSphere(
        `asteroid_${a}`,
        { diameter: 3.5 + Math.random() * 4, segments: 6 },
        this.scene
      );

      asteroid.position = new Vector3(
        -18 + a * 7,
        2 + Math.random() * 6,
        25 + a * 6
      );

      asteroid.scaling = new Vector3(1.2, 0.8, 1.4);

      const astMat = new StandardMaterial(`astMat_${a}`, this.scene);
      astMat.diffuseColor = new Color3(0.18, 0.18, 0.22);
      astMat.specularColor = new Color3(0.08, 0.08, 0.08);

      asteroid.material = astMat;
      this.asteroidMeshes.push(asteroid);
    }
  }

  // --------------------------------------------------
  // CENTRAL ASTROGATION HOLOGRAM TABLE
  // --------------------------------------------------

  private setupAstrogationTable(): void {
    this.hologramNode = new TransformNode('hologramRoot', this.scene);
    this.hologramNode.position = new Vector3(0, 0.9, 0.8);

    const metalMat = new StandardMaterial('pedestalMetal', this.scene);
    metalMat.diffuseColor = new Color3(0.16, 0.19, 0.25);
    metalMat.specularColor = new Color3(0.35, 0.4, 0.5);

    const holoCyanMat = new StandardMaterial('holoCyan', this.scene);
    holoCyanMat.emissiveColor = new Color3(0.2, 0.85, 0.95);
    holoCyanMat.alpha = 0.75;
    holoCyanMat.disableLighting = true;

    const holoAmberMat = new StandardMaterial('holoAmber', this.scene);
    holoAmberMat.emissiveColor = new Color3(0.95, 0.75, 0.2);
    holoAmberMat.alpha = 0.75;
    holoAmberMat.disableLighting = true;

    // Pedestal base
    const base = MeshBuilder.CreateCylinder(
      'holoBase',
      { height: 0.85, diameter: 2.2, tessellation: 20 },
      this.scene
    );

    base.position.y = 0.42;
    base.position.z = 0.8;
    base.material = metalMat;

    // Glowing core rim
    const ringRim = MeshBuilder.CreateTorus(
      'holoRingRim',
      { diameter: 2.1, thickness: 0.06, tessellation: 24 },
      this.scene
    );

    ringRim.position = new Vector3(0, 0.85, 0.8);
    ringRim.material = holoCyanMat;

    // Orbital trajectory rings
    const orbitRing1 = MeshBuilder.CreateTorus(
      'orbitRing1',
      { diameter: 1.6, thickness: 0.02, tessellation: 32 },
      this.scene
    );

    orbitRing1.rotation.x = Math.PI / 2.2;
    orbitRing1.material = holoCyanMat;
    orbitRing1.parent = this.hologramNode;

    const orbitRing2 = MeshBuilder.CreateTorus(
      'orbitRing2',
      { diameter: 1.1, thickness: 0.02, tessellation: 32 },
      this.scene
    );

    orbitRing2.rotation.y = Math.PI / 4;
    orbitRing2.rotation.x = Math.PI / 2.5;
    orbitRing2.material = holoAmberMat;
    orbitRing2.parent = this.hologramNode;

    // Central holographic sphere
    const holoCore = MeshBuilder.CreateSphere(
      'holoSun',
      { diameter: 0.35, segments: 12 },
      this.scene
    );

    holoCore.material = holoAmberMat;
    holoCore.parent = this.hologramNode;

    // Probe beacons
    const probe1 = MeshBuilder.CreateBox(
      'holoProbe1',
      { width: 0.08, height: 0.08, depth: 0.08 },
      this.scene
    );

    probe1.position = new Vector3(0.7, 0.1, 0.2);
    probe1.material = holoCyanMat;
    probe1.parent = this.hologramNode;

    const probe2 = MeshBuilder.CreateBox(
      'holoProbe2',
      { width: 0.08, height: 0.08, depth: 0.08 },
      this.scene
    );

    probe2.position = new Vector3(-0.55, 0.18, -0.4);
    probe2.material = holoAmberMat;
    probe2.parent = this.hologramNode;

    const probe3 = MeshBuilder.CreateBox(
      'holoProbe3',
      { width: 0.08, height: 0.08, depth: 0.08 },
      this.scene
    );

    probe3.position = new Vector3(0.2, -0.15, -0.65);
    probe3.material = holoCyanMat;
    probe3.parent = this.hologramNode;
  }

  // --------------------------------------------------
  // CABIN GLB MODEL
  // --------------------------------------------------

  private async loadCabinPack(): Promise<void> {
    try {
      const result = await SceneLoader.ImportMeshAsync(
        '',
        '/models/',
        'Cabin.glb',
        this.scene
      );

      // Prevent attaching the model after the environment is disposed
      if (this.disposed) {
        result.meshes.forEach((mesh) => mesh.dispose());
        return;
      }

      const cabin = result.meshes[0];

      if (!cabin) {
        throw new Error('No root mesh found in Cabin.glb');
      }

      // Reset rotationQuaternion so Euler angles apply reliably in BabylonJS
      cabin.rotationQuaternion = null;

      // Rotate 180 degrees so equipment control panels and screens face the room and player
      cabin.rotation = new Vector3(0, Math.PI, 0);

      // Scale model: Cabin.glb is ~41m wide and ~13.9m tall in raw asset units.
      // Scaling by 0.15 gives ~6.15m width and ~2.08m height, fitting naturally in the 9m x 3.6m lab room.
      const scale = 0.15;
      cabin.scaling = new Vector3(scale, scale, scale);

      // Position right behind the central astrogation table (table ends at z=1.9)
      // and in front of the observation bulkhead wall (wall at z=4.8)
      cabin.position = new Vector3(0, 0, 2.65);

      console.log('[ResearchCabinEnvironment] Cabin.glb equipment pack loaded successfully.');
    } catch (error) {
      console.error('[ResearchCabinEnvironment] Failed to load Cabin.glb:', error);
    }
  }

  // --------------------------------------------------
  // SCIENCE WORKSTATIONS & TELEMETRY TERMINALS
  // --------------------------------------------------

  private setupScienceStations(): void {
    const consoleMat = new StandardMaterial('labConsoleMat', this.scene);
    consoleMat.diffuseColor = new Color3(0.15, 0.18, 0.24);

    const screenCyan = new StandardMaterial('screenCyanMat', this.scene);
    screenCyan.emissiveColor = new Color3(0.15, 0.7, 0.85);
    screenCyan.alpha = 0.85;

    const screenAmber = new StandardMaterial('screenAmberMat', this.scene);
    screenAmber.emissiveColor = new Color3(0.9, 0.65, 0.18);
    screenAmber.alpha = 0.85;

    // Left Wall: Long-Range Sensor Station
    const deskLeft = MeshBuilder.CreateBox(
      'deskLeft',
      { width: 0.9, height: 0.95, depth: 3.2 },
      this.scene
    );

    deskLeft.position = new Vector3(-3.8, 0.48, 0);
    deskLeft.material = consoleMat;

    const monitorL1 = MeshBuilder.CreateBox(
      'monitorL1',
      { width: 0.08, height: 0.7, depth: 1.1 },
      this.scene
    );

    monitorL1.position = new Vector3(-3.7, 1.4, -0.7);
    monitorL1.material = screenCyan;

    const monitorL2 = MeshBuilder.CreateBox(
      'monitorL2',
      { width: 0.08, height: 0.7, depth: 1.1 },
      this.scene
    );

    monitorL2.position = new Vector3(-3.7, 1.4, 0.7);
    monitorL2.material = screenAmber;

    // Right Wall: Communication Relay
    const deskRight = MeshBuilder.CreateBox(
      'deskRight',
      { width: 0.9, height: 0.95, depth: 3.2 },
      this.scene
    );

    deskRight.position = new Vector3(3.8, 0.48, 0);
    deskRight.material = consoleMat;

    const monitorR1 = MeshBuilder.CreateBox(
      'monitorR1',
      { width: 0.08, height: 0.7, depth: 1.1 },
      this.scene
    );

    monitorR1.position = new Vector3(3.7, 1.4, -0.7);
    monitorR1.material = screenAmber;

    const monitorR2 = MeshBuilder.CreateBox(
      'monitorR2',
      { width: 0.08, height: 0.7, depth: 1.1 },
      this.scene
    );

    monitorR2.position = new Vector3(3.7, 1.4, 0.7);
    monitorR2.material = screenCyan;
  }

  // --------------------------------------------------
  // COMPANION LUNA IN RESEARCH LAB
  // --------------------------------------------------

  private setupLuna(): void {
    this.luna = new LunaCharacter(this.scene, 'LunaScienceOfficer');

    this.luna.setPosition(new Vector3(1.15, 1.45, 1.0));
    this.luna.setExpression('curious');
  }

  // --------------------------------------------------
  // ANIMATION LOOP
  // --------------------------------------------------

  private setupAnimationLoop(): void {
    let elapsed = 0;

    this.scene.onBeforeRenderObservable.add(() => {
      if (this.disposed) return;

      const dt = this.scene.getEngine().getDeltaTime() * 0.001;
      elapsed += dt;

      // Rotate central holographic table
      if (this.hologramNode) {
        this.hologramNode.rotation.y += dt * 0.35;
      }

      // Rotate drifting asteroids
      this.asteroidMeshes.forEach((ast, idx) => {
        ast.rotation.y += dt * (0.05 + idx * 0.02);
        ast.rotation.x += dt * 0.03;
      });

      // Luna breathing animation
      if (this.luna && this.luna.root) {
        const hoverY = 1.45 + Math.sin(elapsed * 2.2) * 0.05;

        this.luna.setPosition(new Vector3(1.15, hoverY, 1.0));

        this.luna.root.lookAt(
          new Vector3(
            this.camera.position.x,
            hoverY,
            this.camera.position.z
          )
        );
      }

      // Constrain player camera within lab bounds
      if (this.camera) {
        this.camera.position.x = Math.max(
          -3.8,
          Math.min(3.8, this.camera.position.x)
        );

        this.camera.position.z = Math.max(
          -4.2,
          Math.min(1.6, this.camera.position.z)
        );

        this.camera.position.y = 1.6;
      }
    });
  }

  // --------------------------------------------------
  // CLEANUP & DISPOSAL
  // --------------------------------------------------

  public dispose(): void {
    if (this.disposed) return;

    this.disposed = true;

    this.luna?.dispose();
    this.camera?.dispose();

    this.scene.dispose();
  }
}