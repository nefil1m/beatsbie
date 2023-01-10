import { createSlice } from '@reduxjs/toolkit';
import { ID } from '../lib/types';

type State = {
  tempo: number;
  measureIndex: number;
  noteId: ID;
};

const generalSlice = createSlice({
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

const { setNoteId, setMeasureIndex } = generalSlice.actions;

export { generalSlice, setNoteId, setMeasureIndex };

export type { State };

export const selectTempo = (state) => state.general.tempo;
export const selectPlayState = (state) => state.general.playState;
export const selectActiveMeasureIndex = (state) => state.general.measureIndex;
export const selectActiveNoteId = (state) => state.general.noteId;
