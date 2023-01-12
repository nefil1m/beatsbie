import { createSlice } from '@reduxjs/toolkit';
import { MetalDrumKit } from '../lib/drumKits';
import { Drum, DrumKit, HitType } from '../lib/types';
import { uniqueId } from 'lodash';
import { addHits } from './hits';
import { Note, updateNotes } from './notes';

export type State = {
  drumKit: DrumKit;
  drums: Drum[];
};

export const drumKitSlice = createSlice({
  name: 'drumKit',
  initialState: {
    drumKit: MetalDrumKit,
    drums: [Drum.HI_HAT, Drum.SNARE, Drum.KICK1],
  },
  reducers: {
    addDrum(state, { payload }) {
      state.drums.push(payload);
    },
  },
});

export const { addDrum } = drumKitSlice.actions;

export const selectDrums = (state) => state.drumKit.drums;

export const addDrumThunk = (drum) => {
  return (dispatch, getState) => {
    const state = getState();
    const allNotes: Note[] = Object.values(state.notes);
    const newHits = [];
    const newNotes = [];

    allNotes.forEach((note) => {
      const hit = {
        id: uniqueId('_hit-'),
        hit: false,
        hitType: HitType.NORMAL,
      };

      const newNote = {
        ...note,
        drums: {
          ...note.drums,
          [drum]: hit.id,
        },
      };

      newHits.push(hit);
      newNotes.push(newNote);
    });

    dispatch(addDrum(drum));
    dispatch(addHits(newHits));
    dispatch(updateNotes(newNotes));
  };
};
