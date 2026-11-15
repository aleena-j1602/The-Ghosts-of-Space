
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
  AbstractMesh,
  SceneLoader,
  DynamicTexture,
  Texture,
} from '@babylonjs/core';

import '@babylonjs/loaders/glTF';
import { LunaCharacter } from '../companion/LunaCharacter.ts';

export class CabinEnvironment {
  public scene: Scene;
  public camera!: FreeCamera;
  public luna!: LunaCharacter;

  // Astronaut in cabin
  private astronautRoot: TransformNode | null = null;
  private astronautMeshes: AbstractMesh[] = [];

  // Lighting
  private cabinAmbient!: HemisphericLight;
  private consoleLight!: PointLight;
  private berthLight!: PointLight;
  private ceilingLightL!: PointLight;
  private ceilingLightR!: PointLight;

  // Viewport & Outside Vista
  private moonViewportMesh!: Mesh;
  private earthViewportMesh!: Mesh;

  // Timeline & Animation State
  private cabinTimer: number = 0;
  private isAwakeningActive: boolean = true;
  private lunaRevealed: boolean = false;
  private lunaArrived: boolean = false;
  private onAwakenedCallback?: () => void;
  private isSkipped: boolean = false;
  private isRechargeMode: boolean = false;

  // Camera targets
  private readonly cameraVisorPos = new Vector3(0, 1.35, -3.2);
  private readonly cameraAwakePos = new Vector3(0, 1.55, -3.5);
  
  private readonly targetCockpitCenter = new Vector3(0, 1.35, 1.5);
  private readonly targetLunaReveal = new Vector3(0.65, 0.85, 1.4);
  private readonly targetLunaBerth = new Vector3(0.50, 0.68, -0.95);

  constructor(
    engine: Engine,
    onAwakened?: () => void,
    isRechargeMode: boolean = false,
    skipToAwakened: boolean = false
  ) {
    this.scene = new Scene(engine);

    this.scene.clearColor = new Color4(0.02, 0.03, 0.06, 1.0);

    this.onAwakenedCallback = onAwakened;
    this.isRechargeMode = isRechargeMode;
    this.isSkipped = skipToAwakened || isRechargeMode;

    this.setupCamera();
    this.setupLighting();
    this.setupCabinRoom();
    this.setupFlightDeckConsoles();
    this.setupViewportWindow();
    this.setupHibernationBerth();

    void this.setupAstronautCharacter();

    this.setupLuna();
    this.setupAnimations();

    if (this.isRechargeMode) {
      this.skipToAwakened();

      setTimeout(() => {
        this.onAwakenedCallback?.();
      }, 350);

    } else if (this.isSkipped) {
      this.skipToAwakened();

    } else {
      this.playEngineShutdown();
    }
  }

  // --------------------------------------------------
  // FIRST-PERSON AWAKENING CAMERA
  // --------------------------------------------------

  private setupCamera(): void {
    const canvas = this.scene.getEngine().getRenderingCanvas();

    this.camera = new FreeCamera(
      'cabinFPVCamera',
      this.cameraVisorPos.clone(),
      this.scene
    );

    this.camera.setTarget(this.targetCockpitCenter.clone());

    // Wider FOV for a zoomed-out cabin view.
    this.camera.minZ = 0.05;
    this.camera.maxZ = 120;
    this.camera.fov = 1.35;
    this.camera.angularSensibility = 2500;

    if (this.isSkipped) {
      this.camera.attachControl(canvas, true);
    }
  }

  // --------------------------------------------------
  // COCKPIT INTERIOR LIGHTING
  // --------------------------------------------------

  private setupLighting(): void {
    this.cabinAmbient = new HemisphericLight(
      'cabinAmbient',
      new Vector3(0, 1, 0),
      this.scene
    );

    this.cabinAmbient.intensity = this.isSkipped ? 0.58 : 0.22;
    this.cabinAmbient.diffuse = new Color3(0.35, 0.45, 0.65);
    this.cabinAmbient.groundColor = new Color3(0.06, 0.08, 0.12);

    this.consoleLight = new PointLight(
      'consoleLight',
      new Vector3(0, 1.8, 1.8),
      this.scene
    );

    this.consoleLight.intensity = this.isSkipped ? 1.2 : 0.85;
    this.consoleLight.diffuse = new Color3(0.27, 0.85, 0.91);
    this.consoleLight.range = 8.5;

    this.berthLight = new PointLight(
      'berthLight',
      new Vector3(0, 2.4, -1.8),
      this.scene
    );

    this.berthLight.intensity = this.isSkipped ? 0.95 : 0.55;
    this.berthLight.diffuse = new Color3(0.98, 0.82, 0.55);
    this.berthLight.range = 5.0;

    this.ceilingLightL = new PointLight(
      'ceilLightL',
      new Vector3(-1.4, 2.8, 0.5),
      this.scene
    );

    this.ceilingLightL.intensity = this.isSkipped ? 1.15 : 0.2;
    this.ceilingLightL.diffuse = new Color3(0.85, 0.92, 1.0);
    this.ceilingLightL.range = 7.0;

    this.ceilingLightR = new PointLight(
      'ceilLightR',
      new Vector3(1.4, 2.8, 0.5),
      this.scene
    );

    this.ceilingLightR.intensity = this.isSkipped ? 1.15 : 0.2;
    this.ceilingLightR.diffuse = new Color3(0.85, 0.92, 1.0);
    this.ceilingLightR.range = 7.0;
  }

  // --------------------------------------------------
  // CABIN ROOM STRUCTURE & FINISHES
  // --------------------------------------------------

  private setupCabinRoom(): void {
    const hullMat = new StandardMaterial('cabinHull', this.scene);
    hullMat.diffuseColor = new Color3(0.12, 0.15, 0.2);
    hullMat.specularColor = new Color3(0.15, 0.18, 0.22);
    hullMat.specularPower = 16;

    const floorMat = new StandardMaterial('cabinFloor', this.scene);
    floorMat.diffuseColor = new Color3(0.07, 0.09, 0.13);
    floorMat.specularColor = new Color3(0.25, 0.3, 0.38);
    floorMat.specularPower = 32;

    const metalFrameMat = new StandardMaterial('cabinFrame', this.scene);
    metalFrameMat.diffuseColor = new Color3(0.22, 0.26, 0.34);
    metalFrameMat.specularColor = new Color3(0.5, 0.55, 0.65);

    const floorLightStripMat = new StandardMaterial('floorLightStrip', this.scene);
    floorLightStripMat.emissiveColor = new Color3(0.15, 0.65, 0.85);
    floorLightStripMat.disableLighting = true;

    // Floor
    const floor = MeshBuilder.CreateBox(
      'floor',
      { width: 5.6, height: 0.2, depth: 8.5 },
      this.scene
    );

    floor.position.y = -0.1;
    floor.material = floorMat;

    // Floor guide lights
    const stripL = MeshBuilder.CreateBox(
      'stripL',
      { width: 0.08, height: 0.02, depth: 7.5 },
      this.scene
    );

    stripL.position = new Vector3(-0.9, 0.01, 0);
    stripL.material = floorLightStripMat;

    const stripR = MeshBuilder.CreateBox(
      'stripR',
      { width: 0.08, height: 0.02, depth: 7.5 },
      this.scene
    );

    stripR.position = new Vector3(0.9, 0.01, 0);
    stripR.material = floorLightStripMat;

    // Ceiling
    const ceiling = MeshBuilder.CreateBox(
      'ceiling',
      { width: 5.6, height: 0.2, depth: 8.5 },
      this.scene
    );

    ceiling.position.y = 3.2;
    ceiling.material = hullMat;

    const ceilingPanelL = MeshBuilder.CreateBox(
      'ceilPanelL',
      { width: 0.6, height: 0.05, depth: 5.5 },
      this.scene
    );

    ceilingPanelL.position = new Vector3(-1.4, 3.08, 0.5);
    ceilingPanelL.material = floorLightStripMat;

    const ceilingPanelR = MeshBuilder.CreateBox(
      'ceilPanelR',
      { width: 0.6, height: 0.05, depth: 5.5 },
      this.scene
    );

    ceilingPanelR.position = new Vector3(1.4, 3.08, 0.5);
    ceilingPanelR.material = floorLightStripMat;

    // Walls
    const backWall = MeshBuilder.CreateBox(
      'backWall',
      { width: 5.6, height: 3.2, depth: 0.2 },
      this.scene
    );

    backWall.position = new Vector3(0, 1.5, -4.1);
    backWall.material = hullMat;

    const leftWall = MeshBuilder.CreateBox(
      'leftWall',
      { width: 0.2, height: 3.2, depth: 8.5 },
      this.scene
    );

    leftWall.position = new Vector3(-2.8, 1.5, 0);
    leftWall.material = hullMat;

    const rightWall = MeshBuilder.CreateBox(
      'rightWall',
      { width: 0.2, height: 3.2, depth: 8.5 },
      this.scene
    );

    rightWall.position = new Vector3(2.8, 1.5, 0);
    rightWall.material = hullMat;

    // Structural arch bulkheads
    [-2.5, 0.0, 2.2].forEach((z, idx) => {
      const archL = MeshBuilder.CreateBox(
        `archL_${idx}`,
        { width: 0.35, height: 3.1, depth: 0.25 },
        this.scene
      );

      archL.position = new Vector3(-2.65, 1.55, z);
      archL.material = metalFrameMat;

      const archR = MeshBuilder.CreateBox(
        `archR_${idx}`,
        { width: 0.35, height: 3.1, depth: 0.25 },
        this.scene
      );

      archR.position = new Vector3(2.65, 1.55, z);
      archR.material = metalFrameMat;

      const archTop = MeshBuilder.CreateBox(
        `archTop_${idx}`,
        { width: 5.2, height: 0.25, depth: 0.25 },
        this.scene
      );

      archTop.position = new Vector3(0, 3.05, z);
      archTop.material = metalFrameMat;
    });
  }

  // --------------------------------------------------
  // FLIGHT DECK CONSOLES & LANDING DISPLAYS
  // --------------------------------------------------

  private setupFlightDeckConsoles(): void {
    const consoleBodyMat = new StandardMaterial('consoleBodyMat', this.scene);
    consoleBodyMat.diffuseColor = new Color3(0.14, 0.17, 0.23);
    consoleBodyMat.specularColor = new Color3(0.3, 0.35, 0.42);

    const mainDesk = MeshBuilder.CreateBox(
      'mainDesk',
      { width: 4.4, height: 0.85, depth: 1.4 },
      this.scene
    );

    mainDesk.position = new Vector3(0, 0.42, 2.9);
    mainDesk.material = consoleBodyMat;

    const angledDash = MeshBuilder.CreateBox(
      'angledDash',
      { width: 4.2, height: 0.45, depth: 0.6 },
      this.scene
    );

    angledDash.position = new Vector3(0, 0.95, 3.2);
    angledDash.rotation.x = -0.35;
    angledDash.material = consoleBodyMat;

    // Left Pilot MFD Screen
    const mfdLTexture = this.createTelemetryTexture(
      'TOUCHDOWN CONFIRMED // MARE TRANQUILLITATIS',
      [
        'DEST: Mare Tranquillitatis',
        'SITE: 0.67416° N, 23.47314° E',
        'TOUCHDOWN VELOCITY: 0.0 M/S [STABLE]',
        'MAIN ENGINES: SHUTDOWN // SAFED',
        'MISSION STATUS: SURFACE EXPLORATION READY',
      ],
      '#46d9e8'
    );

    const mfdLMat = new StandardMaterial('mfdLMat', this.scene);
    mfdLMat.diffuseTexture = mfdLTexture;
    mfdLMat.emissiveTexture = mfdLTexture;
    mfdLMat.emissiveColor = new Color3(1, 1, 1);

    const mfdLeft = MeshBuilder.CreatePlane(
      'mfdLeft',
      { width: 1.3, height: 0.65 },
      this.scene
    );

    mfdLeft.position = new Vector3(-1.25, 1.15, 3.05);
    mfdLeft.rotation.x = -0.32;
    mfdLeft.material = mfdLMat;

    // Right Pilot MFD Screen
    const mfdRTexture = this.createTelemetryTexture(
      'CABIN LIFE SUPPORT // NOMINAL',
      [
        'CABIN PRESSURE: 101.3 kPa [NOMINAL]',
        'INTERNAL TEMP: 21.4°C [STABLE]',
        'O2 RESERVES: 99.8% [RECHARGE NOMINAL]',
        'PRIMARY POWER: FUEL CELLS ACTIVE',
        'SURFACE SCAN: 3 ARTIFACT SIGNATURES DETECTED',
      ],
      '#22c55e'
    );

    const mfdRMat = new StandardMaterial('mfdRMat', this.scene);
    mfdRMat.diffuseTexture = mfdRTexture;
    mfdRMat.emissiveTexture = mfdRTexture;
    mfdRMat.emissiveColor = new Color3(1, 1, 1);

    const mfdRight = MeshBuilder.CreatePlane(
      'mfdRight',
      { width: 1.3, height: 0.65 },
      this.scene
    );

    mfdRight.position = new Vector3(1.25, 1.15, 3.05);
    mfdRight.rotation.x = -0.32;
    mfdRight.material = mfdRMat;

    // Center Holographic Terminal
    const holoScreenMat = new StandardMaterial('holoScreenMat', this.scene);
    holoScreenMat.emissiveColor = new Color3(0.2, 0.85, 0.95);
    holoScreenMat.alpha = 0.85;

    const centerHolo = MeshBuilder.CreateBox(
      'centerHolo',
      { width: 1.0, height: 0.5, depth: 0.04 },
      this.scene
    );

    centerHolo.position = new Vector3(0, 1.25, 3.1);
    centerHolo.rotation.x = -0.25;
    centerHolo.material = holoScreenMat;

    // Flight Joysticks
    const stickMat = new StandardMaterial('stickMat', this.scene);
    stickMat.diffuseColor = new Color3(0.08, 0.08, 0.1);
    stickMat.specularColor = new Color3(0.7, 0.7, 0.8);

    [-1.2, 1.2].forEach((x, idx) => {
      const stickBase = MeshBuilder.CreateCylinder(
        `stickBase_${idx}`,
        { height: 0.08, diameter: 0.16 },
        this.scene
      );

      stickBase.position = new Vector3(x, 0.88, 2.55);
      stickBase.material = stickMat;

      const stickShaft = MeshBuilder.CreateCylinder(
        `stickShaft_${idx}`,
        { height: 0.28, diameter: 0.04 },
        this.scene
      );

      stickShaft.position = new Vector3(x, 1.02, 2.55);
      stickShaft.rotation.x = -0.15;
      stickShaft.material = stickMat;

      const stickGrip = MeshBuilder.CreateBox(
        `stickGrip_${idx}`,
        { width: 0.06, height: 0.12, depth: 0.08 },
        this.scene
      );

      stickGrip.position = new Vector3(x, 1.14, 2.53);
      stickGrip.material = stickMat;
    });
  }

  // --------------------------------------------------
  // FORWARD VIEWPORT WINDOW & LUNAR PANORAMA
  // --------------------------------------------------

  private setupViewportWindow(): void {
    const frameMat = new StandardMaterial('winFrame', this.scene);
    frameMat.diffuseColor = new Color3(0.08, 0.1, 0.14);
    frameMat.specularColor = new Color3(0.3, 0.35, 0.45);

    const glassMat = new StandardMaterial('viewportGlass', this.scene);
    glassMat.diffuseColor = new Color3(0.1, 0.35, 0.5);
    glassMat.alpha = 0.2;
    glassMat.specularColor = new Color3(0.9, 0.95, 1.0);
    glassMat.specularPower = 64;

    const windowGlass = MeshBuilder.CreatePlane(
      'winGlass',
      { width: 4.4, height: 1.8 },
      this.scene
    );

    windowGlass.position = new Vector3(0, 2.1, 3.8);
    windowGlass.material = glassMat;

    // Window vertical mullions
    [-1.45, 1.45].forEach((x, idx) => {
      const mullion = MeshBuilder.CreateBox(
        `mullion_${idx}`,
        { width: 0.1, height: 1.8, depth: 0.1 },
        this.scene
      );

      mullion.position = new Vector3(x, 2.1, 3.8);
      mullion.material = frameMat;
    });

    // Deep Space Backdrop
    const spaceBackdropMat = new StandardMaterial('spaceBackdrop', this.scene);
    spaceBackdropMat.emissiveColor = new Color3(0.008, 0.012, 0.03);
    spaceBackdropMat.disableLighting = true;

    const backdrop = MeshBuilder.CreatePlane(
      'spaceBackdrop',
      { width: 22, height: 14 },
      this.scene
    );

    backdrop.position = new Vector3(0, 2.2, 9.5);
    backdrop.material = spaceBackdropMat;

    // Moon
    this.moonViewportMesh = MeshBuilder.CreateSphere(
      'viewportMoon',
      { diameter: 3.6, segments: 24 },
      this.scene
    );

    this.moonViewportMesh.position = new Vector3(2.2, 1.9, 8.2);

    const moonMat = new StandardMaterial('vpMoonMat', this.scene);

    try {
      moonMat.diffuseTexture = new Texture(
        '/models/textures/moon-diffuse.jpg',
        this.scene
      );

      const normalTex = new Texture(
        '/models/textures/moon-normal.jpg',
        this.scene
      );

      normalTex.level = 1.8;
      moonMat.bumpTexture = normalTex;

    } catch {
      moonMat.diffuseColor = new Color3(0.82, 0.84, 0.88);
    }

    moonMat.emissiveColor = new Color3(0.18, 0.18, 0.22);
    this.moonViewportMesh.material = moonMat;

    // Earth
    this.earthViewportMesh = MeshBuilder.CreateSphere(
      'viewportEarth',
      { diameter: 1.2, segments: 24 },
      this.scene
    );

    this.earthViewportMesh.position = new Vector3(-2.8, 3.1, 8.8);

    const earthMat = new StandardMaterial('vpEarthMat', this.scene);
    earthMat.diffuseColor = new Color3(0.15, 0.45, 0.85);
    earthMat.emissiveColor = new Color3(0.08, 0.25, 0.55);

    this.earthViewportMesh.material = earthMat;
  }

  // --------------------------------------------------
  // ERGONOMIC HIBERNATION BERTH
  // --------------------------------------------------

  private setupHibernationBerth(): void {
    const berthFrameMat = new StandardMaterial('berthFrameMat', this.scene);
    berthFrameMat.diffuseColor = new Color3(0.15, 0.18, 0.24);
    berthFrameMat.specularColor = new Color3(0.4, 0.45, 0.55);

    const paddingMat = new StandardMaterial('padMat', this.scene);
    paddingMat.diffuseColor = new Color3(0.08, 0.11, 0.16);
    paddingMat.specularColor = new Color3(0.15, 0.2, 0.25);

    const canopyGlassMat = new StandardMaterial('berthCanopyMat', this.scene);
    canopyGlassMat.diffuseColor = new Color3(0.2, 0.7, 0.9);
    canopyGlassMat.alpha = 0.18;
    canopyGlassMat.emissiveColor = new Color3(0.05, 0.25, 0.35);

    const runnerMat = new StandardMaterial('runnerMat', this.scene);
    runnerMat.emissiveColor = new Color3(0.15, 0.75, 0.95);
    runnerMat.disableLighting = true;

    // Base Pedestal
    const basePedestal = MeshBuilder.CreateBox(
      'berthBase',
      { width: 1.6, height: 0.45, depth: 2.5 },
      this.scene
    );

    basePedestal.position = new Vector3(0, 0.22, -1.8);
    basePedestal.material = berthFrameMat;

    const baseStrip = MeshBuilder.CreateBox(
      'berthBaseStrip',
      { width: 1.62, height: 0.04, depth: 2.52 },
      this.scene
    );

    baseStrip.position = new Vector3(0, 0.06, -1.8);
    baseStrip.material = runnerMat;

    // Contoured Recliner
    const lowerLegRest = MeshBuilder.CreateBox(
      'lowerLegRest',
      { width: 1.25, height: 0.18, depth: 1.1 },
      this.scene
    );

    lowerLegRest.position = new Vector3(0, 0.48, -1.15);
    lowerLegRest.material = paddingMat;

    const torsoIncline = MeshBuilder.CreateBox(
      'torsoIncline',
      { width: 1.25, height: 0.18, depth: 1.35 },
      this.scene
    );

    torsoIncline.position = new Vector3(0, 0.68, -2.15);
    torsoIncline.rotation.x = -0.42;
    torsoIncline.material = paddingMat;

    const headrestPillow = MeshBuilder.CreateBox(
      'headrestPillow',
      { width: 0.75, height: 0.14, depth: 0.45 },
      this.scene
    );

    headrestPillow.position = new Vector3(0, 0.96, -2.62);
    headrestPillow.rotation.x = -0.38;
    headrestPillow.material = paddingMat;

    // Side Armrests
    [-0.72, 0.72].forEach((x, idx) => {
      const armrest = MeshBuilder.CreateBox(
        `armrest_${idx}`,
        { width: 0.18, height: 0.32, depth: 1.8 },
        this.scene
      );

      armrest.position = new Vector3(x, 0.58, -1.8);
      armrest.material = berthFrameMat;
    });

    // Transparent Canopy
    const canopy = MeshBuilder.CreateCylinder(
      'canopyArch',
      { height: 2.2, diameter: 1.5, arc: 0.5, tessellation: 24 },
      this.scene
    );

    canopy.rotation.z = Math.PI / 2;
    canopy.rotation.y = Math.PI;
    canopy.position = new Vector3(0, 0.85, -1.85);
    canopy.material = canopyGlassMat;

    // Left Diagnostic Pylon
    // Vital Diagnostic Pylons — Left & Right

    const pylonLTexture = this.createTelemetryTexture(
      'BIOMETRIC // AWAKENED',
      [
        'HEART RATE: 64 BPM [STABLE]',
        'NEURAL EEG: SYNCHRONIZED',
        'CORE TEMP: 37.0 C [NOMINAL]',
        'THAW CYCLE: 100% COMPLETE',
      ],
      '#46d9e8'
    );

    pylonLTexture.uScale = -1;
    pylonLTexture.uOffset = 1;

    const pylonLMat = new StandardMaterial('pylonLMat', this.scene);
    pylonLMat.diffuseTexture = pylonLTexture;
    pylonLMat.emissiveTexture = pylonLTexture;
    pylonLMat.emissiveColor = new Color3(1, 1, 1);
    pylonLMat.backFaceCulling = false;

    const screenL = MeshBuilder.CreatePlane(
      'screenL',
      { width: 0.85, height: 0.43 },
      this.scene
    );

    screenL.position = new Vector3(-0.85, 1.05, -1.65);
    screenL.rotation.y = Math.PI * 0.56;
    screenL.material = pylonLMat;


    // RIGHT DIAGNOSTIC SCREEN

    const pylonRTexture = this.createTelemetryTexture(
      'CABIN LIFE SUPPORT',
      [
        'PRESSURE: 101.3 kPa',
        'TEMP: 21.4 C [NOMINAL]',
        'O2 SATURATION: 99.8%',
        'SUIT DIAGNOSTICS: READY',
      ],
      '#22c55e'
    );

    pylonRTexture.uScale = -1;
    pylonRTexture.uOffset = 1;

    const pylonRMat = new StandardMaterial('pylonRMat', this.scene);
    pylonRMat.diffuseTexture = pylonRTexture;
    pylonRMat.emissiveTexture = pylonRTexture;
    pylonRMat.emissiveColor = new Color3(1, 1, 1);
    pylonRMat.backFaceCulling = false;

    const screenR = MeshBuilder.CreatePlane(
      'screenR',
      { width: 0.85, height: 0.43 },
      this.scene
    );

    screenR.position = new Vector3(0.85, 1.05, -1.65);
    screenR.rotation.y = -Math.PI * 0.56;
    screenR.material = pylonRMat;
  }

  // --------------------------------------------------
  // ASTRONAUT CHARACTER IN HIBERNATION BERTH
  // --------------------------------------------------

  private async setupAstronautCharacter(): Promise<void> {
    try {
      this.astronautRoot = new TransformNode(
        'cabinAstronautRoot',
        this.scene
      );

      const result = await SceneLoader.ImportMeshAsync(
        '',
        '/models/',
        'astronaut.glb',
        this.scene
      );

      this.astronautMeshes = result.meshes;

      result.meshes.forEach((m) => {
        if (!m.parent) {
          m.parent = this.astronautRoot;
        }
      });

      // Fit height accurately to 1.8m
      let minY = Infinity;
      let maxY = -Infinity;

      for (const mesh of result.meshes) {
        if (!mesh.getTotalVertices()) continue;

        mesh.computeWorldMatrix(true);

        const bounds = mesh.getBoundingInfo().boundingBox;

        minY = Math.min(minY, bounds.minimumWorld.y);
        maxY = Math.max(maxY, bounds.maximumWorld.y);
      }

      const currentHeight = maxY - minY;

      if (currentHeight > 0 && Number.isFinite(currentHeight)) {
        const scaleFactor = 1.8 / currentHeight;
        this.astronautRoot.scaling.setAll(scaleFactor);
      }

      // Reclined in the hibernation berth:
      // feet resting on the leg-rest pad (z ≈ -0.9), head at the
      // headrest pillow (z ≈ -2.67), body nearly horizontal (≈ 80°).
      // rotation.x is positive so the model's +Y axis (head) tilts
      // toward -Z (back wall / camera), not toward the cockpit.
      this.astronautRoot.position = new Vector3(0, 0.57, -0.90);
      this.astronautRoot.rotation = new Vector3(1.40, 0, 0);

      console.log(
        '[CabinEnvironment] Astronaut character positioned in hibernation berth.'
      );

    } catch (err) {
      console.warn(
        '[CabinEnvironment] Failed to load astronaut GLB into cabin:',
        err
      );
    }
  }

  // --------------------------------------------------
  // 3D LUNA COMPANION
  // --------------------------------------------------

  private setupLuna(): void {
    this.luna = new LunaCharacter(this.scene, 'CabinLuna');

    if (this.isRechargeMode) {
      this.luna.setPosition(new Vector3(0.15, 1.35, 0.8));
      this.luna.setExpression('witty');

    } else if (this.isSkipped) {
      this.luna.setPosition(this.targetLunaBerth.clone());
      this.luna.setExpression('happy');

    } else {
      this.luna.setPosition(new Vector3(0.65, 0.85, 1.4));
      this.luna.setExpression('curious');
    }
  }

  // --------------------------------------------------
  // SHOT 3 & SHOT 4 ANIMATIONS & CAMERA REVEAL
  // --------------------------------------------------

  private setupAnimations(): void {
    const lunaStartPos = new Vector3(0.65, 0.85, 1.4);
    const lunaEndPos = this.targetLunaBerth;

    this.scene.onBeforeRenderObservable.add(() => {
      const dt = this.scene.getEngine().getDeltaTime() * 0.001;

      // Update Luna
      this.luna.update(dt);
      this.luna.setLookAt(this.camera.position);

      if (this.moonViewportMesh) {
        this.moonViewportMesh.rotation.y += dt * 0.04;
      }

      if (this.earthViewportMesh) {
        this.earthViewportMesh.rotation.y += dt * 0.02;
      }

      if (!this.isAwakeningActive || this.isSkipped) return;

      this.cabinTimer += dt;
      const t = this.cabinTimer;

      // ========================================================
      // SHOT 3: COCKPIT TRANSITION & SETTLING
      // ========================================================

      if (t < 3.8) {
        const p = t / 3.8;

        let vibration = 0;

        if (t < 1.8) {
          vibration =
            Math.sin(t * 28.0) *
            Math.exp(-t * 2.5) *
            0.02;
        }

        const ease = 1 - Math.pow(1 - p, 2);

        this.camera.position = Vector3.Lerp(
          this.cameraVisorPos,
          this.cameraAwakePos,
          ease
        );

        this.camera.position.y += vibration;

        this.camera.setTarget(this.targetCockpitCenter);

        this.cabinAmbient.intensity = 0.22 + ease * 0.36;
        this.berthLight.intensity = 0.55 + ease * 0.4;

        this.ceilingLightL.intensity = 0.2 + ease * 0.95;
        this.ceilingLightR.intensity = 0.2 + ease * 0.95;
      }

      // ========================================================
      // SHOT 4: INTRODUCE LUNA
      // ========================================================

      else if (t < 9.8) {
        const localT = t - 3.8;

        // Phase 1: Camera pans toward Luna
        if (localT < 2.4) {
          const pPan = localT / 2.4;
          const easePan = 1 - Math.pow(1 - pPan, 3);

          if (!this.lunaRevealed) {
            this.lunaRevealed = true;

            this.luna.setExpression('happy');
            this.playWakeChime();
          }

          const revealLookAt = this.targetLunaReveal.add(
            new Vector3(0, 0.42, 0)
          );

          const curTarget = Vector3.Lerp(
            this.targetCockpitCenter,
            revealLookAt,
            easePan
          );

          this.camera.setTarget(curTarget);

          // Keep the camera at the new zoomed-out position.
          this.camera.position = this.cameraAwakePos.clone();
        }

        // Phase 2: Luna glides toward the berth
        else {
          const pGlide = Math.min(
            (localT - 2.4) / 3.3,
            1.0
          );

          const easeGlide = 1 - Math.pow(1 - pGlide, 3);

          const curPos = Vector3.Lerp(
            lunaStartPos,
            lunaEndPos,
            easeGlide
          );

          this.luna.setPosition(curPos);

          const revealLookAt = this.targetLunaReveal.add(
            new Vector3(0, 0.42, 0)
          );

          const berthLookAt = this.targetLunaBerth.add(
            new Vector3(0, 0.42, 0)
          );

          const curTarget = Vector3.Lerp(
            revealLookAt,
            berthLookAt,
            easeGlide
          );

          this.camera.setTarget(curTarget);
          this.camera.position = this.cameraAwakePos.clone();

          // Luna arrives at the berth
          if (pGlide >= 1.0 && !this.lunaArrived) {
            this.lunaArrived = true;
            this.isAwakeningActive = false;

            const canvas = this.scene.getEngine().getRenderingCanvas();

            this.camera.attachControl(canvas, true);

            this.onAwakenedCallback?.();
          }
        }
      }

      // ========================================================
      // FINAL AWAKENED STATE
      // ========================================================

      else {
        if (!this.lunaArrived) {
          this.lunaArrived = true;
          this.isAwakeningActive = false;

          this.luna.setPosition(lunaEndPos);

          this.camera.position = this.cameraAwakePos.clone();
          this.camera.setTarget(this.targetLunaBerth);

          const canvas = this.scene.getEngine().getRenderingCanvas();

          this.camera.attachControl(canvas, true);

          this.onAwakenedCallback?.();
        }
      }
    });
  }

  // --------------------------------------------------
  // SKIP AWAKENING ANIMATION
  // --------------------------------------------------

  public skipToAwakened(): void {
    this.isAwakeningActive = false;
    this.isSkipped = true;
    this.cabinTimer = 10.0;

    this.camera.position = this.cameraAwakePos.clone();
    this.camera.setTarget(this.targetLunaBerth.clone());

    // Maintain wider camera view.
    this.camera.fov = 1.05;

    const canvas = this.scene.getEngine().getRenderingCanvas();

    this.camera.attachControl(canvas, true);

    this.cabinAmbient.intensity = 0.58;
    this.berthLight.intensity = 0.95;

    this.ceilingLightL.intensity = 1.15;
    this.ceilingLightR.intensity = 1.15;

    this.luna.setPosition(this.targetLunaBerth.clone());
    this.luna.setExpression('happy');

    if (this.onAwakenedCallback) {
      setTimeout(() => {
        this.onAwakenedCallback?.();
      }, 100);
    }
  }

  // --------------------------------------------------
  // AUDIO HELPERS
  // --------------------------------------------------

  private playWakeChime(): void {
    try {
      const AudioCtx =
        window.AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Ascending three-tone greeting chime
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';

        osc.frequency.setValueAtTime(
          freq,
          now + idx * 0.12
        );

        gain.gain.setValueAtTime(
          0.001,
          now + idx * 0.12
        );

        gain.gain.exponentialRampToValueAtTime(
          0.18,
          now + idx * 0.12 + 0.04
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + idx * 0.12 + 0.55
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.6);
      });

    } catch {
      // AudioContext unavailable or blocked
    }
  }

  private playEngineShutdown(): void {
    try {
      const AudioCtx =
        window.AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();

      osc.type = 'sine';

      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(
        65,
        now + 1.8
      );

      const gain = ctx.createGain();

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 2.0
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.1);

    } catch {
      // AudioContext unavailable or blocked
    }
  }

  // --------------------------------------------------
  // TELEMETRY TEXTURE GENERATOR
  // --------------------------------------------------

  private createTelemetryTexture(
    header: string,
    lines: string[],
    colorHex: string
  ): DynamicTexture {
    const dt = new DynamicTexture(
      `dt_${header}`,
      { width: 512, height: 256 },
      this.scene,
      false
    );

    const ctx = dt.getContext();

    // Background
    ctx.fillStyle = '#0a1017';
    ctx.fillRect(0, 0, 512, 256);

    // Border
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, 500, 244);

    // Header
    ctx.fillStyle = colorHex;
    ctx.font = 'bold 22px monospace';
    ctx.fillText(header, 18, 38);

    // Divider
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(18, 52);
    ctx.lineTo(494, 52);
    ctx.stroke();

    // Data rows
    ctx.fillStyle = '#d8e8f8';
    ctx.font = '18px monospace';

    lines.forEach((line, idx) => {
      ctx.fillText(line, 18, 92 + idx * 38);
    });

    dt.update();

    return dt;
  }

  // --------------------------------------------------
  // DISPOSE
  // --------------------------------------------------

  public dispose(): void {
    if (this.luna) {
      this.luna.dispose();
    }

    if (this.astronautRoot) {
      this.astronautRoot.dispose();
      this.astronautRoot = null;
    }

    this.astronautMeshes.forEach((mesh) => {
      mesh.dispose();
    });

    this.astronautMeshes = [];

    this.scene.dispose();
  }
}
