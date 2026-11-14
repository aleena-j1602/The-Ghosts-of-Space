import type { ArtifactDefinition } from '../../artifacts/Core/artifactTypes.ts';

export const DAWN_SPACECRAFT: ArtifactDefinition = {
  id: 'nasa-dawn-spacecraft',

  officialName: 'Dawn Spacecraft',
  commonName: 'Dawn',
  aliases: [
    'Dawn Mission',
    'Dawn Orbiter',
    '2007-043A',
    'Vesta Explorer',
    'Ceres Explorer',
  ],

  catalogIds: {
    nssdca: '2007-043A',
    cospar: '2007-043A',
  },

  type: 'Uncrewed interplanetary asteroid and dwarf planet orbiter',

  level: 3,
  locationType: 'ORBIT',
  locationTypeSecondary: 'SIGNAL_AND_DATA',

  locationRationale:
    'Dawn is an interplanetary spacecraft that completed orbital investigations ' +
    'of Vesta and Ceres. It never landed on either body. The spacecraft remains ' +
    'in orbit around Ceres, where it became a long-term artificial satellite. ' +
    'The player investigates its orbital history, spacecraft systems and ' +
    'recovered mission telemetry rather than attempting physical retrieval.',

  agency: 'NASA — Jet Propulsion Laboratory (JPL)',
  program: 'Discovery Program',
  mission: 'Dawn Mission',

  dates: {
    launch: '2007-09-27T11:34:00Z',
    landing: null,
    firstSurfaceActivity: null,
    departure: null,
    lastContact: '2018-10-31T00:00:00Z',
    missionEnd: '2018-11-01T00:00:00Z',
  },

  coordinates: null,
  secondaryCoordinates: null,

  destination: 'Main Asteroid Belt between Mars and Jupiter',

  description:
    'NASA Dawn was an interplanetary spacecraft designed to investigate ' +
    'Vesta and Ceres, two of the largest objects in the main asteroid belt. ' +
    'It used solar-powered ion propulsion to travel between these worlds ' +
    'and entered orbit around each target. Its scientific instruments ' +
    'studied surface composition, mineralogy, gravity and internal structure. ' +
    'After exhausting its hydrazine supply in 2018, Dawn lost its ability ' +
    'to maintain its orientation and communicate with Earth. It remains ' +
    'in orbit around Ceres.',

  objective:
    'Investigate the formation and evolution of Vesta and Ceres to understand ' +
    'the earliest stages of planetary development and the role of water ' +
    'and size in the evolution of planetary bodies.',

  developmentReason:
    'Scientists wanted to understand the early building blocks of the Solar ' +
    'System. Vesta and Ceres followed different evolutionary paths. Vesta ' +
    'is a differentiated rocky body, while Ceres is a water-rich dwarf planet. ' +
    'Studying both allowed scientists to compare the development of small ' +
    'planetary bodies using a single spacecraft.',

  majorEvents: [
    {
      utc: '2007-09-27T11:34:00Z',
      event: 'Dawn launched from Cape Canaveral aboard a Delta II rocket.',
      sourceRef: 'src-nasa-overview',
    },
    {
      utc: '2009-02-17T00:00:00Z',
      event: 'Dawn performed a Mars gravity assist to modify its trajectory.',
      sourceRef: 'src-nasa-overview',
    },
    {
      utc: '2011-07-16T00:00:00Z',
      event: 'Dawn arrived at Vesta and began orbital investigation.',
      sourceRef: 'src-nasa-overview',
    },
    {
      utc: '2012-09-05T00:00:00Z',
      event: 'Dawn departed Vesta after completing its primary investigation.',
      sourceRef: 'src-nasa-quickfacts',
    },
    {
      utc: '2015-03-06T00:00:00Z',
      event: 'Dawn arrived at Ceres and became the first spacecraft to orbit a dwarf planet.',
      sourceRef: 'src-nasa-quickfacts',
    },
    {
      utc: '2016-06-30T00:00:00Z',
      event: 'The prime mission concluded and extended scientific operations followed.',
      sourceRef: 'src-nasa-overview',
    },
    {
      utc: '2017-10-01T00:00:00Z',
      event: 'Dawn began its second extended mission.',
      sourceRef: 'src-nasa-overview',
    },
    {
      utc: '2018-10-31T00:00:00Z',
      event: 'Dawn exhausted its hydrazine propellant and lost communication capability.',
      sourceRef: 'src-nasa-end',
    },
    {
      utc: '2018-11-01T00:00:00Z',
      event: 'NASA officially declared the Dawn mission completed.',
      sourceRef: 'src-nasa-end',
    },
  ],

  scientificFindings: [
    'Vesta is a differentiated rocky protoplanet with a complex geological history.',
    'Vesta experienced major impacts that created enormous impact basins.',
    'Ceres contains water-bearing minerals and evidence of past geological activity.',
    'Occator Crater contains prominent bright deposits, including sodium carbonate-rich material.',
    'Ceres has evidence of brines and processes involving salty liquid water.',
    'The differences between Vesta and Ceres reveal different evolutionary paths among early planetary bodies.',
  ],

  engineeringAchievements: [
    'First spacecraft to orbit a main-belt asteroid.',
    'First spacecraft to reach and orbit a dwarf planet.',
    'First mission to orbit two extraterrestrial bodies.',
    'Demonstrated long-duration solar-powered ion propulsion.',
    'Successfully travelled between two major asteroid belt objects using the same spacecraft.',
    'Completed extended scientific operations around Ceres.',
  ],

  missionChallenges: [
    'Long-distance communication delays made mission operations complex.',
    'Ion propulsion produced very low thrust and required long periods of acceleration.',
    'Dawn experienced reaction wheel failures during its mission.',
    'Engineers had to manage the spacecraft using its remaining reaction wheels and hydrazine thrusters.',
    'The spacecraft eventually exhausted its hydrazine supply.',
    'Without hydrazine, Dawn could no longer maintain the correct orientation for communication and power generation.',
  ],

  currentStatus:
    'Mission completed on November 1, 2018. Dawn remains in orbit around ' +
    'Ceres as an inactive spacecraft. NASA designed its final orbit to ' +
    'prevent impact with Ceres for at least 20 years after mission completion, ' +
    'and likely much longer.',

  physicalRecoveryPossible: false,

  physicalRecoveryRationale:
    'Dawn is an inactive spacecraft in orbit around Ceres. It cannot be ' +
    'physically recovered by the player. The game instead reconstructs ' +
    'its spacecraft configuration, orbital history, telemetry and scientific ' +
    'observations from archived mission records. Physical spacecraft recovery ' +
    'is not represented as a real event.',

  collectibleKinds: [
    'Digital spacecraft reconstruction',
    'Ion propulsion system scan',
    'Vesta orbital observation archive',
    'Ceres geological observation archive',
    'Scientific instrument records',
    'Mission telemetry',
    'Trajectory reconstruction',
    'Final communication record',
  ],

  // -------------------------------------------------------------------------
  // COMPONENTS
  // -------------------------------------------------------------------------

  components: [
    {
      id: 'cmp-ion-engine',
      name: 'Ion Propulsion Thrusters',
      type: 'PROPULSION',
      functionPlain:
        'Electric engines that accelerate xenon ions to create a small but ' +
        'continuous thrust, allowing Dawn to travel between planetary bodies.',
      condition: 'Inactive. Propulsion system no longer operational.',
      scanDurationMs: 4500,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-ion-propulsion',
      historicalNote:
        'Dawn carried three ion thrusters. Its propulsion system enabled ' +
        'the spacecraft to orbit both Vesta and Ceres.',
      uncertain: false,
    },
    {
      id: 'cmp-xenon-tank',
      name: 'Xenon Propellant Tank',
      type: 'PROPULSION',
      functionPlain:
        'Stored xenon gas used by the ion propulsion system.',
      condition: 'Propellant consumption recorded in mission telemetry.',
      scanDurationMs: 3000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-xenon',
      historicalNote:
        'Xenon was the propellant used by Dawn electric thrusters.',
      uncertain: false,
    },
    {
      id: 'cmp-solar-arrays',
      name: 'Solar Array Wings',
      type: 'POWER',
      functionPlain:
        'Collected sunlight and converted it into electrical energy ' +
        'for spacecraft systems and ion propulsion.',
      condition: 'Inactive. No longer maintaining Sun-pointing orientation.',
      scanDurationMs: 3500,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-solar',
      historicalNote:
        'Two solar arrays measured approximately 8.3 metres by 2.3 metres each.',
      uncertain: false,
    },
    {
      id: 'cmp-framing-camera',
      name: 'Framing Cameras',
      type: 'INSTRUMENT',
      functionPlain:
        'Captured images used for mapping surfaces, navigation and geological investigation.',
      condition: 'Inactive. Extensive image archive recovered.',
      scanDurationMs: 2500,
      requiresAngle: false,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-camera',
      historicalNote:
        'The framing cameras provided important images of both Vesta and Ceres.',
      uncertain: false,
    },
    {
      id: 'cmp-vir',
      name: 'Visible and Infrared Mapping Spectrometer',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured reflected visible and infrared light to identify minerals and surface composition.',
      condition: 'Inactive. Spectral observation records available.',
      scanDurationMs: 4000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-vir',
      historicalNote:
        'The VIR instrument investigated mineralogical properties of Vesta and Ceres.',
      uncertain: false,
    },
    {
      id: 'cmp-grand',
      name: 'Gamma Ray and Neutron Detector (GRaND)',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured gamma rays and neutrons to investigate surface elements and composition.',
      condition: 'Inactive. Archived measurement data available.',
      scanDurationMs: 4000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-grand',
      historicalNote:
        'GRaND helped scientists investigate the elemental composition of both worlds.',
      uncertain: false,
    },
    {
      id: 'cmp-antenna',
      name: 'High-Gain Antenna',
      type: 'INSTRUMENT',
      functionPlain:
        'Directed radio signals towards Earth to transmit scientific data and receive commands.',
      condition: 'No longer operational because Dawn lost attitude control.',
      scanDurationMs: 3000,
      requiresAngle: true,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-communication',
      historicalNote:
        'Hydrazine depletion prevented Dawn from maintaining the antenna orientation required for communication.',
      uncertain: false,
    },
    {
      id: 'cmp-attitude-control',
      name: 'Reaction Control System',
      type: 'PROPULSION',
      functionPlain:
        'Hydrazine thrusters helped control spacecraft orientation and maintain pointing.',
      condition: 'Inoperative after hydrazine depletion.',
      scanDurationMs: 3500,
      requiresAngle: false,
      gameLayoutOffsetM: null,
      evidenceId: 'ev-attitude',
      historicalNote:
        'Hydrazine was used for attitude control, not as the propellant for the ion engines.',
      uncertain: false,
    },
  ],

  // -------------------------------------------------------------------------
  // EVIDENCE
  // -------------------------------------------------------------------------

  evidence: [
    {
      id: 'ev-ion-propulsion',
      label: 'Ion propulsion system reconstruction',
      type: 'STRUCTURAL_SCAN',
      description:
        'Digital reconstruction of the three ion thrusters and their role in interplanetary travel.',
      requiredForCompletion: true,
      points: 60,
      sourceRef: 'src-nasa-spacecraft',
    },
    {
      id: 'ev-xenon',
      label: 'Xenon propulsion record',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Recovered information describing xenon as the propellant used in Dawn ion engines.',
      requiredForCompletion: true,
      points: 40,
      sourceRef: 'src-nasa-spacecraft',
    },
    {
      id: 'ev-solar',
      label: 'Solar power system record',
      type: 'CONDITION_REPORT',
      description:
        'Recovered solar array specifications and power generation information.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-nasa-spacecraft',
    },
    {
      id: 'ev-camera',
      label: 'Framing camera observation archive',
      type: 'PHOTOGRAMMETRY',
      description:
        'Images from the Vesta and Ceres exploration campaigns.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-nasa-instruments',
    },
    {
      id: 'ev-vir',
      label: 'Mineralogical spectral archive',
      type: 'MATERIAL_SPECTROMETRY',
      description:
        'Visible and infrared measurements used to investigate surface minerals.',
      requiredForCompletion: true,
      points: 60,
      sourceRef: 'src-nasa-instruments',
    },
    {
      id: 'ev-grand',
      label: 'Elemental composition archive',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Gamma ray and neutron observations used to investigate surface composition.',
      requiredForCompletion: true,
      points: 60,
      sourceRef: 'src-nasa-instruments',
    },
    {
      id: 'ev-communication',
      label: 'Communication failure record',
      type: 'MISSION_RECORD',
      description:
        'Mission records showing the loss of spacecraft communication following the depletion of hydrazine.',
      requiredForCompletion: true,
      points: 70,
      sourceRef: 'src-nasa-end',
    },
    {
      id: 'ev-attitude',
      label: 'Attitude control failure reconstruction',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Reconstructed relationship between hydrazine depletion, loss of pointing and communication failure.',
      requiredForCompletion: true,
      points: 70,
      sourceRef: 'src-nasa-end',
    },
    {
      id: 'ev-vesta',
      label: 'Vesta scientific archive',
      type: 'MISSION_RECORD',
      description:
        'Recovered records from Dawn orbital observations of Vesta.',
      requiredForCompletion: true,
      points: 80,
      sourceRef: 'src-nasa-vesta',
    },
    {
      id: 'ev-ceres',
      label: 'Ceres scientific archive',
      type: 'MISSION_RECORD',
      description:
        'Recovered geological and mineralogical observations from Ceres.',
      requiredForCompletion: true,
      points: 80,
      sourceRef: 'src-nasa-ceres',
    },
  ],

  // -------------------------------------------------------------------------
  // INVESTIGATION OBJECTIVES
  // -------------------------------------------------------------------------

  objectives: [
    {
      id: 'obj-signal',
      label: 'Locate the archived Dawn spacecraft transmission signature.',
      required: true,
      points: 100,
    },
    {
      id: 'obj-reconstruct',
      label: 'Reconstruct the spacecraft structure and propulsion system.',
      required: true,
      points: 200,
    },
    {
      id: 'obj-vesta',
      label: 'Recover and analyse the Vesta observation archive.',
      required: true,
      points: 150,
    },
    {
      id: 'obj-ceres',
      label: 'Recover and analyse the Ceres observation archive.',
      required: true,
      points: 200,
    },
    {
      id: 'obj-ion',
      label: 'Understand how ion propulsion enabled the mission.',
      required: true,
      points: 150,
    },
    {
      id: 'obj-failure',
      label: 'Reconstruct the final communication failure.',
      required: true,
      points: 150,
    },
    {
      id: 'obj-heritage',
      label: 'Complete the final digital preservation record.',
      required: true,
      points: 100,
    },
  ],

  // -------------------------------------------------------------------------
  // INVESTIGATION CHALLENGES
  // -------------------------------------------------------------------------

  challenges: [
    {
      id: 'dawn-C1',
      type: 'MULTIPLE_CHOICE',
      title: 'The Mystery of the Ion Engine',

      objective:
        'Understand how Dawn travelled between Vesta and Ceres.',

      instructions:
        'Luna has recovered an incomplete propulsion record. ' +
        'Identify the technology responsible for Dawn’s long-distance journey.',

      options: [
        {
          id: 'a',
          text: 'Chemical rocket engines operating continuously.',
        },
        {
          id: 'b',
          text: 'Solar-powered ion propulsion using xenon.',
        },
        {
          id: 'c',
          text: 'Magnetic propulsion using planetary magnetic fields.',
        },
        {
          id: 'd',
          text: 'Nuclear fusion propulsion.',
        },
      ],

      correctAnswer: ['b'],

      explanation:
        'Dawn used ion propulsion. Electrical energy accelerated xenon ions ' +
        'to produce a small but continuous thrust. The thrust was weak, ' +
        'but operating over long periods allowed the spacecraft to change ' +
        'its trajectory and travel between Vesta and Ceres.',

      hints: [
        'Think about an engine that accelerates charged particles.',
        'The spacecraft used solar electricity and xenon gas.',
      ],

      points: 200,
      optional: false,
      retryPenaltyPower: 5,
    },

    {
      id: 'dawn-C2',
      type: 'MATCH_COMPONENTS',
      title: 'Rebuild the Scientific Laboratory',

      objective:
        'Match the scientific instruments to their actual functions.',

      instructions:
        'Connect each instrument to the scientific information it collected.',

      options: [
        { id: 'camera', text: 'Framing Cameras' },
        { id: 'vir', text: 'Visible and Infrared Spectrometer' },
        { id: 'grand', text: 'GRaND' },
        { id: 'f1', text: 'Captured surface images for mapping.' },
        { id: 'f2', text: 'Investigated mineralogical composition.' },
        { id: 'f3', text: 'Investigated elemental composition using gamma rays and neutrons.' },
        { id: 'f4', text: 'Generated oxygen from water ice.' },
      ],

      correctAnswer: {
        camera: 'f1',
        vir: 'f2',
        grand: 'f3',
      },

      decoyIds: ['f4'],

      explanation:
        'Dawn carried three major scientific instrument systems. ' +
        'The framing cameras photographed the targets, VIR studied ' +
        'mineralogy, and GRaND measured gamma rays and neutrons. ' +
        'The oxygen-generation option is not a function of these instruments.',

      hints: [
        'A camera records images, while a spectrometer studies light.',
        'GRaND investigates elements through gamma rays and neutrons.',
      ],

      points: 250,
      optional: false,
      retryPenaltyPower: 5,
    },

    {
      id: 'dawn-C3',
      type: 'ORDER_EVENTS',
      title: 'Two Worlds, One Spacecraft',

      objective:
        'Reconstruct the major events of the Dawn mission.',

      instructions:
        'Arrange the following mission events in chronological order.',

      options: [
        { id: 'e1', text: 'Dawn launches from Earth.' },
        { id: 'e2', text: 'Dawn performs a Mars gravity assist.' },
        { id: 'e3', text: 'Dawn enters orbit around Vesta.' },
        { id: 'e4', text: 'Dawn departs Vesta.' },
        { id: 'e5', text: 'Dawn enters orbit around Ceres.' },
        { id: 'e6', text: 'Dawn mission ends after hydrazine depletion.' },
      ],

      correctAnswer: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'],

      explanation:
        'Dawn launched in 2007, used Mars for a gravity assist in 2009, ' +
        'investigated Vesta from 2011 to 2012, reached Ceres in 2015 ' +
        'and completed its mission in 2018.',

      hints: [
        'Dawn visited Vesta before Ceres.',
        'The Mars gravity assist happened before either asteroid belt arrival.',
      ],

      points: 300,
      optional: false,
      retryPenaltyPower: 5,
    },

    {
      id: 'dawn-C4',
      type: 'DECODE_RECORD',
      title: 'The Last Signal',

      objective:
        'Understand the real reason Dawn stopped communicating.',

      instructions:
        'Luna recovered this final mission report: ' +
        '"Hydrazine depleted. Spacecraft attitude control unavailable. ' +
        'Earth-pointing antenna alignment lost." What happened?',

      options: [
        {
          id: 'a',
          text: 'The spacecraft crashed into Ceres.',
        },
        {
          id: 'b',
          text: 'The ion engines exploded.',
        },
        {
          id: 'c',
          text: 'Without hydrazine, Dawn could no longer control its orientation or point its antenna towards Earth.',
        },
        {
          id: 'd',
          text: 'Ceres destroyed the spacecraft with radiation.',
        },
      ],

      correctAnswer: ['c'],

      explanation:
        'Hydrazine was used for attitude control. When the supply ran out, ' +
        'Dawn could no longer reliably point its antenna towards Earth ' +
        'or its solar arrays towards the Sun. Communication was lost, ' +
        'and NASA officially ended the mission on November 1, 2018.',

      hints: [
        'The spacecraft needed to point its antenna towards Earth.',
        'The ion engines and the hydrazine attitude control system had different jobs.',
      ],

      points: 250,
      optional: false,
      retryPenaltyPower: 5,
    },
  ],

  // -------------------------------------------------------------------------
  // LUNA'S DIALOGUE
  // All conversations below are fictional game dialogue.
  // -------------------------------------------------------------------------

  dialogue: [
    {
      id: 'dawn-dlg-detection',
      trigger: 'ON_DETECTION_START',

      lines: [
        {
          speaker: 'LUNA',
          text: 'Hold on. I have detected an unusual deep-space archive signature.',
          emotion: 'CURIOUS',
        },
        {
          speaker: 'PLAYER',
          text: 'Another lost spacecraft?',
        },
        {
          speaker: 'LUNA',
          text: 'Not exactly lost. More like... finished working and left behind.',
          emotion: 'DRY',
        },
        {
          speaker: 'PLAYER',
          text: 'What is its designation?',
        },
        {
          speaker: 'LUNA',
          text: 'NASA Dawn. An explorer that visited two different worlds in the asteroid belt.',
          emotion: 'EXCITED',
        },
        {
          speaker: 'PLAYER',
          text: 'Two worlds with one spacecraft?',
        },
        {
          speaker: 'LUNA',
          text: 'Exactly. And it used an engine that barely pushed it, but never stopped pushing for very long.',
        },
        {
          speaker: 'LUNA',
          text: 'I think we have something extraordinary to investigate.',
          emotion: 'EXCITED',
        },
      ],

      onceOnly: true,
      skippable: true,
    },

    {
      id: 'dawn-dlg-approach',
      trigger: 'ON_SIGNAL_LOCK',

      lines: [
        {
          speaker: 'PLAYER',
          text: 'Can you locate the actual spacecraft?',
        },
        {
          speaker: 'LUNA',
          text: 'Its last known destination is Ceres. It is still orbiting there.',
        },
        {
          speaker: 'PLAYER',
          text: 'So we cannot walk up to it?',
        },
        {
          speaker: 'LUNA',
          text: 'Unless you have invented a very unusual space elevator, no.',
          emotion: 'DRY',
        },
        {
          speaker: 'LUNA',
          text: 'We will investigate its digital remains and reconstruct its journey.',
        },
        {
          speaker: 'LUNA',
          text: 'First, let us recover the spacecraft configuration.',
        },
      ],

      onceOnly: true,
      skippable: true,
    },

    {
      id: 'dawn-dlg-first-scan',
      trigger: 'ON_FIRST_SCAN',

      lines: [
        {
          speaker: 'LUNA',
          text: 'Scanning spacecraft architecture.',
        },
        {
          speaker: 'PLAYER',
          text: 'Those solar arrays are enormous.',
        },
        {
          speaker: 'LUNA',
          text: 'They needed to collect sunlight over an enormous distance from the Sun.',
        },
        {
          speaker: 'PLAYER',
          text: 'And the ion engines?',
        },
        {
          speaker: 'LUNA',
          text: 'Three thrusters. They accelerated xenon ions using electricity.',
        },
        {
          speaker: 'PLAYER',
          text: 'That does not sound very powerful.',
        },
        {
          speaker: 'LUNA',
          text: 'It was not. But patience is a very useful form of propulsion.',
          emotion: 'DRY',
        },
      ],

      onceOnly: true,
      skippable: true,
    },

    {
      id: 'dawn-dlg-ion',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'cmp-ion-engine',

      lines: [
        {
          speaker: 'LUNA',
          text: 'Ion propulsion system reconstructed.',
          emotion: 'EXCITED',
        },
        {
          speaker: 'PLAYER',
          text: 'How does it actually work?',
        },
        {
          speaker: 'LUNA',
          text: 'Electricity accelerates charged xenon particles out of the engine.',
        },
        {
          speaker: 'PLAYER',
          text: 'And that pushes the spacecraft?',
        },
        {
          speaker: 'LUNA',
          text: 'Exactly. Every particle moving backwards gives the spacecraft a tiny push forwards.',
        },
        {
          speaker: 'PLAYER',
          text: 'A tiny push took it all the way to Ceres?',
        },
        {
          speaker: 'LUNA',
          text: 'Tiny pushes become impressive when you give them enough time.',
          emotion: 'SOFT',
        },
      ],

      onceOnly: true,
      skippable: true,
    },

    {
      id: 'dawn-dlg-vesta',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'cmp-framing-camera',

      lines: [
        {
          speaker: 'LUNA',
          text: 'Vesta archive recovered.',
        },
        {
          speaker: 'PLAYER',
          text: 'What makes Vesta important?',
        },
        {
          speaker: 'LUNA',
          text: 'It is a differentiated rocky body. Its interior separated into different layers during its early history.',
        },
        {
          speaker: 'PLAYER',
          text: 'Almost like a miniature planet?',
        },
        {
          speaker: 'LUNA',
          text: 'That is a good way to think about it. Vesta preserves clues about how rocky planets developed.',
        },
        {
          speaker: 'LUNA',
          text: 'Now compare it with Ceres. The differences are the interesting part.',
        },
      ],

      onceOnly: true,
      skippable: true,
    },

    {
      id: 'dawn-dlg-ceres',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'cmp-vir',

      lines: [
        {
          speaker: 'LUNA',
          text: 'Ceres mineralogical records recovered.',
        },
        {
          speaker: 'PLAYER',
          text: 'What are those bright areas we see in the images?',
        },
        {
          speaker: 'LUNA',
          text: 'Some of the bright deposits contain salts, including sodium carbonate.',
        },
        {
          speaker: 'PLAYER',
          text: 'So Ceres has water?',
        },
        {
          speaker: 'LUNA',
          text: 'There is strong evidence of water-bearing materials and past brine activity.',
        },
        {
          speaker: 'PLAYER',
          text: 'A salty world hidden in the asteroid belt.',
        },
        {
          speaker: 'LUNA',
          text: 'Space has a talent for hiding interesting things in unexpected places.',
          emotion: 'SOFT',
        },
      ],

      onceOnly: true,
      skippable: true,
    },

    {
      id: 'dawn-dlg-final-signal',
      trigger: 'ON_POWER_DEPLETED',

      lines: [
        {
          speaker: 'SYSTEM',
          text: 'FINAL TELEMETRY RECORD: HYDRAZINE DEPLETION.',
        },
        {
          speaker: 'PLAYER',
          text: 'Was that why the spacecraft stopped responding?',
        },
        {
          speaker: 'LUNA',
          text: 'Yes. Without hydrazine, Dawn could no longer control its orientation.',
        },
        {
          speaker: 'PLAYER',
          text: 'And it could not point its antenna at Earth.',
        },
        {
          speaker: 'LUNA',
          text: 'Correct. Eventually, the signal disappeared.',
          emotion: 'SOFT',
        },
        {
          speaker: 'PLAYER',
          text: 'After all that travelling...',
        },
        {
          speaker: 'LUNA',
          text: 'It explored two worlds and changed how we understand the asteroid belt. That is a remarkable ending.',
        },
      ],

      onceOnly: true,
      skippable: false,
    },

    {
      id: 'dawn-dlg-complete',
      trigger: 'ON_INVESTIGATION_COMPLETE',

      lines: [
        {
          speaker: 'LUNA',
          text: 'Scientific archives recovered. Spacecraft reconstruction complete.',
          emotion: 'EXCITED',
        },
        {
          speaker: 'PLAYER',
          text: 'We have recovered the mission history.',
        },
        {
          speaker: 'LUNA',
          text: 'Vesta. Ceres. Ion propulsion. Eleven years of exploration.',
        },
        {
          speaker: 'PLAYER',
          text: 'And we have not physically recovered a single part.',
        },
        {
          speaker: 'LUNA',
          text: 'We recovered something more useful: the knowledge it collected.',
        },
        {
          speaker: 'LUNA',
          text: 'Archive preservation successful.',
          emotion: 'SOFT',
        },
      ],

      onceOnly: true,
      skippable: true,
    },

    {
      id: 'dawn-dlg-recharge',
      trigger: 'ON_MISSION_END',

      lines: [
        {
          speaker: 'PLAYER',
          text: 'Luna, tell me something interesting about Dawn.',
        },
        {
          speaker: 'LUNA',
          text: 'It travelled to two different worlds without needing a new spacecraft for the second journey.',
        },
        {
          speaker: 'PLAYER',
          text: 'That is impressive.',
        },
        {
          speaker: 'LUNA',
          text: 'And its ion engine accelerated it so gently that it took days to gain the speed of a car.',
          emotion: 'DRY',
        },
        {
          speaker: 'PLAYER',
          text: 'That slow?',
        },
        {
          speaker: 'LUNA',
          text: 'Very slow. But it kept going.',
        },
        {
          speaker: 'LUNA',
          text: 'Another interesting fact: Vesta and Ceres are both in the asteroid belt, but they tell very different stories about planetary development.',
        },
        {
          speaker: 'PLAYER',
          text: 'One rocky and differentiated, the other rich in water-bearing materials.',
        },
        {
          speaker: 'LUNA',
          text: 'Exactly. Two ancient worlds. One explorer.',
          emotion: 'SOFT',
        },
      ],

      onceOnly: true,
      skippable: true,
    },
  ],

  // -------------------------------------------------------------------------
  // REWARDS AND RESOURCES
  // -------------------------------------------------------------------------

  rewards: {
    basePoints: 1400,
    maxPoints: 2300,
    completionThreshold: 1400,
    difficultyTier: 4,

    archiveEntryId: 'ARCH-L3-DAWN-01',
    archiveEntryTitle: 'Dawn: The Explorer of Two Worlds',

    badges: [
      {
        id: 'badge-ion-pioneer',
        name: 'Ion Pioneer',
        description:
          'Master the technology that allowed Dawn to travel between two distant worlds.',
        condition:
          'Complete the ion propulsion investigation and challenge C1.',
      },
      {
        id: 'badge-two-worlds',
        name: 'Two Worlds, One Journey',
        description:
          'Successfully recover the scientific archives of both Vesta and Ceres.',
        condition:
          'Complete the Vesta and Ceres investigation objectives.',
      },
      {
        id: 'badge-silent-signal',
        name: 'The Last Transmission',
        description:
          'Reconstruct the final communication failure of the Dawn spacecraft.',
        condition:
          'Recover the attitude control and communication failure records.',
      },
      {
        id: 'badge-asteroid-archivist',
        name: 'Asteroid Belt Archivist',
        description:
          'Preserve the complete Dawn mission record.',
        condition:
          'Complete every mandatory objective and all four challenges.',
      },
    ],

    levelProgressPercent: 8,
    reputation: 350,

    resourceRestoration: [
      { resource: 'ARCHIVE_MEMORY', amount: 40 },
      { resource: 'DATA_STORAGE', amount: 35 },
      { resource: 'SCANNER_ENERGY', amount: 30 },
      { resource: 'DEEP_SPACE_CREDITS', amount: 200 },
    ],

    equipmentUpgrades: [
      {
        id: 'upgrade-ion-analyser',
        name: 'Ion Propulsion Analyser',
        effect:
          'Improves analysis of electric propulsion systems and xenon telemetry.',
      },
      {
        id: 'upgrade-deep-signal',
        name: 'Deep Space Signal Decoder',
        effect:
          'Improves detection and reconstruction of weak historical spacecraft signals.',
      },
      {
        id: 'upgrade-spectral',
        name: 'Advanced Spectral Scanner',
        effect:
          'Improves mineralogical analysis of archived planetary observations.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // COLLECTION SEQUENCE
  // -------------------------------------------------------------------------

  collectionSequence: {
    id: 'collect-dawn-archive',

    steps: [
      {
        order: 1,
        label: 'Acquire the Dawn signal',
        interaction:
          'Player aligns the deep-space receiver with the reconstructed mission signal.',
        durationMs: 3500,
      },
      {
        order: 2,
        label: 'Reconstruct spacecraft structure',
        interaction:
          'A holographic model of Dawn appears, revealing its solar arrays, antenna and propulsion system.',
        durationMs: 5000,
      },
      {
        order: 3,
        label: 'Recover Vesta archive',
        interaction:
          'Vesta images and scientific records are downloaded into the archive.',
        durationMs: 4500,
      },
      {
        order: 4,
        label: 'Recover Ceres archive',
        interaction:
          'Ceres geological observations and mineralogical data are reconstructed.',
        durationMs: 4500,
      },
      {
        order: 5,
        label: 'Reconstruct final transmission',
        interaction:
          'The final communication record is displayed as the spacecraft signal fades.',
        durationMs: 5000,
      },
      {
        order: 6,
        label: 'Preserve Dawn mission history',
        interaction:
          'Luna combines all recovered records into a permanent digital archive entry.',
        durationMs: 4000,
      },
    ],

    removesPhysicalObject: false,
  },

  // -------------------------------------------------------------------------
  // ARCHIVE ENTRY
  // -------------------------------------------------------------------------

  archive: {
    id: 'ARCH-L3-DAWN-01',

    title: 'Dawn: The Explorer of Two Worlds',
    tier: 'LANDMARK',

    summary:
      'NASA Dawn demonstrated that one spacecraft could investigate two ' +
      'different worlds in the asteroid belt. Its use of ion propulsion ' +
      'made a journey from Vesta to Ceres possible. Although its mission ' +
      'ended in 2018, its scientific discoveries continue to help scientists ' +
      'understand the earliest stages of planetary evolution.',

    sections: [
      {
        heading: 'The Journey',
        body:
          'Launched in 2007, Dawn travelled through the Solar System, used ' +
          'Mars for a gravity assist and entered orbit around Vesta in 2011. ' +
          'It departed Vesta in 2012 and reached Ceres in 2015.',
        sourceRefs: ['src-nasa-overview'],
      },
      {
        heading: 'The Technology',
        body:
          'Dawn used solar-powered ion propulsion. Its thrusters accelerated ' +
          'xenon ions, producing low thrust over extended periods. This ' +
          'technology allowed the spacecraft to travel between two worlds.',
        sourceRefs: ['src-nasa-spacecraft'],
      },
      {
        heading: 'The Scientific Discoveries',
        body:
          'Vesta provided information about differentiated rocky bodies. ' +
          'Ceres revealed water-bearing minerals, bright salt deposits and ' +
          'evidence of past brine-related geological activity.',
        sourceRefs: ['src-nasa-vesta', 'src-nasa-ceres'],
      },
      {
        heading: 'The Final Signal',
        body:
          'Dawn exhausted its hydrazine supply in October 2018. It could ' +
          'no longer control its orientation or point its antenna towards ' +
          'Earth. NASA declared the mission complete on November 1, 2018.',
        sourceRefs: ['src-nasa-end'],
      },
    ],

    openQuestions: [
      'What can Ceres reveal about the distribution of water in the early Solar System?',
      'How common are ocean-related chemical processes on dwarf planets?',
      'What other ancient planetary building blocks remain unexplored?',
    ],

    tags: [
      'NASA',
      'Dawn',
      'Vesta',
      'Ceres',
      'Ion Propulsion',
      'Asteroid Belt',
      'Dwarf Planet',
      'Planetary Science',
    ],
  },

  // -------------------------------------------------------------------------
  // EDUCATIONAL CONTENT
  // -------------------------------------------------------------------------

  educational: {
    surprisingFacts: [
      'Dawn was the first spacecraft to orbit a main-belt asteroid.',
      'It became the first spacecraft to orbit a dwarf planet.',
      'It visited Vesta and Ceres using the same spacecraft.',
      'Its ion propulsion system produced very low thrust but could operate for long periods.',
      'Dawn continued collecting scientific data around Ceres until the final stage of its mission.',
    ],

    concepts: [
      {
        term: 'Ion Propulsion',
        explanation:
          'An electric engine that accelerates charged particles to generate thrust. ' +
          'It pushes gently but can operate for long periods.',
      },
      {
        term: 'Gravity Assist',
        explanation:
          'A spacecraft flies near a planet and uses the planet’s motion and gravity ' +
          'to change its trajectory and orbital energy.',
      },
      {
        term: 'Differentiation',
        explanation:
          'The process in which a planetary body separates into layers according ' +
          'to density, such as a core, mantle and crust.',
      },
    ],

    takeaways: [
      'One spacecraft can investigate multiple planetary bodies.',
      'Ion propulsion can make long-distance interplanetary travel possible.',
      'Small worlds preserve important clues about the formation of the Solar System.',
    ],

    openQuestion:
      'If Dawn could reveal so much about just two objects in the asteroid belt, ' +
      'what secrets might the millions of unexplored bodies still contain?',
  },

  // -------------------------------------------------------------------------
  // SOURCES
  // -------------------------------------------------------------------------

  sources: [
    {
      id: 'src-nasa-overview',
      title: 'NASA — Dawn Mission Overview',
      url: 'https://science.nasa.gov/mission/dawn/',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-spacecraft',
      title: 'NASA — Dawn Spacecraft and Technology',
      url: 'https://science.nasa.gov/mission/dawn/technology/spacecraft/',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-quickfacts',
      title: 'NASA — Dawn Quick Facts',
      url: 'https://science.nasa.gov/mission/dawn/toolkit/quick-facts/',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-instruments',
      title: 'NASA — Dawn Science Instruments',
      url: 'https://science.nasa.gov/mission/dawn/technology/science-payload/',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-vesta',
      title: 'NASA — Dawn at Vesta',
      url: 'https://science.nasa.gov/mission/dawn/science/vesta/',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-ceres',
      title: 'NASA — Dawn at Ceres',
      url: 'https://science.nasa.gov/mission/dawn/science/ceres/',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-end',
      title: 'NASA — Dawn End of Mission',
      url: 'https://science.nasa.gov/mission/dawn/toolkit/end-of-mission/',
      role: 'PRIMARY',
    },
  ],

  // -------------------------------------------------------------------------
  // HISTORICAL UNCERTAINTY AND IMPLEMENTATION NOTES
  // -------------------------------------------------------------------------

  uncertaintyNotes: [
    'Dawn has no planetary surface landing coordinates. Its coordinates are null.',
    'The spacecraft is in orbit around Ceres. Exact current orbital coordinates are not provided.',
    'The date-only lastContact field is an approximate representation of the final communication period. It is not an exact timestamp.',
    'March 6, 2015 is used for Ceres arrival in UTC. Some NASA mission summaries display March 5 using US local time.',
    'The Vesta departure date is September 5, 2012. Do not confuse this with later Ceres mission events.',
    'The final spacecraft orbit is not a physical recovery location.',
    'Scientific observations are recovered from archived records, not transmitted by an operational Dawn spacecraft.',
    'All component condition descriptions are game representations, not direct physical inspections.',
    'All Luna and player dialogue is fictional and must not be presented as actual NASA mission communication.',
    'The discovery environment is a fictional digital reconstruction, not the actual location of Dawn.',
  ],
};
