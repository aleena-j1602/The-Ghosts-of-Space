export enum GameLevel {
  OPENING_CINEMATIC = 'OPENING_CINEMATIC',
  MOON = 'MOON',
  MARS = 'MARS',
  DEEP_SPACE = 'DEEP_SPACE',
  EARTH_FACILITY = 'EARTH_FACILITY',
}

export interface PlayerResources {
  energy: number;
  maxEnergy: number;
  suitIntegrity: number;
  lunaBattery: number;
  recoveryCapacity: number;
}

export class GameState {
  private static instance: GameState;

  public currentLevel: GameLevel = GameLevel.OPENING_CINEMATIC;
  public missionDay: number = 1;
  public maxMissionDays: number = 14;
  public artifactsCollected: number = 0;
  public recoveryTarget: number = 3;
  public investigationPoints: number = 0;

  public resources: PlayerResources = {
    energy: 100,
    maxEnergy: 100,
    suitIntegrity: 100,
    lunaBattery: 100,
    recoveryCapacity: 3,
  };

  private constructor() {}

  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }

  public resetToDefaults(): void {
    this.currentLevel = GameLevel.OPENING_CINEMATIC;
    this.missionDay = 1;
    this.artifactsCollected = 0;
    this.investigationPoints = 0;
    this.resources = {
      energy: 100,
      maxEnergy: 100,
      suitIntegrity: 100,
      lunaBattery: 100,
      recoveryCapacity: 3,
    };
  }
}
