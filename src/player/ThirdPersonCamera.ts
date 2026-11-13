import {
  Scene,
  Vector3,
  ArcRotateCamera,
  TransformNode,
} from '@babylonjs/core';

export class ThirdPersonCamera {
  public camera: ArcRotateCamera;

  constructor(scene: Scene, target: TransformNode) {
    const canvas = scene.getEngine().getRenderingCanvas();

    // Initial camera position behind player
    const initialTargetPos = target.position.add(new Vector3(0, 1.4, 0));
    this.camera = new ArcRotateCamera(
      'thirdPersonCamera',
      -Math.PI / 2, // Looking forward along Z
      Math.PI / 2.7, // Comfortable elevated angle
      6.5,          // Comfortable follow distance
      initialTargetPos,
      scene
    );

    // Limit distance zoom
    this.camera.lowerRadiusLimit = 2.8;
    this.camera.upperRadiusLimit = 14.0;
    this.camera.wheelPrecision = 35;

    // Limit pitch so camera doesn't go below ground or directly above
    this.camera.lowerBetaLimit = 0.25;
    this.camera.upperBetaLimit = Math.PI / 2.05;

    // Attach mouse controls
    this.camera.attachControl(canvas, true);

    // Smooth inertia
    this.camera.inertia = 0.75;
    this.camera.panningInertia = 0;
  }

  public update(playerPos: Vector3): void {
    // Smoothly track player eye/chest height
    const targetHeight = 1.4;
    this.camera.target.x = playerPos.x;
    this.camera.target.y = playerPos.y + targetHeight;
    this.camera.target.z = playerPos.z;
  }

  public getForwardVector(): Vector3 {
    // Direction the camera is pointing on the horizontal plane
    const forward = this.camera.target.subtract(this.camera.position);
    forward.y = 0;
    return forward.normalize();
  }

  public getRightVector(): Vector3 {
    const forward = this.getForwardVector();
    return new Vector3(forward.z, 0, -forward.x).normalize();
  }

  public dispose(): void {
    this.camera.dispose();
  }
}
