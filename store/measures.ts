import { createSlice } from '@reduxjs/toolkit';
import { Collection, ID, Metre, Pointer } from '../lib/types';

export type Measure = {
  id: ID;
  metre: Metre;
  beats: Pointer[];
};

export type State = Collection<Measure>;

export const measuresSlice = createSlice({
  name: 'measures',
  initialState: {
    'measure-1': {
      id: 'measure-1',
      metre: [4, 4],
      beats: ['beat-1', 'beat-2', 'beat-3', 'beat-4'],
    },
    // 'measure-2': {
    //   id: 'measure-2',
    //   metre: [4, 4],
    //   beats: [
    //     'beat-1',
    //     'beat-2',
    //     'beat-3',
    //     'beat-4',
    //   ]
    // },
    // 'measure-3': {
    //   id: 'measure-3',
    //   metre: [4, 4],
    //   beats: [
    //     'beat-1',
    //     'beat-2',
    //     'beat-3',
    //     'beat-4',
    //   ]
    // }
  },
  reducers: {},
});

export const selectMeasurePointers = (state) => Object.keys(state.measures);
export const selectMeasure = (measureId) => (state) => state.measures[measureId];
