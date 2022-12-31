import { createSlice } from '@reduxjs/toolkit';
import { BeatDivision, Collection, Drum, Pointer } from '../lib/types';

export type Note = {
  [key in Drum]?: Pointer[];
}

export type Beat = {
  id: string;
  division: BeatDivision;
  notes: Note;
}

export type State = Collection<Beat>;

export const beatsSlice = createSlice({
  name: 'beats',
  initialState: {
    'beat-1': {
      id: 'beat-1',
      division: 2,
      notes: {
        [Drum.HI_HAT]: [
          'hit-1',
          'hit-2'
        ],
        [Drum.SNARE]: [
          'hit-3',
          'hit-4'
        ],
        [Drum.FLOOR1]: [
          'hit-5',
          'hit-6'
        ]
      }
    },
    'beat-2': {
      id: 'beat-2',
      division: 4,
      notes: {
        [Drum.HI_HAT]: [
          'hit-7',
          'hit-8',
          'hit-9',
          'hit-10'
        ],
        [Drum.SNARE]: [
          'hit-11',
          'hit-12',
          'hit-13',
          'hit-14',
        ],
        [Drum.FLOOR1]: [
          'hit-30',
          'hit-29',
          'hit-28',
          'hit-27'
        ]
      },
    },
    'beat-3': {
      id: 'beat-3',
      division: 1,
      notes: {
        [Drum.HI_HAT]: [
          'hit-15'
        ],
        [Drum.SNARE]: [
          'hit-17'
        ],
        [Drum.FLOOR1]: [
          'hit-16'
        ]
      }
    },
    'beat-4': {
      id: 'beat-4',
      division: 3,
      notes: {
        [Drum.HI_HAT]: [
          'hit-18',
          'hit-19',
          'hit-20'
        ],
        [Drum.SNARE]: [
          'hit-21',
          'hit-22',
          'hit-23'
        ],
        [Drum.FLOOR1]: [
          'hit-24',
          'hit-25',
          'hit-26',
        ]
      }
    }
  },
  reducers: {
    addNote() {
      // todo
    }
  },
});

export const selectBeat = (beatId) => (state) => state.beats[beatId];
