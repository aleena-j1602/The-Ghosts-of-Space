
import type { ArtifactDefinition } from '../../artifacts/Core/artifactTypes.ts';

export const A12_LM6_ASCENT: ArtifactDefinition = {
  id: 'a12-lm6-ascent',
  officialName: 'Apollo 12 Lunar Module LM-6 "Intrepid" (ascent stage)',
  commonName: 'Intrepid Ascent Stage Impact Site',
  aliases: [
    'Intrepid',
    'LM-6',
    'Apollo 12 Ascent Stage',
    '1969-099C',
  ],
  catalogIds: {
    nssdca: '1969-099C',
    cospar: '1969-099C',
  },
  type: 'Crewed lunar module ascent stage and controlled lunar impact',
  level: 1,
  locationType: 'SURFACE',
  locationTypeSecondary: 'SIGNAL_AND_DATA',
  locationRationale:
    'The ascent stage was deliberately directed into the lunar surface after the crew transferred to Yankee Clipper. The player investigates its documented impact location and mission records. The exact surviving debris distribution has not been verified.',
  agency: 'NASA',
  program: 'Apollo',
  mission: 'Apollo 12',

  dates: {
    launch: '1969-11-14T16:22:00Z',
    landing: '1969-11-19T06:54:36Z',
    firstSurfaceActivity: '1969-11-19T11:32:35Z',
    departure: '1969-11-20T14:25:47Z',
    lastContact: null,
    missionEnd: '1969-11-20T22:17:16Z',
  },

  coordinates: {
    latDeg: -3.94,
    lonDeg: -21.20,
    body: 'Moon',
    frame: null,
    accuracyM: null,
    note:
      'Approximate NSSDCA impact coordinates for the Apollo 12 LM ascent stage.',
  },

  secondaryCoordinates: [
    {
      latDeg: -3.01239,
      lonDeg: -23.42157,
      body: 'Moon',
      frame: null,
      accuracyM: null,
      note:
        'Apollo 12 Intrepid landing site. This is the separate descent-stage location, not the ascent-stage impact site.',
    },
  ],

  destination: 'Lunar surface, approximately 3.94° S, 21.20° W',

  description:
    'The ascent stage of Apollo 12 Lunar Module Intrepid carried astronauts Charles Conrad and Alan Bean from the lunar surface into orbit on 20 November 1969. After rendezvous and docking with Command Module Yankee Clipper, the crew transferred across and the ascent stage was jettisoned. Mission controllers directed it into a deliberate lunar impact. NSSDCA records an approximate impact location of 3.94° S, 21.20° W. The exact post-impact distribution of surviving fragments is not established.',

  objective:
    'Return the Apollo 12 lunar crew safely to lunar orbit, complete rendezvous and docking with Yankee Clipper, and use the discarded ascent stage as a controlled lunar impact experiment.',

  developmentReason:
    'The Apollo Lunar Module used a two-stage design. The descent stage landed on the Moon and remained there, while the ascent stage carried the astronauts back into lunar orbit. Once the crew and samples had transferred to the Command Module, the ascent stage was no longer needed. Its deliberate impact provided a known event for lunar seismic investigation.',

  majorEvents: [
    {
      utc: '1969-11-14T16:22:00Z',
      event: 'Apollo 12 launches from Kennedy Space Center aboard Saturn V SA-507.',
      sourceRef: 'src-nasa-summary',
    },
    {
      utc: '1969-11-19T06:54:36Z',
      event: 'Intrepid lands in Oceanus Procellarum near Surveyor III.',
      sourceRef: 'src-nasa-summary',
    },
    {
      utc: '1969-11-19T11:32:35Z',
      event: 'First lunar surface EVA begins.',
      sourceRef: 'src-nasa-timeline',
    },
    {
      utc: '1969-11-19T13:23:00Z',
      event: 'Apollo Lunar Surface Experiments Package is deployed and activated.',
      sourceRef: 'src-nasa-timeline',
    },
    {
      utc: '1969-11-20T03:54:45Z',
      event: 'Second lunar EVA begins.',
      sourceRef: 'src-nasa-timeline',
    },
    {
      utc: '1969-11-20T07:44:00Z',
      event: 'Second EVA ends after geological traverses and Surveyor III inspection.',
      sourceRef: 'src-nasa-timeline',
    },
    {
      utc: '1969-11-20T14:25:47Z',
      event: 'Intrepid ascent stage lifts off from the lunar surface.',
      sourceRef: 'src-nasa-timeline',
    },
    {
      utc: '1969-11-20T17:58:20Z',
      event: 'Ascent stage docks with Yankee Clipper.',
      sourceRef: 'src-nasa-timeline',
    },
    {
      utc: '1969-11-20T20:21:31Z',
      event: 'Ascent stage is jettisoned after crew transfer.',
      sourceRef: 'src-nasa-timeline',
    },
    {
      utc: '1969-11-20T21:50:14Z',
      event: 'Ascent-stage deorbit burn begins.',
      sourceRef: 'src-nasa-timeline',
    },
    {
      utc: '1969-11-20T22:17:16Z',
      event: 'Ascent stage impacts the lunar surface. NSSDCA records an Earth-received time of approximately 22:17:17.7 UT.',
      sourceRef: 'src-nssdca-impact',
    },
  ],

  scientificFindings: [
    'The Apollo 12 passive seismic experiment detected the artificial impact.',
    'The impact provided a known event for studying the Moon’s seismic response.',
    'The Apollo 12 ALSEP package included a passive seismometer, lunar surface magnetometer and solar wind spectrometer.',
    'Artificial impacts helped scientists investigate how seismic waves travel through the Moon.',
  ],

  engineeringAchievements: [
    'The ascent stage lifted two astronauts from the lunar surface into orbit.',
    'The spacecraft completed orbital manoeuvres and rendezvous with Yankee Clipper.',
    'The crew and collected samples were transferred safely to the Command Module.',
    'Mission controllers directed the discarded stage into a deliberate lunar impact.',
    'The final impact provided a useful event for the Apollo seismic experiment.',
  ],

  missionChallenges: [
    'Apollo 12 was struck by lightning twice shortly after launch, causing electrical indications and temporary loss of spacecraft power.',
    'The mission required a precision landing near Surveyor III.',
    'The crew had to complete two EVAs, deploy experiments and collect geological samples within the planned surface timeline.',
    'The ascent stage had to complete orbital manoeuvres before rendezvous and docking.',
    'The impact location is documented approximately, but the exact distribution of surviving fragments is not established.',
  ],

  currentStatus:
    'The ascent stage impacted the Moon on 20 November 1969. It should be treated as an impact-produced debris site rather than an intact spacecraft. The published impact coordinate and measurements are available in NSSDCA records. The descent stage and ALSEP remain at the separate Apollo 12 landing site.',

  physicalRecoveryPossible: false,
  physicalRecoveryRationale:
    'The ascent stage was deliberately driven into the lunar surface at approximately 1.68 km/s. Its surviving material may be distributed or buried around the impact area. No intact recoverable spacecraft has been verified. Gameplay inspection must use historical engineering reconstructions rather than claiming recovered hardware.',

  collectibleKinds: [
    'Impact coordinate record',
    'Mission timeline archive',
    'Ascent-stage engineering reconstruction',
    'Seismic experiment record',
    'Orbital manoeuvre data',
    'Impact-energy analysis',
    'Docking record',
    'Impact-site uncertainty report',
  ],

  components: [
    {
      id: 'cmp-ascent-engine',
      name: 'Ascent propulsion system',
      type: 'PROPULSION',
      functionPlain:
        'The rocket engine that lifted Conrad and Bean from the lunar surface and placed the ascent stage into orbit.',
      condition:
        'Not available for direct inspection. Reconstructed from Apollo Lunar Module engineering documentation.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-propulsion',
      historicalNote:
        'The ascent engine performed the lunar liftoff burn. The stage was later deliberately deorbited.',
      uncertain: false,
    },
    {
      id: 'cmp-crew-cabin',
      name: 'Crew cabin and pressure vessel',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'The pressurised cabin that housed the two astronauts during lunar ascent, rendezvous and docking.',
      condition:
        'Post-impact physical condition and fragment distribution are not confirmed. Display as a digital reconstruction only.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-structure',
      historicalNote:
        'The ascent stage carried Charles Conrad and Alan Bean from the lunar surface to Yankee Clipper.',
      uncertain: true,
    },
    {
      id: 'cmp-docking-tunnel',
      name: 'Docking tunnel and forward hatch',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'Connected the ascent stage to the Command Module so the crew could transfer themselves and their samples.',
      condition:
        'Not directly surveyed after impact. Reconstructed from the Lunar Module configuration.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-docking',
      historicalNote:
        'The spacecraft docked with Yankee Clipper at 17:58:20 UTC on 20 November 1969.',
      uncertain: false,
    },
    {
      id: 'cmp-guidance',
      name: 'Guidance and navigation equipment',
      type: 'CREW_SYSTEM',
      functionPlain:
        'Supported navigation and orbital manoeuvres required to rendezvous with the Command Module.',
      condition:
        'Post-impact condition unknown. Historical configuration can be inspected in the reconstruction interface.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-guidance',
      historicalNote:
        'The ascent stage performed rendezvous manoeuvres before docking.',
      uncertain: true,
    },
    {
      id: 'cmp-rcs',
      name: 'Reaction Control System',
      type: 'PROPULSION',
      functionPlain:
        'Small thrusters used to control spacecraft attitude and make precise orbital adjustments.',
      condition:
        'No individual thruster or fragment condition is verified at the impact site.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-guidance',
      historicalNote:
        'Attitude control was required during ascent, rendezvous, docking and disposal.',
      uncertain: true,
    },
    {
      id: 'cmp-tanks',
      name: 'Ascent propellant tanks',
      type: 'PROPULSION',
      functionPlain:
        'Stored the propellants required by the ascent engine and associated propulsion systems.',
      condition:
        'Post-impact state unknown. Tank appearance in the game must be labelled as a reconstruction.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-propulsion',
      historicalNote:
        'The ascent stage used its propulsion system for lunar liftoff and later deorbit.',
      uncertain: true,
    },
  ],

  evidence: [
    {
      id: 'ev-impact-coordinate',
      label: 'Ascent-stage impact coordinate',
      type: 'MISSION_RECORD',
      description:
        'NSSDCA records the approximate impact location as 3.94° S, 21.20° W.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-nssdca-impact',
    },
    {
      id: 'ev-impact-time',
      label: 'Impact time record',
      type: 'MISSION_RECORD',
      description:
        'NSSDCA lists an Earth-received time of approximately 22:17:17.7 UT.',
      requiredForCompletion: true,
      points: 30,
      sourceRef: 'src-nssdca-impact',
    },
    {
      id: 'ev-impact-energy',
      label: 'Impact velocity and energy',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'NSSDCA lists an impact velocity of 1.68 km/s and impact energy of 3.36 × 10^16 ergs.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-nssdca-impact',
    },
    {
      id: 'ev-propulsion',
      label: 'Ascent and deorbit propulsion record',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Timeline entries document lunar liftoff, orbital insertion and the later deorbit burn.',
      requiredForCompletion: true,
      points: 40,
      sourceRef: 'src-nasa-timeline',
    },
    {
      id: 'ev-docking',
      label: 'Yankee Clipper docking record',
      type: 'MISSION_RECORD',
      description:
        'The ascent stage docked with the Command Module at 17:58:20 UTC on 20 November 1969.',
      requiredForCompletion: true,
      points: 30,
      sourceRef: 'src-nasa-timeline',
    },
    {
      id: 'ev-guidance',
      label: 'Rendezvous manoeuvre sequence',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Mission events document orbital manoeuvres between ascent-stage insertion and docking.',
      requiredForCompletion: false,
      points: 30,
      sourceRef: 'src-nasa-timeline',
    },
    {
      id: 'ev-seismic',
      label: 'Apollo 12 seismic experiment record',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'The ALSEP passive seismometer recorded lunar activity, including the artificial ascent-stage impact.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-nasa-summary',
    },
    {
      id: 'ev-site-condition',
      label: 'Impact-site uncertainty report',
      type: 'CONDITION_REPORT',
      description:
        'The impact location is known approximately, but the exact surviving debris distribution is not established.',
      requiredForCompletion: true,
      points: 30,
      sourceRef: 'src-nssdca-impact',
    },
  ],

  objectives: [
    {
      id: 'obj-detect',
      label: 'Locate the Apollo 12 ascent-stage impact zone',
      required: true,
      points: 100,
    },
    {
      id: 'obj-coordinate',
      label: 'Reconstruct the impact coordinates from the mission archive',
      required: true,
      points: 150,
    },
    {
      id: 'obj-timeline',
      label: 'Rebuild the ascent, docking and disposal timeline',
      required: true,
      points: 200,
    },
    {
      id: 'obj-components',
      label: 'Inspect all six reconstructed ascent-stage systems',
      required: true,
      points: 200,
    },
    {
      id: 'obj-seismic',
      label: 'Recover the Apollo 12 seismic experiment record',
      required: true,
      points: 150,
    },
    {
      id: 'obj-impact',
      label: 'Analyse the impact velocity and energy',
      required: true,
      points: 100,
    },
    {
      id: 'obj-uncertainty',
      label: 'Complete the site report without claiming unverified wreckage',
      required: true,
      points: 100,
    },
  ],

  challenges: [
    {
      id: 'C1',
      type: 'MULTIPLE_CHOICE',
      title: 'Which Intrepid did you find?',
      objective: 'Distinguish the ascent stage from the descent stage.',
      instructions:
        'The catalog identifier is 1969-099C. Which part of Apollo 12 does it identify?',
      options: [
        { id: 'a', text: 'The descent stage left at the landing site.' },
        { id: 'b', text: 'The ascent stage that carried Conrad and Bean back to lunar orbit.' },
        { id: 'c', text: 'The Command Module Yankee Clipper.' },
        { id: 'd', text: 'The Saturn V S-IVB stage.' },
      ],
      correctAnswer: ['b'],
      explanation:
        '1969-099C identifies the Apollo 12 LM ascent stage. The ascent stage carried the astronauts back to lunar orbit.',
      hints: [
        'Think about which part of the two-stage lander had to leave the lunar surface.',
        'The ascent stage carried the astronauts. The descent stage stayed behind.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 4,
    },
    {
      id: 'C2',
      type: 'ORDER_EVENTS',
      title: 'The final orbit',
      objective: 'Place the ascent-stage disposal events in chronological order.',
      instructions: 'Arrange the events from lunar liftoff to lunar impact.',
      options: [
        { id: 'e1', text: 'Intrepid lifts off from the Moon.' },
        { id: 'e2', text: 'Ascent stage enters lunar orbit.' },
        { id: 'e3', text: 'Ascent stage docks with Yankee Clipper.' },
        { id: 'e4', text: 'Ascent stage is jettisoned.' },
        { id: 'e5', text: 'Deorbit burn begins.' },
        { id: 'e6', text: 'Ascent stage impacts the lunar surface.' },
      ],
      correctAnswer: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'],
      explanation:
        'The ascent stage lifted off, entered orbit, docked with Yankee Clipper, was jettisoned, performed its deorbit burn and impacted the Moon.',
      hints: [
        'The crew had to be safely inside Yankee Clipper before the ascent stage was discarded.',
        'The deorbit burn came after jettison and before impact.',
      ],
      points: 250,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'C3',
      type: 'MULTIPLE_CHOICE',
      title: 'A controlled impact',
      objective: 'Understand why the ascent stage was deliberately sent into the Moon.',
      instructions:
        'Why did mission controllers direct the discarded ascent stage toward the lunar surface?',
      options: [
        { id: 'a', text: 'To test whether the Moon had an atmosphere.' },
        { id: 'b', text: 'To create a known impact for the lunar seismic experiment.' },
        { id: 'c', text: 'To make room for the Command Module in lunar orbit.' },
        { id: 'd', text: 'To deploy a communications satellite.' },
      ],
      correctAnswer: ['b'],
      explanation:
        'The impact produced a known seismic event that could be studied by the Apollo 12 passive seismic experiment.',
      hints: [
        'The Apollo 12 landing site had an instrument designed to detect vibrations in the lunar ground.',
        'A deliberate impact gives scientists a known event to compare with natural seismic signals.',
      ],
      points: 200,
      optional: false,
      retryPenaltyPower: 4,
    },
    {
      id: 'C4',
      type: 'MULTIPLE_CHOICE',
      title: 'Read the impact record',
      objective: 'Interpret the published impact measurements.',
      instructions:
        'NSSDCA lists an impact velocity of 1.68 km/s. What does this value describe?',
      options: [
        { id: 'a', text: 'The speed of Intrepid during lunar liftoff.' },
        { id: 'b', text: 'The ascent-stage speed at lunar impact.' },
        { id: 'c', text: 'The speed of Yankee Clipper during docking.' },
        { id: 'd', text: 'The speed of Saturn V during launch.' },
      ],
      correctAnswer: ['b'],
      explanation:
        'The 1.68 km/s value is the impact velocity in the NSSDCA record.',
      hints: [
        'The measurement appears in the impact-site table.',
        'It describes the final seconds before the ascent stage struck the lunar surface.',
      ],
      points: 150,
      optional: true,
      retryPenaltyPower: 4,
    },
  ],

  dialogue: [
    {
      id: 'dlg-detect',
      trigger: 'ON_DETECTION_START',
      lines: [
        { speaker: 'LUNA', text: 'Signal lock acquired. Apollo 12. Intrepid. Identifier 1969-099C.' },
        { speaker: 'PLAYER', text: 'A lunar module. Is it still here?' },
        { speaker: 'LUNA', text: 'Not in the way you mean. This is the ascent stage. It did not stay beside the landing legs.' },
        { speaker: 'PLAYER', text: 'It came back down?' },
        { speaker: 'LUNA', text: 'Deliberately. After the crew transferred to Yankee Clipper, controllers sent it into the Moon.' },
        { speaker: 'LUNA', text: 'We have an impact coordinate. We do not have a verified map of every fragment.', emotion: 'DRY' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-approach',
      trigger: 'ON_ENTER_PRESERVATION_RING',
      lines: [
        { speaker: 'LUNA', text: 'You are approaching the reconstructed impact zone.' },
        { speaker: 'PLAYER', text: 'So where is the wreckage?' },
        { speaker: 'LUNA', text: 'That is exactly the question we need to be careful with.' },
        { speaker: 'LUNA', text: 'The coordinate tells us where the impact was recorded. It does not map every fragment.' },
        { speaker: 'PLAYER', text: 'No pretending we found something we did not.' },
        { speaker: 'LUNA', text: 'An excellent start to an investigation.', emotion: 'DRY' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-first-scan',
      trigger: 'ON_FIRST_SCAN',
      lines: [
        { speaker: 'LUNA', text: 'Starting historical systems reconstruction.' },
        { speaker: 'PLAYER', text: 'You are scanning a spacecraft that is not here.' },
        { speaker: 'LUNA', text: 'I am scanning the archive and projecting the engineering layout. Different operation.' },
        { speaker: 'LUNA', text: 'The ascent stage had one job: get two people off the Moon and meet their command ship.' },
        { speaker: 'PLAYER', text: 'A very expensive disposable vehicle.' },
        { speaker: 'LUNA', text: 'A very expensive disposable vehicle that worked.', emotion: 'SOFT' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-docking',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'cmp-docking-tunnel',
      lines: [
        { speaker: 'LUNA', text: 'Docking record recovered. 17:58:20 UTC.' },
        { speaker: 'PLAYER', text: 'So Conrad and Bean were back with Gordon.' },
        { speaker: 'LUNA', text: 'Correct. The crew and their samples were transferred to Yankee Clipper.' },
        { speaker: 'LUNA', text: 'Only after that did the ascent stage become expendable.' },
        { speaker: 'PLAYER', text: 'The mission was over for the little spacecraft.' },
        { speaker: 'LUNA', text: 'Its primary mission was over. Its last experiment was just beginning.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-seismic',
      trigger: 'ON_SIGNAL_LOCK',
      triggerParam: 'ev-seismic',
      lines: [
        { speaker: 'LUNA', text: 'Seismic archive recovered.' },
        { speaker: 'PLAYER', text: 'The impact was loud enough for the instruments?' },
        { speaker: 'LUNA', text: 'Not loud. Seismic. The ground carried the signal to the experiment station.' },
        { speaker: 'LUNA', text: 'A known impact gives researchers a useful reference event.' },
        { speaker: 'PLAYER', text: 'So the spacecraft became an experiment.' },
        { speaker: 'LUNA', text: 'For a few seconds, yes. A machine with one last job.', emotion: 'SOFT' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-uncertainty',
      trigger: 'ON_MISSING_STAGE_REVEAL',
      lines: [
        { speaker: 'PLAYER', text: 'Can we reconstruct the debris field?' },
        { speaker: 'LUNA', text: 'We can reconstruct the impact event and the spacecraft design.' },
        { speaker: 'PLAYER', text: 'But not the exact pieces on the ground.' },
        { speaker: 'LUNA', text: 'Not from the evidence in this archive. We keep that distinction.' },
        { speaker: 'PLAYER', text: 'It feels like an incomplete investigation.' },
        { speaker: 'LUNA', text: 'An honest investigation is allowed to end with a question.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-complete',
      trigger: 'ON_INVESTIGATION_COMPLETE',
      lines: [
        { speaker: 'LUNA', text: 'Impact coordinates verified. Timeline reconstructed. Seismic record archived.' },
        { speaker: 'PLAYER', text: 'And the spacecraft?' },
        { speaker: 'LUNA', text: 'Its final location is recorded. Its exact remains are not.' },
        { speaker: 'PLAYER', text: 'We did not recover anything.' },
        { speaker: 'LUNA', text: 'You recovered the story of what happened. That is what this site can give us.' },
        { speaker: 'LUNA', text: 'Archive sealed. Nothing removed. Nothing invented.', emotion: 'SOFT' },
      ],
      onceOnly: true,
      skippable: true,
    },
  ],

  rewards: {
    basePoints: 1000,
    maxPoints: 1750,
    completionThreshold: 1000,
    difficultyTier: 2,
    archiveEntryId: 'ARCH-MOON-A12-ASCENT',
    archiveEntryTitle: 'Intrepid: The Last Flight',
    badges: [
      {
        id: 'badge-last-flight',
        name: 'The Last Flight',
        description: 'You reconstructed the final mission of Apollo 12 Intrepid.',
        condition: 'Complete the ascent, rendezvous and impact timeline.',
      },
      {
        id: 'badge-honest-archive',
        name: 'Evidence Before Imagination',
        description: 'You separated documented history from unverified wreckage.',
        condition: 'Complete the impact-site report without marking reconstructed components as verified remains.',
      },
    ],
    levelProgressPercent: 12,
    reputation: 100,
    resourceRestoration: [
      { resource: 'SUIT_POWER', amount: 'FULL' },
      { resource: 'SCANNER_CALIBRATION', amount: 10 },
      { resource: 'ARCHIVE_UPLINK_SLOTS', amount: 1 },
    ],
    equipmentUpgrades: [
      {
        id: 'upg-seismic-analysis',
        name: 'Seismic Signal Analysis',
        effect:
          'Improves the ability to identify artificial impacts and distinguish archived seismic events from natural lunar activity.',
      },
    ],
  },

  collectionSequence: {
    id: 'impact-archive-lock',
    steps: [
      {
        order: 1,
        label: 'Locate',
        interaction: 'Align the scanner with the published impact coordinate.',
        durationMs: 3000,
      },
      {
        order: 2,
        label: 'Reconstruct',
        interaction: 'Load the historical ascent-stage configuration and orbital event sequence.',
        durationMs: 5000,
      },
      {
        order: 3,
        label: 'Correlate',
        interaction: 'Match the deorbit timeline with the seismic archive.',
        durationMs: 5000,
      },
      {
        order: 4,
        label: 'Seal',
        interaction: 'Confirm the impact-site uncertainty report and preserve the evidence record.',
        durationMs: 3000,
      },
    ],
    removesPhysicalObject: false,
  },

  archive: {
    id: 'ARCH-MOON-A12-ASCENT',
    title: 'Intrepid: The Last Flight',
    tier: 'LANDMARK',
    summary:
      'Apollo 12 LM-6 Intrepid carried Conrad and Bean from the Moon into lunar orbit. After docking with Yankee Clipper, the ascent stage was deliberately deorbited and impacted the lunar surface. Its final impact is documented, but its exact surviving debris distribution is not established.',
    sections: [
      {
        heading: 'The spacecraft',
        body:
          'Intrepid was the Apollo 12 Lunar Module. Its ascent stage carried Charles Conrad and Alan Bean away from the lunar surface on 20 November 1969. The international designation 1969-099C identifies this ascent stage.',
        sourceRefs: ['src-nasa-summary', 'src-nssdca-entry'],
      },
      {
        heading: 'The return to orbit',
        body:
          'The ascent stage lifted off at 14:25:47 UTC, entered lunar orbit and completed rendezvous manoeuvres. It docked with Yankee Clipper at 17:58:20 UTC. The crew and samples were transferred to the Command Module.',
        sourceRefs: ['src-nasa-timeline'],
      },
      {
        heading: 'The final impact',
        body:
          'After jettison, the ascent stage was manoeuvred toward the lunar surface. NSSDCA lists the impact at approximately 3.94° S, 21.20° W, with an impact velocity of 1.68 km/s.',
        sourceRefs: ['src-nssdca-impact', 'src-nasa-timeline'],
      },
      {
        heading: 'The scientific value',
        body:
          'The Apollo 12 ALSEP included a passive seismic experiment. The deliberate impact supplied a known event for seismic study. The impact location is documented, but this archive does not claim that individual fragments have been identified or surveyed.',
        sourceRefs: ['src-nasa-summary', 'src-nssdca-impact'],
      },
    ],
    openQuestions: [
      'What is the precise distribution of material at the impact site?',
      'Can modern orbital imagery identify a distinctive impact feature associated with the ascent stage?',
      'How does the recorded impact signal compare with other Apollo artificial impacts?',
    ],
    tags: [
      'apollo',
      'apollo-12',
      'intrepid',
      'lunar-ascent-stage',
      'lunar-impact',
      'seismic-experiment',
      'moon',
    ],
  },

  educational: {
    surprisingFacts: [
      'The ascent stage was deliberately crashed into the Moon after the crew transferred to Yankee Clipper.',
      'The spacecraft performed orbital manoeuvres after liftoff before docking with the Command Module.',
      'The impact velocity listed by NSSDCA is 1.68 km/s.',
      'The impact was useful because the Apollo 12 passive seismometer could record a known artificial event.',
      'The descent stage remained at the landing site; the ascent stage impacted at a different location.',
    ],
    concepts: [
      {
        term: 'Lunar ascent',
        explanation:
          'Powered flight that carries a spacecraft from the lunar surface into orbit around the Moon.',
      },
      {
        term: 'Rendezvous',
        explanation:
          'Orbital manoeuvres that bring two spacecraft together at matching positions and velocities.',
      },
      {
        term: 'Controlled impact',
        explanation:
          'A deliberate trajectory change that sends a spacecraft or stage toward a planned impact area.',
      },
      {
        term: 'Seismology',
        explanation:
          'The study of vibrations travelling through a body. Lunar seismic signals help scientists investigate the Moon’s internal structure and response to impacts.',
      },
    ],
    takeaways: [
      'The Apollo Lunar Module used separate descent and ascent stages for different jobs.',
      'The ascent stage was deliberately directed into the lunar surface after the crew transfer.',
      'A spacecraft can contribute scientific data after its primary mission is complete.',
      'A known impact coordinate does not prove that individual fragments have been located or identified.',
    ],
    openQuestion:
      'Could modern orbital imaging and seismic analysis reveal more about the physical impact site, or will the original impact record remain our clearest evidence?',
  },

  sources: [
    {
      id: 'src-nssdca-entry',
      title: 'NSSDCA Master Catalog: Apollo 12 Lunar Module (1969-099C)',
      url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
      role: 'PRIMARY',
    },
    {
      id: 'src-nssdca-impact',
      title: 'NSSDCA: Apollo Lunar Module Ascent Stage Impact Information',
      url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-summary',
      title: 'NASA: Apollo 12 Mission Summary',
      url: 'https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_12a_Summary.htm',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-timeline',
      title: 'NASA: Apollo 12 Mission Timeline',
      url: 'https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_12i_Timeline.htm',
      role: 'PRIMARY',
    },
  ],

  uncertaintyNotes: [
    'The impact coordinate is approximate and should not be treated as a precise wreckage location.',
    'NSSDCA gives an Earth-received impact time. The received time is approximately 1.3 seconds later than the actual lunar event.',
    'The exact distribution, condition and burial depth of ascent-stage fragments are not established by the sources used here.',
    'Component models are historical engineering reconstructions, not scans of recovered hardware.',
    'The Apollo 12 descent stage and ALSEP are at the Oceanus Procellarum landing site, not at the ascent-stage impact coordinate.',
    'Do not invent a precise seismic waveform or amplitude unless a specific dataset is added to the project.',
  ],
};
