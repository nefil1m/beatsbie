import { Drum, DrumKit, HitType } from './types';

const MetalDrumKit: DrumKit = {
  [Drum.SNARE]: {
    [HitType.NORMAL]: './audio/drumKits/metal/snare.wav',
  },
  [Drum.HI_HAT]: {
    [HitType.NORMAL]: './audio/drumKits/metal/closed-hi-hat.wav',
  },
  [Drum.CRASH1]: {
    [HitType.NORMAL]: './audio/drumKits/metal/crash.wav',
  },
  [Drum.KICK1]: {
    [HitType.NORMAL]: './audio/drumKits/metal/kick.wav',
  },
  [Drum.TOM1]: {
    [HitType.NORMAL]: './audio/drumKits/metal/tom.wav',
  },
};

export { MetalDrumKit };
