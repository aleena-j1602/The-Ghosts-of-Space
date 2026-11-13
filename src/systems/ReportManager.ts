import { GameState } from '../core/GameState.ts';
import { ARTIFACTS_DATA } from '../data/artifacts.ts';
import { DialogueUI } from '../ui/DialogueUI.ts';
import { DialogueLine } from '../data/dialogue.ts';

export class ReportManager {
  private static instance: ReportManager;

  private constructor() {}

  public static getInstance(): ReportManager {
    if (!ReportManager.instance) {
      ReportManager.instance = new ReportManager();
    }
    return ReportManager.instance;
  }

  public canReport(): boolean {
    const gs = GameState.getInstance();
    return gs.artifactsCollected > 0;
  }

  public transmitReportToEarth(
    dialogueUI: DialogueUI,
    onReportComplete?: () => void
  ): void {
    const gs = GameState.getInstance();
    const collectedArts = Object.values(ARTIFACTS_DATA).filter((a) => a.isCollected);

    const reportLines: DialogueLine[] = [
      {
        id: 'earth_report_1',
        speaker: 'SYSTEM',
        text: `TRANSMITTING HIGH-BANDWIDTH DATA TO EARTH CONTROL... [${collectedArts.length} ARTIFACT PACKETS ENCRYPTED]`,
      },
      {
        id: 'earth_report_2',
        speaker: 'EARTH CONTROL',
        text: `Recovery data received loud and clear, Tranquility Base! Exceptional work, Explorer. Our archaeological team has integrated your telemetry into the permanent Space Heritage Archive.`,
      },
      {
        id: 'earth_report_3',
        speaker: 'LUNA',
        text: `See? I told you we'd make a brilliant team! Earth Control just credited bonus support rations to our habitat dock.`,
        lunaExpression: 'happy',
      },
    ];

    if (gs.artifactsCollected >= gs.recoveryTarget) {
      reportLines.push({
        id: 'earth_report_4',
        speaker: 'EARTH CONTROL',
        text: `ATTENTION EXPLORER: You have successfully recovered all 3 target artifacts for Level 1! You are officially awarded the 'LUNAR PIONEER' distinction and promoted to Senior Space Archaeologist!`,
      });
      reportLines.push({
        id: 'earth_report_5',
        speaker: 'LUNA',
        text: `A promotion! Next stop: Mars, the Red Frontier! Let's get our systems prepped!`,
        lunaExpression: 'witty',
      });
    }

    dialogueUI.startDialogue(reportLines, () => {
      // Replenish resources as a reward for successful transmission
      gs.resources.energy = gs.resources.maxEnergy;
      gs.resources.suitIntegrity = 100;
      gs.resources.lunaBattery = 100;

      if (onReportComplete) {
        onReportComplete();
      }
    });
  }
}
