export interface ArtifactComponent {
  id: string;
  name: string;
  role: string;
  howItWorked: string;
  whyItMattered: string;
}

export interface ArtifactChallenge {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface SpaceArtifact {
  id: string;
  name: string;
  level: 'MOON' | 'MARS' | 'DEEP_SPACE';
  locationName: string;
  year: number | string;
  agency: string;
  purpose: string;
  description: string;
  historicalStory: string;
  scientificImportance: string;
  currentStatus: string;
  coordinates: { x: number; y: number; z: number };
  points: number;
  isCollected: boolean;
  components: ArtifactComponent[];
  challenge: ArtifactChallenge;
}

export const ARTIFACTS_DATA: Record<string, SpaceArtifact> = {
  apollo11_eagle: {
    id: 'apollo11_eagle',
    name: 'Tranquility Base: LM-5 Eagle Descent Stage & EASEP',
    level: 'MOON',
    locationName: 'Mare Tranquillitatis (Sea of Tranquility) — 0.67416° N, 23.47314° E',
    year: 1969,
    agency: 'NASA — Office of Manned Space Flight',
    purpose: 'Land two astronauts on the Moon and return them safely; demonstrate crewed landing and surface operations; collect samples and deploy a minimal scientific package.',
    description: 'The descent stage of the first crewed lunar landing: an octagonal structure 4.2 m across and 1.7 m thick on four legs spanning 9.4 m, with a residual engine bell protruding about 1 m below the deck, wrapped in thermal and micrometeoroid blankets. Nearby stand the 48 kg Early Apollo Scientific Experiment Package (EASEP) deployed 17 m south, and the Laser Ranging Retroreflector (LRRR) — a bench of fused-silica corner cubes that still returns laser pulses to Earth.',
    historicalStory: 'On 20 July 1969 at 20:17:40 UTC, the Eagle landed in Mare Tranquillitatis with roughly 30 seconds of descent fuel remaining. During the final approach, program alarms 1202 and 1201 fired — the guidance computer was overloaded and shedding low-priority tasks, but kept critical guidance running. Armstrong took semi-manual control, flew past a boulder-strewn crater, and chose a clear spot. The crew stood the entire descent — no seats in the 6.65 m³ cabin. Armstrong stepped onto the surface at 02:56:15 UTC on 21 July. The ascent stage lifted off at 17:54:01 UTC, knocking the flag over, docked with Columbia, and was jettisoned into lunar orbit at 00:01:01 UTC on 22 July. Its fate is unknown — NASA assesses it likely crashed within one to four months, but no impact site has ever been found.',
    scientificImportance: 'First crewed landing on another world and first crewed liftoff from one. The EASEP operated from 21 July to 27 August 1969, recording seismic data and dust accumulation. The LRRR has been functioning since the moment it was set down — no power, no electronics, no moving parts — returning laser pulses that measure the Earth–Moon distance to the centimetre. One component of Tranquility Base is still doing physics.',
    currentStatus: 'Descent stage, EASEP and LRRR remain on the surface, immobile and exposed. The LRRR still returns laser pulses — roughly one photon every few seconds. The EASEP has been inert since August 1969. The ascent stage is unlocated. The site is protected under the U.S. One Small Step Act (PL 116-275) and the Artemis Accords heritage provisions.',
    coordinates: { x: 35, y: 0, z: 20 },
    points: 300,
    isCollected: false,
    components: [
      {
        id: 'engine_bell',
        name: 'Descent Engine Bell',
        role: 'Deep-throttling ablative rocket nozzle that slowed the landing, allowing the pilot to hover and steer.',
        howItWorked: 'Maximum thrust about 45,000 N, throttleable down to a fraction of full power. The deep throttling let the crew slow gradually, hover, drift sideways and choose a landing spot. The nozzle survived by slowly burning away and carrying heat with it — an ablative design.',
        whyItMattered: 'The first throttleable descent engine for crewed spaceflight. Without it, there is no piloted landing — only an automated impact or a manual abort. Interior scoured bright by exhaust; skirt hangs about 1 m below the deck.',
      },
      {
        id: 'landing_legs',
        name: 'Landing Legs, Ladder & Dedication Plaque',
        role: 'Four legs absorbing touchdown (9.4 m span), plus the crew egress route and the heritage plaque.',
        howItWorked: 'Each leg ended in a footpad with a contact probe that told the crew the surface was reached. One leg carries the ladder and the small egress platform. The plaque reads: "Here men from the planet Earth first set foot on the Moon July 1969, A.D. We came in peace for all mankind."',
        whyItMattered: 'The descent stage became the launch pad — the first "leave the landing gear behind" design. That single engineering decision is why Tranquility Base exists as a physical site rather than a memory.',
      },
      {
        id: 'easep',
        name: 'EASEP Base Unit, Seismometer & Dust Detector',
        role: 'Early Apollo Scientific Experiment Package — the first autonomous science station on another world.',
        howItWorked: 'A square base unit with antenna mast and two canted solar panels, deployed 17 m south of the LM. Carried a passive seismometer (listened for moonquakes with no moving parts), a lunar dust detector, and communicated at 2276.5 MHz downlink / 2119 MHz uplink. Total mass 48 kg.',
        whyItMattered: 'Operated from 21 July to 27 August 1969 — three weeks of Earth time, one lunar day of work. The forerunner of the larger ALSEP packages, it proved science could be done on a tight schedule on another world.',
      },
      {
        id: 'lrrr',
        name: 'Laser Ranging Retroreflector (LRRR)',
        role: 'A bench of fused-silica corner cubes that bounces laser pulses straight back to Earth — still active after 57 years.',
        howItWorked: 'Three mutually perpendicular mirror faces per cube return any incoming laser pulse along exactly the path it arrived. Deployed ~5 m NNW of the EASEP. Earth stations fire laser pulses and count returning photons — roughly one every few seconds under good conditions.',
        whyItMattered: 'Still functioning since 1969 with no power and no moving parts. Measures the Earth–Moon distance to the centimetre and the Moon\'s wobble. This is why the artifact is not simply a ruin — one component is still on task, still measuring, still answering when Earth calls.',
      },
    ],
    challenge: {
      question: 'Why is the Apollo 11 flag lying flat on the lunar surface?',
      options: [
        'It was never properly planted — the crew ran out of time.',
        'The lunar wind blew it down.',
        'The ascent stage\'s engine exhaust knocked it over at liftoff.',
        'Micrometeoroid impacts destroyed the pole over fifty years.',
      ],
      correctIndex: 2,
      explanation: 'The flag was knocked over when the ascent stage lifted off 21 hours after landing. The Moon has no atmosphere, so there is no wind to blow anything down. The crew did struggle to extend the horizontal rod, but the flag was standing when they left — it fell because of a rocket, not because of a mistake.',
      hint: 'What is the only thing at this site that ever moved fast enough to knock something over?',
    },
  },

  apollo_rover: {
    id: 'apollo_rover',
    name: 'Apollo Lunar Roving Vehicle (LRV)',
    level: 'MOON',
    locationName: 'Taurus-Littrow Valley',
    year: '1971–1972',
    agency: 'NASA',
    purpose: 'Electric four-wheeled vehicle engineered to expand lunar surface exploration radius.',
    description: 'Colloquially known as the "Moon Buggy", this battery-powered rover was deployed on Apollo 15, 16, and 17, expanding astronaut traverse distance from hundreds of meters to tens of kilometers.',
    historicalStory: 'Folded origami-style into the side quad of the Lunar Module descent stage, the LRV was unfolded with a series of pulleys and ropes. On Apollo 17, Gene Cernan and Harrison Schmitt drove 35.7 kilometers across Taurus-Littrow, discovering orange volcanic soil.',
    scientificImportance: 'Revolutionized planetary field geology by allowing astronauts to carry hundreds of pounds of rock samples, heavy core drills, and long-range seismic transmitters across diverse geological formations.',
    currentStatus: 'Three rovers remain permanently parked on the Moon (Hadley-Apennine, Descartes, and Taurus-Littrow), their color cameras left pointed skyward.',
    coordinates: { x: -40, y: 0, z: 50 },
    points: 250,
    isCollected: false,
    components: [
      {
        id: 'wire_wheels',
        name: 'Woven Piano-Wire Mesh Wheels',
        role: 'Provided traction on powdery, abrasive lunar regolith.',
        howItWorked: 'Spun from zinc-coated piano wire with titanium chevron treads instead of inflatable rubber tires, which would burst in a vacuum.',
        whyItMattered: 'Prevented flats from jagged volcanic shards and coped with temperature extremes between -160°C and +120°C.',
      },
      {
        id: 'high_gain_dish',
        name: 'High-Gain Mesh Umbrella Antenna',
        role: 'Direct S-band high-bandwidth telemetry and color TV link to Earth.',
        howItWorked: 'Manually aimed through an optical sighting scope directly at Earth to beam color video and biomedical telemetry.',
        whyItMattered: 'Allowed Mission Control in Houston to guide geology traverses in real time and watch the LM lift off from the Moon.',
      },
      {
        id: 't_handle',
        name: 'T-Handle Hand Controller',
        role: 'Unified fly-by-wire steering, acceleration, and braking.',
        howItWorked: 'Single joystick between both seats. Pushing forward accelerated, pulling back braked, and tilting left/right steered all 4 wheels.',
        whyItMattered: 'Could be operated by either astronaut wearing stiff, pressurized spacesuit gloves that could not use foot pedals.',
      },
      {
        id: 'dual_seats',
        name: 'Foldable Mesh Lawn-Chair Seats',
        role: 'Suspended the crew with secure Velcro seatbelts over rugged terrain.',
        howItWorked: 'Tubular aluminum frames with woven nylon mesh straps designed to accommodate bulky PLSS life-support backpacks.',
        whyItMattered: 'Kept astronauts secured despite low gravity making the rover bounce airborne over rocks at 13 km/h.',
      },
    ],
    challenge: {
      question: 'Why were the Lunar Roving Vehicle’s tires made of woven piano wire instead of rubber?',
      options: [
        'Rubber was too heavy to carry on the Saturn V rocket.',
        'Rubber would deteriorate, lose flexibility, and burst in the lunar vacuum and extreme temperature swings.',
        'The lunar surface magnetic field would melt synthetic rubber.',
        'Wire tires were cheaper to manufacture than rubber tires.',
      ],
      correctIndex: 1,
      explanation: 'Traditional pneumatic rubber tires cannot operate in a space vacuum (risk of bursting) and become brittle or melt between lunar night (-160°C) and direct lunar sunlight (+120°C). Woven wire mesh with titanium chevrons provided superior resilient traction.',
      hint: 'Consider vacuum pressure and temperatures swinging by almost 300 degrees Celsius.',
    },
  },

  apollo_alsep: {
    id: 'apollo_alsep',
    name: 'ALSEP Scientific Experiment Station',
    level: 'MOON',
    locationName: 'Oceanus Procellarum (Ocean of Storms)',
    year: '1969–1972',
    agency: 'NASA',
    purpose: 'Long-duration autonomous station measuring moonquakes, solar wind, magnetic fields, and lunar heat flow.',
    description: 'The Apollo Lunar Surface Experiments Package (ALSEP) comprised a central data relay powered by nuclear energy, surrounded by distributed geophysical sensors.',
    historicalStory: 'Deployed hundreds of meters from the lander to prevent thruster contamination, ALSEP stations operated continuously for up to eight years, transmitting data until turned off by NASA in September 1977 due to budget constraints.',
    scientificImportance: 'Detected thousands of deep and shallow moonquakes, meteorite impacts, and deliberate rocket stage crashes. This revealed that the Moon possesses a distinct crust, mantle, and small iron-rich metallic core.',
    currentStatus: 'Decommissioned stations remain silently stationed across five Apollo landing sites.',
    coordinates: { x: 10, y: 0, z: -45 },
    points: 200,
    isCollected: false,
    components: [
      {
        id: 'central_station',
        name: 'Central Station & Helical Antenna',
        role: 'Data processor, power distributor, and transmitter to Earth.',
        howItWorked: 'Controlled scientific instruments, digitized geophysical signals, and transmitted continuous S-band data back to NASA’s Deep Space Network.',
        whyItMattered: 'Acted as the robotic scientific brain that communicated findings across 384,000 km for nearly a decade.',
      },
      {
        id: 'snap27_rtg',
        name: 'SNAP-27 Radioisotope Thermoelectric Generator',
        role: 'Nuclear power source generating continuous electricity.',
        howItWorked: 'Thermocouples converted heat from the radioactive decay of Plutonium-238 into 73 watts of steady direct current.',
        whyItMattered: 'Solar panels would freeze and die during the 14-day lunar night. Nuclear decay provided steady power through freezing darkness.',
      },
      {
        id: 'seismometer',
        name: 'Passive Seismic Experiment (PSE)',
        role: 'High-sensitivity detection of seismic vibrations and moonquakes.',
        howItWorked: 'Tri-axis pendulums enclosed under a thermal foil shroud measured vibrations as small as one nanometer.',
        whyItMattered: 'Unveiled the internal layers of the Moon and proved that tidal stresses from Earth induce deep moonquakes.',
      },
      {
        id: 'solar_wind',
        name: 'Solar Wind Spectrometer',
        role: 'Analyzed charged particles streaming from the Sun.',
        howItWorked: 'Curved Faraday cups measured the speed, direction, and density of solar wind electrons and protons striking the Moon.',
        whyItMattered: 'Revealed how interplanetary solar wind interacts with an unshielded, atmosphere-free planetary body.',
      },
    ],
    challenge: {
      question: 'Why did the ALSEP stations use a Plutonium-238 nuclear generator (RTG) instead of solar panels?',
      options: [
        'Solar panels were prohibited under international space treaties.',
        'Solar panels would fail to generate power during the two-week-long freezing lunar night.',
        'The Sun’s light was too strong and would burn solar cells.',
        'Nuclear power was required to heat the astronauts’ return cabin.',
      ],
      correctIndex: 1,
      explanation: 'A lunar night lasts 14 Earth days (roughly 354 hours of total darkness) with temperatures dropping below -150°C. The SNAP-27 RTG nuclear power source produced continuous heat and electricity uninterrupted through the deep freeze.',
      hint: 'How long does darkness last on the Moon during a single lunar cycle?',
    },
  },

  // ── MARS ──────────────────────────────────────────────────────────────────

  sojourner: {
    id: 'sojourner',
    name: 'Sojourner Rover',
    level: 'MARS',
    locationName: 'Ares Vallis',
    year: 1997,
    agency: 'NASA',
    purpose: 'First Mars rover, demonstrate robotic surface exploration.',
    description: 'A microwave-oven-sized rover delivered by Mars Pathfinder that proved wheeled robots could explore another planet.',
    historicalStory: 'Sojourner operated for 83 Martian days — far beyond its 7-day design life. It analyzed 16 rocks and confirmed Mars once had liquid water. When the Pathfinder lander lost communication, Sojourner continued circling it autonomously for weeks.',
    scientificImportance: 'Proved the feasibility of autonomous wheeled Mars exploration and found geochemical evidence of a warmer, wetter Mars past.',
    currentStatus: 'Silent on the Ares Vallis floodplain since September 1997 — first rover to become a permanent Martian monument.',
    coordinates: { x: 25, y: 0, z: 30 },
    points: 350,
    isCollected: false,
    components: [
      {
        id: 'solar_panel',
        name: 'Gallium Arsenide Solar Array',
        role: 'Primary power source',
        howItWorked: 'Triple-junction GaAs cells convert sunlight to electricity; battery stores overnight power',
        whyItMattered: 'Demonstrated solar power viability on Mars despite dust — enabled all subsequent solar-powered Mars missions',
      },
      {
        id: 'apxs',
        name: 'Alpha Proton X-ray Spectrometer (APXS)',
        role: 'Rock composition analyser',
        howItWorked: 'Bombarded rock surfaces with alpha particles and measured returned spectra to identify elemental composition',
        whyItMattered: 'Discovered rocks like "Barnacle Bill" were andesite, implying ancient volcanic activity with water interaction',
      },
      {
        id: 'rocm_wheels',
        name: 'Six-Wheel Rocker-Bogie Drive',
        role: 'All-terrain mobility system',
        howItWorked: 'Passive rocker-bogie linkage distributes weight so any 4 wheels stay grounded over rocks twice wheel diameter',
        whyItMattered: 'Invented for Sojourner; now used on every Mars rover — Curiosity and Perseverance still use this design',
      },
      {
        id: 'laser_range',
        name: 'Hazard Avoidance System',
        role: 'Obstacle detection',
        howItWorked: 'Laser stripers and cameras detected obstacles up to 1m ahead; ground controllers reviewed images and sent daily drive commands',
        whyItMattered: 'First autonomous hazard detection system deployed on another planet',
      },
    ],
    challenge: {
      question: 'How long did Sojourner operate beyond its 7-day design life?',
      options: ['3 weeks', '83 Martian sols', '18 months', 'One Martian year'],
      correctIndex: 1,
      explanation: 'Sojourner operated for 83 Martian sols — nearly 12 times its planned mission duration — demonstrating remarkable robustness.',
      hint: 'Count the Martian days.',
    },
  },

  spirit: {
    id: 'spirit',
    name: 'Spirit Rover',
    level: 'MARS',
    locationName: 'Gusev Crater',
    year: 2004,
    agency: 'NASA',
    purpose: 'Investigate geological evidence of past water on Mars.',
    description: 'A golf cart-sized solar-powered rover that explored Gusev Crater, landing January 4, 2004.',
    historicalStory: 'Spirit was designed for a 90-sol mission but operated for 2,208 sols. After its right-front wheel failed in 2006, it drove backward — using the failed wheel as a plow that accidentally uncovered silica-rich soil, one of its greatest discoveries.',
    scientificImportance: 'Discovered silica-rich soil in Gusev Crater, indicating past hydrothermal activity — the strongest evidence yet for a once-habitable Mars environment.',
    currentStatus: 'Silent since March 22, 2010, permanently stuck in soft soil on the edge of Troy plateau, Mars.',
    coordinates: { x: -35, y: 0, z: 45 },
    points: 300,
    isCollected: false,
    components: [
      {
        id: 'panoramic_cam',
        name: 'Panoramic Camera (Pancam)',
        role: 'High-resolution stereo imaging',
        howItWorked: 'Two cameras with 8-filter wheel took stereo images; color science filters revealed mineral composition from color',
        whyItMattered: 'Returned 128,000 images; documented complete geological context of explored terrain',
      },
      {
        id: 'mini_tes',
        name: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
        role: 'Remote mineral identification',
        howItWorked: 'Measured infrared radiation emitted by rocks and soil to identify mineral composition at a distance',
        whyItMattered: 'Identified carbonates and minerals indicating past liquid water interaction',
      },
      {
        id: 'rac',
        name: 'Rock Abrasion Tool (RAT)',
        role: 'Rock surface preparation tool',
        howItWorked: 'Diamond-studded grinding wheel removed weathered surface layer to expose fresh rock interior for analysis',
        whyItMattered: 'Only way to access unweathered rock interiors; revealed olivine-bearing basalts suggesting ancient dry geology',
      },
      {
        id: 'mobility_system',
        name: 'Mobility System with Failed Wheel',
        role: 'Six-wheel all-terrain drive',
        howItWorked: 'Rocker-bogie suspension; right-front wheel motor failed 2006, so Spirit drove in reverse dragging the wheel',
        whyItMattered: "Dragged wheel accidentally uncovered bright silica soil — Spirit's single most significant scientific discovery",
      },
    ],
    challenge: {
      question: "What did Spirit's broken wheel accidentally discover?",
      options: ['Underground ice', 'Silica-rich soil indicating hydrothermal activity', 'Iron oxide hematite', 'A meteorite'],
      correctIndex: 1,
      explanation: "Spirit's dragging broken wheel ploughed up bright silica-rich soil — the strongest evidence for past hydrothermal or liquid water activity ever found in Gusev Crater.",
      hint: 'What does a malfunctioning plow reveal?',
    },
  },

  opportunity: {
    id: 'opportunity',
    name: 'Opportunity Rover',
    level: 'MARS',
    locationName: 'Meridiani Planum',
    year: 2004,
    agency: 'NASA',
    purpose: 'Search for geological evidence of past water on the Martian surface.',
    description: 'Twin to Spirit, Opportunity landed in Eagle Crater on January 25, 2004, and became the longest-running Mars surface mission in history.',
    historicalStory: "Opportunity was designed for 90 sols but operated for 5,111 sols — nearly 15 Earth years. It drove 45.16 km total and survived a global dust storm in 2018 that reduced sunlight to 1% of normal. Its last transmission was June 10, 2018. NASA declared it lost on February 13, 2019, with the message: 'My battery is low and it's getting dark.'",
    scientificImportance: "Discovered hematite 'blueberries' proving liquid water once existed on Mars surface; found evidence of a mild, habitable ancient aqueous environment at Endeavour Crater.",
    currentStatus: 'Silent on the rim of Endeavour Crater since June 2018. The most travelled robot in planetary exploration history.',
    coordinates: { x: 50, y: 0, z: -20 },
    points: 400,
    isCollected: false,
    components: [
      {
        id: 'hematite_detector',
        name: 'Mössbauer Spectrometer',
        role: 'Iron mineral analyser',
        howItWorked: 'Used radioactive cobalt-57 source to measure iron mineral composition via Mössbauer effect',
        whyItMattered: 'Confirmed hematite "blueberries" — round concretions that form only in liquid water environments — proving ancient Mars had standing water',
      },
      {
        id: 'pancam_stereo',
        name: 'Stereo Panoramic Camera',
        role: 'Scientific imaging platform',
        howItWorked: '13-filter stereo camera pair captured everything from wide-angle terrain to microscopic close-ups',
        whyItMattered: 'Created complete geological maps of traveled terrain; documented rim of Endeavour Crater — a 22km wide ancient impact',
      },
      {
        id: 'antenna_array',
        name: 'Low and High-Gain Antenna System',
        role: 'Earth communication link',
        howItWorked: 'Low-gain omnidirectional for critical uplink; high-gain directional for high-bandwidth science data downlink',
        whyItMattered: 'Maintained contact across 54 million km; last signal received June 10, 2018 — final act of a 15-year mission',
      },
      {
        id: 'blueberry_field',
        name: 'Hematite Spherule Field (Eagle Crater)',
        role: 'Primary evidence of past water',
        howItWorked: 'Opportunity landed serendipitously inside Eagle Crater exposing layered sedimentary bedrock — a geological goldmine',
        whyItMattered: 'Layered cross-bedded sedimentary rock confirmed Mars once had flowing surface water — the most definitive Mars water discovery',
      },
    ],
    challenge: {
      question: 'What is the affectionate name for the iron-rich spheres Opportunity found that proved liquid water once existed?',
      options: ['Martian pearls', 'Iron pebbles', 'Blueberries', 'Rust rocks'],
      correctIndex: 2,
      explanation: "'Blueberries' are hematite spherical concretions that only form in standing water environments. Opportunity found millions of them in Eagle Crater — definitive proof of ancient Martian water.",
      hint: 'Small, round, and they prove an ancient wet Mars.',
    },
  },

  // ── DEEP SPACE ────────────────────────────────────────────────────────────

  voyager1: {
    id: 'voyager1',
    name: 'Voyager 1',
    level: 'DEEP_SPACE',
    locationName: 'Interstellar Space',
    year: 1977,
    agency: 'NASA',
    purpose: 'Explore the outer Solar System and become the first human-made object to enter interstellar space.',
    description: 'Launched September 5, 1977, Voyager 1 is the most distant human-made object — currently over 23 billion km from Earth.',
    historicalStory: "Voyager 1 exploited a rare planetary alignment occurring once every 176 years. It flew past Jupiter (1979) and Saturn (1980), discovering Jupiter's ring system and volcanoes on Io. At Carl Sagan's request, it turned its camera homeward in 1990 and captured the Pale Blue Dot — Earth as a 0.12-pixel speck suspended in a sunbeam.",
    scientificImportance: "First spacecraft to cross the heliopause into interstellar space (2012), where solar wind ends. Carries the Golden Record — humanity's message to any civilization that might find it.",
    currentStatus: 'Operational in interstellar space. Signal travel time: over 22 hours each way. Speed: ~17 km/s. Expected to operate until ~2025 when power fails.',
    coordinates: { x: 0, y: 0, z: 0 },
    points: 500,
    isCollected: false,
    components: [
      {
        id: 'golden_record',
        name: 'Golden Record',
        role: 'Message to extraterrestrial civilizations',
        howItWorked: '12-inch gold-plated copper disc with 115 images, greetings in 55 languages, music, and sounds of Earth encoded as analog audio',
        whyItMattered: "Carl Sagan's gift to the cosmos — a time capsule of humanity intended to outlast civilization itself",
      },
      {
        id: 'rtu',
        name: 'Radio Telemetry Unit',
        role: 'Communication with Earth',
        howItWorked: '10-watt transmitter using 3.7m dish antenna; signal takes 22+ hours to reach Earth at speed of light',
        whyItMattered: 'Still transmitting science data 46 years later — an engineering miracle of power and antenna precision across 23 billion km',
      },
      {
        id: 'plasma_wave',
        name: 'Plasma Wave Subsystem',
        role: 'Detect plasma waves and magnetic fields',
        howItWorked: '10m antennas detect electric field oscillations in solar wind and interstellar plasma',
        whyItMattered: 'Confirmed crossing of heliopause in 2012 by detecting dense interstellar plasma — first ever direct measurement from outside our Solar System',
      },
      {
        id: 'rtg_power',
        name: 'Radioisotope Thermoelectric Generator (RTG)',
        role: 'Primary power source',
        howItWorked: 'Plutonium-238 radioactive decay heats thermocouples; outputs ~420W at launch, now ~250W due to natural decay',
        whyItMattered: "Only power source feasible at distances where solar panels receive 0.1% of Earth's sunlight — enables exploration of outer Solar System",
      },
    ],
    challenge: {
      question: 'What is the name of the famous photograph taken by Voyager 1 in 1990 showing Earth as a tiny dot?',
      options: ['Earth from Space', 'Blue Marble', 'Pale Blue Dot', 'Earthrise'],
      correctIndex: 2,
      explanation: "The 'Pale Blue Dot' photograph, taken at Carl Sagan's request on February 14, 1990, shows Earth as a 0.12-pixel speck in a scattered ray of sunlight — one of the most profound images ever taken.",
      hint: 'Carl Sagan named it after the colour of our planet from 6 billion km away.',
    },
  },

  voyager2: {
    id: 'voyager2',
    name: 'Voyager 2',
    level: 'DEEP_SPACE',
    locationName: 'Interstellar Space',
    year: 1977,
    agency: 'NASA',
    purpose: 'Grand Tour of the outer planets using the rare planetary alignment of 1977.',
    description: 'Launched August 20, 1977 (before Voyager 1), Voyager 2 is the only spacecraft to have visited all four giant planets.',
    historicalStory: "Voyager 2 flew past Jupiter (1979), Saturn (1981), Uranus (1986), and Neptune (1989) — the only close-up visit to Uranus and Neptune in history. At Neptune, it discovered the Great Dark Spot and Triton's geysers, shooting nitrogen gas 8km above the surface. It crossed the heliopause in 2018, entering interstellar space.",
    scientificImportance: 'Only spacecraft to visit Uranus and Neptune. Discovered 10 new Uranian moons, 2 new rings, and confirmed Triton has active geysers of nitrogen — still our only close-up data of the ice giants.',
    currentStatus: 'Operational in interstellar space since 2018. Signal travel time: ~18 hours each way. Only craft to have visited all 4 outer planets.',
    coordinates: { x: 0, y: 0, z: 0 },
    points: 450,
    isCollected: false,
    components: [
      {
        id: 'wide_angle_cam',
        name: 'Wide-Angle and Narrow-Angle Cameras',
        role: 'Planetary imaging',
        howItWorked: 'Two vidicon tube cameras with filter wheels; narrow-angle for details, wide-angle for context; images transmitted at 115 bits/sec',
        whyItMattered: 'Returned first close-up images of Uranus and Neptune in history — still our only detailed photographs of the ice giants',
      },
      {
        id: 'magnetometer',
        name: 'Magnetometer',
        role: 'Measure planetary magnetic fields',
        howItWorked: 'Fluxgate and low-field magnetometers on 13m boom to avoid spacecraft interference',
        whyItMattered: 'Discovered Uranus and Neptune have highly tilted, off-center magnetic fields unlike any other planet — still unexplained',
      },
      {
        id: 'pls',
        name: 'Plasma Science Instrument (PLS)',
        role: 'Measure solar wind plasma',
        howItWorked: 'Curved Faraday cup sensors measure energy and direction of charged solar wind particles',
        whyItMattered: 'Confirmed Voyager 2 crossed the heliopause in December 2018 — only second spacecraft to enter interstellar space',
      },
      {
        id: 'uvs',
        name: 'Ultraviolet Spectrometer (UVS)',
        role: 'Atmospheric composition analysis',
        howItWorked: 'Measured UV light from planetary atmospheres to determine composition and structure',
        whyItMattered: 'Discovered Uranus loses helium from its atmosphere and found Neptune atmosphere has methane responsible for its blue color',
      },
    ],
    challenge: {
      question: 'Voyager 2 is the only spacecraft to have visited which two planets that no other probe has ever reached?',
      options: ['Jupiter and Saturn', 'Saturn and Uranus', 'Uranus and Neptune', 'Neptune and Pluto'],
      correctIndex: 2,
      explanation: 'Voyager 2 remains the only spacecraft to have visited Uranus (1986) and Neptune (1989). Both planets have never been visited by any other probe — all our close-up knowledge of the ice giants comes from this single flyby.',
      hint: 'Think of the two planets beyond Saturn that have never had orbiting missions.',
    },
  },

  pioneer10: {
    id: 'pioneer10',
    name: 'Pioneer 10',
    level: 'DEEP_SPACE',
    locationName: 'Beyond the Solar System',
    year: 1972,
    agency: 'NASA',
    purpose: 'First spacecraft to travel through the asteroid belt and make close-up observations of Jupiter.',
    description: 'Launched March 2, 1972, Pioneer 10 was the first spacecraft to achieve escape velocity from the Solar System.',
    historicalStory: "Pioneer 10 crossed the asteroid belt — which scientists feared might be impenetrable — in 1972-73 and made the first close-up flyby of Jupiter in December 1973. It carries a gold-anodized aluminum plaque designed by Carl Sagan depicting a man, a woman, and the spacecraft's origin in case it's ever found by extraterrestrials. Last signal was received April 27, 2002, when it was 12.2 billion km from Earth.",
    scientificImportance: 'First spacecraft through the asteroid belt, first close-up Jupiter images, first to achieve solar system escape velocity, first plaque-carrying message to the cosmos.',
    currentStatus: 'Silent since 2003. Drifting toward the star Aldebaran in the constellation Taurus — it will arrive in approximately 2 million years.',
    coordinates: { x: 0, y: 0, z: 0 },
    points: 400,
    isCollected: false,
    components: [
      {
        id: 'pioneer_plaque',
        name: 'Pioneer Plaque',
        role: 'Message to extraterrestrial civilizations',
        howItWorked: '6×9 inch gold-anodized aluminum plate shows silhouette of man and woman, Solar System diagram, and pulsar map locating Earth',
        whyItMattered: 'First physical message sent beyond the Solar System — predates the Voyager Golden Record by 5 years; Carl Sagan and Frank Drake designed it in 3 weeks',
      },
      {
        id: 'ipr',
        name: 'Infrared Radiometer',
        role: 'Measure Jupiter heat emission',
        howItWorked: 'Measured infrared radiation emitted by Jupiter to determine internal heat; compared day and night sides',
        whyItMattered: 'Confirmed Jupiter emits 1.7 times more heat than it receives from the Sun, proving it has an internal heat source from primordial formation',
      },
      {
        id: 'helium_vector',
        name: 'Helium Vector Magnetometer',
        role: 'Measure magnetic fields',
        howItWorked: 'Optically pumped helium gas sensor measured magnetic field vector with high precision',
        whyItMattered: "First mapping of Jupiter's magnetic field — showed it is 20,000 times stronger than Earth's, explaining the radiation belts that nearly destroyed Pioneer's electronics",
      },
      {
        id: 'asteroid_detector',
        name: 'Meteoroid Asteroid Detector',
        role: 'Asteroid belt hazard measurement',
        howItWorked: '24 panels measured micrometeorite impacts by detecting pressure pulses; counted particle flux through belt',
        whyItMattered: 'Proved the asteroid belt is not the dense deadly obstacle scientists feared — 99.9% empty space; opened the outer Solar System to exploration',
      },
    ],
    challenge: {
      question: 'What is on the gold-anodized plaque attached to Pioneer 10?',
      options: [
        "The US flag and President's signature",
        'Silhouettes of a man, woman, and a Solar System diagram',
        'A recording of Earth sounds',
        'The Voyager Golden Record',
      ],
      correctIndex: 1,
      explanation: "The Pioneer Plaque, designed by Carl Sagan and Frank Drake, shows silhouettes of a man and woman, a diagram of our Solar System showing Pioneer's origin, the hydrogen atom as a size reference, and a pulsar map to locate Earth.",
      hint: 'Carl Sagan designed it to identify where Pioneer came from.',
    },
  },
};
