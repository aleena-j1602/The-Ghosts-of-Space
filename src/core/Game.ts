import { Engine } from '@babylonjs/core';
import { SceneManager } from './SceneManager.ts';
import { GameState } from './GameState.ts';
import { InputManager } from './InputManager.ts';
import { IntroUI } from '../ui/IntroUI.ts';
import { DialogueUI } from '../ui/DialogueUI.ts';
import { HUD } from '../ui/HUD.ts';
import { MapUI } from '../ui/MapUI.ts';
import { InvestigationUI } from '../ui/InvestigationUI.ts';
import { OPENING_DIALOGUE, DialogueLine } from '../data/dialogue.ts';
import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';
import { ResourceManager } from '../systems/ResourceManager.ts';
import { ReportManager } from '../systems/ReportManager.ts';
import { SaveManager } from '../systems/SaveManager.ts';
import { RechargeUI } from '../ui/RechargeUI.ts';

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

  // Telemetry indicators
  private fpsDisplay: HTMLElement | null = null;
  private statusDisplay: HTMLElement | null = null;
  private sceneDisplay: HTMLElement | null = null;

  // Phase 6/7 systems
  private resourceManager: ResourceManager;
  private reportManager: ReportManager;
  private rechargeUI: RechargeUI;
  private isNearShelter: boolean = false;
  private shelterPrompt: HTMLElement | null = null;
  private reportPrompt: HTMLElement | null = null;

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

    // Phase 6/7 system instantiation
    this.resourceManager = new ResourceManager();
    this.reportManager = ReportManager.getInstance();
    this.rechargeUI = new RechargeUI();

    this.setupUIBindings();
    this.setupWindowEvents();
    this.setupCinematicSequence();
    this.setupInvestigationEvents();
    this.setupRechargeSystem();
    this.setupShelterPrompts();
  }

  private setupUIBindings(): void {
    this.fpsDisplay = document.getElementById('fps-display');
    this.statusDisplay = document.getElementById('engine-status');
    this.sceneDisplay = document.getElementById('scene-display');

    this.hud.setOnMapClick(() => {
      this.mapUI.toggle();
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
      // I key: Archive (future)
      if (e.code === 'KeyI') {
        // placeholder for archive UI
      }
    });
  }

  private setupCinematicSequence(): void {
    this.introUI.setOnEnterCabin(() => {
      this.transitionToCabin();
    });

    this.introUI.setOnConfirmMission(() => {
      this.transitionToMoonLanding();
    });
  }

  private setupInvestigationEvents(): void {
    this.investigationUI.setOnCollectionComplete((artifact: ArtifactDefinition) => {
      this.handleArtifactCollected(artifact);
    });
  }

  private setupRechargeSystem(): void {
    this.rechargeUI.setOnRechargeFinished((isDeadlineExceeded: boolean) => {
      SaveManager.saveGame();
      if (isDeadlineExceeded) {
        this.showRecuperationMessage();
      }
      // Resume HUD
      this.hud.show();
    });
  }

  private setupShelterPrompts(): void {
    // Create R-key shelter prompt
    this.shelterPrompt = document.createElement('div');
    this.shelterPrompt.id = 'shelter-prompt';
    this.shelterPrompt.className = 'shelter-key-prompt hidden glass-card';
    this.shelterPrompt.innerHTML = `<kbd>R</kbd> RETURN TO HABITAT & RECHARGE`;
    document.getElementById('ui-container')?.appendChild(this.shelterPrompt);

    // Create T-key report prompt
    this.reportPrompt = document.createElement('div');
    this.reportPrompt.id = 'report-prompt';
    this.reportPrompt.className = 'report-key-prompt hidden glass-card';
    this.reportPrompt.innerHTML = `<kbd>T</kbd> TRANSMIT RECOVERY REPORT TO EARTH`;
    document.getElementById('ui-container')?.appendChild(this.reportPrompt);
  }

  private handleInteractKey(): void {
    const moonEnv = this.sceneManager.getMoonEnvironment();
    if (!moonEnv || moonEnv.isLandingCinematic || this.investigationUI.isOpen() || this.mapUI.isOpen()) {
      return;
    }

    const detectionState = moonEnv.currentDetectionState;
    if (detectionState.canInteract && detectionState.detectedArtifact) {
      const artifact = detectionState.detectedArtifact;
      // Start scanning sequence!
      this.investigationUI.startScanSequence(artifact);
    }
  }

  private handleRechargeKey(): void {
    const moonEnv = this.sceneManager.getMoonEnvironment();
    if (!moonEnv || moonEnv.isLandingCinematic) return;
    if (this.investigationUI.isOpen() || this.mapUI.isOpen() || this.rechargeUI.isOpen()) return;
    if (!this.isNearShelter) return;

    this.hud.hide();
    this.rechargeUI.openRecharge(this.dialogueUI);
  }

  private handleReportKey(): void {
    const moonEnv = this.sceneManager.getMoonEnvironment();
    if (!moonEnv || moonEnv.isLandingCinematic) return;
    if (this.investigationUI.isOpen() || this.rechargeUI.isOpen()) return;
    if (!this.reportManager.canReport()) {
      this.hud.showLunaAlert('"Explorer, we haven\'t recovered any artifacts yet! Let\'s find them first!"');
      return;
    }

    this.reportManager.transmitReportToEarth(this.dialogueUI, () => {
      SaveManager.saveGame();
    });
  }

  private showRecuperationMessage(): void {
    const lines: DialogueLine[] = [
      {
        id: 'recup_1',
        speaker: 'EARTH CONTROL',
        text: 'Explorer, your 14-day mission window has elapsed. Emergency recall procedures have been initiated. We are bringing you home.',
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
    // 1. Mark in manager & game state
    const moonEnv = this.sceneManager.getMoonEnvironment();
    if (moonEnv) {
      moonEnv.artifactManager.markCollected(artifact.id);
    }

    this.gameState.artifactsCollected += 1;
    this.gameState.investigationPoints += artifact.rewards.basePoints;
    SaveManager.saveGame();

    // 2. Update HUD & Map
    this.hud.update();
    if (moonEnv) {
      this.mapUI.setArtifacts(
        moonEnv.artifactManager.artifacts,
        (id) => moonEnv.artifactManager.getArtifactPosition(id)
      );
    }

    if (this.statusDisplay) {
      this.statusDisplay.textContent = `ARTIFACT RECOVERED: ${artifact.commonName.toUpperCase()} (+${artifact.rewards.basePoints} PTS)`;
      this.statusDisplay.style.color = '#f5b942';
    }

    // 3. Celebratory dialogue with Luna
    const celebrationDialogue: DialogueLine[] = [
      {
        id: 'collect_1',
        speaker: 'LUNA',
        text: `Splendid discovery, Explorer! All primary telemetry and structural logs for the ${artifact.commonName} are safely stored in our archives!`,
        lunaExpression: 'happy',
      },
      {
        id: 'collect_2',
        speaker: 'PLAYER',
        text: `That was a remarkable piece of engineering. What's our next step?`,
      },
      {
        id: 'collect_3',
        speaker: 'LUNA',
        text: `We should continue locating the remaining lunar relics, or return to the landing habitat to recharge our power cells and debrief.`,
        lunaExpression: 'curious',
      },
    ];

    setTimeout(() => {
      this.dialogueUI.startDialogue(celebrationDialogue);
    }, 400);
  }

  private transitionToCabin(): void {
    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'TRANSITION: CABIN // FIRST-PERSON AWAKENING';
    }

    this.sceneManager.switchToCabin(() => {
      const luna = this.sceneManager.getLunaCharacter();
      this.dialogueUI.setLuna(luna);

      setTimeout(() => {
        this.dialogueUI.startDialogue(OPENING_DIALOGUE, () => {
          this.introUI.showBriefing();
        });
      }, 500);
    });

    this.introUI.triggerAwakening(2600);
  }

  private transitionToMoonLanding(): void {
    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'TRANSITION: LUNAR APPROACH & TOUCHDOWN';
      this.statusDisplay.style.color = '#f5b942';
    }

    this.sceneManager.switchToMoon(
      true,
      () => {
        if (this.statusDisplay) {
          this.statusDisplay.textContent = 'EXPLORATION ACTIVE // LEVEL 1: THE SILENT MOON';
          this.statusDisplay.style.color = '#22c55e';
        }
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

  public start(): void {
    this.sceneManager.initSpaceCinematic();
    this.introUI.showTitle();

    if (this.statusDisplay) {
      this.statusDisplay.textContent = 'CINEMATIC // APPROACHING THE MOON';
    }

    setInterval(() => {
      const fps = Math.round(this.engine.getFps());
      if (this.fpsDisplay) {
        this.fpsDisplay.textContent = fps > 0 ? `${fps}` : '--';
      }
      if (this.sceneDisplay) {
        this.sceneDisplay.textContent = this.sceneManager.getActiveSceneName();
      }

      const moonEnv = this.sceneManager.getMoonEnvironment();
      if (moonEnv && !moonEnv.isLandingCinematic) {
        const playerPos = moonEnv.playerController.getPosition();
        const playerForward = moonEnv.playerController.getForward();
        const isMoving = moonEnv.playerController.isMoving();
        const isRunning = moonEnv.playerController.isSprinting();

        // Resource update (dt = 0.15s since interval is 150ms)
        this.resourceManager.update(0.15, isMoving, isRunning);

        this.hud.update(playerPos);
        this.hud.updateRadar(
          moonEnv.currentDetectionState.detectedArtifact,
          moonEnv.currentDetectionState.distance,
          moonEnv.currentDetectionState.signalStrength,
          moonEnv.currentDetectionState.canInteract
        );

        this.mapUI.update(playerPos, playerForward);
        this.mapUI.setDetectedArtifact(
          moonEnv.currentDetectionState.detectedArtifact?.id ?? null
        );

        // Shelter proximity check (shelter is at ~Vector3(0,0,0) in Moon scene)
        const distToShelter = Math.sqrt(playerPos.x * playerPos.x + playerPos.z * playerPos.z);
        const wasNearShelter = this.isNearShelter;
        this.isNearShelter = distToShelter < 10.0;

        if (this.shelterPrompt) {
          if (this.isNearShelter && !wasNearShelter) {
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
}
