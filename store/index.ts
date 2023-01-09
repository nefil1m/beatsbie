import { configureStore } from '@reduxjs/toolkit';
import { generalSlice, State as GeneralState } from './general';
import { measuresSlice, State as MeasureState } from './measures';
import { hitsSlice, State as HitState } from './hits';
import { beatsSlice, State as BeatState } from './beats';
import { Note, notesSlice, State as NotesState } from './notes';
import { memoize } from 'lodash';

export type RootState = {
  measures: MeasureState;
  hits: HitState;
  beats: BeatState;
  general: GeneralState;
  notes: NotesState;
}

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    measures: measuresSlice.reducer,
    hits: hitsSlice.reducer,
    beats: beatsSlice.reducer,
    notes: notesSlice.reducer,
  },
});

const fillHits = (hitsMap: HitState, note: Note) => ({
  ...note,
  drums: Object
    .entries(note.drums)
    .reduce((all, [drum, hitId]) => ({
      ...all,
      [drum]: hitsMap[hitId],
    }), {}),
})

const selectAll = memoize((state: RootState) => {
  const allMeasures = Object.values(state.measures);
  const beatsMap = state.beats;
  const hitsMap = state.hits;
  const notesMap = state.notes;

  return allMeasures.map(measure => ({
    ...measure,
    beats: measure.beats.map((beatId) => {
      const beat = beatsMap[beatId];

      return {
        ...beat,
        notes: beat.notes.map(
          (noteId) => fillHits(hitsMap, notesMap[noteId])
        ),
      };
    }),
  }));
});

export { store, selectAll };
