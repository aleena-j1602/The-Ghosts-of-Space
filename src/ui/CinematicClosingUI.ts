import { GameState } from '../core/GameState.ts';
import { SaveManager } from '../systems/SaveManager.ts';

export class CinematicClosingUI {
  private container: HTMLElement;
  private currentPhase: number = 1;
  private audioCtx: AudioContext | null = null;
  private audioInterval: number | null = null;
  private isMuted: boolean = false;

  private onRestartCallback?: () => void;
  private onFreeRoamCallback?: () => void;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'cinematic-closing-overlay';
    this.container.className = 'cinematic-closing-overlay hidden';

    this.container.innerHTML = `
      <!-- Anamorphic Cinema Letterbox Bars -->
      <div class="cinema-bar cinema-bar-top">
        <div class="cinema-telemetry">
          <span class="pulse-dot-cyan"></span>
          <span id="cinema-telemetry-text">GHOST ARCHIVE // TRANS-EARTH INJECTION VECTOR &bull; 100% RECOVERY ARCHIVE SECURED</span>
        </div>
      </div>
      <div class="cinema-bar cinema-bar-bottom">
        <div class="cinema-footer-brand">GHOSTS OF SPACE &bull; HUMANITY'S CELESTIAL HERITAGE</div>
      </div>

      <!-- Phase 1: Narrative Epilogue -->
      <div id="closing-phase-1" class="closing-phase active">
        <div class="closing-card glass-card">
          <div class="card-tag">EXPEDITION EPILOGUE // TRANSIT LOG ENTRY</div>
          <h2 class="phase-title">APPROACHING EARTH ORBIT</h2>
          
          <div class="epilogue-dialogues">
            <div class="epilogue-line">
              <span class="speaker-tag earth">EARTH COMMAND // HOUSTON DSN</span>
              <p>&ldquo;Ghost Archive vessel, telemetry lock confirmed. Welcome back. All 9 historic artifact datasets from the Moon, Mars, and Deep Space are successfully decrypted. You brought our history home.&rdquo;</p>
            </div>
            
            <div class="epilogue-line">
              <span class="speaker-tag luna">LUNA // COMPANION</span>
              <p>&ldquo;Look out that forward canopy, Explorer... that pale blue dot is home. For decades, those machines waited alone in the dark. Because of you, humanity will never forget who blazed the trail.&rdquo;</p>
            </div>

            <div class="epilogue-line">
              <span class="speaker-tag player">EXPLORER // FLIGHT COMMAND</span>
              <p>&ldquo;From Armstrong's footsteps at Tranquility Base, to Spirit's lonely wheel tracks on Mars, to Pioneer 10 sailing into the stars with humanity's golden message... they are remembered.&rdquo;</p>
            </div>
          </div>

          <div class="phase-actions">
            <button id="btn-next-phase-1" class="btn-primary glow-ready">
              VIEW EXPEDITION TELEMETRY ROSTER ▶
            </button>
          </div>
        </div>
      </div>

      <!-- Phase 2: Expedition Legacy & Telemetry Roster -->
      <div id="closing-phase-2" class="closing-phase hidden">
        <div class="closing-card glass-card wide-card">
          <div class="card-tag">SOLAR HERITAGE ARCHIVE // COMPLETE MISSION ROSTER</div>
          <h2 class="phase-title">EXPEDITION RETROSPECTIVE</h2>
          <p class="phase-sub">Every targeted robotic and human monument has been safely recovered and cataloged.</p>

          <div class="roster-grid">
            <!-- Sector 1: Moon -->
            <div class="roster-sector-card">
              <div class="roster-head">SECTOR I: THE SILENT MOON</div>
              <div class="roster-status-badge">100% VERIFIED</div>
              <ul class="roster-list">
                <li><span class="roster-dot">●</span> <strong>Apollo 11 Eagle</strong> <em>(1969 &bull; First Human Lunar Landing)</em></li>
                <li><span class="roster-dot">●</span> <strong>Apollo 12 ALSEP</strong> <em>(1969 &bull; Lunar Geophysics Station)</em></li>
                <li><span class="roster-dot">●</span> <strong>Apollo 15 LRV</strong> <em>(1971 &bull; First Lunar Roving Vehicle)</em></li>
              </ul>
            </div>

            <!-- Sector 2: Mars -->
            <div class="roster-sector-card">
              <div class="roster-head">SECTOR II: THE RED PLANET</div>
              <div class="roster-status-badge">100% VERIFIED</div>
              <ul class="roster-list">
                <li><span class="roster-dot">●</span> <strong>Viking 1 Lander</strong> <em>(1976 &bull; First Long-Term Mars Surface Science)</em></li>
                <li><span class="roster-dot">●</span> <strong>Sojourner Rover</strong> <em>(1997 &bull; First Autonomous Planetary Rover)</em></li>
                <li><span class="roster-dot">●</span> <strong>Spirit Rover MER-A</strong> <em>(2004 &bull; Legendary Gusev Crater Explorer)</em></li>
              </ul>
            </div>

            <!-- Sector 3: Deep Space -->
            <div class="roster-sector-card">
              <div class="roster-head">SECTOR III: DEEP SPACE</div>
              <div class="roster-status-badge">100% VERIFIED</div>
              <ul class="roster-list">
                <li><span class="roster-dot">●</span> <strong>NEAR Shoemaker</strong> <em>(2001 &bull; First Asteroid Orbit &amp; Landing)</em></li>
                <li><span class="roster-dot">●</span> <strong>Dawn Spacecraft</strong> <em>(2011-2018 &bull; Vesta &amp; Ceres Ion Pioneer)</em></li>
                <li><span class="roster-dot">●</span> <strong>Pioneer 10</strong> <em>(1972 &bull; Interstellar Ambassador to the Stars)</em></li>
              </ul>
            </div>
          </div>

          <!-- Mission Performance Summary Stats -->
          <div class="closing-stats-banner">
            <div class="stat-box">
              <span class="stat-label">EXPEDITION DURATION</span>
              <span id="closing-days-val" class="stat-value highlight-cyan">-- DAYS</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">ARCHIVE RECOVERY</span>
              <span class="stat-value highlight-green">9 / 9 (100%)</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">INVESTIGATION SCORE</span>
              <span id="closing-score-val" class="stat-value highlight-amber">-- PTS</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">DISTINCTION CONFERRED</span>
              <span class="stat-value stat-rank">MASTER ARCHAEOLOGIST</span>
            </div>
          </div>

          <div class="phase-actions">
            <button id="btn-next-phase-2" class="btn-primary glow-ready">
              CONCLUDE EXPEDITION &bull; FINAL TRANSMISSION ▶
            </button>
          </div>
        </div>
      </div>

      <!-- Phase 3: Game Over & Final Farewell -->
      <div id="closing-phase-3" class="closing-phase hidden">
        <div class="closing-final-card glass-card">
          <div class="final-badge-pill">EXPEDITION CONCLUDED &bull; ARCHIVE SECURED</div>
          <h1 class="final-game-title">GHOSTS OF SPACE</h1>
          <div class="final-game-over">GAME OVER</div>
          <p class="final-subheading">HUMANITY'S SOLAR HERITAGE PERMANENTLY PRESERVED</p>

          <blockquote class="final-quote-box">
            <p>&ldquo;Somewhere, something incredible is waiting to be known.&rdquo;</p>
            <cite>&mdash; Carl Sagan, Astronomer &amp; Planetary Scientist</cite>
          </blockquote>

          <div class="final-credits">
            <div class="credit-entry">
              <span class="credit-role">Concept, Design &amp; Archaeology Simulation</span>
              <span class="credit-name">Ghosts of Space Expedition</span>
            </div>
            <div class="credit-entry">
              <span class="credit-role">Mission Telemetry &amp; Historical Archives</span>
              <span class="credit-name">NASA / JPL / Ames Research Center / JHU-APL</span>
            </div>
            <div class="credit-entry">
              <span class="credit-role">Autonomous Companion Diagnostics</span>
              <span class="credit-name">LUNA AI System</span>
            </div>
          </div>

          <div class="final-interactive-actions">
            <button id="btn-closing-restart" class="btn-primary glow-ready">
              ↺ RESTART EXPEDITION (PLAY AGAIN)
            </button>
            <button id="btn-closing-freeroam" class="btn-secondary">
              OBSERVE ORBITAL DESCENT (CAMERA VIEW)
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);
    this.bindEvents();
  }

  private initAudio(): void {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private startCinematicTheme(): void {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      // Soothing major chord progression: Cmaj9 -> Fmaj7 -> Gsus4 -> C
      const chords = [
        [261.63, 329.63, 392.0, 493.88, 587.33], // C, E, G, B, D
        [174.61, 261.63, 329.63, 349.23, 440.0],  // F, C, E, F, A
        [196.0, 261.63, 293.66, 392.0, 523.25],   // G, C, D, G, C
        [261.63, 329.63, 392.0, 523.25, 659.25],  // C, E, G, C, E
      ];

      let chordIdx = 0;
      const playChord = () => {
        if (!this.audioCtx || this.isMuted) return;
        const freqs = chords[chordIdx % chords.length];
        chordIdx++;

        const now = this.audioCtx.currentTime;
        freqs.forEach((freq, i) => {
          const osc = this.audioCtx!.createOscillator();
          const gain = this.audioCtx!.createGain();
          const filter = this.audioCtx!.createBiquadFilter();

          osc.type = i === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(900, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.015, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.audioCtx!.destination);

          osc.start(now);
          osc.stop(now + 4.0);
        });
      };

      playChord();
      this.audioInterval = window.setInterval(playChord, 3600);
    } catch {
      // Audio fallback
    }
  }

  private stopAudio(): void {
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = null;
    }
  }

  private bindEvents(): void {
    const btnNext1 = this.container.querySelector('#btn-next-phase-1');
    const btnNext2 = this.container.querySelector('#btn-next-phase-2');
    const btnRestart = this.container.querySelector('#btn-closing-restart');
    const btnFreeRoam = this.container.querySelector('#btn-closing-freeroam');

    btnNext1?.addEventListener('click', () => {
      this.showPhase(2);
    });

    btnNext2?.addEventListener('click', () => {
      this.showPhase(3);
    });

    btnRestart?.addEventListener('click', () => {
      this.stopAudio();
      SaveManager.clearSave();
      if (this.onRestartCallback) {
        this.onRestartCallback();
      } else {
        window.location.reload();
      }
    });

    btnFreeRoam?.addEventListener('click', () => {
      this.toggleFreeRoam();
    });
  }

  public setOnRestart(cb: () => void): void {
    this.onRestartCallback = cb;
  }

  public setOnFreeRoam(cb: () => void): void {
    this.onFreeRoamCallback = cb;
  }

  public showPhase(phaseNum: number): void {
    this.currentPhase = phaseNum;
    const phase1 = this.container.querySelector('#closing-phase-1');
    const phase2 = this.container.querySelector('#closing-phase-2');
    const phase3 = this.container.querySelector('#closing-phase-3');

    phase1?.classList.add('hidden');
    phase2?.classList.add('hidden');
    phase3?.classList.add('hidden');

    if (phaseNum === 1) phase1?.classList.remove('hidden');
    if (phaseNum === 2) phase2?.classList.remove('hidden');
    if (phaseNum === 3) phase3?.classList.remove('hidden');
  }

  public openClosingCinematic(): void {
    const gs = GameState.getInstance();

    // Populate dynamic stats
    const daysEl = this.container.querySelector('#closing-days-val');
    const scoreEl = this.container.querySelector('#closing-score-val');
    if (daysEl) daysEl.textContent = `${gs.missionDay} DAYS`;
    if (scoreEl) scoreEl.textContent = `${gs.investigationPoints} PTS`;

    // Start with Phase 1
    this.showPhase(1);

    // Show container
    this.container.classList.remove('hidden');
    this.container.style.opacity = '1';

    // Start ambient cinematic music
    this.startCinematicTheme();
  }

  private toggleFreeRoam(): void {
    const phase3 = this.container.querySelector('#closing-phase-3') as HTMLElement;
    if (phase3) {
      if (phase3.style.display === 'none') {
        phase3.style.display = '';
      } else {
        phase3.style.display = 'none';
      }
    }
    if (this.onFreeRoamCallback) {
      this.onFreeRoamCallback();
    }
  }

  public getCurrentPhase(): number {
    return this.currentPhase;
  }

  public hide(): void {
    this.stopAudio();
    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.classList.add('hidden');
    }, 400);
  }
}
