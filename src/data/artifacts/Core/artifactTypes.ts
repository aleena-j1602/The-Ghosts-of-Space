// ---------------------------------------------------------------------------
// ghosts-of-space/core/artifact.types.ts
// ---------------------------------------------------------------------------

export type LocationType = 'SURFACE' | 'ORBIT' | 'DEEP_SPACE' | 'SIGNAL_AND_DATA';

export type LevelId = 1 | 2 | 3;

export type EvidenceType =
  | 'PHOTOGRAMMETRY'
  | 'STRUCTURAL_SCAN'
  | 'MATERIAL_SPECTROMETRY'
  | 'TRACE_PATTERN'
  | 'TRANSCRIPTION'
  | 'TELEMETRY_ARCHIVE'
  | 'MISSION_RECORD'
  | 'LIVE_MEASUREMENT'
  | 'CONDITION_REPORT';

export type ChallengeType =
  | 'MULTIPLE_CHOICE'
  | 'MATCH_COMPONENTS'
  | 'ORDER_EVENTS'
  | 'DECODE_RECORD';

export type Speaker = 'LUNA' | 'PLAYER' | 'SYSTEM';

export interface Coordinates {
  latDeg: number | null;
  lonDeg: number | null;
  body: string;
  frame: string | null;   // e.g. 'LRO DE 421'
  accuracyM: number | null;
  note?: string;
}

export interface MissionDates {
  launch: string | null;        // ISO 8601 UTC
  landing: string | null;
  firstSurfaceActivity: string | null;
  departure: string | null;
  lastContact: string | null;
  missionEnd: string | null;
}

export interface ArtifactComponent {
  id: string;
  name: string;
  type: 'PRIMARY_STRUCTURE' | 'PROPULSION' | 'POWER' | 'INSTRUMENT' | 'MARKER' | 'CREW_SYSTEM';
  functionPlain: string;
  condition: string;
  scanDurationMs: number;
  requiresAngle: boolean;
  /** Approximate offset in metres from the site origin, for scene layout only.
   *  Derived from documented separations; NOT a survey coordinate. */
  gameLayoutOffsetM: { x: number; y: number; z: number } | null;
  evidenceId: string | null;
  historicalNote: string | null;
  uncertain: boolean;
}

export interface EvidenceRecord {
  id: string;
  label: string;
  type: EvidenceType;
  description: string;
  requiredForCompletion: boolean;
  points: number;
  sourceRef: string | null;
}

export interface ChallengeOption {
  id: string;
  text: string;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  objective: string;
  instructions: string;
  options?: ChallengeOption[];
  /** For MATCH_COMPONENTS: pairs of left/right ids. For ORDER_EVENTS: ordered ids. */
  correctAnswer: string[] | Record<string, string>;
  decoyIds?: string[];
  explanation: string;
  hints: [string, string];
  points: number;
  optional: boolean;
  retryPenaltyPower: number;
}

export interface DialogueLine {
  speaker: Speaker;
  text: string;
  emotion?: 'NEUTRAL' | 'CURIOUS' | 'EXCITED' | 'DRY' | 'SOFT' | 'URGENT';
  stageDirection?: string;
  /** Reference to a real historical quotation; rendered with a citation badge. */
  historicalQuoteRef?: string;
}

export interface DialogueScene {
  id: string;
  trigger:
    | 'ON_DETECTION_START'
    | 'ON_SIGNAL_LOCK'
    | 'ON_ENTER_PRESERVATION_RING'
    | 'ON_FIRST_SCAN'
    | 'ON_COMPONENT_SCANNED'
    | 'ON_MISSING_STAGE_REVEAL'
    | 'ON_LIVE_RANGING_SUCCESS'
    | 'ON_INVESTIGATION_COMPLETE'
    | 'ON_POWER_DEPLETED'
    | 'ON_MISSION_END';
  triggerParam?: string;
  lines: DialogueLine[];
  onceOnly: boolean;
  skippable: boolean;
}

export interface RewardSpec {
  basePoints: number;
  maxPoints: number;
  completionThreshold: number;
  difficultyTier: 1 | 2 | 3 | 4 | 5;
  archiveEntryId: string;
  archiveEntryTitle: string;
  badges: { id: string; name: string; description: string; condition: string }[];
  levelProgressPercent: number;
  reputation: number;
  resourceRestoration: { resource: string; amount: number | 'FULL' }[];
  equipmentUpgrades: { id: string; name: string; effect: string }[];
}

export interface ArchiveContent {
  id: string;
  title: string;
  tier: 'FRAGMENT' | 'PARTIAL' | 'COMPLETE' | 'LANDMARK';
  summary: string;
  sections: { heading: string; body: string; sourceRefs: string[] }[];
  openQuestions: string[];
  tags: string[];
}

export interface ArtifactDefinition {
  id: string;
  sourceFileName?: string;
  isCollected?: boolean;
  officialName: string;
  commonName: string;
  aliases: string[];
  catalogIds: { nssdca: string | null; cospar: string | null };
  type: string;
  level: LevelId;
  locationType: LocationType;
  locationTypeSecondary: LocationType | null;
  locationRationale: string;
  agency: string;
  program: string;
  mission: string;
  dates: MissionDates;
  coordinates: Coordinates | null;
  secondaryCoordinates: Coordinates[] | null;
  destination: string;
  description: string;
  objective: string;
  developmentReason: string;
  majorEvents: { utc: string; event: string; sourceRef: string }[];
  scientificFindings: string[];
  engineeringAchievements: string[];
  /** Historical/operational challenges recorded in the mission record (narrative). */
  missionChallenges: string[];
  currentStatus: string;
  physicalRecoveryPossible: boolean;
  physicalRecoveryRationale: string;
  collectibleKinds: string[];
  components: ArtifactComponent[];
  evidence: EvidenceRecord[];
  objectives: { id: string; label: string; required: boolean; points: number }[];
  challenges: Challenge[];
  dialogue: DialogueScene[];
  rewards: RewardSpec;
  collectionSequence: {
    id: string;
    steps: { order: number; label: string; interaction: string; durationMs: number }[];
    removesPhysicalObject: boolean;
  };
  archive: ArchiveContent;
  educational: {
    surprisingFacts: string[];
    concepts: { term: string; explanation: string }[];
    takeaways: string[];
    openQuestion: string;
  };
  sources: { id: string; title: string; url: string; role: 'PRIMARY' | 'SUPPORTING' }[];
  uncertaintyNotes: string[];
}

export type SpaceArtifact = ArtifactDefinition;

