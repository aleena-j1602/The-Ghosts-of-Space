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
  Texture,
  Mesh,
  AbstractMesh,
  TransformNode,
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

  // Space Shuttle Landing Site
  private landerRoot!: TransformNode;
  private shuttleRoot: AbstractMesh | null = null;

  private shuttleGroundOffset = 0;
  private shuttleLoaded = false;

  private earthMesh!: Mesh;

  // Landing cinematic
  public isLandingCinematic = false;

  private landingProgress = 0;
  private onLandingCompleteCallback?: () => void;
  private landingCompleted = false;

  private disposed = false;

  public currentDetectionState: DetectionState = {
    detectedArtifact: null,
    distance: Infinity,
    signalStrength: 0,
    canInteract: false,
  };

  constructor(
    engine: Engine,
    inputManager: InputManager,
    playLandingCinematic = true,
    onLandingComplete?: () => void,
    onLunaAlert?: (message: string) => void
  ) {
    this.scene = new Scene(engine);

    this.scene.clearColor = new Color4(
      0.01,
      0.02,
      0.04,
      1
    );

    this.isLandingCinematic = playLandingCinematic;
    this.onLandingCompleteCallback = onLandingComplete;

    this.setupLighting();
    this.setupStarfield();
    this.setupEarthInSky();
    this.setupLunarTerrain();

    this.setupLandingSiteShelter();

    this.setupPlayerAndCompanion(
      inputManager,
      onLunaAlert
    );

    this.setupArtifacts();

    if (this.isLandingCinematic) {
      this.initLandingCinematic();
    } else {
      this.astronaut.setPosition(
        new Vector3(0, 0, 4.5)
      );

      this.lunaFollower.setPosition(
        new Vector3(1.2, 1.8, 3.8)
      );

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
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 220 + Math.random() * 30;

      star.position = new Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) + 15,
        radius * Math.sin(phi) * Math.sin(theta)
      );

      star.material = starMaterial;
      star.freezeWorldMatrix();
    }
  }

  // --------------------------------------------------
  // EARTH IN SKY
  // --------------------------------------------------

  private setupEarthInSky(): void {
    this.earthMesh = MeshBuilder.CreateSphere(
      'skyEarth',
      {
        diameter: 24,
        segments: 24,
      },
      this.scene
    );

    this.earthMesh.position = new Vector3(
      -80,
      55,
      140
    );

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
  // LUNAR TERRAIN
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

    // Craters
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

      rim.position = new Vector3(
        cp.x,
        0.2,
        cp.z
      );

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

      floor.position = new Vector3(
        cp.x,
        0.02,
        cp.z
      );

      floor.material = craterMat;
      floor.freezeWorldMatrix();
    });
  }

  // --------------------------------------------------
  // SPACE SHUTTLE LANDING SITE
  // --------------------------------------------------

  private setupLandingSiteShelter(): void {
    this.landerRoot = new TransformNode(
      'landerRoot',
      this.scene
    );

    // Keep the parent at ground level.
    // The shuttle itself will move during landing.
    this.landerRoot.position = Vector3.Zero();

    void this.loadSpaceShuttle();
  }

  // --------------------------------------------------
  // LOAD SPACE SHUTTLE GLB
  // --------------------------------------------------

  private async loadSpaceShuttle(): Promise<void> {
    try {
      console.log('Loading Space Shuttle...');

      const result = await SceneLoader.ImportMeshAsync(
        '',
        '/models/',
        'space-shuttle.glb',
        this.scene
      );

      if (this.disposed) {
        result.meshes.forEach((mesh) => mesh.dispose());

        result.transformNodes.forEach((node) => {
          node.dispose();
        });

        return;
      }

      const shuttle = result.meshes[0];

      if (!shuttle) {
        throw new Error(
          'No root mesh found in the Space Shuttle GLB.'
        );
      }

      // Use the imported mesh directly.
      this.shuttleRoot = shuttle;

      // Original working position.
      shuttle.position = new Vector3(0, 0, 0);

      // Preserve original model scale.
      shuttle.scaling = new Vector3(1, 1, 1);

      // Original working orientation.
      shuttle.rotation = new Vector3(
        0,
        Math.PI / 2,
        0
      );

      shuttle.setEnabled(true);

      // Calculate the shuttle's ground alignment.
      shuttle.computeWorldMatrix(true);

      const bounds = shuttle.getHierarchyBoundingVectors(true);

      this.shuttleGroundOffset = -bounds.min.y;

      // Determine starting height.
      const startingHeight = this.isLandingCinematic ? 22 : 0;

      // Attach the shuttle to the stationary landing root.
      shuttle.parent = this.landerRoot;

      // Position the shuttle above the surface.
      shuttle.position.y =
        this.shuttleGroundOffset + startingHeight;

      shuttle.computeWorldMatrix(true);

      this.shuttleLoaded = true;

      console.log('Space Shuttle loaded successfully.');
      console.log(
        'Shuttle ground offset:',
        this.shuttleGroundOffset
      );

    } catch (error) {
      console.error(
        'Failed to load Space Shuttle:',
        error
      );

      // Prevent the game from getting stuck if loading fails.
      if (this.isLandingCinematic) {
        this.completeLanding();
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
    this.artifactManager = new ArtifactManager(
      this.scene
    );

    console.log(
      `Loaded ${this.artifactManager.getTotalCount()} Moon artifacts.`
    );
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
  }

  // --------------------------------------------------
  // LANDING COMPLETION
  // --------------------------------------------------

  private completeLanding(): void {
    if (this.landingCompleted) {
      return;
    }

    this.landingCompleted = true;
    this.isLandingCinematic = false;

    // Place shuttle on the lunar surface.
    if (this.shuttleLoaded && this.shuttleRoot) {
      this.shuttleRoot.position.y =
        this.shuttleGroundOffset;

      this.shuttleRoot.computeWorldMatrix(true);
    }

    this.astronaut.root.setEnabled(true);

    this.astronaut.setPosition(
      new Vector3(0, 0, 4.5)
    );

    this.lunaFollower.luna.root.setEnabled(true);

    this.lunaFollower.setPosition(
      new Vector3(1.2, 1.8, 3.8)
    );

    this.lunaFollower.setExpression('happy');

    this.restoreGameplayCamera();

    this.playerController.setEnabled(true);

    this.onLandingCompleteCallback?.();
  }

  private restoreGameplayCamera(): void {
    this.camera.camera.radius = 6.5;
    this.camera.camera.beta = Math.PI / 2.7;
    this.camera.camera.alpha = -Math.PI / 2;

    this.camera.camera.target = new Vector3(
      0,
      1.5,
      0
    );
  }

  // --------------------------------------------------
  // GAME LOOP
  // --------------------------------------------------

  private setupGameLoop(): void {
    this.scene.onBeforeRenderObservable.add(() => {
      if (this.disposed) {
        return;
      }

      const dt =
        this.scene.getEngine().getDeltaTime() * 0.001;

      // Earth rotation.
      if (this.earthMesh) {
        this.earthMesh.rotation.y += dt * 0.02;
      }

      // Landing cinematic.
      if (this.isLandingCinematic) {
        this.landingProgress += dt * 0.32;

        const t = Math.min(
          this.landingProgress,
          1
        );

        const ease = 1 - Math.pow(1 - t, 2);

        // Move only the shuttle, not its parent.
        if (this.shuttleLoaded && this.shuttleRoot) {
          this.shuttleRoot.position.y =
            this.shuttleGroundOffset + 22 * (1 - ease);

          this.shuttleRoot.computeWorldMatrix(true);
        }

        this.camera.camera.target = new Vector3(
          0,
          22 * (1 - ease) + 2.5,
          0
        );

        this.camera.camera.alpha += dt * 0.12;

        if (t >= 1) {
          this.completeLanding();
        }

        return;
      }

      // Active gameplay.
      this.playerController.update(dt);

      const playerPos =
        this.playerController.getPosition();

      const playerForward =
        this.playerController.getForward();

      const isMoving =
        this.playerController.isMoving();

      this.lunaFollower.update(
        dt,
        playerPos,
        playerForward,
        isMoving
      );

      this.artifactManager.update(dt);

      // Proximity detection.
      this.currentDetectionState =
        this.lunaDetection.update(
          playerPos,
          this.artifactManager.artifacts,
          (id) =>
            this.artifactManager.getArtifactPosition(id)
        );
    });
  }

  // --------------------------------------------------
  // PUBLIC ACCESSORS
  // --------------------------------------------------

  public getCurrentDetectionState(): DetectionState {
    return this.currentDetectionState;
  }

  public getArtifactManager(): ArtifactManager {
    return this.artifactManager;
  }

  // --------------------------------------------------
  // DISPOSE
  // --------------------------------------------------

  public dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;

    if (this.landerRoot) {
      this.landerRoot.dispose(false, true);
    }

    this.shuttleRoot = null;
    this.shuttleLoaded = false;

    this.artifactManager?.dispose();
    this.astronaut?.dispose();
    this.lunaFollower?.dispose();
    this.camera?.dispose();

    this.scene.dispose();
  }
}