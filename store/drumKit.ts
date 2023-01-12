import { createSlice } from '@reduxjs/toolkit';
import { MetalDrumKit } from '../lib/drumKits';
import { Drum, DrumKit, HitType } from '../lib/types';
import { cloneDeep, uniqueId } from 'lodash';
import { addHits, removeHits } from './hits';
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
    removeDrum(state, { payload }) {
      state.drums = state.drums.filter((stateDrum) => stateDrum !== payload);
    },
  },
});

export const { addDrum, removeDrum } = drumKitSlice.actions;

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
    dispatch(updateNotes(newNotes));
    dispatch(addHits(newHits));
  };
};

export const removeDrumThunk = (drum) => {
  return (dispatch, getState) => {
    const state = getState();
    const allNotes: Note[] = Object.values(state.notes);
    const hitsToRemove = [];
    const notesToUpdate = [];

    allNotes.forEach((note) => {
      hitsToRemove.push(note.drums[drum]);

      const newNote = cloneDeep(note);
      delete newNote.drums[drum];

      notesToUpdate.push(newNote);
    });

    dispatch(removeHits(hitsToRemove));
    dispatch(updateNotes(notesToUpdate));
    dispatch(removeDrum(drum));
  };
};