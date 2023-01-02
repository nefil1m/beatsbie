enum Drum {
  HI_HAT = 'HI_HAT',
  HI_HAT_FOOT = 'HI_HAT_FOOT',
  SNARE = 'SNARE',
  TOM1 = 'TOM1',
  TOM2 = 'TOM2',
  FLOOR1 = 'FLOOR1',
  KICK1 = 'KICK1',
  KICK2 = 'KICK2',
  CRASH1 = 'CRASH1',
  CRASH2 = 'CRASH2',
  RIDE = 'RIDE',
  SPLASH = 'SPLASH',
  CHINA = 'CHINA',
  COWBELL = 'COWBELL',
}

enum HitType {
  NORMAL = 'NORMAL',
  ACCENT = 'ACCENT',
  GHOST = 'GHOST',
  OPEN = 'OPEN',
}

type DrumKit = {
  [key in Drum]?: {
    [key in HitType]?: string;
  };
}

type ID = string;

type Pointer = ID;

type Metre = [number, number];

type BeatDivision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Collection<T> = Record<ID, T>;

export type { Metre, BeatDivision, ID, Pointer, Collection, DrumKit };
export { Drum, HitType };
