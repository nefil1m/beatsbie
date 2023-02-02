export enum Drum {
  HI_HAT = 'HI_HAT',
  SNARE = 'SNARE',
  TOM1 = 'TOM1',
  TOM2 = 'TOM2',
  FLOOR1 = 'FLOOR1',
  KICK1 = 'KICK1',
  KICK2 = 'KICK2',
  CRASH1 = 'CRASH1',
  CRASH2 = 'CRASH2',
  RIDE = 'RIDE',
  // HI_HAT_FOOT = 'HI_HAT_FOOT',
  // SPLASH = 'SPLASH',
  // CHINA = 'CHINA',
  // COWBELL = 'COWBELL',
}

export enum HitType {
  GHOST = 'GHOST',
  NORMAL = 'NORMAL',
  ACCENT = 'ACCENT',
  OPEN = 'OPEN',
  BELL = 'BELL',
  BUZZ = 'BUZZ',
  FLAM = 'FLAM',
  CROSS_STICK = 'CROSS_STICK',
}

export type DrumKit = {
  [key in Drum]?: {
    [key in HitType]?: string;
  };
};

export const hitTypesByDrum = {
  [Drum.SNARE]: [HitType.NORMAL, HitType.GHOST, HitType.ACCENT, HitType.CROSS_STICK],
  [Drum.HI_HAT]: [HitType.NORMAL, HitType.GHOST, HitType.OPEN, HitType.ACCENT],
  [Drum.CRASH1]: [HitType.NORMAL],
  [Drum.CRASH2]: [HitType.NORMAL],
  [Drum.KICK1]: [HitType.NORMAL],
  [Drum.KICK2]: [HitType.NORMAL],
  [Drum.TOM1]: [HitType.NORMAL, HitType.ACCENT],
  [Drum.TOM2]: [HitType.NORMAL, HitType.ACCENT],
  [Drum.FLOOR1]: [HitType.NORMAL, HitType.ACCENT],
  [Drum.RIDE]: [HitType.NORMAL, HitType.BELL],
};

export type ID = string;

export type Pointer = ID;

export type MetrePulse = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MetreBase = 4 | 8 | 16;

export type Metre = [MetrePulse, MetreBase];

export type BeatDivision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Collection<T> = Record<ID, T>;

export enum MetronomeSound {
  BASIC = 'BASIC',
  ONE = 'ONE',
}

export type Metronome = {
  [MetronomeSound.BASIC]: string;
  [MetronomeSound.ONE]: string;
};
