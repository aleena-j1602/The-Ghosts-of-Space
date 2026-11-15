// ---------------------------------------------------------------------------
// ghosts-of-space/content/artifacts/a11-lm5-descent.ts
// ---------------------------------------------------------------------------

import type { ArtifactDefinition } from '../../artifacts/Core/artifactTypes.ts';

export const A11_LM5_DESCENT: ArtifactDefinition = {
  id: 'a11-lm5-descent',
  sourceFileName: 'apollo11_eagle',
  officialName: 'Apollo 11 Lunar Module / EASEP (LM-5 "Eagle", descent stage)',
  commonName: 'Tranquility Base',
  aliases: ['Eagle', 'LM-5', 'Apollo 11 LM/EASEP', '04041', 'Apollo11EASEP'],
  catalogIds: { nssdca: '1969-059C', cospar: '1969-059C' },
  type: 'Two-stage crewed lunar landing vehicle (descent stage remaining) with deployed surface experiment package',
  level: 1,
  locationType: 'SURFACE',
  locationTypeSecondary: 'SIGNAL_AND_DATA',
  locationRationale:
    'The descent stage is a fixed structure standing on the regolith at a published coordinate: the player walks to it. ' +
    'The secondary SIGNAL_AND_DATA layer is justified by the Laser Ranging Retroreflector, which still returns laser pulses ' +
    'to Earth and can be ranged live from the site.',
  agency: 'NASA — Office of Manned Space Flight (United States)',
  program: 'Apollo',
  mission: 'Apollo 11',
  dates: {
    launch: '1969-07-16T13:32:00Z',
    landing: '1969-07-20T20:17:40Z',
    firstSurfaceActivity: '1969-07-21T02:56:15Z',
    departure: '1969-07-21T17:54:01Z',
    lastContact: '1969-08-27T00:00:00Z', // EASEP no longer responding by this date; exact time unknown
    missionEnd: '1969-07-22T00:01:01Z',  // ascent stage jettisoned
  },
  coordinates: {
    latDeg: 0.67416,
    lonDeg: 23.47314,
    body: 'Moon',
    frame: 'Lunar Reconnaissance Orbiter DE 421',
    accuracyM: null,
    note: 'Descent stage / landing site, per NSSDCA 1969-059C.',
  },
  secondaryCoordinates: [
    {
      latDeg: 0.6735, lonDeg: 23.473,
      body: 'Moon', frame: 'Lunar Reconnaissance Orbiter DE 421',
      accuracyM: null,
      note: 'EASEP, approximately 17 m south of the LM. LRRR is about 5 m NNW of the EASEP; separate coordinates not published.',
    },
  ],
  destination: 'Mare Tranquillitatis (Sea of Tranquility), near side of the Moon',
  description:
    'The descent stage of the first crewed lunar landing: an octagonal structure 4.2 m across and 1.7 m thick on four legs ' +
    'spanning 9.4 m, with a residual engine bell protruding about 1 m below the deck, wrapped in thermal and micrometeoroid ' +
    'blankets. Nearby stand the 48 kg Early Apollo Scientific Experiment Package and the Laser Ranging Retroreflector.',
  objective:
    'Land two astronauts on the Moon and return them safely; demonstrate crewed landing and surface operations; ' +
    'collect samples and deploy a minimal scientific package.',
  developmentReason:
    'President Kennedy\'s 1961 commitment to land a crew before the decade ended required a vehicle able to fly only in vacuum, ' +
    'land under pilot control and lift off again. The two-stage design made the descent stage a disposable launch pad.',
  majorEvents: [
    { utc: '1969-07-16T13:32:00Z', event: 'Launch on Saturn V from LC-39A, Kennedy Space Center.', sourceRef: 'src-nssdca-a11' },
    { utc: '1969-07-20T17:44:00Z', event: 'LM undocks from the Command/Service Module.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-20T18:11:53Z', event: 'Separation manoeuvre begins.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-20T19:08:00Z', event: 'Descent orbit insertion burn, 30 seconds; low point 14.5 km.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-20T20:05:00Z', event: 'Powered descent begins; burn lasts 756.3 seconds.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-20T20:17:40Z', event: 'Landing in Mare Tranquillitatis at 0.67416 N, 23.47314 E.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-21T02:56:15Z', event: 'Armstrong steps onto the lunar surface.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-21T04:40:39Z', event: 'EASEP activated by ground command.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-21T05:11:13Z', event: 'Hatch closed; EVA ends after about 2 h 32 min.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-21T17:54:01Z', event: 'Ascent stage lifts off from the descent stage.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-21T21:34:00Z', event: 'Ascent stage docks with Columbia.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-07-22T00:01:01Z', event: 'Ascent stage jettisoned into lunar orbit; fate unknown.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-08-03T10:58:46Z', event: 'EASEP stops transmitting at lunar sunset.', sourceRef: 'src-nssdca-entry' },
    { utc: '1969-08-27T00:00:00Z', event: 'EASEP ceases responding after the next lunar day; experiment ends.', sourceRef: 'src-nssdca-entry' },
  ],
  scientificFindings: [
    'Return of 21.55 kg of lunar rock and soil, which reshaped understanding of the Moon\'s origin and history.',
    'Passive seismometer data on lunar seismic background and small events during the EASEP\'s operating period.',
    'Measurements of dust accumulation and radiation effects on solar cells from the lunar dust detector.',
    'A laser ranging target whose returns have supported decades of measurement of the Earth-Moon distance and lunar dynamics.',
  ],
  engineeringAchievements: [
    'First crewed landing on another world and first crewed liftoff from one.',
    'Deep-throttling ablative descent engine (about 45,000 N maximum) enabling piloted hover and lateral translation.',
    'Guidance computer with priority logic that shed low-priority tasks under overload rather than failing outright.',
    'Descent-stage-as-launch-pad architecture that made later surface operations possible.',
  ],
  missionChallenges: [
    'Program alarms 1201 and 1202 during descent: executive overload, resolved by design and by flight-control judgement.',
    'Boulder-strewn automated landing target, requiring manual redesignation by the commander.',
    'Roughly 30 seconds of descent fuel remaining at engine cutoff, per NASA mission commentary.',
    'Dust blasted outward by the descent engine during the final metres, obscuring the view.',
    'A single EVA of about 2 h 32 min with a stripped-down science payload and no schedule slack.',
    'Ascent stage lost after jettison; no confirmed impact site.',
  ],
  currentStatus:
    'Descent stage, EASEP and LRRR remain on the surface, immobile and exposed. The LRRR still returns laser pulses to Earth. ' +
    'The EASEP has been inert since August 1969. The ascent stage is unlocated.',
  physicalRecoveryPossible: false,
  physicalRecoveryRationale:
    'Over two tonnes of dry hardware in a 1.62 m/s^2 gravity well with no launch infrastructure; the site is protected heritage ' +
    'under the US One Small Step Act (PL 116-275) and the Artemis Accords heritage provisions; and the scientific and ' +
    'historical value of the site depends on everything remaining in place.',
  collectibleKinds: [
    'Photogrammetric model',
    'Structural scan data',
    'Material spectrometry reading (non-contact)',
    'Footprint and blast-pattern trace',
    'Archived EASEP telemetry',
    'Mission record transcript',
    'Live laser-ranging photon count',
    'Signed condition report',
  ],

  components: [
    {
      id: 'cmp-engine-bell',
      name: 'Descent engine bell',
      type: 'PROPULSION',
      functionPlain: 'The main rocket nozzle that slowed the landing; it could throttle down so the crew could hover and steer.',
      condition: 'Interior scoured bright by exhaust; exterior dust-frosted. Skirt hangs about 1 m below the deck.',
      scanDurationMs: 1500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: -1.0, z: 0 },
      evidenceId: 'ev-blast-pattern',
      historicalNote: 'Deep-throttling ablative design, maximum thrust about 45,000 N.',
      uncertain: false,
    },
    {
      id: 'cmp-legs',
      name: 'Landing legs and footpads (9.4 m span)',
      type: 'PRIMARY_STRUCTURE',
      functionPlain: 'Four legs that absorbed the touchdown, each with a probe that told the crew the surface had been reached.',
      condition: 'Intact and level. Dust-capped footpads; no visible structural failure.',
      scanDurationMs: 1500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0, z: 0 },
      evidenceId: 'ev-structure',
      historicalNote: 'One leg carries the ladder and egress platform used by both astronauts.',
      uncertain: false,
    },
    {
      id: 'cmp-ladder-plaque',
      name: 'Ladder, egress platform and dedication plaque',
      type: 'MARKER',
      functionPlain: 'The crew\'s route to the surface, and a small plaque recording the date and purpose of the visit.',
      condition: 'Ladder straight; plaque legible beneath a film of dust.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 3.1, y: 0.9, z: 2.4 },
      evidenceId: 'ev-plaque',
      historicalNote:
        'Plaque text: "Here men from the planet Earth first set foot on the Moon July 1969, A.D. We came in peace for all mankind."',
      uncertain: false,
    },
    {
      id: 'cmp-blankets',
      name: 'Thermal and micrometeoroid blankets',
      type: 'PRIMARY_STRUCTURE',
      functionPlain: 'Crinkled foil that held temperatures within limits and blunted tiny high-speed impacts.',
      condition: 'Sun-bleached to dull ochre, blistered, peeling at corners; suspected dust film.',
      scanDurationMs: 2500,
      requiresAngle: false,
      gameLayoutOffsetM: { x: 0, y: 0.6, z: 0 },
      evidenceId: 'ev-material',
      historicalNote: null,
      uncertain: true,
    },
    {
      id: 'cmp-tanks',
      name: 'Propellant and pressurant tanks',
      type: 'PROPULSION',
      functionPlain: 'Held the fuel, oxidiser and helium that fed the descent engine.',
      condition: 'Empty and sealed; dust-capped fittings.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: -1.4, y: 0.2, z: -1.2 },
      evidenceId: 'ev-structure',
      historicalNote: 'Descent stage dry mass 2,034 kg; propellant mass 8,248 kg.',
      uncertain: false,
    },
    {
      id: 'cmp-easep-base',
      name: 'EASEP base unit and antenna mast',
      type: 'INSTRUMENT',
      functionPlain: 'The hub of the experiment package: power, pointing and a radio link to Earth.',
      condition: 'Silent since 1969. Two canted solar panels, one more dust-covered than the other.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0, z: -17 },
      evidenceId: 'ev-telemetry',
      historicalNote: 'Uplink 2119 MHz; telemetry downlink 2276.5 MHz. Total package mass 48 kg.',
      uncertain: false,
    },
    {
      id: 'cmp-seismometer',
      name: 'Passive seismometer and lunar dust detector',
      type: 'INSTRUMENT',
      functionPlain: 'Listened for moonquakes and impacts, and measured dust build-up and radiation damage on solar cells.',
      condition: 'Inert. Exposed detector cells visibly darkened.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0.4, y: 0.1, z: -16.4 },
      evidenceId: 'ev-seismic-archive',
      historicalNote: 'Operated 21 July to 3 August 1969; briefly restarted; no longer responding by 27 August 1969.',
      uncertain: false,
    },
    {
      id: 'cmp-lrrr',
      name: 'Laser Ranging Retroreflector (corner-cube array)',
      type: 'INSTRUMENT',
      functionPlain: 'A bench of fused-silica corner cubes that returns laser pulses straight back to Earth.',
      condition: 'ACTIVE. Returns still detected; suspected dust film and possible thermal degradation.',
      scanDurationMs: 3000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: -2.6, y: 0.2, z: -21.5 },
      evidenceId: 'ev-ranging',
      historicalNote: 'Deployed about 5 m NNW of the EASEP. No power source and no moving parts.',
      uncertain: true,
    },
  ],

  evidence: [
    { id: 'ev-photogrammetry', label: 'Site photogrammetric model', type: 'PHOTOGRAMMETRY', description: 'Millimetre-scale geometry of the remaining structure and its surroundings, assembled from four standoff stations.', requiredForCompletion: true, points: 50, sourceRef: null },
    { id: 'ev-structure', label: 'Structural scan of deck and mounting points', type: 'STRUCTURAL_SCAN', description: 'Four clean ascent-stage mounting points on a scorched upper deck. Nothing above them.', requiredForCompletion: true, points: 50, sourceRef: 'src-nssdca-entry' },
    { id: 'ev-material', label: 'Non-contact material spectrometry', type: 'MATERIAL_SPECTROMETRY', description: 'Blanket material signature, degradation state and dust film estimate. No sample removed.', requiredForCompletion: false, points: 20, sourceRef: null },
    { id: 'ev-footprints', label: 'Footprint trace', type: 'TRACE_PATTERN', description: 'Two sets of bootprints converging on the ladder and diverging south, with sharp undisturbed edges.', requiredForCompletion: true, points: 20, sourceRef: null },
    { id: 'ev-blast-pattern', label: 'Regolith blast-pattern map', type: 'TRACE_PATTERN', description: 'Radial dust-swept zone beneath the deck, produced by the descent engine in the final seconds.', requiredForCompletion: true, points: 20, sourceRef: null },
    { id: 'ev-plaque', label: 'Plaque transcription and condition', type: 'TRANSCRIPTION', description: 'Full text of the dedication plaque and its physical condition.', requiredForCompletion: false, points: 20, sourceRef: 'src-nssdca-details' },
    { id: 'ev-flag', label: 'Flag condition record', type: 'CONDITION_REPORT', description: 'Flag lying flat, pole along the surface, consistent with being knocked down at ascent-stage liftoff.', requiredForCompletion: true, points: 20, sourceRef: 'src-nssdca-a11' },
    { id: 'ev-telemetry', label: 'EASEP power and antenna state', type: 'CONDITION_REPORT', description: 'Dead power system, intact mast, with the 1969 activation and shutdown timestamps recovered from the archive.', requiredForCompletion: true, points: 20, sourceRef: 'src-nssdca-details' },
    { id: 'ev-seismic-archive', label: 'Archived seismometer data package', type: 'TELEMETRY_ARCHIVE', description: 'Recovered from the archive, not from the instrument: 21 July to 27 August 1969.', requiredForCompletion: true, points: 30, sourceRef: 'src-nssdca-entry' },
    { id: 'ev-jettison', label: 'Ascent stage jettison record', type: 'MISSION_RECORD', description: 'Jettisoned into lunar orbit 22 July 1969, 00:01:01 UTC. Impact never located. Status: unresolved.', requiredForCompletion: true, points: 30, sourceRef: 'src-nssdca-entry' },
    { id: 'ev-ranging', label: 'Live laser-ranging return count', type: 'LIVE_MEASUREMENT', description: 'At least three returned photons from an Earth-based ranging pulse. Scored through objective obj-ranging, not here.', requiredForCompletion: false, points: 0, sourceRef: 'src-nasa-lrrr' },
    { id: 'ev-condition', label: 'Signed site condition report', type: 'CONDITION_REPORT', description: 'Player and Luna co-sign. Records that nothing was removed.', requiredForCompletion: true, points: 20, sourceRef: null },
  ],

  objectives: [
    { id: 'obj-detect', label: 'Acquire the artifact by photometric flare watch', required: true, points: 100 },
    { id: 'obj-survey', label: 'Complete the four-station standoff survey', required: true, points: 200 },
    { id: 'obj-components', label: 'Scan all eight visible components', required: true, points: 200 },
    { id: 'obj-evidence', label: 'Log at least nine evidence records', required: true, points: 300 },
    { id: 'obj-missing', label: 'Resolve the question of the missing ascent stage', required: true, points: 0 },
    { id: 'obj-ranging', label: 'Return at least three photons from the LRRR', required: false, points: 100 },
    { id: 'obj-lock', label: 'Complete the Heritage Lock without a preservation violation', required: true, points: 100 },
  ],

  challenges: [
    {
      id: 'C1',
      type: 'MULTIPLE_CHOICE',
      title: 'Why is the flag on the ground?',
      objective: 'Interpret a physical anomaly using environmental reasoning.',
      instructions: 'The flag lies flat, its pole along the surface. Choose the best explanation.',
      options: [
        { id: 'a', text: 'It was never properly planted; the crew ran out of time.' },
        { id: 'b', text: 'The lunar wind blew it down.' },
        { id: 'c', text: 'The ascent stage\'s engine exhaust knocked it over at liftoff.' },
        { id: 'd', text: 'Micrometeoroid impacts destroyed the pole.' },
      ],
      correctAnswer: ['c'],
      explanation:
        'NSSDCA records that the flag was difficult to set up and was knocked over when the LM lifted off 21 hours after landing. ' +
        'The Moon has no atmosphere, so there is no wind. The crew\'s difficulty was with extending the horizontal rod, not with planting the pole.',
      hints: [
        'What is the only thing in this level that ever moved fast enough to knock something down?',
        'It happened twenty-one hours after touchdown, when a rocket engine left the surface.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 4,
    },
    {
      id: 'C2',
      type: 'MATCH_COMPONENTS',
      title: 'Read the machine',
      objective: 'Match five components to their functions and reject one decoy.',
      instructions: 'Drag each component onto its correct function. One function is a decoy.',
      options: [
        { id: 'ladder', text: 'Ladder leg' },
        { id: 'bell', text: 'Engine bell' },
        { id: 'panels', text: 'Two canted solar panels' },
        { id: 'seismo', text: 'Passive seismometer' },
        { id: 'cubes', text: 'Corner-cube array' },
        { id: 'mast', text: 'Antenna mast' },
        { id: 'f1', text: 'Bounced laser pulses straight back to Earth' },
        { id: 'f2', text: 'Gave the crew a route down to the surface and back up' },
        { id: 'f3', text: 'Slowed and steered the descent, throttling down to allow hovering' },
        { id: 'f4', text: 'Collected sunlight during the lunar day to power the experiment package' },
        { id: 'f5', text: 'Listened for moonquakes, impacts and the structure of the lunar interior' },
        { id: 'f6', text: 'Generated oxygen for the crew during surface operations' },
      ],
      correctAnswer: { ladder: 'f2', bell: 'f3', panels: 'f4', seismo: 'f5', cubes: 'f1' },
      decoyIds: ['f6'],
      explanation:
        'The antenna mast carries and aims the EASEP communications link (downlink 2276.5 MHz, uplink 2119 MHz). The decoy is the giveaway: ' +
        'the EASEP had no life-support role. Crew oxygen and environmental control were part of the ascent stage, not the surface package.',
      hints: [
        'One of these six objects did not exist on the Moon in 1969 at all.',
        'The experiment package weighed 48 kg and carried no crew. What would it need oxygen for?',
      ],
      points: 250,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'C3',
      type: 'ORDER_EVENTS',
      title: 'Twelve and a half minutes, and the hours after',
      objective: 'Place six events in correct chronological order.',
      instructions: 'Arrange the cards. All times are UTC, 20-22 July 1969.',
      options: [
        { id: 'e1', text: 'LM undocks from Columbia' },
        { id: 'e2', text: 'Powered descent begins' },
        { id: 'e3', text: 'Eagle lands in Mare Tranquillitatis' },
        { id: 'e4', text: 'Armstrong steps onto the surface' },
        { id: 'e5', text: 'Ascent stage lifts off' },
        { id: 'e6', text: 'Ascent stage jettisoned into lunar orbit' },
      ],
      correctAnswer: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'],
      explanation:
        'Undock 17:44:00 on 20 July; powered descent 20:05 (756.3 s burn); landing 20:17:40; first step 02:56:15 on 21 July; ' +
        'liftoff 17:54:01 on 21 July; jettison 00:01:01 on 22 July. The landing and the first step fall on different UTC dates, ' +
        'though both were 20 July in US time. Six and a half hours passed between landing and egress.',
      hints: [
        'Two events happened on one UTC day and two on the next. Only one happened after midnight.',
        'America was still on 20 July when Armstrong stepped out. UTC had already turned the page.',
      ],
      points: 300,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'C4',
      type: 'DECODE_RECORD',
      title: 'What did 1202 mean?',
      objective: 'Interpret a fragment of mission record without panicking.',
      instructions: 'The log reads: "PROGRAM ALARM 1202. GUIDANCE COMPUTER EXECUTIVE OVERFLOW." Choose the best reading.',
      options: [
        { id: 'a', text: 'The guidance computer had failed; the crew flew the landing entirely by hand.' },
        { id: 'b', text: 'The computer was overloaded, discarded low-priority tasks and kept running the critical guidance.' },
        { id: 'c', text: 'The descent engine had lost thrust and the landing was in jeopardy.' },
        { id: 'd', text: 'A sensor had detected a hardware fault in the rendezvous radar.' },
      ],
      correctAnswer: ['b'],
      explanation:
        '1201 and 1202 were executive-overflow alarms: the computer ran out of processing time in a cycle and shed lower-priority work, ' +
        'then restarted its executive while keeping guidance and control alive. Extra load came largely from rendezvous radar data ' +
        'arriving during the landing. Mission Control\'s decision to continue rested on exactly that reading.',
      hints: [
        'Alarms are information, not verdicts. What did the computer do next?',
        'It kept flying the descent. If the first option were true, the landing would have been hand-flown from that moment.',
      ],
      points: 200,
      optional: true,
      retryPenaltyPower: 4,
    },
  ],

  dialogue: [
    {
      id: 'dlg-detect',
      trigger: 'ON_DETECTION_START',
      lines: [
        { speaker: 'LUNA', text: 'Okay. Coordinate lock. 0.67 north, 23.47 east. That\'s a real entry, not a rounding error.', emotion: 'NEUTRAL' },
        { speaker: 'PLAYER', text: 'What\'s there?' },
        { speaker: 'LUNA', text: 'Catalog says "partial". Which is archive-speak for "we know something is there and we stopped looking."', emotion: 'DRY' },
        { speaker: 'LUNA', text: 'Oh. Oh, that\'s a shadow with legs.', emotion: 'EXCITED' },
        { speaker: 'PLAYER', text: 'That\'s the artifact?' },
        { speaker: 'LUNA', text: 'That\'s the shadow of the artifact. Sun\'s low, so it\'s throwing its own length across the plain.' },
        { speaker: 'LUNA', text: 'There. Did you see that?', emotion: 'EXCITED' },
        { speaker: 'PLAYER', text: 'Sunlight off metal?' },
        { speaker: 'LUNA', text: 'Off something flat and large and deliberately made. Rocks are terrible at that.', emotion: 'DRY' },
        { speaker: 'LUNA', text: 'Move sideways. Don\'t walk at it, walk across it. I want to see if it flashes again.', emotion: 'URGENT' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-approach',
      trigger: 'ON_ENTER_PRESERVATION_RING',
      lines: [
        { speaker: 'LUNA', text: 'Preservation protocol arming. Ring goes up at thirty metres.' },
        { speaker: 'PLAYER', text: 'I\'m not touching anything.' },
        { speaker: 'LUNA', text: 'I know. The protocol doesn\'t. It\'s very literal.', emotion: 'DRY' },
        { speaker: 'LUNA', text: 'Also, jumping is now disabled. I\'m sorry. I know it\'s fun here.' },
        { speaker: 'PLAYER', text: 'It\'s a sixth of a gravity. It\'s very fun.' },
        { speaker: 'LUNA', text: 'And your boots throw regolith four metres when you land. Fine on an empty plain. Rude in somebody\'s front garden.' },
        { speaker: 'LUNA', text: 'Look at the ground under the deck. That isn\'t erosion. Nothing here erodes. That\'s the descent engine.' },
        { speaker: 'PLAYER', text: 'Fifty-seven years and it still looks fresh.' },
        { speaker: 'LUNA', text: 'That\'s the thing about a place with no weather. It keeps its receipts.', emotion: 'DRY' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-first-scan',
      trigger: 'ON_FIRST_SCAN',
      lines: [
        { speaker: 'LUNA', text: 'Scanning. Hold still, the suit drifts and I need a clean baseline.' },
        { speaker: 'LUNA', text: 'Aluminium structure, titanium fittings, and a great deal of what the crew called foil.' },
        { speaker: 'PLAYER', text: 'It looks like a baked potato.' },
        { speaker: 'LUNA', text: 'It looks like a very expensive baked potato. Please don\'t put that in the archive entry.' },
        { speaker: 'PLAYER', text: 'I\'m putting it in the archive entry.' },
        { speaker: 'LUNA', text: 'Fine. I\'ll footnote it.', emotion: 'DRY' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-lrrr',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'cmp-lrrr',
      lines: [
        { speaker: 'LUNA', text: 'Stop. Not the box. The bench.', emotion: 'URGENT' },
        { speaker: 'PLAYER', text: 'It\'s a tray of glass cubes.' },
        { speaker: 'LUNA', text: 'It\'s a tray of corner cubes. Three mirror faces at right angles, so anything that goes in comes straight back out.' },
        { speaker: 'PLAYER', text: 'A mirror with opinions.' },
        { speaker: 'LUNA', text: 'A mirror that never misses. No power, no electronics, no moving parts.', emotion: 'SOFT' },
        { speaker: 'LUNA', text: 'I\'m going to try something. It might not work.' },
        { speaker: 'PLAYER', text: 'What are you doing?' },
        { speaker: 'LUNA', text: 'Saying hello to a telescope on Earth. Aim the bench. Earth\'s up over the horizon, there\'s your line.' },
        { speaker: 'SYSTEM', text: 'Ranging pulse fired. Photon count: 0.' },
        { speaker: 'PLAYER', text: 'Nothing.' },
        { speaker: 'LUNA', text: 'Wait.' },
        { speaker: 'SYSTEM', text: 'Photon count: 1.' },
        { speaker: 'LUNA', text: 'There. There it is.', emotion: 'SOFT' },
        { speaker: 'PLAYER', text: 'One photon.' },
        { speaker: 'LUNA', text: 'One photon that left Earth two and a half seconds ago, hit a mirror two men set down in 1969, and came back to us. That\'s a conversation.' },
      ],
      onceOnly: true,
      skippable: false,
    },
    {
      id: 'dlg-missing-stage',
      trigger: 'ON_MISSING_STAGE_REVEAL',
      lines: [
        { speaker: 'PLAYER', text: 'Luna. Where\'s the top half?' },
        { speaker: 'LUNA', text: 'Huh.', emotion: 'CURIOUS' },
        { speaker: 'PLAYER', text: 'That\'s not an answer.' },
        { speaker: 'LUNA', text: 'That\'s because I don\'t have one yet. Four mounting points, scorched deck. The top half left in a hurry and took the crew with it.' },
        { speaker: 'LUNA', text: 'Jettisoned into lunar orbit, 22 July 1969, 00:01:01 UTC. Expected to come down within a few months. Nobody found it.' },
        { speaker: 'LUNA', text: 'So the record says "unresolved", and the record stays that way until somebody looks properly.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-complete',
      trigger: 'ON_INVESTIGATION_COMPLETE',
      lines: [
        { speaker: 'LUNA', text: 'Photogrammetry closing. Hold it. You\'re drifting. Counter-steer. There.' },
        { speaker: 'LUNA', text: 'Site sealed. Designation logged. And not one gram removed.' },
        { speaker: 'PLAYER', text: 'Feels unfinished. Normally I come away with something.' },
        { speaker: 'LUNA', text: 'You came away with everything. A model, twelve records, an instrument\'s whole working life, and the exact position of a flag that fell over in 1969 and stayed down.' },
        { speaker: 'PLAYER', text: 'That\'s data. It\'s not the thing.' },
        { speaker: 'LUNA', text: 'It\'s the place. Take the machine and you\'ve got a museum piece. Take the machine and the prints and the blast pattern, and you\'ve got the morning of 21 July, still in order.' },
        { speaker: 'LUNA', text: 'Also we\'re not allowed to take it. There\'s a law. I checked twice.', emotion: 'DRY' },
        { speaker: 'PLAYER', text: 'Of course you did.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-recharge',
      trigger: 'ON_POWER_DEPLETED',
      lines: [
        { speaker: 'LUNA', text: 'Forty minutes of charge. You\'re going to be bored. I\'m going to talk.' },
        { speaker: 'PLAYER', text: 'I assumed.' },
        { speaker: 'LUNA', text: 'Fact one. The crew cabin had no seats. They stood the whole way down. Twelve and a half minutes of powered descent, standing, in a space smaller than a delivery van.' },
        { speaker: 'LUNA', text: 'Fact two. The experiment package weighed 48 kg and had three weeks of life. Switched on 21 July, killed by sunset on 3 August, quiet for good by 27 August.' },
        { speaker: 'LUNA', text: 'Fact three. The mirrors are still on duty. Somebody on Earth fires a laser at them every few seconds and counts what comes back.' },
        { speaker: 'PLAYER', text: 'Why does the Moon wobble?' },
        { speaker: 'LUNA', text: 'Because it isn\'t a solid ball of rock, and because the Earth and the Sun are both pulling on it. The mirrors are how we eavesdrop on the argument.' },
        { speaker: 'LUNA', text: 'Fact four. The flag\'s on the ground because the ascent stage lit its engine twenty-one hours after landing. Nobody was there to see it.', emotion: 'DRY' },
        { speaker: 'LUNA', text: 'Fact five is that the top half is still missing. Two point four tonnes of spacecraft, and fifty years of better cameras, and nothing.', emotion: 'SOFT' },
        { speaker: 'PLAYER', text: 'Could we find it?' },
        { speaker: 'LUNA', text: 'Maybe. Or maybe it\'s in an orbit that keeps it up for another few centuries. Every estimate we make is a guess dressed as arithmetic.' },
        { speaker: 'LUNA', text: 'I\'d like to look, one day. Not today.' },
      ],
      onceOnly: true,
      skippable: false,
    },
    {
      id: 'dlg-legacy',
      trigger: 'ON_MISSION_END',
      lines: [
        { speaker: 'LUNA', text: 'Before we go. One question, then I\'ll stop being sentimental. I\'m told it\'s a feature.' },
        { speaker: 'PLAYER', text: 'Go on.' },
        { speaker: 'LUNA', text: 'Why does this one get saved and not the others?' },
        { speaker: 'PLAYER', text: 'Because it\'s still here, exactly as it was left.' },
        { speaker: 'LUNA', text: 'That\'s the one. Every other artifact in this archive is a fragment, a copy, or a signal we rebuilt from noise. This one is a place with its own mess still in it.' },
        { speaker: 'LUNA', text: 'Look up before you switch the lamp off. Earth\'s right there.' },
        { speaker: 'PLAYER', text: 'I see it.' },
        { speaker: 'LUNA', text: 'Somebody down there is about to fire a laser at a tray of glass. They\'ll get maybe one photon back, and they\'ll be pleased about it.', emotion: 'SOFT' },
        { speaker: 'LUNA', text: 'Okay. Sentimental module off. Walk west, mind the boulder field, try not to bounce.', emotion: 'DRY' },
      ],
      onceOnly: true,
      skippable: true,
    },
  ],

  rewards: {
    basePoints: 1100,
    maxPoints: 1900,
    completionThreshold: 1100,
    difficultyTier: 2,
    archiveEntryId: 'ARCH-L1-TB-01',
    archiveEntryTitle: 'Tranquility Base: The Machine That Stayed',
    badges: [
      {
        id: 'badge-custodian',
        name: 'Custodian of Tranquility',
        description: 'You left it exactly as you found it, which is the hardest thing an archaeologist can do.',
        condition: 'Complete a Landmark site with zero preservation violations and at least one returned photon.',
      },
      {
        id: 'badge-sideways',
        name: 'Sideways Thinker',
        description: 'You learned that a mirror only points at you from one place at a time.',
        condition: 'Acquire the artifact within 40 seconds of the first flash, without using a hint.',
      },
    ],
    levelProgressPercent: 18,
    reputation: 120,
    resourceRestoration: [
      { resource: 'SUIT_POWER', amount: 'FULL' },
      { resource: 'SCANNER_CALIBRATION', amount: 10 },
      { resource: 'ARCHIVE_UPLINK_SLOTS', amount: 1 },
    ],
    equipmentUpgrades: [
      {
        id: 'upg-photon-counting',
        name: 'Photon Counting Mode (Luna)',
        effect: 'Detects and characterises extremely weak, intermittent optical and radio signals. Converts several Level 3 "unresolvable" sources into trackable ones.',
      },
    ],
  },

  collectionSequence: {
    id: 'heritage-lock',
    steps: [
      { order: 1, label: 'Sweep', interaction: 'Hold scanner at the ladder leg; photogrammetry ribbon closes around the site.', durationMs: 3000 },
      { order: 2, label: 'Hold', interaction: 'Maintain a stable 5-second hold while the suit drifts.', durationMs: 5000 },
      { order: 3, label: 'Seal', interaction: 'Holographic boundary snaps into place with designation and date.', durationMs: 2500 },
      { order: 4, label: 'Quiet', interaction: 'Ten seconds of stillness. The photon counter adds one.', durationMs: 10000 },
    ],
    removesPhysicalObject: false,
  },

  archive: {
    id: 'ARCH-L1-TB-01',
    title: 'Tranquility Base: The Machine That Stayed',
    tier: 'LANDMARK',
    summary:
      'The descent stage of the first crewed lunar landing, its 48 kg experiment package and a mirror array that has been ' +
      'answering Earth since 1969. Intact, in place, and protected.',
    sections: [
      {
        heading: 'The site',
        body:
          'An octagonal descent stage 4.2 m across and 1.7 m thick on four legs spanning 9.4 m, with the engine bell still hanging ' +
          'about a metre beneath the deck. Foil blankets bleached and peeling. The upper stage is absent.',
        sourceRefs: ['src-nssdca-details'],
      },
      {
        heading: 'The instruments',
        body:
          'EASEP: passive seismometer, lunar dust detector, two canted solar panels, antenna mast. 48 kg, deployed about 17 m south ' +
          'of the LM, activated 04:40:39 UT on 21 July 1969, silent by 27 August 1969. LRRR: corner-cube array about 5 m NNW of the EASEP, ' +
          'still returning laser pulses.',
        sourceRefs: ['src-nssdca-entry', 'src-nssdca-lrrr'],
      },
      {
        heading: 'What happened to the rest',
        body:
          'The ascent stage lifted off at 17:54:01 UT on 21 July, docked with Columbia at 21:34:00 UT, and was jettisoned into lunar ' +
          'orbit at 00:01:01 UT on 22 July. NASA assesses that it most likely struck the surface within one to four months. No impact ' +
          'site has been confirmed.',
        sourceRefs: ['src-nssdca-entry'],
      },
      {
        heading: 'What we did not find',
        body:
          'The ascent stage. Its resting place is unknown, and the archive records that as an absence rather than filling it in.',
        sourceRefs: ['src-nssdca-entry'],
      },
    ],
    openQuestions: [
      'Where is the ascent stage, and is it still in orbit?',
      'How much has the Apollo 11 retroreflector degraded, and why?',
      'Which small loose items were left outside the LM, and where are they now?',
    ],
    tags: ['crewed', 'lunar-surface', 'heritage-site', 'in-situ', 'active-instrument', 'apollo'],
  },

  educational: {
    surprisingFacts: [
      'The lander had no seats: the crew stood for the whole descent in a cabin of 6.65 m3.',
      'The flag fell because of rocket exhaust at liftoff, not wind. The Moon has no atmosphere.',
      'The guidance computer\'s alarms meant it was shedding low-priority work on purpose, not failing.',
      'The first lunar science package operated for about three weeks of Earth time.',
      'The retroreflector still returns laser pulses to Earth, roughly one photon every few seconds at best.',
    ],
    concepts: [
      { term: 'Throttleable propulsion', explanation: 'A rocket engine that can be turned down to a fraction of full thrust, allowing a pilot to slow gradually, hover and choose where to land.' },
      { term: 'Retroreflection', explanation: 'Three mirrors meeting at right angles bounce light straight back to its source from any angle, with no power and no moving parts.' },
      { term: 'Vacuum preservation', explanation: 'With no wind, rain or microbes, footprints and blast patterns on the Moon can survive for millions of years.' },
    ],
    takeaways: [
      'The descent stage stayed because the two-stage design made it the launch pad.',
      'A place can hold more information than an object, which is why the site is protected rather than collected.',
      '"Unknown" is a legitimate scientific answer, and the archive records it as one.',
    ],
    openQuestion:
      'If the ascent stage is still in lunar orbit, how would you look for it: a new crater, a debris scatter, a radar echo, or reprocessed 1969 tracking data?',
  },

  sources: [
    { id: 'src-nssdca-entry', title: 'NSSDCA Master Catalog: Apollo 11 Lunar Module / EASEP (1969-059C)', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C', role: 'PRIMARY' },
    { id: 'src-nssdca-details', title: 'NSSDCA detailed record: Apollo 11 Lunar Module / EASEP', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C&type=details', role: 'PRIMARY' },
    { id: 'src-nssdca-lrrr', title: 'NSSDCA experiment record: Laser Ranging Retroreflector (1969-059C-04)', url: 'https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-059C-04', role: 'PRIMARY' },
    { id: 'src-nssdca-a11', title: 'NSSDCA Apollo 11 image history page', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11.html', role: 'PRIMARY' },
    { id: 'src-nasa-lrrr', title: 'NASA: The Apollo experiment that keeps on giving', url: 'https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/', role: 'SUPPORTING' },
  ],

  uncertaintyNotes: [
    'Exact condition of the foil, blankets and instrument surfaces today is inferred from material behaviour and ageing, not from a survey in this pack.',
    'NSSDCA lists the LRRR mass as 77 kg; other sources give lower figures. Treat as approximate.',
    'The catalog gives "19 minutes" between Armstrong and Aldrin stepping out, while an NSSDCA image caption says "less than fifteen minutes". Use "about 19 minutes" and flag it.',
    'The final disposition of small loose items (surface TV camera, packaging, life-support backpacks) is not itemised in the catalog entry and is marked unknown here.',
    'The Apollo 11 seismometer did not record the ascent stage impact. That impact has never been located. The Apollo 12 station recorded the Apollo 12 ascent stage impact, which is a different event.',
  ],
};