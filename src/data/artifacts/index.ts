// ---------------------------------------------------------------------------
// ghosts-of-space/src/data/artifacts/index.ts
// ---------------------------------------------------------------------------

import type { ArtifactDefinition } from '../artifacts/Core/artifactTypes.ts';

// ---------------------------------------------------------------------------
// MOON
// ---------------------------------------------------------------------------

import { A12_LM6_ASCENT } from './moon/apollo11_ALSEP';
import { A11_LM5_DESCENT } from './moon/apollo11_eagle';
import { A15_LM10_ASCENT } from './moon/apollo15_lunar';

// ---------------------------------------------------------------------------
// MARS
// ---------------------------------------------------------------------------

import { SPIRIT } from './mars/mars-exploration-rovers';
import { SOJOURNER } from './mars/sojourner';
import { VIKING_1_LANDER } from './mars/Viking1';

// ---------------------------------------------------------------------------
// DEEP SPACE
// ---------------------------------------------------------------------------

import { DAWN_SPACECRAFT } from './deep-space/dawn-spacecraft';
import { NEAR_SHOEMAKER } from './deep-space/near-shoemaker';
import { PIONEER_10 } from './deep-space/pioneer-10';

// ---------------------------------------------------------------------------
// ARTIFACT REGISTRY
// ---------------------------------------------------------------------------

export const ARTIFACTS_DATA: Record<string, ArtifactDefinition> = {
  [A12_LM6_ASCENT.id]: A12_LM6_ASCENT,
  [A11_LM5_DESCENT.id]: A11_LM5_DESCENT,
  [A15_LM10_ASCENT.id]: A15_LM10_ASCENT,

  [SPIRIT.id]: SPIRIT,
  [SOJOURNER.id]: SOJOURNER,
  [VIKING_1_LANDER.id]: VIKING_1_LANDER,

  [DAWN_SPACECRAFT.id]: DAWN_SPACECRAFT,
  [NEAR_SHOEMAKER.id]: NEAR_SHOEMAKER,
  [PIONEER_10.id]: PIONEER_10,
};

export * from './artifactImageMap.ts';
