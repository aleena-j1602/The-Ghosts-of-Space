import { GameState } from '../core/GameState.ts';
import { SaveManager } from '../systems/SaveManager.ts';

export class CinematicClosingUI {
  private container: HTMLElement;
  private currentPhase: number = 1;
  private audioCtx: AudioContext | null = null;
  private audioInterval: number | null = null;
  private isMuted: boolean = false;
  private useSyntheticTheme: boolean = true;

  // Auto-scroll animation state for Phase 3
  private scrollAnimId: number | null = null;
  private isScrollPaused: boolean = false;
  private scrollSpeedMultiplier: number = 1.0;
  private lastScrollTimestamp: number = 0;

  // Callbacks
  private onRestartCallback?: () => void;
  private onReturnToMainMenuCallback?: () => void;
  private onFreeRoamCallback?: () => void;
  private onStopAudioCallback?: () => void;

  // Cached DOM elements
  private creditsViewport: HTMLElement | null = null;
  private btnScrollPause: HTMLElement | null = null;
  private btnScrollSpeed: HTMLElement | null = null;

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
              <p>&ldquo;Ghost Archive vessel, telemetry lock confirmed. Welcome back. Mandatory recuperation protocol is initiated at landing site Alpha. Take your well-deserved rest, Explorer—because classified telemetry from the outer moons has already begun. A new expedition awaits in Part 2.&rdquo;</p>
            </div>
            
            <div class="epilogue-line">
              <span class="speaker-tag luna">LUNA // COMPANION</span>
              <p>&ldquo;Look out that forward canopy, Explorer... that pale blue dot is home. For decades, those machines waited alone in the dark. Because of you, humanity will never forget who blazed the trail. Now let's get you rested for what's next!&rdquo;</p>
            </div>

            <div class="epilogue-line">
              <span class="speaker-tag player">EXPLORER // FLIGHT COMMAND</span>
              <p>&ldquo;From Armstrong's footsteps at Tranquility Base, to Spirit's lonely wheel tracks on Mars, to Pioneer 10 sailing into the stars with humanity's golden message... they are remembered. Ready for splashdown and recuperation.&rdquo;</p>
            </div>
          </div>

          <div class="phase-actions">
            <button id="btn-next-phase-1" class="btn-primary glow-ready" type="button">
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
            <button id="btn-next-phase-2" class="btn-primary glow-ready" type="button">
              ROLL FINAL CREDITS ▶
            </button>
          </div>
        </div>
      </div>

      <!-- Phase 3: Dedicated Cinematic Scrolling Credits Experience -->
      <div id="closing-phase-3" class="closing-phase hidden">
        <div class="credits-cinema-wrapper">
          <!-- Top Speed / Play Controls -->
          <div class="credits-controls-bar">
            <button id="btn-credits-pause" class="btn-credits-ctrl" type="button">⏸ PAUSE SCROLL</button>
            <button id="btn-credits-speed" class="btn-credits-ctrl" type="button">⚡ 2X SPEED</button>
            <button id="btn-credits-skip" class="btn-credits-ctrl" type="button">⏭ JUMP TO CONCLUSION</button>
          </div>

          <!-- Scrolling Credits Content Window -->
          <div id="credits-scroll-viewport" class="credits-scroll-viewport">
            <div id="credits-scroll-track" class="credits-scroll-track">
              <!-- PROJECT TITLE -->
              <div class="credit-block title-block">
                <div class="credit-subtitle">PROJECT</div>
                <h1 class="credit-main-title">GHOSTS OF SPACE</h1>
                <p class="credit-tagline">&ldquo;Abandoned, but not Forgotten. Every Machine Has a Story Worth Telling.&rdquo;</p>
                <p class="credit-synopsis">An interactive space archaeology experience exploring the forgotten machines that helped humanity discover the Moon, Mars and beyond.</p>
              </div>

              <!-- DEVELOPED BY -->
              <div class="credit-block">
                <div class="credit-section-tag">DEVELOPED BY</div>
                <h2 class="credit-group-title">TEAM SPACE VENTURA</h2>
                <ul class="credit-names-list">
                  <li>Aleena Joseph</li>
                  <li>Adhwaith Jayaprakash</li>
                  <li>Alen Johnson</li>
                  <li>Dhruva C.</li>
                </ul>
              </div>

              <!-- CREATED FOR -->
              <div class="credit-block">
                <div class="credit-section-tag">CREATED FOR</div>
                <h2 class="credit-group-title">NASA SPACE APPS CHALLENGE 2026</h2>
                <p class="credit-challenge-name">Challenge: Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars.</p>
              </div>

              <!-- TECHNOLOGY -->
              <div class="credit-block">
                <div class="credit-section-tag">TECHNOLOGY</div>
                <ul class="credit-items-list">
                  <li><strong>Babylon.js 7.50</strong> &mdash; 3D Real-Time WebGL Rendering Engine</li>
                  <li><strong>TypeScript 5.7</strong> &mdash; Type-Safe Simulation &amp; Mission Architecture</li>
                  <li><strong>Vite 6.0</strong> &mdash; Frontend Tooling &amp; Production Pipeline</li>
                  <li><strong>HTML5 Canvas &amp; Web Audio API</strong> &mdash; Procedural Radar &amp; Telemetry Audio</li>
                  <li><strong>Modern CSS3</strong> &mdash; Cybernetic Glassmorphic HUD &amp; Anamorphic Displays</li>
                </ul>
              </div>

              <!-- SPECIAL ACKNOWLEDGEMENTS -->
              <div class="credit-block">
                <div class="credit-section-tag">SPECIAL ACKNOWLEDGEMENTS</div>
                <ul class="credit-items-list">
                  <li><strong>NASA</strong> and its publicly available mission archives, scientific records, and educational resources.</li>
                  <li>The scientists, engineers, flight controllers, and mission teams behind Apollo, Viking, Mars Pathfinder, MER, NEAR Shoemaker, Dawn, and Pioneer.</li>
                  <li>The global open-source developers and communities behind Babylon.js and modern web standards.</li>
                </ul>
              </div>

              <!-- DEVELOPMENT TOOLS & AI ASSISTANCE -->
              <div class="credit-block">
                <div class="credit-section-tag">DEVELOPMENT TOOLS &amp; ASSISTANCE</div>
                <p class="credit-tool-desc">The following tools supported project development, brainstorming, and technical assistance:</p>
                <ul class="credit-items-list">
                  <li><strong>Google Antigravity</strong> &mdash; AI-powered development environment used for project implementation</li>
                  <li><strong>GitHub Copilot</strong> &mdash; AI pair programming and technical implementation assistance</li>
                  <li><strong>ChatGPT</strong> &mdash; Brainstorming, educational framing, and narrative research support</li>
                </ul>
              </div>

              <!-- 3D MODELS AND ASSETS -->
              <div class="credit-block">
                <div class="credit-section-tag">3D MODELS &amp; ASSETS</div>
                <ul class="credit-items-list">
                  <li><strong>LUNA — Robotic Companion</strong><br/>Source: Sketchfab &bull; Creator: assetfactory &bull; Free Standard License<br/><span class="credit-url">https://sketchfab.com/3d-models/friendly-sci-fi-robot-with-animations-b83ac12ac3f14119a0988532d3613dac</span></li>
                  <li><strong>Discovery Space Shuttle</strong><br/>Source: Sketchfab &bull; Creator: rsatenza &bull; Creative Commons Attribution (CC BY)<br/><span class="credit-url">https://sketchfab.com/3d-models/discovery-space-shuttle-23c579b845e841c9b6c6d59bd5725bb6</span></li>
                  <li><strong>Research Cabin / Habitat &amp; Astronaut Model</strong><br/>Source: Sketchfab &bull; Creator: assetfactory &bull; Free Standard License<br/><span class="credit-url">https://sketchfab.com/3d-models/space-sci-fi-pack-a6fb873c2292443388689606f88cba9b</span></li>
                </ul>
              </div>

              <!-- PLANETARY TERRAIN TEXTURES -->
              <div class="credit-block">
                <div class="credit-section-tag">PLANETARY TERRAIN TEXTURES</div>
                <ul class="credit-items-list">
                  <li><strong>Lunar Surface Regolith &amp; Basalt</strong> &mdash; Poly Haven (Creative Commons CC0)<br/><span class="credit-url">https://polyhaven.com/a/moon_01</span></li>
                  <li><strong>Martian Red Dunes &amp; Chryse Sand</strong> &mdash; Poly Haven (Creative Commons CC0)<br/><span class="credit-url">https://polyhaven.com/a/red_sand</span></li>
                </ul>
              </div>

              <!-- SOUNDTRACKS -->
              <div class="credit-block">
                <div class="credit-section-tag">ORIGINAL SOUNDTRACKS</div>
                <ul class="credit-items-list">
                  <li><strong>&ldquo;Nebula&rdquo;</strong> &mdash; Opening Cinematic &amp; Approach Sequence</li>
                  <li><strong>&ldquo;Silent Universe&rdquo;</strong> &mdash; Trans-Earth Injection &amp; Final Credits Sequence</li>
                </ul>
              </div>

              <!-- CARL SAGAN QUOTE -->
              <div class="credit-block quote-block">
                <blockquote class="credits-quote">
                  <p>&ldquo;Somewhere, something incredible is waiting to be known.&rdquo;</p>
                  <cite>&mdash; Carl Sagan, Astronomer &amp; Planetary Scientist</cite>
                </blockquote>
              </div>

              <!-- FINAL CINEMATIC MESSAGE -->
              <div class="credit-block conclusion-block">
                <div class="credits-inspirational-message">
                  &ldquo;They may have stopped exploring. Their discoveries never stopped inspiring.&rdquo;
                </div>
                <div class="credits-mission-complete">
                  <div class="complete-badge">MISSION COMPLETE</div>
                  <h2>THANK YOU FOR BEING A SPACE ARCHAEOLOGIST</h2>
                  <div class="brand-sub">GHOSTS OF SPACE</div>
                </div>

                <!-- LUNA FINAL LINE -->
                <div class="credits-luna-farewell glass-card">
                  <div class="luna-mini-avatar"></div>
                  <div class="luna-farewell-text">
                    <span class="luna-name-tag">LUNA // ROBOTIC COMPANION</span>
                    <p>&ldquo;Well, Space Archaeologist... looks like we've left our mark on the universe.&rdquo;</p>
                  </div>
                </div>

                <!-- NASA DISCLAIMER -->
                <p class="credits-disclaimer">
                  Ghosts of Space is an independent student project developed for the NASA Space Apps Challenge 2026. It is not an official NASA product and is not endorsed by NASA.
                </p>

                <!-- FINAL INTERACTIVE BUTTONS -->
                <div class="credits-final-actions">
                  <button id="btn-credits-menu" class="btn-primary glow-ready" type="button">
                    ⏏ RETURN TO MAIN MENU
                  </button>
                  <button id="btn-credits-explore-again" class="btn-secondary" type="button">
                    ↺ EXPLORE AGAIN
                  </button>
                  <button id="btn-credits-archive" class="btn-secondary" type="button">
                    📂 VIEW MISSION ARCHIVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);

    this.creditsViewport = this.container.querySelector('#credits-scroll-viewport');
    this.btnScrollPause = this.container.querySelector('#btn-credits-pause');
    this.btnScrollSpeed = this.container.querySelector('#btn-credits-speed');

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

  public disableSyntheticAudio(): void {
    this.useSyntheticTheme = false;
    this.stopAudio();
  }

  public setOnStopAudio(cb: () => void): void {
    this.onStopAudioCallback = cb;
  }

  private startCinematicTheme(): void {
    if (!this.useSyntheticTheme) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

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

  public stopAudio(): void {
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = null;
    }
    if (this.onStopAudioCallback) {
      this.onStopAudioCallback();
    }
  }

  private bindEvents(): void {
    const btnNext1 = this.container.querySelector('#btn-next-phase-1');
    const btnNext2 = this.container.querySelector('#btn-next-phase-2');

    btnNext1?.addEventListener('click', () => {
      this.showPhase(2);
    });

    btnNext2?.addEventListener('click', () => {
      this.showPhase(3);
    });

    // Phase 3 scroll control buttons
    this.btnScrollPause?.addEventListener('click', () => {
      this.toggleScrollPause();
    });

    this.btnScrollSpeed?.addEventListener('click', () => {
      this.toggleScrollSpeed();
    });

    this.container.querySelector('#btn-credits-skip')?.addEventListener('click', () => {
      if (this.creditsViewport) {
        this.creditsViewport.scrollTop = this.creditsViewport.scrollHeight;
      }
    });

    // Phase 3 Final Interactive Buttons
    const btnMenu = this.container.querySelector('#btn-credits-menu');
    const btnExploreAgain = this.container.querySelector('#btn-credits-explore-again');
    const btnArchive = this.container.querySelector('#btn-credits-archive');

    btnMenu?.addEventListener('click', () => {
      this.stopAutoScroll();
      this.stopAudio();
      this.hide();
      if (this.onReturnToMainMenuCallback) {
        this.onReturnToMainMenuCallback();
      }
    });

    btnExploreAgain?.addEventListener('click', () => {
      this.stopAutoScroll();
      this.stopAudio();
      SaveManager.clearSave();
      if (this.onRestartCallback) {
        this.onRestartCallback();
      } else if (this.onFreeRoamCallback) {
        this.onFreeRoamCallback();
      } else {
        window.location.reload();
      }
    });

    btnArchive?.addEventListener('click', () => {
      // Switches back to Phase 2 (Solar Heritage Archive Roster)
      this.showPhase(2);
    });
  }

  private toggleScrollPause(): void {
    this.isScrollPaused = !this.isScrollPaused;
    if (this.btnScrollPause) {
      this.btnScrollPause.textContent = this.isScrollPaused ? '▶ RESUME SCROLL' : '⏸ PAUSE SCROLL';
    }
  }

  private toggleScrollSpeed(): void {
    if (this.scrollSpeedMultiplier === 1.0) {
      this.scrollSpeedMultiplier = 2.4;
      if (this.btnScrollSpeed) this.btnScrollSpeed.textContent = '⚡ 1X NORMAL';
    } else {
      this.scrollSpeedMultiplier = 1.0;
      if (this.btnScrollSpeed) this.btnScrollSpeed.textContent = '⚡ 2X SPEED';
    }
  }

  private startAutoScroll(): void {
    this.stopAutoScroll();
    if (!this.creditsViewport) return;

    this.creditsViewport.scrollTop = 0;
    this.isScrollPaused = false;
    this.scrollSpeedMultiplier = 1.0;
    this.lastScrollTimestamp = performance.now();

    const baseSpeed = 38; // pixels per second

    const step = (now: number) => {
      if (!this.creditsViewport) return;

      const dt = (now - this.lastScrollTimestamp) / 1000;
      this.lastScrollTimestamp = now;

      if (!this.isScrollPaused && dt > 0 && dt < 0.2) {
        const maxScroll = this.creditsViewport.scrollHeight - this.creditsViewport.clientHeight;
        if (this.creditsViewport.scrollTop < maxScroll) {
          this.creditsViewport.scrollTop += baseSpeed * this.scrollSpeedMultiplier * dt;
        }
      }

      this.scrollAnimId = requestAnimationFrame(step);
    };

    this.scrollAnimId = requestAnimationFrame(step);
  }

  private stopAutoScroll(): void {
    if (this.scrollAnimId !== null) {
      cancelAnimationFrame(this.scrollAnimId);
      this.scrollAnimId = null;
    }
  }

  public setOnRestart(cb: () => void): void {
    this.onRestartCallback = cb;
  }

  public setOnReturnToMainMenu(cb: () => void): void {
    this.onReturnToMainMenuCallback = cb;
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

    if (phaseNum === 1) {
      this.stopAutoScroll();
      phase1?.classList.remove('hidden');
    }
    if (phaseNum === 2) {
      this.stopAutoScroll();
      phase2?.classList.remove('hidden');
    }
    if (phaseNum === 3) {
      phase3?.classList.remove('hidden');
      this.startAutoScroll();
    }
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

    // Start ambient cinematic music if synthetic theme enabled
    this.startCinematicTheme();
  }

  public getCurrentPhase(): number {
    return this.currentPhase;
  }

  public hide(): void {
    this.stopAutoScroll();
    this.stopAudio();
    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.classList.add('hidden');
    }, 400);
  }

  public dispose(): void {
    this.stopAutoScroll();
    this.stopAudio();
    this.container.remove();
  }
}
