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
  ParticleSystem,
  Texture,
  TransformNode,
  Mesh,
} from '@babylonjs/core';

export class SpaceEnvironment {
  public scene: Scene;
  private camera!: ArcRotateCamera;
  private spacecraftRoot!: TransformNode;
  private engineGlowParticles!: ParticleSystem;
  private earthMesh!: Mesh;
  private moonMesh!: Mesh;

  constructor(engine: Engine) {
    this.scene = new Scene(engine);
    this.scene.clearColor = new Color4(0.02, 0.03, 0.07, 1.0);

    this.setupCamera();
    this.setupLighting();
    this.setupStarfield();
    this.setupCelestialBodies();
    this.setupSpacecraft();
    this.setupAnimations();
  }

  private setupCamera(): void {
    const canvas = this.scene.getEngine().getRenderingCanvas();
    this.camera = new ArcRotateCamera(
      'spaceCamera',
      -Math.PI / 3,
      Math.PI / 2.5,
      28,
      new Vector3(0, 0, 0),
      this.scene
    );
    this.camera.lowerRadiusLimit = 10;
    this.camera.upperRadiusLimit = 60;
    this.camera.wheelPrecision = 40;
    this.camera.attachControl(canvas, true);
  }

  private setupLighting(): void {
    // Soft cosmic ambient light
    const ambientLight = new HemisphericLight(
      'spaceAmbient',
      new Vector3(0, 1, 0),
      this.scene
    );
    ambientLight.intensity = 0.35;
    ambientLight.diffuse = new Color3(0.3, 0.4, 0.6);
    ambientLight.groundColor = new Color3(0.05, 0.05, 0.1);

    // Primary Solar Directional Light
    const sunLight = new DirectionalLight(
      'sunLight',
      new Vector3(-1, -0.4, 1).normalize(),
      this.scene
    );
    sunLight.intensity = 1.8;
    sunLight.diffuse = new Color3(1.0, 0.98, 0.9);
    sunLight.specular = new Color3(0.8, 0.9, 1.0);
  }

  private setupStarfield(): void {
    // Generate 450 procedural twinkling stars in a sphere
    const starCount = 450;
    const starMaterial = new StandardMaterial('starMat', this.scene);
    starMaterial.emissiveColor = new Color3(1, 1, 1);
    starMaterial.disableLighting = true;

    for (let i = 0; i < starCount; i++) {
      const star = MeshBuilder.CreateSphere(
        `star_${i}`,
        { diameter: Math.random() * 0.4 + 0.15, segments: 4 },
        this.scene
      );
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 180 + Math.random() * 40;

      star.position = new Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      // Random brightness
      const mat = starMaterial.clone(`starMat_${i}`);
      const brightness = 0.5 + Math.random() * 0.5;
      const tint = Math.random();
      if (tint > 0.8) {
        mat.emissiveColor = new Color3(0.4 * brightness, 0.8 * brightness, 1 * brightness); // Blue star
      } else if (tint > 0.65) {
        mat.emissiveColor = new Color3(1 * brightness, 0.85 * brightness, 0.4 * brightness); // Amber star
      } else {
        mat.emissiveColor = new Color3(brightness, brightness, brightness); // White star
      }
      star.material = mat;
      star.freezeWorldMatrix();
    }
  }

  private setupCelestialBodies(): void {
    // Distant Earth
    this.earthMesh = MeshBuilder.CreateSphere(
      'distantEarth',
      { diameter: 22, segments: 24 },
      this.scene
    );
    this.earthMesh.position = new Vector3(-80, 25, -120);

    const earthMat = new StandardMaterial('earthMat', this.scene);
    earthMat.diffuseColor = new Color3(0.08, 0.28, 0.58);
    earthMat.emissiveColor = new Color3(0.04, 0.12, 0.26);
    earthMat.specularColor = new Color3(0.2, 0.35, 0.5);
    this.earthMesh.material = earthMat;

    // Distant Moon (destination)
    this.moonMesh = MeshBuilder.CreateSphere(
      'distantMoon',
      { diameter: 9, segments: 20 },
      this.scene
    );
    this.moonMesh.position = new Vector3(90, -10, 130);

    const moonMat = new StandardMaterial('moonMat', this.scene);
    moonMat.diffuseColor = new Color3(0.7, 0.72, 0.75);
    moonMat.emissiveColor = new Color3(0.12, 0.12, 0.14);
    moonMat.specularColor = new Color3(0.05, 0.05, 0.05);
    this.moonMesh.material = moonMat;
  }

  private setupSpacecraft(): void {
    this.spacecraftRoot = new TransformNode('spacecraftRoot', this.scene);

    // Materials
    const hullMat = new StandardMaterial('hullMat', this.scene);
    hullMat.diffuseColor = new Color3(0.85, 0.88, 0.92);
    hullMat.specularColor = new Color3(0.9, 0.95, 1.0);
    hullMat.roughness = 0.3;

    const darkTrimMat = new StandardMaterial('darkTrimMat', this.scene);
    darkTrimMat.diffuseColor = new Color3(0.1, 0.12, 0.16);

    const goldFoilMat = new StandardMaterial('goldFoilMat', this.scene);
    goldFoilMat.diffuseColor = new Color3(0.95, 0.7, 0.15);
    goldFoilMat.specularColor = new Color3(1.0, 0.85, 0.3);

    const canopyMat = new StandardMaterial('canopyMat', this.scene);
    canopyMat.diffuseColor = new Color3(0.15, 0.65, 0.8);
    canopyMat.emissiveColor = new Color3(0.1, 0.35, 0.5);
    canopyMat.specularColor = new Color3(0.9, 1.0, 1.0);
    canopyMat.alpha = 0.85;

    const thrusterMat = new StandardMaterial('thrusterMat', this.scene);
    thrusterMat.emissiveColor = new Color3(0.2, 0.85, 1.0);
    thrusterMat.diffuseColor = new Color3(0.1, 0.4, 0.7);

    // 1. Central Command Fuselage
    const fuselage = MeshBuilder.CreateCylinder(
      'fuselage',
      { height: 8.5, diameterTop: 1.6, diameterBottom: 2.2, tessellation: 16 },
      this.scene
    );
    fuselage.rotation.x = Math.PI / 2;
    fuselage.material = hullMat;
    fuselage.parent = this.spacecraftRoot;

    // 2. Cockpit / Observation Pod
    const cockpit = MeshBuilder.CreateSphere(
      'cockpit',
      { diameterX: 1.8, diameterY: 1.4, diameterZ: 2.2, segments: 16 },
      this.scene
    );
    cockpit.position = new Vector3(0, 0.3, 3.8);
    cockpit.material = canopyMat;
    cockpit.parent = this.spacecraftRoot;

    // 3. Service Module (Gold thermal insulation ring)
    const serviceModule = MeshBuilder.CreateCylinder(
      'serviceModule',
      { height: 2.4, diameter: 2.3, tessellation: 16 },
      this.scene
    );
    serviceModule.rotation.x = Math.PI / 2;
    serviceModule.position = new Vector3(0, 0, -1.5);
    serviceModule.material = goldFoilMat;
    serviceModule.parent = this.spacecraftRoot;

    // 4. Solar Wings / Radiator Panels
    const wingLeft = MeshBuilder.CreateBox(
      'wingLeft',
      { width: 6.5, height: 0.1, depth: 1.8 },
      this.scene
    );
    wingLeft.position = new Vector3(-4.4, 0, -0.8);
    wingLeft.material = darkTrimMat;
    wingLeft.parent = this.spacecraftRoot;

    const wingRight = MeshBuilder.CreateBox(
      'wingRight',
      { width: 6.5, height: 0.1, depth: 1.8 },
      this.scene
    );
    wingRight.position = new Vector3(4.4, 0, -0.8);
    wingRight.material = darkTrimMat;
    wingRight.parent = this.spacecraftRoot;

    // 5. Engine Bell & Thruster Cone
    const engineBell = MeshBuilder.CreateCylinder(
      'engineBell',
      { height: 1.6, diameterTop: 1.8, diameterBottom: 1.2, tessellation: 16 },
      this.scene
    );
    engineBell.rotation.x = Math.PI / 2;
    engineBell.position = new Vector3(0, 0, -4.6);
    engineBell.material = darkTrimMat;
    engineBell.parent = this.spacecraftRoot;

    const thrusterGlowMesh = MeshBuilder.CreateDisc(
      'thrusterGlowDisc',
      { radius: 0.85, tessellation: 16 },
      this.scene
    );
    thrusterGlowMesh.position = new Vector3(0, 0, -5.4);
    thrusterGlowMesh.material = thrusterMat;
    thrusterGlowMesh.parent = this.spacecraftRoot;

    // 6. Thruster Particle Stream
    this.engineGlowParticles = new ParticleSystem('thrusterParticles', 250, this.scene);
    this.engineGlowParticles.particleTexture = new Texture(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      this.scene
    );
    this.engineGlowParticles.emitter = thrusterGlowMesh;
    this.engineGlowParticles.minEmitBox = new Vector3(-0.2, -0.2, 0);
    this.engineGlowParticles.maxEmitBox = new Vector3(0.2, 0.2, 0);
    this.engineGlowParticles.color1 = new Color4(0.2, 0.85, 1.0, 1.0);
    this.engineGlowParticles.color2 = new Color4(0.1, 0.4, 0.9, 0.8);
    this.engineGlowParticles.colorDead = new Color4(0.05, 0.1, 0.3, 0.0);
    this.engineGlowParticles.minSize = 0.2;
    this.engineGlowParticles.maxSize = 0.55;
    this.engineGlowParticles.minLifeTime = 0.25;
    this.engineGlowParticles.maxLifeTime = 0.6;
    this.engineGlowParticles.emitRate = 90;
    this.engineGlowParticles.direction1 = new Vector3(-0.15, -0.15, -3.5);
    this.engineGlowParticles.direction2 = new Vector3(0.15, 0.15, -4.5);
    this.engineGlowParticles.minEmitPower = 2.5;
    this.engineGlowParticles.maxEmitPower = 4.5;
    this.engineGlowParticles.start();
  }

  private setupAnimations(): void {
    let animTime = 0;
    this.scene.onBeforeRenderObservable.add(() => {
      const dt = this.scene.getEngine().getDeltaTime() * 0.001;
      animTime += dt;

      // Gentle floating oscillation
      if (this.spacecraftRoot) {
        this.spacecraftRoot.position.y = Math.sin(animTime * 1.2) * 0.3;
        this.spacecraftRoot.rotation.z = Math.sin(animTime * 0.8) * 0.03;
        this.spacecraftRoot.rotation.x = Math.cos(animTime * 0.6) * 0.02;
      }

      // Earth & Moon rotation
      if (this.earthMesh) {
        this.earthMesh.rotation.y += dt * 0.04;
      }
      if (this.moonMesh) {
        this.moonMesh.rotation.y += dt * 0.02;
      }

      // Slow cinematic camera orbit if player hasn't moved it
      if (this.camera) {
        this.camera.alpha += dt * 0.035;
      }
    });
  }

  public dispose(): void {
    if (this.engineGlowParticles) {
      this.engineGlowParticles.dispose();
    }
    this.scene.dispose();
  }
}
