import { Drum, DrumKit, HitType } from './types';

const MetalDrumKit: DrumKit = {
  [Drum.SNARE]: {
    [HitType.NORMAL]: './audio/drumkits/metal/snare.wav'
  },
  [Drum.HI_HAT]: {
    [HitType.NORMAL]: './audio/drumkits/metal/closed-hi-hat.wav'
  },
  [Drum.CRASH1]: {
    [HitType.NORMAL]: './audio/drumkits/metal/crash.wav'
  },
  [Drum.KICK1]: {
    [HitType.NORMAL]: './audio/drumkits/metal/kick.wav'
  },
  [Drum.TOM1]: {
    [HitType.NORMAL]: './audio/drumkits/metal/tom.wav'
  }
};

export {
  MetalDrumKit,
};