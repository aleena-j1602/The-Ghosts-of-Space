import type {
  ArtifactDefinition,
  ArtifactComponent,
  Challenge,
  ChallengeOption,
} from '../data/artifacts/Core/artifactTypes.ts';

export class InvestigationUI {
  private container: HTMLElement;
  private scanModal!: HTMLElement;
  private investigateModal!: HTMLElement;

  private currentArtifact: ArtifactDefinition | null = null;
  private challengeCompleted: boolean = false;
  private onCollectionComplete?: (artifact: ArtifactDefinition) => void;

  private audioCtx: AudioContext | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'investigation-overlay';
    this.container.className = 'investigation-overlay hidden';

    this.container.innerHTML = `
      <!-- Scanning Modal (Step 4) -->
      <div id="scan-modal" class="scan-modal glass-card hidden">
        <div class="card-tag">LUNA SENSOR ARRAY // SPECTRAL SCAN</div>
        <h2 id="scan-artifact-name">SCANNING TARGET...</h2>
        <div class="scan-beam-container">
          <div class="scan-line"></div>
          <div class="scan-reticle"></div>
        </div>
        <div class="scan-progress-wrapper">
          <div class="progress-bar">
            <div id="scan-progress-fill" class="progress-fill cyan-fill" style="width: 0%"></div>
          </div>
          <div class="scan-status-row">
            <span id="scan-status-text">ACQUIRING TELEMETRY...</span>
            <span id="scan-pct-text">0%</span>
          </div>
        </div>
        <div class="luna-scan-comment glass-card">
          <span class="luna-badge">LUNA:</span>
          <span id="luna-scan-dialogue">"Calibrating sensors... Hold steady while I capture the structural data."</span>
        </div>
      </div>

      <!-- Full Investigation Interface (Step 5, 6, 7, 8) -->
      <div id="investigate-modal" class="investigate-modal glass-card hidden">
        <div class="investigate-header">
          <div class="header-left">
            <div class="card-tag" id="inv-agency-tag">SPACE ARCHAEOLOGY // NASA</div>
            <h1 id="inv-artifact-title">APOLLO 11 EAGLE DESCENT STAGE</h1>
            <div class="inv-subtitle" id="inv-subtitle">Mare Tranquillitatis &bull; 1969</div>
          </div>
          <button id="btn-close-investigate" class="map-close-btn">&times;</button>
        </div>

        <div class="investigate-body">
          <!-- Left Column: Historical Dossier & 3D Model preview banner -->
          <div class="inv-left-pane">
            <div class="dossier-card glass-card">
              <h3>MISSION HISTORICAL DOSSIER</h3>
              <div class="dossier-field">
                <span class="dossier-label">MISSION PURPOSE:</span>
                <p id="inv-purpose" class="dossier-val"></p>
              </div>
              <div class="dossier-field">
                <span class="dossier-label">HISTORICAL NARRATIVE:</span>
                <p id="inv-history" class="dossier-val"></p>
              </div>
              <div class="dossier-field">
                <span class="dossier-label">SCIENTIFIC SIGNIFICANCE:</span>
                <p id="inv-science" class="dossier-val"></p>
              </div>
              <div class="dossier-field">
                <span class="dossier-label">ARCHAEOLOGICAL STATUS:</span>
                <p id="inv-status" class="dossier-val highlight-cyan"></p>
              </div>
            </div>
          </div>

          <!-- Right Column: Component Inspection & Knowledge Challenge -->
          <div class="inv-right-pane">
            <!-- STEP 6: Component Tabs -->
            <div class="component-inspection-panel glass-card">
              <div class="section-title">
                <span>STEP 1: INSPECT HARDWARE COMPONENTS</span>
                <span class="subtag">SELECT A SUBSYSTEM TO ANALYZE</span>
              </div>
              <div id="component-tabs" class="component-tabs">
                <!-- Dynamically populated buttons -->
              </div>
              <div id="component-detail-card" class="component-detail-card">
                <h4 id="comp-name">Select a component above</h4>
                <div class="comp-field">
                  <span class="comp-label">ROLE:</span>
                  <p id="comp-role"></p>
                </div>
                <div class="comp-field">
                  <span class="comp-label">ENGINEERING DESIGN:</span>
                  <p id="comp-how"></p>
                </div>
                <div class="comp-field">
                  <span class="comp-label">WHY IT MATTERED:</span>
                  <p id="comp-why" class="highlight-amber"></p>
                </div>
              </div>
            </div>

            <!-- STEP 7: Educational Challenge -->
            <div class="challenge-panel glass-card">
              <div class="section-title">
                <span>STEP 2: FIELD VERIFICATION CHALLENGE</span>
                <span id="challenge-status-badge" class="badge-pending">PENDING</span>
              </div>
              <p id="challenge-question" class="challenge-question"></p>
              <div id="challenge-options" class="challenge-options">
                <!-- Dynamically populated multiple choice -->
              </div>
              <div id="challenge-feedback" class="challenge-feedback hidden"></div>
            </div>
          </div>
        </div>

        <!-- Footer / Collection Button (Step 8) -->
        <div class="investigate-footer">
          <div class="reward-pill">
            REWARD: <span id="inv-reward-pts" class="highlight-amber">+300 POINTS</span>
          </div>
          <button id="btn-collect-artifact" class="btn-primary" disabled>
            <span class="btn-icon">✓</span> COMPLETE RECOVERY &amp; ARCHIVE DATA
          </button>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);

    this.scanModal = this.container.querySelector('#scan-modal') as HTMLElement;
    this.investigateModal = this.container.querySelector('#investigate-modal') as HTMLElement;

    this.bindEvents();
  }

  private initAudio(): void {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playTone(freq: number, durationSec: number = 0.2, type: OscillatorType = 'sine'): void {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.type = type;
      const now = this.audioCtx.currentTime;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      osc.start(now);
      osc.stop(now + durationSec + 0.02);
    } catch {
      // Audio failed silently
    }
  }

  private bindEvents(): void {
    const btnClose = this.container.querySelector('#btn-close-investigate');
    btnClose?.addEventListener('click', () => {
      this.hide();
    });

    const btnCollect = this.container.querySelector('#btn-collect-artifact') as HTMLButtonElement;
    btnCollect?.addEventListener('click', () => {
      if (this.challengeCompleted && this.currentArtifact) {
        this.finishCollection();
      }
    });
  }

  public setOnCollectionComplete(cb: (artifact: ArtifactDefinition) => void): void {
    this.onCollectionComplete = cb;
  }

  public startScanSequence(artifact: ArtifactDefinition, onScanComplete?: () => void): void {
    this.currentArtifact = artifact;
    this.challengeCompleted = false;

    this.container.classList.remove('hidden');
    this.container.style.opacity = '1';

    this.investigateModal.classList.add('hidden');
    this.scanModal.classList.remove('hidden');

    const nameEl = this.scanModal.querySelector('#scan-artifact-name') as HTMLElement;
    const progressFill = this.scanModal.querySelector('#scan-progress-fill') as HTMLElement;
    const statusText = this.scanModal.querySelector('#scan-status-text') as HTMLElement;
    const pctText = this.scanModal.querySelector('#scan-pct-text') as HTMLElement;
    const lunaText = this.scanModal.querySelector('#luna-scan-dialogue') as HTMLElement;

    const launchYear = artifact.dates.launch
      ? new Date(artifact.dates.launch).getUTCFullYear()
      : (artifact.dates.landing ? new Date(artifact.dates.landing).getUTCFullYear() : 1969);

    nameEl.textContent = `SCANNING: ${artifact.commonName.toUpperCase()}`;
    progressFill.style.width = '0%';
    pctText.textContent = '0%';
    statusText.textContent = 'ACQUIRING HARDWARE SIGNATURE...';
    lunaText.textContent = `"Calibrating sensors... Hold steady while I capture the structural data."`;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      progressFill.style.width = `${progress}%`;
      pctText.textContent = `${progress}%`;
      this.playTone(300 + progress * 8, 0.05);

      if (progress === 40) {
        statusText.textContent = 'ANALYZING COMPONENT SCHEMATICS...';
        lunaText.textContent = `"Telemetry match verified! De-scrambling historical records from ${launchYear}..."`;
      } else if (progress === 75) {
        statusText.textContent = 'RECONSTRUCTING ARCHIVAL RECORDS...';
        lunaText.textContent = `"Almost done! Structural integrity intact. Preparing investigation report."`;
      } else if (progress >= 100) {
        clearInterval(interval);
        statusText.textContent = 'SCAN COMPLETE // ALL SIGNALS VERIFIED';
        this.playTone(720, 0.35, 'triangle');

        setTimeout(() => {
          this.scanModal.classList.add('hidden');
          this.openInvestigationInterface(artifact);
          if (onScanComplete) onScanComplete();
        }, 600);
      }
    }, 90);
  }

  private openInvestigationInterface(artifact: ArtifactDefinition): void {
    this.investigateModal.classList.remove('hidden');

    const launchYear = artifact.dates.launch
      ? new Date(artifact.dates.launch).getUTCFullYear()
      : (artifact.dates.landing ? new Date(artifact.dates.landing).getUTCFullYear() : 1969);

    // Populate Dossier
    (this.investigateModal.querySelector('#inv-agency-tag') as HTMLElement).textContent =
      `SPACE ARCHAEOLOGY // ${artifact.agency.toUpperCase()} &bull; LEVEL ${artifact.level}`;
    (this.investigateModal.querySelector('#inv-artifact-title') as HTMLElement).textContent = artifact.commonName.toUpperCase();
    (this.investigateModal.querySelector('#inv-subtitle') as HTMLElement).textContent =
      `${artifact.destination} &bull; Launched: ${launchYear}`;
    (this.investigateModal.querySelector('#inv-purpose') as HTMLElement).textContent = artifact.objective;
    (this.investigateModal.querySelector('#inv-history') as HTMLElement).textContent = artifact.description;
    (this.investigateModal.querySelector('#inv-science') as HTMLElement).textContent =
      artifact.scientificFindings.join(' ') || (artifact.educational?.takeaways ? artifact.educational.takeaways.join(' ') : artifact.archive.summary);
    (this.investigateModal.querySelector('#inv-status') as HTMLElement).textContent = artifact.currentStatus;
    (this.investigateModal.querySelector('#inv-reward-pts') as HTMLElement).textContent = `+${artifact.rewards.basePoints} POINTS`;

    // Populate Components
    const tabsContainer = this.investigateModal.querySelector('#component-tabs') as HTMLElement;
    tabsContainer.innerHTML = '';

    artifact.components.forEach((comp: ArtifactComponent, idx: number) => {
      const btn = document.createElement('button');
      btn.className = `comp-tab-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = comp.name;
      btn.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.comp-tab-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.displayComponent(comp);
      });
      tabsContainer.appendChild(btn);
    });

    if (artifact.components.length > 0) {
      this.displayComponent(artifact.components[0]);
    }

    // Populate Challenge
    this.renderChallenge(artifact);

    // Reset Collect Button
    const btnCollect = this.investigateModal.querySelector('#btn-collect-artifact') as HTMLButtonElement;
    btnCollect.disabled = true;
  }

  private displayComponent(comp: ArtifactComponent): void {
    (this.investigateModal.querySelector('#comp-name') as HTMLElement).textContent = comp.name;
    (this.investigateModal.querySelector('#comp-role') as HTMLElement).textContent = `[${comp.type}] ${comp.functionPlain}`;
    (this.investigateModal.querySelector('#comp-how') as HTMLElement).textContent = `Condition: ${comp.condition}. ${comp.historicalNote ?? comp.functionPlain}`;
    (this.investigateModal.querySelector('#comp-why') as HTMLElement).textContent =
      comp.historicalNote ?? 'Essential subsystem ensuring mission success and providing critical baseline telemetry.';
    this.playTone(480, 0.08);
  }

  private renderChallenge(artifact: ArtifactDefinition): void {
    const qEl = this.investigateModal.querySelector('#challenge-question') as HTMLElement;
    const optContainer = this.investigateModal.querySelector('#challenge-options') as HTMLElement;
    const feedbackEl = this.investigateModal.querySelector('#challenge-feedback') as HTMLElement;
    const badgeEl = this.investigateModal.querySelector('#challenge-status-badge') as HTMLElement;

    const challenge = artifact.challenges && artifact.challenges.length > 0 ? artifact.challenges[0] : null;

    if (!challenge) {
      qEl.textContent = 'Hardware telemetry verified. Confirm archive entry.';
      optContainer.innerHTML = '';
      badgeEl.className = 'badge-verified';
      badgeEl.textContent = 'VERIFIED';
      this.challengeCompleted = true;
      const btnCollect = this.investigateModal.querySelector('#btn-collect-artifact') as HTMLButtonElement;
      btnCollect.disabled = false;
      return;
    }

    qEl.textContent = challenge.instructions || challenge.objective || challenge.title;
    optContainer.innerHTML = '';
    feedbackEl.className = 'challenge-feedback hidden';
    feedbackEl.innerHTML = '';
    badgeEl.className = 'badge-pending';
    badgeEl.textContent = 'PENDING VERIFICATION';

    const options = challenge.options || [];
    options.forEach((opt: ChallengeOption, idx: number) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'challenge-opt-btn';
      optBtn.innerHTML = `<span class="opt-num">${String.fromCharCode(65 + idx)}</span> <span class="opt-txt">${opt.text}</span>`;

      optBtn.addEventListener('click', () => {
        this.handleSelectOption(opt, idx, challenge);
      });

      optContainer.appendChild(optBtn);
    });
  }

  private handleSelectOption(selectedOpt: ChallengeOption, selectedIndex: number, challenge: Challenge): void {
    const optButtons = this.investigateModal.querySelectorAll('.challenge-opt-btn');
    const feedbackEl = this.investigateModal.querySelector('#challenge-feedback') as HTMLElement;
    const badgeEl = this.investigateModal.querySelector('#challenge-status-badge') as HTMLElement;
    const btnCollect = this.investigateModal.querySelector('#btn-collect-artifact') as HTMLButtonElement;

    const isCorrect = Array.isArray(challenge.correctAnswer)
      ? challenge.correctAnswer.includes(selectedOpt.id)
      : Object.values(challenge.correctAnswer).includes(selectedOpt.id);

    optButtons.forEach((btn, idx) => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      if (idx === selectedIndex) {
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
      }
    });

    feedbackEl.classList.remove('hidden');

    if (isCorrect) {
      this.challengeCompleted = true;
      this.playTone(880, 0.35, 'triangle');

      badgeEl.className = 'badge-verified';
      badgeEl.textContent = 'VERIFIED';

      feedbackEl.className = 'challenge-feedback feedback-correct';
      feedbackEl.innerHTML = `
        <div class="feedback-title">✓ CORRECT HISTORICAL SPECIFICATION</div>
        <p>${challenge.explanation}</p>
      `;

      btnCollect.disabled = false;
      btnCollect.classList.add('glow-ready');
    } else {
      this.challengeCompleted = false;
      this.playTone(220, 0.25, 'sawtooth');

      badgeEl.className = 'badge-incorrect';
      badgeEl.textContent = 'TRY AGAIN';

      const hintText = challenge.hints && challenge.hints.length > 0 ? challenge.hints[0] : 'Review the mission historical dossier.';
      feedbackEl.className = 'challenge-feedback feedback-incorrect';
      feedbackEl.innerHTML = `
        <div class="feedback-title">✕ INCORRECT SPECIFICATION</div>
        <p><strong>Clue from Luna:</strong> ${hintText}</p>
      `;

      btnCollect.disabled = true;
      btnCollect.classList.remove('glow-ready');
    }
  }

  private finishCollection(): void {
    if (!this.currentArtifact) return;

    this.playTone(660, 0.2, 'triangle');
    setTimeout(() => this.playTone(990, 0.4, 'sine'), 150);

    const art = this.currentArtifact;
    this.hide();

    if (this.onCollectionComplete) {
      this.onCollectionComplete(art);
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
