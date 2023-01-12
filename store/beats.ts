import { createSlice } from '@reduxjs/toolkit';
import { BeatDivision, Collection, HitType, Pointer } from '../lib/types';
import { cloneDeep, times, uniqueId } from 'lodash';
import { addNotes, removeNotes } from './notes';
import { addHits, removeHits } from './hits';

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
    removeBeats(state, { payload }) {
      payload.forEach((id) => {
        delete state[id];
      });
    },
    updateBeat(state, { payload }) {
      state[payload.id] = payload;
    },
  },
});

export const { addBeats, removeBeats, updateBeat } = beatsSlice.actions;

export const selectBeat = (beatId) => (state) => state.beats[beatId];

export const changeBeatDivisionThunk = (beatId, newDivision) => {
  return (dispatch, getState) => {
    const state = getState();
    const beat = state.beats[beatId];
    const notesToRemove = [];
    const notesToAdd = [];
    const hitsToRemove = [];
    const hitsToAdd = [];
    const newBeat = { ...cloneDeep(beat), division: newDivision };

    if (beat.division > newDivision) {
      notesToRemove.push(...newBeat.notes.splice(newDivision));
      notesToRemove.forEach((noteId) => {
        Object.entries(state.notes[noteId].drums).forEach(([, hitId]) => {
          hitsToRemove.push(hitId);
        });
      });
    } else if (beat.division < newDivision) {
      times(newDivision - beat.division, () => {
        const note = {
          id: uniqueId('_note-'),
          drums: {},
        };

        state.drumKit.drums.forEach((drum) => {
          const hit = {
            id: uniqueId('_hit-'),
            hit: false,
            hitType: HitType.NORMAL,
          };

          hitsToAdd.push(hit);
          note.drums[drum] = hit.id;
        });

        notesToAdd.push(note);
        newBeat.notes.push(note.id);
      });
    }

    dispatch(removeNotes(notesToRemove));
    dispatch(removeHits(hitsToRemove));
    dispatch(addHits(hitsToAdd));
    dispatch(addNotes(notesToAdd));
    dispatch(updateBeat(newBeat));
  };
};
