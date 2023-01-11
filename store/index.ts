import { configureStore } from '@reduxjs/toolkit';
import { generalSlice, State as GeneralState } from './general';
import { measuresSlice, State as MeasureState } from './measures';
import { hitsSlice, State as HitState } from './hits';
import { beatsSlice, State as BeatState } from './beats';
import { Note, notesSlice, State as NotesState } from './notes';
import { memoize } from 'lodash';
import { ID } from '../lib/types';

export type RootState = {
  general: GeneralState;
  measures: MeasureState;
  beats: BeatState;
  notes: NotesState;
  hits: HitState;
};

export const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    measures: measuresSlice.reducer,
    beats: beatsSlice.reducer,
    notes: notesSlice.reducer,
    hits: hitsSlice.reducer,
  },
});

const fillHits = (hitsMap: HitState, note: Note) => ({
  ...note,
  drums: Object.entries(note.drums).reduce(
    (all, [drum, hitId]) => ({
      ...all,
      [drum]: hitsMap[hitId],
    }),
    {}
  ),
});

export const retrieveMeasure = (hits, notes, beats, measures, measureId) => {
  const measure = measures[measureId];

  return {
    ...measure,
    beats: measure.beats.map((beatId: ID) => {
      const beat = beats[beatId];

      return {
        ...beat,
        notes: beat.notes.map((noteId: ID) => fillHits(hits, notes[noteId])),
      };
    }),
  };
};

export const retrieveTrack = (state) => {
  return Object.keys(state.measures).map((measureId) =>
    retrieveMeasure(state.hits, state.notes, state.beats, state.measures, measureId)
  );
};
