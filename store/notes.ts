import { createSlice } from '@reduxjs/toolkit';
import { Collection, Drum, ID, Pointer } from '../lib/types';

export type Note = {
  id: ID;
  drums: {
    [key in Drum]?: Pointer;
  };
};

export type State = Collection<Note>;

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    'note-1': {
      id: 'note-1',
      drums: {
        [Drum.HI_HAT]: 'hit-1',
        [Drum.SNARE]: 'hit-3',
        [Drum.KICK1]: 'hit-5',
      },
    },
    'note-2': {
      id: 'note-2',
      drums: {
        [Drum.HI_HAT]: 'hit-2',
        [Drum.SNARE]: 'hit-4',
        [Drum.KICK1]: 'hit-6',
      },
    },
    'note-3': {
      id: 'note-3',
      drums: {
        [Drum.HI_HAT]: 'hit-31',
        [Drum.SNARE]: 'hit-33',
        [Drum.KICK1]: 'hit-35',
      },
    },
    'note-4': {
      id: 'note-4',
      drums: {
        [Drum.HI_HAT]: 'hit-32',
        [Drum.SNARE]: 'hit-34',
        [Drum.KICK1]: 'hit-36',
      },
    },
    'note-5': {
      id: 'note-5',
      drums: {
        [Drum.HI_HAT]: 'hit-7',
        [Drum.SNARE]: 'hit-11',
        [Drum.KICK1]: 'hit-30',
      },
    },
    'note-6': {
      id: 'note-6',
      drums: {
        [Drum.HI_HAT]: 'hit-8',
        [Drum.SNARE]: 'hit-12',
        [Drum.KICK1]: 'hit-29',
      },
    },
    'note-7': {
      id: 'note-7',
      drums: {
        [Drum.HI_HAT]: 'hit-9',
        [Drum.SNARE]: 'hit-13',
        [Drum.KICK1]: 'hit-28',
      },
    },
    'note-8': {
      id: 'note-8',
      drums: {
        [Drum.HI_HAT]: 'hit-10',
        [Drum.SNARE]: 'hit-14',
        [Drum.KICK1]: 'hit-27',
      },
    },
    'note-9': {
      id: 'note-9',
      drums: {
        [Drum.HI_HAT]: 'hit-15',
        [Drum.SNARE]: 'hit-17',
        [Drum.KICK1]: 'hit-16',
      },
    },
    'note-10': {
      id: 'note-10',
      drums: {
        [Drum.HI_HAT]: 'hit-37',
        [Drum.SNARE]: 'hit-40',
        [Drum.KICK1]: 'hit-43',
      },
    },
    'note-11': {
      id: 'note-11',
      drums: {
        [Drum.HI_HAT]: 'hit-38',
        [Drum.SNARE]: 'hit-41',
        [Drum.KICK1]: 'hit-44',
      },
    },
    'note-12': {
      id: 'note-12',
      drums: {
        [Drum.HI_HAT]: 'hit-39',
        [Drum.SNARE]: 'hit-42',
        [Drum.KICK1]: 'hit-45',
      },
    },
    'note-13': {
      id: 'note-13',
      drums: {
        [Drum.HI_HAT]: 'hit-18',
        [Drum.SNARE]: 'hit-21',
        [Drum.KICK1]: 'hit-24',
      },
    },
    'note-14': {
      id: 'note-14',
      drums: {
        [Drum.HI_HAT]: 'hit-19',
        [Drum.SNARE]: 'hit-22',
        [Drum.KICK1]: 'hit-25',
      },
    },
    'note-15': {
      id: 'note-15',
      drums: {
        [Drum.HI_HAT]: 'hit-20',
        [Drum.SNARE]: 'hit-23',
        [Drum.KICK1]: 'hit-26',
      },
    },
    'note-16': {
      id: 'note-16',
      drums: {
        [Drum.HI_HAT]: 'hit-46',
        [Drum.SNARE]: 'hit-47',
        [Drum.KICK1]: 'hit-48',
      },
    },
  },
  reducers: {
    addNotes(state, { payload }) {
      payload.forEach((note) => {
        state[note.id] = note;
      });
    },
    removeNotes(state, { payload }) {
      payload.forEach((id) => {
        delete state[id];
      });
    },
  },
});

export const { addNotes, removeNotes } = notesSlice.actions;

export const selectNote = (noteId) => (state) => state.notes[noteId];
export const selectNotes = (noteIds) => (state) => noteIds.map((id) => state.notes[id]);
export const selectNoteState = (state) => state.notes;
