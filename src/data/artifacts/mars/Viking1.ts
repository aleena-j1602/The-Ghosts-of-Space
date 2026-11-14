
import type { ArtifactDefinition } from '../../artifacts/Core/artifactTypes.ts';

export const VIKING_1_LANDER: ArtifactDefinition = {
  id: 'viking-1-lander',
  officialName: 'Viking 1 Lander',
  commonName: 'Viking 1',
  aliases: [
    'Viking-B Lander',
    'Viking Lander 1',
    'Viking 1 Surface Lander',
    'Thomas Mutch Memorial Station',
    '1975-075C',
  ],
  catalogIds: {
    nssdca: '1975-075C',
    cospar: '1975-075C',
  },
  type: 'MARS_LANDER',
  level: 2,
  locationType: 'SURFACE',
  locationTypeSecondary: 'SIGNAL_AND_DATA',
  locationRationale:
    'Viking 1 is a stationary lander on the western slopes of Chryse Planitia. Its landing site is a real Martian surface location. The mission is also represented through archived images, science measurements, and its final communications.',
  agency: 'NASA',
  program: 'Viking Program',
  mission: 'Viking 1',
  dates: {
    launch: '1975-08-20T21:22:00Z',
    landing: '1976-07-20T11:53:06Z',
    firstSurfaceActivity: '1976-07-20T11:53:06Z',
    departure: null,
    lastContact: '1982-11-11',
    missionEnd: '1982-11-11',
  },
  coordinates: {
    latDeg: 22.483,
    lonDeg: -47.94,
    body: 'Mars',
    frame: 'Aerographic',
    accuracyM: null,
    note:
      'NASA mission history gives 22.483° N, 47.94° W. Other NASA/NSSDC references use planetocentric coordinates of approximately 22.27° N, 312.05° E. Coordinate values depend on the reference system.',
  },
  secondaryCoordinates: null,
  destination: 'Western slopes of Chryse Planitia, Mars',
  description:
    'Viking 1 was the first NASA spacecraft to land successfully on Mars and return extensive surface science data. The lander touched down on the western slopes of Chryse Planitia on July 20, 1976. It carried cameras, a robotic sampling arm, a gas chromatograph mass spectrometer, biological experiments, an X-ray fluorescence spectrometer, meteorological sensors, and a seismometer. Its experiments investigated the Martian surface, atmosphere, weather, soil chemistry, and the possibility of microbial life. Viking 1 continued operating for more than six years before communications ended in November 1982.',
  objective:
    'Safely land on Mars, photograph the surface, analyze Martian soil and atmosphere, monitor weather and seismic activity, and investigate whether the environment contains evidence of life.',
  developmentReason:
    'Before Viking, Mars had been observed primarily from Earth and by flyby spacecraft. NASA needed a mission capable of placing scientific instruments directly on the surface while also using an orbiter to survey the planet and identify safe landing locations. Viking combined orbital reconnaissance with an instrumented lander to study the Martian environment in detail and conduct the first major in-situ search for evidence of life on Mars.',
  majorEvents: [
    {
      utc: '1975-08-20T21:22:00Z',
      event: 'Viking 1 launched from Cape Canaveral aboard a Titan IIIE-Centaur launch vehicle.',
      sourceRef: 'NASA_VIKING_1',
    },
    {
      utc: '1976-06-19T00:00:00Z',
      event: 'The Viking 1 spacecraft entered orbit around Mars.',
      sourceRef: 'NASA_VIKING_1',
    },
    {
      utc: '1976-07-20T08:32:00Z',
      event: 'The Viking 1 lander separated from its orbiter before beginning atmospheric entry and descent.',
      sourceRef: 'NASA_VIKING_1',
    },
    {
      utc: '1976-07-20T11:53:06Z',
      event: 'Viking 1 successfully landed on the western slopes of Chryse Planitia.',
      sourceRef: 'NASA_VIKING_1',
    },
    {
      utc: '1976-07-20T12:00:00Z',
      event: 'Viking 1 began returning images from the Martian surface, including the first photograph taken from the surface of Mars.',
      sourceRef: 'NASA_VIKING_1',
    },
    {
      utc: '1976-07-28T00:00:00Z',
      event: 'The robotic sampler arm collected the first Martian soil samples and delivered material to the lander science instruments.',
      sourceRef: 'NASA_VIKING_1',
    },
    {
      utc: '1976-11-01T00:00:00Z',
      event: 'The primary mission phase concluded and extended operations continued.',
      sourceRef: 'NASA_VIKING_1',
    },
    {
      utc: '1982-11-11T00:00:00Z',
      event: 'The lander returned its final communication after a faulty command interrupted communications. Subsequent recovery attempts were unsuccessful.',
      sourceRef: 'NASA_VIKING_1',
    },
  ],
  scientificFindings: [
    'Returned the first images ever taken from the surface of Mars, including color photographs and a wide panoramic view of the landing area.',
    'Measured Martian atmospheric pressure, temperature, and wind conditions over an extended period.',
    'Found that the Martian atmosphere is thin and composed predominantly of carbon dioxide.',
    'Measured surface temperatures ranging from approximately -86°C before dawn to approximately -33°C during the afternoon.',
    'Analyzed soil samples using biological experiments and a gas chromatograph mass spectrometer. The biological experiments produced results that initially raised questions about possible life, but the overall findings did not establish the presence of living organisms.',
    'The gas chromatograph mass spectrometer did not detect the expected organic compounds in the analyzed soil samples.',
    'Identified a soil chemistry dominated by materials unlike familiar terrestrial or lunar surface samples, including an abundance of sulfur.',
    'Provided surface observations that helped characterize Chryse Planitia as a broad, relatively smooth plain associated with ancient flooding and channel systems.',
    'The lander seismometer did not return useful seismic measurements because it failed to uncage after landing.',
  ],
  engineeringAchievements: [
    'Achieved a successful soft landing on Mars after interplanetary cruise, orbital insertion, separation, atmospheric entry, and descent.',
    'Demonstrated a surface laboratory capable of analyzing extraterrestrial soil without returning samples to Earth.',
    'Used a robotic sampler arm to collect and deliver soil to multiple onboard experiments.',
    'Operated two radioisotope thermoelectric generators to provide electrical power during the long Martian surface mission.',
    'Returned high-quality surface images and panoramic observations from another planet.',
    'Operated far beyond the original 90-day surface mission design.',
    'Combined direct-to-Earth communications with relay communications through the Viking orbiter.',
  ],
  missionChallenges: [
    'The originally planned landing area was found to be rougher than expected after orbital imaging. The landing site was changed to a safer region in Chryse Planitia.',
    'The lander had to survive atmospheric entry and a powered descent before beginning surface operations.',
    'The seismometer failed to uncage and could not provide the planned seismic observations.',
    'The biological experiment results were difficult to interpret and did not provide an unambiguous answer about the presence of life.',
    'The lander eventually stopped communicating after a faulty command was transmitted from Earth in November 1982.',
    'The lander was designed for a much shorter primary mission, requiring extended operations to manage power, instrument health, and communications over several years.',
  ],
  currentStatus:
    'Viking 1 is no longer operational and remains at its landing site in Chryse Planitia. Its final communication was received on November 11, 1982. The spacecraft is an inactive human-made artifact on Mars. Its present physical condition has not been established through a modern close-up inspection.',
  physicalRecoveryPossible: false,
  physicalRecoveryRationale:
    'The lander remains on Mars, and no sample-return or recovery mission has retrieved it. A physical recovery would require a dedicated Mars mission, landing near the historical site, locating the lander, and transporting the hardware away from the planet. The game should present scans and component inspection as digital reconstructions based on historical records, not as verified observations of its current physical condition.',
  collectibleKinds: [
    'LANDER_IMAGE_ARCHIVE',
    'MARTIAN_SOIL_ANALYSIS',
    'BIOLOGY_EXPERIMENT_RECORD',
    'ATMOSPHERIC_MEASUREMENT',
    'WEATHER_LOG',
    'ENGINEERING_TELEMETRY',
    'MISSION_TRANSMISSION',
    'SAMPLER_ARM_RECORD',
  ],
  components: [
    {
      id: 'lander_body',
      name: 'Lander Central Body',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'The central spacecraft structure supported the scientific instruments, onboard systems, and landing hardware.',
      condition:
        'Inactive on the Martian surface. Present-day structural condition has not been directly verified.',
      scanDurationMs: 6000,
      requiresAngle: false,
      gameLayoutOffsetM: { x: 0, y: 1.1, z: 0 },
      evidenceId: 'lander_structure',
      historicalNote:
        'The lander was approximately three metres across and about two metres high.',
      uncertain: false,
    },
    {
      id: 'landing_legs',
      name: 'Landing Legs and Footpads',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'Provided support and stability when the lander contacted the Martian surface.',
      condition:
        'Historical landing hardware. Current condition and exact surface contact geometry are unverified.',
      scanDurationMs: 5000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0, z: 0 },
      evidenceId: 'landing_system_record',
      historicalNote:
        'The lander successfully settled on Chryse Planitia and began surface operations.',
      uncertain: false,
    },
    {
      id: 'rtg_pair',
      name: 'Radioisotope Thermoelectric Generators',
      type: 'POWER',
      functionPlain:
        'Converted heat from radioactive decay into electrical power for the lander.',
      condition:
        'No longer producing useful mission power. Current physical condition is unknown.',
      scanDurationMs: 7000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: -0.8, y: 0.5, z: -0.7 },
      evidenceId: 'power_system_record',
      historicalNote:
        'The Viking landers used two SNAP-19 radioisotope thermoelectric generators.',
      uncertain: false,
    },
    {
      id: 'camera_system',
      name: 'Surface Imaging System',
      type: 'INSTRUMENT',
      functionPlain:
        'Used two facsimile cameras to photograph the landing area and produce panoramic surface images.',
      condition:
        'No longer operational. The returned images remain available in mission archives.',
      scanDurationMs: 6500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0.2, y: 1.8, z: 0.5 },
      evidenceId: 'first_surface_image',
      historicalNote:
        'The imaging system returned the first photograph taken from the surface of Mars.',
      uncertain: false,
    },
    {
      id: 'sampler_arm',
      name: 'Remote Sampler Arm',
      type: 'INSTRUMENT',
      functionPlain:
        'Extended away from the lander to collect Martian soil and deliver samples to onboard experiments.',
      condition:
        'Inactive. The exact present-day condition and position of the arm have not been confirmed.',
      scanDurationMs: 8000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 1.2, y: 0.2, z: 0.8 },
      evidenceId: 'soil_sampling_record',
      historicalNote:
        'The sampler arm collected the first soil samples on July 28, 1976.',
      uncertain: false,
    },
    {
      id: 'gcms',
      name: 'Gas Chromatograph Mass Spectrometer',
      type: 'INSTRUMENT',
      functionPlain:
        'Analyzed soil samples for chemical composition and searched for organic compounds.',
      condition:
        'Inactive. Historical experiment results are preserved in the mission science archive.',
      scanDurationMs: 7500,
      requiresAngle: false,
      gameLayoutOffsetM: { x: 0.4, y: 0.7, z: -0.5 },
      evidenceId: 'soil_chemistry_record',
      historicalNote:
        'The instrument did not detect the expected organic compounds in the analyzed soil samples.',
      uncertain: false,
    },
    {
      id: 'biology_lab',
      name: 'Biological Experiment Laboratory',
      type: 'INSTRUMENT',
      functionPlain:
        'Processed Martian soil samples through experiments designed to investigate possible biological activity.',
      condition:
        'Inactive. The experiment results remain scientifically important but did not establish the presence of life.',
      scanDurationMs: 8000,
      requiresAngle: false,
      gameLayoutOffsetM: { x: -0.4, y: 0.7, z: -0.5 },
      evidenceId: 'biology_experiment_record',
      historicalNote:
        'Some experiment results were initially interpreted as possible biological activity, but the results remained ambiguous.',
      uncertain: false,
    },
    {
      id: 'xray_spectrometer',
      name: 'X-Ray Fluorescence Spectrometer',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured the elemental composition of Martian soil samples.',
      condition:
        'Inactive. Its historical measurements remain available for scientific analysis.',
      scanDurationMs: 6500,
      requiresAngle: false,
      gameLayoutOffsetM: { x: 0.1, y: 0.6, z: 0.6 },
      evidenceId: 'elemental_analysis_record',
      historicalNote:
        'The instrument contributed to the characterization of the chemical composition of the Martian surface material.',
      uncertain: false,
    },
    {
      id: 'weather_package',
      name: 'Meteorology Instrument Package',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured atmospheric temperature, pressure, and wind conditions near the landing site.',
      condition:
        'Inactive. Historical weather measurements remain archived.',
      scanDurationMs: 6500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: -0.9, y: 1.3, z: 0.4 },
      evidenceId: 'weather_measurements',
      historicalNote:
        'The lander returned repeated weather observations throughout its extended mission.',
      uncertain: false,
    },
    {
      id: 'seismometer',
      name: 'Seismometer',
      type: 'INSTRUMENT',
      functionPlain:
        'Was intended to detect ground motion and investigate seismic activity on Mars.',
      condition:
        'Failed to uncage after landing and did not provide the planned seismic measurements.',
      scanDurationMs: 6000,
      requiresAngle: false,
      gameLayoutOffsetM: { x: -0.3, y: 0.8, z: 0.2 },
      evidenceId: 'seismometer_failure_record',
      historicalNote:
        'The Viking 1 seismometer failure is a documented limitation of the mission science return.',
      uncertain: false,
    },
  ],
  evidence: [
    {
      id: 'lander_structure',
      label: 'Lander Structural Record',
      type: 'STRUCTURAL_SCAN',
      description:
        'A reconstruction of the lander body and its principal structural elements based on historical spacecraft documentation.',
      requiredForCompletion: true,
      points: 100,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'landing_system_record',
      label: 'Successful Landing Record',
      type: 'MISSION_RECORD',
      description:
        'Confirms that Viking 1 successfully completed its descent and settled on the Martian surface.',
      requiredForCompletion: true,
      points: 100,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'power_system_record',
      label: 'RTG Power System Record',
      type: 'MISSION_RECORD',
      description:
        'Documents the use of two SNAP-19 radioisotope thermoelectric generators to power the lander.',
      requiredForCompletion: false,
      points: 75,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'first_surface_image',
      label: 'First Image from Mars',
      type: 'PHOTOGRAMMETRY',
      description:
        'Archived surface imagery returned shortly after landing, showing the surrounding Martian terrain.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'soil_sampling_record',
      label: 'First Soil Sampling Record',
      type: 'MISSION_RECORD',
      description:
        'Documents the first soil collection by the Viking 1 robotic sampler arm on July 28, 1976.',
      requiredForCompletion: true,
      points: 125,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'soil_chemistry_record',
      label: 'Soil Chemistry Results',
      type: 'MATERIAL_SPECTROMETRY',
      description:
        'Reconstructs the chemical analysis performed by the gas chromatograph mass spectrometer, including its failure to detect expected organic compounds.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'biology_experiment_record',
      label: 'Biological Experiment Archive',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Contains the historical results of the biological experiments and the unresolved interpretation of their signals.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'elemental_analysis_record',
      label: 'Elemental Composition Record',
      type: 'MATERIAL_SPECTROMETRY',
      description:
        'Documents the use of X-ray fluorescence measurements to investigate the composition of Martian soil.',
      requiredForCompletion: false,
      points: 100,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'weather_measurements',
      label: 'Chryse Planitia Weather Log',
      type: 'LIVE_MEASUREMENT',
      description:
        'Archived measurements of temperature, pressure, and wind collected by the lander meteorology package.',
      requiredForCompletion: true,
      points: 125,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'seismometer_failure_record',
      label: 'Silent Seismometer',
      type: 'CONDITION_REPORT',
      description:
        'Documents the failure of the Viking 1 seismometer to uncage after landing.',
      requiredForCompletion: false,
      points: 75,
      sourceRef: 'NASA_VIKING_1',
    },
    {
      id: 'final_transmission',
      label: 'Final Viking 1 Transmission',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Records the end of communications on November 11, 1982, following a faulty command sent from Earth.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'NASA_VIKING_1',
    },
  ],
  objectives: [
    {
      id: 'identify_lander',
      label: 'Identify the Viking 1 lander and its landing site',
      required: true,
      points: 100,
    },
    {
      id: 'scan_imaging',
      label: 'Recover the first surface image archive',
      required: true,
      points: 150,
    },
    {
      id: 'scan_sampler',
      label: 'Investigate the robotic soil sampler',
      required: true,
      points: 125,
    },
    {
      id: 'analyze_soil',
      label: 'Reconstruct the soil chemistry results',
      required: true,
      points: 150,
    },
    {
      id: 'analyze_biology',
      label: 'Recover the biological experiment records',
      required: true,
      points: 150,
    },
    {
      id: 'recover_weather',
      label: 'Recover the Chryse Planitia weather archive',
      required: true,
      points: 125,
    },
    {
      id: 'investigate_failure',
      label: 'Investigate the seismometer failure',
      required: false,
      points: 75,
    },
    {
      id: 'recover_final_signal',
      label: 'Recover the final transmission record',
      required: true,
      points: 150,
    },
  ],
  challenges: [
    {
      id: 'viking_landing_sequence',
      type: 'ORDER_EVENTS',
      title: 'The First Successful Landing',
      objective:
        'Reconstruct the major stages of Viking 1 reaching the Martian surface.',
      instructions:
        'Arrange the events in the correct historical order, from launch to the first surface operations.',
      options: [
        { id: 'launch', text: 'Launch from Earth' },
        { id: 'orbit', text: 'Arrival and insertion into Mars orbit' },
        { id: 'separation', text: 'Lander separates from orbiter' },
        { id: 'landing', text: 'Touchdown at Chryse Planitia' },
        { id: 'images', text: 'First surface images returned' },
      ],
      correctAnswer: [
        'launch',
        'orbit',
        'separation',
        'landing',
        'images',
      ],
      explanation:
        'Viking 1 launched in August 1975, entered Mars orbit in June 1976, separated from its orbiter on July 20, and landed later that day. Surface imaging began shortly after touchdown.',
      hints: [
        'The spacecraft spent months travelling from Earth before reaching Mars.',
        'The lander could not begin surface photography until after touchdown.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'viking_instrument_matching',
      type: 'MATCH_COMPONENTS',
      title: 'A Laboratory on Mars',
      objective:
        'Match Viking 1 instruments with the scientific tasks they were designed to perform.',
      instructions:
        'Connect each instrument to its correct function.',
      options: [
        { id: 'camera', text: 'Surface imaging system' },
        { id: 'sampler', text: 'Remote sampler arm' },
        { id: 'gcms', text: 'Gas chromatograph mass spectrometer' },
        { id: 'weather', text: 'Meteorology package' },
        { id: 'seismometer', text: 'Seismometer' },
        { id: 'imaging_function', text: 'Photograph the landing site' },
        { id: 'sampling_function', text: 'Collect and deliver soil samples' },
        { id: 'chemistry_function', text: 'Analyze chemical composition and search for organics' },
        { id: 'weather_function', text: 'Measure atmospheric conditions' },
        { id: 'seismic_function', text: 'Detect ground motion' },
      ],
      correctAnswer: {
        camera: 'imaging_function',
        sampler: 'sampling_function',
        gcms: 'chemistry_function',
        weather: 'weather_function',
        seismometer: 'seismic_function',
      },
      explanation:
        'Viking 1 carried a broad science laboratory. Its instruments photographed the surface, collected and analyzed soil, measured weather, and attempted seismic observations. The seismometer did not successfully uncage.',
      hints: [
        'The sampler arm physically moved soil into the lander laboratory.',
        'The seismometer was intended to study ground motion, but it did not operate as planned.',
      ],
      points: 175,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'viking_life_search',
      type: 'MULTIPLE_CHOICE',
      title: 'Did Viking Find Life?',
      objective:
        'Interpret the historical outcome of the Viking biological experiments.',
      instructions:
        'Choose the conclusion best supported by the mission results.',
      options: [
        {
          id: 'confirmed',
          text: 'Viking confirmed living organisms in Martian soil.',
        },
        {
          id: 'no_confirmation',
          text: 'Some results were ambiguous, but the mission did not establish the presence of life.',
        },
        {
          id: 'no_experiments',
          text: 'Viking did not conduct biological experiments.',
        },
        {
          id: 'organic_confirmation',
          text: 'The gas chromatograph mass spectrometer found abundant organic compounds.',
        },
      ],
      correctAnswer: ['no_confirmation'],
      explanation:
        'The biological experiments produced results that were difficult to interpret. The overall Viking findings did not establish the presence of life, and the gas chromatograph mass spectrometer did not detect the expected organic compounds.',
      hints: [
        'Distinguish an unusual experiment result from proof of life.',
        'Consider what the chemical analysis found about organic compounds.',
      ],
      points: 175,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'viking_seismometer',
      type: 'MULTIPLE_CHOICE',
      title: 'The Silent Instrument',
      objective:
        'Determine why Viking 1 did not return the planned seismic measurements.',
      instructions:
        'Select the documented reason for the missing seismic data.',
      options: [
        {
          id: 'power_loss',
          text: 'The lander immediately lost all electrical power.',
        },
        {
          id: 'uncage_failure',
          text: 'The seismometer failed to uncage after landing.',
        },
        {
          id: 'marsquake',
          text: 'A major Mars earthquake destroyed the instrument.',
        },
        {
          id: 'not_installed',
          text: 'The spacecraft did not carry a seismometer.',
        },
      ],
      correctAnswer: ['uncage_failure'],
      explanation:
        'The Viking 1 seismometer failed to uncage after landing. This prevented it from providing the planned seismic observations.',
      hints: [
        'The instrument was carried by the lander but did not become operational.',
        'The failure occurred during deployment rather than because of a recorded Mars earthquake.',
      ],
      points: 100,
      optional: true,
      retryPenaltyPower: 3,
    },
  ],
  dialogue: [
    {
      id: 'viking_detection',
      trigger: 'ON_DETECTION_START',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Signal source identified. Historical mission: Viking 1. Surface location: Chryse Planitia, Mars.',
          emotion: 'NEUTRAL',
        },
        {
          speaker: 'LUNA',
          text: 'This lander returned the first images ever captured from the surface of Mars. Its instruments also conducted one of humanity’s earliest direct searches for life beyond Earth.',
          emotion: 'CURIOUS',
        },
        {
          speaker: 'SYSTEM',
          text: 'Archive reconstruction available. Physical condition of the artifact has not been verified.',
        },
      ],
    },
    {
      id: 'viking_first_scan',
      trigger: 'ON_FIRST_SCAN',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'The landing record is intact. July 20, 1976. A successful touchdown on the western slopes of Chryse Planitia.',
          emotion: 'SOFT',
        },
        {
          speaker: 'LUNA',
          text: 'The first images were more than photographs. They were humanity’s first direct view of the ground beneath another planet’s sky.',
          emotion: 'EXCITED',
        },
      ],
    },
    {
      id: 'viking_sampler_scan',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'sampler_arm',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Sampler arm record recovered. The first soil samples were collected on July 28, 1976.',
          emotion: 'CURIOUS',
        },
        {
          speaker: 'LUNA',
          text: 'The lander did not just look at Mars. It reached down, collected the surface, and brought the material into its own laboratory.',
          emotion: 'EXCITED',
        },
      ],
    },
    {
      id: 'viking_biology_reveal',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'biology_lab',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Biological experiment archive recovered. Some measurements produced signals that were difficult to explain.',
          emotion: 'CURIOUS',
        },
        {
          speaker: 'LUNA',
          text: 'But an unusual result is not proof of life. The experiments did not establish that living organisms were present.',
          emotion: 'SOFT',
        },
        {
          speaker: 'LUNA',
          text: 'The question remains one of the most important in planetary science: what would count as convincing evidence?',
          emotion: 'CURIOUS',
        },
      ],
    },
    {
      id: 'viking_seismometer_reveal',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'seismometer',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Seismometer record found. The instrument failed to uncage after landing.',
          emotion: 'NEUTRAL',
        },
        {
          speaker: 'LUNA',
          text: 'One missing measurement can leave a large gap in an otherwise remarkable mission.',
          emotion: 'SOFT',
        },
      ],
    },
    {
      id: 'viking_final_signal',
      trigger: 'ON_MISSION_END',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Final communications record recovered. November 11, 1982.',
          emotion: 'SOFT',
        },
        {
          speaker: 'LUNA',
          text: 'A faulty command interrupted communications. Attempts to contact the lander again were unsuccessful.',
          emotion: 'NEUTRAL',
        },
        {
          speaker: 'LUNA',
          text: 'It worked for more than six years on another world. Then the signal stopped.',
          emotion: 'SOFT',
        },
      ],
    },
    {
      id: 'viking_complete',
      trigger: 'ON_INVESTIGATION_COMPLETE',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text: 'Viking 1 archive reconstruction complete.',
          emotion: 'EXCITED',
        },
        {
          speaker: 'LUNA',
          text: 'Its experiments did not settle the question of life on Mars. But they transformed Mars from a distant point of light into a world we could study directly.',
          emotion: 'SOFT',
        },
        {
          speaker: 'SYSTEM',
          text: 'Historical artifact record added to the Mars archive.',
        },
      ],
    },
  ],
  rewards: {
    basePoints: 500,
    maxPoints: 1200,
    completionThreshold: 750,
    difficultyTier: 3,
    archiveEntryId: 'archive-viking-1',
    archiveEntryTitle: 'Viking 1: The First Martian Laboratory',
    badges: [
      {
        id: 'first_martian_view',
        name: 'First View',
        description:
          'Recovered the archive of the first images taken from the surface of Mars.',
        condition: 'Recover the first surface image evidence.',
      },
      {
        id: 'soil_detective',
        name: 'Soil Detective',
        description:
          'Reconstructed the Viking 1 soil sampling and chemical analysis records.',
        condition: 'Complete the soil sampling and chemistry objectives.',
      },
      {
        id: 'life_question',
        name: 'The Unanswered Question',
        description:
          'Correctly interpreted the results of the Viking biological experiments.',
        condition: 'Complete the biological experiment challenge.',
      },
      {
        id: 'long_lived_pioneer',
        name: 'Long-Lived Pioneer',
        description:
          'Recovered the final communications record of Viking 1.',
        condition: 'Recover the final transmission evidence.',
      },
    ],
    levelProgressPercent: 12,
    reputation: 150,
    resourceRestoration: [
      { resource: 'ARCHIVE_DATA', amount: 30 },
      { resource: 'SCANNER_POWER', amount: 20 },
    ],
    equipmentUpgrades: [
      {
        id: 'spectral_analysis_v1',
        name: 'Spectral Analysis Upgrade',
        effect:
          'Improves the interpretation of archived soil chemistry and material evidence.',
      },
      {
        id: 'signal_reconstruction_v1',
        name: 'Signal Reconstruction Upgrade',
        effect:
          'Improves recovery of incomplete historical telemetry and transmission records.',
      },
    ],
  },
  collectionSequence: {
    id: 'viking_1_archive_recovery',
    steps: [
      {
        order: 1,
        label: 'Establish a stable signal lock',
        interaction: 'SIGNAL_CALIBRATION',
        durationMs: 5000,
      },
      {
        order: 2,
        label: 'Reconstruct the lander structure',
        interaction: 'STRUCTURAL_SCAN',
        durationMs: 7000,
      },
      {
        order: 3,
        label: 'Recover the surface image archive',
        interaction: 'IMAGE_RECOVERY',
        durationMs: 6500,
      },
      {
        order: 4,
        label: 'Analyze the sampler and soil records',
        interaction: 'SCIENCE_ARCHIVE_SCAN',
        durationMs: 9000,
      },
      {
        order: 5,
        label: 'Recover the biological experiment archive',
        interaction: 'DATA_RECONSTRUCTION',
        durationMs: 8500,
      },
      {
        order: 6,
        label: 'Recover the final transmission',
        interaction: 'TELEMETRY_RECOVERY',
        durationMs: 7000,
      },
    ],
    removesPhysicalObject: false,
  },
  archive: {
    id: 'archive-viking-1',
    title: 'Viking 1: The First Martian Laboratory',
    tier: 'COMPLETE',
    summary:
      'Viking 1 became the first NASA spacecraft to land successfully on Mars and return extensive surface data. Its cameras revealed the Martian landscape, its robotic arm collected soil, and its onboard laboratory conducted experiments investigating the planet’s chemistry and possible biology. The mission operated for more than six years before communications ended in November 1982.',
    sections: [
      {
        heading: 'A Journey to Mars',
        body:
          'Viking 1 launched on August 20, 1975. After reaching Mars in June 1976, the spacecraft entered orbit and surveyed potential landing areas. The lander separated from the orbiter and touched down at Chryse Planitia on July 20, 1976.',
        sourceRefs: ['NASA_VIKING_1', 'NSSDC_VIKING'],
      },
      {
        heading: 'The First Surface Images',
        body:
          'Shortly after landing, Viking 1 returned the first photograph taken from the surface of Mars. Its cameras produced color images and a broad panorama of the surrounding terrain, giving scientists their first detailed view of the Martian surface from a successful NASA lander.',
        sourceRefs: ['NASA_VIKING_1'],
      },
      {
        heading: 'A Laboratory on Another World',
        body:
          'The robotic sampler arm collected soil and delivered it to instruments including the gas chromatograph mass spectrometer, X-ray fluorescence spectrometer, and biological experiment laboratory. The results provided important information about the chemical properties of Martian soil.',
        sourceRefs: ['NASA_VIKING_1', 'NSSDC_VIKING'],
      },
      {
        heading: 'The Search for Life',
        body:
          'Viking performed biological experiments intended to detect signs of microbial activity. Some results were unusual and difficult to interpret. However, the experiments did not establish the presence of life, and the gas chromatograph mass spectrometer did not detect the expected organic compounds.',
        sourceRefs: ['NASA_VIKING_1', 'NASA_VIKING_ASTROBIOLOGY'],
      },
      {
        heading: 'A Silent Instrument',
        body:
          'The lander carried a seismometer intended to detect ground motion. It failed to uncage after landing, preventing the planned seismic measurements. This left an important part of the intended science investigation incomplete.',
        sourceRefs: ['NASA_VIKING_1', 'NASA_VIKING_REPORT'],
      },
      {
        heading: 'The Final Transmission',
        body:
          'Viking 1 continued returning science and weather data long after its original mission plan. Communications ended on November 11, 1982, after a faulty command interrupted contact. The lander remains at Chryse Planitia as an inactive human-made artifact.',
        sourceRefs: ['NASA_VIKING_1'],
      },
    ],
    openQuestions: [
      'What is the current physical condition of the Viking 1 lander after decades of exposure to the Martian environment?',
      'How should the ambiguous biological experiment results be interpreted in light of later discoveries about Martian soil chemistry?',
      'What seismic information might Viking 1 have returned if its seismometer had successfully uncaged?',
      'Could a future mission inspect the lander and compare its present condition with the original landing photographs?',
    ],
    tags: [
      'Viking',
      'Viking 1',
      'Mars',
      'Chryse Planitia',
      'Lander',
      'Astrobiology',
      'Soil Analysis',
      'First Surface Image',
      'NASA',
      'Planetary Exploration',
    ],
  },
  educational: {
    surprisingFacts: [
      'Viking 1 returned the first photograph ever taken from the surface of Mars.',
      'The lander was originally designed for a primary surface mission of about 90 days but operated for more than six years.',
      'The spacecraft used two radioisotope thermoelectric generators rather than relying on solar panels for its surface power.',
      'Its robotic arm collected Martian soil and delivered samples to a laboratory inside the spacecraft.',
      'The biological experiments produced results that were difficult to interpret, making Viking a major part of the continuing scientific discussion about how to detect life beyond Earth.',
      'The lander continued sending weather reports long after its primary mission ended.',
      'The Viking 1 seismometer failed to uncage, so the mission did not obtain the seismic measurements it had planned.',
    ],
    concepts: [
      {
        term: 'Soft Landing',
        explanation:
          'A controlled descent that allows a spacecraft to reach the surface without being destroyed by impact.',
      },
      {
        term: 'Chryse Planitia',
        explanation:
          'A broad Martian plain whose name means Golden Plain. Viking 1 landed on its western slopes.',
      },
      {
        term: 'Radioisotope Thermoelectric Generator',
        explanation:
          'A power system that converts heat released by radioactive decay into electrical energy.',
      },
      {
        term: 'Gas Chromatograph Mass Spectrometer',
        explanation:
          'An analytical instrument that separates chemical compounds and helps identify them by measuring their mass.',
      },
      {
        term: 'In-situ Analysis',
        explanation:
          'Scientific investigation performed directly at the location being studied, rather than returning samples to a laboratory on Earth.',
      },
      {
        term: 'Astrobiology',
        explanation:
          'The scientific study of the origin, evolution, distribution, and possibility of life in the universe.',
      },
      {
        term: 'Planetary Protection',
        explanation:
          'Practices intended to prevent spacecraft from contaminating other worlds or bringing potentially harmful extraterrestrial material back to Earth.',
      },
    ],
    takeaways: [
      'Viking 1 demonstrated that a spacecraft could land successfully on Mars and conduct long-duration surface science.',
      'The first surface images transformed scientific understanding of the Martian environment.',
      'Direct soil analysis is powerful, but interpreting biological evidence can be difficult.',
      'A failed instrument can leave important scientific questions unanswered even when the overall mission succeeds.',
      'Viking established a foundation for later Mars landers and rovers.',
    ],
    openQuestion:
      'If a future mission could safely reach the Viking 1 landing site, what could a close-up examination of this historic lander reveal about spacecraft aging, Martian environmental conditions, and the history of exploration?',
  },
  sources: [
    {
      id: 'NASA_VIKING_1',
      title: 'NASA Science - Viking 1',
      url: 'https://science.nasa.gov/mission/viking-1/',
      role: 'PRIMARY',
    },
    {
      id: 'NSSDC_VIKING',
      title: 'NASA/NSSDC - Viking Mission to Mars',
      url: 'https://nssdc.gsfc.nasa.gov/planetary/viking.html',
      role: 'SUPPORTING',
    },
    {
      id: 'NASA_VIKING_REPORT',
      title: 'NASA - Viking 75 Mission Assessment',
      url: 'https://ntrs.nasa.gov/api/citations/19770026285/downloads/19770026285.pdf',
      role: 'SUPPORTING',
    },
    {
      id: 'NASA_VIKING_ASTROBIOLOGY',
      title: 'NASA Science - Viking Project and Astrobiology',
      url: 'https://science.nasa.gov/astrobiology/missions/viking-project/',
      role: 'SUPPORTING',
    },
  ],
  uncertaintyNotes: [
    'This artifact definition represents the Viking 1 Lander, not the complete Viking 1 orbiter-lander spacecraft combination.',
    'NASA sources use different coordinate conventions for the landing site. The coordinates in this definition use the aerographic value of 22.483° N, 47.94° W reported in the NASA Viking 1 mission history. The NSSDC reference gives approximately 22.27° N, 312.05° E in planetocentric coordinates.',
    'The lander is known to remain at its historical landing site, but its current physical condition has not been confirmed by a modern close-up inspection.',
    'Component offsets are approximate scene-layout values for gameplay. They are not surveyed measurements of the present-day lander.',
    'The component scan interactions are historical reconstructions. They should not be presented as direct scans of verified surviving hardware.',
    'The biological experiment results were ambiguous. The payload intentionally does not claim that Viking 1 discovered or confirmed life on Mars.',
    'The seismometer failure is documented as a failure to uncage after landing. No seismic measurements from the Viking 1 seismometer should be represented as successful mission results.',
    'NASA describes the final Viking 1 communication as occurring on November 11, 1982. Some secondary summaries give different dates; this payload follows the date stated in the supplied NASA Viking 1 mission page.',
    'The major event timestamps for landing separation and touchdown are based on the NASA mission history. Events for which the page provides only a calendar date use 00:00:00 UTC as a date marker, not as a verified event time.',
  ],
};
