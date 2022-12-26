import { createSlice } from '@reduxjs/toolkit';
import { Collection, HitType, ID } from '../lib/types';

export type Hit = {
  id: ID,
  hit: boolean;
  hitType: HitType;
}

export type State = Collection<Hit>;

export const hitsSlice = createSlice<State, any>({
  name: 'hits',
  initialState: {
    'hit-1': {
      id: 'hit-1',
      hit: true,
      hitType: HitType.ACCENT,
    },
    'hit-2': {
      id: 'hit-2',
      hit: true,
      hitType: HitType.NORMAL
    },
    'hit-3': {
      id: 'hit-3',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-4': {
      id: 'hit-4',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-5': {
      id: 'hit-5',
      hit: true,
      hitType: HitType.NORMAL
    },
    'hit-6': {
      id: 'hit-6',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-7': {
      id: 'hit-7',
      hit: true,
      hitType: HitType.ACCENT
    },
    'hit-8': {
      id: 'hit-8',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-9': {
      id: 'hit-9',
      hit: true,
      hitType: HitType.NORMAL
    },
    'hit-10': {
      id: 'hit-10',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-11': {
      id: 'hit-11',
      hit: true,
      hitType: HitType.ACCENT
    },
    'hit-12': {
      id: 'hit-12',
      hit: true,
      hitType: HitType.NORMAL
    },
    'hit-13': {
      id: 'hit-13',
      hit: true,
      hitType: HitType.GHOST
    },
    'hit-14': {
      id: 'hit-14',
      hit: true,
      hitType: HitType.GHOST
    },
    'hit-15': {
      id: 'hit-15',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-16': {
      id: 'hit-16',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-17': {
      id: 'hit-17',
      hit: true,
      hitType: HitType.ACCENT
    },
    'hit-18': {
      id: 'hit-18',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-19': {
      id: 'hit-19',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-20': {
      id: 'hit-20',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-21': {
      id: 'hit-21',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-22': {
      id: 'hit-22',
      hit: true,
      hitType: HitType.ACCENT
    },
    'hit-23': {
      id: 'hit-23',
      hit: true,
      hitType: HitType.ACCENT
    },
    'hit-24': {
      id: 'hit-24',
      hit: true,
      hitType: HitType.NORMAL
    },
    'hit-25': {
      id: 'hit-25',
      hit: false,
      hitType: HitType.NORMAL
    },
    'hit-26': {
      id: 'hit-26',
      hit: false,
      hitType: HitType.NORMAL
    },
  },
  reducers: {
    addNote() {
      // todo
    }
  }
});

export const selectHits = (hitIds) => (state) => {
  const allHits =  state.hits;
  return hitIds.map((id) => allHits[id]);
}
