import { createSlice } from '@reduxjs/toolkit';
import { BeatDivision, Collection, Drum, Pointer } from '../lib/types';

export type Beat = {
  id: string;
  division: BeatDivision;
  notes: Pointer[];
};

export type State = Collection<Beat>;

export const beatsSlice = createSlice({
  name: 'beats',
  initialState: {
    'beat-1': {
      id: 'beat-1',
      division: 4,
      notes: ['note-1', 'note-2', 'note-3', 'note-4'],
    },
    'beat-2': {
      id: 'beat-2',
      division: 4,
      notes: ['note-5', 'note-6', 'note-7', 'note-8'],
    },
    'beat-3': {
      id: 'beat-3',
      division: 4,
      notes: ['note-9', 'note-10', 'note-11', 'note-12'],
    },
    'beat-4': {
      id: 'beat-4',
      division: 4,
      notes: ['note-13', 'note-14', 'note-15', 'note-16'],
    },
  },
  reducers: {
    addBeats(state, { payload }) {
      payload.forEach((beat) => {
        state[beat.id] = beat;
      });
    },
  },
});

export const { addBeats } = beatsSlice.actions;

export const selectBeat = (beatId) => (state) => state.beats[beatId];
