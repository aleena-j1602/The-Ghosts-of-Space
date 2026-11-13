import { GameState } from '../core/GameState.ts';

export class ResourceManager {
  private gameState: GameState;
  private energyDrainRate: number = 0.8;      // per second walking
  private sprintMultiplier: number = 2.2;     // while sprinting
  private lunaDrainRate: number = 0.4;        // passive per second

  constructor() {
    this.gameState = GameState.getInstance();
  }

  public update(deltaTime: number, isMoving: boolean, isRunning: boolean): void {
    const res = this.gameState.resources;

    // 1. Player Energy depletion
    if (isMoving) {
      const drain = this.energyDrainRate * (isRunning ? this.sprintMultiplier : 1.0) * deltaTime;
      res.energy = Math.max(5, res.energy - drain); // Keep minimum 5 so player isn't immobilized
    } else {
      // Very slight recovery when stationary
      res.energy = Math.min(res.maxEnergy, res.energy + 0.1 * deltaTime);
    }

    // 2. Luna battery slow continuous consumption
    res.lunaBattery = Math.max(10, res.lunaBattery - this.lunaDrainRate * deltaTime);

    // 3. Environmental suit integrity micro-wear
    if (isRunning) {
      res.suitIntegrity = Math.max(20, res.suitIntegrity - 0.05 * deltaTime);
    }
  }

  public consumeScanEnergy(): void {
    const res = this.gameState.resources;
    res.energy = Math.max(5, res.energy - 10);
    res.lunaBattery = Math.max(10, res.lunaBattery - 8);
  }

  public rechargeFull(): void {
    const res = this.gameState.resources;
    res.energy = res.maxEnergy;
    res.suitIntegrity = 100;
    res.lunaBattery = 100;
    res.recoveryCapacity = 3;
  }

  public isEnergyCritical(): boolean {
    return this.gameState.resources.energy < 20;
  }

  public isLunaBatteryCritical(): boolean {
    return this.gameState.resources.lunaBattery < 20;
  }
}
