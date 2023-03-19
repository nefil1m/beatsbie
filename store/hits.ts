import { createSlice } from '@reduxjs/toolkit';
import { Collection, Drum, HitType, ID } from '../lib/types';
import { getNextHitType } from '../lib/utils';
import { rememberSignificantActionThunk } from './history';

export type Hit = {
  id: ID;
  hit: boolean;
  hitType: HitType;
};

export type State = Collection<Hit>;

export const hitsSlice = createSlice({
  name: 'hits',
  initialState: {
    'hit-1': {
      id: 'hit-1',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-2': {
      id: 'hit-2',
      hit: false,
      hitType: HitType.NORMAL,
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
      hitType: HitType.NORMAL,
    },
    'hit-6': {
      id: 'hit-6',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-7': {
      id: 'hit-7',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-8': {
      id: 'hit-8',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-9': {
      id: 'hit-9',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-10': {
      id: 'hit-10',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-11': {
      id: 'hit-11',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-12': {
      id: 'hit-12',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-13': {
      id: 'hit-13',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-14': {
      id: 'hit-14',
      hit: false,
      hitType: HitType.NORMAL,
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
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-18': {
      id: 'hit-18',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-19': {
      id: 'hit-19',
      hit: false,
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
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-23': {
      id: 'hit-23',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-24': {
      id: 'hit-24',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-25': {
      id: 'hit-25',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-26': {
      id: 'hit-26',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-27': {
      id: 'hit-27',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-28': {
      id: 'hit-28',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-29': {
      id: 'hit-29',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-30': {
      id: 'hit-30',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-31': {
      id: 'hit-31',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-32': {
      id: 'hit-32',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-33': {
      id: 'hit-33',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-34': {
      id: 'hit-34',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-35': {
      id: 'hit-35',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-36': {
      id: 'hit-36',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-37': {
      id: 'hit-37',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-38': {
      id: 'hit-38',
      hit: true,
      hitType: HitType.NORMAL,
    },
    'hit-39': {
      id: 'hit-39',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-40': {
      id: 'hit-40',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-41': {
      id: 'hit-41',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-42': {
      id: 'hit-42',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-43': {
      id: 'hit-43',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-44': {
      id: 'hit-44',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-45': {
      id: 'hit-45',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-46': {
      id: 'hit-46',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-47': {
      id: 'hit-47',
      hit: false,
      hitType: HitType.NORMAL,
    },
    'hit-48': {
      id: 'hit-48',
      hit: false,
      hitType: HitType.NORMAL,
    },
  },
  reducers: {
    toggleHit(state, { payload }) {
      state[payload].hit = !state[payload].hit;
      if (!state[payload].hit) {
        state[payload].hitType = HitType.NORMAL;
      }
    },
    addHits(state, { payload }) {
      payload.forEach((hit) => {
        state[hit.id] = hit;
      });
    },
    removeHits(state, { payload }) {
      payload.forEach((id) => {
        delete state[id];
      });
    },
    changeHitType(state, { payload: { id, drum } }) {
      const hit = state[id];
      if (hit.hit) {
        const nextHitType = getNextHitType(drum, hit.hitType);
        if (nextHitType) {
          state[id].hitType = nextHitType;
        } else {
          state[id].hit = false;
          state[id].hitType = drum === Drum.SNARE ? HitType.ACCENT : HitType.NORMAL;
        }
      } else {
        state[id].hit = true;
        state[id].hitType = drum === Drum.SNARE ? HitType.ACCENT : HitType.NORMAL;
      }
    },
    replaceHitsState(state, { payload }) {
      return payload;
    },
  },
});

export const { toggleHit, addHits, removeHits, changeHitType, replaceHitsState } =
  hitsSlice.actions;

export const selectHit = (hitId) => (state) => state.hits[hitId];

export const changeHitTypeThunk = (payload) => {
  return (dispatch) => {
    dispatch(rememberSignificantActionThunk());
    dispatch(changeHitType(payload));
  };
};

export const toggleHitThunk = (payload) => {
  return (dispatch) => {
    dispatch(rememberSignificantActionThunk());
    dispatch(toggleHit(payload));
  };
};
