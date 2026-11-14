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
          speaker: 'PLAYER',
          text: "Phew... finally. Taking off that helmet is pure bliss. My lumbar spine was about to file a formal union grievance from all that bunny-hopping.",
        },
        {
          id: 'eagle_story_2',
          speaker: 'LUNA',
          text: "Oh, stop whining, Explorer! You only walked three hundred meters in one-sixth gravity. Armstrong and Aldrin didn't even have seats in the Eagle—they literally stood upright for the entire four-day flight and touchdown!",
          lunaExpression: 'witty',
        },
        {
          id: 'eagle_story_3',
          speaker: 'PLAYER',
          text: "Wait, zero seats? You're telling me they flew all the way to the Moon on their feet?",
        },
        {
          id: 'eagle_story_4',
          speaker: 'LUNA',
          text: "Zero seats! Weight reduction. Just velcro shoe-soles, hand cables, and sheer nerve. And right when they were sixty meters off the deck, the Apollo guidance computer had a total memory panic—flashing 1202 and 1201 overload alarms!",
          lunaExpression: 'alert',
        },
        {
          id: 'eagle_story_5',
          speaker: 'PLAYER',
          text: "Because the rendezvous radar was spamming it with CPU cycles while it was trying to calculate landing thrusters, right?",
        },
        {
          id: 'eagle_story_6',
          speaker: 'LUNA',
          text: "Bullseye! A 26-year-old kid in Houston named Steve Bales had about fifteen seconds to decide whether to abort or keep going. And Neil? He looked out the triangular window, saw the autopilot was steering them right into a crater of car-sized boulders, grabbed the stick, and manual-surfed the rocket across the plain until they landed with literally twenty seconds of fuel left!",
          lunaExpression: 'happy',
        },
        {
          id: 'eagle_story_7',
          speaker: 'PLAYER',
          text: "Twenty seconds of fuel between legendary immortality and a giant explosion.",
        },
        {
          id: 'eagle_story_8',
          speaker: 'LUNA',
          text: "Ice in his veins! Then he calmly keyed the mic: 'Houston, Tranquility Base here. The Eagle has landed.' Meanwhile, you almost dropped your scanner earlier because a stray pebble looked at you funny.",
          lunaExpression: 'witty',
        },
        {
          id: 'eagle_story_9',
          speaker: 'PLAYER',
          text: "Hey! That pebble was an unexpected topographic hazard.",
        },
        {
          id: 'eagle_story_10',
          speaker: 'LUNA',
          text: "Whatever you say, partner. Connecting my charging coupling now... mmm, that sweet 240-volt habitat current. Life support restored. Good work out there today.",
          lunaExpression: 'happy',
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
          speaker: 'PLAYER',
          text: "I'm still looking at the telemetry from that Lunar Rover. How did that electric dune buggy not flip end-over-end every two minutes?",
        },
        {
          id: 'falcon_story_2',
          speaker: 'LUNA',
          text: "Who says it didn't try? Top speed was only thirteen kilometers an hour, but in one-sixth gravity, hitting a tiny lunar mound launched all four wire-mesh tires into the vacuum like an off-road kangaroo! Gene Cernan said driving it was like wrestling a bucking shopping cart across black ice.",
          lunaExpression: 'witty',
        },
        {
          id: 'falcon_story_3',
          speaker: 'PLAYER',
          text: "And Commander Dave Scott performed Galileo's gravity experiment right beside Falcon, didn't he?",
        },
        {
          id: 'falcon_story_4',
          speaker: 'LUNA',
          text: "The greatest physics flex in human history! In front of a live worldwide TV audience, he held an aluminum geology hammer in his right hand and a falcon feather in his left. Dropped them together into the vacuum. No air resistance, identical gravity—they hit the dust in absolute unison!",
          lunaExpression: 'happy',
        },
        {
          id: 'falcon_story_5',
          speaker: 'PLAYER',
          text: "Four hundred years after Galileo dropped cannonballs from the Tower of Pisa.",
        },
        {
          id: 'falcon_story_6',
          speaker: 'LUNA',
          text: "Scott said: 'How about that, Mr. Galileo was correct in his findings.' Galileo was probably doing backflips in the afterlife. And after liftoff, they deliberately crashed Falcon's ascent stage too, just to give the seismic instruments an acoustic encore!",
          lunaExpression: 'curious',
        },
        {
          id: 'falcon_story_7',
          speaker: 'PLAYER',
          text: "Those Apollo crews really loved smashing rockets into the Moon for science.",
        },
        {
          id: 'falcon_story_8',
          speaker: 'LUNA',
          text: "Can you blame them? Pure rock 'n' roll physics. Close your eyes and let the cabin heaters toast your bones, Explorer. We've got more history to uncover tomorrow.",
          lunaExpression: 'happy',
        },
      ],
    };

    // 3. Apollo ALSEP Story: The Moon Ringing Like a Bell
    this.stories['apollo_alsep'] = {
      artifactId: 'a12-lm6-ascent',
      artifactName: 'Apollo 12 Intrepid Ascent Stage & ALSEP',
      storyDialogue: [
        {
          id: 'alsep_story_1',
          speaker: 'PLAYER',
          text: "Explain to me again why Pete Conrad and Alan Bean decided to deliberately smash their own rocket into the lunar surface?",
        },
        {
          id: 'alsep_story_2',
          speaker: 'LUNA',
          text: "Because Apollo 12 was basically the cosmic MythBusters of 1969! First of all, their Saturn V was struck by lightning TWICE right off the launchpad. Pete Conrad was in the cockpit giggling while every master alarm lit up like a Christmas tree.",
          lunaExpression: 'witty',
        },
        {
          id: 'alsep_story_3',
          speaker: 'PLAYER',
          text: "John Aaron in Mission Control saved the mission with the legendary 'Try SCE to AUX'.",
        },
        {
          id: 'alsep_story_4',
          speaker: 'LUNA',
          text: "Which literally nobody remembered where that switch was! Alan Bean flipped it by muscle memory, rebooted telemetry, and they made it to the Moon. But after deploying the ALSEP seismometer, NASA had an itch. They remotely fired the ascent engine and slammed the empty stage into the ground at six thousand km/h!",
          lunaExpression: 'alert',
        },
        {
          id: 'alsep_story_5',
          speaker: 'PLAYER',
          text: "High-velocity seismic testing.",
        },
        {
          id: 'alsep_story_6',
          speaker: 'LUNA',
          text: "And the Moon rang like a giant bronze cathedral bell for over an hour! The scientists in Houston thought the chart recorder needles were broken. Turns out, with zero water inside the lunar crust to dampen shockwaves, seismic energy bounces around like a cosmic gong!",
          lunaExpression: 'happy',
        },
        {
          id: 'alsep_story_7',
          speaker: 'PLAYER',
          text: "A giant gong made of ancient basalt.",
        },
        {
          id: 'alsep_story_8',
          speaker: 'LUNA',
          text: "Conrad even yelled when he stepped out: 'Whoopee, man! That may have been a small one for Neil, but that's a long one for me!' You gotta love an astronaut who laughs in the face of the void.",
          lunaExpression: 'curious',
        },
        {
          id: 'alsep_story_9',
          speaker: 'PLAYER',
          text: "I'll try laughing next time my thrusters cough.",
        },
        {
          id: 'alsep_story_10',
          speaker: 'LUNA',
          text: "Please don't. My warranty does not cover panic-induced giggling. Batteries at one hundred percent, Explorer. Rest well!",
          lunaExpression: 'witty',
        },
      ],
    };

    // 4. Mars Viking 1 Lander Story: The Search for Life & The Billion-Dollar Wind Chime
    this.stories['viking_1_lander'] = {
      artifactId: 'viking-1-lander',
      artifactName: 'Viking 1 Lander (Chryse Planitia)',
      storyDialogue: [
        {
          id: 'viking_story_1',
          speaker: 'PLAYER',
          text: "I can still feel that electrostatic red grit in the suit seals. But seeing Viking 1 resting out there on Chryse Planitia... that machine touched down in 1976.",
        },
        {
          id: 'viking_story_2',
          speaker: 'LUNA',
          text: "July 20, 1976! Exactly seven years to the day after Apollo 11 landed on the Moon. And Viking 1 came equipped with a miniature automated biology lab to answer humanity's biggest question: Is anyone home?",
          lunaExpression: 'happy',
        },
        {
          id: 'viking_story_3',
          speaker: 'PLAYER',
          text: "And the Labeled Release experiment gave a positive metabolic gas burst the instant nutrient broth touched the soil.",
        },
        {
          id: 'viking_story_4',
          speaker: 'LUNA',
          text: "Radioactive carbon-14 gas bubbled straight up! For about forty-eight glorious hours, the biology team thought they'd found Martian microbes throwing an all-you-can-eat feast.",
          lunaExpression: 'alert',
        },
        {
          id: 'viking_story_5',
          speaker: 'PLAYER',
          text: "Until the gas chromatograph found zero organic molecules in the substrate.",
        },
        {
          id: 'viking_story_6',
          speaker: 'LUNA',
          text: "Total scientific whiplash! Martian soil is rich in hyper-reactive perchlorates and peroxides that chemically mimic biological respiration when exposed to moisture. But wait—did you examine its seismometer?",
          lunaExpression: 'witty',
        },
        {
          id: 'viking_story_7',
          speaker: 'PLAYER',
          text: "The one that failed to uncage its sensor pins?",
        },
        {
          id: 'viking_story_8',
          speaker: 'LUNA',
          text: "The locking pin stayed stuck! The most advanced earthquake detector on Mars spent six years measuring... wind gusts vibrating the lander body! The universe's most expensive high-tech wind chime!",
          lunaExpression: 'curious',
        },
        {
          id: 'viking_story_9',
          speaker: 'PLAYER',
          text: "A multi-billion dollar wind chime that survived six Martian years.",
        },
        {
          id: 'viking_story_10',
          speaker: 'LUNA',
          text: "Built like a titanium fortress. Life support scrubbers are humming smoothly, Explorer. Get some rest—we've got more of the Red Planet to explore tomorrow!",
          lunaExpression: 'happy',
        },
      ],
    };

    // 5. Mars Sojourner Rover Story: The Microwave-Sized Pioneer
    this.stories['sojourner'] = {
      artifactId: 'sojourner',
      artifactName: 'Mars Pathfinder & Sojourner Rover',
      storyDialogue: [
        {
          id: 'sojourner_story_1',
          speaker: 'PLAYER',
          text: "Sojourner is so tiny up close! It's literally the size of a microwave oven on six roller-skate wheels.",
        },
        {
          id: 'sojourner_story_2',
          speaker: 'LUNA',
          text: "Twenty-three pounds of pure rebellious genius! Back in 1997, critics called it a glorified remote-controlled toy that would get stuck on the first pebble. But JPL gave it the legendary rocker-bogie suspension system!",
          lunaExpression: 'happy',
        },
        {
          id: 'sojourner_story_3',
          speaker: 'PLAYER',
          text: "Climbing over obstacles bigger than its own wheels without flipping.",
        },
        {
          id: 'sojourner_story_4',
          speaker: 'LUNA',
          text: "Exactly! And the JPL team named every single rock in Ares Vallis after cartoon characters! 'Barnacle Bill', 'Yogi', 'Scooby Doo', 'Casper', and 'Wedge'! Sojourner rolled up to Barnacle Bill and gently booped it with its APXS spectrometer like a curious puppy.",
          lunaExpression: 'witty',
        },
        {
          id: 'sojourner_story_5',
          speaker: 'PLAYER',
          text: "And mission controllers only expected it to survive for seven sols.",
        },
        {
          id: 'sojourner_story_6',
          speaker: 'LUNA',
          text: "Seven days! And that spunky little rover kept wheeling through the dust for eighty-three sols until the Pathfinder lander battery finally succumbed to the freezing Martian nights. It paved the way for every rover that followed!",
          lunaExpression: 'happy',
        },
        {
          id: 'sojourner_story_7',
          speaker: 'PLAYER',
          text: "The ancestor of Spirit, Opportunity, Curiosity, and Perseverance.",
        },
        {
          id: 'sojourner_story_8',
          speaker: 'LUNA',
          text: "The great-grandparent of interplanetary roving! Batteries coupled and topped off to one hundred percent, partner. Rest those boots—we've got more tracks to make!",
          lunaExpression: 'witty',
        },
      ],
    };

    // 6. Mars Spirit Rover Story: The Broken Wheel That Discovered Ancient Water
    this.stories['spirit'] = {
      artifactId: 'spirit',
      artifactName: 'Mars Exploration Rover Spirit (MER-A)',
      storyDialogue: [
        {
          id: 'spirit_story_1',
          speaker: 'PLAYER',
          text: "Seeing Spirit in Gusev Crater felt like saluting a veteran warrior who refused to surrender.",
        },
        {
          id: 'spirit_story_2',
          speaker: 'LUNA',
          text: "Six years of sheer Martian grit! Spirit touched down in January 2004 for a 90-sol mission, drove seven kilometers, climbed the Columbia Hills summit, and survived three brutal Martian winters!",
          lunaExpression: 'happy',
        },
        {
          id: 'spirit_story_3',
          speaker: 'PLAYER',
          text: "And in 2006, its right-front wheel motor locked up completely.",
        },
        {
          id: 'spirit_story_4',
          speaker: 'LUNA',
          text: "Any ordinary robot would have thrown in the towel. But the rover drivers at JPL simply put Spirit in reverse and drove backwards, dragging that stuck wheel like a peg-leg pirate!",
          lunaExpression: 'witty',
        },
        {
          id: 'spirit_story_5',
          speaker: 'PLAYER',
          text: "And that dragged wheel carved the ground open and uncovered bright white silica.",
        },
        {
          id: 'spirit_story_6',
          speaker: 'LUNA',
          text: "Ninety percent pure silica deposits! On Earth, you ONLY get silica like that in hydrothermal hot springs or volcanic fumaroles! A broken wheel did the most profound geology discovery in Mars history!",
          lunaExpression: 'alert',
        },
        {
          id: 'spirit_story_7',
          speaker: 'PLAYER',
          text: "Proof that ancient Mars had bubbly, warm hydrothermal water where life could thrive.",
        },
        {
          id: 'spirit_story_8',
          speaker: 'LUNA',
          text: "And whenever Martian dust threatened to suffocate its solar panels, local dust devils would whip right across the deck and give it a free cosmic car wash! Nature helping out our little robotic pioneer.",
          lunaExpression: 'happy',
        },
        {
          id: 'spirit_story_9',
          speaker: 'PLAYER',
          text: "A truly legendary machine.",
        },
        {
          id: 'spirit_story_10',
          speaker: 'LUNA',
          text: "Remember that lesson, Explorer: even when things break, keep pushing forward—you might just discover something historic. Habitat life support fully stabilized. Rest well!",
          lunaExpression: 'witty',
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

    if (gs.currentLevel === 'MARS' || gs.currentLevel === (GameState as unknown as { GameLevel: { MARS: string } }).GameLevel?.MARS) {
      return [
        {
          id: 'default_mars_recharge_1',
          speaker: 'PLAYER',
          text: "Man, taking that helmet off after trekking across Chryse Planitia is unbelievable. My quads are adjusting to thirty-eight percent gravity.",
        },
        {
          id: 'default_mars_recharge_2',
          speaker: 'LUNA',
          text: "I told you that 38% gravity would feel heavier than the Moon! No more effortless kangaroo hops, partner. And this iron oxide dust is clingy—good thing the habitat air shower neutralized the static charge.",
          lunaExpression: 'witty',
        },
        {
          id: 'default_mars_recharge_3',
          speaker: 'PLAYER',
          text: "Look out the observation viewport. Phobos is already cresting the horizon.",
        },
        {
          id: 'default_mars_recharge_4',
          speaker: 'LUNA',
          text: "Orbits Mars in just seven hours and thirty-nine minutes! Rises in the west and sets in the east twice a Martian day. Talk about a speedy potato in the sky!",
          lunaExpression: 'happy',
        },
        {
          id: 'default_mars_recharge_5',
          speaker: 'PLAYER',
          text: `Outside temperature is dropping to minus seventy Celsius. Glad the thermal generators are purring.`,
        },
        {
          id: 'default_mars_recharge_6',
          speaker: 'LUNA',
          text: "Cozy inside, barren outside. All suit and companion capacitors replenished to one hundred percent! Rest up, Explorer—more Martian history tomorrow!",
          lunaExpression: 'happy',
        },
      ];
    }

    return [
      {
        id: 'default_recharge_1',
        speaker: 'PLAYER',
        text: "Phew... taking off that pressure helmet is the single best feeling in the solar system. My neck muscles were staging an armed rebellion.",
      },
      {
        id: 'default_recharge_2',
        speaker: 'LUNA',
        text: "I'll say! Did you know Apollo astronauts complained that lunar dust smelled like burnt gunpowder and barbecue ashes? Harrison Schmitt on Apollo 17 sneezed through his entire sleep shift!",
        lunaExpression: 'witty',
      },
      {
        id: 'default_recharge_3',
        speaker: 'PLAYER',
        text: "Thankfully our habitat scrubbers are running clean. How are your sensor batteries holding up?",
      },
      {
        id: 'default_recharge_4',
        speaker: 'LUNA',
        text: "Coupled to the dock and purring happily! Topped off to one hundred percent. And take a look out that viewport window, Explorer—Earth looks like a radiant sapphire suspended in velvet.",
        lunaExpression: 'happy',
      },
      {
        id: 'default_recharge_5',
        speaker: 'PLAYER',
        text: `Not a bad view to fall asleep to. We survived Mission Day ${gs.missionDay}.`,
      },
      {
        id: 'default_recharge_6',
        speaker: 'LUNA',
        text: "Survived? We crushed it, partner! Get some sleep. Tomorrow, more cosmic secrets await!",
        lunaExpression: 'witty',
      },
    ];
  }
}
