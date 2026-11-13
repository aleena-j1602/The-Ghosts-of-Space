import {
  Vector3,
  Scene,
} from '@babylonjs/core';
import { LunaCharacter, LunaExpression } from './LunaCharacter.ts';

export class LunaFollower {
  public luna: LunaCharacter;
  private targetPosition: Vector3 = new Vector3(0, 1.8, 0);
  private desiredOffset: Vector3 = new Vector3(1.8, 1.6, -1.8); // Behind and to the right of the player
  private followDamping: number = 4.2;

  constructor(scene: Scene, lunaName: string = 'LunaExplorer') {
    this.luna = new LunaCharacter(scene, lunaName);
    this.luna.setExpression('curious');
  }

  public update(deltaTime: number, playerPos: Vector3, playerForward: Vector3, isPlayerMoving: boolean): void {
    // Calculate companion target position relative to player facing direction
    const right = new Vector3(playerForward.z, 0, -playerForward.x).normalize();
    const forward = playerForward.normalize();

    // Desired spot: slightly behind and to the right
    const targetOffset = right.scale(this.desiredOffset.x)
      .add(new Vector3(0, this.desiredOffset.y, 0))
      .add(forward.scale(this.desiredOffset.z));

    this.targetPosition = playerPos.add(targetOffset);

    // Smooth critically-damped spring follow
    const currentPos = this.luna.root.position;
    const diff = this.targetPosition.subtract(currentPos);
    const distance = diff.length();

    // Speed up if falling too far behind
    const dynamicSpeed = distance > 4.0 ? this.followDamping * 1.8 : this.followDamping;
    this.luna.root.position = Vector3.Lerp(currentPos, this.targetPosition, Math.min(deltaTime * dynamicSpeed, 0.25));

    // Update Luna's internal animations (hover bobbing, eye pulse, arm motion)
    this.luna.update(deltaTime);

    // Dynamic rotation & gaze
    if (isPlayerMoving) {
      // Tilt forward slightly when moving fast
      this.luna.root.rotation.x = Math.min(distance * 0.05, 0.2);

      // Rotate body to face travel direction
      if (diff.lengthSquared() > 0.1) {
        const targetAngle = Math.atan2(diff.x, diff.z);
        this.luna.root.rotation.y = Vector3.Lerp(
          new Vector3(0, this.luna.root.rotation.y, 0),
          new Vector3(0, targetAngle, 0),
          deltaTime * 5.0
        ).y;
      }
      this.luna.setLookAt(null);
    } else {
      // Look back affectionately at the player when stopped
      this.luna.root.rotation.x *= 0.85;
      this.luna.setLookAt(playerPos.add(new Vector3(0, 1.4, 0)));
    }
  }

  public setExpression(expression: LunaExpression): void {
    this.luna.setExpression(expression);
  }

  public setPosition(pos: Vector3): void {
    this.luna.setPosition(pos);
  }

  public getPosition(): Vector3 {
    return this.luna.root.position;
  }

  public dispose(): void {
    this.luna.dispose();
  }
}
