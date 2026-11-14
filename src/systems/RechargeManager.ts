import { GameState } from '../core/GameState.ts';
import { ARTIFACTS_DATA } from '../data/artifacts/index.ts';
import type { DialogueLine } from '../data/dialogue.ts';

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
      artifactId: 'a11-lm5-descent',
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

    // 2. Apollo 15 Falcon & Hadley Plain: First Rover & Galileo Experiment
    this.stories['apollo15_falcon'] = {
      artifactId: 'a15-lm10-ascent',
      artifactName: 'Apollo 15 Falcon Ascent Stage & Hadley Plain',
      storyDialogue: [
        {
          id: 'falcon_story_1',
          speaker: 'LUNA',
          text: "You know, Apollo 15's Falcon didn't just land at Hadley Rille—it brought the very first Lunar Roving Vehicle to another world!",
          lunaExpression: 'curious',
        },
        {
          id: 'falcon_story_2',
          speaker: 'PLAYER',
          text: "And didn't Commander Scott perform a famous physics demonstration there?",
        },
        {
          id: 'falcon_story_3',
          speaker: 'LUNA',
          text: "He did! In front of the television camera, Dave Scott held up a 1.3-kilogram geology hammer and a 30-gram falcon feather.",
          lunaExpression: 'alert',
        },
        {
          id: 'falcon_story_4',
          speaker: 'PLAYER',
          text: "Testing Galileo Galilei's law of falling bodies from 400 years earlier.",
        },
        {
          id: 'falcon_story_5',
          speaker: 'LUNA',
          text: "Precisely! In the lunar vacuum with zero air resistance, he released them both. They accelerated identically and struck the regolith at the exact same fraction of a second!",
          lunaExpression: 'happy',
        },
        {
          id: 'falcon_story_6',
          speaker: 'PLAYER',
          text: "'Mr. Galileo was correct in his findings.'",
        },
        {
          id: 'falcon_story_7',
          speaker: 'LUNA',
          text: "Pure poetry. And after liftoff, they deliberately impacted Falcon's ascent stage into the Moon to provide seismic shockwaves for ALSEP stations. Truly dedicated science!",
          lunaExpression: 'witty',
        },
      ],
    };

    // 3. Apollo ALSEP Story: The Moon Ringing Like a Bell
    this.stories['apollo_alsep'] = {
      artifactId: 'a12-lm6-ascent',
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
    for (const story of Object.values(this.stories)) {
      const artId = story.artifactId;
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
