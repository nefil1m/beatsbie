import { Drum, HitType, hitTypesByDrum } from './types';

export const getNextHitType = (drum: Drum, hitType: HitType) => {
  const hitTypesForDrum = hitTypesByDrum[drum];
  const index = hitTypesForDrum.findIndex((type) => type === hitType);

  return hitTypesForDrum[(index + 1) % hitTypesForDrum.length];
};
