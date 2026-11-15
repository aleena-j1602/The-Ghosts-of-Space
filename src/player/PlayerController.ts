import {
  Vector3,
} from '@babylonjs/core';
import { AstronautCharacter } from './AstronautCharacter.ts';
import { InputManager } from '../core/InputManager.ts';
import { ThirdPersonCamera } from './ThirdPersonCamera.ts';

export class PlayerController {
  public character: AstronautCharacter;
  private inputManager: InputManager;
  private camera: ThirdPersonCamera;

  // Speeds
  private walkSpeed: number = 4.2;
  private runSpeed: number = 7.8;
  private currentSpeed: number = 0;
  private currentFacing: Vector3 = new Vector3(0, 0, 1);
  private isEnabled: boolean = true;

  constructor(
    character: AstronautCharacter,
    inputManager: InputManager,
    camera: ThirdPersonCamera
  ) {
    this.character = character;
    this.inputManager = inputManager;
    this.camera = camera;
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  public update(deltaTime: number): void {
    if (!this.isEnabled) {
      this.character.update(deltaTime, false, false);
      return;
    }

    // Input collection
    let moveForward = 0;
    let moveRight = 0;

    if (this.inputManager.isKeyDown('KeyW') || this.inputManager.isKeyDown('ArrowUp')) {
      moveForward += 1;
    }
    if (this.inputManager.isKeyDown('KeyS') || this.inputManager.isKeyDown('ArrowDown')) {
      moveForward -= 1;
    }
    if (this.inputManager.isKeyDown('KeyD') || this.inputManager.isKeyDown('ArrowRight')) {
      moveRight += 1;
    }
    if (this.inputManager.isKeyDown('KeyA') || this.inputManager.isKeyDown('ArrowLeft')) {
      moveRight -= 1;
    }

    const isRunning = this.inputManager.isKeyDown('ShiftLeft') || this.inputManager.isKeyDown('ShiftRight');
    const isMoving = moveForward !== 0 || moveRight !== 0;

    if (isMoving) {
      const camForward = this.camera.getForwardVector();
      const camRight = this.camera.getRightVector();

      // Desired movement direction aligned with camera view
      const moveDir = camForward.scale(moveForward).add(camRight.scale(moveRight)).normalize();

      const targetSpeed = isRunning ? this.runSpeed : this.walkSpeed;
      this.currentSpeed = targetSpeed;

      // Move player position
      const deltaPos = moveDir.scale(this.currentSpeed * deltaTime);
      this.character.root.position.addInPlace(deltaPos);

      // Smoothly orient player character towards direction of travel
      this.currentFacing = Vector3.Lerp(this.currentFacing, moveDir, deltaTime * 12.0).normalize();
      const angle = Math.atan2(this.currentFacing.x, this.currentFacing.z);
      this.character.setRotationY(angle);
    } else {
      this.currentSpeed = 0;
    }

    // Update astronaut animation
    this.character.update(deltaTime, isMoving, isRunning);

    // Update 3rd person camera to track player
    this.camera.update(this.character.getPosition());
  }

  public getPosition(): Vector3 {
    return this.character.getPosition();
  }

  public getForward(): Vector3 {
    return this.currentFacing;
  }

  public isMoving(): boolean {
    return this.currentSpeed > 0;
  }

  public isRunning(): boolean {
    return this.currentSpeed > this.walkSpeed + 0.5;
  }

  public isSprinting(): boolean {
    return this.inputManager.isKeyDown('ShiftLeft') || this.inputManager.isKeyDown('ShiftRight');
  }
}
