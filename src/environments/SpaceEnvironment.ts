import {
  Scene,
  Engine,
  Vector3,
  Color3,
  Color4,
  HemisphericLight,
  DirectionalLight,
  ArcRotateCamera,
  MeshBuilder,
  StandardMaterial,
  PBRMaterial,
  ParticleSystem,
  Texture,
  TransformNode,
  Mesh,
  SceneLoader,
  AbstractMesh,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

export class SpaceEnvironment {
  public scene: Scene;
  public camera!: ArcRotateCamera;
  public spacecraftRoot!: TransformNode;
  public shuttleMesh: AbstractMesh | null = null;
  public moonRoot!: TransformNode;
  public earthRoot!: TransformNode;

  public mainThrusterParticles!: ParticleSystem;
  public landingThrusterParticles!: ParticleSystem;
  public landingDustParticles!: ParticleSystem;

  public earthMesh!: Mesh;
  public moonMesh!: Mesh;
  public surfaceGround: Mesh | null = null;
  public shuttleGroundOffset: number = 5.83;

  private onIntroCompleteCallback?: () => void;
  private onSkipCallback?: () => void;
  public isClosingMode: boolean = false;

  private overlayContainer: HTMLElement | null = null;
  private missionClockEl: HTMLElement | null = null;
  private telemetryBadgeEl: HTMLElement | null = null;
  private subtitleBadgeEl: HTMLElement | null = null;
  private subtitleTextEl: HTMLElement | null = null;
  private altTelemetryEl: HTMLElement | null = null;
  private skipBtn: HTMLElement | null = null;
  private keydownHandler?: (e: KeyboardEvent) => void;

  public introTimer: number = 0;
  public isIntroActive: boolean = true;
  private touchdownTriggered: boolean = false;
  private transitionTriggered: boolean = false;
  private disposed: boolean = false;

  constructor(engine: Engine, isClosingMode: boolean = false) {
    this.scene = new Scene(engine);
    this.scene.clearColor = new Color4(0.01, 0.02, 0.04, 1.0);
    this.isClosingMode = isClosingMode;

    this.setupCamera(isClosingMode);
    this.setupLighting(isClosingMode);
    this.setupStarfield();
    this.setupCelestialBodies(isClosingMode);
    this.setupSpacecraft(isClosingMode);
    this.setupParticleSystems(isClosingMode);

    if (!isClosingMode) {
      this.setupIntroOverlay();
    }

    this.setupAnimations(isClosingMode);
  }

  // --------------------------------------------------
  // CAMERA
  // --------------------------------------------------
  private setupCamera(isClosingMode: boolean = false): void {
    const canvas = this.scene.getEngine().getRenderingCanvas();
    this.camera = new ArcRotateCamera(
      'spaceCamera',
      isClosingMode ? -Math.PI / 3.4 : -Math.PI / 3.2,
      isClosingMode ? Math.PI / 2.35 : Math.PI / 2.5,
      isClosingMode ? 30 : 28,
      new Vector3(0, 0, 0),
      this.scene
    );
    this.camera.lowerRadiusLimit = 8;
    this.camera.upperRadiusLimit = 85;
    this.camera.wheelPrecision = 40;
    this.camera.attachControl(canvas, true);
  }

  // --------------------------------------------------
  // LIGHTING
  // --------------------------------------------------
  private setupLighting(isClosingMode: boolean = false): void {
    const ambientLight = new HemisphericLight(
      'spaceAmbient',
      new Vector3(0, 1, 0),
      this.scene
    );
    ambientLight.intensity = isClosingMode ? 0.45 : 0.38;
    ambientLight.diffuse = new Color3(0.35, 0.45, 0.65);
    ambientLight.groundColor = new Color3(0.04, 0.05, 0.08);

    const sunLight = new DirectionalLight(
      'sunLight',
      new Vector3(-1, -0.35, 1).normalize(),
      this.scene
    );
    sunLight.intensity = isClosingMode ? 2.2 : 2.0;
    sunLight.diffuse = new Color3(1.0, 0.98, 0.92);
    sunLight.specular = new Color3(0.85, 0.92, 1.0);
  }

  // --------------------------------------------------
  // STARFIELD
  // --------------------------------------------------
  private setupStarfield(): void {
    const starCount = 480;
    const starMaterial = new StandardMaterial('starMat', this.scene);
    starMaterial.emissiveColor = new Color3(1, 1, 1);
    starMaterial.disableLighting = true;

    for (let i = 0; i < starCount; i++) {
      const star = MeshBuilder.CreateSphere(
        `star_${i}`,
        { diameter: Math.random() * 0.45 + 0.15, segments: 4 },
        this.scene
      );
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 180 + Math.random() * 45;

      star.position = new Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      const mat = starMaterial.clone(`starMat_${i}`);
      const brightness = 0.5 + Math.random() * 0.5;
      const tint = Math.random();
      if (tint > 0.8) {
        mat.emissiveColor = new Color3(0.4 * brightness, 0.8 * brightness, 1 * brightness);
      } else if (tint > 0.65) {
        mat.emissiveColor = new Color3(1 * brightness, 0.85 * brightness, 0.4 * brightness);
      } else {
        mat.emissiveColor = new Color3(brightness, brightness, brightness);
      }
      star.material = mat;
      star.freezeWorldMatrix();
    }
  }

  // --------------------------------------------------
  // CELESTIAL BODIES
  // --------------------------------------------------
  private setupCelestialBodies(isClosingMode: boolean = false): void {
    // 1. Earth
    this.earthRoot = new TransformNode('earthRoot', this.scene);
    this.earthMesh = MeshBuilder.CreateSphere(
      'distantEarth',
      { diameter: isClosingMode ? 32 : 24, segments: 24 },
      this.scene
    );
    this.earthMesh.position = isClosingMode ? new Vector3(32, 6, 75) : new Vector3(-85, 20, -120);
    this.earthMesh.parent = this.earthRoot;

    const earthMat = new StandardMaterial('earthMat', this.scene);
    earthMat.diffuseColor = isClosingMode ? new Color3(0.12, 0.38, 0.72) : new Color3(0.08, 0.28, 0.58);
    earthMat.emissiveColor = isClosingMode ? new Color3(0.08, 0.2, 0.38) : new Color3(0.04, 0.12, 0.26);
    earthMat.specularColor = new Color3(0.3, 0.45, 0.65);
    this.earthMesh.material = earthMat;

    // 2. Moon
    this.moonRoot = new TransformNode('moonRoot', this.scene);
    this.moonMesh = MeshBuilder.CreateSphere(
      'distantMoon',
      { diameter: isClosingMode ? 7 : 42, segments: 32 },
      this.scene
    );
    this.moonMesh.position = isClosingMode ? new Vector3(-85, -20, -115) : new Vector3(0, 16, 175);
    this.moonMesh.parent = this.moonRoot;

    const moonMat = new StandardMaterial('moonMat', this.scene);
    moonMat.diffuseTexture = new Texture('/models/textures/moon-diffuse.jpg', this.scene);
    moonMat.diffuseColor = new Color3(0.85, 0.85, 0.88);
    moonMat.emissiveColor = new Color3(0.08, 0.08, 0.09);
    moonMat.specularColor = new Color3(0.05, 0.05, 0.05);
    this.moonMesh.material = moonMat;

    // 3. Ground surface at Tranquillity Base for Shot 2 Touchdown
    // Uses the identical PBR material and textures (diffuse + normal) as MoonEnvironment.ts
    // Explicitly kept disabled during Shot 1 and descent; enabled ONLY right before touchdown
    if (!isClosingMode) {
      this.surfaceGround = MeshBuilder.CreateGround(
        'lunarApproachGround',
        { width: 260, height: 260, subdivisions: 32 },
        this.scene
      );
      this.surfaceGround.position = new Vector3(0, 0, 0);

      const moonMaterial = new PBRMaterial(
        'moonPBRMaterial_cinematic',
        this.scene
      );

      moonMaterial.albedoTexture = new Texture(
        '/models/textures/moon-diffuse.jpg',
        this.scene
      );

      moonMaterial.bumpTexture = new Texture(
        '/models/textures/moon-normal.jpg',
        this.scene
      );

      moonMaterial.metallic = 0;
      moonMaterial.roughness = 0.95;

      const textures = [
        moonMaterial.albedoTexture,
        moonMaterial.bumpTexture,
      ].filter(
        (texture): texture is Texture =>
          texture instanceof Texture
      );

      textures.forEach((texture) => {
        texture.uScale = 8;
        texture.vScale = 8;
        texture.wrapU = Texture.WRAP_ADDRESSMODE;
        texture.wrapV = Texture.WRAP_ADDRESSMODE;
      });

      this.surfaceGround.material = moonMaterial;
      this.surfaceGround.parent = this.moonRoot;

      // Craters matching MoonEnvironment surrounding Tranquillity Base
      const craterMat = new StandardMaterial('craterMat_cinematic', this.scene);
      craterMat.diffuseColor = new Color3(0.38, 0.4, 0.44);
      craterMat.specularColor = new Color3(0.08, 0.08, 0.08);

      const craterPositions = [
        { x: 30, z: 25, r: 12 },
        { x: -45, z: 40, r: 18 },
        { x: 15, z: -50, r: 14 },
        { x: -35, z: -35, r: 10 },
        { x: 65, z: -20, r: 22 },
        { x: -70, z: 10, r: 16 },
      ];

      craterPositions.forEach((cp, idx) => {
        const rim = MeshBuilder.CreateTorus(
          `craterRim_cinematic_${idx}`,
          { diameter: cp.r, thickness: 1.2, tessellation: 20 },
          this.scene
        );
        rim.position = new Vector3(cp.x, 0.2, cp.z);
        rim.material = craterMat;
        rim.parent = this.surfaceGround;

        const floor = MeshBuilder.CreateDisc(
          `craterFloor_cinematic_${idx}`,
          { radius: cp.r * 0.45, tessellation: 16 },
          this.scene
        );
        floor.rotation.x = Math.PI / 2;
        floor.position = new Vector3(cp.x, 0.02, cp.z);
        floor.material = craterMat;
        floor.parent = this.surfaceGround;
      });

      this.surfaceGround.setEnabled(false);
    }
  }

  // --------------------------------------------------
  // SPACECRAFT
  // --------------------------------------------------
  private setupSpacecraft(isClosingMode: boolean = false): void {
    this.spacecraftRoot = new TransformNode('spacecraftRoot', this.scene);
    if (!isClosingMode) {
      this.spacecraftRoot.position = new Vector3(0, 15, -75);
    } else {
      this.spacecraftRoot.position = Vector3.Zero();
    }

    void this.loadSpaceShuttleModel();
  }

  private async loadSpaceShuttleModel(): Promise<void> {
    try {
      const result = await SceneLoader.ImportMeshAsync(
        '',
        '/models/',
        'space-shuttle.glb',
        this.scene
      );

      if (this.disposed) {
        result.meshes.forEach((m) => m.dispose());
        return;
      }

      const shuttle = result.meshes[0];
      if (shuttle) {
        shuttle.rotationQuaternion = null;
        shuttle.position = Vector3.Zero();
        shuttle.scaling = Vector3.One();
        // Facing forward along +Z with cockpit up (+Y) and engines at rear (-Z)
        shuttle.rotation = new Vector3(0, Math.PI, 0);
        shuttle.setEnabled(true);
        shuttle.computeWorldMatrix(true);

        const bounds = shuttle.getHierarchyBoundingVectors(true);
        // Correct height offset: lowest point of landing gear is bounds.min.y (~ -5.75m).
        // Adding +0.08m stops the shuttle cleanly right on the ground surface at touchdown.
        this.shuttleGroundOffset = -bounds.min.y + 0.08;

        // In concluding sequence (cruising through space returning to Earth), center shuttle at (0, 0, 0).
        // In landing intro, offset up by shuttleGroundOffset so wheels touch down on terrain surface at root Y = 0.
        shuttle.position.y = this.isClosingMode ? 0 : this.shuttleGroundOffset;
        shuttle.computeWorldMatrix(true);

        shuttle.parent = this.spacecraftRoot;
        this.shuttleMesh = shuttle;

        // Sync emitter node positions to shuttle engine bells and underside
        const mainNode = this.scene.getMeshByName('mainThrusterEmitterNode');
        if (mainNode) {
          mainNode.position.y = this.isClosingMode ? -2.05 : this.shuttleGroundOffset - 2.05;
          mainNode.position.z = -11.0;
        }
        const landNode = this.scene.getMeshByName('landingThrusterEmitterNode');
        if (landNode) {
          landNode.position.y = this.isClosingMode ? -5.7 : 0.6;
        }

        console.log('[SpaceEnvironment] Space Shuttle GLB loaded successfully from public/models/.');
      }
    } catch (err) {
      console.error('[SpaceEnvironment] Failed to load space-shuttle.glb from public/models/:', err);
    }
  }

  // --------------------------------------------------
  // PARTICLE SYSTEMS
  // --------------------------------------------------
  private setupParticleSystems(isClosingMode: boolean): void {
    const plumeTexture = new Texture(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2P8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      this.scene
    );
    plumeTexture.name = 'engine_plume';

    // 1. Main SSME Cruise Thruster Plume
    const mainNode = MeshBuilder.CreateBox('mainThrusterEmitterNode', { size: 0.1 }, this.scene);
    mainNode.isVisible = false;
    mainNode.position = new Vector3(
      0,
      isClosingMode ? -2.05 : this.shuttleGroundOffset - 2.05,
      -11.0
    );
    mainNode.parent = this.spacecraftRoot;

    this.mainThrusterParticles = new ParticleSystem('mainThrusterParticles', isClosingMode ? 320 : 260, this.scene);
    this.mainThrusterParticles.particleTexture = plumeTexture;
    this.mainThrusterParticles.emitter = mainNode;
    this.mainThrusterParticles.blendMode = ParticleSystem.BLENDMODE_ADD;
    this.mainThrusterParticles.minEmitBox = new Vector3(-0.35, -0.35, 0);
    this.mainThrusterParticles.maxEmitBox = new Vector3(0.35, 0.35, 0);
    this.mainThrusterParticles.color1 = new Color4(0.4, 0.85, 1.0, 0.95);
    this.mainThrusterParticles.color2 = new Color4(0.2, 0.55, 0.95, 0.7);
    this.mainThrusterParticles.colorDead = new Color4(0.05, 0.15, 0.35, 0.0);
    this.mainThrusterParticles.minSize = 0.35;
    this.mainThrusterParticles.maxSize = 1.35;
    this.mainThrusterParticles.minLifeTime = 0.18;
    this.mainThrusterParticles.maxLifeTime = 0.55;
    this.mainThrusterParticles.direction1 = new Vector3(-0.2, -0.2, -5.0);
    this.mainThrusterParticles.direction2 = new Vector3(0.2, 0.2, -6.5);
    this.mainThrusterParticles.minEmitPower = 3.5;
    this.mainThrusterParticles.maxEmitPower = 6.0;
    this.mainThrusterParticles.emitRate = isClosingMode ? 150 : 140;
    this.mainThrusterParticles.start();

    // 2. Landing Thruster Plume (Pointed Downwards toward Surface)
    const landNode = MeshBuilder.CreateBox('landingThrusterEmitterNode', { size: 0.1 }, this.scene);
    landNode.isVisible = false;
    landNode.position = new Vector3(0, 0.6, 0);
    landNode.parent = this.spacecraftRoot;

    this.landingThrusterParticles = new ParticleSystem('landingThrusterParticles', 280, this.scene);
    this.landingThrusterParticles.particleTexture = plumeTexture;
    this.landingThrusterParticles.emitter = landNode;
    this.landingThrusterParticles.blendMode = ParticleSystem.BLENDMODE_ADD;
    this.landingThrusterParticles.minEmitBox = new Vector3(-0.4, 0, -0.4);
    this.landingThrusterParticles.maxEmitBox = new Vector3(0.4, 0, 0.4);
    this.landingThrusterParticles.color1 = new Color4(1.0, 0.85, 0.4, 0.95);
    this.landingThrusterParticles.color2 = new Color4(0.9, 0.5, 0.15, 0.65);
    this.landingThrusterParticles.colorDead = new Color4(0.2, 0.1, 0.05, 0.0);
    this.landingThrusterParticles.minSize = 0.25;
    this.landingThrusterParticles.maxSize = 1.1;
    this.landingThrusterParticles.minLifeTime = 0.12;
    this.landingThrusterParticles.maxLifeTime = 0.38;
    this.landingThrusterParticles.direction1 = new Vector3(-0.25, -3.5, -0.25);
    this.landingThrusterParticles.direction2 = new Vector3(0.25, -4.5, 0.25);
    this.landingThrusterParticles.minEmitPower = 2.5;
    this.landingThrusterParticles.maxEmitPower = 5.0;
    this.landingThrusterParticles.emitRate = 0; // Activated during Shot 2

    // 3. Lunar Regolith Dust Plume (Billows outward horizontally at touchdown)
    const dustNode = MeshBuilder.CreateBox('dustEmitterNode', { size: 0.1 }, this.scene);
    dustNode.isVisible = false;
    dustNode.position = new Vector3(0, 0.08, 0);

    this.landingDustParticles = new ParticleSystem('landingDustParticles', 300, this.scene);
    this.landingDustParticles.particleTexture = plumeTexture;
    this.landingDustParticles.emitter = dustNode;
    this.landingDustParticles.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    this.landingDustParticles.minEmitBox = new Vector3(-2.5, 0, -2.5);
    this.landingDustParticles.maxEmitBox = new Vector3(2.5, 0, 2.5);
    this.landingDustParticles.color1 = new Color4(0.72, 0.74, 0.78, 0.45);
    this.landingDustParticles.color2 = new Color4(0.5, 0.52, 0.55, 0.25);
    this.landingDustParticles.colorDead = new Color4(0.3, 0.32, 0.35, 0.0);
    this.landingDustParticles.minSize = 0.8;
    this.landingDustParticles.maxSize = 2.4;
    this.landingDustParticles.minLifeTime = 0.8;
    this.landingDustParticles.maxLifeTime = 2.2;
    this.landingDustParticles.direction1 = new Vector3(-3.5, 0.2, -3.5);
    this.landingDustParticles.direction2 = new Vector3(3.5, 0.6, 3.5);
    this.landingDustParticles.minEmitPower = 1.5;
    this.landingDustParticles.maxEmitPower = 4.0;
    this.landingDustParticles.emitRate = 0; // Activated at touchdown
  }

  // --------------------------------------------------
  // CINEMATIC LETTERBOX & HUD OVERLAY
  // --------------------------------------------------
  private setupIntroOverlay(): void {
    this.overlayContainer = document.createElement('div');
    this.overlayContainer.id = 'cinematic-root-overlay';
    this.overlayContainer.className = 'cinematic-root-overlay';

    this.overlayContainer.innerHTML = `
      <!-- Top Letterbox Bar -->
      <div class="letterbox-bar letterbox-top">
        <div class="cinematic-telemetry-left">
          <div class="telemetry-live-dot"></div>
          <span id="cinematic-telemetry-badge">TRANS-LUNAR INJECTION // APPROACH VECTOR</span>
          <span class="cinematic-audio-pill">AUDIO TELEMETRY</span>
        </div>
        <div class="cinematic-telemetry-center">
          <span id="cinematic-clock" class="cinematic-mission-clock">T+00:00:00</span>
        </div>
        <div class="cinematic-telemetry-right">
          <button id="btn-cinematic-skip" class="btn-cinematic-skip">
            SKIP INTRO <kbd>ESC</kbd>
          </button>
        </div>
      </div>

      <!-- Central Subtitle / Mission Banner -->
      <div class="cinematic-subtitle-box">
        <div id="cinematic-subtitle-badge" class="cinematic-badge">TRANS-LUNAR INJECTION // APPROACH VECTOR</div>
        <h2 id="cinematic-subtitle-text" class="cinematic-subtitle">MISSION DAY 01: APPROACHING THE MOON</h2>
      </div>

      <!-- Bottom Letterbox Bar -->
      <div class="letterbox-bar letterbox-bottom">
        <div class="cinematic-telemetry-left">
          <span>VEHICLE: NASA SHUTTLE ORBITER</span>
          <span>&bull;</span>
          <span id="cinematic-alt-telemetry">ALT: 384,000 km // VEL: 1,024 m/s</span>
        </div>
        <div class="cinematic-telemetry-right">
          <span>TARGET: TRANQUILLITY BASE (0.6740° N, 23.4720° E)</span>
        </div>
      </div>
    `;

    document.getElementById('app')?.appendChild(this.overlayContainer);

    this.missionClockEl = this.overlayContainer.querySelector('#cinematic-clock');
    this.telemetryBadgeEl = this.overlayContainer.querySelector('#cinematic-telemetry-badge');
    this.subtitleBadgeEl = this.overlayContainer.querySelector('#cinematic-subtitle-badge');
    this.subtitleTextEl = this.overlayContainer.querySelector('#cinematic-subtitle-text');
    this.altTelemetryEl = this.overlayContainer.querySelector('#cinematic-alt-telemetry');
    this.skipBtn = this.overlayContainer.querySelector('#btn-cinematic-skip');

    this.skipBtn?.addEventListener('click', () => {
      this.skipIntro();
    });

    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && this.isIntroActive) {
        this.skipIntro();
      }
    };
    window.addEventListener('keydown', this.keydownHandler);
  }

  public skipIntro(): void {
    if (!this.isIntroActive) return;
    this.isIntroActive = false;
    this.cleanUpOverlay();
    this.mainThrusterParticles.stop();
    this.mainThrusterParticles.emitRate = 0;
    this.landingThrusterParticles.stop();
    this.landingThrusterParticles.emitRate = 0;
    this.landingDustParticles.stop();
    this.landingDustParticles.emitRate = 0;

    if (this.onSkipCallback) {
      this.onSkipCallback();
    } else if (this.onIntroCompleteCallback) {
      this.onIntroCompleteCallback();
    }
  }

  public setOnIntroComplete(cb: () => void): void {
    this.onIntroCompleteCallback = cb;
  }

  public setOnSkip(cb: () => void): void {
    this.onSkipCallback = cb;
  }

  private cleanUpOverlay(): void {
    if (this.overlayContainer) {
      this.overlayContainer.remove();
      this.overlayContainer = null;
    }
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = undefined;
    }
  }

  // --------------------------------------------------
  // MULTI-SHOT ANIMATIONS & CINEMATIC DIRECTOR
  // --------------------------------------------------
  private setupAnimations(isClosingMode: boolean = false): void {
    this.scene.onBeforeRenderObservable.add(() => {
      const dt = this.scene.getEngine().getDeltaTime() * 0.001;
      if (this.disposed) return;

      if (isClosingMode) {
        // Return to Earth orbit cinematic cruise
        if (this.spacecraftRoot) {
          this.spacecraftRoot.position.y = Math.sin(this.introTimer * 0.8) * 0.35;
          this.spacecraftRoot.rotation.z = Math.sin(this.introTimer * 0.6) * 0.02;
          this.spacecraftRoot.rotation.x = Math.sin(this.introTimer * 0.4) * 0.01;
        }
        if (this.earthMesh) this.earthMesh.rotation.y += dt * 0.04;
        if (this.moonMesh) this.moonMesh.rotation.y += dt * 0.02;
        if (this.camera) this.camera.alpha += dt * 0.015;
        this.introTimer += dt;
        return;
      }

      if (!this.isIntroActive) return;

      this.introTimer += dt;
      const t = this.introTimer;

      // Update Mission Clock: T+00:00:xx
      const totalSec = Math.floor(t);
      const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
      const ss = String(totalSec % 60).padStart(2, '0');
      if (this.missionClockEl) {
        this.missionClockEl.textContent = `T+00:${mm}:${ss}`;
      }

      // Rotate celestial bodies
      if (this.earthMesh) this.earthMesh.rotation.y += dt * 0.03;
      if (this.moonMesh) this.moonMesh.rotation.y += dt * 0.015;

      // Ground plane visibility control:
      // Only show ground right before touchdown (t >= 21.5s). Before that: open space, no ground plane!
      const groundActive = t >= 21.5;
      if (this.surfaceGround && this.surfaceGround.isEnabled() !== groundActive) {
        this.surfaceGround.setEnabled(groundActive);
      }
      if (this.moonMesh && this.moonMesh.isEnabled() === groundActive) {
        this.moonMesh.setEnabled(!groundActive);
      }

      // ==========================================================
      // SHOT 1: THE SHUTTLE APPROACHES THE MOON (0.0s - 15.0s)
      // ==========================================================
      if (t < 15.0) {
        const p = t / 15.0;
        this.spacecraftRoot.position = Vector3.Lerp(
          new Vector3(0, 15, -75),
          new Vector3(0, 14, 0),
          p
        );
        this.spacecraftRoot.rotation.x = 0.01;
        this.spacecraftRoot.rotation.y = 0;
        this.spacecraftRoot.rotation.z = Math.sin(t * 0.45) * 0.025;

        if (this.telemetryBadgeEl) {
          this.telemetryBadgeEl.textContent = 'TRANS-LUNAR INJECTION // APPROACH VECTOR';
        }
        if (this.subtitleBadgeEl) {
          this.subtitleBadgeEl.textContent = 'TRANS-LUNAR INJECTION // APPROACH VECTOR';
        }
        if (this.subtitleTextEl) {
          this.subtitleTextEl.textContent = 'MISSION DAY 01: APPROACHING THE MOON';
        }
        if (this.altTelemetryEl) {
          const altKm = Math.round(384000 - p * 382600);
          this.altTelemetryEl.textContent = `ALT: ${altKm.toLocaleString()} km // VEL: 1,024 m/s`;
        }

        // Camera smoothly tracks shuttle flying toward the distant Moon in deep space
        this.camera.target = new Vector3(
          this.spacecraftRoot.position.x,
          this.spacecraftRoot.position.y + 3.0,
          this.spacecraftRoot.position.z
        );
        this.camera.alpha = -Math.PI / 2 + 0.38 + t * 0.012;
        this.camera.beta = Math.PI / 2.22;
        this.camera.radius = 32;

        this.mainThrusterParticles.emitRate = 140;
        this.landingThrusterParticles.emitRate = 0;
        this.landingDustParticles.emitRate = 0;
      }

      // ==========================================================
      // SHOT 2: EXTERIOR LANDING & TOUCHDOWN (15.0s - 28.0s)
      // ==========================================================
      else if (t < 28.0) {
        const t2 = t - 15.0; // 0.0s to 13.0s

        // Cut cruise engines
        this.mainThrusterParticles.emitRate = 0;

        // Descent profile: descends from Y = 14 down to surface Y = 0 at t2 = 9.0s (t = 24.0s)
        const descentP = Math.min(t2 / 9.0, 1.0);
        const ease = Math.sin(descentP * Math.PI / 2);
        this.spacecraftRoot.position = Vector3.Lerp(
          new Vector3(0, 14, 0),
          new Vector3(0, 0, 0),
          ease
        );

        // Attitude pitch hold
        this.spacecraftRoot.rotation.x = Math.max(0, 0.08 * (1 - descentP));
        this.spacecraftRoot.rotation.z = Math.sin(t2 * 1.5) * 0.015 * (1 - descentP);

        // Sub-shot 2A: Wide establishing angle (15.0s - 18.5s)
        if (t2 < 3.5) {
          if (!this.landingThrusterParticles.isStarted()) {
            this.landingThrusterParticles.start();
          }
          this.landingThrusterParticles.emitRate = 220;
          this.landingDustParticles.emitRate = 0;

          this.camera.target = new Vector3(0, this.spacecraftRoot.position.y + 4.0, 0);
          this.camera.alpha = -Math.PI / 2.5;
          this.camera.beta = Math.PI / 2.2;
          this.camera.radius = 48 - t2 * 2.0;

          if (this.telemetryBadgeEl) this.telemetryBadgeEl.textContent = 'FINAL DESCENT GUIDANCE // PDI ACTIVE';
          if (this.subtitleBadgeEl) this.subtitleBadgeEl.textContent = 'FINAL DESCENT GUIDANCE // PDI ACTIVE';
          if (this.subtitleTextEl) this.subtitleTextEl.textContent = 'DESCENDING TO TRANQUILLITY BASE';
          if (this.altTelemetryEl) {
            this.altTelemetryEl.textContent = `ALT: ${Math.round(1400 * (1 - ease))}m // SINK: -8.2 m/s`;
          }
        }
        // Sub-shot 2B: Medium tracking angle (18.5s - 21.5s)
        else if (t2 < 6.5) {
          const local2B = t2 - 3.5;
          if (!this.landingThrusterParticles.isStarted()) {
            this.landingThrusterParticles.start();
          }
          this.landingThrusterParticles.emitRate = 220;
          this.landingDustParticles.emitRate = 0;

          this.camera.target = new Vector3(0, this.spacecraftRoot.position.y + 3.5, 0);
          this.camera.alpha = Math.PI / 3.4 + local2B * 0.07;
          this.camera.beta = Math.PI / 2.3;
          this.camera.radius = 28 - local2B * 1.5;

          if (this.telemetryBadgeEl) this.telemetryBadgeEl.textContent = 'TERMINAL DESCENT // ATTITUDE HOLD';
          if (this.subtitleBadgeEl) this.subtitleBadgeEl.textContent = 'TERMINAL DESCENT // ATTITUDE HOLD';
          if (this.subtitleTextEl) this.subtitleTextEl.textContent = 'RADAR ALTIMETER: 45 METERS... STEADY SINK RATE';
          if (this.altTelemetryEl) {
            this.altTelemetryEl.textContent = `ALT: ${Math.round(45 * (1 - ease))}m // SINK: -2.4 m/s`;
          }
        }
        // Sub-shot 2C: Ground-level touchdown angle (21.5s - 25.0s, Touchdown at t2 >= 9.0s / t = 24.0s)
        else if (t2 < 10.0) {
          this.camera.target = new Vector3(0, this.spacecraftRoot.position.y + 2.5, 0);
          this.camera.alpha = Math.PI * 0.88;
          this.camera.beta = Math.PI / 2.08;
          this.camera.radius = 20;

          // Touchdown event at t2 >= 9.0s (t >= 24.0s)
          if (t2 >= 9.0) {
            if (!this.touchdownTriggered) {
              this.touchdownTriggered = true;
              this.landingThrusterParticles.stop();
              this.landingThrusterParticles.emitRate = 0;
              this.landingDustParticles.start();
              this.landingDustParticles.emitRate = 180;
            }
            if (this.telemetryBadgeEl) this.telemetryBadgeEl.textContent = 'CONTACT LIGHT // ENGINE CUTOFF';
            if (this.subtitleBadgeEl) this.subtitleBadgeEl.textContent = 'CONTACT LIGHT // ENGINE CUTOFF';
            if (this.subtitleTextEl) this.subtitleTextEl.textContent = 'TOUCHDOWN // ENGINES STOPPED';
            if (this.altTelemetryEl) this.altTelemetryEl.textContent = 'ALT: 0m // CONTACT NOMINAL';
          } else {
            if (this.telemetryBadgeEl) this.telemetryBadgeEl.textContent = 'FINAL APPROACH // PROXIMITY SENSOR';
            if (this.subtitleBadgeEl) this.subtitleBadgeEl.textContent = 'FINAL APPROACH // PROXIMITY SENSOR';
            if (this.subtitleTextEl) this.subtitleTextEl.textContent = 'CONTACT IN 3... 2... 1...';
            this.landingThrusterParticles.emitRate = 220;
          }
        }
        // Sub-shot 2D: Final wide hero shot of safely landed shuttle on the ground (25.0s - 28.0s)
        else {
          const local2D = t2 - 10.0;
          this.camera.target = new Vector3(0, 3.2, 0);
          this.camera.alpha = -Math.PI / 3.5 + local2D * 0.03;
          this.camera.beta = Math.PI / 2.35;
          this.camera.radius = 32;

          if (this.telemetryBadgeEl) this.telemetryBadgeEl.textContent = 'MISSION STATUS // SURFACE ARRIVAL';
          if (this.subtitleBadgeEl) this.subtitleBadgeEl.textContent = 'MISSION STATUS // SURFACE ARRIVAL';
          if (this.subtitleTextEl) this.subtitleTextEl.textContent = 'TOUCHDOWN CONFIRMED // TRANQUILLITY BASE';
          if (this.altTelemetryEl) this.altTelemetryEl.textContent = 'TRANQUILLITY BASE // LAT: 0.6740° N, LON: 23.4720° E';

          this.landingThrusterParticles.stop();
          this.landingThrusterParticles.emitRate = 0;
          this.landingDustParticles.emitRate = Math.max(0, 180 * (1 - local2D / 3.0));
        }
      }

      // ==========================================================
      // TRANSITION TO CABIN ENVIRONMENT (t >= 28.0s)
      // ==========================================================
      else {
        if (!this.transitionTriggered) {
          this.transitionTriggered = true;
          this.isIntroActive = false;
          this.cleanUpOverlay();
          if (this.onIntroCompleteCallback) {
            this.onIntroCompleteCallback();
          }
        }
      }
    });
  }

  public dispose(): void {
    this.disposed = true;
    this.cleanUpOverlay();
    if (this.mainThrusterParticles) this.mainThrusterParticles.dispose();
    if (this.landingThrusterParticles) this.landingThrusterParticles.dispose();
    if (this.landingDustParticles) this.landingDustParticles.dispose();
    this.scene.dispose();
  }
}
