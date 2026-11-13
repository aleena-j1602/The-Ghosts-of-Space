import { GameState } from '../core/GameState.ts';
import { ARTIFACTS_DATA } from '../data/artifacts.ts';

export interface SavedGameData {
  currentLevel: string;
  missionDay: number;
  artifactsCollected: number;
  investigationPoints: number;
  resources: {
    energy: number;
    maxEnergy: number;
    suitIntegrity: number;
    lunaBattery: number;
    recoveryCapacity: number;
  };
  collectedArtifactIds: string[];
  badges: string[];
  rank: string;
  recuperationCount: number;
  lastSavedTimestamp: number;
}

export class SaveManager {
  private static STORAGE_KEY = 'GHOSTS_OF_SPACE_SAVE_V1';

  public static saveGame(): boolean {
    try {
      const gs = GameState.getInstance();
      const collectedIds = Object.values(ARTIFACTS_DATA)
        .filter((a) => a.isCollected)
        .map((a) => a.id);

      const badges: string[] = [];
      if (gs.artifactsCollected >= 3) {
        badges.push('lunar_pioneer');
      }

      let rank = 'Junior Space Archaeologist';
      if (gs.artifactsCollected >= 3) {
        rank = 'Senior Space Archaeologist';
      }

      const saveData: SavedGameData = {
        currentLevel: gs.currentLevel,
        missionDay: gs.missionDay,
        artifactsCollected: gs.artifactsCollected,
        investigationPoints: gs.investigationPoints,
        resources: { ...gs.resources },
        collectedArtifactIds: collectedIds,
        badges: badges,
        rank: rank,
        recuperationCount: 0,
        lastSavedTimestamp: Date.now(),
      };

      localStorage.setItem(SaveManager.STORAGE_KEY, JSON.stringify(saveData));
      console.log('[SaveManager] Game state successfully saved to localStorage.');
      return true;
    } catch (err) {
      console.warn('[SaveManager] Failed to save game:', err);
      return false;
    }
  }

  public static loadGame(): SavedGameData | null {
    try {
      const raw = localStorage.getItem(SaveManager.STORAGE_KEY);
      if (!raw) return null;

      const data: SavedGameData = JSON.parse(raw);
      const gs = GameState.getInstance();

      gs.missionDay = data.missionDay;
      gs.artifactsCollected = data.artifactsCollected;
      gs.investigationPoints = data.investigationPoints;
      gs.resources = { ...data.resources };

      // Restore artifact collection states
      data.collectedArtifactIds.forEach((id) => {
        if (ARTIFACTS_DATA[id]) {
          ARTIFACTS_DATA[id].isCollected = true;
        }
      });

      console.log('[SaveManager] Game state successfully restored from localStorage.');
      return data;
    } catch (err) {
      console.warn('[SaveManager] Failed to load saved game:', err);
      return null;
    }
  }

  public static clearSave(): void {
    localStorage.removeItem(SaveManager.STORAGE_KEY);
  }
}
