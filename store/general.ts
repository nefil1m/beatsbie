import { createSlice } from '@reduxjs/toolkit';
import { ID } from '../lib/types';

export type State = {
  tempo: number;
  measureIndex: number;
  noteId: ID;
};

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    tempo: 120,
    measureIndex: null,
    noteId: null,
  },
  reducers: {
    setTempo(state, { payload }) {
      state.tempo = payload;
    },
    setNoteId(state, { payload }) {
      state.noteId = payload;
    },
    setMeasureIndex(state, { payload }) {
      state.measureIndex = payload;
    },
  },
});

export const { setNoteId, setMeasureIndex, setTempo } = generalSlice.actions;

export const selectTempo = (state) => state.general.tempo;
export const selectActiveMeasureIndex = (state) => state.general.measureIndex;
export const selectActiveNoteId = (state) => state.general.noteId;
