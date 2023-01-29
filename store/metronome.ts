import { createSlice } from '@reduxjs/toolkit';
import { BasicMetronome } from '../lib/metronomes';

export const metronomeSlice = createSlice({
  name: 'metronome',
  initialState: {
    on: true,
    tune: BasicMetronome,
  },
  reducers: {
    toggleMetronome(state) {
      state.on = !state.on;
    },
  },
});

export const { toggleMetronome } = metronomeSlice.actions;
