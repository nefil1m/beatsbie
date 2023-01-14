import { createSlice } from '@reduxjs/toolkit';
import { ID } from '../lib/types';

export type State = {
  tempo: number;
  measureId: number;
  noteId: ID;
};

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    tempo: 120,
    measureId: null,
    noteId: null,
  },
  reducers: {
    setTempo(state, { payload }) {
      state.tempo = payload;
    },
    setNoteId(state, { payload }) {
      state.noteId = payload;
    },
    setMeasureId(state, { payload }) {
      state.measureId = payload;
    },
  },
});

export const { setNoteId, setMeasureId, setTempo } = generalSlice.actions;

export const selectTempo = (state) => state.general.tempo;
export const selectActiveMeasureId = (state) => state.general.measureId;
export const selectActiveNoteId = (state) => state.general.noteId;
