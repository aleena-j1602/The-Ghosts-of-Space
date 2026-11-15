// ---------------------------------------------------------------------------
// ghosts-of-space/src/data/artifacts/artifactImageMap.ts
// Centralized mapping and resolver for artifact photography & technical diagrams
// ---------------------------------------------------------------------------

import type { ArtifactDefinition } from './Core/artifactTypes.ts';

export interface ArtifactPreviewMedia {
  baseName: string;
  actualImage: string;
  technicalDiagram: string | null;
  displayName: string;
  agency?: string;
  technicalNotes?: string;
}

/**
 * Resolve public asset path with support for both local dev and production base paths.
 */
function resolveAssetPath(path: string): string {
  const metaEnv = (import.meta as unknown as { env?: { BASE_URL?: string } })?.env;
  const base = metaEnv?.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Canonical registry keyed by the TypeScript artifact filename base name.
 * Image files in public/image/ strictly follow:
 * - Actual photograph: /image/<baseName>.<ext>
 * - Technical diagram: /image/<baseName>_diagram.<ext>
 */
export const ARTIFACT_PREVIEW_REGISTRY: Record<string, ArtifactPreviewMedia> = {
  // Moon artifacts
  apollo11_eagle: {
    baseName: 'apollo11_eagle',
    actualImage: resolveAssetPath('/image/apollo11_eagle.jpg'),
    technicalDiagram: resolveAssetPath('/image/apollo11_eagle_diagram.gif'),
    displayName: 'Apollo 11 Eagle Lunar Module',
    agency: 'NASA',
    technicalNotes: 'Descent Stage & Modular Equipment Stowage Assembly (MESA)',
  },
  apollo11_ALSEP: {
    baseName: 'apollo11_ALSEP',
    actualImage: resolveAssetPath('/image/apollo11_ALSEP.jpg'),
    technicalDiagram: resolveAssetPath('/image/apollo11_ALSEP_diagram.gif'),
    displayName: 'Apollo 12 Intrepid Ascent Stage / ALSEP',
    agency: 'NASA',
    technicalNotes: 'Apollo Lunar Surface Experiments Package (ALSEP) & Ascent Stage',
  },
  apollo15_lunar: {
    baseName: 'apollo15_lunar',
    actualImage: resolveAssetPath('/image/apollo15_lunar.jpg'),
    technicalDiagram: resolveAssetPath('/image/apollo15_lunar_diagram.gif'),
    displayName: 'Apollo 15 Falcon Lunar Module / LRV',
    agency: 'NASA',
    technicalNotes: 'Extended J-mission LM-10 Hardware & Lunar Roving Vehicle',
  },

  // Mars artifacts
  Viking1: {
    baseName: 'Viking1',
    actualImage: resolveAssetPath('/image/Viking1.jpg'),
    technicalDiagram: resolveAssetPath('/image/Viking1_diagram.jpeg'),
    displayName: 'Viking 1 Lander',
    agency: 'NASA',
    technicalNotes: 'Surface Meteorology & Gas Chromatograph-Mass Spectrometer (GCMS)',
  },
  sojourner: {
    baseName: 'sojourner',
    actualImage: resolveAssetPath('/image/sojourner.jpg'),
    technicalDiagram: null,
    displayName: 'Mars Pathfinder / Sojourner Rover',
    agency: 'NASA',
    technicalNotes: 'Alpha Proton X-Ray Spectrometer (APXS) & Microrover Chassis',
  },
  'mars-exploration-rovers': {
    baseName: 'mars-exploration-rovers',
    actualImage: resolveAssetPath('/image/mars-exploration-rovers.jpeg'),
    technicalDiagram: null,
    displayName: 'Mars Exploration Rover (Spirit / Opportunity)',
    agency: 'NASA',
    technicalNotes: 'Pancam Mast Assembly & Rock Abrasion Tool (RAT)',
  },

  // Deep Space probes
  'dawn-spacecraft': {
    baseName: 'dawn-spacecraft',
    actualImage: resolveAssetPath('/image/dawn-spacecraft.png'),
    technicalDiagram: null,
    displayName: 'Dawn Spacecraft',
    agency: 'NASA',
    technicalNotes: 'Xenon Ion Propulsion System & Framing Camera Array',
  },
  'near-shoemaker': {
    baseName: 'near-shoemaker',
    actualImage: resolveAssetPath('/image/near-shoemaker.jpg'),
    technicalDiagram: null,
    displayName: 'NEAR Shoemaker Spacecraft',
    agency: 'NASA',
    technicalNotes: 'Near Earth Asteroid Rendezvous Multispectral Imager & Magnetometer',
  },
  'pioneer-10': {
    baseName: 'pioneer-10',
    actualImage: resolveAssetPath('/image/pioneer-10.webp'),
    technicalDiagram: null,
    displayName: 'Pioneer 10 Deep Space Probe',
    agency: 'NASA',
    technicalNotes: '2.74-meter High Gain Parabolic Dish & Pictorial Plaque',
  },
};

/**
 * Mapping of artifact IDs and common aliases to the TypeScript file base name.
 */
const ID_TO_BASENAME_MAP: Record<string, string> = {
  // Moon IDs
  'a11-lm5-descent': 'apollo11_eagle',
  'apollo11-eagle': 'apollo11_eagle',
  'apollo-11-eagle': 'apollo11_eagle',
  'apollo11_eagle': 'apollo11_eagle',

  'a12-lm6-ascent': 'apollo11_ALSEP',
  'apollo12-alsep': 'apollo11_ALSEP',
  'apollo11-alsep': 'apollo11_ALSEP',
  'apollo11_alsep': 'apollo11_ALSEP',
  'apollo11_ALSEP': 'apollo11_ALSEP',

  'a15-lm10-ascent': 'apollo15_lunar',
  'apollo15-lrv': 'apollo15_lunar',
  'apollo15-lunar': 'apollo15_lunar',
  'apollo15_lunar': 'apollo15_lunar',

  // Mars IDs
  'viking-1-lander': 'Viking1',
  'viking-1': 'Viking1',
  'viking1': 'Viking1',
  'Viking1': 'Viking1',

  'sojourner': 'sojourner',
  'sojourner-rover': 'sojourner',

  'spirit': 'mars-exploration-rovers',
  'opportunity': 'mars-exploration-rovers',
  'spirit-rover': 'mars-exploration-rovers',
  'mars-exploration-rovers': 'mars-exploration-rovers',

  // Deep Space IDs
  'nasa-dawn-spacecraft': 'dawn-spacecraft',
  'dawn-spacecraft': 'dawn-spacecraft',
  'dawn': 'dawn-spacecraft',

  'near-shoemaker': 'near-shoemaker',

  'pioneer-10': 'pioneer-10',
};

/**
 * Dynamic resolver to retrieve the preview media for any artifact.
 * Uses the artifact's TypeScript filename, ID, or aliases to return corresponding images.
 */
export function getArtifactPreviewMedia(
  artifact: ArtifactDefinition | string | null | undefined
): ArtifactPreviewMedia | null {
  if (!artifact) return null;

  // Handle direct string lookup (by baseName or ID)
  if (typeof artifact === 'string') {
    if (ARTIFACT_PREVIEW_REGISTRY[artifact]) {
      return ARTIFACT_PREVIEW_REGISTRY[artifact];
    }
    const baseKey = ID_TO_BASENAME_MAP[artifact] || ID_TO_BASENAME_MAP[artifact.toLowerCase()];
    if (baseKey && ARTIFACT_PREVIEW_REGISTRY[baseKey]) {
      return ARTIFACT_PREVIEW_REGISTRY[baseKey];
    }
    return null;
  }

  // 1. Direct lookup by TypeScript sourceFileName if present
  if (artifact.sourceFileName && ARTIFACT_PREVIEW_REGISTRY[artifact.sourceFileName]) {
    return ARTIFACT_PREVIEW_REGISTRY[artifact.sourceFileName];
  }

  // 2. Direct lookup by artifact.id
  if (artifact.id) {
    const baseFromId = ID_TO_BASENAME_MAP[artifact.id] || ID_TO_BASENAME_MAP[artifact.id.toLowerCase()];
    if (baseFromId && ARTIFACT_PREVIEW_REGISTRY[baseFromId]) {
      return ARTIFACT_PREVIEW_REGISTRY[baseFromId];
    }
    if (ARTIFACT_PREVIEW_REGISTRY[artifact.id]) {
      return ARTIFACT_PREVIEW_REGISTRY[artifact.id];
    }
  }

  // 3. Search aliases or common names
  const candidateKeys = [
    artifact.commonName,
    artifact.officialName,
    ...(artifact.aliases || []),
  ].map((s) => s.toLowerCase());

  for (const [key, media] of Object.entries(ARTIFACT_PREVIEW_REGISTRY)) {
    const k = key.toLowerCase();
    if (candidateKeys.some((term) => term.includes(k) || k.includes(term))) {
      return media;
    }
  }

  return null;
}
