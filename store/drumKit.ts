import { createSlice } from '@reduxjs/toolkit';
import { MetalDrumKit } from '../lib/drumKits';
import { Drum, DrumKit } from '../lib/types';

export type State = {
  drumKit: DrumKit;
  drums: Drum[];
};

export const drumKitSlice = createSlice({
  name: 'drumKit',
  initialState: {
    drumKit: MetalDrumKit,
    drums: [Drum.HI_HAT, Drum.SNARE, Drum.KICK1],
  },
  reducers: {},
});

export const selectDrums = (state) => state.drumKit.drums;
