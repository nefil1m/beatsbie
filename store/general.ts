import {createSlice} from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    tempo: 120,
  },
  reducers: {
    setTempo: (state, {payload}) => {
      state.tempo = payload;
    }
  }
})

export {generalSlice};
