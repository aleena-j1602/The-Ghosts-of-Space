
import type { ArtifactDefinition } from '../../artifacts/Core/artifactTypes.ts';

export const SOJOURNER: ArtifactDefinition = {
  id: 'sojourner',
  officialName: 'Mars Pathfinder Sojourner Rover',
  commonName: 'Sojourner Rover',
  aliases: [
    'Sojourner',
    'Mars Pathfinder Rover',
    'MPF Rover',
    '1996-068A Rover',
    'First Mars Rover',
  ],
  catalogIds: {
    nssdca: '1996-068A',
    cospar: '1996-068A',
  },
  type: 'Robotic planetary surface rover',
  level: 2,
  locationType: 'SURFACE',
  locationTypeSecondary: 'SIGNAL_AND_DATA',
  locationRationale:
    'Sojourner operated on the Martian surface at the Mars Pathfinder landing site in Ares Vallis. It communicated through the Pathfinder lander, which acted as its communications relay. The rover travelled within approximately 100 metres of the lander. The supplied coordinates identify the general landing region, not a surveyed final rover position.',
  agency: 'NASA',
  program: 'Mars Exploration',
  mission: 'Mars Pathfinder',

  dates: {
    launch: '1996-12-04T06:58:00Z',
    landing: '1997-07-04T16:57:00Z',
    firstSurfaceActivity: '1997-07-06T05:40:00Z',
    departure: null,
    lastContact: null,
    missionEnd: '1997-09-27T10:23:00Z',
  },

  coordinates: {
    latDeg: 19.33,
    lonDeg: -33.55,
    body: 'Mars',
    frame: null,
    accuracyM: null,
    note:
      'Approximate Mars Pathfinder Ares Vallis landing-region coordinates. These are not a precise final resting coordinate for Sojourner.',
  },

  secondaryCoordinates: null,

  destination: 'Ares Vallis, Mars',

  description:
    'Sojourner was NASA’s first successful wheeled robotic vehicle to operate on another planet. It arrived on Mars aboard the Mars Pathfinder spacecraft on 4 July 1997 and rolled down a deployment ramp onto the Martian surface on 6 July. The small six-wheeled rover investigated nearby rocks and soil, photographed the terrain, and tested technologies for future planetary rovers. Its Alpha Proton X-ray Spectrometer examined the elemental composition of selected rocks and soil. Sojourner was designed for a seven-day mission but operated for 83 days. It communicated with Earth through the Pathfinder lander, which was later named the Carl Sagan Memorial Station.',

  objective:
    'Demonstrate that a small, lightweight, low-cost robotic rover could be delivered to another planet, move across its surface, investigate rocks and soil, collect images and scientific measurements, and communicate through a stationary lander.',

  developmentReason:
    'NASA wanted to demonstrate a lower-cost approach to planetary exploration using a lander and a small mobile science vehicle. Sojourner was designed to prove that a rover could navigate the Martian surface, approach geological targets, perform in-situ measurements, and operate with a communications relay. Its successful operation helped establish technologies and operational methods used by later Mars rover missions.',

  majorEvents: [
    {
      utc: '1996-12-04T06:58:00Z',
      event: 'Mars Pathfinder launches from Cape Canaveral aboard a Delta II launch vehicle.',
      sourceRef: 'src-nssdca',
    },
    {
      utc: '1997-07-04T16:57:00Z',
      event: 'Mars Pathfinder lands in the Ares Vallis region of Mars using its parachute, retrorockets and airbag landing system.',
      sourceRef: 'src-nssdca',
    },
    {
      utc: '1997-07-05T00:00:00Z',
      event: 'Pathfinder begins its surface operations and prepares the rover deployment sequence.',
      sourceRef: 'src-nasa-mission',
    },
    {
      utc: '1997-07-06T05:40:00Z',
      event: 'Sojourner completes deployment from the Pathfinder lander ramp and begins surface operations.',
      sourceRef: 'src-nssdca',
    },
    {
      utc: '1997-07-06T12:00:00Z',
      event: 'Sojourner begins investigating nearby rocks and surface materials using its instruments.',
      sourceRef: 'src-jpl',
    },
    {
      utc: '1997-07-07T00:00:00Z',
      event: 'The rover continues early surface operations, returning images and scientific measurements through Pathfinder.',
      sourceRef: 'src-nasa-history',
    },
    {
      utc: '1997-07-08T00:00:00Z',
      event: 'Sojourner conducts close-range investigations of rocks near the landing platform.',
      sourceRef: 'src-jpl',
    },
    {
      utc: '1997-07-15T00:00:00Z',
      event: 'The rover continues geological investigations and mobility technology demonstrations.',
      sourceRef: 'src-nasa-mission',
    },
    {
      utc: '1997-08-01T00:00:00Z',
      event: 'Sojourner continues operating beyond its planned seven-day primary mission.',
      sourceRef: 'src-jpl',
    },
    {
      utc: '1997-09-18T00:00:00Z',
      event: 'Sojourner reaches a position approximately 12 metres from the lander, a mission distance record.',
      sourceRef: 'src-nasa-history',
    },
    {
      utc: '1997-09-27T10:23:00Z',
      event: 'The final successful data transmission from the Pathfinder lander is received. Rover operations end when the communications relay is lost.',
      sourceRef: 'src-nasa-mission',
    },
  ],

  scientificFindings: [
    'The Alpha Proton X-ray Spectrometer measured the elemental composition of rocks and soil at the landing site.',
    'Observations of rounded pebbles and cobbles suggested that some rocks formed or were transported in flowing water.',
    'The investigated rocks provided evidence consistent with an ancient environment that had liquid water.',
    'The rover demonstrated that close-range robotic geological investigations could be performed on another planet.',
    'Images and measurements helped scientists investigate the geological history of Ares Vallis.',
    'The mission demonstrated the value of combining a stationary lander with a mobile science platform.',
  ],

  engineeringAchievements: [
    'Sojourner became the first successful wheeled robotic vehicle to operate on another planet.',
    'Its six-wheel rocker-bogie suspension helped it traverse uneven Martian terrain.',
    'The rover used a compact, lightweight design with a mass of approximately 10.5 kilograms.',
    'It used solar cells and primary batteries for electrical power.',
    'A UHF radio link connected the rover to the Pathfinder lander.',
    'The rover carried an Alpha Proton X-ray Spectrometer for in-situ chemical analysis.',
    'Its small cameras provided images of rocks, soil and nearby terrain.',
    'The rover operated for 83 days, far beyond its planned seven-day operational lifetime.',
  ],

  missionChallenges: [
    'The rover had to operate in a cold, dusty environment with limited electrical power.',
    'Its small size restricted the available space, mass and power for instruments and mobility systems.',
    'Sojourner depended on the Pathfinder lander as its communications relay.',
    'The rover had to navigate rocks and uneven ground using a compact mobility system.',
    'Communication and command cycles required coordination between the rover, lander and Earth-based operators.',
    'The mission had a planned rover lifetime of seven days, requiring careful prioritisation of early operations.',
    'The loss of Pathfinder communications ultimately ended rover operations.',
  ],

  currentStatus:
    'Sojourner is inactive on the Martian surface at the Mars Pathfinder Ares Vallis landing site. Its last successful operations were in September 1997. The rover has not been recovered or physically inspected since the mission. Its exact final position should not be treated as confirmed by the general landing-site coordinates.',

  physicalRecoveryPossible: false,
  physicalRecoveryRationale:
    'Sojourner remains on Mars at the historical Pathfinder landing site. No recovery mission has visited the rover. Its precise current physical condition and final resting position have not been confirmed by direct inspection. Gameplay collection must therefore represent the rover through remote observation, archived images, engineering records and digital reconstruction rather than physical recovery.',

  collectibleKinds: [
    'Rover identification record',
    'Ares Vallis terrain imagery',
    'Rover mobility system reconstruction',
    'APXS chemical analysis archive',
    'Rover camera image archive',
    'Surface navigation log',
    'Power system record',
    'Pathfinder communications archive',
    'Mission longevity record',
  ],

  components: [
    {
      id: 'cmp-chassis',
      name: 'Rover chassis',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'The central body of Sojourner supported its electronics, batteries, instruments and mobility systems.',
      condition:
        'The current physical condition is unknown. The in-game model is reconstructed from historical engineering documentation.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0.2, z: 0 },
      evidenceId: 'ev-rover-design',
      historicalNote:
        'The compact rover measured approximately 65 centimetres long, 48 centimetres wide and 30 centimetres high.',
      uncertain: false,
    },
    {
      id: 'cmp-rocker-bogie',
      name: 'Rocker-bogie suspension',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'The suspension system helped distribute the rover weight across its six wheels and maintain mobility over uneven ground.',
      condition:
        'The final mechanical condition is unknown. The system can be studied through its documented design and mission performance.',
      scanDurationMs: 3000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0, z: 0 },
      evidenceId: 'ev-mobility',
      historicalNote:
        'The rocker-bogie arrangement was an important mobility technology demonstration for future planetary rovers.',
      uncertain: false,
    },
    {
      id: 'cmp-wheel-left-front',
      name: 'Left front wheel assembly',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'One of the six driven wheels that provided traction and movement across the Martian surface.',
      condition:
        'Individual wheel condition after mission termination is unknown.',
      scanDurationMs: 1800,
      requiresAngle: true,
      gameLayoutOffsetM: { x: -0.32, y: 0, z: 0.2 },
      evidenceId: 'ev-mobility',
      historicalNote:
        'Six wheel motors controlled rover movement.',
      uncertain: true,
    },
    {
      id: 'cmp-wheel-right-front',
      name: 'Right front wheel assembly',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'Provided traction and helped the rover negotiate small rocks and irregular terrain.',
      condition:
        'Individual wheel condition after mission termination is unknown.',
      scanDurationMs: 1800,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0.32, y: 0, z: 0.2 },
      evidenceId: 'ev-mobility',
      historicalNote:
        'The six-wheel layout supported movement across the rocky Ares Vallis terrain.',
      uncertain: true,
    },
    {
      id: 'cmp-apxs',
      name: 'Alpha Proton X-ray Spectrometer',
      type: 'INSTRUMENT',
      functionPlain:
        'Measured the elemental composition of rocks and soil by analysing particles and X-rays produced during interaction with the target material.',
      condition:
        'The instrument is inactive. Its historical measurement records remain available for scientific study.',
      scanDurationMs: 3500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0.2, z: -0.3 },
      evidenceId: 'ev-apxs',
      historicalNote:
        'APXS was the rover’s principal scientific instrument for close-range chemical analysis.',
      uncertain: false,
    },
    {
      id: 'cmp-cameras',
      name: 'Rover imaging cameras',
      type: 'INSTRUMENT',
      functionPlain:
        'Captured images of nearby rocks, soil, rover hardware and the surrounding Martian landscape.',
      condition:
        'No current camera operation is possible. Archived images are available.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0.45, z: -0.25 },
      evidenceId: 'ev-images',
      historicalNote:
        'Sojourner carried three imaging cameras: two black-and-white cameras and one colour camera.',
      uncertain: false,
    },
    {
      id: 'cmp-solar-panels',
      name: 'Solar power system',
      type: 'POWER',
      functionPlain:
        'Converted sunlight into electrical energy to support rover operations and recharge its power system.',
      condition:
        'The rover is inactive. The present state of its solar cells is unknown.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0.15, z: 0 },
      evidenceId: 'ev-power',
      historicalNote:
        'Solar power was the primary energy source for Sojourner.',
      uncertain: true,
    },
    {
      id: 'cmp-batteries',
      name: 'Primary battery system',
      type: 'POWER',
      functionPlain:
        'Stored electrical energy and supported rover operations, particularly during periods when solar energy was insufficient.',
      condition:
        'Battery condition is unknown after decades on the Martian surface.',
      scanDurationMs: 2000,
      requiresAngle: false,
      gameLayoutOffsetM: { x: 0, y: 0.05, z: 0.05 },
      evidenceId: 'ev-power',
      historicalNote:
        'Primary batteries supported early operations and supplemented the solar power system.',
      uncertain: true,
    },
    {
      id: 'cmp-antenna',
      name: 'UHF communications antenna',
      type: 'INSTRUMENT',
      functionPlain:
        'Transmitted rover data to the Pathfinder lander, which relayed the information to Earth.',
      condition:
        'No current communications are possible. Historical communications records remain available.',
      scanDurationMs: 2000,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0.35, z: 0.25 },
      evidenceId: 'ev-communications',
      historicalNote:
        'Sojourner depended on Pathfinder as its communications link to Earth.',
      uncertain: false,
    },
    {
      id: 'cmp-deployment-mechanism',
      name: 'APXS deployment mechanism',
      type: 'PRIMARY_STRUCTURE',
      functionPlain:
        'Positioned the APXS instrument against selected rocks and soil targets for chemical measurements.',
      condition:
        'The current condition of the deployment mechanism is unknown.',
      scanDurationMs: 2500,
      requiresAngle: true,
      gameLayoutOffsetM: { x: 0, y: 0.1, z: -0.35 },
      evidenceId: 'ev-apxs',
      historicalNote:
        'The APXS was attached to an extendable deployment mechanism.',
      uncertain: true,
    },
  ],

  evidence: [
    {
      id: 'ev-rover-design',
      label: 'Sojourner rover engineering record',
      type: 'MISSION_RECORD',
      description:
        'Engineering documentation describes the rover dimensions, mass, chassis and compact robotic design.',
      requiredForCompletion: true,
      points: 40,
      sourceRef: 'src-jpl',
    },
    {
      id: 'ev-mobility',
      label: 'Six-wheel mobility system',
      type: 'STRUCTURAL_SCAN',
      description:
        'The rocker-bogie suspension and six-wheel arrangement enabled Sojourner to move across uneven Martian terrain.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-jpl',
    },
    {
      id: 'ev-apxs',
      label: 'APXS scientific measurements',
      type: 'MISSION_RECORD',
      description:
        'The Alpha Proton X-ray Spectrometer analysed the elemental composition of rocks and soil.',
      requiredForCompletion: true,
      points: 60,
      sourceRef: 'src-nasa-history',
    },
    {
      id: 'ev-images',
      label: 'Rover image archive',
      type: 'PHOTOGRAMMETRY',
      description:
        'Archived rover images document the nearby terrain, rocks and surface operations.',
      requiredForCompletion: true,
      points: 40,
      sourceRef: 'src-nasa-mission',
    },
    {
      id: 'ev-power',
      label: 'Power system record',
      type: 'MISSION_RECORD',
      description:
        'Sojourner used solar power supplemented by primary batteries.',
      requiredForCompletion: true,
      points: 40,
      sourceRef: 'src-jpl',
    },
    {
      id: 'ev-communications',
      label: 'Pathfinder communications relay',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'The rover communicated through the Pathfinder lander, which relayed data to Earth.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-jpl',
    },
    {
      id: 'ev-deployment',
      label: 'Rover deployment sequence',
      type: 'MISSION_RECORD',
      description:
        'Sojourner was deployed from the Pathfinder lander using a ramp and began surface operations on 6 July 1997.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-nssdca',
    },
    {
      id: 'ev-longevity',
      label: 'Mission longevity record',
      type: 'MISSION_RECORD',
      description:
        'Sojourner operated for 83 days, exceeding its planned seven-day operational lifetime.',
      requiredForCompletion: true,
      points: 50,
      sourceRef: 'src-jpl',
    },
    {
      id: 'ev-final-contact',
      label: 'Final Pathfinder transmission',
      type: 'TELEMETRY_ARCHIVE',
      description:
        'The final successful Pathfinder data transmission was received on 27 September 1997.',
      requiredForCompletion: true,
      points: 40,
      sourceRef: 'src-nasa-mission',
    },
    {
      id: 'ev-terrain',
      label: 'Ares Vallis terrain archive',
      type: 'PHOTOGRAMMETRY',
      description:
        'Images show the rock-strewn ancient floodplain selected for the Pathfinder landing.',
      requiredForCompletion: false,
      points: 30,
      sourceRef: 'src-nasa-mission',
    },
  ],

  objectives: [
    {
      id: 'obj-identify',
      label: 'Identify the Sojourner rover and its Pathfinder mission',
      required: true,
      points: 100,
    },
    {
      id: 'obj-deployment',
      label: 'Reconstruct the rover deployment sequence',
      required: true,
      points: 100,
    },
    {
      id: 'obj-mobility',
      label: 'Inspect the six-wheel rocker-bogie mobility system',
      required: true,
      points: 150,
    },
    {
      id: 'obj-apxs',
      label: 'Recover the APXS scientific instrument record',
      required: true,
      points: 150,
    },
    {
      id: 'obj-images',
      label: 'Recover rover images of Ares Vallis',
      required: true,
      points: 100,
    },
    {
      id: 'obj-power',
      label: 'Investigate the rover power system',
      required: true,
      points: 100,
    },
    {
      id: 'obj-communications',
      label: 'Reconstruct the Pathfinder communications relay',
      required: true,
      points: 100,
    },
    {
      id: 'obj-longevity',
      label: 'Verify the 83-day operational lifetime',
      required: true,
      points: 100,
    },
    {
      id: 'obj-final-contact',
      label: 'Recover the final mission transmission record',
      required: true,
      points: 100,
    },
  ],

  challenges: [
    {
      id: 'C1',
      type: 'MULTIPLE_CHOICE',
      title: 'The first rover',
      objective: 'Identify Sojourner’s historical significance.',
      instructions:
        'What made Sojourner an important milestone in planetary exploration?',
      options: [
        { id: 'a', text: 'It was the first spacecraft to orbit Mars.' },
        { id: 'b', text: 'It was the first wheeled vehicle to operate on another planet.' },
        { id: 'c', text: 'It was the first human-operated vehicle on Mars.' },
        { id: 'd', text: 'It was the first rover to return Martian samples to Earth.' },
      ],
      correctAnswer: ['b'],
      explanation:
        'Sojourner became the first wheeled robotic vehicle to operate on another planet, demonstrating a new approach to mobile planetary exploration.',
      hints: [
        'Think about what made Sojourner different from earlier stationary landers.',
        'It was a small robotic vehicle with wheels that moved across the Martian surface.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 4,
    },
    {
      id: 'C2',
      type: 'MULTIPLE_CHOICE',
      title: 'The rover’s connection to Earth',
      objective: 'Understand the communications architecture.',
      instructions:
        'How did Sojourner send its data back to Earth?',
      options: [
        { id: 'a', text: 'It transmitted directly to Earth using a large high-gain antenna.' },
        { id: 'b', text: 'It used the Pathfinder lander as a communications relay.' },
        { id: 'c', text: 'It stored all data until a later sample-return mission.' },
        { id: 'd', text: 'It communicated through an orbiting communications satellite.' },
      ],
      correctAnswer: ['b'],
      explanation:
        'Sojourner used a UHF radio link to communicate with Pathfinder. The lander relayed the rover data to Earth.',
      hints: [
        'Sojourner was a very small rover with limited mass and power.',
        'Its companion lander acted as its communications link to mission control.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 4,
    },
    {
      id: 'C3',
      type: 'MULTIPLE_CHOICE',
      title: 'Chemical detective',
      objective: 'Identify the rover’s primary science instrument.',
      instructions:
        'Which instrument analysed the elemental composition of rocks and soil?',
      options: [
        { id: 'a', text: 'Imager for Mars Pathfinder' },
        { id: 'b', text: 'Atmospheric Structure Instrument' },
        { id: 'c', text: 'Alpha Proton X-ray Spectrometer' },
        { id: 'd', text: 'Mars Orbiter Laser Altimeter' },
      ],
      correctAnswer: ['c'],
      explanation:
        'The Alpha Proton X-ray Spectrometer, or APXS, performed close-range chemical analysis of rocks and soil.',
      hints: [
        'Look for the instrument whose name contains three types of radiation or particles.',
        'Its abbreviation is APXS.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 4,
    },
    {
      id: 'C4',
      type: 'MULTIPLE_CHOICE',
      title: 'Beyond the planned lifetime',
      objective: 'Understand the rover’s operational longevity.',
      instructions:
        'How long did Sojourner operate compared with its planned seven-day mission?',
      options: [
        { id: 'a', text: 'Seven hours' },
        { id: 'b', text: 'Seven days' },
        { id: 'c', text: 'Thirty days' },
        { id: 'd', text: 'Eighty-three days' },
      ],
      correctAnswer: ['d'],
      explanation:
        'Sojourner operated for 83 days, approximately twelve times its planned seven-day mission.',
      hints: [
        'The rover significantly exceeded its original design lifetime.',
        'The correct duration was more than eleven weeks.',
      ],
      points: 150,
      optional: false,
      retryPenaltyPower: 4,
    },
    {
      id: 'C5',
      type: 'MATCH_COMPONENTS',
      title: 'Rover systems',
      objective: 'Match the major rover systems with their functions.',
      instructions:
        'Connect each Sojourner component to the function it performed.',
      options: [
        { id: 'chassis', text: 'Rover chassis' },
        { id: 'suspension', text: 'Rocker-bogie suspension' },
        { id: 'apxs', text: 'Alpha Proton X-ray Spectrometer' },
        { id: 'solar', text: 'Solar power system' },
        { id: 'antenna', text: 'UHF antenna' },
        { id: 'mobility', text: 'Supports rover electronics and instruments' },
        { id: 'terrain', text: 'Helps traverse uneven terrain' },
        { id: 'chemistry', text: 'Measures elemental composition' },
        { id: 'energy', text: 'Converts sunlight into electrical energy' },
        { id: 'radio', text: 'Sends data to the Pathfinder lander' },
      ],
      correctAnswer: {
        chassis: 'mobility',
        suspension: 'terrain',
        apxs: 'chemistry',
        solar: 'energy',
        antenna: 'radio',
      },
      explanation:
        'Each system contributed to Sojourner’s ability to move, investigate the Martian surface, generate power and communicate.',
      hints: [
        'The APXS is a science instrument, not a mobility component.',
        'The antenna communicated with the lander, while the solar system generated electrical power.',
      ],
      points: 250,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'C6',
      type: 'ORDER_EVENTS',
      title: 'A small rover’s journey',
      objective: 'Reconstruct the important stages of Sojourner’s mission.',
      instructions:
        'Arrange the events in chronological order.',
      options: [
        { id: 'e1', text: 'Mars Pathfinder launches from Earth.' },
        { id: 'e2', text: 'Pathfinder lands in Ares Vallis.' },
        { id: 'e3', text: 'Sojourner rolls down the deployment ramp.' },
        { id: 'e4', text: 'Sojourner investigates rocks and soil.' },
        { id: 'e5', text: 'The rover continues beyond its planned seven-day lifetime.' },
        { id: 'e6', text: 'The final successful Pathfinder transmission is received.' },
      ],
      correctAnswer: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'],
      explanation:
        'Sojourner travelled to Mars with Pathfinder, deployed after landing, conducted surface investigations and continued operating beyond its planned lifetime until communications ended.',
      hints: [
        'The rover could not begin surface operations before the lander arrived.',
        'The final transmission happened after the rover had already exceeded its planned lifetime.',
      ],
      points: 250,
      optional: false,
      retryPenaltyPower: 5,
    },
    {
      id: 'C7',
      type: 'MULTIPLE_CHOICE',
      title: 'The end of the mission',
      objective: 'Understand why Sojourner stopped operating.',
      instructions:
        'What ultimately prevented further interaction with Sojourner?',
      options: [
        { id: 'a', text: 'The rover was deliberately launched into space.' },
        { id: 'b', text: 'The Pathfinder lander lost its ability to communicate.' },
        { id: 'c', text: 'The rover returned to Earth.' },
        { id: 'd', text: 'A second rover replaced it.' },
      ],
      correctAnswer: ['b'],
      explanation:
        'Sojourner depended on Pathfinder as its communications relay. When the lander stopped transmitting, rover operations could no longer continue.',
      hints: [
        'The rover did not have an independent direct communications link to Earth.',
        'Its companion lander was the critical communications link.',
      ],
      points: 150,
      optional: true,
      retryPenaltyPower: 4,
    },
  ],

  dialogue: [
    {
      id: 'dlg-detection',
      trigger: 'ON_DETECTION_START',
      lines: [
        { speaker: 'LUNA', text: 'New signal detected. Mars. Ares Vallis.' },
        { speaker: 'PLAYER', text: 'Another lander?' },
        { speaker: 'LUNA', text: 'Not quite. The target is a rover. Small, six wheels, and a surprisingly long mission history.' },
        { speaker: 'PLAYER', text: 'Name?' },
        { speaker: 'LUNA', text: 'Sojourner. Delivered by Mars Pathfinder in July 1997.' },
        { speaker: 'PLAYER', text: 'The first Mars rover?' },
        { speaker: 'LUNA', text: 'The first wheeled vehicle to operate on another planet. A little machine with a very large legacy.', emotion: 'EXCITED' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-first-scan',
      trigger: 'ON_FIRST_SCAN',
      lines: [
        { speaker: 'LUNA', text: 'Historical rover configuration loaded.' },
        { speaker: 'PLAYER', text: 'It is tiny.' },
        { speaker: 'LUNA', text: 'Approximately 10.5 kilograms. About the size of a small suitcase, depending on how generously you define suitcase.' },
        { speaker: 'PLAYER', text: 'And it drove around Mars?' },
        { speaker: 'LUNA', text: 'For 83 days. Its planned lifetime was seven.' },
        { speaker: 'PLAYER', text: 'That is a good return on investment.' },
        { speaker: 'LUNA', text: 'An excellent one.', emotion: 'DRY' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-mobility',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'cmp-rocker-bogie',
      lines: [
        { speaker: 'LUNA', text: 'Rocker-bogie suspension identified.' },
        { speaker: 'PLAYER', text: 'Six wheels. That seems simple enough.' },
        { speaker: 'LUNA', text: 'Simple is not the same as easy. The suspension helped distribute the rover’s weight and negotiate uneven ground.' },
        { speaker: 'PLAYER', text: 'So it could get around rocks without tipping over.' },
        { speaker: 'LUNA', text: 'That was the idea. Small wheels, careful movement, and a lot of engineering.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-apxs',
      trigger: 'ON_COMPONENT_SCANNED',
      triggerParam: 'cmp-apxs',
      lines: [
        { speaker: 'LUNA', text: 'APXS instrument record recovered.' },
        { speaker: 'PLAYER', text: 'What did it look for?' },
        { speaker: 'LUNA', text: 'The elemental composition of rocks and soil.' },
        { speaker: 'PLAYER', text: 'So it was a miniature geology lab.' },
        { speaker: 'LUNA', text: 'Exactly. It brought the laboratory to the rock instead of bringing the rock home.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-communications',
      trigger: 'ON_SIGNAL_LOCK',
      triggerParam: 'ev-communications',
      lines: [
        { speaker: 'LUNA', text: 'Communications architecture reconstructed.' },
        { speaker: 'PLAYER', text: 'Could Sojourner talk directly to Earth?' },
        { speaker: 'LUNA', text: 'Its UHF radio communicated with Pathfinder. The lander relayed the data to Earth.' },
        { speaker: 'PLAYER', text: 'So if the lander stopped, the rover went silent.' },
        { speaker: 'LUNA', text: 'Precisely. A small rover depended on a stationary companion.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-longevity',
      trigger: 'ON_SIGNAL_LOCK',
      triggerParam: 'ev-longevity',
      lines: [
        { speaker: 'LUNA', text: 'Mission lifetime record recovered.' },
        { speaker: 'PLAYER', text: 'Seven days planned. Eighty-three days achieved.' },
        { speaker: 'LUNA', text: 'A remarkable extension of the original plan.' },
        { speaker: 'PLAYER', text: 'What made it last?' },
        { speaker: 'LUNA', text: 'Reliable engineering, careful operations and a mission team that kept finding useful work for it to do.' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-final-contact',
      trigger: 'ON_MISSION_END',
      lines: [
        { speaker: 'LUNA', text: 'Final Pathfinder transmission record located. 27 September 1997.' },
        { speaker: 'PLAYER', text: 'That was the end?' },
        { speaker: 'LUNA', text: 'The last successful data transmission. Pathfinder could no longer relay communications with Sojourner.' },
        { speaker: 'PLAYER', text: 'Eighty-three days on another world. Not bad for a seven-day rover.' },
        { speaker: 'LUNA', text: 'It did not need to last forever to change what came next.', emotion: 'SOFT' },
      ],
      onceOnly: true,
      skippable: true,
    },
    {
      id: 'dlg-complete',
      trigger: 'ON_INVESTIGATION_COMPLETE',
      lines: [
        { speaker: 'LUNA', text: 'Sojourner archive complete.' },
        { speaker: 'PLAYER', text: 'First wheels on another planet.' },
        { speaker: 'LUNA', text: 'First successful wheeled robotic vehicle to operate on another planet. A distinction worth preserving.' },
        { speaker: 'PLAYER', text: 'Small rover. Big consequences.' },
        { speaker: 'LUNA', text: 'And a path that later explorers would follow.', emotion: 'SOFT' },
        { speaker: 'LUNA', text: 'Archive sealed. Sojourner’s journey is preserved.' },
      ],
      onceOnly: true,
      skippable: true,
    },
  ],

  rewards: {
    basePoints: 1000,
    maxPoints: 1800,
    completionThreshold: 1000,
    difficultyTier: 2,
    archiveEntryId: 'ARCH-MARS-SOJOURNER',
    archiveEntryTitle: 'Sojourner: The First Wheels on Mars',
    badges: [
      {
        id: 'badge-first-wheels',
        name: 'First Wheels',
        description: 'You reconstructed the mission of the first wheeled vehicle to operate on another planet.',
        condition: 'Complete the rover identification and mobility investigations.',
      },
      {
        id: 'badge-little-explorer',
        name: 'Little Explorer',
        description: 'You recovered Sojourner’s scientific and operational history.',
        condition: 'Complete all required rover evidence objectives.',
      },
      {
        id: 'badge-beyond-the-plan',
        name: 'Beyond the Plan',
        description: 'You verified the rover’s extended operational lifetime.',
        condition: 'Recover the 83-day mission record.',
      },
    ],
    levelProgressPercent: 10,
    reputation: 150,
    resourceRestoration: [
      { resource: 'SUIT_POWER', amount: 'FULL' },
      { resource: 'SCANNER_CALIBRATION', amount: 15 },
      { resource: 'ARCHIVE_UPLINK_SLOTS', amount: 1 },
    ],
    equipmentUpgrades: [
      {
        id: 'upg-terrain-analysis',
        name: 'Terrain Analysis Module',
        effect:
          'Improves interpretation of rover imagery and identification of geological targets in archived planetary surface images.',
      },
      {
        id: 'upg-mobility-diagnostics',
        name: 'Mobility Diagnostics',
        effect:
          'Improves reconstruction of historic rover suspension and wheel systems.',
      },
    ],
  },

  collectionSequence: {
    id: 'sojourner-archive-lock',
    steps: [
      {
        order: 1,
        label: 'Locate',
        interaction:
          'Lock onto the Ares Vallis landing-region archive and identify the Sojourner rover.',
        durationMs: 3000,
      },
      {
        order: 2,
        label: 'Inspect',
        interaction:
          'Scan the rover chassis, suspension, wheels, instruments and power systems in the historical reconstruction.',
        durationMs: 6000,
      },
      {
        order: 3,
        label: 'Recover',
        interaction:
          'Retrieve APXS measurements, rover imagery and communications records.',
        durationMs: 5000,
      },
      {
        order: 4,
        label: 'Reconstruct',
        interaction:
          'Rebuild the deployment and mission timeline, including the final successful transmission.',
        durationMs: 5000,
      },
      {
        order: 5,
        label: 'Preserve',
        interaction:
          'Verify the 83-day mission record and seal the Sojourner archive.',
        durationMs: 3000,
      },
    ],
    removesPhysicalObject: false,
  },

  archive: {
    id: 'ARCH-MARS-SOJOURNER',
    title: 'Sojourner: The First Wheels on Mars',
    tier: 'LANDMARK',
    summary:
      'Sojourner was the first wheeled robotic vehicle to operate on another planet. Delivered by Mars Pathfinder to Ares Vallis in July 1997, the small rover demonstrated mobile surface exploration, investigated Martian rocks and soil, and operated for 83 days despite a planned seven-day mission.',
    sections: [
      {
        heading: 'A small rover with a large purpose',
        body:
          'Sojourner was developed as a lightweight mobile science platform for the Mars Pathfinder mission. With a mass of approximately 10.5 kilograms, it demonstrated that a small robotic vehicle could travel across another planet, investigate nearby geological targets and return useful scientific data.',
        sourceRefs: ['src-jpl', 'src-nasa-history'],
      },
      {
        heading: 'Arrival at Ares Vallis',
        body:
          'Mars Pathfinder landed on 4 July 1997 in the Ares Vallis region. The lander used a parachute, retrorockets and an airbag system to cushion its landing. Sojourner was subsequently deployed using a ramp and began operating on the Martian surface.',
        sourceRefs: ['src-nasa-mission', 'src-nssdca'],
      },
      {
        heading: 'Mobility and exploration',
        body:
          'The six-wheeled rover used a rocker-bogie suspension system to travel across uneven terrain. It photographed rocks and soil, approached scientific targets and demonstrated the potential of mobile planetary exploration.',
        sourceRefs: ['src-jpl'],
      },
      {
        heading: 'Scientific investigation',
        body:
          'Sojourner carried an Alpha Proton X-ray Spectrometer for elemental analysis of rocks and soil. Its images and measurements helped researchers investigate the geology of Ares Vallis and evidence of ancient water-related processes.',
        sourceRefs: ['src-nasa-history', 'src-nasa-mission'],
      },
      {
        heading: 'A mission beyond expectations',
        body:
          'Sojourner was designed for a seven-day operational lifetime but operated for 83 days. It depended on Pathfinder as its communications relay. The final successful data transmission from Pathfinder was received on 27 September 1997.',
        sourceRefs: ['src-jpl', 'src-nasa-mission'],
      },
    ],
    openQuestions: [
      'What is the rover’s exact present-day position and physical condition?',
      'How much of Sojourner’s original surface hardware remains intact after decades on Mars?',
      'Which specific rover engineering lessons had the greatest influence on later Mars rover designs?',
      'How could modern orbital images help locate and identify the historical rover and its tracks?',
    ],
    tags: [
      'mars',
      'sojourner',
      'mars-pathfinder',
      'ares-vallis',
      'mars-rover',
      'robotic-exploration',
      'apxs',
      'planetary-geology',
      'first-rover',
    ],
  },

  educational: {
    surprisingFacts: [
      'Sojourner weighed approximately 10.5 kilograms.',
      'It was the first wheeled vehicle to operate on another planet.',
      'Its planned operational lifetime was seven days, but it operated for 83 days.',
      'The rover communicated through the Pathfinder lander rather than using an independent direct-to-Earth communications system.',
      'Its six-wheel rocker-bogie mobility system helped it travel across rocky terrain.',
      'The rover carried an instrument capable of analysing the elemental composition of rocks and soil.',
      'Pathfinder returned more than 16,500 lander images and 550 rover images.',
    ],
    concepts: [
      {
        term: 'Rocker-bogie suspension',
        explanation:
          'A mechanical suspension arrangement that helps distribute vehicle weight across multiple wheels and allows a rover to travel over uneven terrain.',
      },
      {
        term: 'Alpha Proton X-ray Spectrometer',
        explanation:
          'A scientific instrument that analyses the elemental composition of a material by measuring particles and X-rays produced during interaction with the target.',
      },
      {
        term: 'Communications relay',
        explanation:
          'A spacecraft or station that receives information from another vehicle and forwards it to a distant receiver. Pathfinder served this role for Sojourner.',
      },
      {
        term: 'In-situ analysis',
        explanation:
          'Scientific investigation performed directly at the location where a sample or target is found, without first returning it to a laboratory on Earth.',
      },
      {
        term: 'Ares Vallis',
        explanation:
          'An ancient Martian outflow channel and floodplain selected as the Mars Pathfinder landing region because it offered a relatively safe landing area with varied geological materials.',
      },
    ],
    takeaways: [
      'Small robotic vehicles can perform valuable scientific work on other planets.',
      'Mobility is a major advantage when investigating geological targets across a planetary surface.',
      'A stationary lander can provide communications support for a mobile rover.',
      'Mission engineering demonstrations can be as important as scientific discoveries.',
      'Sojourner helped establish the foundations of later Mars rover exploration.',
    ],
    openQuestion:
      'If Sojourner had been designed with the cameras, autonomy and mobility capabilities of modern Mars rovers, how much more of Ares Vallis could it have explored during its 83 days?',
  },

  sources: [
    {
      id: 'src-nasa-mission',
      title: 'NASA Science: Mars Pathfinder',
      url: 'https://science.nasa.gov/mission/mars-pathfinder/',
      role: 'PRIMARY',
    },
    {
      id: 'src-jpl',
      title: 'NASA JPL: Mars Pathfinder / Sojourner Rover',
      url: 'https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner-rover/',
      role: 'PRIMARY',
    },
    {
      id: 'src-nssdca',
      title: 'NASA NSSDCA: Mars Pathfinder Project Information',
      url: 'https://nssdc.gsfc.nasa.gov/planetary/mesur.html',
      role: 'PRIMARY',
    },
    {
      id: 'src-nasa-history',
      title: 'NASA History: Mars Pathfinder and Sojourner',
      url: 'https://www.nasa.gov/history/25-years-ago-mars-pathfinder-launches-to-mars-to-deploy-sojourner-the-first-planetary-rover/',
      role: 'SUPPORTING',
    },
    {
      id: 'src-nasa-deployment',
      title: 'NASA: July 4, 1997 — Sojourner Arrives on the Red Planet',
      url: 'https://www.nasa.gov/image-article/july-4-1997-sojourner-arrives-red-planet/',
      role: 'SUPPORTING',
    },
  ],

  uncertaintyNotes: [
    'The coordinates identify the general Mars Pathfinder landing region, not a precise final Sojourner rover coordinate.',
    'The rover moved away from the lander during its mission. The rover and lander should not be represented as occupying the same exact position.',
    'The exact current physical condition of Sojourner is unknown.',
    'The final successful Pathfinder transmission is documented, but it should not be described as a confirmed direct final transmission from the rover itself.',
    'The rover relied on Pathfinder as a communications relay. Loss of the lander communications link prevented further rover operations.',
    'Component condition descriptions in the game are historical reconstructions, not results of modern physical inspection.',
    'The rover’s final position and the exact preservation state of its tracks are not established by the cited mission summaries.',
    'The dates in the mission timeline are selected milestones. Some intermediate dates are illustrative timeline markers rather than exact timestamped engineering events.',
  ],
};
