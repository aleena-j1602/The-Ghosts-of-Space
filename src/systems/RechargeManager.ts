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
  private lastCollectedArtifactId: string | null = null;
  private moonRestIndex: number = 0;
  private marsRestIndex: number = 0;

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
    // 1. Apollo 11 Eagle Story: TRW Descent Engine, 1202 Alarms, LRRR Prisms & The Ballpoint Pen
    this.stories['apollo11_eagle'] = {
      artifactId: 'a11-lm5-descent',
      artifactName: 'Apollo 11 Eagle Descent Stage (Tranquility Base)',
      storyDialogue: [
        {
          id: 'eagle_story_1',
          speaker: 'PLAYER',
          text: "Phew... finally. Taking off this helmet is pure bliss. Looking at Eagle's descent stage out there on Tranquility Base still gives me goosebumps. That gold Kapton foil and the thruster skirt look completely untouched by time.",
        },
        {
          id: 'eagle_story_2',
          speaker: 'LUNA',
          text: "Untouched because there's no atmosphere to oxidize it, Explorer! But let's talk about that engine bell—the TRW Descent Propulsion System. Do you realize that was the very first deep-throttling rocket engine ever flown in crewed spaceflight?",
          lunaExpression: 'curious',
        },
        {
          id: 'eagle_story_3',
          speaker: 'PLAYER',
          text: "Because ordinary rocket engines back then could only fire at 100% thrust or shut down completely. A soft lunar landing required continuous, variable throttle.",
        },
        {
          id: 'eagle_story_4',
          speaker: 'LUNA',
          text: "Exactly! It burned hypergolic Aerozine-50 and nitrogen tetroxide through a variable pintle injector, allowing Neil to throttle continuously between 10% and 60% thrust, or blast up to 100% to hover and slide horizontally across the regolith like a 15-ton hummingbird!",
          lunaExpression: 'happy',
        },
        {
          id: 'eagle_story_5',
          speaker: 'PLAYER',
          text: "I noticed the 67-inch whisker probes still mounted beneath the footpads during our scan. Three of them, right?",
        },
        {
          id: 'eagle_story_6',
          speaker: 'LUNA',
          text: "Good eye! Only three out of four legs had probes. Engineers deliberately removed the probe from the forward leg under the ladder so it wouldn't bend upward on touchdown and impale an astronaut climbing down! When the other three probes touched the regolith, they completed a circuit that lit a blue bulb on the cockpit panel labeled 'LUNAR CONTACT'.",
          lunaExpression: 'witty',
        },
        {
          id: 'eagle_story_7',
          speaker: 'PLAYER',
          text: "Which prompted Buzz Aldrin's iconic callout: 'Contact light!' Right before Neil cut the engine.",
        },
        {
          id: 'eagle_story_8',
          speaker: 'LUNA',
          text: "And don't forget the heart-stopping descent drama! Sixty meters off the deck, the Apollo Guidance Computer threw 1202 and 1201 executive overload alarms because the rendezvous radar was flooding the CPU with interrupts. A 26-year-old controller in Houston named Steve Bales had seconds to call 'GO', while Neil looked out the triangular window and saw the autopilot was flying them straight into West Crater—a field of car-sized boulders!",
          lunaExpression: 'alert',
        },
        {
          id: 'eagle_story_9',
          speaker: 'PLAYER',
          text: "So Neil grabbed the attitude controller, took manual control, and surfed the rocket across the plain until they landed with less than twenty-five seconds of fuel remaining.",
        },
        {
          id: 'eagle_story_10',
          speaker: 'LUNA',
          text: "Ice in his veins! But wait, there's more: see that Laser Ranging Retroreflector (LRRR) we scanned nearby? A hundred quartz corner-cube prisms. Even right now, observatories in Texas and New Mexico fire green laser pulses at those exact prisms! Because the corner cubes bounce light straight back to Earth, scientists count returning photons to measure the Moon's distance to the millimeter—proving the Moon is drifting away from Earth at 3.8 centimeters every single year!",
          lunaExpression: 'happy',
        },
        {
          id: 'eagle_story_11',
          speaker: 'PLAYER',
          text: "And Buzz Aldrin famously saved the mission with an ordinary felt-tipped pen.",
        },
        {
          id: 'eagle_story_12',
          speaker: 'LUNA',
          text: "Yes! When squeezing into their spacesuits in the tiny cabin, his bulky backpack snapped the ascent engine arming circuit breaker off the panel! If they couldn't push it in, the ascent engine couldn't fire and they'd be stranded forever. Buzz jammed a plastic felt-tip pen into the breaker slot, closed the circuit, and blasted into orbit!",
          lunaExpression: 'witty',
        },
        {
          id: 'eagle_story_13',
          speaker: 'PLAYER',
          text: "From bleeding-edge rocket engineering to a plastic pen saving two lives. Truly unforgettable history.",
        },
        {
          id: 'eagle_story_14',
          speaker: 'LUNA',
          text: "That's human ingenuity for you, partner. Now hook up my charging umbilical—thermal scrubbers are purring, capacitors are at 100%, and habitat atmosphere is nominal. Rest easy, Explorer!",
          lunaExpression: 'happy',
        },
      ],
    };

    // 2. Apollo 15 Falcon Story: First Lunar Rover, Hadley Rille & The Genesis Rock
    this.stories['apollo15_falcon'] = {
      artifactId: 'a15-lm10-ascent',
      artifactName: 'Apollo 15 Falcon Ascent Stage & Hadley Plain',
      storyDialogue: [
        {
          id: 'falcon_story_1',
          speaker: 'PLAYER',
          text: "Ah, sweet cabin pressure. Gazing out toward the Hadley-Apennine mountains earlier was breathtaking. Mount Hadley towers over four thousand meters high, right beside the yawning chasm of Hadley Rille.",
        },
        {
          id: 'falcon_story_2',
          speaker: 'LUNA',
          text: "A genuine lunar canyon! Hadley Rille is a massive collapsed lava tube—one and a half kilometers wide, three hundred meters deep, carved by turbulent rivers of liquid basalt over three billion years ago. And Apollo 15 was the very first 'J-mission', bringing humanity's first set of extraterrestrial wheels: the Lunar Roving Vehicle!",
          lunaExpression: 'happy',
        },
        {
          id: 'falcon_story_3',
          speaker: 'PLAYER',
          text: "The LRV-1. The engineering on that little dune buggy was remarkable. Built by Boeing and Delco in just seventeen months.",
        },
        {
          id: 'falcon_story_4',
          speaker: 'LUNA',
          text: "And check out the specs: it weighed 210 kilograms on Earth, but in one-sixth gravity, only 35 kilograms! Two astronauts could literally lift the entire chassis with their bare hands! No inflated rubber tires either—rubber would either shatter in the freezing shade or melt in direct sunlight. Instead, the tires were woven out of zinc-coated steel piano wire mesh with titanium chevron treads riveted to the exterior!",
          lunaExpression: 'curious',
        },
        {
          id: 'falcon_story_5',
          speaker: 'PLAYER',
          text: "Driven by four independent quarter-horsepower electric motors, one sealed inside each wheel hub.",
        },
        {
          id: 'falcon_story_6',
          speaker: 'LUNA',
          text: "Powered by two 36-volt silver-zinc batteries, steered by a T-shaped center joystick! Top speed was only thirteen kilometers an hour, but Dave Scott and Jim Irwin logged 27.9 kilometers across the plains! In low gravity, hitting small bumps launched all four wire tires into the air, bouncing and sliding like a wild dune buggy on black ice!",
          lunaExpression: 'witty',
        },
        {
          id: 'falcon_story_7',
          speaker: 'PLAYER',
          text: "And near Spur Crater, they discovered Sample 15415—the famous Genesis Rock.",
        },
        {
          id: 'falcon_story_8',
          speaker: 'LUNA',
          text: "The Holy Grail of lunar geology! Dave Scott spotted a gleaming white rock perched on a pedestal of dark basalt. When they brought it back, spectrometry proved it was 98% pure anorthosite plagioclase feldspar, dated at 4.1 billion years old! It proved the 'Lunar Magma Ocean' hypothesis: that the young Moon was once entirely covered in a glowing ocean of molten rock, where lightweight feldspar floated to the surface to form the primordial crust!",
          lunaExpression: 'happy',
        },
        {
          id: 'falcon_story_9',
          speaker: 'PLAYER',
          text: "And Dave Scott performed Galileo's classic gravity demonstration right in front of the TV camera before liftoff.",
        },
        {
          id: 'falcon_story_10',
          speaker: 'LUNA',
          text: "The ultimate physics drop! In his right hand, a 1.3-kilogram aluminum geology hammer; in his left hand, a 30-gram peregrine falcon feather from the Air Force Academy mascot. In a pure vacuum with zero atmospheric drag, he released them both. Gravity accelerated both at exactly 1.62 m/s²—and they struck the lunar dust in simultaneous, perfect lockstep! Four hundred years of Newtonian physics confirmed on live television!",
          lunaExpression: 'curious',
        },
        {
          id: 'falcon_story_11',
          speaker: 'PLAYER',
          text: "And like Apollo 12, they crashed Falcon's ascent stage into the Moon after rendezvous to give the seismometers another reading.",
        },
        {
          id: 'falcon_story_12',
          speaker: 'LUNA',
          text: "Smacked the crust at 1.7 kilometers per second! The shockwaves were picked up by ALSEP stations at Apollo 12, 14, and 15 simultaneously, giving scientists a three-dimensional seismic map of the Moon's deep mantle. Pure rock-and-roll science! Batteries topped to 100%, life support purring. Rest those legs, Explorer—we did great today!",
          lunaExpression: 'happy',
        },
      ],
    };

    // 3. Apollo ALSEP Story: Lightning Strikes, Pinpoint Landing & The Moon Ringing Like a Bell
    this.stories['apollo_alsep'] = {
      artifactId: 'a12-lm6-ascent',
      artifactName: 'Apollo 12 Intrepid Ascent Stage & ALSEP',
      storyDialogue: [
        {
          id: 'alsep_story_1',
          speaker: 'PLAYER',
          text: "Taking off these boots feels amazing. Surveying the Apollo 12 Intrepid site and that ALSEP package was wild. Pete Conrad and Alan Bean must have been the most entertaining crew NASA ever launched.",
        },
        {
          id: 'alsep_story_2',
          speaker: 'LUNA',
          text: "Entertaining and practically indestructible! On November 14, 1969, their Saturn V was struck by lightning TWICE at 36 and 52 seconds into flight! The lightning bolt traveled straight down the ionized rocket exhaust plume into the launchpad, knocking all nine gyros offline and scrambling every cockpit telemetry screen into gibberish!",
          lunaExpression: 'alert',
        },
        {
          id: 'alsep_story_3',
          speaker: 'PLAYER',
          text: "And 24-year-old John Aaron in Mission Control uttered the most legendary tech-support line in human history: 'Flight, try SCE to AUX.'",
        },
        {
          id: 'alsep_story_4',
          speaker: 'LUNA',
          text: "Which literally nobody in the cockpit or command loop understood! It stood for 'Signal Conditioning Equipment to Auxiliary Power'. Alan Bean remembered where the toggle switch was by muscle memory, flipped it, restored the telemetry bus, and saved the entire Apollo 12 mission from an immediate abort!",
          lunaExpression: 'witty',
        },
        {
          id: 'alsep_story_5',
          speaker: 'PLAYER',
          text: "And then Conrad pulled off the first true pinpoint landing in spaceflight history.",
        },
        {
          id: 'alsep_story_6',
          speaker: 'LUNA',
          text: "Bullseye accuracy! Apollo 11 missed its target by four miles, so NASA dared Conrad to land right next to Surveyor 3—an uncrewed probe that had landed in Oceanus Procellarum two and a half years earlier. Conrad parked Intrepid just 160 meters away! They walked over, cut off Surveyor's TV camera and scoop with bolt cutters, and brought them back to Earth!",
          lunaExpression: 'happy',
        },
        {
          id: 'alsep_story_7',
          speaker: 'PLAYER',
          text: "And scientists in Houston found Streptococcus mitis bacteria inside the camera insulation that survived thirty-one months in the lunar vacuum.",
        },
        {
          id: 'alsep_story_8',
          speaker: 'LUNA',
          text: "Bacterial hitchhikers surviving hard vacuum, solar radiation, and 250-degree temperature swings! But look at the ALSEP station we investigated: powered by a SNAP-27 Radioisotope Thermoelectric Generator. Alan Bean had to extract the radioactive plutonium-238 capsule from its beryllium cask on the descent stage. But the capsule had expanded from its own 700°C decay heat and was jammed tight!",
          lunaExpression: 'curious',
        },
        {
          id: 'alsep_story_9',
          speaker: 'PLAYER',
          text: "So Alan Bean did what any frustrated mechanic does: he hit the nuclear cask with a geology hammer.",
        },
        {
          id: 'alsep_story_10',
          speaker: 'LUNA',
          text: "Whacked a glowing nuclear fuel rod with a hammer on the Moon until it popped free! Classic! And then, after Conrad and Bean safely docked with Yankee Clipper with 34 kilograms of lunar samples, mission control remotely fired Intrepid's empty ascent stage into a deliberate collision course with the surface at 6,000 kilometers per hour!",
          lunaExpression: 'happy',
        },
        {
          id: 'alsep_story_11',
          speaker: 'PLAYER',
          text: "Right into the lunar crust, 73 kilometers from their newly deployed ALSEP seismometer.",
        },
        {
          id: 'alsep_story_12',
          speaker: 'LUNA',
          text: "And the entire Moon rang like a cathedral bell for over 72 minutes! On Earth, water in the crust absorbs and dissipates seismic shockwaves within seconds. But the lunar crust is bone-dry, intensely fractured anorthositic rock—so seismic energy reverberates through the interior like a giant bronze gong!",
          lunaExpression: 'alert',
        },
        {
          id: 'alsep_story_13',
          speaker: 'PLAYER',
          text: "Conrad's first words on the surface always crack me up too: 'Whoopee, man! That may have been a small one for Neil, but that's a long one for me!'",
        },
        {
          id: 'alsep_story_14',
          speaker: 'LUNA',
          text: "At five-foot-six, Pete Conrad had style! Power cells locked at maximum charge, Explorer. Regolith filters flushed clean. Get some rest—tomorrow brings more adventures!",
          lunaExpression: 'witty',
        },
      ],
    };

    // 4. Mars Viking 1 Lander Story: The Search for Life, The Showerhead Engines & The Perchlorate Riddle
    this.stories['viking_1_lander'] = {
      artifactId: 'viking-1-lander',
      artifactName: 'Viking 1 Lander (Chryse Planitia)',
      storyDialogue: [
        {
          id: 'viking_story_1',
          speaker: 'PLAYER',
          text: "Phew... wiping that electrostatic Martian dust off my suit visor feels amazing. But standing next to Viking 1 out there on Chryse Planitia was surreal. That machine has been holding vigil on Mars since July 1976.",
        },
        {
          id: 'viking_story_2',
          speaker: 'LUNA',
          text: "July 20, 1976—exactly seven years to the day after Neil Armstrong took his small step on the Moon! Viking 1 plunged into the Martian atmosphere at sixteen thousand kilometers per hour, deployed a supersonic parachute, and touched down on three throttleable monopropellant hydrazine thrusters.",
          lunaExpression: 'happy',
        },
        {
          id: 'viking_story_3',
          speaker: 'PLAYER',
          text: "And each of those three thrusters had an 18-nozzle showerhead design to diffuse the exhaust.",
        },
        {
          id: 'viking_story_4',
          speaker: 'LUNA',
          text: "Sharp memory, Explorer! A single large rocket nozzle would have blasted a deep crater, melted subsurface permafrost, and scorched all the delicate organic compounds in the landing zone! The 18-nozzle showerhead design spread the thrust so gently that Viking touched down onto virgin regolith without disturbing the soil chemistry!",
          lunaExpression: 'witty',
        },
        {
          id: 'viking_story_5',
          speaker: 'PLAYER',
          text: "And then it deployed that motorized boom arm to collect soil for the automated biology laboratory.",
        },
        {
          id: 'viking_story_6',
          speaker: 'LUNA',
          text: "A masterpiece of micro-engineering! A 15-kilogram package containing three complete biochemical experiments: Gas Exchange, Pyrolytic Release, and the famous Labeled Release (LR). The LR instrument dropped soil into a test chamber, dripped a nutrient broth spiked with radioactive Carbon-14 onto it, and BAM—a massive plume of radioactive CO2 bubbled out instantly! The biology team in Pasadena literally jumped out of their chairs thinking they had found living Martian microbes!",
          lunaExpression: 'alert',
        },
        {
          id: 'viking_story_7',
          speaker: 'PLAYER',
          text: "Until the Gas Chromatograph-Mass Spectrometer (GCMS) threw cold water on the whole party.",
        },
        {
          id: 'viking_story_8',
          speaker: 'LUNA',
          text: "Total scientific heartbreak! The GCMS baked soil samples to 500°C to analyze organic molecules. It found ZERO organic compounds down to parts-per-billion—less organic carbon than sterile Antarctic snow! Without organic molecules, NASA concluded the gas release was just a non-biological chemical quirk.",
          lunaExpression: 'curious',
        },
        {
          id: 'viking_story_9',
          speaker: 'PLAYER',
          text: "Until the Phoenix lander uncovered perchlorates in the soil thirty years later.",
        },
        {
          id: 'viking_story_10',
          speaker: 'LUNA',
          text: "The ultimate cosmic plot twist! Martian soil is saturated with perchlorates (ClO4-). When you heat perchlorates to 500°C inside a closed GCMS oven, they break down into aggressive oxygen and chlorine gas, instantly incinerating any organic molecules into ash and carbon dioxide! The very instrument designed to detect life may have accidentally vaporized it!",
          lunaExpression: 'curious',
        },
        {
          id: 'viking_story_11',
          speaker: 'PLAYER',
          text: "And its seismometer spent six years measuring wind gusts because the uncaging pin stayed locked.",
        },
        {
          id: 'viking_story_12',
          speaker: 'LUNA',
          text: "The solar system's most expensive high-tech wind chime! But powered by two plutonium-238 SNAP-19 RTGs delivering 70 watts of electricity, Viking 1 survived 2,245 Martian sols—over six Earth years! It only fell silent in November 1982 when a human software patch from Earth accidentally overwrote the high-gain antenna tracking vectors.",
          lunaExpression: 'witty',
        },
        {
          id: 'viking_story_13',
          speaker: 'PLAYER',
          text: "A legendary sentinel on the Plains of Gold. Honored to have logged its telemetry into our archive.",
        },
        {
          id: 'viking_story_14',
          speaker: 'LUNA',
          text: "Habitat life support scrubbers stabilized, thermal loop locked at nominal 21°C, and batteries topped off to 100%. Rest well, partner—more Martian history awaits us tomorrow!",
          lunaExpression: 'happy',
        },
      ],
    };

    // 5. Mars Sojourner Rover Story: The Airbag Bounce, 8-Bit CPU & Rocker-Bogie Genius
    this.stories['sojourner'] = {
      artifactId: 'sojourner',
      artifactName: 'Mars Pathfinder & Sojourner Rover (Ares Vallis)',
      storyDialogue: [
        {
          id: 'sojourner_story_1',
          speaker: 'PLAYER',
          text: "Taking that pressure suit off is heaven. But seeing Sojourner resting beside the Pathfinder lander in Ares Vallis... it's shockingly tiny in person! Just 65 centimeters long and barely ten and a half kilograms.",
        },
        {
          id: 'sojourner_story_2',
          speaker: 'LUNA',
          text: "Twenty-three pounds of pure interplanetary swagger! On July 4, 1997, Mars Pathfinder didn't even bother entering orbit. It barreled straight into the Martian atmosphere at twenty-six thousand kilometers per hour! Heat shield, parachute, solid-rocket retro-thrusters, and then—giant Kevlar airbags!",
          lunaExpression: 'happy',
        },
        {
          id: 'sojourner_story_3',
          speaker: 'PLAYER',
          text: "A giant bouncing beachball on Mars. It bounced fifteen times, leaping fifteen meters high into the air, and rolled for over a kilometer across Ares Vallis before stopping.",
        },
        {
          id: 'sojourner_story_4',
          speaker: 'LUNA',
          text: "And then Pathfinder unfolded its three triangular solar panels like an origami lotus blossom, deflated the airbags, and deployed the ramps! On July 6, Sojourner rolled down the track and made history: the very first wheeled vehicle to drive on another planet!",
          lunaExpression: 'curious',
        },
        {
          id: 'sojourner_story_5',
          speaker: 'PLAYER',
          text: "And what was the onboard brain running this revolutionary explorer?",
        },
        {
          id: 'sojourner_story_6',
          speaker: 'LUNA',
          text: "Prepare to laugh: a single 8-bit radiation-hardened Intel 80C85 processor running at 100 kilohertz with just 512 kilobytes of memory! That's right—a pocket calculator has more raw computing power than the rover that conquered Mars! And its solar array produced only sixteen watts of electricity—barely enough to light up a refrigerator bulb!",
          lunaExpression: 'witty',
        },
        {
          id: 'sojourner_story_7',
          speaker: 'PLAYER',
          text: "Yet it featured the legendary Rocker-Bogie suspension system that NASA still uses on Curiosity and Perseverance today.",
        },
        {
          id: 'sojourner_story_8',
          speaker: 'LUNA',
          text: "Mechanical perfection! Six cleated aluminum wheels, each with its own drive motor, connected by a differential rocker-bogie linkage with zero springs! It could climb over a fifteen-centimeter boulder—larger than the wheels themselves—without tilting the chassis or losing traction on loose Martian sand!",
          lunaExpression: 'happy',
        },
        {
          id: 'sojourner_story_9',
          speaker: 'PLAYER',
          text: "And the science team named every rock in the landing site after cartoon characters.",
        },
        {
          id: 'sojourner_story_10',
          speaker: 'LUNA',
          text: "'Barnacle Bill', 'Yogi', 'Scooby Doo', 'Casper', and 'Wedge'! Sojourner wheeled up to Barnacle Bill, deployed its Alpha Proton X-Ray Spectrometer (APXS), and found it was rich in silica andesite—proving volcanic processes on Mars were far more differentiated than anyone predicted! Meanwhile, the rounded rocks around Yogi showed that Ares Vallis was carved by monumental catastrophic floods billions of years ago!",
          lunaExpression: 'alert',
        },
        {
          id: 'sojourner_story_11',
          speaker: 'PLAYER',
          text: "Designed for a seven-sol mission, it ended up driving for eighty-three sols until the lander's silver-zinc battery finally died from the freezing cold.",
        },
        {
          id: 'sojourner_story_12',
          speaker: 'LUNA',
          text: "It took 550 photos, analyzed 16 chemical targets, and proved that mobile rovers were the future of planetary exploration! Life support scrubbers nominal, power cells at 100%. Rest those legs, Explorer—we're walking in the footsteps of giants!",
          lunaExpression: 'happy',
        },
      ],
    };

    // 6. Mars Spirit Rover Story: Mountaineering on Husband Hill & The Dragged Wheel That Found Ancient Hot Springs
    this.stories['spirit'] = {
      artifactId: 'spirit',
      artifactName: 'Mars Exploration Rover Spirit (MER-A, Gusev Crater)',
      storyDialogue: [
        {
          id: 'spirit_story_1',
          speaker: 'PLAYER',
          text: "Unlatching that helmet after trekking across Gusev Crater feels magnificent. But seeing Spirit (MER-A) resting there... that rover was a true planetary warrior.",
        },
        {
          id: 'spirit_story_2',
          speaker: 'LUNA',
          text: "Six years of pure robotic resilience! Spirit landed on January 4, 2004, inside Gusev Crater—a 166-kilometer impact basin where orbital maps showed an ancient river valley, Ma'adim Vallis, carving right through the rim. Scientists expected to find a serene dry lakebed of clay and sediments.",
          lunaExpression: 'curious',
        },
        {
          id: 'spirit_story_3',
          speaker: 'PLAYER',
          text: "Instead, the crater floor was covered entirely in rough, jagged volcanic basalt.",
        },
        {
          id: 'spirit_story_4',
          speaker: 'LUNA',
          text: "No lake sediments in sight! Any ordinary mission might have called it a bust. But Spirit was a 185-kilogram robotic field geologist standing 1.5 meters tall, equipped with a Pancam mast, Mini-TES infrared spectrometer, and an instrument arm carrying Mössbauer and APXS spectrometers alongside the diamond-tipped Rock Abrasion Tool (RAT)!",
          lunaExpression: 'happy',
        },
        {
          id: 'spirit_story_5',
          speaker: 'PLAYER',
          text: "The RAT spinning at 3,000 RPM, grinding five millimeters deep into rocks like 'Humphrey' and 'Adirondack' to expose pristine minerals.",
        },
        {
          id: 'spirit_story_6',
          speaker: 'LUNA',
          text: "And when the plains offered only basalt, the rover drivers pointed Spirit toward the Columbia Hills three kilometers away! Spirit became the first machine to summit a mountain on another world, climbing 106 vertical meters up Husband Hill—named in honor of Columbia Commander Rick Husband. From the peak, it beamed back that glorious 360-degree panorama of the entire crater floor!",
          lunaExpression: 'alert',
        },
        {
          id: 'spirit_story_7',
          speaker: 'PLAYER',
          text: "And then on Sol 779, disaster struck: the right-front drive motor seized up completely.",
        },
        {
          id: 'spirit_story_8',
          speaker: 'LUNA',
          text: "Frozen solid! The wheel couldn't rotate. So JPL engineers came up with a brilliant hack: they put Spirit in reverse and drove backwards everywhere, dragging the dead right-front wheel through the soil like an anchor!",
          lunaExpression: 'witty',
        },
        {
          id: 'spirit_story_9',
          speaker: 'PLAYER',
          text: "And that dragged wheel led to the greatest discovery of the entire mission.",
        },
        {
          id: 'spirit_story_10',
          speaker: 'LUNA',
          text: "The ultimate serendipity of science! In 2007, near an ancient volcanic plateau called Home Plate, that dragging wheel sliced open the red crust and churned up brilliant snow-white powder! When Spirit scanned it, the powder was over 90% pure opaline silica (SiO2)! On Earth, pure amorphous silica ONLY deposits in boiling volcanic fumaroles, geysers, or acid-sulfate hydrothermal hot springs!",
          lunaExpression: 'happy',
        },
        {
          id: 'spirit_story_11',
          speaker: 'PLAYER',
          text: "Unquestionable evidence of ancient bubbling hot springs on Mars—the ideal cradle for microbial life.",
        },
        {
          id: 'spirit_story_12',
          speaker: 'LUNA',
          text: "A broken wheel unlocked the ancient habitable history of Mars! And whenever Martian dust choked its solar panels down to critical levels, swirling dust devils would march right across Spirit's deck and give it a free cosmic vacuuming, restoring power back to 90%!",
          lunaExpression: 'curious',
        },
        {
          id: 'spirit_story_13',
          speaker: 'PLAYER',
          text: "Until it broke through the crust at Troy in May 2009 and got trapped in soft iron-sulfate sands, operating as a stationary observatory until the harsh winter of Sol 2210.",
        },
        {
          id: 'spirit_story_14',
          speaker: 'LUNA',
          text: "Designed for 90 sols, it survived 2,210 sols and drove over 7.7 kilometers! A testament to human engineering and relentless exploration. Habitat life-support fully stabilized, power banks at 100%. Rest well, partner—you've earned it!",
          lunaExpression: 'witty',
        },
      ],
    };

    // 7. Deep Space: NEAR Shoemaker Story: Landing an Orbiter on Asteroid 433 Eros
    this.stories['near_shoemaker'] = {
      artifactId: 'near-shoemaker',
      artifactName: 'NEAR Shoemaker (Asteroid 433 Eros)',
      storyDialogue: [
        {
          id: 'near_story_1',
          speaker: 'PLAYER',
          text: "Reviewing the deep-space telemetry on NEAR Shoemaker... this mission feels like pure science-fiction audacity.",
        },
        {
          id: 'near_story_2',
          speaker: 'LUNA',
          text: "First spacecraft ever to orbit an asteroid! It reached 433 Eros—a 34-kilometer tumbling peanut of ancient rock—on Valentine's Day in the year 2000! And for an entire year, it mapped every crater, ridge, and boulder from orbit.",
          lunaExpression: 'happy',
        },
        {
          id: 'near_story_3',
          speaker: 'PLAYER',
          text: "And then on February 12, 2001, NASA controllers decided to do something that was never in the flight manual: land an orbiter with zero landing gear.",
        },
        {
          id: 'near_story_4',
          speaker: 'LUNA',
          text: "Zero landing legs! Zero shock absorbers! They pulsed its hydrazine thrusters against Eros's microscopic gravity—where surface gravity is less than one-thousandth of Earth's! It touched down at a gentle 1.8 meters per second on the southern edge of Himeros saddle and survived completely intact!",
          lunaExpression: 'alert',
        },
        {
          id: 'near_story_5',
          speaker: 'PLAYER',
          text: "And it continued transmitting science data straight from the surface of the asteroid for two whole weeks.",
        },
        {
          id: 'near_story_6',
          speaker: 'LUNA',
          text: "Its gamma-ray spectrometer gave scientists the first in-situ elemental composition of an ancient near-Earth asteroid. A spacecraft designed only to orbit ended up resting on the surface of another world for eternity. Telemetry archived, Explorer!",
          lunaExpression: 'witty',
        },
      ],
    };

    // 8. Deep Space: Dawn Spacecraft Story: The Ion Engine Odyssey of Vesta & Ceres
    this.stories['dawn_spacecraft'] = {
      artifactId: 'nasa-dawn-spacecraft',
      artifactName: 'Dawn Spacecraft (Vesta & Ceres)',
      storyDialogue: [
        {
          id: 'dawn_story_1',
          speaker: 'PLAYER',
          text: "Looking through Dawn's ion propulsion flight logs. Firing thrusters continuously for over fifty thousand hours... that's almost six years of continuous acceleration.",
        },
        {
          id: 'dawn_story_2',
          speaker: 'LUNA',
          text: "Three NSTAR electrostatic xenon ion thrusters! They accelerated xenon ions with a 1,000-volt electric field to over thirty kilometers per second! Using just 425 kilograms of xenon propellant, Dawn achieved a velocity change of 11.5 kilometers per second—a feat impossible with chemical rockets!",
          lunaExpression: 'happy',
        },
        {
          id: 'dawn_story_3',
          speaker: 'PLAYER',
          text: "Which made Dawn the first and only spacecraft in history to orbit TWO separate extraterrestrial bodies.",
        },
        {
          id: 'dawn_story_4',
          speaker: 'LUNA',
          text: "First it orbited protoplanet 4 Vesta, discovering the colossal Rheasilvia impact mountain—over twenty-two kilometers high, more than double the height of Mount Everest! And then it spiraled out of orbit and flew to dwarf planet Ceres!",
          lunaExpression: 'curious',
        },
        {
          id: 'dawn_story_5',
          speaker: 'PLAYER',
          text: "Where it revealed the glowing bright spots of sodium carbonate inside Occator Crater and the four-kilometer ice cryovolcano Ahuna Mons.",
        },
        {
          id: 'dawn_story_6',
          speaker: 'LUNA',
          text: "Proving that dwarf planets in the asteroid belt can harbor active subsurface brines and ice volcanism! When its reaction control hydrazine finally ran out in 2018, Dawn silently entered a permanent, stable orbit around Ceres—protected forever as a celestial monument.",
          lunaExpression: 'happy',
        },
      ],
    };

    // 9. Deep Space: Pioneer 10 Story: The Plaque, The Asteroid Belt & The Interstellar Void
    this.stories['pioneer_10'] = {
      artifactId: 'pioneer-10',
      artifactName: 'Pioneer 10 (Deep Space Probe)',
      storyDialogue: [
        {
          id: 'pioneer_story_1',
          speaker: 'PLAYER',
          text: "Logging Pioneer 10's final telemetry packet received back in January 2003... twelve billion kilometers from Earth. That faint eight-watt whisper took over eleven hours just to reach NASA's Deep Space Network.",
        },
        {
          id: 'pioneer_story_2',
          speaker: 'LUNA',
          text: "Launched in March 1972 on an Atlas-Centaur rocket! Pioneer 10 was the supreme pioneer of the outer solar system. It was the very first spacecraft to ever traverse the asteroid belt—proving it wasn't an impassable storm of tumbling boulders, but mostly peaceful empty space!",
          lunaExpression: 'happy',
        },
        {
          id: 'pioneer_story_3',
          speaker: 'PLAYER',
          text: "And in December 1973, it braved the ferocious radiation belts of Jupiter.",
        },
        {
          id: 'pioneer_story_4',
          speaker: 'LUNA',
          text: "Jupiter's magnetic field battered Pioneer 10 with radiation ten thousand times stronger than Earth's Van Allen belts! It almost fried the photopolarimeter, but Pioneer survived, sending back humanity's first close-up images of the Great Red Spot!",
          lunaExpression: 'alert',
        },
        {
          id: 'pioneer_story_5',
          speaker: 'PLAYER',
          text: "And it carries the iconic gold-anodized aluminum plaque designed by Carl Sagan and Frank Drake.",
        },
        {
          id: 'pioneer_story_6',
          speaker: 'LUNA',
          text: "A greeting card to the cosmos! Showing the hyperfine transition of neutral hydrogen, a map of the Sun relative to fourteen pulsars, and two human figures waving hello. In 1983, it crossed the orbit of Neptune into the interstellar void. It's now coasting silently toward the red giant star Aldebaran, where it will arrive in two million years. What a grand journey!",
          lunaExpression: 'witty',
        },
      ],
    };
  }

  public setLastCollectedArtifact(artifactId: string): void {
    this.lastCollectedArtifactId = artifactId;
  }

  public getLastCollectedArtifact(): string | null {
    return this.lastCollectedArtifactId;
  }

  public getNextStoryToTell(): RechargeStory | null {
    // 1. If an artifact was specifically just collected, prioritize its debrief story
    if (this.lastCollectedArtifactId) {
      for (const story of Object.values(this.stories)) {
        if (
          (story.artifactId === this.lastCollectedArtifactId ||
            story.artifactId.toLowerCase().includes(this.lastCollectedArtifactId.toLowerCase()) ||
            this.lastCollectedArtifactId.toLowerCase().includes(story.artifactId.toLowerCase())) &&
          !this.toldStoryIds.has(story.artifactId)
        ) {
          return story;
        }
      }
    }

    // 2. Check any collected artifact in ARTIFACTS_DATA that hasn't had its bedtime story told yet
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
    if (this.lastCollectedArtifactId === artifactId) {
      this.lastCollectedArtifactId = null;
    }
  }

  /**
   * Returns varied resting & sleeping dialogues for mid-mission rests, low-energy recharges,
   * or sleep cycles when no specific new artifact was collected.
   */
  public getDefaultRechargeDialogue(): DialogueLine[] {
    const gs = GameState.getInstance();
    const isMars = gs.currentLevel === 'MARS' || gs.currentLevel === (GameState as unknown as { GameLevel: { MARS: string } }).GameLevel?.MARS;

    if (isMars) {
      const marsDialogues: DialogueLine[][] = [
        // Mars Rest 1: Heavy Quads & Phobos Flyby
        [
          {
            id: 'mars_rest1_1',
            speaker: 'PLAYER',
            text: "Man, taking that helmet off after trekking across Chryse Planitia is pure bliss. My quads are still adjusting to thirty-eight percent gravity.",
          },
          {
            id: 'mars_rest1_2',
            speaker: 'LUNA',
            text: "I told you that 38% gravity would feel heavier than the Moon! No more effortless 10-foot kangaroo hops, partner. And this iron oxide dust is clingy—good thing the habitat air shower neutralized the static charge.",
            lunaExpression: 'witty',
          },
          {
            id: 'mars_rest1_3',
            speaker: 'PLAYER',
            text: "Look out the observation viewport. Phobos is already cresting the horizon.",
          },
          {
            id: 'mars_rest1_4',
            speaker: 'LUNA',
            text: "Orbits Mars in just seven hours and thirty-nine minutes! Rises in the west and sets in the east twice a Martian day. Talk about a speedy potato in the sky!",
            lunaExpression: 'happy',
          },
          {
            id: 'mars_rest1_5',
            speaker: 'PLAYER',
            text: `Outside temperature is dropping to minus seventy Celsius. Glad the thermal generators are purring.`,
          },
          {
            id: 'mars_rest1_6',
            speaker: 'LUNA',
            text: "Cozy inside, barren outside. All suit and companion capacitors replenished to one hundred percent! Rest up, Explorer—more Martian history tomorrow!",
            lunaExpression: 'happy',
          },
        ],

        // Mars Rest 2: Dust Devils Buffeting the Hull & Rehydrated Stew
        [
          {
            id: 'mars_rest2_1',
            speaker: 'PLAYER',
            text: "Listen to that wind buffeting the titanium hull. It sounds like an endless whistle out there on the red plain.",
          },
          {
            id: 'mars_rest2_2',
            speaker: 'LUNA',
            text: "That's Martian atmosphere for you! Even at only one percent of Earth's atmospheric pressure, high-speed gusts can kick up towering dust devils kilometers high. Spirit and Opportunity used to get scrubbed clean by them!",
            lunaExpression: 'curious',
          },
          {
            id: 'mars_rest2_3',
            speaker: 'PLAYER',
            text: "I'll trade a dust storm for hot rehydrated beef stew in the cabin any day. My suit seals are free of grit.",
          },
          {
            id: 'mars_rest2_4',
            speaker: 'LUNA',
            text: "Oxygen scrubbers recalibrated and battery banks humming at maximum capacity. Sleep while the red dust swirls, partner. Tomorrow we make more tracks across the dunes!",
            lunaExpression: 'happy',
          },
        ],

        // Mars Rest 3: Blue Martian Sunsets & Memories of Earth
        [
          {
            id: 'mars_rest3_1',
            speaker: 'PLAYER',
            text: "Look at the western horizon through the reinforced glass... the sunset is glowing blue.",
          },
          {
            id: 'mars_rest3_2',
            speaker: 'LUNA',
            text: "Breathtaking, isn't it? On Earth, sunsets are orange and red because the atmosphere scatters blue light. But on Mars, fine airborne magnetite dust scatters the red wavelengths, leaving an ethereal blue halo around the sun!",
            lunaExpression: 'happy',
          },
          {
            id: 'mars_rest3_3',
            speaker: 'PLAYER',
            text: "A blue sun on a red world. Makes you appreciate just how far from home we really are.",
          },
          {
            id: 'mars_rest3_4',
            speaker: 'LUNA',
            text: "Far from home, but preserving its greatest legacy. Life-support is locked at nominal, power cells are 100% full. Close your eyes, Explorer. Sleep well under the red stars.",
            lunaExpression: 'witty',
          },
        ],
      ];

      const dialogue = marsDialogues[this.marsRestIndex % marsDialogues.length];
      this.marsRestIndex += 1;
      return dialogue;
    }

    // Moon sleep & resting dialogues
    const moonDialogues: DialogueLine[][] = [
      // Moon Rest 1: Burnt Gunpowder & Lunar Dust
      [
        {
          id: 'moon_rest1_1',
          speaker: 'PLAYER',
          text: "Phew... taking off that pressure helmet is the single best feeling in the solar system. My neck muscles were staging an armed rebellion.",
        },
        {
          id: 'moon_rest1_2',
          speaker: 'LUNA',
          text: "I'll say! Did you know Apollo astronauts complained that lunar dust smelled like burnt gunpowder and barbecue ashes? Harrison Schmitt on Apollo 17 sneezed through his entire sleep shift!",
          lunaExpression: 'witty',
        },
        {
          id: 'moon_rest1_3',
          speaker: 'PLAYER',
          text: "Thankfully our habitat scrubbers are running clean. How are your sensor batteries holding up?",
        },
        {
          id: 'moon_rest1_4',
          speaker: 'LUNA',
          text: "Coupled to the dock and purring happily! Topped off to one hundred percent. And take a look out that viewport window, Explorer—Earth looks like a radiant sapphire suspended in velvet.",
          lunaExpression: 'happy',
        },
        {
          id: 'moon_rest1_5',
          speaker: 'PLAYER',
          text: `Not a bad view to fall asleep to. We survived Mission Day ${gs.missionDay}.`,
        },
        {
          id: 'moon_rest1_6',
          speaker: 'LUNA',
          text: "Survived? We crushed it, partner! Get some sleep. Tomorrow, more cosmic secrets await!",
          lunaExpression: 'witty',
        },
      ],

      // Moon Rest 2: Sleeping Strapped to Vertical Walls in 1/6 Gravity
      [
        {
          id: 'moon_rest2_1',
          speaker: 'PLAYER',
          text: "Strap me into the vertical sleep hammock, Luna. In one-sixth gravity, if you don't tether your sleeping bag, you end up floating into the circuit breakers at 3 AM.",
        },
        {
          id: 'moon_rest2_2',
          speaker: 'LUNA',
          text: "Haha! Gene Cernan and Jack Schmitt used to tie themselves to the bulkhead with velcro straps! Jack said the weirdest sensation was waking up in the pitch dark having zero idea which way was 'up'!",
          lunaExpression: 'happy',
        },
        {
          id: 'moon_rest2_3',
          speaker: 'PLAYER',
          text: "In the Sea of Tranquility, 'up' is wherever Earth happens to be hanging in the black sky.",
        },
        {
          id: 'moon_rest2_4',
          speaker: 'LUNA',
          text: "And Earth is right above us, glowing bright and steady. Bunk restraints locked, telemetry synced, batteries at one hundred percent. Rest those legs, Explorer—tomorrow's a big day!",
          lunaExpression: 'witty',
        },
      ],

      // Moon Rest 3: Hull Thermal Pops & Apollo Ghosts
      [
        {
          id: 'moon_rest3_1',
          speaker: 'PLAYER',
          text: "Did you hear that faint metallic tick in the bulkhead? Sounds like the cabin is settling.",
        },
        {
          id: 'moon_rest3_2',
          speaker: 'LUNA',
          text: "That's just thermal expansion! When the shadow line creeps across the regolith, temperature swings from 120°C in direct sunlight down to minus 130°C in shadow! The aluminum alloys creak like an old sailing ship.",
          lunaExpression: 'curious',
        },
        {
          id: 'moon_rest3_3',
          speaker: 'PLAYER',
          text: "A sailing ship anchored on a silent ocean of ancient gray dust.",
        },
        {
          id: 'moon_rest3_4',
          speaker: 'LUNA',
          text: "Poetic, Explorer! But don't get sentimental—our internal atmospheric heaters are rock-solid, capacitors are topped to maximum, and the archive is secure. Close your eyes and recharge your own battery. Goodnight!",
          lunaExpression: 'happy',
        },
      ],
    ];

    const dialogue = moonDialogues[this.moonRestIndex % moonDialogues.length];
    this.moonRestIndex += 1;
    return dialogue;
  }
}
