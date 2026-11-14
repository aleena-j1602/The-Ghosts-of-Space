import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';

export interface ReportSectionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  lunaComment: string;
  feedbackText: string;
}

export interface ProbeReportConfig {
  probeId: string;
  title: string;
  subtitle: string;
  designation: string;
  targetBody: string;
  agency: string;
  dates: string;
  sections: {
    purpose: {
      label: string;
      title: string;
      options: ReportSectionOption[];
    };
    science: {
      label: string;
      title: string;
      options: ReportSectionOption[];
    };
    legacy: {
      label: string;
      title: string;
      options: ReportSectionOption[];
    };
  };
  introDialogue: string;
  successDialogue: string;
}

export const PROBE_REPORT_CONFIGS: Record<string, ProbeReportConfig> = {
  'near-shoemaker': {
    probeId: 'near-shoemaker',
    title: 'NEAR SHOEMAKER // ASTEROID 433 EROS',
    subtitle: 'Discovery Program Mission 1 • First Asteroid Landing',
    designation: 'NASA / NSSDCA 1996-008A',
    targetBody: 'Asteroid 433 Eros & 253 Mathilde',
    agency: 'NASA / Johns Hopkins APL',
    dates: 'Launch: Feb 17, 1996 • Touchdown: Feb 12, 2001',
    introDialogue:
      '"All right, Explorer! We\'ve captured the telemetry stream from NEAR Shoemaker on 433 Eros. Let\'s design the official scientific dispatch for Earth Control! Select the verified mission facts to compile our report."',
    successDialogue:
      '"Outstanding work! High-gain dispatch for NEAR Shoemaker transmitted to Earth! Earth Command confirms receipt across the Deep Space Network."',
    sections: {
      purpose: {
        label: 'SECTION 1: HISTORICAL MISSION PURPOSE & FLIGHT OBJECTIVE',
        title: 'Select the primary historical mission profile of NEAR Shoemaker:',
        options: [
          {
            id: 'near_p_1',
            text: 'First spacecraft to orbit an asteroid, mapping 433 Eros\'s shape, gravity field, and surface morphology before an impromptu controlled landing.',
            isCorrect: true,
            lunaComment:
              '"Spot on! The flight team never even built landing legs for NEAR, but they guided it down at 1.9 m/s anyway—humanity\'s first touchdown on an asteroid!"',
            feedbackText: 'VERIFIED: NEAR completed 1 year of orbital study before an impromptu controlled landing on Feb 12, 2001.',
          },
          {
            id: 'near_p_2',
            text: 'High-speed kinetic impactor designed to shatter small near-Earth asteroids.',
            isCorrect: false,
            lunaComment:
              '"Wait, that sounds like the DART mission from 2022! NEAR was a dedicated orbiter and gentle science surveyor."',
            feedbackText: 'INCORRECT: NEAR was not a kinetic impactor; it was an orbiter and surveyor.',
          },
          {
            id: 'near_p_3',
            text: 'Deep solar radiation collector designed to test thermal dissipation near Mercury.',
            isCorrect: false,
            lunaComment:
              '"Too hot! NEAR headed outward toward the orbit of Mars and the asteroid belt, not inward toward Mercury."',
            feedbackText: 'INCORRECT: NEAR explored near-Earth asteroids, not Mercury.',
          },
        ],
      },
      science: {
        label: 'SECTION 2: SCIENTIFIC & ARCHAEOLOGICAL TELEMETRY',
        title: 'Select the verified scientific discoveries yielded by NEAR instruments:',
        options: [
          {
            id: 'near_s_1',
            text: 'X-Ray/Gamma-Ray Spectrometer confirmed 433 Eros is an undifferentiated primitive chondrite, preserving primordial materials from the solar system\'s birth.',
            isCorrect: true,
            lunaComment:
              '"Incredible science! That proved Eros never melted or formed separate core/mantle layers like Earth did—it\'s a pristine 4.5-billion-year-old time capsule!"',
            feedbackText: 'VERIFIED: Spectral data proved Eros is a primitive S-type asteroid from the dawn of the Solar System.',
          },
          {
            id: 'near_s_2',
            text: 'Discovered active geysers of liquid methane erupting from the Himeros saddle depression.',
            isCorrect: false,
            lunaComment:
              '"Haha, Eros is an airless rock with no atmosphere or liquid cryo-volcanoes! Let\'s inspect our spectrometer telemetry again."',
            feedbackText: 'INCORRECT: No geysers or liquids exist on asteroid Eros.',
          },
          {
            id: 'near_s_3',
            text: 'Detected artificial radio transmissions originating from beneath the regolith.',
            isCorrect: false,
            lunaComment:
              '"No alien radio stations on Eros, partner! Just pure cosmic radiation and solar wind reflections."',
            feedbackText: 'INCORRECT: Telemetry shows purely natural geological reflections.',
          },
        ],
      },
      legacy: {
        label: 'SECTION 3: ARCHIVAL LEGACY & PRESERVATION DIRECTIVE',
        title: 'Select the official archival classification for the Solar Heritage Registry:',
        options: [
          {
            id: 'near_l_1',
            text: 'Cosmic Heritage Monument: Rests peacefully in the southern Himeros region, proving spacecraft can touch down on low-gravity bodies without specialized landing gear.',
            isCorrect: true,
            lunaComment:
              '"That\'s going straight into the Solar Heritage Registry! What an engineering miracle to land an orbiter on an asteroid."',
            feedbackText: 'VERIFIED: NEAR operated for two weeks from the surface of Eros, sending back Gamma-Ray data.',
          },
          {
            id: 'near_l_2',
            text: 'Decommissioned booster module burned up in upper Earth atmosphere.',
            isCorrect: false,
            lunaComment:
              '"Nope, NEAR is still sitting right there on Eros today, 180 million kilometers away in the cosmic dark!"',
            feedbackText: 'INCORRECT: NEAR remains intact on the surface of 433 Eros.',
          },
          {
            id: 'near_l_3',
            text: 'Jettisoned solar sail experiment drifting past Jupiter.',
            isCorrect: false,
            lunaComment:
              '"Not a solar sail, Explorer! NEAR had rigid gallium arsenide solar arrays to harvest sunlight."',
            feedbackText: 'INCORRECT: NEAR was a dedicated Discovery Program probe.',
          },
        ],
      },
    },
  },

  'dawn-spacecraft': {
    probeId: 'dawn-spacecraft',
    title: 'DAWN SPACECRAFT // VESTA & CERES',
    subtitle: 'Discovery Program Mission 9 • Dual Planetary Body Orbiter',
    designation: 'NASA / JPL 2007-043A',
    targetBody: 'Protoplanet 4 Vesta & Dwarf Planet 1 Ceres',
    agency: 'NASA / JPL / DLR / ASI',
    dates: 'Launch: Sep 27, 2007 • Ceres Orbit: 2015-2018',
    introDialogue:
      '"Ion thruster telemetry locked! Dawn transformed our understanding of the asteroid belt. Let\'s assemble our Ceres & Vesta research report for Earth!"',
    successDialogue:
      '"Mission report dispatched! Earth Control confirms integration of Dawn\'s ion propulsion and Ceres faculae telemetry into the Master Archive!"',
    sections: {
      purpose: {
        label: 'SECTION 1: HISTORICAL MISSION PURPOSE & FLIGHT OBJECTIVE',
        title: 'Select the primary historical mission profile of Dawn:',
        options: [
          {
            id: 'dawn_p_1',
            text: 'First and only spacecraft to orbit two separate extraterrestrial bodies, using xenon ion propulsion to study dry rocky Vesta and icy dwarf planet Ceres.',
            isCorrect: true,
            lunaComment:
              '"Bingo! Xenon ion propulsion made Dawn a cosmic acrobat—orbiting Vesta first, then breaking orbit to travel to Ceres!"',
            feedbackText: 'VERIFIED: Dawn traveled over 6.9 billion km and orbited both Vesta (2011-2012) and Ceres (2015-2018).',
          },
          {
            id: 'dawn_p_2',
            text: 'Sample-return mission aimed at retrieving soil canisters from the Martian moon Phobos.',
            isCorrect: false,
            lunaComment:
              '"Phobos was targeted by Phobos-Grunt, not Dawn! Dawn was dedicated to the asteroid belt and dwarf planets."',
            feedbackText: 'INCORRECT: Dawn was an asteroid belt orbiter, not a sample-return craft.',
          },
          {
            id: 'dawn_p_3',
            text: 'Solar flare surveillance observatory parked at Sun-Earth Lagrange point L1.',
            isCorrect: false,
            lunaComment:
              '"That\'s SOHO or SDO! Dawn was cruising deep in the asteroid belt between Mars and Jupiter."',
            feedbackText: 'INCORRECT: Dawn journeyed deep into the main asteroid belt.',
          },
        ],
      },
      science: {
        label: 'SECTION 2: SCIENTIFIC & ARCHAEOLOGICAL TELEMETRY',
        title: 'Select the verified scientific discoveries yielded by Dawn instruments:',
        options: [
          {
            id: 'dawn_s_1',
            text: 'Discovered bright sodium carbonate faculae in Occator Crater on Ceres from brine eruptions, and mapped Vesta\'s massive Rheasilvia impact basin.',
            isCorrect: true,
            lunaComment:
              '"Those bright spots in Occator Crater fascinated astronomers worldwide! Cryovolcanic brines rising from deep within Ceres!"',
            feedbackText: 'VERIFIED: Dawn proved Ceres is a water-rich dwarf planet with cryovolcanic activity.',
          },
          {
            id: 'dawn_s_2',
            text: 'Detected dense clouds of oxygen and water vapor enveloping the peaks of Vesta.',
            isCorrect: false,
            lunaComment:
              '"Vesta is bone dry and airless! Its crust is basaltic rock with no atmosphere at all."',
            feedbackText: 'INCORRECT: Vesta lacks an atmosphere.',
          },
          {
            id: 'dawn_s_3',
            text: 'Recorded active tectonic continental drift on Ceres.',
            isCorrect: false,
            lunaComment:
              '"No plate tectonics on Ceres! Just impact craters, brine domes, and ice-rock mantle convection."',
            feedbackText: 'INCORRECT: Ceres does not possess continental plate tectonics.',
          },
        ],
      },
      legacy: {
        label: 'SECTION 3: ARCHIVAL LEGACY & PRESERVATION DIRECTIVE',
        title: 'Select the official archival classification for the Solar Heritage Registry:',
        options: [
          {
            id: 'dawn_l_1',
            text: 'Perpetual Orbital Guardian: Silent in stable orbit around Ceres for decades, protected under Planetary Protection protocol to preserve its subsurface ocean environment.',
            isCorrect: true,
            lunaComment:
              '"Perpetual silent orbit around Ceres... protected forever under planetary protection protocol! Fantastic report, Explorer!"',
            feedbackText: 'VERIFIED: Dawn\'s hydrazine was depleted in Oct 2018; it will orbit Ceres undisturbed for at least 50 years.',
          },
          {
            id: 'dawn_l_2',
            text: 'Controlled destructive impact into the surface of Vesta.',
            isCorrect: false,
            lunaComment:
              '"Dawn never crashed! NASA carefully placed it in a permanent stable orbit around Ceres to avoid contamination."',
            feedbackText: 'INCORRECT: Dawn remains in silent stable orbit.',
          },
          {
            id: 'dawn_l_3',
            text: 'Retrieved by an automated space tug and returned to lunar orbit.',
            isCorrect: false,
            lunaComment:
              '"Nobody has towed Dawn! It is out at 2.8 Astronomical Units in the asteroid belt."',
            feedbackText: 'INCORRECT: Dawn remains in deep asteroid belt orbit.',
          },
        ],
      },
    },
  },

  'pioneer-10': {
    probeId: 'pioneer-10',
    title: 'PIONEER 10 // INTERSTELLAR VOYAGER',
    subtitle: 'Outer Solar System Pioneer • Ambassador to the Stars',
    designation: 'NASA / Ames 1972-012A',
    targetBody: 'Jupiter & Outer Heliosphere / Interstellar Space',
    agency: 'NASA / Ames Research Center',
    dates: 'Launch: Mar 3, 1972 • Last Signal: Jan 23, 2003',
    introDialogue:
      '"Listen to that faint 8 GHz carrier signal... Pioneer 10 has been cruising through deep space since 1972! Let\'s build its final transmission report for humanity!"',
    successDialogue:
      '"Signal sent across billions of kilometers! Pioneer 10\'s legacy and humanity\'s Golden Plaque are immortalized in the Master Solar Heritage Archive!"',
    sections: {
      purpose: {
        label: 'SECTION 1: HISTORICAL MISSION PURPOSE & FLIGHT OBJECTIVE',
        title: 'Select the primary historical mission profile of Pioneer 10:',
        options: [
          {
            id: 'pioneer_p_1',
            text: 'First spacecraft to traverse the Asteroid Belt, first to fly past Jupiter, and first to achieve solar system escape velocity on an interstellar trajectory.',
            isCorrect: true,
            lunaComment:
              '"Think about that—before Pioneer 10, scientists didn\'t even know if a spacecraft could survive the asteroid belt! It blazed the trail for Voyager and New Horizons!"',
            feedbackText: 'VERIFIED: Pioneer 10 survived the asteroid belt in 1972 and reached Jupiter in December 1973.',
          },
          {
            id: 'pioneer_p_2',
            text: 'Solar flare monitoring probe designed to track sunspot cycles from Venus orbit.',
            isCorrect: false,
            lunaComment:
              '"Opposite direction! Pioneer 10 flew outward past Jupiter toward the stars, not inward toward Venus!"',
            feedbackText: 'INCORRECT: Pioneer 10 was an outer solar system deep space mission.',
          },
          {
            id: 'pioneer_p_3',
            text: 'Lunar orbiter designed to scout Apollo landing zones.',
            isCorrect: false,
            lunaComment:
              '"That was Lunar Orbiter! Pioneer 10 was destined for the outer gas giants and deep interstellar space."',
            feedbackText: 'INCORRECT: Pioneer 10 targeted Jupiter and deep interstellar space.',
          },
        ],
      },
      science: {
        label: 'SECTION 2: SCIENTIFIC & ARCHAEOLOGICAL TELEMETRY',
        title: 'Select the verified scientific discoveries yielded by Pioneer 10 instruments:',
        options: [
          {
            id: 'pioneer_s_1',
            text: 'Mapped Jupiter\'s intense radiation belts and magnetosphere, and measured the solar wind termination zone out to 80 astronomical units.',
            isCorrect: true,
            lunaComment:
              '"Jupiter\'s radiation belts nearly fried its electronics, but Pioneer held together and sent the first close-up images of the Great Red Spot!"',
            feedbackText: 'VERIFIED: Pioneer 10 revealed Jupiter\'s massive magnetic field and solar wind interactions.',
          },
          {
            id: 'pioneer_s_2',
            text: 'Discovered active liquid water rivers running across the surface of Callisto.',
            isCorrect: false,
            lunaComment:
              '"Callisto\'s surface is ancient cratered ice and rock at -140°C, no running rivers there!"',
            feedbackText: 'INCORRECT: Callisto has a frozen, heavily cratered crust.',
          },
          {
            id: 'pioneer_s_3',
            text: 'Captured direct audio recordings of windstorms inside Jupiter\'s core.',
            isCorrect: false,
            lunaComment:
              '"Sound cannot travel through the vacuum of space, Explorer! Pioneer detected radio waves and plasma oscillations."',
            feedbackText: 'INCORRECT: Pioneer 10 measured plasma and magnetosphere fields, not acoustic sound recordings.',
          },
        ],
      },
      legacy: {
        label: 'SECTION 3: ARCHIVAL LEGACY & PRESERVATION DIRECTIVE',
        title: 'Select the official archival classification for the Solar Heritage Registry:',
        options: [
          {
            id: 'pioneer_l_1',
            text: 'Humanity\'s Immortal Ambassador: Carries the gold-anodized Carl Sagan plaque illustrating human anatomy and Earth\'s pulsar coordinates, sailing toward Aldebaran.',
            isCorrect: true,
            lunaComment:
              '"The Golden Plaque... if an extraterrestrial intelligence ever finds it millions of years from now, they will know we existed and reached out. Goosebumps every single time!"',
            feedbackText: 'VERIFIED: Pioneer 10 is currently over 130 AU from Earth, heading toward the constellation Taurus.',
          },
          {
            id: 'pioneer_l_2',
            text: 'Fell into Jupiter\'s gravitational well and was crushed in its dense atmosphere.',
            isCorrect: false,
            lunaComment:
              '"That was the Galileo atmospheric probe! Pioneer 10 slingshotted right past Jupiter and out into interstellar space."',
            feedbackText: 'INCORRECT: Pioneer 10 achieved escape velocity and left the planetary system.',
          },
          {
            id: 'pioneer_l_3',
            text: 'Stored in a climate-controlled vault at the Smithsonian National Air and Space Museum.',
            isCorrect: false,
            lunaComment:
              '"A replica is in Washington, but the real Pioneer 10 is sailing in the dark void between the stars!"',
            feedbackText: 'INCORRECT: Pioneer 10 is in deep interstellar space.',
          },
        ],
      },
    },
  },
};

export class ReportDesignerUI {
  private container: HTMLElement;
  private currentConfig: ProbeReportConfig | null = null;
  private currentArtifact: ArtifactDefinition | null = null;

  // Selected option ids for each section
  private selectedPurpose: ReportSectionOption | null = null;
  private selectedScience: ReportSectionOption | null = null;
  private selectedLegacy: ReportSectionOption | null = null;

  private onReportTransmittedCallback?: (artifact: ArtifactDefinition) => void;
  private audioCtx: AudioContext | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'report-designer-overlay';
    this.container.className = 'report-designer-overlay hidden';

    this.container.innerHTML = `
      <div class="report-designer-modal glass-card">
        <!-- Header -->
        <div class="rd-header">
          <div class="rd-header-left">
            <div class="card-tag">DEEP SPACE NETWORK // SCIENCE DISPATCH COMPILER</div>
            <h1 id="rd-probe-title">PROBE REPORT COMPILER</h1>
            <div id="rd-probe-subtitle" class="rd-subtitle">Select mission telemetry &amp; compile findings for Earth Command</div>
          </div>
          <div class="rd-telemetry-badge">
            <span class="pulse-dot-cyan"></span>
            <span>8.4 GHz X-BAND DSN RELAY ONLINE</span>
          </div>
          <button id="btn-close-report-designer" class="map-close-btn">&times;</button>
        </div>

        <!-- Body: 2 Columns -->
        <div class="rd-body">
          <!-- Left Column: Report Construction Workbench -->
          <div class="rd-workbench-pane">
            <!-- Step 1: Purpose -->
            <div class="rd-section-card glass-card">
              <div class="rd-section-head">
                <span id="rd-step1-tag" class="rd-step-num">STEP 1</span>
                <span id="rd-step1-title" class="rd-step-title">HISTORICAL MISSION PURPOSE</span>
                <span id="rd-step1-status" class="rd-step-badge badge-pending">PENDING</span>
              </div>
              <p id="rd-step1-prompt" class="rd-prompt-text">Select the primary mission profile:</p>
              <div id="rd-step1-options" class="rd-options-list"></div>
            </div>

            <!-- Step 2: Science -->
            <div class="rd-section-card glass-card">
              <div class="rd-section-head">
                <span id="rd-step2-tag" class="rd-step-num">STEP 2</span>
                <span id="rd-step2-title" class="rd-step-title">SCIENTIFIC &amp; ARCHAEOLOGICAL TELEMETRY</span>
                <span id="rd-step2-status" class="rd-step-badge badge-pending">PENDING</span>
              </div>
              <p id="rd-step2-prompt" class="rd-prompt-text">Select verified scientific instruments &amp; telemetry:</p>
              <div id="rd-step2-options" class="rd-options-list"></div>
            </div>

            <!-- Step 3: Legacy -->
            <div class="rd-section-card glass-card">
              <div class="rd-section-head">
                <span id="rd-step3-tag" class="rd-step-num">STEP 3</span>
                <span id="rd-step3-title" class="rd-step-title">SOLAR HERITAGE PRESERVATION DIRECTIVE</span>
                <span id="rd-step3-status" class="rd-step-badge badge-pending">PENDING</span>
              </div>
              <p id="rd-step3-prompt" class="rd-prompt-text">Select archival preservation classification:</p>
              <div id="rd-step3-options" class="rd-options-list"></div>
            </div>

            <!-- Luna Live Commentary Assistant -->
            <div class="rd-luna-commentary glass-card">
              <div class="rd-luna-badge">
                <span class="pulse-dot-cyan"></span>
                <span>LUNA RESEARCH COMPANION:</span>
              </div>
              <p id="rd-luna-bubble" class="rd-luna-text">
                "Welcome to the Deep Space Dispatch Terminal, Explorer! Choose the authentic mission facts to construct our official report."
              </p>
            </div>
          </div>

          <!-- Right Column: Live Earth Dispatch Preview -->
          <div class="rd-preview-pane">
            <div class="rd-document-card glass-card">
              <div class="rd-doc-header">
                <div class="rd-doc-seal">★ NASA / DSN ARCHIVAL TELEMETRY ★</div>
                <div class="rd-doc-title">OFFICIAL SCIENCE DISPATCH</div>
                <div class="rd-doc-meta" id="rd-doc-meta">TARGET: -- | DSN RELAY: ACTIVE</div>
              </div>

              <div class="rd-doc-body">
                <div class="rd-doc-section">
                  <div class="rd-doc-label">1.0 MISSION PROFILE &amp; HISTORICAL OBJECTIVE</div>
                  <div id="rd-doc-p1" class="rd-doc-text placeholder">[AWAITING SELECTION: STEP 1]</div>
                </div>

                <div class="rd-doc-section">
                  <div class="rd-doc-label">2.0 SCIENTIFIC TELEMETRY &amp; DISCOVERIES</div>
                  <div id="rd-doc-p2" class="rd-doc-text placeholder">[AWAITING SELECTION: STEP 2]</div>
                </div>

                <div class="rd-doc-section">
                  <div class="rd-doc-label">3.0 ARCHAEOLOGICAL HERITAGE DIRECTIVE</div>
                  <div id="rd-doc-p3" class="rd-doc-text placeholder">[AWAITING SELECTION: STEP 3]</div>
                </div>
              </div>

              <div class="rd-doc-footer">
                <div id="rd-doc-auth-stamp" class="rd-doc-stamp stamp-pending">DRAFT // UNVERIFIED</div>
                <div class="rd-doc-signature">
                  <span>DISPATCHED BY: GHOST ARCHIVE EXPEDITION</span>
                  <span id="rd-doc-timestamp">SOLAR CYCLE: DEEP SPACE 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="rd-footer">
          <div class="rd-footer-info">
            <span id="rd-compiled-status" class="rd-status-label">SECTIONS COMPILED: 0 / 3</span>
          </div>
          <button id="btn-transmit-dispatch" class="btn-primary" disabled>
            <kbd>T</kbd> TRANSMIT HIGH-GAIN DISPATCH TO EARTH COMMAND ▶
          </button>
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

  private playTone(freq: number, durationSec: number = 0.15, type: OscillatorType = 'sine'): void {
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
      // Audio fallback
    }
  }

  private bindEvents(): void {
    const btnClose = this.container.querySelector('#btn-close-report-designer');
    btnClose?.addEventListener('click', () => {
      this.hide();
    });

    const btnTransmit = this.container.querySelector('#btn-transmit-dispatch') as HTMLButtonElement;
    btnTransmit?.addEventListener('click', () => {
      this.transmitReport();
    });
  }

  public setOnReportTransmitted(cb: (artifact: ArtifactDefinition) => void): void {
    this.onReportTransmittedCallback = cb;
  }

  public isOpen(): boolean {
    return !this.container.classList.contains('hidden');
  }

  public openReportDesigner(artifact: ArtifactDefinition): void {
    this.currentArtifact = artifact;
    const config = PROBE_REPORT_CONFIGS[artifact.id];
    if (!config) {
      console.warn(`No probe report configuration found for ${artifact.id}`);
      return;
    }
    this.currentConfig = config;

    this.selectedPurpose = null;
    this.selectedScience = null;
    this.selectedLegacy = null;

    // Set header
    const titleEl = this.container.querySelector('#rd-probe-title');
    const subtitleEl = this.container.querySelector('#rd-probe-subtitle');
    const metaEl = this.container.querySelector('#rd-doc-meta');
    if (titleEl) titleEl.textContent = config.title;
    if (subtitleEl) subtitleEl.textContent = `${config.subtitle} • ${config.agency}`;
    if (metaEl) metaEl.textContent = `TARGET: ${config.targetBody} | ${config.dates}`;

    // Reset preview
    this.updatePreviewDocument();

    // Render Section 1
    this.renderSection(
      'step1',
      config.sections.purpose.title,
      config.sections.purpose.options,
      (opt) => {
        this.selectedPurpose = opt;
        this.onOptionSelected(opt, 'step1');
      }
    );

    // Render Section 2
    this.renderSection(
      'step2',
      config.sections.science.title,
      config.sections.science.options,
      (opt) => {
        this.selectedScience = opt;
        this.onOptionSelected(opt, 'step2');
      }
    );

    // Render Section 3
    this.renderSection(
      'step3',
      config.sections.legacy.title,
      config.sections.legacy.options,
      (opt) => {
        this.selectedLegacy = opt;
        this.onOptionSelected(opt, 'step3');
      }
    );

    // Set intro dialogue
    this.setLunaComment(config.introDialogue);

    // Show container
    this.container.classList.remove('hidden');
    this.container.style.opacity = '1';
    this.playTone(620, 0.2, 'sine');
  }

  private renderSection(
    prefix: 'step1' | 'step2' | 'step3',
    title: string,
    options: ReportSectionOption[],
    onSelect: (opt: ReportSectionOption) => void
  ): void {
    const promptEl = this.container.querySelector(`#rd-${prefix}-prompt`);
    const optionsEl = this.container.querySelector(`#rd-${prefix}-options`);
    const statusEl = this.container.querySelector(`#rd-${prefix}-status`);

    if (promptEl) promptEl.textContent = title;
    if (statusEl) {
      statusEl.className = 'rd-step-badge badge-pending';
      statusEl.textContent = 'PENDING';
    }

    if (!optionsEl) return;
    optionsEl.innerHTML = '';

    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'rd-option-btn';
      btn.innerHTML = `
        <span class="option-check">○</span>
        <span class="option-text">${opt.text}</span>
      `;

      btn.addEventListener('click', () => {
        // Deselect siblings
        optionsEl.querySelectorAll('.rd-option-btn').forEach((b) => {
          b.classList.remove('selected', 'correct', 'incorrect');
          const check = b.querySelector('.option-check');
          if (check) check.textContent = '○';
        });

        btn.classList.add('selected');
        const check = btn.querySelector('.option-check');
        if (check) check.textContent = '●';

        onSelect(opt);
      });

      optionsEl.appendChild(btn);
    });
  }

  private onOptionSelected(opt: ReportSectionOption, prefix: 'step1' | 'step2' | 'step3'): void {
    const statusEl = this.container.querySelector(`#rd-${prefix}-status`);
    const optionsEl = this.container.querySelector(`#rd-${prefix}-options`);
    const activeBtn = optionsEl?.querySelector('.rd-option-btn.selected');

    if (opt.isCorrect) {
      this.playTone(740, 0.22, 'sine');
      if (statusEl) {
        statusEl.className = 'rd-step-badge badge-verified';
        statusEl.textContent = '✓ VERIFIED';
      }
      if (activeBtn) {
        activeBtn.classList.add('correct');
      }
    } else {
      this.playTone(320, 0.25, 'triangle');
      if (statusEl) {
        statusEl.className = 'rd-step-badge badge-incorrect';
        statusEl.textContent = '⚠ REVIEW';
      }
      if (activeBtn) {
        activeBtn.classList.add('incorrect');
      }
    }

    this.setLunaComment(opt.lunaComment);
    this.updatePreviewDocument();
  }

  private setLunaComment(comment: string): void {
    const bubble = this.container.querySelector('#rd-luna-bubble') as HTMLElement | null;
    if (bubble) {
      bubble.textContent = comment;
      bubble.style.animation = 'none';
      void bubble.offsetHeight; // force reflow
      bubble.style.animation = 'fadeSlideUp 0.3s ease-out forwards';
    }
  }

  private updatePreviewDocument(): void {
    const docP1 = this.container.querySelector('#rd-doc-p1');
    const docP2 = this.container.querySelector('#rd-doc-p2');
    const docP3 = this.container.querySelector('#rd-doc-p3');
    const stampEl = this.container.querySelector('#rd-doc-auth-stamp');
    const statusLabel = this.container.querySelector('#rd-compiled-status');
    const btnTransmit = this.container.querySelector('#btn-transmit-dispatch') as HTMLButtonElement;

    let compiledCount = 0;

    if (this.selectedPurpose) {
      if (docP1) {
        docP1.textContent = this.selectedPurpose.text;
        docP1.classList.remove('placeholder');
      }
      if (this.selectedPurpose.isCorrect) compiledCount++;
    } else if (docP1) {
      docP1.textContent = '[AWAITING SELECTION: STEP 1]';
      docP1.classList.add('placeholder');
    }

    if (this.selectedScience) {
      if (docP2) {
        docP2.textContent = this.selectedScience.text;
        docP2.classList.remove('placeholder');
      }
      if (this.selectedScience.isCorrect) compiledCount++;
    } else if (docP2) {
      docP2.textContent = '[AWAITING SELECTION: STEP 2]';
      docP2.classList.add('placeholder');
    }

    if (this.selectedLegacy) {
      if (docP3) {
        docP3.textContent = this.selectedLegacy.text;
        docP3.classList.remove('placeholder');
      }
      if (this.selectedLegacy.isCorrect) compiledCount++;
    } else if (docP3) {
      docP3.textContent = '[AWAITING SELECTION: STEP 3]';
      docP3.classList.add('placeholder');
    }

    if (statusLabel) {
      statusLabel.textContent = `SECTIONS VERIFIED: ${compiledCount} / 3`;
    }

    const isFullyVerified = compiledCount === 3;

    if (stampEl) {
      if (isFullyVerified) {
        stampEl.className = 'rd-doc-stamp stamp-verified';
        stampEl.textContent = '★ AUTHENTICATED // READY FOR DSN RELAY ★';
      } else {
        stampEl.className = 'rd-doc-stamp stamp-pending';
        stampEl.textContent = 'DRAFT // VERIFICATION INCOMPLETE';
      }
    }

    if (btnTransmit) {
      btnTransmit.disabled = !isFullyVerified;
      if (isFullyVerified) {
        btnTransmit.classList.add('glow-ready');
      } else {
        btnTransmit.classList.remove('glow-ready');
      }
    }
  }

  private transmitReport(): void {
    if (!this.currentArtifact || !this.currentConfig) return;

    // Transmission chirp
    this.playTone(880, 0.35, 'square');

    // Create high-gain transmission animation
    const btnTransmit = this.container.querySelector('#btn-transmit-dispatch') as HTMLButtonElement;
    if (btnTransmit) {
      btnTransmit.disabled = true;
      btnTransmit.innerHTML = '<span class="pulse-dot-cyan"></span> TRANSMITTING VIA DSN RELAY...';
    }

    setTimeout(() => {
      this.playTone(1100, 0.4, 'sine');
      this.hide();

      if (this.onReportTransmittedCallback && this.currentArtifact) {
        this.onReportTransmittedCallback(this.currentArtifact);
      }
    }, 1200);
  }

  public hide(): void {
    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.classList.add('hidden');
    }, 300);
  }
}
