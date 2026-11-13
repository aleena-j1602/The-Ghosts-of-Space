export interface DialogueLine {
  id: string;
  speaker: 'LUNA' | 'PLAYER' | 'SYSTEM' | 'EARTH CONTROL';
  text: string;
  lunaExpression?: 'neutral' | 'happy' | 'witty' | 'curious' | 'alert';
  delayMs?: number;
}

export const OPENING_DIALOGUE: DialogueLine[] = [
  {
    id: 'intro_1',
    speaker: 'LUNA',
    text: "Good morning, Explorer! You're finally awake.",
    lunaExpression: 'happy',
  },
  {
    id: 'intro_2',
    speaker: 'PLAYER',
    text: "How long was I asleep?",
    lunaExpression: 'neutral',
  },
  {
    id: 'intro_3',
    speaker: 'LUNA',
    text: "Long enough for me to finish three battery diagnostics. And long enough for you to miss the most beautiful view of Earth.",
    lunaExpression: 'witty',
  },
  {
    id: 'intro_4',
    speaker: 'PLAYER',
    text: "So, where are we headed?",
    lunaExpression: 'neutral',
  },
  {
    id: 'intro_5',
    speaker: 'LUNA',
    text: "The Moon! Our first assignment is to recover three forgotten space artifacts. I've already downloaded their last known coordinates.",
    lunaExpression: 'curious',
  },
  {
    id: 'intro_6',
    speaker: 'PLAYER',
    text: "Sounds easy.",
    lunaExpression: 'neutral',
  },
  {
    id: 'intro_7',
    speaker: 'LUNA',
    text: "You said that about assembling my charging dock. We both remember how that ended.",
    lunaExpression: 'witty',
  },
  {
    id: 'intro_8',
    speaker: 'PLAYER',
    text: "Okay, I'll try not to disappoint you this time.",
    lunaExpression: 'neutral',
  },
  {
    id: 'intro_9',
    speaker: 'LUNA',
    text: "That's the spirit! Ready to make history?",
    lunaExpression: 'happy',
  },
];
