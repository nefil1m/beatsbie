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
      division: 4,
      notes: {
        [Drum.HI_HAT]: [
          'hit-1',
          'hit-2',
          'hit-31',
          'hit-32'
        ],
        [Drum.SNARE]: [
          'hit-3',
          'hit-4',
          'hit-33',
          'hit-34'
        ],
        [Drum.KICK1]: [
          'hit-5',
          'hit-6',
          'hit-35',
          'hit-36',
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
        [Drum.KICK1]: [
          'hit-30',
          'hit-29',
          'hit-28',
          'hit-27'
        ]
      },
    },
    'beat-3': {
      id: 'beat-3',
      division: 4,
      notes: {
        [Drum.HI_HAT]: [
          'hit-15',
          'hit-37',
          'hit-38',
          'hit-39',
        ],
        [Drum.SNARE]: [
          'hit-17',
          'hit-40',
          'hit-41',
          'hit-42',
        ],
        [Drum.KICK1]: [
          'hit-16',
          'hit-43',
          'hit-44',
          'hit-45',
        ]
      }
    },
    'beat-4': {
      id: 'beat-4',
      division: 4,
      notes: {
        [Drum.HI_HAT]: [
          'hit-18',
          'hit-19',
          'hit-20',
          'hit-46',
        ],
        [Drum.SNARE]: [
          'hit-21',
          'hit-22',
          'hit-23',
          'hit-47'
        ],
        [Drum.KICK1]: [
          'hit-24',
          'hit-25',
          'hit-26',
          'hit-48'
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
