import { GameState } from '../core/GameState.ts';
import { RechargeManager } from '../systems/RechargeManager.ts';
import { DialogueUI } from './DialogueUI.ts';

export class RechargeUI {
  private container: HTMLElement;
  private rechargeManager: RechargeManager;
  private onRechargeFinishedCallback?: (isDeadlineExceeded: boolean) => void;

  constructor() {
    this.rechargeManager = RechargeManager.getInstance();

    this.container = document.createElement('div');
    this.container.id = 'recharge-overlay';
    this.container.className = 'recharge-overlay hidden';

    this.container.innerHTML = `
      <div class="recharge-window glass-card">
        <div class="recharge-header">
          <div class="card-tag">LANDING HABITAT // RECHARGE BAY</div>
          <h2>TRANQUILITY SHELTER DEBRIEFING</h2>
          <span class="badge-status">LIFE SUPPORT NOMINAL</span>
        </div>

        <div class="recharge-body">
          <div class="shelter-visual">
            <div class="habitat-dock-station">
              <div class="dock-rings"></div>
              <div class="luna-charging-pod">
                <span class="pod-dot"></span>
                <span>LUNA COUPLING DOCKED</span>
              </div>
            </div>
            <div class="recharge-stat-bars">
              <div class="rec-stat">
                <span>PLAYER SUIT INTEGRITY:</span>
                <span class="highlight-cyan">RESTORED 100%</span>
              </div>
              <div class="rec-stat">
                <span>ENERGY CELL POWER:</span>
                <span class="highlight-amber">RESTORED 100%</span>
              </div>
              <div class="rec-stat">
                <span>LUNA SENSOR BATTERY:</span>
                <span class="highlight-cyan">RESTORED 100%</span>
              </div>
            </div>
          </div>

          <div class="day-transition-card glass-card">
            <div class="day-title-sub">MISSION CALENDAR UPDATE</div>
            <h3 id="recharge-day-title">ADVANCING TO MISSION DAY 2 / 14</h3>
            <p id="recharge-deadline-text">Remaining Days: 13 Days &bull; Target: 3 Artifacts</p>
          </div>
        </div>

        <div class="recharge-footer">
          <button id="btn-start-story" class="btn-primary">
            LISTEN TO LUNA'S MISSION STORY ▶
          </button>
          <button id="btn-skip-to-morning" class="btn-secondary">
            COMMENCE NEXT EXPLORATION DAY ▶
          </button>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);
    this.bindEvents();
  }

  private bindEvents(): void {
    const btnStory = this.container.querySelector('#btn-start-story');
    const btnSkip = this.container.querySelector('#btn-skip-to-morning');

    btnStory?.addEventListener('click', () => {
      this.playRechargeStory();
    });

    btnSkip?.addEventListener('click', () => {
      this.finishRecharge();
    });
  }

  public setOnRechargeFinished(cb: (isDeadlineExceeded: boolean) => void): void {
    this.onRechargeFinishedCallback = cb;
  }

  public openRecharge(dialogueUI: DialogueUI): void {
    const gs = GameState.getInstance();

    // Advance day
    gs.missionDay += 1;

    // Restore resources
    gs.resources.energy = gs.resources.maxEnergy;
    gs.resources.suitIntegrity = 100;
    gs.resources.lunaBattery = 100;
    gs.resources.recoveryCapacity = 3;

    // Update day displays
    const titleEl = this.container.querySelector('#recharge-day-title') as HTMLElement;
    const deadlineEl = this.container.querySelector('#recharge-deadline-text') as HTMLElement;

    titleEl.textContent = `ADVANCING TO MISSION DAY ${gs.missionDay} / ${gs.maxMissionDays}`;
    const remaining = Math.max(0, gs.maxMissionDays - gs.missionDay);
    deadlineEl.textContent = `Days Remaining: ${remaining} Days • Recovered: ${gs.artifactsCollected} / ${gs.recoveryTarget}`;

    this.container.classList.remove('hidden');
    this.container.style.opacity = '1';

    // Store dialogueUI reference
    (this as unknown as { _dialogueUI: DialogueUI })._dialogueUI = dialogueUI;
  }

  private playRechargeStory(): void {
    const dialogueUI = (this as unknown as { _dialogueUI: DialogueUI })._dialogueUI;
    const story = this.rechargeManager.getNextStoryToTell();

    this.hide();

    if (story) {
      this.rechargeManager.markStoryTold(story.artifactId);
      dialogueUI.startDialogue(story.storyDialogue, () => {
        this.checkDeadlineAndFinish();
      });
    } else {
      dialogueUI.startDialogue(this.rechargeManager.getDefaultRechargeDialogue(), () => {
        this.checkDeadlineAndFinish();
      });
    }
  }

  private finishRecharge(): void {
    this.hide();
    this.checkDeadlineAndFinish();
  }

  private checkDeadlineAndFinish(): void {
    const gs = GameState.getInstance();
    const isDeadlineExceeded = gs.missionDay > gs.maxMissionDays && gs.artifactsCollected < gs.recoveryTarget;

    if (this.onRechargeFinishedCallback) {
      this.onRechargeFinishedCallback(isDeadlineExceeded);
    }
  }

  public hide(): void {
    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.classList.add('hidden');
    }, 400);
  }

  public isOpen(): boolean {
    return !this.container.classList.contains('hidden');
  }
}
