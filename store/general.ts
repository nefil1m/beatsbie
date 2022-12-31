import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    tempo: 30,
  },
  reducers: {
    setTempo: (state, { payload }) => {
      state.tempo = payload;
    }
  }
});

export { generalSlice };

export const selectTempo = (state) => state.general.tempo;
