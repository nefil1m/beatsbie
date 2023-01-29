import { createSlice } from '@reduxjs/toolkit';
import { BasicMetronome } from '../lib/metronomes';

export const metronomeSlice = createSlice({
  name: 'metronome',
  initialState: {
    on: true,
    tune: BasicMetronome,
    volume: 100,
  },
  reducers: {
    toggleMetronome(state, { payload }) {
      state.on = payload ?? !state.on;
    },
  },
});

export const { toggleMetronome } = metronomeSlice.actions;

export const selectMetronomeOn = (state) => state.metronome.on;
