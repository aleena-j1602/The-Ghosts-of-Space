// ---------------------------------------------------------------------------
// ghosts-of-space/content/artifacts/a15-lm10-ascent.ts
// ---------------------------------------------------------------------------

import type { ArtifactDefinition } from '../../artifacts/Core/artifactTypes.ts';

export const A15_LM10_ASCENT: ArtifactDefinition = {
  id: 'a15-lm10-ascent',
  sourceFileName: 'apollo15_lunar',
  officialName: 'Apollo 15 Lunar Module / LM-10 "Falcon" (ascent stage)',
  commonName: 'Falcon Ascent Stage',
  aliases: ['Falcon', 'LM-10', 'Apollo 15 Ascent Stage', '1971-063C'],
  catalogIds: { nssdca: '1971-063C', cospar: '1971-063C' },
  type: 'Crewed lunar module ascent stage, separated from the descent stage and deliberately impacted on the Moon.',
  level: 1,
  locationType: 'SURFACE',
  locationTypeSecondary: 'SIGNAL_AND_DATA',
  locationRationale:
    'The ascent stage was deliberately deorbited and impacted the lunar surface on 3 August 1971. ' +
    'Its impact location is catalogued, but the debris field has not been independently surveyed. ' +
    'The SIGNAL_AND_DATA layer represents the historical telemetry and seismic records associated with the impact.',
  agency: 'NASA — United States',
  program: 'Apollo',
  mission: 'Apollo 15',

  dates: {
    launch: '1971-07-26T13:34:00Z',
    landing: '1971-07-30T22:16:29Z',
    firstSurfaceActivity: '1971-07-31T02:56:15Z',
    departure: '1971-08-02T17:11:23Z',
    lastContact: '1971-08-03T03:03:37Z',
    missionEnd: '1971-08-03T03:03:37Z', // Ascent-stage lunar impact
  },

  coordinates: {
    latDeg: 26.36,
    lonDeg: 0.25,
    body: 'Moon',
    frame: null,
    accuracyM: null,
    note: 'Approximate ascent-stage impact coordinates from the NSSDCA lunar artifact catalogue.',
  },

  secondaryCoordinates: [
    {
      latDeg: 26.13239,
      lonDeg: 3.63330,
      body: 'Moon',
      frame: null,
      accuracyM: null,
      note: 'Apollo 15 Hadley-Apennine landing site. This is the separate descent-stage location, not the ascent-stage impact site.',
    },
  ],

  destination: 'Hadley-Apennine region, near side of the Moon',

  description:
    'The ascent stage of Apollo 15 Lunar Module Falcon was the crew cabin and propulsion section ' +
    'that carried astronauts David Scott and James Irwin from the lunar surface into lunar orbit. ' +
    'After docking with the Command Module Endeavour, the stage was jettisoned and deliberately ' +
    'deorbited. It impacted the Moon on 3 August 1971.',

  objective:
    'Return two astronauts safely from the lunar surface to the Command Module in lunar orbit.',

  developmentReason:
    'The Apollo Lunar Module used a two-stage architecture. The descent stage landed on the Moon ' +
    'and remained there, while the lighter ascent stage carried the crew back into lunar orbit.',

  majorEvents: [
    {
      utc: '1971-07-26T13:34:00Z',
      event: 'Apollo 15 launches from Kennedy Space Center aboard a Saturn V.',
      sourceRef: 'src-nasa-summary',
    },
    {
      utc: '1971-07-30T22:16:29Z',
      event: 'Falcon lands in the Hadley-Apennine region of the Moon.',
      sourceRef: 'src-nssdca-apollo15',
    },
    {
      utc: '1971-08-02T17:11:23Z',
      event: 'Falcon ascent stage lifts off from the lunar surface.',
      sourceRef: 'src-apollo15-report',
    },
    {
      utc: '1971-08-02T19:10:26Z',
      event: 'Falcon docks with the Command Module Endeavour.',
      sourceRef: 'src-apollo15-report',
    },
    {
      utc: '1971-08-03T01:04:01Z',
      event: 'The ascent stage is jettisoned after the crew completes transfer and checks.',
      sourceRef: 'src-apollo15-report',
    },
    {
      utc: '1971-08-03T02:38:20Z',
      event: 'The ascent stage performs its deorbit manoeuvre.',
      sourceRef: 'src-apollo15-report',
    },
    {
      utc: '1971-08-03T03:03:37Z',
      event: 'Falcon ascent stage impacts the lunar surface. The impact is recorded by Apollo seismic stations.',
      sourceRef: 'src-apollo15-report',
    },
  ],

  scientificFindings: [
    'The ascent-stage impact produced a seismic signal recorded by Apollo lunar seismic stations.',
    'The impact provided another opportunity to study how seismic waves travel through the Moon.',
    'Apollo 15 surface experiments contributed data on lunar geology, heat flow and the lunar interior.',
    'The mission demonstrated extended lunar surface exploration using a Lunar Roving Vehicle.',
  ],

  engineeringAchievements: [
    'Successfully launched two astronauts from the lunar surface into orbit.',
    'Performed lunar orbit rendezvous and docking with the Command Module.',
    'Used a dedicated ascent propulsion system separate from the descent engine.',
    'Completed a controlled mission sequence from lunar liftoff through rendezvous and eventual impact.',
  ],

  missionChallenges: [
    'The ascent stage had to reach the correct lunar orbit to rendezvous with Endeavour.',
    'The crew delayed jettison by one revolution to verify the docking tunnel seal and suit integrity.',
    'The ascent stage was intentionally deorbited after its crew-return function was complete.',
    'The exact distribution and present condition of the impact debris have not been established.',
    'NASA records contain slightly different impact coordinates; the catalogue coordinate should be treated as approximate.',
  ],

  currentStatus:
    'The ascent stage is no longer an orbiting spacecraft. It was deliberately deorbited and impacted the lunar surface ' +
    'on 3 August 1971. Its impact location is catalogued, but the present condition and distribution of physical debris ' +
    'have not been independently verified.',

  physicalRecoveryPossible: false,
  physicalRecoveryRationale:
    'No verified recovery operation or detailed debris survey is available. The game should represent investigation ' +
    'through remote scanning, archived telemetry, seismic records and a reconstructed impact trajectory, rather than ' +
    'claiming that an intact spacecraft can be recovered.',

  collectibleKinds: [
    'Reconstructed ascent-stage model',
    'Lunar impact location record',
    'Mission telemetry archive',
    'Ascent and rendezvous timeline',
    'Seismic impact data',
    'Propulsion system scan reconstruction',
    'Impact trajectory reconstruction',
    'Digital mission condition report',
  ],

  components: [
    {
      id: 'cmp-crew-cabin',
      name: 'Crew cabin',
      type: 'PRIMARY_STRUCTURE',
      functionPlain: 'The pressurized compartment where David Scott and James Irwin stayed during ascent and rendezvous.',
      condition: 'Impact debris condition unknown. Component shown as a historical reconstruction.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-stage-structure',
      historicalNote: 'The ascent stage carried the crew from the Moon to lunar orbit.',
      uncertain: true,
    },
    {
      id: 'cmp-ascent-engine',
      name: 'Ascent propulsion engine',
      type: 'PROPULSION',
      functionPlain: 'Provided the thrust required to lift the ascent stage from the lunar surface.',
      condition: 'Impact debris condition unknown. Component shown as a historical reconstruction.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-ascent-telemetry',
      historicalNote: 'The ascent engine was used for lunar liftoff, not for landing.',
      uncertain: true,
    },
    {
      id: 'cmp-rcs',
      name: 'Reaction Control System',
      type: 'PROPULSION',
      functionPlain: 'Small thrusters controlled the spacecraft orientation during flight.',
      condition: 'Impact debris condition unknown. Component shown as a historical reconstruction.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-stage-structure',
      historicalNote: 'Reaction control was important during orbital manoeuvres and docking alignment.',
      uncertain: true,
    },
    {
      id: 'cmp-docking-hatch',
      name: 'Docking hatch and transfer tunnel',
      type: 'CREW_SYSTEM',
      functionPlain: 'Allowed the astronauts to transfer between Falcon and the Command Module Endeavour.',
      condition: 'Impact debris condition unknown. Component shown as a historical reconstruction.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-docking-record',
      historicalNote: 'The crew checked the tunnel seal before the ascent stage was jettisoned.',
      uncertain: true,
    },
    {
      id: 'cmp-guidance',
      name: 'Guidance and navigation systems',
      type: 'INSTRUMENT',
      functionPlain: 'Supported navigation, attitude control and the rendezvous with Endeavour.',
      condition: 'Impact debris condition unknown. Component shown as a historical reconstruction.',
      scanDurationMs: 2500,
      requiresAngle: false,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-ascent-telemetry',
      historicalNote: 'Guidance and navigation data helped the ascent stage reach the Command Module.',
      uncertain: true,
    },
  ],

  evidence: [
    {
      id: 'ev-stage-structure',
      label: 'Ascent-stage structural reconstruction',
      type: 'STRUCTURAL_SCAN',
      description: 'A digital reconstruction of the crew cabin, propulsion section and docking systems based on Apollo Lunar Module design records.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-apollo15-report',
    },
    {
      id: 'ev-ascent-telemetry',
      label: 'Lunar ascent telemetry record',
      type: 'TELEMETRY_ARCHIVE',
      description: 'Mission record documenting the ascent stage liftoff and its journey into lunar orbit.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-apollo15-report',
    },
    {
      id: 'ev-docking-record',
      label: 'Endeavour docking record',
      type: 'MISSION_RECORD',
      description: 'The recorded rendezvous and docking between Falcon and the Command Module.',
      requiredForCompletion: true,
      points: 30,
      sourceRef: 'src-apollo15-report',
    },
    {
      id: 'ev-jettison',
      label: 'Ascent-stage jettison record',
      type: 'MISSION_RECORD',
      description: 'Record of the ascent stage separation after the astronauts had transferred to Endeavour.',
      requiredForCompletion: true,
      points: 30,
      sourceRef: 'src-apollo15-report',
    },
    {
      id: 'ev-impact',
      label: 'Lunar impact record',
      type: 'MISSION_RECORD',
      description: 'The ascent stage impact event, recorded on 3 August 1971.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-nssdca-impacts',
    },
    {
      id: 'ev-seismic',
      label: 'Seismic impact evidence',
      type: 'TELEMETRY_ARCHIVE',
      description: 'Seismic observations associated with the ascent-stage impact.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-apollo15-report',
    },
    {
      id: 'ev-location',
      label: 'Impact coordinate record',
      type: 'CONDITION_REPORT',
      description: 'Approximate impact coordinates from the lunar artifact catalogue. The exact debris distribution remains unknown.',
      requiredForCompletion: true,
      points: 30,
      sourceRef: 'src-nssdca-impacts',
    },
  ],

  objectives: [
    { id: 'obj-identify', label: 'Identify artifact 1971-063C', required: true, points: 100 },
    { id: 'obj-survey', label: 'Survey the approximate impact region', required: true, points: 150 },
    { id: 'obj-components', label: 'Inspect all reconstructed ascent-stage systems', required: true, points: 200 },
    { id: 'obj-telemetry', label: 'Recover the ascent and docking timeline', required: true, points: 150 },
    { id: 'obj-impact', label: 'Confirm the final impact event using seismic evidence', required: true, points: 200 },
    { id: 'obj-heritage', label: 'Complete the investigation without claiming unverified physical recovery', required: true, points: 100 },
  ],

  challenges: [
    {
      id: 'C1',
      type: 'MULTIPLE_CHOICE',
      title: 'Which Falcon are we looking for?',
      objective: 'Identify the correct spacecraft stage from its international designation.',
      instructions: 'The archive lists the object as 1971-063C. What does this designation identify?',
      options: [
        { id: 'a', text: 'Apollo 15 Command Module Endeavour' },
        { id: 'b', text: 'Falcon ascent stage' },
        { id: 'c', text: 'Falcon descent stage' },
        { id: 'd', text: 'Apollo 15 Lunar Roving Vehicle' },
      ],
      correctAnswer: ['b'],
      explanation:
        '1971-063C identifies the Apollo 15 Lunar Module ascent stage. The descent stage has a different designation.',
      hints: [
        'The object carried the astronauts away from the lunar surface.',
        'It was the upper, crew-carrying stage of Falcon.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 4,
    },
    {
      id: 'C2',
      type: 'ORDER_EVENTS',
      title: 'The return to orbit',
      objective: 'Reconstruct the ascent stage mission sequence.',
      instructions: 'Arrange the events in chronological order.',
      options: [
        { id: 'e1', text: 'Falcon docks with Endeavour.' },
        { id: 'e2', text: 'Falcon lifts off from the Moon.' },
        { id: 'e3', text: 'The ascent stage impacts the Moon.' },
        { id: 'e4', text: 'The ascent stage is jettisoned.' },
        { id: 'e5', text: 'The deorbit manoeuvre takes place.' },
      ],
      correctAnswer: ['e2', 'e1', 'e4', 'e5', 'e3'],
      explanation:
        'Falcon lifted off, rendezvoused and docked with Endeavour, was jettisoned, performed its deorbit manoeuvre and impacted the Moon.',
      hints: [
        'The astronauts had to reach Endeavour before the ascent stage could be discarded.',
        'The impact happened after the deorbit manoeuvre.',
      ],
      points: 250,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'C3',
      type: 'MATCH_COMPONENTS',
      title: 'Inside the ascent stage',
      objective: 'Match spacecraft systems with their functions.',
      instructions: 'Match each system to its correct function.',
      options: [
        { id: 'engine', text: 'Ascent engine' },
        { id: 'rcs', text: 'Reaction Control System' },
        { id: 'cabin', text: 'Crew cabin' },
        { id: 'tunnel', text: 'Docking tunnel' },
        { id: 'f1', text: 'Provided thrust for lunar liftoff' },
        { id: 'f2', text: 'Controlled spacecraft orientation' },
        { id: 'f3', text: 'Housed the astronauts' },
        { id: 'f4', text: 'Connected Falcon to the Command Module' },
      ],
      correctAnswer: {
        engine: 'f1',
        rcs: 'f2',
        cabin: 'f3',
        tunnel: 'f4',
      },
      explanation:
        'The ascent stage combined propulsion, crew accommodation, attitude control and docking systems to return astronauts to lunar orbit.',
      hints: [
        'One system provided the main thrust.',
        'Another allowed the crew to transfer into Endeavour.',
      ],
      points: 250,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'C4',
      type: 'DECODE_RECORD',
      title: 'The final signal',
      objective: 'Interpret the evidence left by the ascent stage.',
      instructions: 'The seismic archive contains a signal associated with the ascent-stage impact. What does it tell us?',
      options: [
        { id: 'a', text: 'Falcon remained in lunar orbit indefinitely.' },
        { id: 'b', text: 'Falcon successfully returned the crew and was later deliberately impacted.' },
        { id: 'c', text: 'Falcon landed again and remained intact.' },
        { id: 'd', text: 'The signal was produced by the Lunar Rover.' },
      ],
      correctAnswer: ['b'],
      explanation:
        'The ascent stage completed its crew-return role before being jettisoned and deorbited. Its impact was detected by lunar seismic stations.',
      hints: [
        'The crew had already transferred to Endeavour.',
        'The signal corresponds to the final event in the ascent stage timeline.',
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
        { speaker: 'LUNA', text: 'I have a catalog match. Apollo 15. Object designation 1971-063C.', emotion: 'NEUTRAL' },
        { speaker: 'PLAYER', text: 'A Lunar Module?' },
        { speaker: 'LUNA', text: 'More specifically, its ascent stage. The part that brought the astronauts home from the Moon.' },
        { speaker: 'PLAYER', text: 'Then where is it?' },
        { speaker: 'LUNA', text: 'That is what we are here to investigate.', emotion: 'CURIOUS' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-approach',
      trigger: 'ON_ENTER_PRESERVATION_RING',
      lines: [
        { speaker: 'LUNA', text: 'Impact region acquired. The catalog gives us an approximate location.' },
        { speaker: 'PLAYER', text: 'Can you see the spacecraft?' },
        { speaker: 'LUNA', text: 'No confirmed intact structure. We have an impact record, not a surveyed wreck.' },
        { speaker: 'PLAYER', text: 'So we reconstruct it.' },
        { speaker: 'LUNA', text: 'Exactly. Evidence first. Imagination second.', emotion: 'DRY' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-first-scan',
      trigger: 'ON_FIRST_SCAN',
      lines: [
        { speaker: 'LUNA', text: 'Starting the structural reconstruction.' },
        { speaker: 'PLAYER', text: 'This looks like the upper half of the Lunar Module.' },
        { speaker: 'LUNA', text: 'Correct. The ascent stage had the crew cabin, ascent engine and systems needed for rendezvous.' },
        { speaker: 'PLAYER', text: 'And the lower stage stayed behind?' },
        { speaker: 'LUNA', text: 'Yes. The descent stage remained at the Hadley-Apennine landing site.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-missing-stage',
      trigger: 'ON_MISSING_STAGE_REVEAL',
      lines: [
        { speaker: 'PLAYER', text: 'The ascent stage is not at the landing site. What happened?' },
        { speaker: 'LUNA', text: 'It lifted off on 2 August 1971 and docked with Endeavour.' },
        { speaker: 'PLAYER', text: 'Then they threw it away?' },
        { speaker: 'LUNA', text: 'After the crew transfer, it was jettisoned and deliberately deorbited.' },
        { speaker: 'PLAYER', text: 'So this impact signal is the end of Falcon.' },
        { speaker: 'LUNA', text: 'The end of its mission, yes. Its final physical condition is still unknown.', emotion: 'SOFT' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-complete',
      trigger: 'ON_INVESTIGATION_COMPLETE',
      lines: [
        { speaker: 'LUNA', text: 'Timeline reconstructed. Liftoff, rendezvous, docking, jettison, deorbit and impact.' },
        { speaker: 'PLAYER', text: 'We found what happened to Falcon.' },
        { speaker: 'LUNA', text: 'We found the evidence. We did not find an intact spacecraft, and we should not pretend otherwise.' },
        { speaker: 'PLAYER', text: 'Sometimes the record is the artifact.' },
        { speaker: 'LUNA', text: 'Now that is worth preserving.', emotion: 'SOFT' },
      ],
      onceOnly: true,
      skippable: true,
    },
  ],

  rewards: {
    basePoints: 900,
    maxPoints: 1500,
    completionThreshold: 900,
    difficultyTier: 2,
    archiveEntryId: 'ARCH-L1-APOLLO15-FALCON',
    archiveEntryTitle: 'Falcon: The Journey Back from the Moon',
    badges: [
      {
        id: 'badge-ascent',
        name: 'Return to Orbit',
        description: 'You reconstructed the ascent stage journey from lunar liftoff to rendezvous.',
        condition: 'Recover the ascent, docking and jettison mission records.',
      },
      {
        id: 'badge-seismic',
        name: 'Echoes of Impact',
        description: 'You connected a spacecraft impact with lunar seismic evidence.',
        condition: 'Recover and correctly interpret the seismic impact record.',
      },
    ],
    levelProgressPercent: 15,
    reputation: 100,
    resourceRestoration: [
      { resource: 'SUIT_POWER', amount: 'FULL' },
      { resource: 'SCANNER_CALIBRATION', amount: 10 },
      { resource: 'ARCHIVE_UPLINK_SLOTS', amount: 1 },
    ],
    equipmentUpgrades: [
      {
        id: 'upg-seismic-analysis',
        name: 'Seismic Analysis Mode',
        effect: 'Improves the ability to identify and interpret historical impact signals from lunar seismic archives.',
      },
    ],
  },

  collectionSequence: {
    id: 'falcon-impact-record',
    steps: [
      { order: 1, label: 'Locate', interaction: 'Lock onto the approximate impact coordinates.', durationMs: 3000 },
      { order: 2, label: 'Scan', interaction: 'Collect the available impact-region and terrain data.', durationMs: 4000 },
      { order: 3, label: 'Reconstruct', interaction: 'Assemble the ascent-stage systems using historical engineering records.', durationMs: 5000 },
      { order: 4, label: 'Synchronise', interaction: 'Match the mission timeline with the seismic impact record.', durationMs: 4000 },
      { order: 5, label: 'Archive', interaction: 'Seal the digital reconstruction and mission evidence.', durationMs: 3000 },
    ],
    removesPhysicalObject: false,
  },

  archive: {
    id: 'ARCH-L1-APOLLO15-FALCON',
    title: 'Falcon: The Journey Back from the Moon',
    tier: 'LANDMARK',
    summary:
      'Apollo 15 Falcon ascent stage carried David Scott and James Irwin from the lunar surface into orbit. ' +
      'After docking with Endeavour, it was jettisoned and deliberately impacted the Moon.',

    sections: [
      {
        heading: 'The mission',
        body:
          'Apollo 15 launched on 26 July 1971. Falcon landed in the Hadley-Apennine region on 30 July. ' +
          'The ascent stage later carried Scott and Irwin back into lunar orbit on 2 August.',
        sourceRefs: ['src-nssdca-apollo15', 'src-nasa-summary'],
      },
      {
        heading: 'The ascent stage',
        body:
          'The ascent stage contained the crew cabin, propulsion and systems required for lunar liftoff and rendezvous. ' +
          'It separated from the descent stage, which remained at the lunar landing site.',
        sourceRefs: ['src-apollo15-report', 'src-nasa-summary'],
      },
      {
        heading: 'The final journey',
        body:
          'After docking with Endeavour and transferring the crew, the ascent stage was jettisoned. ' +
          'It performed a deorbit manoeuvre and impacted the Moon on 3 August 1971. ' +
          'Apollo seismic stations recorded the impact.',
        sourceRefs: ['src-apollo15-report', 'src-nssdca-impacts'],
      },
      {
        heading: 'What remains unknown',
        body:
          'The impact location is catalogued, but the debris field has not been independently surveyed. ' +
          'The present condition and distribution of the ascent-stage remains are not established.',
        sourceRefs: ['src-nssdca-impacts', 'src-apollo15-report'],
      },
    ],

    openQuestions: [
      'What is the exact distribution of Falcon ascent-stage debris at the impact site?',
      'Can modern lunar imaging identify the impact location more precisely?',
      'What additional information can be extracted from the archived seismic observations?',
    ],

    tags: ['crewed', 'lunar-surface', 'apollo', 'lunar-module', 'ascent-stage', 'seismology'],
  },

  educational: {
    surprisingFacts: [
      'The ascent stage was the part of the Lunar Module that returned astronauts from the Moon.',
      'The descent stage and ascent stage had separate functions and separate catalog designations.',
      'Falcon docked with Endeavour before its ascent stage was discarded.',
      'The ascent stage was deliberately sent into the lunar surface after its crew-return mission.',
      'The impact was recorded by Apollo lunar seismic instruments.',
    ],

    concepts: [
      {
        term: 'Lunar ascent',
        explanation: 'The powered flight from the lunar surface into orbit around the Moon.',
      },
      {
        term: 'Lunar orbit rendezvous',
        explanation: 'A spacecraft manoeuvre in which two vehicles meet and dock while orbiting the Moon.',
      },
      {
        term: 'Seismology',
        explanation: 'The study of vibrations and waves travelling through a planetary body. Lunar seismic instruments helped scientists investigate the Moon\'s interior.',
      },
    ],

    takeaways: [
      'The ascent stage returned the astronauts; the descent stage remained on the Moon.',
      'Falcon completed its crew-return mission before being deliberately deorbited.',
      'Historical evidence can establish an impact event even when the present physical condition of the debris is unknown.',
    ],

    openQuestion:
      'Could modern lunar imaging and archived seismic data help researchers map the exact location and distribution of Falcon ascent-stage debris?',
  },

  sources: [
    {
      id: 'src-nssdca-apollo15',
      title: 'NSSDCA Master Catalog: Apollo 15 Lunar Module (1971-063C)',
      url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
      role: 'PRIMARY',
    },
    {
      id: 'src-apollo15-report',
      title: 'NASA Apollo 15 Mission Report',
      url: 'https://sma.nasa.gov/SignificantIncidents/assets/apollo-15-mission-report.pdf',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-summary',
      title: 'NASA Apollo 15 Mission Summary',
      url: 'https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_15a_Summary.htm',
      role: 'SUPPORTING',
    },
    {
      id: 'src-nssdca-impacts',
      title: 'NSSDCA Lunar Spacecraft Impact Catalogue',
      url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifacts.html',
      role: 'PRIMARY',
    },
  ],

  uncertaintyNotes: [
    'The exact physical condition and distribution of the ascent-stage debris have not been independently verified.',
    'The impact coordinates are approximate. NASA records contain small differences between reported coordinate values.',
    'The Apollo 15 landing-site coordinates refer to the descent stage, not the ascent-stage impact location.',
    'The component models are historical engineering reconstructions; their individual positions and conditions at the impact site are unknown.',
    'The seismic impact record supports the historical impact event, but does not establish the present appearance of the debris field.',
  ],
};