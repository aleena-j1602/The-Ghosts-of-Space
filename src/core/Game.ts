import { Engine } from '@babylonjs/core';
import { SceneManager } from './SceneManager.ts';
import { GameState, GameLevel } from './GameState.ts';
import { InputManager } from './InputManager.ts';
import { IntroUI } from '../ui/IntroUI.ts';
import { DialogueUI } from '../ui/DialogueUI.ts';
import { HUD } from '../ui/HUD.ts';
import { MapUI } from '../ui/MapUI.ts';
import { InvestigationUI } from '../ui/InvestigationUI.ts';
import { OPENING_DIALOGUE, DialogueLine } from '../data/dialogue.ts';
import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';
import { ARTIFACTS_DATA } from '../data/artifacts/index.ts';
import { ResourceManager } from '../systems/ResourceManager.ts';
import { ReportManager } from '../systems/ReportManager.ts';
import { RechargeManager } from '../systems/RechargeManager.ts';
import { SaveManager } from '../systems/SaveManager.ts';
import { RechargeUI } from '../ui/RechargeUI.ts';
import { ReportDesignerUI } from '../ui/ReportDesignerUI.ts';
import { CinematicClosingUI } from '../ui/CinematicClosingUI.ts';
import { MoonEnvironment } from '../environments/MoonEnvironment.ts';
import { MarsEnvironment } from '../environments/MarsEnvironment.ts';

export class Game {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private sceneManager: SceneManager;
  private gameState: GameState;
  private inputManager: InputManager;

  // UI Components
  private introUI: IntroUI;
  private dialogueUI: DialogueUI;
  private hud: HUD;
  private mapUI: MapUI;
  private investigationUI: InvestigationUI;
  private reportDesignerUI: ReportDesignerUI;
  private cinematicClosingUI: CinematicClosingUI;

  // Telemetry indicators
  private fpsDisplay: HTMLElement | null = null;
  private statusDisplay: HTMLElement | null = null;
  private sceneDisplay: HTMLElement | null = null;

  // Phase 6/7 systems
  private resourceManager: ResourceManager;
  private reportManager: ReportManager;
  private rechargeUI: RechargeUI;
  private isNearShelter: boolean = false;
  private suppressShelterPrompts: boolean = false;
  private shelterPrompt: HTMLElement | null = null;
  private reportPrompt: HTMLElement | null = null;
  private postArchivePrompt: HTMLElement | null = null;
  private airlockTransitionEl: HTMLElement | null = null;
  private airlockAudioCtx: AudioContext | null = null;
  private missionAccomplishedModal: HTMLElement | null = null;
  private lastEnergyAlertTime: number = 0;
  private energyAlertIndex: number = 0;

  // Soundtrack audio state & synchronization
  private nebulaAudio: HTMLAudioElement | null = null;
  private endingAudio: HTMLAudioElement | null = null;
  private musicVolume: number = 0.55;
  private hasNebulaIntroPlayed: boolean = false;
  private hasSilentUniversePlayed: boolean = false;
  private isNebulaFading: boolean = false;
  private isIntroCinematicActive: boolean = false;
  private userGestureCleanup: (() => void) | null = null;

  constructor(canvasId: string) {
    const canvasEl = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvasEl) {
      throw new Error(`Target canvas element with ID '${canvasId}' not found.`);
    }
    this.canvas = canvasEl;

    this.engine = new Engine(this.canvas, true, {
      preserveDrawingBuffer: false,
      stencil: true,
      powerPreference: 'high-performance',
    });

    this.gameState = GameState.getInstance();
    this.inputManager = new InputManager();
    this.sceneManager = new SceneManager(this.engine, this.inputManager);

    this.introUI = new IntroUI();
    this.dialogueUI = new DialogueUI();
    this.hud = new HUD();
    this.mapUI = new MapUI();
    this.investigationUI = new InvestigationUI();
    this.reportDesignerUI = new ReportDesignerUI();
    this.cinematicClosingUI = new CinematicClosingUI();

    // Phase 6/7 system instantiation
    this.resourceManager = new ResourceManager();
    this.reportManager = ReportManager.getInstance();
    this.rechargeUI = new RechargeUI();

    this.setupUIBindings();
    this.setupWindowEvents();
    this.setupCinematicSequence();
    this.setupInvestigationEvents();
    this.setupReportDesigner();
    this.setupClosingCinematicEvents();
    this.setupRechargeSystem();
    this.setupShelterPrompts();
    this.setupAirlockTransition();
    this.setupPostArchivePrompt();
    this.initSoundtracks();
  }

  private setupUIBindings(): void {
    this.fpsDisplay = document.getElementById('fps-display');
    this.statusDisplay = document.getElementById('engine-status');
    this.sceneDisplay = document.getElementById('scene-display');

    this.hud.setOnMapClick(() => {
      this.mapUI.toggle();
    });

    this.hud.setOnToggleSensorMute(() => {
      const moonEnv = this.sceneManager.getMoonEnvironment();
      const marsEnv = this.sceneManager.getMarsEnvironment();
      const env = moonEnv || marsEnv;
      if (env) {
        const isMuted = env.lunaDetection.toggleMute();
        this.hud.setSensorMuted(isMuted);
      }
    });
  }

  private setupWindowEvents(): void {
    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    // Global Key Listener for Interaction [E]
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'KeyE') {
        this.handleInteractKey();
      }
      // R key: Recharge at habitat
      if (e.code === 'KeyR') {
        this.handleRechargeKey();
      }
      // T key: Transmit report to Earth
      if (e.code === 'KeyT') {
        this.handleReportKey();
      }
      // U key: Toggle Luna sensor audio
      if (e.code === 'KeyU') {
        const moonEnv = this.sceneManager.getMoonEnvironment();
        const marsEnv = this.sceneManager.getMarsEnvironment();
        const env = moonEnv || marsEnv;
        if (env) {
          const isMuted = env.lunaDetection.toggleMute();
          this.hud.setSensorMuted(isMuted);
        }
      }
      // I key: Archive (future)
      if (e.code === 'KeyI') {
        // placeholder for archive UI
      }
    });
  }

  private setupCinematicSequence(): void {
    this.introUI.setOnEnterCabin(() => {
      this.sceneManager.skipSpaceCinematic();
      this.transitionToCabin(true);
    });

    this.introUI.setOnConfirmMission(() => {
      this.transitionToMoonLanding();
    });

    // Ensure intro music is smoothly silenced before any dialogue begins
    this.dialogueUI.setOnBeforeDialogueStart(() => {
      this.stopNebulaIntro(false);
    });
  }

  private setupInvestigationEvents(): void {
    this.investigationUI.setOnCollectionComplete((artifact: ArtifactDefinition) => {
      this.handleArtifactCollected(artifact);
    });
  }

  private setupReportDesigner(): void {
    this.reportDesignerUI.setOnReportTransmitted((artifact: ArtifactDefinition) => {
      this.handleReportTransmitted(artifact);
    });
  }

  private setupClosingCinematicEvents(): void {
    this.cinematicClosingUI.setOnStopAudio(() => {
      this.stopEndingSoundtrack();
    });

    this.cinematicClosingUI.setOnRestart(() => {
      this.stopEndingSoundtrack();
      this.stopNebulaIntro(false);
      window.location.reload();
    });

    this.cinematicClosingUI.setOnFreeRoam(() => {
      if (this.statusDisplay) {
        this.statusDisplay.textContent = 'EXPEDITION COMPLETE // TRANS-EARTH ORBITAL CRUISE';
        this.statusDisplay.style.color = '#46d9e8';
      }
    });
  }

  private setupRechargeSystem(): void {
    this.rechargeUI.setOnLaunchMars(() => {
      this.transitionToMarsLanding();
    });

    this.rechargeUI.setOnLaunchDeepSpace(() => {
      this.transitionToDeepSpace();
    });

    this.rechargeUI.setOnRechargeFinished((isDeadlineExceeded: boolean) => {
      // Immediately hide lingering recharge and report prompts on returning to surface
      this.shelterPrompt?.classList.add('hidden');
      this.reportPrompt?.classList.add('hidden');
      this.postArchivePrompt?.classList.add('hidden');
      this.suppressShelterPrompts = true;
      this.isNearShelter = false;

      const isMars = this.gameState.currentLevel === GameLevel.MARS;
      const transitionMsg = isMars
        ? 'PRESSURIZING SUIT... EXITING AIRLOCK TO CHRYSE PLANITIA'
        : 'PRESSURIZING SUIT... EXITING AIRLOCK TO MOON SURFACE';

      this.showAirlockTransition(
        transitionMsg,
        () => {
          // Explicitly hide lingering recharge and report prompts on returning to surface
          this.shelterPrompt?.classList.add('hidden');
          this.reportPrompt?.classList.add('hidden');
          this.postArchivePrompt?.classList.add('hidden');
          this.suppressShelterPrompts = true;
          this.isNearShelter = false;

          if (isMars) {
            this.sceneManager.returnToMarsFromCabin();
            const marsLuna = this.sceneManager.getLunaCharacter();
            this.dialogueUI.setLuna(marsLuna);

            if (this.statusDisplay) {
              this.statusDisplay.textContent = 'EXPLORATION ACTIVE // LEVEL 2: THE RED PLANET';
              this.statusDisplay.style.color = '#22c55e';
            }
            if (this.sceneDisplay) {
              this.sceneDisplay.textContent = 'MarsEnvironment';
            }
            this.hud.setLevelInfo(
              'SECTOR // MARS &bull; CHRYSE PLANITIA &amp; ARES VALLIS',
              'LEVEL 2: THE RED PLANET'
            );
          } else {
            this.sceneManager.returnToMoonFromCabin();
            const moonLuna = this.sceneManager.getLunaCharacter();
            this.dialogueUI.setLuna(moonLuna);

            if (this.statusDisplay) {
              this.statusDisplay.textContent = 'EXPLORATION ACTIVE // LEVEL 1: THE SILENT MOON';
              this.statusDisplay.style.color = '#22c55e';
            }
            if (this.sceneDisplay) {
              this.sceneDisplay.textContent = 'MoonEnvironment';
            }
          }

          SaveManager.saveGame();

          if (isDeadlineExceeded) {
            this.showRecuperationMessage();
          }

          // Resume and refresh HUD
          this.hud.show();
          this.hud.update();
        },
        () => {
          this.shelterPrompt?.classList.add('hidden');
          this.reportPrompt?.classList.add('hidden');
          this.postArchivePrompt?.classList.add('hidden');
          this.suppressShelterPrompts = true;
          this.isNearShelter = false;
        }
      );
    });
  }

  private setupShelterPrompts(): void {
    // Create R-key shelter prompt
    this.shelterPrompt = document.createElement('div');
    this.shelterPrompt.id = 'shelter-prompt';
    this.shelterPrompt.className = 'shelter-key-prompt hidden glass-card';
    this.shelterPrompt.innerHTML = `<kbd>R</kbd> ENTER HABITAT CABIN &amp; RECHARGE`;
    document.getElementById('ui-container')?.appendChild(this.shelterPrompt);

    // Create T-key report prompt
    this.reportPrompt = document.createElement('div');
    this.reportPrompt.id = 'report-prompt';
    this.reportPrompt.className = 'report-key-prompt hidden glass-card';
    this.reportPrompt.innerHTML = `<kbd>T</kbd> TRANSMIT RECOVERY REPORT TO EARTH`;
    document.getElementById('ui-container')?.appendChild(this.reportPrompt);
  }

  private setupAirlockTransition(): void {
    this.airlockTransitionEl = document.createElement('div');
    this.airlockTransitionEl.id = 'airlock-transition-overlay';
    this.airlockTransitionEl.className = 'airlock-transition-overlay hidden';
    this.airlockTransitionEl.innerHTML = `
      <div class="airlock-spinner-box">
        <div class="airlock-spinner"></div>
        <div id="airlock-transition-text" class="airlock-transition-text">EQUALIZING PRESSURE...</div>
      </div>
    `;
    document.getElementById('ui-container')?.appendChild(this.airlockTransitionEl);
  }

  private setupPostArchivePrompt(): void {
    this.postArchivePrompt = document.createElement('div');
    this.postArchivePrompt.id = 'post-archive-banner';
    this.postArchivePrompt.className = 'post-archive-banner hidden glass-card';
    this.postArchivePrompt.innerHTML = `
      <div class="post-archive-header">
        <span class="pulse-dot-cyan"></span>
        <span id="post-archive-title">TELEMETRY ARCHIVED</span>
      </div>
      <p id="post-archive-text-body" class="post-archive-text">Suit energy cells depleted from traversal. Return to habitat cabin to recharge &amp; debrief?</p>
      <div class="post-archive-actions">
        <button id="btn-post-recharge" class="btn-primary glow-ready">
          <kbd>R</kbd> <span id="btn-post-recharge-text">ENTER CABIN &amp; RECHARGE</span>
        </button>
        <button id="btn-post-continue" class="btn-secondary">
          <span id="btn-post-continue-text">CONTINUE SURFACE SURVEY</span>
        </button>
      </div>
    `;
    document.getElementById('ui-container')?.appendChild(this.postArchivePrompt);

    const btnRecharge = this.postArchivePrompt.querySelector('#btn-post-recharge');
    const btnContinue = this.postArchivePrompt.querySelector('#btn-post-continue');

    btnRecharge?.addEventListener('click', () => {
      this.hud.hideReturnToShuttleCard();
      this.postArchivePrompt?.classList.add('hidden');
      this.startRechargeSequence();
    });

    btnContinue?.addEventListener('click', () => {
      this.postArchivePrompt?.classList.add('hidden');
      if (this.gameState.artifactsCollected >= this.gameState.recoveryTarget) {
        const isMars = this.gameState.currentLevel === GameLevel.MARS;
        this.hud.showReturnToShuttleCard(
          isMars ? 'DEEP SPACE LAUNCH READY' : 'MARS TAKEOFF READY',
          'All 3 targets archived. Press [R] or click to board shuttle.',
          () => this.startRechargeSequence()
        );
      }
    });
  }

  private playAirlockAudio(isEntering: boolean): void {
    try {
      if (!this.airlockAudioCtx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) this.airlockAudioCtx = new AudioCtxClass();
      }
      if (this.airlockAudioCtx && this.airlockAudioCtx.state === 'suspended') {
        this.airlockAudioCtx.resume();
      }
      if (!this.airlockAudioCtx) return;

      const now = this.airlockAudioCtx.currentTime;

      // 1. Air pressure hiss (filtered noise)
      const bufferSize = Math.floor(this.airlockAudioCtx.sampleRate * 0.6);
      const noiseBuffer = this.airlockAudioCtx.createBuffer(1, bufferSize, this.airlockAudioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.airlockAudioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.airlockAudioCtx.createBiquadFilter();
      filter.type = isEntering ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(isEntering ? 400 : 800, now);
      filter.frequency.exponentialRampToValueAtTime(isEntering ? 1200 : 300, now + 0.5);

      const noiseGain = this.airlockAudioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.04, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.airlockAudioCtx.destination);
      whiteNoise.start(now);

      // 2. Heavy mechanical seal latch click
      const osc = this.airlockAudioCtx.createOscillator();
      const oscGain = this.airlockAudioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isEntering ? 140 : 220, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.5);
      oscGain.gain.setValueAtTime(0.08, now + 0.35);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(oscGain);
      oscGain.connect(this.airlockAudioCtx.destination);
      osc.start(now + 0.35);
      osc.stop(now + 0.58);
    } catch {
      // Audio failed silently
    }
  }

  private showAirlockTransition(
    message: string,
    onMidpoint: () => void,
    onComplete?: () => void
  ): void {
    if (!this.airlockTransitionEl) {
      onMidpoint();
      onComplete?.();
      return;
    }

    const textEl = this.airlockTransitionEl.querySelector('#airlock-transition-text');
    if (textEl) textEl.textContent = message;

    const isEntering = message.includes('ENTERING');
    this.playAirlockAudio(isEntering);

    this.airlockTransitionEl.classList.remove('hidden');
    this.airlockTransitionEl.style.opacity = '1';

    setTimeout(() => {
      onMidpoint();

      setTimeout(() => {
        if (this.airlockTransitionEl) {
          this.airlockTransitionEl.style.opacity = '0';
          setTimeout(() => {
            this.airlockTransitionEl?.classList.add('hidden');
            onComplete?.();
          }, 450);
        } else {
          onComplete?.();
        }
      }, 350);
    }, 550);
  }

  public startRechargeSequence(): void {
    if (this.investigationUI.isOpen() || this.mapUI.isOpen() || this.rechargeUI.isOpen()) return;

    this.hud.hide();
    this.hud.hideReturnToShuttleCard();
    this.postArchivePrompt?.classList.add('hidden');
    this.shelterPrompt?.classList.add('hidden');
    this.reportPrompt?.classList.add('hidden');
    this.suppressShelterPrompts = true;
    this.isNearShelter = false;

    const isMars = this.gameState.currentLevel === GameLevel.MARS;
    const enterMsg = isMars
      ? 'EQUALIZING AIRLOCK PRESSURE... ENTERING CHRYSE HABITAT CABIN'
      : 'EQUALIZING AIRLOCK PRESSURE... ENTERING TRANQUILITY CABIN';

    this.showAirlockTransition(enterMsg, () => {
      const onReady = () => {
        const cabinLuna = this.sceneManager.getLunaCharacter();
        this.dialogueUI.setLuna(cabinLuna);

        if (this.statusDisplay) {
          this.statusDisplay.textContent = isMars
            ? 'HABITAT CABIN // CHRYSE PLANITIA REST & DEBRIEFING'
            : 'HABITAT CABIN // REST & DEBRIEFING';
          this.statusDisplay.style.color = '#46d9e8';
        }
        if (this.sceneDisplay) {
          this.sceneDisplay.textContent = 'CabinEnvironment';
        }

        this.rechargeUI.openRecharge(this.dialogueUI);
      };

      if (isMars) {
        this.sceneManager.pauseMarsAndSwitchToCabin(onReady);
      } else {
        this.sceneManager.pauseMoonAndSwitchToCabin(onReady);
      }
    });
  }

  private getCurrentSurfaceEnv(): MoonEnvironment | MarsEnvironment | null {
    if (this.gameState.currentLevel === GameLevel.MARS) {
      return this.sceneManager.getMarsEnvironment();
    }
    return this.sceneManager.getMoonEnvironment();
  }

  private handleInteractKey(): void {
    if (this.gameState.currentLevel === GameLevel.DEEP_SPACE) {
      if (this.investigationUI.isOpen() || this.reportDesignerUI.isOpen()) return;
      this.mapUI.toggle();
      return;
    }

    const env = this.getCurrentSurfaceEnv();
    if (!env || env.isLandingCinematic || this.investigationUI.isOpen() || this.mapUI.isOpen()) {
      return;
    }

    const detectionState = env.currentDetectionState;
    if (detectionState.canInteract && detectionState.detectedArtifact) {
      const artifact = detectionState.detectedArtifact;
      // Start scanning sequence!
      this.investigationUI.startScanSequence(artifact);
    }
  }

  private handleRechargeKey(): void {
    if (this.gameState.currentLevel === GameLevel.DEEP_SPACE) {
      this.hud.showLunaAlert('"We are inside our ship\'s Deep Space Laboratory! Press [M] to open Astrogation Map or [T] to design/transmit reports."');
      return;
    }

    const env = this.getCurrentSurfaceEnv();
    if (!env || env.isLandingCinematic) return;
    if (this.investigationUI.isOpen() || this.mapUI.isOpen() || this.rechargeUI.isOpen()) return;

    // Check if return-to-shuttle card is active, or post-archive prompt is active, or player is near shelter
    if (this.hud.isReturnToShuttleCardVisible()) {
      this.hud.hideReturnToShuttleCard();
      this.startRechargeSequence();
      return;
    }

    if (this.postArchivePrompt && !this.postArchivePrompt.classList.contains('hidden')) {
      this.startRechargeSequence();
      return;
    }

    if (!this.isNearShelter) return;

    this.startRechargeSequence();
  }

  private handleReportKey(): void {
    if (this.gameState.currentLevel === GameLevel.DEEP_SPACE) {
      if (this.investigationUI.isOpen() || this.mapUI.isOpen() || this.reportDesignerUI.isOpen()) return;

      const deepSpaceArtifacts = Object.values(ARTIFACTS_DATA).filter(
        (a) => a.level === 3 && a.isCollected
      );

      if (deepSpaceArtifacts.length === 0) {
        this.hud.showLunaAlert('"Explorer, we haven\'t analyzed any space probes yet! Check the Astrogation Map [M] first!"');
        return;
      }

      const targetProbe = deepSpaceArtifacts[deepSpaceArtifacts.length - 1];
      this.reportDesignerUI.openReportDesigner(targetProbe);
      return;
    }

    const env = this.getCurrentSurfaceEnv();
    if (!env || env.isLandingCinematic) return;
    if (this.investigationUI.isOpen() || this.rechargeUI.isOpen()) return;
    if (!this.reportManager.canReport()) {
      this.hud.showLunaAlert('"Explorer, we haven\'t recovered any artifacts yet! Let\'s find them first!"');
      return;
    }

    this.reportManager.transmitReportToEarth(this.dialogueUI, () => {
      SaveManager.saveGame();
    });
  }

  private checkEnergyAlert(): void {
    const now = Date.now();
    // Alert at most once every 40 seconds
    if (now - this.lastEnergyAlertTime < 40000) return;
    this.lastEnergyAlertTime = now;

    const isMars = this.gameState.currentLevel === GameLevel.MARS;
    const alerts = isMars
      ? [
          '"Explorer, suit capacitors are down below 20%! Bounding in 38% gravity drains joules fast—head back to the Chryse shelter to recharge!"',
          '"Warning: Oxygen compressor power is running thin. Our habitat airlock is waiting whenever you need a recharge [R]."',
          '"Suit mobility servos are working on fumes, partner! Head to the shelter [R] to replenish vital cells before emergency reserves kick in."',
        ]
      : [
          '"Explorer, suit capacitors dipped below 20%! Leaping over crater rims burns energy fast—let\'s route back to the cabin before emergency mode triggers."',
          '"Warning: Regolith filter power is running low. The habitat airlock is open whenever you\'re ready to top off [R]."',
          '"Suit batteries are groaning, partner! Even Armstrong needed to rest his boots. Head to the shelter [R] to replenish vital cells."',
        ];

    const alertMsg = alerts[this.energyAlertIndex % alerts.length];
    this.energyAlertIndex += 1;
    this.hud.showLunaAlert(alertMsg);
  }

  private showRecuperationMessage(): void {
    const lines: DialogueLine[] = [
      {
        id: 'recup_1',
        speaker: 'EARTH CONTROL',
        text: 'Explorer, your 15-day mission window has elapsed. Emergency recall procedures have been initiated. We are bringing you home.',
      },
      {
        id: 'recup_2',
        speaker: 'LUNA',
        text: 'Don\'t worry! We\'ve preserved all our exploration data. I\'ve compiled research reports for every artifact. We can review them at the Earth Research Facility!',
        lunaExpression: 'curious',
      },
      {
        id: 'recup_3',
        speaker: 'PLAYER',
        text: 'I won\'t let this mission end without completing the archive.',
      },
      {
        id: 'recup_4',
        speaker: 'LUNA',
        text: 'That\'s the spirit! Our heritage archive will be complete. Initiating return trajectory now.',
        lunaExpression: 'happy',
      },
    ];

    this.dialogueUI.startDialogue(lines);
  }

  private handleArtifactCollected(artifact: ArtifactDefinition): void {
    const isDeepSpace = this.gameState.currentLevel === GameLevel.DEEP_SPACE || artifact.level === 3;
    const isMars = this.gameState.currentLevel === GameLevel.MARS;

    // 1. Mark in manager & game state
    const env = this.getCurrentSurfaceEnv();
    if (env) {
      env.artifactManager.markCollected(artifact.id);
    } else {
      artifact.isCollected = true;
    }

    if (ARTIFACTS_DATA[artifact.id]) {
      ARTIFACTS_DATA[artifact.id].isCollected = true;
    }
    RechargeManager.getInstance().setLastCollectedArtifact(artifact.id);

    this.gameState.artifactsCollected += 1;
    this.gameState.investigationPoints += artifact.rewards.basePoints;
    SaveManager.saveGame();

    // 2. Update HUD & Map
    this.hud.update();
    if (isDeepSpace) {
      const deepSpaceArtifacts = Object.values(ARTIFACTS_DATA).filter((a) => a.level === 3);
      this.mapUI.setArtifacts(deepSpaceArtifacts);
    } else if (env) {
      this.mapUI.setArtifacts(
        env.artifactManager.artifacts,
        (id) => env.artifactManager.getArtifactPosition(id)
      );
    }

    if (this.statusDisplay) {
      this.statusDisplay.textContent = `ARTIFACT RECOVERED: ${artifact.commonName.toUpperCase()} (+${artifact.rewards.basePoints} PTS)`;
      this.statusDisplay.style.color = '#f5b942';
    }

    // 3. Distinct celebratory discovery & recharge suggestion dialogues for EACH artifact!
    let celebrationDialogue: DialogueLine[] = [];

    if (isDeepSpace) {
      celebrationDialogue = [
        {
          id: 'collect_deep_1',
          speaker: 'LUNA',
          text: `High-gain telemetry synchronized! The scientific recordings and history of ${artifact.commonName} are safely archived!`,
          lunaExpression: 'happy',
        },
        {
          id: 'collect_deep_2',
          speaker: 'PLAYER',
          text: `An incredible technological relic. To think this probe braved the asteroid belt and planetary radiation for decades.`,
        },
        {
          id: 'collect_deep_3',
          speaker: 'LUNA',
          text: `Human ingenuity at its absolute peak! Press [T] to transmit our scientific findings to Earth Control, then open the Astrogation Map [M] to plot our next intercept trajectory!`,
          lunaExpression: 'witty',
        },
      ];
    } else if (isMars) {
      if (artifact.id === 'viking-1-lander') {
        celebrationDialogue = [
          {
            id: 'collect_viking_1',
            speaker: 'LUNA',
            text: `Viking 1's historic 1976 landing site is secured! Humanity's very first operational Mars surface laboratory is permanently saved in our archives!`,
            lunaExpression: 'happy',
          },
          {
            id: 'collect_viking_2',
            speaker: 'PLAYER',
            text: `Standing beside those titanium struts was breathtaking. But ambient Martian temperature is plunging to minus seventy Celsius as dusk creeps in.`,
          },
          {
            id: 'collect_viking_3',
            speaker: 'LUNA',
            text: `Brrr! Even my optoelectronic sensors are shivering! Let's step into the Chryse habitat cabin to defrost our suit heaters, recharge our power cells, and debrief on humanity's search for Martian life, or brave the red plains a bit longer!`,
            lunaExpression: 'curious',
          },
        ];
      } else if (artifact.id === 'sojourner') {
        celebrationDialogue = [
          {
            id: 'collect_sojourner_1',
            speaker: 'LUNA',
            text: `Sojourner is safe in the archives! The plucky little 23-pound skateboard that conquered Ares Vallis has its legacy sealed!`,
            lunaExpression: 'happy',
          },
          {
            id: 'collect_sojourner_2',
            speaker: 'PLAYER',
            text: `Seeing Barnacle Bill and Yogi rocks in person was unforgettable. But this fine iron oxide dust is getting into my suit knee hinges.`,
          },
          {
            id: 'collect_sojourner_3',
            speaker: 'LUNA',
            text: `An air-shower decontamination and a full battery recharge in the Chryse shelter sound like heaven right now. We can debrief about the little rover's eighty-three sols of glory, or keep roving the red dunes! What's the play?`,
            lunaExpression: 'witty',
          },
        ];
      } else {
        // Spirit Rover (3rd Mars Artifact - Level 2 complete!)
        celebrationDialogue = [
          {
            id: 'collect_spirit_1',
            speaker: 'LUNA',
            text: `WOOHOO! That's THREE FOR THREE ON THE RED PLANET! Spirit, Sojourner, and Viking 1 are permanently archived into humanity's history!`,
            lunaExpression: 'happy',
          },
          {
            id: 'collect_spirit_2',
            speaker: 'PLAYER',
            text: `From Chryse Planitia to Gusev Crater, Mars is complete. What a journey.`,
          },
          {
            id: 'collect_spirit_3',
            speaker: 'LUNA',
            text: `Earth Command just cleared our departure burn for LEVEL 3: DEEP SPACE! The spacecraft's research laboratory and ion drives are pre-heated on the pad. What's the call—return to the shuttle for takeoff to Deep Space, or stay and survey Gusev Crater?`,
            lunaExpression: 'happy',
          },
        ];
      }
    } else {
      // Moon Artifacts
      if (artifact.id === 'a11-lm5-descent') {
        celebrationDialogue = [
          {
            id: 'collect_eagle_1',
            speaker: 'LUNA',
            text: `Tranquility Base is recorded! Neil Armstrong and Buzz Aldrin's historic landing site is officially immortalized!`,
            lunaExpression: 'happy',
          },
          {
            id: 'collect_eagle_2',
            speaker: 'PLAYER',
            text: `Standing beside the Eagle's gold foil legs was completely surreal. But check our suit vitals—my oxygen scrubbers are buzzing and bounding over crater rims drains batteries fast.`,
          },
          {
            id: 'collect_eagle_3',
            speaker: 'LUNA',
            text: `Your suit capacitors are down by 40%, Explorer! We can head back inside the habitat cabin to recharge our batteries and debrief about the Eagle's close-call landing, or keep surveying the Mare plains. What's the call, partner?`,
            lunaExpression: 'curious',
          },
        ];
      } else if (artifact.id === 'a12-lm6-ascent') {
        celebrationDialogue = [
          {
            id: 'collect_alsep_1',
            speaker: 'LUNA',
            text: `Intrepid's impact site and the ALSEP geophone array are locked into the database! Did you feel that faint ground hum?`,
            lunaExpression: 'happy',
          },
          {
            id: 'collect_alsep_2',
            speaker: 'PLAYER',
            text: `The Moon ringing like a bell for over an hour after impact. But my boot actuators are feeling the strain of the regolith trek.`,
          },
          {
            id: 'collect_alsep_3',
            speaker: 'LUNA',
            text: `Lunar basalt will give anyone's servos a workout! We can cycle the airlock to rest, top off our life support, and talk about Pete Conrad's lightning-struck ride, or keep exploring! What's the plan?`,
            lunaExpression: 'witty',
          },
        ];
      } else {
        // Apollo 15 Falcon / LRV (3rd Moon Artifact - Level 1 complete!)
        celebrationDialogue = [
          {
            id: 'collect_falcon_1',
            speaker: 'LUNA',
            text: `WOOHOO! That's THREE for three on the Moon, Explorer! Every single lunar monument is officially preserved in the archive!`,
            lunaExpression: 'happy',
          },
          {
            id: 'collect_falcon_2',
            speaker: 'PLAYER',
            text: `Tranquility Base, Intrepid's seismometer, and Falcon's lunar rover. The entire Apollo heritage sector is secure.`,
          },
          {
            id: 'collect_falcon_3',
            speaker: 'LUNA',
            text: `Earth Command just transmitted interplanetary departure clearance! The shuttle's launch engines are primed for our Hohmann transfer burn to MARS! What's the call, partner—return to the shuttle for takeoff, or take a few extra minutes to survey the Hadley plains?`,
            lunaExpression: 'happy',
          },
        ];
      }
    }

    setTimeout(() => {
      this.dialogueUI.startDialogue(celebrationDialogue, () => {
        if (isDeepSpace) {
          if (this.reportPrompt) {
            this.reportPrompt.innerHTML = `<kbd>T</kbd> DESIGN REPORT FOR EARTH COMMAND`;
            this.reportPrompt.classList.remove('hidden');
          }
          // Launch the interactive report designer terminal
          setTimeout(() => {
            this.reportDesignerUI.openReportDesigner(artifact);
          }, 400);
        } else {
          // Show post-archive banner for surface missions
          const isLevelComplete = this.gameState.artifactsCollected >= this.gameState.recoveryTarget;

          if (this.postArchivePrompt) {
            const titleEl = this.postArchivePrompt.querySelector('#post-archive-title');
            const textEl = this.postArchivePrompt.querySelector('#post-archive-text-body');
            const btnRechargeText = this.postArchivePrompt.querySelector('#btn-post-recharge-text');
            const btnContinueText = this.postArchivePrompt.querySelector('#btn-post-continue-text');

            if (isLevelComplete) {
              if (titleEl) {
                titleEl.textContent = isMars
                  ? 'LEVEL 2 COMPLETE // 3 MARTIAN PROBES SECURED'
                  : 'LEVEL 1 COMPLETE // 3 LUNAR PROBES SECURED';
              }
              if (textEl) {
                textEl.textContent = isMars
                  ? 'All 3 Martian artifacts archived! The spacecraft is primed for departure burn to Level 3 Deep Space.'
                  : 'All 3 Lunar artifacts archived! The shuttle is primed on the pad for Hohmann transfer takeoff to Mars.';
              }
              if (btnRechargeText) {
                btnRechargeText.textContent = isMars ? 'RETURN TO SHUTTLE FOR DEEP SPACE TAKEOFF ▶' : 'RETURN TO SHUTTLE FOR MARS TAKEOFF ▶';
              }
              if (btnContinueText) {
                btnContinueText.textContent = 'STAY & SURVEY SURFACE';
              }

              // Update the shelter proximity prompt as well
              if (this.shelterPrompt) {
                this.shelterPrompt.innerHTML = isMars
                  ? `<kbd>R</kbd> BOARD SHUTTLE FOR DEEP SPACE TAKEOFF ▶`
                  : `<kbd>R</kbd> BOARD SHUTTLE FOR MARS TAKEOFF ▶`;
              }
            } else {
              if (titleEl) titleEl.textContent = `ARTIFACT ARCHIVED: ${artifact.commonName.toUpperCase()}`;
              if (textEl) textEl.textContent = 'Suit energy cells depleted from traversal. Return to habitat cabin to recharge & debrief?';
              if (btnRechargeText) btnRechargeText.textContent = 'ENTER CABIN & RECHARGE';
              if (btnContinueText) btnContinueText.textContent = 'CONTINUE SURFACE SURVEY';
            }

            this.postArchivePrompt.classList.remove('hidden');
          }
        }
      });
    }, 400);
  }

  private transitionToCabin(skipOpening: boolean = false): void {
    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'TRANSITION: CABIN // FIRST-PERSON AWAKENING';
    }

    this.sceneManager.switchToCabin(() => {
      // Smoothly fade out opening music before Luna begins speaking
      this.stopNebulaIntro(true);

      const luna = this.sceneManager.getLunaCharacter();
      this.dialogueUI.setLuna(luna);

      setTimeout(() => {
        this.dialogueUI.startDialogue(OPENING_DIALOGUE, () => {
          this.introUI.showBriefing();
        });
      }, 500);
    }, skipOpening);

    if (!skipOpening) {
      this.introUI.triggerAwakening(2600);
    }
  }

  private transitionToMoonLanding(): void {
    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'TRANSITION: LUNAR APPROACH & TOUCHDOWN';
      this.statusDisplay.style.color = '#f5b942';
    }

    this.gameState.currentLevel = GameLevel.MOON;
    this.gameState.recoveryTarget = 3;

    this.sceneManager.switchToMoon(
      true,
      () => {
        if (this.statusDisplay) {
          this.statusDisplay.textContent = 'EXPLORATION ACTIVE // LEVEL 1: THE SILENT MOON';
          this.statusDisplay.style.color = '#22c55e';
        }
        this.hud.setLevelInfo(
          'SECTOR // MOON &bull; MARE TRANQUILLITATIS',
          'LEVEL 1: THE SILENT MOON'
        );
        this.hud.show();

        const moonEnv = this.sceneManager.getMoonEnvironment();
        if (moonEnv) {
          this.mapUI.setArtifacts(
            moonEnv.artifactManager.artifacts,
            (id) => moonEnv.artifactManager.getArtifactPosition(id)
          );
        }
      },
      (lunaAlertMsg: string) => {
        this.hud.showLunaAlert(lunaAlertMsg);
      }
    );
  }

  private transitionToMarsLanding(): void {
    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'INTERPLANETARY TRANSIT // TRANQUILITY BASE TO MARS';
      this.statusDisplay.style.color = '#f5b942';
    }

    this.showAirlockTransition('INITIATING HOHMANN TRANSFER BURN TO MARS... DISTANCE: 140,000,000 MILES', () => {
      // Set GameState for Level 2
      this.gameState.currentLevel = GameLevel.MARS;
      this.gameState.artifactsCollected = 0;
      this.gameState.recoveryTarget = 3;

      this.sceneManager.switchToMars(
        true,
        () => {
          if (this.statusDisplay) {
            this.statusDisplay.textContent = 'EXPLORATION ACTIVE // LEVEL 2: THE RED PLANET';
            this.statusDisplay.style.color = '#22c55e';
          }
          this.hud.setLevelInfo(
            'SECTOR // MARS &bull; CHRYSE PLANITIA &amp; ARES VALLIS',
            'LEVEL 2: THE RED PLANET'
          );
          this.hud.show();

          const marsEnv = this.sceneManager.getMarsEnvironment();
          if (marsEnv) {
            this.mapUI.setArtifacts(
              marsEnv.artifactManager.artifacts,
              (id) => marsEnv.artifactManager.getArtifactPosition(id)
            );
          }
        },
        (lunaAlertMsg: string) => {
          this.hud.showLunaAlert(lunaAlertMsg);
        }
      );
    });
  }

  private transitionToDeepSpace(): void {
    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'INTERPLANETARY CRUISE // TRANSIT TO DEEP SPACE OBSERVATORY';
      this.statusDisplay.style.color = '#f5b942';
    }

    this.showAirlockTransition('ENGAGING INTERPLANETARY CRUISE... TRANSIT TO DEEP SPACE OBSERVATORY', () => {
      this.gameState.currentLevel = GameLevel.DEEP_SPACE;
      this.gameState.artifactsCollected = 0;
      this.gameState.recoveryTarget = 3;

      this.sceneManager.switchToResearchCabin(() => {
        const cabinLuna = this.sceneManager.getLunaCharacter();
        this.dialogueUI.setLuna(cabinLuna);

        if (this.statusDisplay) {
          this.statusDisplay.textContent = 'RESEARCH OBSERVATORY // LEVEL 3: DEEP SPACE PROBES';
          this.statusDisplay.style.color = '#46d9e8';
        }
        if (this.sceneDisplay) {
          this.sceneDisplay.textContent = 'ResearchCabinEnvironment';
        }

        this.hud.setLevelInfo(
          'SECTOR // DEEP SPACE &bull; ASTEROID BELT &amp; BEYOND',
          'LEVEL 3: DEEP SPACE OBSERVATORY'
        );
        this.hud.show();
        this.hud.update();

        // Populate Map with Level 3 Deep Space artifacts
        const deepSpaceArtifacts = Object.values(ARTIFACTS_DATA).filter((a) => a.level === 3);
        this.mapUI.setArtifacts(deepSpaceArtifacts);
        this.mapUI.setMapTitle(
          'DEEP SPACE NETWORK // ASTROGATION RELAY',
          'SOLAR SYSTEM ASTROGATION: ASTEROID BELT &amp; OUTER PLANETS'
        );

        this.mapUI.setOnDeepSpaceProbeSelected((probe) => {
          this.handleDeepSpaceProbeIntercept(probe);
        });

        // Welcome dialogue from Luna in the Research Lab
        const welcomeLabDialogue: DialogueLine[] = [
          {
            id: 'welcome_lab_1',
            speaker: 'LUNA',
            text: "Welcome aboard our Deep Space Research Laboratory, Explorer! Look out that panoramic cupola—we are cruising through the cosmic void!",
            lunaExpression: 'happy',
          },
          {
            id: 'welcome_lab_2',
            speaker: 'PLAYER',
            text: "Zero surface dust, no spacesuits. Just pure observational astronomy and signal telemetry.",
          },
          {
            id: 'welcome_lab_3',
            speaker: 'LUNA',
            text: "Exactly! Open our Astrogation Map [M] or check the central holographic table. When you lock onto a space probe trajectory, our ion thrusters will take a full mission day of space traversal to rendezvous. Let's find humanity's lost probes!",
            lunaExpression: 'witty',
          },
        ];

        setTimeout(() => {
          this.dialogueUI.startDialogue(welcomeLabDialogue, () => {
            this.hud.showLunaAlert(
              '"Carrier signal detected! Luna is picking up NEAR Shoemaker\'s beacon near Asteroid 433 Eros! Press [M] to open Astrogation Map!"'
            );
          });
        }, 600);
      });
    });
  }

  private handleDeepSpaceProbeIntercept(probe: ArtifactDefinition): void {
    // Traveling in space takes 1 whole day
    this.gameState.missionDay += 1;
    this.hud.update();

    const transitText = `ENGAGING ION PROPULSION TO ${probe.commonName.toUpperCase()}... [MISSION DAY ${this.gameState.missionDay}]`;

    this.showAirlockTransition(transitText, () => {
      const probeBriefings: Record<string, DialogueLine[]> = {
        'near-shoemaker': [
          {
            id: 'near_brief_1',
            speaker: 'LUNA',
            text: `Astrogation lock confirmed! Look at our visual sensors—that's asteroid 433 Eros! And resting on its regolith in the southern Himeros saddle is NEAR Shoemaker!`,
            lunaExpression: 'happy',
          },
          {
            id: 'near_brief_2',
            speaker: 'PLAYER',
            text: `Incredible engineering. It was designed only as an orbiter, but the flight team managed to touch it down gently at 1.9 meters per second without landing legs.`,
          },
          {
            id: 'near_brief_3',
            speaker: 'LUNA',
            text: `Humanity's very first asteroid landing! Let's initialize our sensor sweep, inspect its hardware, and recover its complete scientific telemetry!`,
            lunaExpression: 'witty',
          },
        ],
        'dawn-spacecraft': [
          {
            id: 'dawn_brief_1',
            speaker: 'LUNA',
            text: `Signal acquisition confirmed! Ahead in silent perpetual orbit around dwarf planet Ceres is the legendary Dawn Spacecraft!`,
            lunaExpression: 'happy',
          },
          {
            id: 'dawn_brief_2',
            speaker: 'PLAYER',
            text: `The master of xenon ion propulsion. It made history as the first spacecraft to orbit two different extraterrestrial bodies: Vesta and Ceres.`,
          },
          {
            id: 'dawn_brief_3',
            speaker: 'LUNA',
            text: `No other craft in human history has pulled off that orbital feat! Let's analyze its triple ion thrusters and the glowing sodium carbonate faculae in Occator Crater!`,
            lunaExpression: 'curious',
          },
        ],
        'pioneer-10': [
          {
            id: 'pioneer_brief_1',
            speaker: 'LUNA',
            text: `I'm locking onto a faint 8.4 GHz radio pulse across the dark cosmic void... Explorer, we've intercepted Pioneer 10 sailing into interstellar space!`,
            lunaExpression: 'happy',
          },
          {
            id: 'pioneer_brief_2',
            speaker: 'PLAYER',
            text: `Launched in 1972... first through the asteroid belt, first past Jupiter, and carrying Carl Sagan's Golden Plaque toward the constellation Taurus.`,
          },
          {
            id: 'pioneer_brief_3',
            speaker: 'LUNA',
            text: `Humanity's immortal messenger to the cosmos. Let's record its final telemetry, inspect its RTG power unit, and safeguard its message for the ages!`,
            lunaExpression: 'happy',
          },
        ],
      };

      const briefingLines = probeBriefings[probe.id] || [
        {
          id: 'probe_generic_1',
          speaker: 'LUNA',
          text: `Long-range transponder locked! Intercepting data streams from ${probe.commonName}!`,
          lunaExpression: 'happy',
        },
      ];

      this.dialogueUI.startDialogue(briefingLines, () => {
        setTimeout(() => {
          this.investigationUI.startScanSequence(probe);
        }, 300);
      });
    });
  }

  private handleReportTransmitted(artifact: ArtifactDefinition): void {
    SaveManager.saveGame();
    this.hud.update();

    if (this.statusDisplay) {
      this.statusDisplay.textContent = `REPORT TRANSMITTED: ${artifact.commonName.toUpperCase()} [VERIFIED BY EARTH CONTROL]`;
      this.statusDisplay.style.color = '#22c55e';
    }

    const reportDebriefDialogue: DialogueLine[] = [
      {
        id: 'rd_debrief_1',
        speaker: 'EARTH CONTROL',
        text: `DEEP SPACE RELAY VERIFIED: Telemetry package and historical analysis for ${artifact.commonName} successfully decrypted and permanently archived into the Solar Heritage Registry!`,
      },
      {
        id: 'rd_debrief_2',
        speaker: 'LUNA',
        text: `Earth Control received our report with 100% signal integrity! That's another giant leap for space archaeology!`,
        lunaExpression: 'happy',
      },
    ];

    this.dialogueUI.startDialogue(reportDebriefDialogue, () => {
      if (this.gameState.artifactsCollected >= this.gameState.recoveryTarget) {
        setTimeout(() => {
          this.playGrandMissionFinale();
        }, 600);
      } else {
        const nextAlert =
          this.gameState.artifactsCollected === 1
            ? '"Long-range beacon detected! Dawn Spacecraft is broadcasting ion propulsion telemetry from the Asteroid Belt! Check Map [M] to plot 1-day intercept burn!"'
            : '"Interstellar signal alert! Pioneer 10\'s 8.4 GHz transmitter detected beyond Jupiter! Open Map [M] to plot our final rendezvous!"';

        this.hud.showLunaAlert(nextAlert);
      }
    });
  }

  private playGrandMissionFinale(): void {
    const finaleLines: DialogueLine[] = [
      {
        id: 'finale_1',
        speaker: 'LUNA',
        text: "Explorer... look at our master telemetry board! All three deep space probes—NEAR Shoemaker, Dawn Spacecraft, and Pioneer 10—are verified and permanently encoded into the Solar Heritage Archive!",
        lunaExpression: 'happy',
      },
      {
        id: 'finale_2',
        speaker: 'PLAYER',
        text: "From Armstrong's footprints in Tranquility Base, to Spirit's lonely wheel tracks on Mars, to Pioneer 10 sailing into the interstellar deep with the Golden Plaque... every milestone of human exploration is preserved.",
      },
      {
        id: 'finale_3',
        speaker: 'EARTH CONTROL',
        text: "Priority carrier signal locked! Houston Flight Director to Ghost Archive crew: We copy your verified transmission. Outstanding work, team! You ventured into places forgotten by time and brought our history home.",
      },
      {
        id: 'finale_4',
        speaker: 'PLAYER',
        text: "Thank you, Houston. We couldn't have pulled it off without Luna's sensors and the flight support team backing us every kilometer of the way.",
      },
      {
        id: 'finale_5',
        speaker: 'EARTH CONTROL',
        text: "Flight Surgeon here, Explorer. Telemetry monitors show your cardiovascular and musculoskeletal systems need immediate terrestrial rehabilitation after months in microgravity and deep-space radiation. We are ordering a direct return trajectory to Earth for mandatory medical recuperation.",
      },
      {
        id: 'finale_6',
        speaker: 'PLAYER',
        text: "Mandatory recuperation sounds like heaven, Doc. Real gravity, fresh coastal air, and real food will feel like a miracle.",
      },
      {
        id: 'finale_7',
        speaker: 'EARTH CONTROL',
        text: "Enjoy that rest while you can, Explorer. Because while you were recovering Pioneer 10, Deep Space Network antennas picked up anomalous telemetry from the outer moons—Titan, Europa, and signals whispering beyond the Kuiper Belt. Orbital Command is already staging a classified follow-up expedition. A new mission awaits you. Rest up... Part 2 of humanity's ghost archives is on the horizon.",
      },
      {
        id: 'finale_8',
        speaker: 'LUNA',
        text: "Did you hear that, partner?! Titan's liquid methane seas! Europa's hidden subterranean ocean! Voyager 1 and 2 out in interstellar space! A whole second chapter of ghosts waiting for us in the outer solar system!",
        lunaExpression: 'alert',
      },
      {
        id: 'finale_9',
        speaker: 'PLAYER',
        text: "A new mission on the horizon... Ghosts of Space: Part 2. But first, let's feel Earth's rain again. Houston, locking in retro-burn trajectory. Ghost Archive, coming home.",
      },
      {
        id: 'finale_10',
        speaker: 'LUNA',
        text: "Trans-Earth injection burn plotted! Main engines spooling in 3... 2... 1... Hang on, Explorer! Earth, here we come! And to all the ghosts across the outer moons... we'll see you in Part 2!",
        lunaExpression: 'happy',
      },
    ];

    setTimeout(() => {
      this.dialogueUI.startDialogue(finaleLines, () => {
        this.showMissionAccomplishedModal();
      });
    }, 500);
  }

  private showMissionAccomplishedModal(): void {
    if (!this.missionAccomplishedModal) {
      this.missionAccomplishedModal = document.createElement('div');
      this.missionAccomplishedModal.id = 'mission-accomplished-modal';
      this.missionAccomplishedModal.className = 'mission-accomplished-modal glass-card';
      document.getElementById('ui-container')?.appendChild(this.missionAccomplishedModal);
    }

    this.missionAccomplishedModal.innerHTML = `
      <div class="finale-badge">EXPEDITION COMPLETE // HUMANITY'S ARCHIVE RESTORED</div>
      <h1 class="finale-title">MISSION ACCOMPLISHED</h1>
      <p class="finale-subtitle">All 9 Historic Space Artifacts Successfully Archived Across Moon, Mars &amp; Deep Space</p>

      <div class="finale-sectors-grid">
        <div class="finale-sector-card">
          <div class="sector-head">LEVEL 1: MOON</div>
          <div class="sector-status">100% SECURED</div>
          <div class="sector-arts">Apollo 11 Eagle &bull; Apollo 12 ALSEP &bull; Apollo 15 Rover</div>
        </div>
        <div class="finale-sector-card">
          <div class="sector-head">LEVEL 2: MARS</div>
          <div class="sector-status">100% SECURED</div>
          <div class="sector-arts">Viking 1 Lander &bull; Sojourner Rover &bull; Spirit MER-A</div>
        </div>
        <div class="finale-sector-card">
          <div class="sector-head">LEVEL 3: DEEP SPACE</div>
          <div class="sector-status">100% SECURED</div>
          <div class="sector-arts">NEAR Shoemaker &bull; Dawn Spacecraft &bull; Pioneer 10</div>
        </div>
      </div>

      <div class="finale-citation">
        <div class="citation-label">HONORARY DISTINCTION CONFERRED BY EARTH CONTROL</div>
        <div class="citation-title">MASTER SPACE ARCHAEOLOGIST &amp; PROTECTOR OF COSMIC HERITAGE</div>
        <p class="citation-desc">
          "For unmatched heroism and archaeological precision across the airless lunar basalt, the dusty winds of Chryse Planitia, and the deep outer void of the solar system. The ghosts of human exploration now shine forever in the archive."
        </p>
      </div>

      <!-- Part 2 Sequel Teaser -->
      <div class="finale-sequel-card">
        <div class="sequel-badge">CLASSIFIED TELEMETRY DETECTED</div>
        <div class="sequel-title">COMING SOON: GHOSTS OF SPACE &bull; PART 2</div>
        <p class="sequel-desc">
          "The Outer Moons &amp; The Interstellar Horizon &bull; Titan, Europa, Enceladus &amp; The Voyager Probes"
        </p>
      </div>

      <div class="finale-actions">
        <button id="btn-replay-credits" class="btn-primary glow-ready">
          INITIATE RETURN TO EARTH // EXPEDITION FINALE ▶
        </button>
      </div>
    `;

    this.missionAccomplishedModal.classList.remove('hidden');
    this.missionAccomplishedModal.style.opacity = '1';

    const btnReplay = this.missionAccomplishedModal.querySelector('#btn-replay-credits');
    btnReplay?.addEventListener('click', () => {
      this.missionAccomplishedModal?.classList.add('hidden');
      this.startClosingCinematic();
    });
  }

  public startClosingCinematic(): void {
    // 1. Hide HUD & any open modals
    this.hud.hide();
    this.missionAccomplishedModal?.classList.add('hidden');
    this.shelterPrompt?.classList.add('hidden');
    this.reportPrompt?.classList.add('hidden');

    // Ensure any leftover opening audio or radar pings are stopped
    this.stopNebulaIntro(false);
    const surface = this.getCurrentSurfaceEnv();
    surface?.lunaDetection?.stopRadarPing();

    // Authoritative check: Start Silent Universe ONLY when every required task across all 3 environments is completed
    if (this.areAllTasksCompletedAcrossEnvironments()) {
      this.cinematicClosingUI.disableSyntheticAudio();
      this.startEndingSoundtrack();
    }

    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'CINEMATIC // RETRO-PROPULSION TO EARTH ORBIT';
      this.statusDisplay.style.color = '#46d9e8';
    }
    if (this.sceneDisplay) {
      this.sceneDisplay.textContent = 'SpaceEnvironment';
    }

    // 2. Switch 3D scene to triumphant Earth return orbit
    this.sceneManager.switchToClosingCinematic();

    // 3. Launch Cinematic Closing UI with epilogue, roster, and Game Over screen
    setTimeout(() => {
      this.cinematicClosingUI.openClosingCinematic();
    }, 600);
  }

  public start(): void {
    // Start Nebula intro track from the first frame of the opening cinematic
    this.startNebulaIntro();

    const spaceEnv = this.sceneManager.initSpaceCinematic();
    this.introUI.showTitle();

    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'CINEMATIC // APPROACHING THE MOON';
    }

    spaceEnv.setOnIntroComplete(() => {
      this.introUI.hideTitle();
      this.transitionToCabin(false);
    });

    spaceEnv.setOnSkip(() => {
      this.introUI.hideTitle();
      this.transitionToCabin(true);
    });

    setInterval(() => {
      const fps = Math.round(this.engine.getFps());
      if (this.fpsDisplay) {
        this.fpsDisplay.textContent = fps > 0 ? `${fps}` : '--';
      }
      if (this.sceneDisplay) {
        this.sceneDisplay.textContent = this.sceneManager.getActiveSceneName();
      }

      // Deep Space Observatory Loop
      if (this.gameState.currentLevel === GameLevel.DEEP_SPACE) {
        const researchCabin = this.sceneManager.getResearchCabinEnvironment();
        if (researchCabin) {
          this.hud.update();
          this.hud.updateRadar(null, Infinity, 0, false);
          this.shelterPrompt?.classList.add('hidden');
          if (this.gameState.artifactsCollected > 0 && this.reportManager.canReport()) {
            this.reportPrompt?.classList.remove('hidden');
          } else {
            this.reportPrompt?.classList.add('hidden');
          }
        }
        return;
      }

      // Surface Exploration Loop (Moon or Mars)
      const surfaceEnv = this.getCurrentSurfaceEnv();
      if (surfaceEnv && !surfaceEnv.isLandingCinematic) {
        const playerPos = surfaceEnv.playerController.getPosition();
        const playerForward = surfaceEnv.playerController.getForward();
        const isMoving = surfaceEnv.playerController.isMoving();
        const isRunning = surfaceEnv.playerController.isSprinting();

        // Resource update (dt = 0.15s since interval is 150ms)
        this.resourceManager.update(0.15, isMoving, isRunning);
        if (this.resourceManager.isEnergyCritical()) {
          this.checkEnergyAlert();
        }

        this.hud.update(playerPos);
        this.hud.updateRadar(
          surfaceEnv.currentDetectionState.detectedArtifact,
          surfaceEnv.currentDetectionState.distance,
          surfaceEnv.currentDetectionState.signalStrength,
          surfaceEnv.currentDetectionState.canInteract
        );

        this.mapUI.update(playerPos, playerForward);
        this.mapUI.setDetectedArtifact(
          surfaceEnv.currentDetectionState.detectedArtifact?.id ?? null
        );

        // Shelter proximity check (shelter is at ~Vector3(0,0,0) on surface)
        const distToShelter = Math.sqrt(playerPos.x * playerPos.x + playerPos.z * playerPos.z);
        if (this.suppressShelterPrompts) {
          if (distToShelter > 12.0) {
            this.suppressShelterPrompts = false;
          } else {
            this.shelterPrompt?.classList.add('hidden');
            this.reportPrompt?.classList.add('hidden');
            this.isNearShelter = false;
          }
        } else {
          const wasNearShelter = this.isNearShelter;
          this.isNearShelter = distToShelter < 10.0;

          if (this.shelterPrompt) {
            if (this.isNearShelter && !wasNearShelter) {
              const isLevelComplete = this.gameState.artifactsCollected >= this.gameState.recoveryTarget;
              const isMars = this.gameState.currentLevel === GameLevel.MARS;
              if (isLevelComplete) {
                this.shelterPrompt.innerHTML = isMars
                  ? `<kbd>R</kbd> BOARD SHUTTLE FOR DEEP SPACE TAKEOFF ▶`
                  : `<kbd>R</kbd> BOARD SHUTTLE FOR MARS TAKEOFF ▶`;
              } else {
                this.shelterPrompt.innerHTML = `<kbd>R</kbd> ENTER HABITAT CABIN &amp; RECHARGE`;
              }
              this.shelterPrompt.classList.remove('hidden');
            } else if (!this.isNearShelter && wasNearShelter) {
              this.shelterPrompt.classList.add('hidden');
            }
          }

          if (this.reportPrompt) {
            if (this.isNearShelter && this.gameState.artifactsCollected > 0) {
              this.reportPrompt.classList.remove('hidden');
            } else {
              this.reportPrompt.classList.add('hidden');
            }
          }
        }
      }
    }, 150);

    console.log('[Ghosts of Space] Game engine successfully started.');
  }

  public getEngine(): Engine {
    return this.engine;
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public getInputManager(): InputManager {
    return this.inputManager;
  }

  public getSceneManager(): SceneManager {
    return this.sceneManager;
  }

  // =========================================================================
  // SOUNDTRACK & STORY AUDIO SYNCHRONIZATION
  // =========================================================================

  private initSoundtracks(): void {
    try {
      this.nebulaAudio = new Audio('/audio/nebula-intro.mp3');
      this.nebulaAudio.volume = this.musicVolume;
      this.nebulaAudio.loop = false;
      this.nebulaAudio.preload = 'auto';

      // Fallback path in case of base path difference
      this.nebulaAudio.addEventListener(
        'error',
        () => {
          if (this.nebulaAudio && !this.nebulaAudio.src.includes('publicaudio')) {
            this.nebulaAudio.src = 'audio/nebula-intro.mp3';
            this.nebulaAudio.load();
          }
        },
        { once: true }
      );

      this.endingAudio = new Audio('/audio/silent-universe-ending.mp3');
      this.endingAudio.volume = this.musicVolume;
      this.endingAudio.loop = false;
      this.endingAudio.preload = 'auto';

      this.endingAudio.addEventListener(
        'error',
        () => {
          if (this.endingAudio && !this.endingAudio.src.includes('publicaudio')) {
            this.endingAudio.src = 'audio/silent-universe-ending.mp3';
            this.endingAudio.load();
          }
        },
        { once: true }
      );
    } catch (err) {
      console.warn('[Audio] Failed to initialize soundtrack audio elements:', err);
    }
  }

  public startNebulaIntro(): void {
    if (this.hasNebulaIntroPlayed || !this.nebulaAudio) return;
    this.hasNebulaIntroPlayed = true;
    this.isIntroCinematicActive = true;
    this.nebulaAudio.currentTime = 0;
    this.nebulaAudio.volume = this.musicVolume;

    const playPromise = this.nebulaAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('[Audio] Autoplay restricted by browser policy; awaiting user interaction:', err);
        const resumeOnGesture = () => {
          if (
            this.isIntroCinematicActive &&
            !this.isNebulaFading &&
            this.nebulaAudio &&
            this.nebulaAudio.paused
          ) {
            this.nebulaAudio.play().catch(() => {});
          }
          if (this.userGestureCleanup) {
            this.userGestureCleanup();
            this.userGestureCleanup = null;
          }
        };

        const cleanup = () => {
          window.removeEventListener('pointerdown', resumeOnGesture);
          window.removeEventListener('keydown', resumeOnGesture);
          window.removeEventListener('click', resumeOnGesture);
        };
        this.userGestureCleanup = cleanup;

        window.addEventListener('pointerdown', resumeOnGesture, { once: true });
        window.addEventListener('keydown', resumeOnGesture, { once: true });
        window.addEventListener('click', resumeOnGesture, { once: true });
      });
    }
  }

  public stopNebulaIntro(smooth: boolean = true): void {
    this.isIntroCinematicActive = false;
    if (this.userGestureCleanup) {
      this.userGestureCleanup();
      this.userGestureCleanup = null;
    }

    if (!this.nebulaAudio) return;

    if (!smooth || this.nebulaAudio.paused) {
      this.isNebulaFading = false;
      this.nebulaAudio.pause();
      this.nebulaAudio.currentTime = 0;
      return;
    }

    if (this.isNebulaFading) return;
    this.isNebulaFading = true;

    const startVol = this.nebulaAudio.volume;
    const fadeDuration = 500;
    const startTime = performance.now();

    const fadeStep = () => {
      if (!this.nebulaAudio) return;
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / fadeDuration, 1.0);
      this.nebulaAudio.volume = Math.max(0, startVol * (1 - progress));

      if (progress < 1.0 && !this.nebulaAudio.paused) {
        requestAnimationFrame(fadeStep);
      } else {
        this.nebulaAudio.pause();
        this.nebulaAudio.currentTime = 0;
        this.nebulaAudio.volume = this.musicVolume;
        this.isNebulaFading = false;
      }
    };
    requestAnimationFrame(fadeStep);
  }

  public areAllTasksCompletedAcrossEnvironments(): boolean {
    // Authoritative task registry: verify all required artifacts across Moon, Mars & Deep Space
    const requiredMoonIds = ['a11-lm5-descent', 'a12-lm6-ascent', 'a15-lm10-ascent'];
    const requiredMarsIds = ['viking-1-lander', 'sojourner', 'spirit'];
    const requiredDeepSpaceIds = ['dawn-spacecraft', 'near-shoemaker', 'pioneer-10'];

    const moonComplete = requiredMoonIds.every((id) => ARTIFACTS_DATA[id]?.isCollected === true);
    const marsComplete = requiredMarsIds.every((id) => ARTIFACTS_DATA[id]?.isCollected === true);
    const deepSpaceComplete = requiredDeepSpaceIds.every((id) => ARTIFACTS_DATA[id]?.isCollected === true);

    return moonComplete && marsComplete && deepSpaceComplete;
  }

  public startEndingSoundtrack(): void {
    if (this.hasSilentUniversePlayed || !this.endingAudio) return;
    this.hasSilentUniversePlayed = true;

    // Stop any other background music before starting this track
    this.stopNebulaIntro(false);

    this.endingAudio.currentTime = 0;
    this.endingAudio.volume = this.musicVolume;
    const playPromise = this.endingAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('[Audio] Ending soundtrack autoplay prevented by browser policy:', err);
      });
    }
  }

  public stopEndingSoundtrack(): void {
    if (this.endingAudio) {
      this.endingAudio.pause();
      this.endingAudio.currentTime = 0;
    }
  }

  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.nebulaAudio) {
      this.nebulaAudio.volume = this.musicVolume;
    }
    if (this.endingAudio) {
      this.endingAudio.volume = this.musicVolume;
    }
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }
}
