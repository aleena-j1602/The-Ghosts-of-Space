import {
  Scene,
  Engine,
  Vector3,
  Color3,
  Color4,
  HemisphericLight,
  DirectionalLight,
  MeshBuilder,
  StandardMaterial,
  PBRMaterial,
  ParticleSystem,
  Texture,
  Mesh,
  AbstractMesh,
  SceneLoader,
} from '@babylonjs/core';

import '@babylonjs/loaders/glTF';

import { AstronautCharacter } from '../player/AstronautCharacter.ts';
import { PlayerController } from '../player/PlayerController.ts';
import { ThirdPersonCamera } from '../player/ThirdPersonCamera.ts';
import { LunaFollower } from '../companion/LunaFollower.ts';
import { LunaDetection, DetectionState } from '../companion/LunaDetection.ts';
import { ArtifactManager } from '../systems/ArtifactManager.ts';
import { InputManager } from '../core/InputManager.ts';

export class MoonEnvironment {
  public scene: Scene;
  public astronaut!: AstronautCharacter;
  public playerController!: PlayerController;
  public camera!: ThirdPersonCamera;
  public lunaFollower!: LunaFollower;
  public lunaDetection!: LunaDetection;
  public artifactManager!: ArtifactManager;

  // Space Shuttle
  private shuttleRoot: AbstractMesh | null = null;
  private shuttleLoaded: boolean = false;
  private shuttleGroundOffset: number = 0;

  private earthMesh!: Mesh;
  private landingThrusterParticles: ParticleSystem | null = null;

  // Landing cinematic state
  public isLandingCinematic: boolean = false;
  private landingProgress: number = 0;
  private onLandingCompleteCallback?: () => void;

  public currentDetectionState: DetectionState = {
    detectedArtifact: null,
    distance: Infinity,
    signalStrength: 0,
    canInteract: false,
  };

  constructor(
    engine: Engine,
    inputManager: InputManager,
    playLandingCinematic: boolean = true,
    onLandingComplete?: () => void,
    onLunaAlert?: (message: string) => void
  ) {
    this.scene = new Scene(engine);
    this.scene.clearColor = new Color4(0.01, 0.02, 0.04, 1.0);

    this.isLandingCinematic = playLandingCinematic;
    this.onLandingCompleteCallback = onLandingComplete;

    this.setupLighting();
    this.setupStarfield();
    this.setupEarthInSky();
    this.setupLunarTerrain();

    // Load the Space Shuttle instead of the procedural lander
    void this.loadSpaceShuttle();

    this.setupPlayerAndCompanion(inputManager, onLunaAlert);
    this.setupArtifacts();

    if (this.isLandingCinematic) {
      this.initLandingCinematic();
    } else {
      this.astronaut.setPosition(new Vector3(0, 0, 4.5));
      this.playerController.setEnabled(true);
    }

    this.setupGameLoop();
  }

  // --------------------------------------------------
  // LIGHTING
  // --------------------------------------------------

  private setupLighting(): void {
    const earthshine = new HemisphericLight(
      'earthshine',
      new Vector3(0, 1, 0),
      this.scene
    );

    earthshine.intensity = 0.28;
    earthshine.diffuse = new Color3(0.2, 0.3, 0.45);
    earthshine.groundColor = new Color3(0.04, 0.04, 0.06);

    const sunLight = new DirectionalLight(
      'lunarSun',
      new Vector3(-0.85, -0.65, 0.5).normalize(),
      this.scene
    );

    sunLight.intensity = 2.0;
    sunLight.diffuse = new Color3(1.0, 0.98, 0.92);
    sunLight.specular = new Color3(0.6, 0.65, 0.7);
  }

  // --------------------------------------------------
  // STARFIELD
  // --------------------------------------------------

  private setupStarfield(): void {
    const starMaterial = new StandardMaterial(
      'lunarStarsMat',
      this.scene
    );

    starMaterial.emissiveColor = new Color3(0.9, 0.95, 1.0);
    starMaterial.disableLighting = true;

    for (let i = 0; i < 350; i++) {
      const star = MeshBuilder.CreateSphere(
        `lunarStar_${i}`,
        {
          diameter: Math.random() * 0.4 + 0.15,
          segments: 4,
        },
        this.scene
      );

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random());
      const radius = 220 + Math.random() * 30;

      star.position = new Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) + 15,
        radius * Math.sin(phi) * Math.sin(theta)
      );

      star.freezeWorldMatrix();
    }
  }

  // --------------------------------------------------
  // EARTH IN SKY
  // --------------------------------------------------

  private setupEarthInSky(): void {
    this.earthMesh = MeshBuilder.CreateSphere(
      'skyEarth',
      { diameter: 24, segments: 24 },
      this.scene
    );

    this.earthMesh.position = new Vector3(-80, 55, 140);

    const earthMat = new StandardMaterial(
      'skyEarthMat',
      this.scene
    );

    earthMat.diffuseColor = new Color3(0.12, 0.45, 0.85);
    earthMat.emissiveColor = new Color3(0.08, 0.25, 0.55);
    earthMat.specularColor = new Color3(0.4, 0.6, 0.8);

    this.earthMesh.material = earthMat;
  }

  // --------------------------------------------------
  // LUNAR TERRAIN WITH PBR MOON TEXTURES
  // --------------------------------------------------

  private setupLunarTerrain(): void {
    const ground = MeshBuilder.CreateGround(
      'lunarGround',
      {
        width: 220,
        height: 220,
        subdivisions: 32,
      },
      this.scene
    );

    const moonMaterial = new PBRMaterial(
      'moonPBRMaterial',
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

    ground.material = moonMaterial;

    const textures = [
      moonMaterial.albedoTexture,
      moonMaterial.bumpTexture,
    ].filter((texture): texture is Texture => texture instanceof Texture);

    textures.forEach((texture) => {
      texture.uScale = 8;
      texture.vScale = 8;
      texture.wrapU = Texture.WRAP_ADDRESSMODE;
      texture.wrapV = Texture.WRAP_ADDRESSMODE;
    });

    // ------------------------------
    // CRATERS
    // ------------------------------

    const craterMat = new StandardMaterial(
      'craterMat',
      this.scene
    );

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
        `craterRim_${idx}`,
        {
          diameter: cp.r,
          thickness: 1.2,
          tessellation: 20,
        },
        this.scene
      );

      rim.position = new Vector3(cp.x, 0.2, cp.z);
      rim.material = craterMat;
      rim.freezeWorldMatrix();

      const floor = MeshBuilder.CreateDisc(
        `craterFloor_${idx}`,
        {
          radius: cp.r * 0.45,
          tessellation: 16,
        },
        this.scene
      );

      floor.rotation.x = Math.PI / 2;
      floor.position = new Vector3(cp.x, 0.02, cp.z);
      floor.material = craterMat;
      floor.freezeWorldMatrix();
    });
  }

  // --------------------------------------------------
  // SPACE SHUTTLE GLB
  // REPLACES THE PROCEDURAL LANDER
  // --------------------------------------------------

  private async loadSpaceShuttle(): Promise<void> {
    try {
      const result = await SceneLoader.ImportMeshAsync(
        '',
        '/models/',
        'space-shuttle.glb',
        this.scene
      );

      const shuttle = result.meshes[0];

      if (!shuttle) {
        throw new Error('No root mesh found in the Space Shuttle GLB.');
      }

      this.shuttleRoot = shuttle;

      // Initial position
      shuttle.position = new Vector3(0, 0, 0);

      // Adjust model size here if needed
      shuttle.scaling = new Vector3(1, 1, 1);

      // Shuttle orientation
      shuttle.rotation = new Vector3(
        0,
        Math.PI / 2,
        0
      );

      shuttle.setEnabled(true);

      // Calculate the shuttle's ground alignment
      shuttle.computeWorldMatrix(true);

      const bounds = shuttle.getHierarchyBoundingVectors(true);

      this.shuttleGroundOffset = -bounds.min.y;

      // Start above the surface if the landing cinematic is enabled
      const startingHeight = this.isLandingCinematic ? 22 : 0;

      shuttle.position.y =
        this.shuttleGroundOffset + startingHeight;

      shuttle.computeWorldMatrix(true);

      this.shuttleLoaded = true;

      // Attach landing particles to the shuttle
      if (this.landingThrusterParticles) {
        this.landingThrusterParticles.emitter = shuttle;
        this.landingThrusterParticles.start();
      }

      console.log('Space Shuttle loaded successfully.');

    } catch (error) {
      console.error('Failed to load Space Shuttle:', error);

      // Prevent the game from getting stuck if loading fails
      if (this.isLandingCinematic) {
        this.isLandingCinematic = false;

        this.astronaut.root.setEnabled(true);
        this.lunaFollower.luna.root.setEnabled(true);

        this.astronaut.setPosition(new Vector3(0, 0, 4.5));

        this.playerController.setEnabled(true);

        if (this.onLandingCompleteCallback) {
          this.onLandingCompleteCallback();
        }
      }
    }
  }

  // --------------------------------------------------
  // PLAYER AND COMPANION
  // --------------------------------------------------

  private setupPlayerAndCompanion(
    inputManager: InputManager,
    onLunaAlert?: (message: string) => void
  ): void {
    this.astronaut = new AstronautCharacter(
      this.scene,
      'PlayerAstronaut'
    );

    this.astronaut.setPosition(
      new Vector3(0, 0, 4.2)
    );

    this.camera = new ThirdPersonCamera(
      this.scene,
      this.astronaut.root
    );

    this.playerController = new PlayerController(
      this.astronaut,
      inputManager,
      this.camera
    );

    this.playerController.setEnabled(false);

    this.lunaFollower = new LunaFollower(
      this.scene,
      'LunaMoonCompanion'
    );

    this.lunaFollower.setPosition(
      new Vector3(1.5, 1.8, 3.2)
    );

    this.lunaDetection = new LunaDetection(
      this.lunaFollower,
      onLunaAlert
    );
  }

  // --------------------------------------------------
  // ARTIFACTS
  // --------------------------------------------------

  private setupArtifacts(): void {
    this.artifactManager = new ArtifactManager(this.scene);
  }

  // --------------------------------------------------
  // LANDING CINEMATIC
  // --------------------------------------------------

  private initLandingCinematic(): void {
    this.astronaut.root.setEnabled(false);
    this.lunaFollower.luna.root.setEnabled(false);

    this.camera.camera.target = new Vector3(0, 4, 0);
    this.camera.camera.radius = 24;
    this.camera.camera.beta = Math.PI / 3;

    this.landingThrusterParticles = new ParticleSystem(
      'shuttleLandingParticles',
      200,
      this.scene
    );

    this.landingThrusterParticles.particleTexture = new Texture(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      this.scene
    );

    this.landingThrusterParticles.color1 =
      new Color4(0.95, 0.7, 0.2, 1.0);

    this.landingThrusterParticles.color2 =
      new Color4(0.27, 0.85, 0.91, 0.8);

    this.landingThrusterParticles.colorDead =
      new Color4(0.1, 0.1, 0.1, 0.0);

    this.landingThrusterParticles.minSize = 0.4;
    this.landingThrusterParticles.maxSize = 1.1;
    this.landingThrusterParticles.minLifeTime = 0.3;
    this.landingThrusterParticles.maxLifeTime = 0.7;
    this.landingThrusterParticles.emitRate = 120;

    this.landingThrusterParticles.direction1 =
      new Vector3(-0.4, -4.0, -0.4);

    this.landingThrusterParticles.direction2 =
      new Vector3(0.4, -5.0, 0.4);

    this.landingThrusterParticles.minEmitPower = 3;
    this.landingThrusterParticles.maxEmitPower = 6;
  }

  // --------------------------------------------------
  // GAME LOOP
  // --------------------------------------------------

  private setupGameLoop(): void {
    this.scene.onBeforeRenderObservable.add(() => {
      const dt =
        this.scene.getEngine().getDeltaTime() * 0.001;

      if (this.earthMesh) {
        this.earthMesh.rotation.y += dt * 0.02;
      }

      // 1. Landing cinematic
      if (this.isLandingCinematic) {

        // Wait until the Space Shuttle has loaded
        if (!this.shuttleLoaded || !this.shuttleRoot) {
          return;
        }

        this.landingProgress += dt * 0.32;

        const t = Math.min(this.landingProgress, 1.0);
        const ease = 1 - Math.pow(1 - t, 2);

        // Move shuttle from the sky to the lunar surface
        this.shuttleRoot.position.y =
          this.shuttleGroundOffset + 22 * (1 - ease);

        this.camera.camera.target = new Vector3(
          0,
          this.shuttleRoot.position.y + 2.5,
          0
        );

        this.camera.camera.alpha += dt * 0.12;

        if (t >= 1.0) {
          this.shuttleRoot.position.y = this.shuttleGroundOffset;

          this.isLandingCinematic = false;

          if (this.landingThrusterParticles) {
            this.landingThrusterParticles.stop();
          }

          // Show astronaut
          this.astronaut.root.setEnabled(true);

          this.astronaut.setPosition(
            new Vector3(0, 0, 4.5)
          );

          // Show Luna
          this.lunaFollower.luna.root.setEnabled(true);

          this.lunaFollower.setPosition(
            new Vector3(1.2, 1.8, 3.8)
          );

          this.lunaFollower.setExpression('happy');

          // Restore gameplay camera
          this.camera.camera.radius = 6.5;
          this.camera.camera.beta = Math.PI / 2.7;
          this.camera.camera.alpha = -Math.PI / 2;

          // Enable player controls
          this.playerController.setEnabled(true);

          if (this.onLandingCompleteCallback) {
            this.onLandingCompleteCallback();
          }
        }

        return;
      }

      // 2. Active gameplay
      this.playerController.update(dt);

      const playerPos = this.playerController.getPosition();
      const playerForward = this.playerController.getForward();
      const isMoving = this.playerController.isMoving();

      this.lunaFollower.update(
        dt,
        playerPos,
        playerForward,
        isMoving
      );

      this.artifactManager.update(dt);

      // 3. Proximity detection
      this.currentDetectionState = this.lunaDetection.update(
        playerPos,
        this.artifactManager.artifacts
      );
    });
  }

  // --------------------------------------------------
  // DISPOSE
  // --------------------------------------------------

  public dispose(): void {
    if (this.landingThrusterParticles) {
      this.landingThrusterParticles.dispose();
    }

    this.artifactManager.dispose();
    this.astronaut.dispose();
    this.lunaFollower.dispose();
    this.camera.dispose();
    this.scene.dispose();
  }
}