import { configureStore } from '@reduxjs/toolkit';
import { generalSlice } from './general';
import { measuresSlice, State as MeasureState } from './measures';
import { hitsSlice, State as HitState } from './hits';
import { beatsSlice, State as BeatState } from './beats';

export type RootState = {
  measures: MeasureState;
  hits: HitState;
  beats: BeatState;
}

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    measures: measuresSlice.reducer,
    hits: hitsSlice.reducer,
    beats: beatsSlice.reducer,
  },
});

const selectAll = (state: RootState) => {
  const allMeasures = Object.values(state.measures);
  const beatsMap = state.beats;
  const hitsMap = state.hits;

  return allMeasures.map(measure => ({
    ...measure,
    beats: measure.beats.map((beatId) => ({
      ...beatsMap[beatId],
      notes: Object.entries(beatsMap[beatId].notes).reduce((all, [drum, notes]) => ({
        ...all,
        [drum]: notes.map((hitId) => hitsMap[hitId]),
      }), {})
    }))
  }))
};

export { store, selectAll };
