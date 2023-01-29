import { createSlice } from '@reduxjs/toolkit';
import { BasicMetronome } from '../lib/metronomes';
import { clamp } from 'lodash';

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
    setMetronomeVolume(state, { payload }) {
      state.volume = clamp(payload, 0, 100);
    },
  },
});

export const { toggleMetronome, setMetronomeVolume } = metronomeSlice.actions;

export const selectMetronomeOn = (state) => state.metronome.on;
export const selectMetronomeVolume = (state) => state.metronome.volume;
