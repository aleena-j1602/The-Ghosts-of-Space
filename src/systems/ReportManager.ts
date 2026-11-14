import { GameState } from '../core/GameState.ts';
import { ARTIFACTS_DATA } from '../data/artifacts/index.ts';
import { DialogueUI } from '../ui/DialogueUI.ts';
import type { DialogueLine } from '../data/dialogue.ts';

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
    const isDeepSpace = gs.currentLevel === 'DEEP_SPACE';
    const isMars = gs.currentLevel === 'MARS';
    const sectorName = isDeepSpace ? 'Deep Space Research Observatory' : isMars ? 'Chryse Base' : 'Tranquility Base';

    const reportLines: DialogueLine[] = [
      {
        id: 'earth_report_1',
        speaker: 'SYSTEM',
        text: `TRANSMITTING HIGH-BANDWIDTH DEEP-SPACE RELAY TO EARTH CONTROL... [${collectedArts.length} ARTIFACT PACKETS ENCRYPTED]`,
      },
      {
        id: 'earth_report_2',
        speaker: 'EARTH CONTROL',
        text: isDeepSpace
          ? `Telemetry received through the Deep Space Network, ${sectorName}! Probe telemetry and scientific analyses successfully integrated into the Master Solar Heritage Archive!`
          : `Telemetry received across interplanetary space, ${sectorName}! Outstanding work, Explorer. Your archaeological findings have been integrated into the permanent Space Heritage Archive.`,
      },
      {
        id: 'earth_report_3',
        speaker: 'LUNA',
        text: isDeepSpace
          ? `High-frequency transmission verified! Earth Control is confirming data integrity across all planetary and deep-space sectors!`
          : isMars
          ? `High-gain transmission confirmed! Earth Control is cheering all the way in Houston!`
          : `See? I told you we'd make a brilliant team! Earth Control just credited bonus support rations to our habitat dock.`,
        lunaExpression: 'happy',
      },
    ];

    if (gs.artifactsCollected >= gs.recoveryTarget) {
      if (isDeepSpace) {
        reportLines.push({
          id: 'earth_report_4_deep',
          speaker: 'EARTH CONTROL',
          text: `SPECIAL CITATION: To the crew of the Ghost Archive vessel. All 3 Deep Space Probes have been archived. You have achieved 100% mission completion across Moon, Mars, and the Outer Solar System!`,
        });
        reportLines.push({
          id: 'earth_report_5_deep',
          speaker: 'LUNA',
          text: `Mission Accomplished! We brought humanity's greatest exploratory heritage safely home!`,
          lunaExpression: 'happy',
        });
      } else if (isMars) {
        reportLines.push({
          id: 'earth_report_4_mars',
          speaker: 'EARTH CONTROL',
          text: `ATTENTION EXPLORER: You have successfully recovered all 3 target artifacts for Level 2! You are officially awarded the 'MARTIAN TRAILBLAZER' distinction!`,
        });
        reportLines.push({
          id: 'earth_report_5_mars',
          speaker: 'LUNA',
          text: `We mastered the Red Planet! Enter the habitat cabin to plot our trajectory for Level 3: Deep Space!`,
          lunaExpression: 'witty',
        });
      } else {
        reportLines.push({
          id: 'earth_report_4',
          speaker: 'EARTH CONTROL',
          text: `ATTENTION EXPLORER: You have successfully recovered all 3 target artifacts for Level 1! You are officially awarded the 'LUNAR PIONEER' distinction and promoted to Senior Space Archaeologist!`,
        });
        reportLines.push({
          id: 'earth_report_5',
          speaker: 'LUNA',
          text: `A promotion! Return to the cabin to plot our trajectory for Level 2: Mars! Let's get our systems prepped!`,
          lunaExpression: 'witty',
        });
      }
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
