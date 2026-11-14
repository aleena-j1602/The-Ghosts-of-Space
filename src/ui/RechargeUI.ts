import { GameState } from '../core/GameState.ts';
import { RechargeManager } from '../systems/RechargeManager.ts';
import { DialogueUI } from './DialogueUI.ts';
import type { DialogueLine } from '../data/dialogue.ts';

export class RechargeUI {
  private container: HTMLElement;
  private rechargeManager: RechargeManager;
  private onRechargeFinishedCallback?: (isDeadlineExceeded: boolean) => void;
  private onLaunchMarsCallback?: () => void;
  private onLaunchDeepSpaceCallback?: () => void;
  private dialogueUI: DialogueUI | null = null;
  private isMarsTransitionReady: boolean = false;
  private isDeepSpaceTransitionReady: boolean = false;

  constructor() {
    this.rechargeManager = RechargeManager.getInstance();

    this.container = document.createElement('div');
    this.container.id = 'recharge-overlay';
    this.container.className = 'recharge-overlay hidden';

    this.container.innerHTML = `
      <!-- Top subtle dock banner inside cabin -->
      <div class="cabin-dock-banner glass-card">
        <div class="dock-badge">
          <span class="status-dot-green"></span>
          <span id="dock-status-label">HABITAT LIFE SUPPORT DOCKED</span>
        </div>
        <div class="dock-telemetry">
          <span id="recharge-day-pill" class="highlight-amber">MISSION DAY 2 / 14</span>
          <span class="pill-sep">&bull;</span>
          <span id="dock-sub-status" class="highlight-cyan">SYSTEMS 100% NOMINAL</span>
        </div>
      </div>

      <!-- Exit Modal (shown when story completes or ready to depart) -->
      <div id="cabin-exit-card" class="cabin-exit-card glass-card hidden">
        <div id="cabin-card-tag" class="card-tag">DEBRIEFING COMPLETE // EXPEDITION RESTORED</div>
        <h2 id="recharge-exit-title">MISSION DAY 2 READY</h2>
        <p id="recharge-exit-desc" class="exit-desc">
          Power cells topped off. Regolith filters purged. Historical telemetry logged to Earth archives.
        </p>

        <div class="recharge-summary-grid">
          <div class="rec-metric">
            <span class="metric-label">SUIT INTEGRITY</span>
            <span class="metric-val highlight-cyan">100%</span>
          </div>
          <div class="rec-metric">
            <span class="metric-label">ENERGY CELLS</span>
            <span class="metric-val highlight-amber">100%</span>
          </div>
          <div class="rec-metric">
            <span class="metric-label">LUNA BATTERY</span>
            <span class="metric-val highlight-cyan">100%</span>
          </div>
          <div class="rec-metric">
            <span class="metric-label">TARGETS SECURED</span>
            <span id="recharge-collected-val" class="metric-val highlight-green">1 / 3</span>
          </div>
        </div>

        <div class="exit-actions">
          <button id="btn-exit-cabin" class="btn-primary glow-ready">
            EXIT AIRLOCK &amp; RESUME EXPEDITION ▶
          </button>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);
    this.bindEvents();
  }

  private bindEvents(): void {
    const btnExit = this.container.querySelector('#btn-exit-cabin');
    btnExit?.addEventListener('click', () => {
      if (this.isDeepSpaceTransitionReady) {
        this.hide();
        if (this.onLaunchDeepSpaceCallback) {
          this.onLaunchDeepSpaceCallback();
        }
      } else if (this.isMarsTransitionReady) {
        this.hide();
        if (this.onLaunchMarsCallback) {
          this.onLaunchMarsCallback();
        }
      } else {
        this.finishRecharge();
      }
    });
  }

  public setOnRechargeFinished(cb: (isDeadlineExceeded: boolean) => void): void {
    this.onRechargeFinishedCallback = cb;
  }

  public setOnLaunchMars(cb: () => void): void {
    this.onLaunchMarsCallback = cb;
  }

  public setOnLaunchDeepSpace(cb: () => void): void {
    this.onLaunchDeepSpaceCallback = cb;
  }

  public openRecharge(dialogueUI: DialogueUI): void {
    this.dialogueUI = dialogueUI;
    const gs = GameState.getInstance();

    // Check if missions are completed
    const isMoonComplete = (gs.currentLevel === 'MOON' || gs.currentLevel === 'OPENING_CINEMATIC') && gs.artifactsCollected >= gs.recoveryTarget;
    const isMarsComplete = gs.currentLevel === 'MARS' && gs.artifactsCollected >= gs.recoveryTarget;

    this.isMarsTransitionReady = isMoonComplete;
    this.isDeepSpaceTransitionReady = isMarsComplete;

    // Advance day
    gs.missionDay += 1;

    // Restore all vital resources to 100%
    gs.resources.energy = gs.resources.maxEnergy;
    gs.resources.suitIntegrity = 100;
    gs.resources.lunaBattery = 100;
    gs.resources.recoveryCapacity = 3;

    // Update banner & card text
    const dayPill = this.container.querySelector('#recharge-day-pill') as HTMLElement;
    const exitTitle = this.container.querySelector('#recharge-exit-title') as HTMLElement;
    const exitDesc = this.container.querySelector('#recharge-exit-desc') as HTMLElement;
    const cardTag = this.container.querySelector('#cabin-card-tag') as HTMLElement;
    const collectedVal = this.container.querySelector('#recharge-collected-val') as HTMLElement;
    const btnExit = this.container.querySelector('#btn-exit-cabin') as HTMLElement;

    if (dayPill) dayPill.textContent = `MISSION DAY ${gs.missionDay} / ${gs.maxMissionDays}`;
    if (collectedVal) collectedVal.textContent = `${gs.artifactsCollected} / ${gs.recoveryTarget}`;

    if (isMarsComplete) {
      if (cardTag) cardTag.textContent = 'LEVEL 2 COMPLETE // MARTIAN ARCHIVE SYNCHRONIZED';
      if (exitTitle) exitTitle.textContent = 'DESTINATION: DEEP SPACE // LEVEL 3 READY';
      if (exitDesc) {
        exitDesc.textContent =
          'All 3 target Martian artifacts safely archived. Trajectory plotted for Deep Space Research Cabin. No surface EVA required—conduct observational telemetry and probe signal analysis from the ship\'s laboratory.';
      }
      if (btnExit) {
        btnExit.innerHTML = 'ENTER RESEARCH CABIN // ADVANCE TO DEEP SPACE ▶';
        btnExit.classList.add('glow-ready');
      }
    } else if (isMoonComplete) {
      if (cardTag) cardTag.textContent = 'LEVEL 1 COMPLETE // LUNAR ARCHIVE SYNCHRONIZED';
      if (exitTitle) exitTitle.textContent = 'DESTINATION: MARS // LEVEL 2 READY';
      if (exitDesc) {
        exitDesc.textContent =
          'All 3 target Lunar artifacts safely archived. Hohmann transfer burn plotted for Chryse Planitia, Mars.';
      }
      if (btnExit) {
        btnExit.innerHTML = 'LAUNCH INTERPLANETARY BURN &amp; LAND ON MARS ▶';
        btnExit.classList.add('glow-ready');
      }
    } else {
      const isMars = gs.currentLevel === 'MARS';
      if (cardTag) cardTag.textContent = 'DEBRIEFING COMPLETE // EXPEDITION RESTORED';
      if (exitTitle) exitTitle.textContent = `MISSION DAY ${gs.missionDay} READY`;
      if (exitDesc) {
        exitDesc.textContent = isMars
          ? 'Thermal cells topped off. Iron oxide dust purged. Next Martian sector telemetry locked.'
          : 'Power cells topped off. Regolith filters purged. Historical telemetry logged to Earth archives.';
      }
      if (btnExit) {
        btnExit.innerHTML = isMars
          ? 'EXIT AIRLOCK &amp; RESUME MARS EXPEDITION ▶'
          : 'EXIT AIRLOCK &amp; RESUME MOON EXPEDITION ▶';
      }
    }

    // Hide exit card initially while conversation is running
    const exitCard = this.container.querySelector('#cabin-exit-card') as HTMLElement;
    exitCard.classList.add('hidden');

    this.container.classList.remove('hidden');
    this.container.style.opacity = '1';

    // Start narrative debrief with Luna
    setTimeout(() => {
      if (isMarsComplete) {
        this.playDeepSpaceTransitionDialogue();
      } else if (isMoonComplete) {
        this.playMarsTransitionDialogue();
      } else {
        this.playRechargeStory();
      }
    }, 500);
  }

  private playDeepSpaceTransitionDialogue(): void {
    if (!this.dialogueUI) return;

    const deepSpaceBriefingDialogue: DialogueLine[] = [
      {
        id: 'deep_brief_1',
        speaker: 'LUNA',
        text: "Explorer! Look at our mission telemetry console! That's three for three on Mars! Viking 1, Sojourner, and Spirit are permanently encrypted into the Solar Heritage Archive!",
        lunaExpression: 'happy',
      },
      {
        id: 'deep_brief_2',
        speaker: 'PLAYER',
        text: "From Chryse Planitia to Gusev Crater, Mars is safe in the history books. But Luna, look at the navigation computer—what's this new deep-range trajectory?",
      },
      {
        id: 'deep_brief_3',
        speaker: 'LUNA',
        text: "Earth Control just cleared our flight path for LEVEL 3: DEEP SPACE & THE ASTEROID BELT! But here's the best part, partner—out there in the great void, there is NO surface. Zero EVAs. We will NOT be stepping outside in bulky spacesuits!",
        lunaExpression: 'witty',
      },
      {
        id: 'deep_brief_4',
        speaker: 'PLAYER',
        text: "No spacewalks? We conduct all research and observation from inside the spacecraft?",
      },
      {
        id: 'deep_brief_5',
        speaker: 'LUNA',
        text: "You bet! We're transitioning into our ship's Deep Space Research Cabin! We'll use our long-range radio telescopes, sensor arrays, and celestial navigation map to track, intercept, and study legendary probes that wandered far beyond the planets.\nEach probe category is separated by millions of kilometers, so each transit takes an entire mission day of flight!",
        lunaExpression: 'happy',
      },
      {
        id: 'deep_brief_6',
        speaker: 'PLAYER',
        text: "What probes are on our deep space intercept manifest?",
      },
      {
        id: 'deep_brief_7',
        speaker: 'LUNA',
        text: "Three giants of science!\n1. NEAR Shoemaker: The first craft to orbit and land on asteroid 433 Eros!\n2. Dawn Spacecraft: The ion-propulsion marvel that explored dwarf planet Ceres and Vesta!\n3. Pioneer 10: The immortal voyager that crossed the asteroid belt, survived Jupiter, and carries humanity's golden plaque outward to the stars!",
        lunaExpression: 'curious',
      },
      {
        id: 'deep_brief_8',
        speaker: 'PLAYER',
        text: "We study their telemetry from the research console, compile science reports, and beam the findings back to Earth.",
      },
      {
        id: 'deep_brief_9',
        speaker: 'LUNA',
        text: "Exactly! Check our Astrogation Map when we arrive at the lab, detect their signals, and complete humanity's archive. To the stars, Explorer!",
        lunaExpression: 'happy',
      },
    ];

    this.dialogueUI.startDialogue(deepSpaceBriefingDialogue, () => {
      this.showExitCard();
    });
  }

  private playMarsTransitionDialogue(): void {
    if (!this.dialogueUI) return;

    const marsBriefingDialogue: DialogueLine[] = [
      {
        id: 'mars_brief_1',
        speaker: 'LUNA',
        text: "Explorer! Look at our mission telemetry console! That's three for three! Apollo 11's Eagle, Apollo 12's ALSEP, and Apollo 15's Lunar Roving Vehicle. The entire lunar heritage sector is fully archived!",
        lunaExpression: 'happy',
      },
      {
        id: 'mars_brief_2',
        speaker: 'PLAYER',
        text: "Tranquility Base and the Hadley plains are officially safe for posterity. But Luna, look at the navigation computer—what's this new blinking trajectory vector?",
      },
      {
        id: 'mars_brief_3',
        speaker: 'LUNA',
        text: "That, my intrepid partner, is Earth Control transferring our command clearance to LEVEL 2: THE RED PLANET! Destination: MARS! 140 million miles outbound!",
        lunaExpression: 'witty',
      },
      {
        id: 'mars_brief_4',
        speaker: 'PLAYER',
        text: "Mars! From the airless gray regolith to the ancient rust valleys. What relics are we tasked to recover out there?",
      },
      {
        id: 'mars_brief_5',
        speaker: 'LUNA',
        text: "Oh, you're going to love this roster! First: Viking 1 Lander—touchdown in 1976 at Chryse Planitia. The very first operational lander to touch Martian soil and search for biosignatures!\nSecond: Sojourner Rover—1997, Ares Vallis! A plucky little 23-pound skateboard that drove across another planet for the first time in human history, sniffing rocks named Barnacle Bill and Yogi!\nAnd Third: Spirit Rover (MER-A)—2004, Gusev Crater! The gritty explorer who broke a front wheel, dragged it across the ground, and accidentally carved open pure silica deposits—rock-solid proof of ancient hot springs!",
        lunaExpression: 'happy',
      },
      {
        id: 'mars_brief_6',
        speaker: 'PLAYER',
        text: "A golden age of robotic pioneers. What about the landing conditions?",
      },
      {
        id: 'mars_brief_7',
        speaker: 'LUNA',
        text: "Buckle up, buttercup! Mars isn't a vacuum like the Moon—it has a thin carbon dioxide atmosphere, which means hypersonic entry friction, fiery heat-shield ionization, and towering red dust storms! Gravity is about 38% of Earth's, so say goodbye to your effortless 10-foot bunny hops.",
        lunaExpression: 'alert',
      },
      {
        id: 'mars_brief_8',
        speaker: 'PLAYER',
        text: "I'm ready. Let's pre-heat the main propulsion bells and lock in the Hohmann transfer trajectory.",
      },
      {
        id: 'mars_brief_9',
        speaker: 'LUNA',
        text: "Interplanetary flight computer synchronized! Main thruster countdown initiated. Next stop: Chryse Planitia, Mars! Punch it, Explorer!",
        lunaExpression: 'happy',
      },
    ];

    this.dialogueUI.startDialogue(marsBriefingDialogue, () => {
      this.showExitCard();
    });
  }

  private playRechargeStory(): void {
    if (!this.dialogueUI) return;

    const story = this.rechargeManager.getNextStoryToTell();

    if (story) {
      this.rechargeManager.markStoryTold(story.artifactId);
      this.dialogueUI.startDialogue(story.storyDialogue, () => {
        this.showExitCard();
      });
    } else {
      this.dialogueUI.startDialogue(this.rechargeManager.getDefaultRechargeDialogue(), () => {
        this.showExitCard();
      });
    }
  }

  private showExitCard(): void {
    const exitCard = this.container.querySelector('#cabin-exit-card') as HTMLElement;
    if (exitCard) {
      exitCard.classList.remove('hidden');
      exitCard.style.animation = 'fadeSlideUp 0.4s ease-out forwards';
    }
  }

  private finishRecharge(): void {
    this.hide();
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
