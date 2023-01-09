import { createSlice } from '@reduxjs/toolkit';
import { PlayState } from '../lib/types';

type State = {
  tempo: number;
  playState: PlayState;
}

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    tempo: 120,
    playState: PlayState.STOPPED,
    measureIndex: 0,
    noteId: null,
  },
  reducers: {
    setTempo(state, { payload }) {
      state.tempo = payload;
    },
    play(state) {
      state.playState = PlayState.PLAYING;
    },
    stop(state) {
      state.playState = PlayState.STOPPED;
    },
    togglePlayState: (state) => {
      state.playState = state.playState === PlayState.PLAYING
                        ? PlayState.STOPPED
                        : PlayState.PLAYING;
    },
    setNoteId(state, { payload }) {
      state.noteId = payload;
    },
    setMeasureIndex(state, { payload }) {
      state.measureIndex = payload;
    }
  }
});

const { stop, play, togglePlayState, setNoteId, setMeasureIndex } = generalSlice.actions;

export { generalSlice, stop, play, togglePlayState, setNoteId, setMeasureIndex };

export type { State };

export const selectTempo = (state) => state.general.tempo;
export const selectPlayState = (state) => state.general.playState;
export const selectActiveMeasureIndex = (state) => state.general.measureIndex;
export const selectActiveNoteId = (state) => state.general.noteId;

