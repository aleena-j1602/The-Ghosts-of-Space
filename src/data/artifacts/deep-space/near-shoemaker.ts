
import type { ArtifactDefinition } from '../../artifacts/Core/artifactTypes.ts';

export const NEAR_SHOEMAKER: ArtifactDefinition = {
  id: 'near-shoemaker',
  officialName: 'Near Earth Asteroid Rendezvous Shoemaker',
  commonName: 'NEAR Shoemaker',
  aliases: ['NEAR', 'NEAR spacecraft', 'Near Earth Asteroid Rendezvous'],
  catalogIds: {
    nssdca: '1996-008A',
    cospar: '1996-008A'
  },
  type: 'ASTEROID_ORBITER_LANDER',
  level: 3,
  locationType: 'DEEP_SPACE',
  locationTypeSecondary: 'SURFACE',
  locationRationale:
    'NEAR Shoemaker travelled through deep space to asteroid 433 Eros, studied it from orbit, and ultimately touched down on its surface. The playable reconstruction moves between orbital investigation and the final landing site.',
  agency: 'NASA',
  program: 'Discovery Program',
  mission: 'Near Earth Asteroid Rendezvous (NEAR)',
  dates: {
    launch: '1996-02-17T20:43:27Z',
    landing: '2001-02-12T19:44:00Z',
    firstSurfaceActivity: '2001-02-12T19:44:00Z',
    departure: null,
    lastContact: '2001-02-28',
    missionEnd: '2001-02-28'
  },
  coordinates: {
    latDeg: null,
    lonDeg: null,
    body: '433 Eros',
    frame: null,
    accuracyM: null,
    note:
      'The spacecraft landed just south of the saddle-shaped feature Himeros. A verified landing latitude and longitude are not supplied here.'
  },
  secondaryCoordinates: null,
  destination:
    'Asteroid 433 Eros, with an earlier flyby of asteroid 253 Mathilde and an Earth gravity-assist flyby.',
  description:
    'NEAR Shoemaker was NASA’s first Discovery Program mission and the first spacecraft to orbit an asteroid. After studying Eros from orbit for a year, it performed a controlled descent and landed on the asteroid despite not being designed as a lander. The spacecraft survived and returned additional scientific measurements from the surface.',
  objective:
    'Study the physical and geological properties, mineral composition, morphology, internal mass distribution, and magnetic field of near-Earth asteroid 433 Eros. The mission also flew past asteroid 253 Mathilde.',
  developmentReason:
    'The mission was developed to investigate near-Earth asteroids and improve understanding of the small bodies that preserve evidence about the early Solar System. It was selected as one of NASA’s first Discovery Program missions.',
  majorEvents: [
    {
      utc: '1996-02-17T20:43:27Z',
      event:
        'NEAR launches from Cape Canaveral aboard a Delta II 7925-8 rocket.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '1997-06-27T12:56:00Z',
      event:
        'NEAR flies past asteroid 253 Mathilde at approximately 1,200 km, imaging about 60 percent of its surface.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '1998-01-23T07:23:00Z',
      event:
        'NEAR flies past Earth for a gravity assist to adjust its trajectory toward Eros.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '1998-12-20',
      event:
        'An engine burn fails to perform as intended, forcing mission controllers to revise the planned rendezvous trajectory.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '1998-12-23T18:41:23Z',
      event:
        'NEAR performs its first flyby of Eros, passing approximately 3,827 km from the asteroid’s center.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '2000-02-14T15:33:00Z',
      event:
        'NEAR enters orbit around Eros, becoming the first human-made object to orbit an asteroid.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '2000-03-14',
      event:
        'NASA renames the spacecraft NEAR Shoemaker in honor of geologist Eugene M. Shoemaker.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '2000-05-13',
      event:
        'The near-infrared spectrometer is switched off following an excessive power surge.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '2000-07-13',
      event:
        'NEAR enters a lower orbit, bringing it to approximately 19 km from the surface.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '2000-10-26',
      event:
        'NEAR makes another close pass, reaching approximately 5.3 km above the surface.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '2001-02-12T19:44:00Z',
      event:
        'NEAR Shoemaker touches down gently on Eros, just south of the saddle-shaped feature Himeros.',
      sourceRef: 'nasa-near'
    },
    {
      utc: '2001-02-14',
      event:
        'NASA extends the mission to collect additional surface measurements using the gamma-ray spectrometer.',
      sourceRef: 'surface-extension'
    },
    {
      utc: '2001-02-28',
      event:
        'Final contact with NEAR Shoemaker is received. The spacecraft has succumbed to the extreme cold.',
      sourceRef: 'nasa-near'
    }
  ],
  scientificFindings: [
    'Eros has a heavily cratered surface with prominent ridges and grooves.',
    'Measurements indicated that Eros has a density of approximately 2.67 g/cm³, similar to some ordinary rocky materials.',
    'The asteroid has no detected global magnetic field.',
    'NEAR mapped more than 70 percent of Eros using its near-infrared spectrometer.',
    'The spacecraft provided measurements that helped scientists investigate the asteroid’s interior and mass distribution.',
    'The X-ray and gamma-ray instruments provided information about the elemental composition of the surface and near-surface material.',
    'The mission returned approximately 160,000 images, far exceeding its original planned data return.'
  ],
  engineeringAchievements: [
    'First spacecraft to orbit an asteroid.',
    'First spacecraft to land on an asteroid.',
    'Demonstrated that a spacecraft not designed as a lander could survive a gentle asteroid touchdown.',
    'Used solar cells for spacecraft power during operations beyond Mars orbit.',
    'Completed a year-long orbital investigation before attempting a controlled descent.',
    'Returned additional surface science after surviving the landing.'
  ],
  missionChallenges: [
    'A failed engine burn in December 1998 forced controllers to redesign the rendezvous trajectory.',
    'The spacecraft reached Eros later than originally planned.',
    'An excessive power surge required the near-infrared spectrometer to be switched off in May 2000.',
    'The spacecraft had to conduct increasingly close orbital passes before attempting the final descent.',
    'The spacecraft was not designed to land, making its survival after touchdown an unexpected outcome.',
    'Extreme cold eventually ended communications with the spacecraft.'
  ],
  currentStatus:
    'Inactive. NEAR Shoemaker remains on the surface of asteroid Eros. Its final contact was received on 28 February 2001.',
  physicalRecoveryPossible: false,
  physicalRecoveryRationale:
    'The spacecraft is located on asteroid Eros and is no longer operational. Physical recovery is not a realistic objective for this game scenario. The player investigates a historical digital reconstruction using mission records and scientific observations.',
  collectibleKinds: [
    'SPACECRAFT_RECONSTRUCTION',
    'ORBITAL_DATA',
    'ASTEROID_IMAGERY',
    'SPECTROMETER_RECORD',
    'LANDING_TELEMETRY',
    'MISSION_ARCHIVE'
  ],
  components: [
    {
      id: 'spacecraft_bus',
      name: 'Spacecraft Bus',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'The central spacecraft structure housed the electronics, instruments, communications equipment, and other mission systems.',
      condition: 'Historical reconstruction; actual post-landing condition is not fully documented here.',
      scanDurationMs: 9000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0, z: 0 },
      evidenceId: 'bus-structure',
      historicalNote:
        'The spacecraft had a launch mass of approximately 805 kilograms.',
      uncertain: false
    },
    {
      id: 'solar_arrays',
      name: 'Solar Arrays',
      type: 'POWER',
      functionPlain:
        'Solar panels supplied electrical power to the spacecraft during its journey and operations around Eros.',
      condition: 'Unknown physical condition after the mission ended.',
      scanDurationMs: 10000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 3.2, y: 0, z: 0 },
      evidenceId: 'solar-power',
      historicalNote:
        'NEAR was the first spacecraft to rely on solar cells for power during operations beyond Mars orbit.',
      uncertain: false
    },
    {
      id: 'high_gain_antenna',
      name: 'High-Gain Antenna',
      type: 'INSTRUMENT',
      functionPlain:
        'Provided the primary high-gain communications link between the spacecraft and Earth.',
      condition: 'Unknown physical condition.',
      scanDurationMs: 8500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 1.8, z: 0 },
      evidenceId: 'communications-record',
      historicalNote:
        'After landing, the low-gain antenna became the reliable telemetry path used for the extended science campaign.',
      uncertain: false
    },
    {
      id: 'multi_spectral_imager',
      name: 'Multi-Spectral Imager (MSI)',
      type: 'INSTRUMENT',
      functionPlain:
        'Captured images of Eros in multiple spectral bands, helping scientists examine its surface and geological features.',
      condition: 'Operational during the orbital investigation; post-landing condition not established.',
      scanDurationMs: 12000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 1.5, y: 0.4, z: 1.1 },
      evidenceId: 'eros-imagery',
      historicalNote:
        'NEAR returned approximately 160,000 images during the mission.',
      uncertain: false
    },
    {
      id: 'magnetometer',
      name: 'Magnetometer (MAG)',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured the magnetic environment around Eros to investigate whether the asteroid possessed a magnetic field.',
      condition: 'Historical instrument; current physical condition unknown.',
      scanDurationMs: 9500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: -2.4, y: 0.5, z: 0.4 },
      evidenceId: 'magnetic-field',
      historicalNote:
        'The mission found no evidence of a global magnetic field at Eros.',
      uncertain: false
    },
    {
      id: 'near_infrared_spectrometer',
      name: 'Near-Infrared Spectrometer (NIS)',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured reflected near-infrared light to investigate the mineral composition of Eros.',
      condition: 'Switched off on 13 May 2000 after an excessive power surge.',
      scanDurationMs: 11000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 2.1, y: 0.3, z: -1.2 },
      evidenceId: 'mineral-spectrum',
      historicalNote:
        'The instrument mapped more than 70 percent of Eros before it was switched off.',
      uncertain: false
    },
    {
      id: 'xray_gamma_spectrometer',
      name: 'X-Ray/Gamma-Ray Spectrometer (XGRS)',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured X-rays and gamma rays to help determine the elemental composition of Eros.',
      condition: 'Collected additional data after the spacecraft landed.',
      scanDurationMs: 13000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: -1.6, y: -0.5, z: 1.1 },
      evidenceId: 'elemental-composition',
      historicalNote:
        'The gamma-ray spectrometer was especially valuable during the unexpected surface science extension.',
      uncertain: false
    },
    {
      id: 'laser_rangefinder',
      name: 'NEAR Laser Rangefinder (NLR)',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured the distance to the asteroid surface, supporting shape mapping and orbital navigation.',
      condition: 'Historical instrument; final physical condition unknown.',
      scanDurationMs: 10000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0.8, y: -0.4, z: 1.5 },
      evidenceId: 'range-measurements',
      historicalNote:
        'Laser range measurements helped characterize the shape of Eros.',
      uncertain: false
    },
    {
      id: 'radio_science',
      name: 'Radio Science and Gravimetry Experiment',
      type: 'INSTRUMENT',
      functionPlain:
        'Used radio tracking measurements to investigate the gravity field and internal mass distribution of Eros.',
      condition: 'Experiment data preserved in mission records.',
      scanDurationMs: 10500,
      requiresAngle: false,
      gameLayoutOffsetM: null,
      evidenceId: 'gravity-data',
      historicalNote:
        'Radio science helped scientists infer properties of the asteroid’s interior.',
      uncertain: false
    }
  ],
  evidence: [
    {
      id: 'bus-structure',
      label: 'Spacecraft Structure Record',
      type: 'STRUCTURAL_SCAN',
      description:
        'Identify the spacecraft bus and document the central structure of the NEAR probe.',
      requiredForCompletion: true,
      points: 100,
      sourceRef: 'nasa-near'
    },
    {
      id: 'solar-power',
      label: 'Solar Power System',
      type: 'MISSION_RECORD',
      description:
        'Recover the record describing NEAR’s solar-powered operations beyond Mars orbit.',
      requiredForCompletion: true,
      points: 100,
      sourceRef: 'nasa-near'
    },
    {
      id: 'communications-record',
      label: 'Communications Configuration',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Reconstruct the communications configuration used during the orbital mission and surface extension.',
      requiredForCompletion: true,
      points: 100,
      sourceRef: 'surface-extension'
    },
    {
      id: 'eros-imagery',
      label: 'Eros Image Archive',
      type: 'PHOTOGRAMMETRY',
      description:
        'Examine orbital imagery and identify craters, ridges, grooves, and other surface features.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'nasa-near'
    },
    {
      id: 'magnetic-field',
      label: 'Magnetic Field Investigation',
      type: 'LIVE_MEASUREMENT',
      description:
        'Recover the magnetic field finding and determine whether Eros has a global magnetic field.',
      requiredForCompletion: true,
      points: 125,
      sourceRef: 'nasa-near'
    },
    {
      id: 'mineral-spectrum',
      label: 'Near-Infrared Mineral Record',
      type: 'MATERIAL_SPECTROMETRY',
      description:
        'Inspect the near-infrared survey and record the extent of the asteroid mapped by the instrument.',
      requiredForCompletion: true,
      points: 125,
      sourceRef: 'nasa-near'
    },
    {
      id: 'elemental-composition',
      label: 'Surface Composition Data',
      type: 'MATERIAL_SPECTROMETRY',
      description:
        'Recover the X-ray and gamma-ray science record, including the measurements made after touchdown.',
      requiredForCompletion: true,
      points: 150,
      sourceRef: 'surface-extension'
    },
    {
      id: 'range-measurements',
      label: 'Laser Range Measurements',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Reconstruct how laser range measurements contributed to the asteroid shape investigation.',
      requiredForCompletion: false,
      points: 75,
      sourceRef: 'nasa-near'
    },
    {
      id: 'gravity-data',
      label: 'Eros Gravity Record',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'Recover radio science measurements used to investigate the asteroid’s internal mass distribution.',
      requiredForCompletion: true,
      points: 125,
      sourceRef: 'nasa-near'
    },
    {
      id: 'landing-record',
      label: 'Unexpected Landing Record',
      type: 'MISSION_RECORD',
      description:
        'Verify the landing date, descent speed, and the spacecraft’s survival after touchdown.',
      requiredForCompletion: true,
      points: 175,
      sourceRef: 'nasa-near'
    }
  ],
  objectives: [
    {
      id: 'identify-spacecraft',
      label: 'Identify the NEAR Shoemaker spacecraft and its major systems',
      required: true,
      points: 100
    },
    {
      id: 'reconstruct-orbit',
      label: 'Reconstruct the spacecraft’s orbital investigation of Eros',
      required: true,
      points: 150
    },
    {
      id: 'analyze-instruments',
      label: 'Recover the scientific findings from the onboard instruments',
      required: true,
      points: 200
    },
    {
      id: 'verify-landing',
      label: 'Verify the historic touchdown and unexpected survival',
      required: true,
      points: 200
    },
    {
      id: 'recover-surface-data',
      label: 'Recover the post-landing gamma-ray science record',
      required: true,
      points: 150
    },
    {
      id: 'optional-range',
      label: 'Recover the laser rangefinder record',
      required: false,
      points: 75
    }
  ],
  challenges: [
    {
      id: 'near-instrument-match',
      type: 'MATCH_COMPONENTS',
      title: 'The Eros Investigation',
      objective:
        'Match each instrument to the scientific measurement it was designed to make.',
      instructions:
        'Connect each NEAR instrument or experiment with its correct scientific role.',
      options: [
        { id: 'msi', text: 'Multi-Spectral Imager' },
        { id: 'mag', text: 'Magnetometer' },
        { id: 'nis', text: 'Near-Infrared Spectrometer' },
        { id: 'xgrs', text: 'X-Ray/Gamma-Ray Spectrometer' },
        { id: 'nlr', text: 'Laser Rangefinder' },
        { id: 'radio', text: 'Radio Science and Gravimetry' },
        { id: 'images', text: 'Surface imaging' },
        { id: 'magnetic', text: 'Magnetic field measurements' },
        { id: 'minerals', text: 'Mineral investigation' },
        { id: 'elements', text: 'Elemental composition' },
        { id: 'distance', text: 'Surface distance measurements' },
        { id: 'gravity', text: 'Gravity and internal mass distribution' }
      ],
      correctAnswer: {
        msi: 'images',
        mag: 'magnetic',
        nis: 'minerals',
        xgrs: 'elements',
        nlr: 'distance',
        radio: 'gravity'
      },
      explanation:
        'NEAR combined imaging, spectroscopy, laser ranging, magnetometry, and radio science to study Eros from orbit and after landing.',
      hints: [
        'Think about what each instrument measures: light, magnetic fields, distance, or radio tracking.',
        'The gamma-ray instrument became especially important after touchdown.'
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 5
    },
    {
      id: 'mission-sequence',
      type: 'ORDER_EVENTS',
      title: 'A Changed Trajectory',
      objective:
        'Reconstruct the mission’s route from launch to asteroid landing.',
      instructions:
        'Place the events in chronological order.',
      options: [
        { id: 'launch', text: 'Launch from Earth' },
        { id: 'mathilde', text: 'Flyby of asteroid Mathilde' },
        { id: 'earth', text: 'Earth gravity-assist flyby' },
        { id: 'eros_flyby', text: 'First flyby of Eros' },
        { id: 'orbit', text: 'Enter orbit around Eros' },
        { id: 'landing', text: 'Touch down on Eros' },
        { id: 'last_contact', text: 'Final contact with the spacecraft' }
      ],
      correctAnswer: [
        'launch',
        'mathilde',
        'earth',
        'eros_flyby',
        'orbit',
        'landing',
        'last_contact'
      ],
      explanation:
        'The original rendezvous plan was disrupted by an engine-burn problem. A revised trajectory still delivered NEAR to Eros, where it became the first spacecraft to orbit an asteroid.',
      hints: [
        'The Mathilde flyby happened before the Earth gravity assist.',
        'The first Eros flyby occurred more than a year before orbital insertion.'
      ],
      points: 175,
      optional: false,
      retryPenaltyPower: 5
    },
    {
      id: 'landing-mystery',
      type: 'MULTIPLE_CHOICE',
      title: 'The Accidental Lander',
      objective:
        'Determine why NEAR Shoemaker’s landing was such an unexpected achievement.',
      instructions:
        'Choose the statement that best explains the historical significance of the touchdown.',
      options: [
        {
          id: 'designed_lander',
          text: 'The spacecraft had been designed as a dedicated asteroid lander.'
        },
        {
          id: 'survived',
          text: 'It was designed as an orbiter, but survived its controlled touchdown and continued returning data.'
        },
        {
          id: 'sample_return',
          text: 'It collected asteroid samples and returned them to Earth.'
        },
        {
          id: 'crew',
          text: 'It carried astronauts who performed a manual landing.'
        }
      ],
      correctAnswer: ['survived'],
      explanation:
        'NEAR was designed to orbit Eros, not land on it. Its survival after touchdown allowed the mission team to collect additional gamma-ray measurements.',
      hints: [
        'The mission’s original goal was orbital science.',
        'The spacecraft continued operating for about two weeks after landing.'
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 5
    },
    {
      id: 'surface-data',
      type: 'MULTIPLE_CHOICE',
      title: 'Science After Touchdown',
      objective:
        'Identify the instrument that became central to the extended surface investigation.',
      instructions:
        'Select the instrument used to gather additional elemental composition data after landing.',
      options: [
        { id: 'msi', text: 'Multi-Spectral Imager' },
        { id: 'mag', text: 'Magnetometer' },
        { id: 'xgrs', text: 'X-Ray/Gamma-Ray Spectrometer' },
        { id: 'nlr', text: 'Laser Rangefinder' }
      ],
      correctAnswer: ['xgrs'],
      explanation:
        'After touchdown, the gamma-ray spectrometer was used to collect additional data about the surface and near-surface composition of Eros.',
      hints: [
        'The instrument measured high-energy radiation.',
        'Its measurements helped investigate elemental composition.'
      ],
      points: 125,
      optional: false,
      retryPenaltyPower: 5
    }
  ],
  dialogue: [
    {
      id: 'near-detection',
      trigger: 'ON_DETECTION_START',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'SYSTEM',
          text: 'ARCHIVE SIGNAL FOUND: NEAR SHOEMAKER. TARGET: ASTEROID 433 EROS.',
          emotion: 'NEUTRAL'
        },
        {
          speaker: 'LUNA',
          text:
            'An asteroid mission. Not just a flyby this time. This one stayed, mapped the surface, and eventually went all the way down.',
          emotion: 'CURIOUS'
        },
        {
          speaker: 'PLAYER',
          text: 'Was it supposed to land?',
          emotion: 'CURIOUS'
        },
        {
          speaker: 'LUNA',
          text:
            'No. That is what makes this record extraordinary. It was built to orbit Eros, not become part of it.',
          emotion: 'SOFT'
        }
      ]
    },
    {
      id: 'near-signal-lock',
      trigger: 'ON_SIGNAL_LOCK',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'SYSTEM',
          text: 'MISSION IDENTITY VERIFIED. NEAR SHOEMAKER.',
          emotion: 'NEUTRAL'
        },
        {
          speaker: 'LUNA',
          text:
            'Launched in 1996. First came Mathilde, then Earth, then Eros. A difficult route, but the spacecraft made it.',
          emotion: 'EXCITED'
        }
      ]
    },
    {
      id: 'near-preservation-ring',
      trigger: 'ON_ENTER_PRESERVATION_RING',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text:
            'Stay outside the reconstruction boundary. We are observing a historical mission site, not disturbing the original spacecraft.',
          emotion: 'NEUTRAL'
        },
        {
          speaker: 'SYSTEM',
          text: 'ARCHIVE PRESERVATION FIELD ACTIVE.',
          emotion: 'NEUTRAL'
        }
      ]
    },
    {
      id: 'near-first-scan',
      trigger: 'ON_FIRST_SCAN',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text:
            'Start with the bus and solar arrays. Establish what the spacecraft was built to do before we examine what happened at the end.',
          emotion: 'CURIOUS'
        }
      ]
    },
    {
      id: 'near-component-scanned',
      trigger: 'ON_COMPONENT_SCANNED',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text:
            'The instruments tell the story here. Imaging, spectroscopy, ranging, magnetometry, and radio science. Eros was investigated from several different angles.',
          emotion: 'EXCITED'
        }
      ]
    },
    {
      id: 'near-missing-stage',
      trigger: 'ON_MISSING_STAGE_REVEAL',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'PLAYER',
          text: 'There is no separate landing stage.',
          emotion: 'CURIOUS'
        },
        {
          speaker: 'LUNA',
          text:
            'Correct. There was no dedicated lander. The orbiter itself descended to the surface. Its survival was the surprise.',
          emotion: 'SOFT'
        }
      ]
    },
    {
      id: 'near-investigation-complete',
      trigger: 'ON_INVESTIGATION_COMPLETE',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'SYSTEM',
          text: 'NEAR SHOEMAKER ARCHIVE RECONSTRUCTION COMPLETE.',
          emotion: 'NEUTRAL'
        },
        {
          speaker: 'LUNA',
          text:
            'It arrived to study an asteroid and ended its journey on one. Sometimes the most important discovery is what a spacecraft can survive.',
          emotion: 'SOFT'
        }
      ]
    },
    {
      id: 'near-power-depleted',
      trigger: 'ON_POWER_DEPLETED',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'SYSTEM',
          text: 'RECONSTRUCTION POWER CRITICAL.',
          emotion: 'URGENT'
        },
        {
          speaker: 'LUNA',
          text:
            'Prioritize the landing record and the gamma-ray data. Those are the final pieces of this mission’s story.',
          emotion: 'URGENT'
        }
      ]
    },
    {
      id: 'near-mission-end',
      trigger: 'ON_MISSION_END',
      onceOnly: true,
      skippable: true,
      lines: [
        {
          speaker: 'LUNA',
          text:
            'The last contact came on February 28, 2001. The cold eventually silenced the spacecraft, but the data it returned still speaks for it.',
          emotion: 'SOFT'
        },
        {
          speaker: 'SYSTEM',
          text: 'ARCHIVE SEALED. NEAR SHOEMAKER REMAINS ON EROS.',
          emotion: 'NEUTRAL'
        }
      ]
    }
  ],
  rewards: {
    basePoints: 700,
    maxPoints: 1250,
    completionThreshold: 750,
    difficultyTier: 4,
    archiveEntryId: 'near-shoemaker-eros',
    archiveEntryTitle: 'The First Asteroid Landing',
    badges: [
      {
        id: 'asteroid-orbiter',
        name: 'First Around Eros',
        description:
          'Recover the evidence confirming NEAR’s historic asteroid orbit.',
        condition: 'Complete the orbital investigation objective.'
      },
      {
        id: 'unexpected-landing',
        name: 'The Accidental Lander',
        description:
          'Recover the record of the spacecraft’s survival after touchdown.',
        condition: 'Complete the landing investigation challenge.'
      },
      {
        id: 'eros-scientist',
        name: 'Eros Investigator',
        description:
          'Recover the principal scientific evidence from the mission.',
        condition: 'Complete all required scientific evidence scans.'
      }
    ],
    levelProgressPercent: 10,
    reputation: 120,
    resourceRestoration: [
      { resource: 'ARCHIVE_DATA', amount: 30 },
      { resource: 'SCANNER_POWER', amount: 20 }
    ],
    equipmentUpgrades: [
      {
        id: 'spectral_analysis',
        name: 'Spectral Analysis Module',
        effect:
          'Improves the interpretation of material spectroscopy evidence in future investigations.'
      },
      {
        id: 'orbital_reconstruction',
        name: 'Orbital Reconstruction Module',
        effect:
          'Improves the reconstruction of historical orbital paths and close-approach data.'
      }
    ]
  },
  collectionSequence: {
    id: 'near-archive-recovery',
    steps: [
      {
        order: 1,
        label: 'Identify the spacecraft',
        interaction: 'Scan the central spacecraft bus and verify the mission identity.',
        durationMs: 5000
      },
      {
        order: 2,
        label: 'Recover the power-system record',
        interaction: 'Inspect the solar arrays and recover the power-system archive.',
        durationMs: 6000
      },
      {
        order: 3,
        label: 'Reconstruct the instrument suite',
        interaction: 'Scan the imaging, spectral, magnetic, and ranging instruments.',
        durationMs: 14000
      },
      {
        order: 4,
        label: 'Decode the orbital investigation',
        interaction: 'Recover the Eros orbit and surface-mapping records.',
        durationMs: 9000
      },
      {
        order: 5,
        label: 'Verify the touchdown',
        interaction: 'Reconstruct the controlled descent and confirm the landing record.',
        durationMs: 9000
      },
      {
        order: 6,
        label: 'Recover the final science data',
        interaction: 'Retrieve the post-landing gamma-ray investigation archive.',
        durationMs: 8000
      }
    ],
    removesPhysicalObject: false
  },
  archive: {
    id: 'near-shoemaker-eros',
    title: 'NEAR Shoemaker: The First Asteroid Landing',
    tier: 'COMPLETE',
    summary:
      'NEAR Shoemaker changed asteroid exploration by becoming the first spacecraft to orbit an asteroid and the first to land on one. Its unexpected survival after touchdown allowed the mission to collect additional surface science.',
    sections: [
      {
        heading: 'A New Kind of Mission',
        body:
          'NEAR was the first mission in NASA’s Discovery Program. It was designed to investigate the near-Earth asteroid 433 Eros, including its physical properties, geology, mineral composition, morphology, internal mass distribution, and magnetic field.',
        sourceRefs: ['nasa-near', 'apl-near']
      },
      {
        heading: 'The Route to Eros',
        body:
          'After launch in February 1996, NEAR flew past Mathilde in June 1997 and Earth in January 1998. An engine-burn problem disrupted the original rendezvous plan. A revised trajectory brought the spacecraft past Eros in December 1998 and into orbit in February 2000.',
        sourceRefs: ['nasa-near', 'nasa-history']
      },
      {
        heading: 'A Year in Orbit',
        body:
          'NEAR examined Eros using imaging, spectroscopy, laser ranging, magnetometry, and radio science. The spacecraft mapped much of the asteroid and gathered evidence about its shape, surface, composition, gravity, and magnetic environment.',
        sourceRefs: ['nasa-near', 'nasa-history']
      },
      {
        heading: 'The Unexpected Landing',
        body:
          'On February 12, 2001, NEAR Shoemaker descended at approximately 6.4 km/h and touched down just south of the saddle-shaped feature Himeros. It had not been designed as a lander, but it survived the touchdown.',
        sourceRefs: ['nasa-near', 'surface-extension']
      },
      {
        heading: 'Science Beyond the Plan',
        body:
          'The spacecraft returned additional data for about two weeks after landing. Mission controllers prioritized the gamma-ray spectrometer, which could provide information about the surface and near-surface elemental composition of Eros.',
        sourceRefs: ['surface-extension', 'apl-near']
      },
      {
        heading: 'The End of Contact',
        body:
          'Final contact with NEAR Shoemaker occurred on February 28, 2001. Extreme cold eventually ended the mission. The spacecraft remains on Eros, a permanent marker of the first asteroid landing.',
        sourceRefs: ['nasa-near', 'apl-near']
      }
    ],
    openQuestions: [
      'What additional details about Eros could a future lander or sample-return mission reveal?',
      'How do the asteroid’s surface features relate to its internal structure and geological history?',
      'How much more could the spacecraft have measured if it had been designed from the beginning for surface operations?'
    ],
    tags: [
      'NASA',
      'Discovery Program',
      'NEAR',
      'Eros',
      'Asteroid',
      'Orbiter',
      'Landing',
      'Spectroscopy',
      'Planetary Science'
    ]
  },
  educational: {
    surprisingFacts: [
      'NEAR Shoemaker was not designed to land, yet it survived its touchdown on Eros.',
      'The spacecraft became the first human-made object to orbit an asteroid.',
      'Its unexpected survival enabled an additional surface science campaign.',
      'The spacecraft’s trajectory had to be revised after an engine burn did not perform as planned.',
      'The mission returned approximately 160,000 images.',
      'The spacecraft was renamed in honor of geologist Eugene M. Shoemaker.'
    ],
    concepts: [
      {
        term: 'Asteroid Rendezvous',
        explanation:
          'A rendezvous mission matches a spacecraft’s motion with a small body so it can remain nearby and conduct extended observations.'
      },
      {
        term: 'Gravity Assist',
        explanation:
          'A spacecraft can use a close flyby of a planet to change its trajectory and orbital energy relative to the Sun.'
      },
      {
        term: 'Spectroscopy',
        explanation:
          'Spectroscopy studies light or radiation to infer the materials and elements present in a distant object.'
      },
      {
        term: 'Gravimetry',
        explanation:
          'Gravimetry uses gravity measurements to investigate the mass distribution and internal structure of a celestial body.'
      },
      {
        term: 'Controlled Descent',
        explanation:
          'A controlled descent uses planned spacecraft maneuvers to reduce speed and approach a surface in a deliberate way.'
      },
      {
        term: 'Near-Earth Asteroid',
        explanation:
          'A near-Earth asteroid is an asteroid whose orbit brings it into the vicinity of Earth’s orbital region.'
      }
    ],
    takeaways: [
      'Asteroids preserve clues about the early Solar System.',
      'A spacecraft can achieve major scientific results even when mission conditions change.',
      'Orbital measurements can reveal the shape, composition, gravity, and magnetic environment of a small body.',
      'NEAR Shoemaker demonstrated that a mission designed for orbital science could also produce valuable data after an unplanned surface phase.'
    ],
    openQuestion:
      'If you could design a follow-up mission to Eros, would you prioritize a lander, a sample-return spacecraft, or a long-term orbital observatory?'
  },
  sources: [
    {
      id: 'nasa-near',
      title: 'NEAR Shoemaker — NASA Science',
      url: 'https://science.nasa.gov/mission/near-shoemaker/',
      role: 'PRIMARY'
    },
    {
      id: 'surface-extension',
      title: 'NEAR Shoemaker Ready to Gather Data on Surface of Eros — NASA Science',
      url: 'https://science.nasa.gov/solar-system/near-shoemaker-ready-to-gather-data-on-surface-of-eros/',
      role: 'PRIMARY'
    },
    {
      id: 'apl-near',
      title: 'NEAR — Johns Hopkins University Applied Physics Laboratory',
      url: 'https://www.jhuapl.edu/destinations/missions/near',
      role: 'SUPPORTING'
    },
    {
      id: 'nasa-history',
      title: 'The History of Near-Earth Objects Research — NASA',
      url: 'https://www.nasa.gov/wp-content/uploads/2025/07/a-history-of-near-earth-object-research-sp-4235.pdf',
      role: 'SUPPORTING'
    }
  ],
  uncertaintyNotes: [
    'The landing coordinates are not supplied as verified latitude and longitude values. The landing site is described relative to the feature Himeros.',
    'The spacecraft is represented as a historical reconstruction. Component condition values do not claim direct knowledge of the physical state of the original hardware.',
    'The landing and final-contact dates are known, but the final-contact time is not specified in the cited NASA mission summary.',
    'The approximate gameLayoutOffsetM values are scene-layout positions only and are not engineering drawings or measured spacecraft dimensions.',
    'The spacecraft was not designed as a lander. The landing sequence should be represented as a controlled descent and unexpected survival, not as a planned landing system.',
    'The near-infrared spectrometer was switched off following a power surge in May 2000. The archive should not imply that it continued operating normally throughout the mission.',
    'The exact landing latitude and longitude, detailed post-mission component condition, and precise physical orientation of the spacecraft on Eros are not established by the cited sources.'
  ]
};
