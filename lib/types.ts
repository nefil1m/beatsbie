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
  NORMAL = 'NORMAL',
  ACCENT = 'ACCENT',
  GHOST = 'GHOST',
  OPEN = 'OPEN',
  BELL = 'BELL',
}

export type DrumKit = {
  [key in Drum]?: {
    [key in HitType]?: string;
  };
};

export type ID = string;

export type Pointer = ID;

export type Metre = [number, number];

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
