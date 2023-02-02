import { Drum, DrumKit, HitType } from './types';

const MetalDrumKit: DrumKit = {
  [Drum.SNARE]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/snare.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/snare.wav',
    [HitType.GHOST]: '/audio/drumKits/metal/snare.wav',
    [HitType.CROSS_STICK]: '/audio/drumKits/metal/cross-stick-snare.wav',
  },
  [Drum.HI_HAT]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/closed-hi-hat.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/closed-hi-hat.wav',
    [HitType.GHOST]: '/audio/drumKits/metal/closed-hi-hat.wav',
    [HitType.OPEN]: '/audio/drumKits/metal/open-hi-hat.wav',
  },
  [Drum.CRASH1]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/crash-1.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/crash-1.wav',
  },
  [Drum.CRASH2]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/crash-2.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/crash-2.wav',
  },
  [Drum.KICK1]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/kick.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/kick.wav',
  },
  [Drum.KICK2]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/kick.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/kick.wav',
  },
  [Drum.TOM1]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/tom-1.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/tom-1.wav',
  },
  [Drum.TOM2]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/tom-2.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/tom-2.wav',
  },
  [Drum.FLOOR1]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/floor-1.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/floor-1.wav',
  },
  [Drum.RIDE]: {
    [HitType.NORMAL]: '/audio/drumKits/metal/ride.wav',
    [HitType.ACCENT]: '/audio/drumKits/metal/ride.wav',
    [HitType.BELL]: '/audio/drumKits/metal/bell-ride.wav',
  },
};

export { MetalDrumKit };
