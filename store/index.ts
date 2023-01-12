import { configureStore } from '@reduxjs/toolkit';
import { generalSlice } from './general';
import { measuresSlice } from './measures';
import { hitsSlice } from './hits';
import { beatsSlice } from './beats';
import { drumKitSlice } from './drumKit';
import { Note, notesSlice } from './notes';
import { ID } from '../lib/types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    measures: measuresSlice.reducer,
    beats: beatsSlice.reducer,
    notes: notesSlice.reducer,
    hits: hitsSlice.reducer,
    drumKit: drumKitSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const fillHits = (hitsMap: RootState['hits'], note: Note) => ({
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
