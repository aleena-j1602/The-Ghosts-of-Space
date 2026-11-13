import { GameState } from '../core/GameState.ts';
import { ARTIFACTS_DATA } from '../data/artifacts.ts';
import { DialogueLine } from '../data/dialogue.ts';

export interface RechargeStory {
  artifactId: string;
  artifactName: string;
  storyDialogue: DialogueLine[];
}

export class RechargeManager {
  private static instance: RechargeManager;
  private stories: Record<string, RechargeStory> = {};
  private toldStoryIds: Set<string> = new Set();

  private constructor() {
    this.initStories();
  }

  public static getInstance(): RechargeManager {
    if (!RechargeManager.instance) {
      RechargeManager.instance = new RechargeManager();
    }
    return RechargeManager.instance;
  }

  private initStories(): void {
    // 1. Apollo 11 Eagle Story: 1202 Alarm & The Low Fuel Touchdown
    this.stories['apollo11_eagle'] = {
      artifactId: 'apollo11_eagle',
      artifactName: 'Apollo 11 Eagle Descent Stage',
      storyDialogue: [
        {
          id: 'eagle_story_1',
          speaker: 'LUNA',
          text: "Did you know that during the final descent of the Eagle, the guidance computer started flashing 1202 and 1201 alarm codes?",
          lunaExpression: 'curious',
        },
        {
          id: 'eagle_story_2',
          speaker: 'PLAYER',
          text: "What did those alarms mean?",
        },
        {
          id: 'eagle_story_3',
          speaker: 'LUNA',
          text: "The computer's memory was being overloaded by radar pulses! Back in Houston, 26-year-old flight controller Steve Bales had seconds to decide whether to abort.",
          lunaExpression: 'alert',
        },
        {
          id: 'eagle_story_4',
          speaker: 'PLAYER',
          text: "And Armstrong kept flying manually?",
        },
        {
          id: 'eagle_story_5',
          speaker: 'LUNA',
          text: "Exactly. The autopilot was taking them directly into a crater filled with boulders the size of cars. Neil took semi-manual control, flew past it, and touched down with only 25 seconds of fuel left!",
          lunaExpression: 'happy',
        },
        {
          id: 'eagle_story_6',
          speaker: 'PLAYER',
          text: "Incredible calm under pressure.",
        },
        {
          id: 'eagle_story_7',
          speaker: 'LUNA',
          text: "Indeed. And that descent stage you just scanned held the foundation of that entire moment. My battery feels fully rejuvenated just thinking about it!",
          lunaExpression: 'witty',
        },
      ],
    };

    // 2. Apollo Lunar Rover Story: The Duct Tape Fender Fix
    this.stories['apollo_rover'] = {
      artifactId: 'apollo_rover',
      artifactName: 'Apollo Lunar Roving Vehicle',
      storyDialogue: [
        {
          id: 'rover_story_1',
          speaker: 'LUNA',
          text: "I love the Lunar Rover! But did you know that on Apollo 17, Gene Cernan accidentally sheared off one of the rear fenders with a geology hammer?",
          lunaExpression: 'curious',
        },
        {
          id: 'rover_story_2',
          speaker: 'PLAYER',
          text: "A broken fender on the Moon? Was that dangerous?",
        },
        {
          id: 'rover_story_3',
          speaker: 'LUNA',
          text: "Extremely! In 1/6th gravity, the mesh tires hurled gigantic 'rooster tails' of abrasive, black lunar dust over the astronauts and solar radiators. The batteries were rapidly overheating.",
          lunaExpression: 'alert',
        },
        {
          id: 'rover_story_4',
          speaker: 'PLAYER',
          text: "How did they fix it without a garage?",
        },
        {
          id: 'rover_story_5',
          speaker: 'LUNA',
          text: "With humanity's greatest invention: gray duct tape! Engineers in Houston stayed up all night and radioed a design using four laminated map sheets taped together and clamped onto the fender.",
          lunaExpression: 'happy',
        },
        {
          id: 'rover_story_6',
          speaker: 'PLAYER',
          text: "Four paper maps and tape saved a multi-million dollar rover.",
        },
        {
          id: 'rover_story_7',
          speaker: 'LUNA',
          text: "Proof that good old-fashioned ingenuity is just as vital as rocket science. Next time you repair my sensors, remember: I accept high-grade duct tape!",
          lunaExpression: 'witty',
        },
      ],
    };

    // 3. Apollo ALSEP Story: The Moon Ringing Like a Bell
    this.stories['apollo_alsep'] = {
      artifactId: 'apollo_alsep',
      artifactName: 'ALSEP Scientific Package',
      storyDialogue: [
        {
          id: 'alsep_story_1',
          speaker: 'LUNA',
          text: "When the Apollo 12 crew deployed their ALSEP seismometer, NASA conducted a rather dramatic scientific test.",
          lunaExpression: 'curious',
        },
        {
          id: 'alsep_story_2',
          speaker: 'PLAYER',
          text: "What kind of test?",
        },
        {
          id: 'alsep_story_3',
          speaker: 'LUNA',
          text: "After the astronauts rejoined the command module, they fired the ascent stage's engine to deliberately crash it back onto the Moon at 6,000 km/h!",
          lunaExpression: 'alert',
        },
        {
          id: 'alsep_story_4',
          speaker: 'PLAYER',
          text: "To measure the seismic shockwave?",
        },
        {
          id: 'alsep_story_5',
          speaker: 'LUNA',
          text: "Yes! And the ALSEP seismometer detected that the Moon reverberated and 'rang like a bell' for over an hour!",
          lunaExpression: 'happy',
        },
        {
          id: 'alsep_story_6',
          speaker: 'PLAYER',
          text: "Why did it ring for so long?",
        },
        {
          id: 'alsep_story_7',
          speaker: 'LUNA',
          text: "Because unlike Earth, the Moon has no water inside its crust to dampen seismic energy. It proved the lunar interior is dry, fractured, and ancient.",
          lunaExpression: 'neutral',
        },
      ],
    };
  }

  public getNextStoryToTell(): RechargeStory | null {
    // Find a collected artifact that hasn't had its bedtime recharge story told yet
    for (const [artId, story] of Object.entries(this.stories)) {
      const art = ARTIFACTS_DATA[artId];
      if (art?.isCollected && !this.toldStoryIds.has(artId)) {
        return story;
      }
    }
    return null;
  }

  public markStoryTold(artifactId: string): void {
    this.toldStoryIds.add(artifactId);
  }

  public getDefaultRechargeDialogue(): DialogueLine[] {
    const gs = GameState.getInstance();
    return [
      {
        id: 'default_recharge_1',
        speaker: 'LUNA',
        text: `Charging dock connected! All diagnostics nominal. We survived exploration Day ${gs.missionDay}.`,
        lunaExpression: 'happy',
      },
      {
        id: 'default_recharge_2',
        speaker: 'PLAYER',
        text: "Let's rest our systems and review our coordinates for tomorrow.",
      },
      {
        id: 'default_recharge_3',
        speaker: 'LUNA',
        text: "Agreed. Rest well, Explorer. Our next discovery awaits at sunrise!",
        lunaExpression: 'witty',
      },
    ];
  }
}
