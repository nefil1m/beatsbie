import { configureStore } from '@reduxjs/toolkit';
import { generalSlice } from './general';
import { measuresSlice } from './measures';
import { hitsSlice } from './hits';
import { beatsSlice } from './beats';
import { drumKitSlice } from './drumKit';
import { notesSlice } from './notes';
import { metronomeSlice } from './metronome';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    measures: measuresSlice.reducer,
    beats: beatsSlice.reducer,
    notes: notesSlice.reducer,
    hits: hitsSlice.reducer,
    drumKit: drumKitSlice.reducer,
    metronome: metronomeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
