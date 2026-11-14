
import type { ArtifactDefinition } from '../Core/artifactTypes.ts';

export const PIONEER_10: ArtifactDefinition = {
  id: 'pioneer-10',
  officialName: 'Pioneer 10 (Pioneer-F)',
  commonName: 'Pioneer 10',
  aliases: [
    'Pioneer-F',
    'Pioneer Jupiter Probe',
    'Pioneer 10 Deep Space Probe',
    '1972-012A',
  ],
  catalogIds: {
    nssdca: '1972-012A',
    cospar: '1972-012A',
  },
  type: 'DEEP_SPACE_PROBE',
  level: 3,
  locationType: 'DEEP_SPACE',
  locationTypeSecondary: 'SIGNAL_AND_DATA',
  locationRationale:
    'Pioneer 10 is an uncrewed spacecraft on an outbound trajectory from the Sun. It has no planetary landing site. Its historical location is represented through trajectory records, telemetry, Jupiter encounter data, and archived images.',
  agency: 'NASA',
  program: 'Pioneer Program',
  mission: 'Pioneer 10',
  dates: {
    launch: '1972-03-02T01:49:04Z',
    landing: null,
    firstSurfaceActivity: null,
    departure: null,
    lastContact: '2003-01-23T00:00:00Z',
    missionEnd: '2003-01-23T00:00:00Z',
  },
  coordinates: null,
  secondaryCoordinates: null,
  destination:
    'Outbound trajectory from the Solar System, generally toward the direction of Aldebaran',
  description:
    'Pioneer 10 was NASA’s first mission to the outer planets and the first spacecraft to fly past Jupiter. Launched on March 2, 1972, it crossed the asteroid belt and reached Jupiter in December 1973. The spacecraft investigated Jupiter’s atmosphere, magnetic field, radiation belts, and magnetosphere while returning images of the planet and several of its moons. After the encounter, Pioneer 10 continued outward, crossing the orbit of Neptune in 1983. It carried a gold-anodized aluminum plaque intended to communicate information about humanity and Earth to any intelligent beings that might encounter it. Designed for a mission of approximately 21 months, Pioneer 10 continued operating for more than 30 years. Its last signal was received on January 23, 2003.',
  objective:
    'Explore Jupiter and the outer Solar System, investigate the asteroid belt, measure the environment around Jupiter, and study interplanetary space beyond the orbit of Mars.',
  developmentReason:
    'Before Pioneer 10, Jupiter had never been explored at close range by a spacecraft. NASA needed to determine whether a spacecraft could safely travel through the asteroid belt and survive the intense radiation environment near Jupiter. Pioneer 10 was developed to perform the first direct investigation of the giant planet and demonstrate technologies needed for future outer Solar System missions.',
  majorEvents: [
    {
      utc: '1972-03-02T01:49:04Z',
      event: 'Pioneer 10 launched from Cape Canaveral, Florida, aboard an Atlas-Centaur launch vehicle.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1972-03-07T00:00:00Z',
      event: 'The first major trajectory correction was performed.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1972-03-26T00:00:00Z',
      event: 'A second trajectory correction refined the spacecraft path for the planned Jupiter encounter.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1972-07-15T00:00:00Z',
      event: 'Pioneer 10 entered the main asteroid belt.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1973-02-15T00:00:00Z',
      event: 'Pioneer 10 emerged from the asteroid belt after traversing approximately 435 million kilometres.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1973-11-26T20:30:00Z',
      event: 'The spacecraft detected Jupiter’s bow shock and entered the planet’s magnetospheric environment.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1973-12-04T02:26:00Z',
      event: 'Pioneer 10 made its closest approach to Jupiter at approximately 130,354 kilometres from the planet.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1974-01-02T00:00:00Z',
      event: 'The Jupiter encounter phase was declared complete.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1976-02-01T00:00:00Z',
      event: 'Pioneer 10 crossed Saturn’s orbital distance from the Sun.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1983-06-13T00:00:00Z',
      event: 'Pioneer 10 crossed the orbit of Neptune, becoming the first human-made object to travel beyond the orbit of the then-outermost planet.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '1997-03-31T19:35:00Z',
      event: 'NASA ended routine contact with Pioneer 10. Intermittent tracking and limited data collection continued.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '2002-04-27T00:00:00Z',
      event: 'Pioneer 10 returned its last telemetry data.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '2003-01-23T00:00:00Z',
      event: 'Earth received the final weak signal from Pioneer 10, transmitted from approximately 12.23 billion kilometres away.',
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      utc: '2006-03-04T00:00:00Z',
      event: 'A final attempt to contact Pioneer 10 failed to detect a response.',
      sourceRef: 'NASA_PIONEER_10',
    },
  ],
  scientificFindings: [
    'Provided the first direct close-range observations of Jupiter by a spacecraft.',
    'Returned approximately 500 images of Jupiter and its surroundings during the encounter period.',
    'Investigated Jupiter’s atmosphere, magnetic field, magnetosphere, radiation belts, and internal properties.',
    'Measured the intense radiation environment surrounding Jupiter, providing important information for the design of later spacecraft.',
    'Captured images of Callisto, Ganymede, and Europa.',
    'Provided observations of Jupiter’s Great Red Spot and atmospheric features.',
    'Used radio occultation observations to investigate Jupiter’s atmosphere.',
    'Detected the bow shock where the solar wind interacts with Jupiter’s magnetosphere.',
    'Collected measurements of the solar wind and interplanetary magnetic environment during its journey.',
    'Observed conditions within the asteroid belt and recorded fewer damaging particle encounters than had initially been feared.',
    'Provided observations indicating that Jupiter’s magnetic tail extended an enormous distance into the outer Solar System.',
    'Collected data from the outer heliosphere long after the original Jupiter mission had ended.',
  ],
  engineeringAchievements: [
    'Became the first spacecraft to successfully traverse the main asteroid belt.',
    'Became the first spacecraft to fly past Jupiter.',
    'Demonstrated the use of radioisotope thermoelectric generators as the spacecraft’s primary electrical power source.',
    'Used a spin-stabilized spacecraft design for long-duration deep-space flight.',
    'Reached Jupiter at a speed of approximately 126,000 kilometres per hour during closest approach.',
    'Survived the intense radiation environment around Jupiter and returned valuable scientific measurements.',
    'Continued functioning for more than 30 years, far exceeding its original planned mission duration.',
    'Crossed the orbit of Neptune in 1983, becoming the first human-made object to travel beyond the orbit of the outermost known planet at that time.',
    'Carried the Pioneer plaque, an early attempt to communicate humanity’s existence and origin to possible extraterrestrial discoverers.',
  ],
  missionChallenges: [
    'The spacecraft had to cross the asteroid belt before its density and hazard level were fully understood.',
    'Direct sunlight caused heating concerns during the early outbound journey.',
    'Jupiter’s intense radiation environment threatened spacecraft electronics and scientific instruments.',
    'The imaging photopolarimeter suffered radiation-related problems during the Jupiter encounter, affecting observations of Io.',
    'The long communication delay made real-time spacecraft control impossible during the Jupiter encounter.',
    'The spacecraft’s radioisotope power output gradually declined over its extended mission.',
    'By the end of the mission, insufficient electrical power prevented the radio transmitter from maintaining a detectable signal.',
    'The final attempts to contact the spacecraft were unsuccessful.',
  ],
  currentStatus:
    'Pioneer 10 is inactive and no longer communicates with Earth. It continues along its outbound trajectory through deep space. Its last signal was received on January 23, 2003. The spacecraft is not known to have been intercepted or recovered.',
  physicalRecoveryPossible: false,
  physicalRecoveryRationale:
    'Pioneer 10 is travelling through deep space on an outbound trajectory. It is extremely distant, has no functioning propulsion or communications system, and cannot be redirected by mission controllers. No recovery mission has been attempted. All in-game inspection must be represented as historical reconstruction and archived-data analysis rather than a physical encounter with the spacecraft.',
  collectibleKinds: [
    'DEEP_SPACE_TELEMETRY',
    'JUPITER_IMAGE_ARCHIVE',
    'ASTEROID_BELT_RECORD',
    'RADIATION_MEASUREMENT',
    'MAGNETOSPHERE_DATA',
    'PIONEER_PLAQUE_ARCHIVE',
    'POWER_SYSTEM_RECORD',
    'FINAL_SIGNAL_RECORD',
    'TRAJECTORY_ARCHIVE',
  ],
  components: [
    {
      id: 'spacecraft_bus',
      name: 'Central Spacecraft Bus',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'The central structure supported the scientific instruments, communication equipment, power systems, and spacecraft electronics.',
      condition:
        'Inactive and travelling through deep space. Current physical condition is not directly observed.',
      scanDurationMs: 6500,
      requiresAngle: false,
      gameLayoutOffsetM: { x: 0, y: 0, z: 0 },
      evidenceId: 'spacecraft_structure',
      historicalNote:
        'Pioneer 10 had a launch mass of approximately 258 kilograms.',
      uncertain: false,
    },
    {
      id: 'high_gain_antenna',
      name: 'High-Gain Parabolic Antenna',
      type: 'INSTRUMENT',
      functionPlain:
        'Provided the narrow radio beam used to transmit scientific data and telemetry to Earth.',
      condition:
        'No longer transmitting a detectable signal. Physical condition is unknown.',
      scanDurationMs: 7000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0, z: 0.8 },
      evidenceId: 'communication_record',
      historicalNote:
        'The antenna was essential for communicating across billions of kilometres of space.',
      uncertain: false,
    },
    {
      id: 'rtg_pair',
      name: 'SNAP-19 Radioisotope Thermoelectric Generators',
      type: 'POWER',
      functionPlain:
        'Converted heat from radioactive decay into electricity to operate the spacecraft and scientific instruments.',
      condition:
        'Power output declined over time and eventually became insufficient for reliable radio transmission.',
      scanDurationMs: 8000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: -1.2, y: 0, z: 0 },
      evidenceId: 'power_degradation_record',
      historicalNote:
        'Two SNAP-19 radioisotope thermoelectric generators supplied approximately 140 watts during the Jupiter encounter.',
      uncertain: false,
    },
    {
      id: 'magnetometer',
      name: 'Helium Vector Magnetometer',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured magnetic fields in interplanetary space and within Jupiter’s magnetosphere.',
      condition:
        'Inactive. Historical magnetic-field measurements remain available in the mission archive.',
      scanDurationMs: 6500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 1.1, y: 0, z: 0 },
      evidenceId: 'magnetic_field_data',
      historicalNote:
        'The magnetometer contributed to the first direct investigation of Jupiter’s magnetic environment.',
      uncertain: false,
    },
    {
      id: 'imaging_photopolarimeter',
      name: 'Imaging Photopolarimeter',
      type: 'INSTRUMENT',
      functionPlain:
        'Recorded images and polarization information used to study Jupiter’s atmosphere and cloud structures.',
      condition:
        'No longer operational. Radiation-related problems affected observations during the encounter.',
      scanDurationMs: 7500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0.5, y: 0.2, z: 0.5 },
      evidenceId: 'jupiter_image_archive',
      historicalNote:
        'The instrument returned images of Jupiter and several of its moons.',
      uncertain: false,
    },
    {
      id: 'plasma_analyzer',
      name: 'Quadrispherical Plasma Analyzer',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured properties of charged particles and plasma in the spacecraft’s environment.',
      condition:
        'Inactive. Archived measurements document the spacecraft’s passage through the Jovian environment.',
      scanDurationMs: 6500,
      requiresAngle: false,
      gameLayoutOffsetM: { x: -0.5, y: 0.2, z: 0.5 },
      evidenceId: 'plasma_measurements',
      historicalNote:
        'Plasma observations helped characterize the interaction between Jupiter’s magnetic field and surrounding space.',
      uncertain: false,
    },
    {
      id: 'cosmic_ray_telescope',
      name: 'Cosmic Ray Telescope',
      type: 'INSTRUMENT',
      functionPlain:
        'Detected energetic cosmic-ray particles and studied the radiation environment.',
      condition:
        'Inactive. Historical particle measurements are preserved in the mission archive.',
      scanDurationMs: 7000,
      requiresAngle: false,
      gameLayoutOffsetM: { x: 0, y: -0.4, z: -0.5 },
      evidenceId: 'radiation_data',
      historicalNote:
        'Pioneer 10’s radiation measurements were important for understanding the environment around Jupiter.',
      uncertain: false,
    },
    {
      id: 'meteoroid_detector',
      name: 'Meteoroid Detectors',
      type: 'INSTRUMENT',
      functionPlain:
        'Detected impacts and interactions with small particles during the spacecraft’s journey.',
      condition:
        'Inactive. The historical observations remain available.',
      scanDurationMs: 6000,
      requiresAngle: false,
      gameLayoutOffsetM: { x: 0.7, y: -0.3, z: -0.5 },
      evidenceId: 'asteroid_belt_record',
      historicalNote:
        'The spacecraft crossed the main asteroid belt without suffering catastrophic damage.',
      uncertain: false,
    },
    {
      id: 'pioneer_plaque',
      name: 'Pioneer Plaque',
      type: 'MARKER',
      functionPlain:
        'Carried a visual message depicting human figures, the Solar System, and the location of the Sun relative to nearby pulsars.',
      condition:
        'Attached to the spacecraft. Its present physical condition has not been directly inspected.',
      scanDurationMs: 8500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0.2, z: 1.1 },
      evidenceId: 'plaque_record',
      historicalNote:
        'The plaque was designed by Carl Sagan, Frank Drake, and Linda Salzman Sagan.',
      uncertain: false,
    },
  ],
  evidence: [
    {
      id: 'spacecraft_structure',
      label: 'Pioneer 10 Structural Record',
      type: 'STRUCTURAL_SCAN',
      description:
        'A historical reconstruction of the spacecraft bus, antenna, instrument arrangement, and spin-stabilized design.',
      requiredForCompletion: true,
      points: 100,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'communication_record',
      label: 'Deep Space Communication Archive',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Documents the spacecraft’s long-distance radio communication with Earth and the increasing signal delay.',
      requiredForCompletion: true,
      points: 125,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'power_degradation_record',
      label: 'Declining Power Record',
      type: 'CONDITION_REPORT',
      description:
        'Reconstructs the gradual reduction in electrical power from the SNAP-19 radioisotope generators.',
      requiredForCompletion: true,
      points: 125,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'magnetic_field_data',
      label: 'Jupiter Magnetic Field Measurements',
      type: 'LIVE_MEASUREMENT',
      description:
        'Archived magnetometer observations of Jupiter’s magnetic field and magnetosphere.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'jupiter_image_archive',
      label: 'First Close-Up Jupiter Image Archive',
      type: 'PHOTOGRAMMETRY',
      description:
        'Images returned by Pioneer 10 during its historic Jupiter encounter.',
      requiredForCompletion: true,
      points: 175,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'plasma_measurements',
      label: 'Jovian Plasma Measurements',
      type: 'LIVE_MEASUREMENT',
      description:
        'Archived measurements of plasma and charged particles around Jupiter.',
      requiredForCompletion: false,
      points: 100,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'radiation_data',
      label: 'Jupiter Radiation Environment',
      type: 'LIVE_MEASUREMENT',
      description:
        'Measurements of the intense radiation environment encountered during the Jupiter flyby.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'asteroid_belt_record',
      label: 'Asteroid Belt Crossing Record',
      type: 'MISSION_RECORD',
      description:
        'Documents Pioneer 10’s successful passage through the main asteroid belt between July 1972 and February 1973.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'plaque_record',
      label: 'Message to the Stars',
      type: 'PHOTOGRAMMETRY',
      description:
        'A reconstruction of the Pioneer plaque and its diagrams representing humanity and the Solar System.',
      requiredForCompletion: true,
      points: 175,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'trajectory_record',
      label: 'Outbound Trajectory Archive',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Documents Pioneer 10’s outward journey, including its crossing of Neptune’s orbit in June 1983.',
      requiredForCompletion: true,
      points: 125,
      sourceRef: 'NASA_PIONEER_10',
    },
    {
      id: 'final_signal_record',
      label: 'The Last Signal',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Documents the final weak signal received from Pioneer 10 on January 23, 2003.',
      requiredForCompletion: true,
      points: 200,
      sourceRef: 'NASA_LAST_SIGNAL',
    },
  ],
  objectives: [
    {
      id: 'identify_pioneer',
      label: 'Identify the Pioneer 10 spacecraft and its mission',
      required: true,
      points: 100,
    },
    {
      id: 'recover_structure',
      label: 'Reconstruct the spacecraft structure',
      required: true,
      points: 100,
    },
    {
      id: 'recover_asteroid_record',
      label: 'Recover the asteroid belt crossing record',
      required: true,
      points: 150,
    },
    {
      id: 'recover_jupiter_images',
      label: 'Recover the Jupiter encounter image archive',
      required: true,
      points: 175,
    },
    {
      id: 'analyze_radiation',
      label: 'Analyze the Jupiter radiation measurements',
      required: true,
      points: 150,
    },
    {
      id: 'recover_plaque',
      label: 'Reconstruct the Pioneer plaque',
      required: true,
      points: 175,
    },
    {
      id: 'trace_outbound',
      label: 'Reconstruct the outbound trajectory',
      required: true,
      points: 125,
    },
    {
      id: 'recover_final_signal',
      label: 'Recover the final signal record',
      required: true,
      points: 200,
    },
  ],
  challenges: [
    {
      id: 'pioneer_timeline',
      type: 'ORDER_EVENTS',
      title: 'Journey to the Giant Planet',
      objective:
        'Reconstruct the major stages of Pioneer 10’s historic journey.',
      instructions:
        'Place the events in chronological order, from launch to the final signal.',
      options: [
        { id: 'launch', text: 'Launch from Earth' },
        { id: 'asteroid', text: 'Enter the asteroid belt' },
        { id: 'emerge', text: 'Exit the asteroid belt' },
        { id: 'jupiter', text: 'Closest approach to Jupiter' },
        { id: 'neptune', text: 'Cross the orbit of Neptune' },
        { id: 'last_signal', text: 'Final signal received on Earth' },
      ],
      correctAnswer: [
        'launch',
        'asteroid',
        'emerge',
        'jupiter',
        'neptune',
        'last_signal',
      ],
      explanation:
        'Pioneer 10 launched in March 1972, crossed the asteroid belt between July 1972 and February 1973, reached Jupiter in December 1973, crossed Neptune’s orbit in June 1983, and sent its last signal in January 2003.',
      hints: [
        'The asteroid belt crossing occurred before the Jupiter encounter.',
        'The final signal arrived decades after the spacecraft passed Jupiter.',
      ],
      points: 175,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'pioneer_instruments',
      type: 'MATCH_COMPONENTS',
      title: 'The Instruments of Pioneer',
      objective:
        'Match the spacecraft instruments with their scientific functions.',
      instructions:
        'Connect each instrument to the type of observation it performed.',
      options: [
        { id: 'magnetometer', text: 'Helium Vector Magnetometer' },
        { id: 'photopolarimeter', text: 'Imaging Photopolarimeter' },
        { id: 'plasma', text: 'Quadrispherical Plasma Analyzer' },
        { id: 'cosmic', text: 'Cosmic Ray Telescope' },
        { id: 'magnetic_function', text: 'Measure magnetic fields' },
        { id: 'image_function', text: 'Image Jupiter and study cloud features' },
        { id: 'plasma_function', text: 'Measure charged particles and plasma' },
        { id: 'cosmic_function', text: 'Detect energetic cosmic-ray particles' },
      ],
      correctAnswer: {
        magnetometer: 'magnetic_function',
        photopolarimeter: 'image_function',
        plasma: 'plasma_function',
        cosmic: 'cosmic_function',
      },
      explanation:
        'Pioneer 10 carried eleven scientific instruments. Together they investigated Jupiter, the asteroid belt, solar wind, magnetic fields, radiation, and interplanetary space.',
      hints: [
        'A magnetometer measures magnetic fields.',
        'The imaging photopolarimeter returned images of Jupiter and its moons.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'pioneer_plaque_challenge',
      type: 'MULTIPLE_CHOICE',
      title: 'A Message Beyond Earth',
      objective:
        'Understand the purpose of the Pioneer plaque.',
      instructions:
        'Choose the best description of the plaque carried by Pioneer 10.',
      options: [
        {
          id: 'navigation',
          text: 'A navigation system used to steer the spacecraft.',
        },
        {
          id: 'communication',
          text: 'A visual message describing humanity and the Solar System for possible extraterrestrial discoverers.',
        },
        {
          id: 'radiation',
          text: 'A radiation shield designed to protect the spacecraft.',
        },
        {
          id: 'power',
          text: 'A backup power source for the radio transmitter.',
        },
      ],
      correctAnswer: ['communication'],
      explanation:
        'The Pioneer plaque depicts a man and a woman, the Solar System, and the Sun’s location relative to fourteen pulsars. It was intended as a message to any intelligent beings who might encounter the spacecraft.',
      hints: [
        'The plaque does not control the spacecraft.',
        'Its diagrams communicate information about the origin of the spacecraft.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'pioneer_final_signal',
      type: 'MULTIPLE_CHOICE',
      title: 'Why Did the Signal End?',
      objective:
        'Determine why Pioneer 10 eventually stopped communicating with Earth.',
      instructions:
        'Select the explanation supported by NASA’s mission record.',
      options: [
        {
          id: 'collision',
          text: 'The spacecraft was destroyed by an asteroid.',
        },
        {
          id: 'power',
          text: 'The declining RTG power output became insufficient to operate the transmitter.',
        },
        {
          id: 'jupiter',
          text: 'Jupiter captured the spacecraft into orbit.',
        },
        {
          id: 'antenna',
          text: 'The spacecraft deliberately turned its antenna away from Earth.',
        },
      ],
      correctAnswer: ['power'],
      explanation:
        'The radioisotope generators gradually produced less electrical power. Eventually the available power was insufficient to maintain a detectable radio transmission.',
      hints: [
        'The spacecraft operated for much longer than originally planned.',
        'NASA identified the declining power source as the reason the signal faded.',
      ],
      points: 175,
      optional: false,
      retryPenaltyPower: 5,
    },
  ],
  dialogue: [
    {
      id: 'pioneer_detection',
      trigger: 'ON_DETECTION_START',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Deep-space signal identified. Historical spacecraft: Pioneer 10.',
          emotion: 'NEUTRAL',
        },
        {
          speaker: 'LUNA',
          text: 'Launched in 1972. First spacecraft to cross the asteroid belt. First spacecraft to fly past Jupiter.',
          emotion: 'EXCITED',
        },
        {
          speaker: 'LUNA',
          text: 'Its last signal reached Earth in January 2003. The spacecraft itself continues outward, silent.',
          emotion: 'SOFT',
        },
        {
          speaker: 'SYSTEM',
          text: 'Historical archive reconstruction available. Physical interception is not possible.',
        },
      ],
    },
    {
      id: 'pioneer_first_scan',
      trigger: 'ON_FIRST_SCAN',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Spacecraft profile reconstructed. Spin-stabilized body, high-gain antenna, nuclear electrical power.',
          emotion: 'CURIOUS',
        },
        {
          speaker: 'LUNA',
          text: 'It was designed to survive a journey no spacecraft had attempted before.',
          emotion: 'SOFT',
        },
      ],
    },
    {
      id: 'pioneer_jupiter_reveal',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'imaging_photopolarimeter',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Jupiter image archive recovered. December 1973.',
          emotion: 'EXCITED',
        },
        {
          speaker: 'LUNA',
          text: 'For the first time, a spacecraft had reached the giant planet. Its images and measurements changed what we knew about Jupiter.',
          emotion: 'SOFT',
        },
      ],
    },
    {
      id: 'pioneer_plaque_reveal',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'pioneer_plaque',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'An unusual object. Not a scientific instrument. A message.',
          emotion: 'CURIOUS',
        },
        {
          speaker: 'LUNA',
          text: 'A picture of humanity. A map of our place in the Solar System. A message attached to a machine that may travel long after its creators are gone.',
          emotion: 'SOFT',
        },
      ],
    },
    {
      id: 'pioneer_power_reveal',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'rtg_pair',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Power system record recovered. Two radioisotope generators supplied electricity during the mission.',
          emotion: 'NEUTRAL',
        },
        {
          speaker: 'LUNA',
          text: 'The power faded slowly. The spacecraft did not need to crash or explode. Eventually, it simply could not speak loudly enough for Earth to hear.',
          emotion: 'SOFT',
        },
      ],
    },
    {
      id: 'pioneer_final_signal',
      trigger: 'ON_INVESTIGATION_COMPLETE',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Final signal archive recovered. January 23, 2003.',
          emotion: 'SOFT',
        },
        {
          speaker: 'LUNA',
          text: 'The signal travelled for more than eleven hours before reaching Earth.',
          emotion: 'NEUTRAL',
        },
        {
          speaker: 'LUNA',
          text: 'No reply followed. No new command. Only the record of a spacecraft continuing into the dark.',
          emotion: 'SOFT',
        },
      ],
    },
  ],
  rewards: {
    basePoints: 650,
    maxPoints: 1500,
    completionThreshold: 950,
    difficultyTier: 4,
    archiveEntryId: 'archive-pioneer-10',
    archiveEntryTitle: 'Pioneer 10: The First Messenger to Jupiter',
    badges: [
      {
        id: 'asteroid_pioneer',
        name: 'Belt Breaker',
        description:
          'Recovered the record of the first successful spacecraft crossing of the asteroid belt.',
        condition: 'Complete the asteroid belt crossing objective.',
      },
      {
        id: 'jupiter_first',
        name: 'First at Jupiter',
        description:
          'Recovered the historic Jupiter encounter archive.',
        condition: 'Recover the Jupiter image and measurement evidence.',
      },
      {
        id: 'message_to_stars',
        name: 'Message to the Stars',
        description:
          'Reconstructed the Pioneer plaque and its message.',
        condition: 'Complete the Pioneer plaque challenge.',
      },
      {
        id: 'last_whisper',
        name: 'The Last Whisper',
        description:
          'Recovered the final signal received from Pioneer 10.',
        condition: 'Recover the final signal evidence.',
      },
    ],
    levelProgressPercent: 15,
    reputation: 200,
    resourceRestoration: [
      { resource: 'ARCHIVE_DATA', amount: 40 },
      { resource: 'SCANNER_POWER', amount: 25 },
    ],
    equipmentUpgrades: [
      {
        id: 'deep_space_signal_v1',
        name: 'Deep Space Signal Reconstruction',
        effect:
          'Improves the recovery and interpretation of weak historical spacecraft transmissions.',
      },
      {
        id: 'radiation_analysis_v1',
        name: 'Radiation Analysis Upgrade',
        effect:
          'Improves the interpretation of archived radiation and charged-particle measurements.',
      },
    ],
  },
  collectionSequence: {
    id: 'pioneer_10_archive_recovery',
    steps: [
      {
        order: 1,
        label: 'Establish a deep-space signal lock',
        interaction: 'SIGNAL_CALIBRATION',
        durationMs: 7000,
      },
      {
        order: 2,
        label: 'Reconstruct the spacecraft structure',
        interaction: 'STRUCTURAL_SCAN',
        durationMs: 6500,
      },
      {
        order: 3,
        label: 'Recover the asteroid belt crossing record',
        interaction: 'MISSION_ARCHIVE_SCAN',
        durationMs: 7500,
      },
      {
        order: 4,
        label: 'Reconstruct the Jupiter encounter',
        interaction: 'IMAGE_AND_TELEMETRY_RECOVERY',
        durationMs: 9000,
      },
      {
        order: 5,
        label: 'Decode the Pioneer plaque',
        interaction: 'MESSAGE_RECONSTRUCTION',
        durationMs: 8500,
      },
      {
        order: 6,
        label: 'Recover the final signal',
        interaction: 'DEEP_SPACE_TELEMETRY_RECOVERY',
        durationMs: 10000,
      },
    ],
    removesPhysicalObject: false,
  },
  archive: {
    id: 'archive-pioneer-10',
    title: 'Pioneer 10: The First Messenger to Jupiter',
    tier: 'COMPLETE',
    summary:
      'Pioneer 10 was the first spacecraft to cross the asteroid belt and fly past Jupiter. Its historic encounter revealed important details about the giant planet and its dangerous radiation environment. The spacecraft continued outward for decades, carrying the Pioneer plaque as a message from humanity. Its last signal was received in January 2003.',
    sections: [
      {
        heading: 'The First Mission to the Outer Planets',
        body:
          'Pioneer 10 launched on March 2, 1972. It was designed to travel through the asteroid belt and investigate Jupiter, a region of the Solar System never previously explored at close range by a spacecraft.',
        sourceRefs: ['NASA_PIONEER_10', 'NASA_PIONEER_HISTORY'],
      },
      {
        heading: 'Crossing the Asteroid Belt',
        body:
          'The spacecraft entered the asteroid belt on July 15, 1972, and emerged in February 1973. The crossing demonstrated that a spacecraft could travel through this region without suffering catastrophic damage from asteroid or meteoroid impacts.',
        sourceRefs: ['NASA_PIONEER_10', 'NASA_PIONEER_HISTORY'],
      },
      {
        heading: 'Meeting Jupiter',
        body:
          'Pioneer 10 reached Jupiter in December 1973. It passed approximately 130,354 kilometres from the planet and returned images and measurements of the atmosphere, magnetic field, radiation belts, and magnetosphere. It also obtained images of several Galilean moons.',
        sourceRefs: ['NASA_PIONEER_10', 'NASA_LAST_SIGNAL'],
      },
      {
        heading: 'A Message for the Unknown',
        body:
          'Pioneer 10 carried a gold-anodized aluminum plaque. Its diagrams depicted a man and a woman, the Solar System, and the Sun’s location relative to fourteen pulsars. The plaque was designed as a message for any intelligent beings who might discover the spacecraft.',
        sourceRefs: ['NASA_PIONEER_HISTORY'],
      },
      {
        heading: 'Beyond the Outer Planets',
        body:
          'After the Jupiter encounter, Pioneer 10 continued outward. It crossed Saturn’s orbital distance in 1976 and the orbit of Neptune in June 1983, becoming the first human-made object to travel beyond the orbit of the outermost planet known at that time.',
        sourceRefs: ['NASA_PIONEER_10', 'NASA_PIONEER_HISTORY'],
      },
      {
        heading: 'The Last Signal',
        body:
          'Routine contact ended in March 1997, but intermittent tracking continued. The spacecraft returned its last telemetry data in April 2002. Its final weak signal was received on January 23, 2003, when it was approximately 12.23 billion kilometres from Earth. Its power source had declined too far to support further communication.',
        sourceRefs: ['NASA_PIONEER_10', 'NASA_LAST_SIGNAL'],
      },
    ],
    openQuestions: [
      'What is the present physical condition of Pioneer 10 after decades of exposure to deep space?',
      'How will the spacecraft’s remaining trajectory evolve as it travels farther from the Sun?',
      'Could another civilization ever encounter the Pioneer plaque?',
      'What can the long operational life of Pioneer 10 teach engineers about spacecraft longevity?',
      'How might future deep-space probes improve on Pioneer 10’s power and communication systems?',
    ],
    tags: [
      'Pioneer 10',
      'NASA',
      'Deep Space',
      'Jupiter',
      'Asteroid Belt',
      'Pioneer Program',
      'Pioneer Plaque',
      'Radioisotope Power',
      'Outer Solar System',
      'Interstellar Space',
    ],
  },
  educational: {
    surprisingFacts: [
      'Pioneer 10 was the first spacecraft to fly past Jupiter.',
      'It was the first spacecraft to successfully cross the main asteroid belt.',
      'The spacecraft travelled at approximately 126,000 kilometres per hour during its closest approach to Jupiter.',
      'Its final signal took approximately 11 hours and 20 minutes to reach Earth.',
      'Pioneer 10 carried a plaque designed to communicate humanity’s existence and origin to possible extraterrestrial discoverers.',
      'The spacecraft was designed for a mission of about 21 months but continued operating for more than 30 years.',
      'It crossed Neptune’s orbit in 1983, long before Neptune was visited by Voyager 2.',
      'Its electrical power came from radioactive decay rather than solar panels.',
    ],
    concepts: [
      {
        term: 'Asteroid Belt',
        explanation:
          'A region between the orbits of Mars and Jupiter containing many rocky bodies orbiting the Sun.',
      },
      {
        term: 'Jupiter Magnetosphere',
        explanation:
          'The region around Jupiter dominated by its magnetic field, containing charged particles and intense radiation belts.',
      },
      {
        term: 'Radioisotope Thermoelectric Generator',
        explanation:
          'A power source that converts heat produced by radioactive decay into electricity.',
      },
      {
        term: 'Spin Stabilization',
        explanation:
          'A spacecraft control method that uses rotation around an axis to help maintain a stable orientation.',
      },
      {
        term: 'Radio Occultation',
        explanation:
          'A technique that studies an atmosphere by observing how a radio signal changes as it passes behind or through it.',
      },
      {
        term: 'Deep Space Communication Delay',
        explanation:
          'The time required for a radio signal to travel between a distant spacecraft and Earth. At extreme distances, this delay can make real-time control impossible.',
      },
      {
        term: 'Pioneer Plaque',
        explanation:
          'A metal message attached to Pioneer 10 and Pioneer 11, depicting human figures and information about the Solar System and the location of Earth.',
      },
    ],
    takeaways: [
      'Pioneer 10 opened the outer Solar System to direct spacecraft exploration.',
      'The asteroid belt could be crossed safely by a carefully designed spacecraft.',
      'Jupiter’s radiation environment was more challenging than many early mission planners expected.',
      'Radioisotope power made long-duration missions possible far from the Sun.',
      'The Pioneer plaque represented an early attempt to communicate humanity’s existence beyond Earth.',
      'A spacecraft can continue travelling long after its scientific mission and communications have ended.',
    ],
    openQuestion:
      'If Pioneer 10 is eventually discovered by another civilization, will its plaque communicate enough information for them to understand where it came from and who sent it?',
  },
  sources: [
    {
      id: 'NASA_PIONEER_10',
      title: 'NASA Science - Pioneer 10',
      url: 'https://science.nasa.gov/mission/pioneer-10/',
      role: 'PRIMARY',
    },
    {
      id: 'NASA_PIONEER_HISTORY',
      title: 'NASA - 50 Years Ago: Pioneer 10 Launches to Explore Jupiter',
      url: 'https://www.nasa.gov/history/50-years-ago-pioneer-10-launches-to-explore-jupiter/',
      role: 'SUPPORTING',
    },
    {
      id: 'NASA_LAST_SIGNAL',
      title: 'NASA Science - Pioneer 10 Sends Last Signal',
      url: 'https://science.nasa.gov/missions/pioneer/pioneer-10-sends-last-signal/',
      role: 'SUPPORTING',
    },
  ],
  uncertaintyNotes: [
    'This artifact represents Pioneer 10 only. It should not be confused with Pioneer 11, its later sister spacecraft.',
    'Pioneer 10 has no planetary landing site. Its location is represented by its historical trajectory and deep-space records.',
    'The spacecraft’s present physical condition and exact current position are not directly confirmed by the historical mission page.',
    'The trajectory toward the general direction of Aldebaran does not mean the spacecraft is expected to reach or enter orbit around that star.',
    'The Pioneer plaque is known to have been attached to the spacecraft, but its present physical condition has not been inspected.',
    'The SNAP-19 generators supplied approximately 140 watts during the Jupiter encounter. Their output declined over time.',
    'NASA records identify January 23, 2003 as the date the final signal was received on Earth. Some historical summaries differ by a day depending on how the signal date is reported.',
    'The closest-approach timestamp is given as 02:26 UTC on December 4, 1973 in the NASA Science mission history. Some other NASA historical summaries describe the encounter using December 3.',
    'The component layout offsets are approximate game-scene placements and are not engineering survey measurements.',
    'All component scans and inspection interactions are historical reconstructions from mission documentation, not direct scans of the actual spacecraft.',
    'Some event entries use midnight UTC as a date marker when the source provides only a calendar date. These should not be interpreted as verified event times.',
  ],
};
