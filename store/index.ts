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

export { store };
