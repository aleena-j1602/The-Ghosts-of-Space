import {
  Scene,
  TransformNode,
  Vector3,
  Color3,
  StandardMaterial,
  MeshBuilder,
  Mesh,
  SceneLoader,
  AbstractMesh,
} from '@babylonjs/core';

import '@babylonjs/loaders/glTF';

export type LunaExpression =
  | 'neutral'
  | 'happy'
  | 'witty'
  | 'curious'
  | 'alert'
  | 'scanning';

export class LunaCharacter {
  public root: TransformNode;

  private scene: Scene;
  private modelRoot: TransformNode;

  private meshes: AbstractMesh[] = [];

  private animTimer = 0;
  private hoverOffset = 0;

  private targetLookAt: Vector3 | null = null;
  private currentExpression: LunaExpression = 'neutral';

  private loaded = false;


  private glowMat!: StandardMaterial;
  private scanRing!: Mesh;

  private originalMaterials = new Map<AbstractMesh, any>();

  constructor(scene: Scene, name: string = 'Luna') {
    this.scene = scene;

    this.root = new TransformNode(name, scene);
    this.modelRoot = new TransformNode(name + '_model', scene);

    this.modelRoot.parent = this.root;

    this.createEffects();

    void this.loadModel();
  }

  // Create visual effects
  private createEffects(): void {

    this.glowMat = new StandardMaterial(
      'luna_effect_material',
      this.scene
    );

    this.glowMat.emissiveColor = new Color3(
      0.27, 0.85, 0.91
    );

    this.glowMat.disableLighting = true;
    this.glowMat.alpha = 0.5;

    // Scanning ring
    this.scanRing = MeshBuilder.CreateTorus(
      'luna_scan_ring',
      {
        diameter: 1.5,
        thickness: 0.025,
        tessellation: 48,
      },
      this.scene
    );

    this.scanRing.parent = this.root;
    this.scanRing.position.y = 0.05;
    this.scanRing.rotation.x = Math.PI / 2;
    this.scanRing.material = this.glowMat;

    this.scanRing.setEnabled(false);
  }

  // Import character model
  private async loadModel(): Promise<void> {

    try {

      const result = await SceneLoader.ImportMeshAsync(
        '',
        '/models/',
        'luna.glb',
        this.scene
      );

      this.meshes = result.meshes;

      // Parent imported scene roots to Luna
      const importedNodes = [
        ...result.transformNodes,
        ...result.meshes,
      ];

      importedNodes.forEach((node) => {
        if (!node.parent) {
          node.parent = this.modelRoot;
        }
      });

      this.fitModelToHeight(0.8);

      // Save original material references
      this.meshes.forEach((mesh) => {
        if (mesh.material) {
          this.originalMaterials.set(
            mesh,
            mesh.material
          );
        }
      });

      this.loaded = true;

      this.setExpression('neutral');

      console.log('Luna loaded successfully');

    } catch (error) {
      console.error('Luna loading error:', error);
    }
  }

  // Main animation loop
  public update(deltaTime: number): void {

    if (!this.loaded) return;

    this.animTimer += deltaTime;

    // Hover animation
    this.hoverOffset =
      Math.sin(this.animTimer * 2.5) * 0.08;

    this.modelRoot.position.y = this.hoverOffset;

    // Gentle floating tilt
    this.modelRoot.rotation.z =
      Math.sin(this.animTimer * 1.5) * 0.025;

    this.modelRoot.rotation.x =
      Math.sin(this.animTimer * 1.2) * 0.015;

    // Scanning animation
    if (this.currentExpression === 'scanning') {

      this.scanRing.setEnabled(true);

      const scale =
        1 + Math.sin(this.animTimer * 3) * 0.15;

      this.scanRing.scaling.setAll(scale);

      this.scanRing.rotation.y += deltaTime * 2;

      this.scanRing.material = this.glowMat;

    } else {
      this.scanRing.setEnabled(false);
    }

    // Target tracking using entire character rotation
    if (this.targetLookAt) {

      const diff = this.targetLookAt.subtract(
        this.root.position
      );

      const targetAngle = Math.atan2(
        diff.x,
        diff.z
      );

      this.root.rotation.y = targetAngle;
    }

    // Alert pulsing
    if (this.currentExpression === 'alert') {

      const pulse =
        0.7 + Math.sin(this.animTimer * 5) * 0.3;

      this.applyEmissive(
        new Color3(
          pulse,
          0.15 * pulse,
          0.08 * pulse
        )
      );
    }
  }

  // Change expression
  public setExpression(
    expression: LunaExpression
  ): void {

    this.currentExpression = expression;

    if (!this.loaded) return;

    // Restore original materials before applying a new expression
    this.originalMaterials.forEach((material, mesh) => {
      mesh.material = material;
    });

    let color = new Color3(
      0.27, 0.85, 0.91
    );

    switch (expression) {

      case 'neutral':
        color = new Color3(
          0.27, 0.85, 0.91
        );
        this.modelRoot.rotation.z = 0;
        break;

      case 'happy':
        color = new Color3(
          0.3, 0.95, 0.8
        );
        break;

      case 'witty':
        color = new Color3(
          0.96, 0.73, 0.26
        );
        break;

      case 'curious':
        color = new Color3(
          0.4, 0.85, 1
        );

        this.modelRoot.rotation.z = -0.12;
        break;

      case 'alert':
        color = new Color3(
          1, 0.25, 0.1
        );
        break;

      case 'scanning':
        color = new Color3(
          0.2, 0.95, 1
        );
        break;
    }

    this.applyEmissive(color);
  }

  // Apply glow to character materials
  private applyEmissive(color: Color3): void {

    this.meshes.forEach((mesh) => {

      const original = this.originalMaterials.get(mesh);

      if (!original) return;

      // Create a separate material to avoid modifying
      // shared materials across the imported model.
      const material = original.clone(
        'luna_' + mesh.name + '_expression'
      );

      if (material instanceof StandardMaterial) {
        material.emissiveColor = color.scale(0.18);
      }

      mesh.material = material;
    });
  }

  // Look towards a target
  public setLookAt(target: Vector3 | null): void {
    this.targetLookAt = target;
  }

  // Position character
  public setPosition(pos: Vector3): void {
    this.root.position.copyFrom(pos);
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

  // Dispose character
  public dispose(): void {
    this.root.dispose();
    this.scene.dispose;
  }
}