import {
  Scene,
  TransformNode,
  Vector3,
  SceneLoader,
  AbstractMesh,
} from '@babylonjs/core';

import '@babylonjs/loaders/glTF';

export class AstronautCharacter {
  public root: TransformNode;

  private scene: Scene;
  private modelRoot: TransformNode;

  // Imported model
  private loaded = false;
  private disposed = false;

  // Animation state
  private walkCycle = 0;
  private isMoving = false;
  private isRunning = false;

  // Animation values
  private currentBounce = 0;
  private currentLean = 0;
  private currentSway = 0;

  private meshes: AbstractMesh[] = [];

  constructor(scene: Scene, name: string = 'Astronaut') {
    this.scene = scene;

    this.root = new TransformNode(name, scene);

    this.modelRoot = new TransformNode(
      name + '_model',
      scene
    );

    this.modelRoot.parent = this.root;

    void this.loadModel();
  }

  // Load imported astronaut model
  private async loadModel(): Promise<void> {
    try {
      const result = await SceneLoader.ImportMeshAsync(
        '',
        '/models/',
        'astronaut.glb',
        this.scene
      );

      if (this.disposed) {
        result.meshes.forEach((mesh) => mesh.dispose());
        result.transformNodes.forEach((node) => node.dispose());
        return;
      }

      this.meshes = result.meshes;


      // Collect imported meshes and transform nodes
      const importedNodes = [
        ...result.transformNodes,
        ...result.meshes,
      ];

      // Attach top-level imported objects to modelRoot
      importedNodes.forEach((node) => {
        if (!node.parent) {
          node.parent = this.modelRoot;
        }
      });

      this.fitModelToHeight(1.8);

      this.loaded = true;

      console.log('Astronaut model loaded successfully!');

      console.log(
        'Imported meshes:',
        result.meshes.map(mesh => mesh.name)
      );

    } catch (error) {
      console.error(
        'Failed to load astronaut model:',
        error
      );
    }
  }

  // Main animation controller
  public update(
    deltaTime: number,
    moving: boolean,
    running: boolean
  ): void {

    if (!this.loaded) return;

    // Prevent unusually large animation jumps
    deltaTime = Math.min(deltaTime, 0.05);

    this.isMoving = moving;
    this.isRunning = moving && running;

    if (this.isMoving) {

      // Walking and running speed
      const speedMultiplier = this.isRunning
        ? 11.0
        : 6.5;

      this.walkCycle += deltaTime * speedMultiplier;

      // Lunar gravity bounce
      const bounceStrength = this.isRunning
        ? 0.14
        : 0.075;

      const bounce =
        Math.abs(Math.sin(this.walkCycle)) *
        bounceStrength;

      // Slight forward lean
      const lean = this.isRunning
        ? 0.14
        : 0.07;

      // Side-to-side movement
      const sway =
        Math.sin(this.walkCycle) *
        (this.isRunning ? 0.055 : 0.035);

      this.currentBounce = bounce;
      this.currentLean = lean;
      this.currentSway = sway;

    } else {

      // Smoothly return to idle animation
      this.walkCycle += deltaTime * 2.0;

      const breathe =
        Math.sin(this.walkCycle) * 0.015;

      this.currentBounce = breathe;
      this.currentLean = 0;
      this.currentSway = 0;
    }

    // Apply animation to the imported model
    this.modelRoot.position.y = this.currentBounce;

    this.modelRoot.rotation.x = this.currentLean;

    this.modelRoot.rotation.z = this.currentSway;

    // Subtle floating movement while idle
    if (!this.isMoving) {

      this.modelRoot.rotation.y =
        Math.sin(this.walkCycle * 0.5) * 0.015;

    } else {

      this.modelRoot.rotation.y = 0;
    }
  }

  // Set astronaut position
  public setPosition(pos: Vector3): void {
    this.root.position.copyFrom(pos);
  }

  // Get astronaut position
  public getPosition(): Vector3 {
    return this.root.position;
  }

  // Set astronaut direction
  public setRotationY(angle: number): void {
    this.root.rotation.y = angle;
  }

  private fitModelToHeight(targetHeight: number): void {
  this.modelRoot.computeWorldMatrix(true);

    let minY = Infinity;
    let maxY = -Infinity;

    for (const mesh of this.meshes) {
      if (!mesh.getTotalVertices()) continue;

      mesh.computeWorldMatrix(true);

      const bounds = mesh.getBoundingInfo().boundingBox;

      minY = Math.min(minY, bounds.minimumWorld.y);
      maxY = Math.max(maxY, bounds.maximumWorld.y);
    }

    const currentHeight = maxY - minY;

    if (currentHeight <= 0 || !Number.isFinite(currentHeight)) {
      console.warn('Could not calculate model height');
      return;
    }

    const scaleFactor = targetHeight / currentHeight;

    this.modelRoot.scaling.setAll(scaleFactor);

    console.log('Model scale:', scaleFactor);
  }

  // Dispose astronaut and imported model
  public dispose(): void {
    this.disposed = true;
    this.meshes.forEach((mesh) => mesh.dispose());
    this.meshes = [];
    this.root.dispose();
  }
}