import { createSlice } from '@reduxjs/toolkit';
import { Collection, ID, Metre, Pointer } from '../lib/types';
import { addBeats, removeBeats } from './beats';
import { addNotes, removeNotes } from './notes';
import { addHits, removeHits } from './hits';
import { retrieveMeasure } from './index';
import { cloneMeasure } from '../lib/generators';
import { last } from 'lodash';

export type Measure = {
  id: ID;
  metre: Metre;
  beats: Pointer[];
};

export type State = Collection<Measure>;

export const measuresSlice = createSlice({
  name: 'measures',
  initialState: {
    'measure-1': {
      id: 'measure-1',
      metre: [4, 4],
      beats: ['beat-1', 'beat-2', 'beat-3', 'beat-4'],
    },
  },
  reducers: {
    addMeasure(state, { payload }) {
      state[payload.id] = payload;
    },
    removeMeasure(state, { payload }) {
      delete state[payload];
    },
  },
});

export const { addMeasure, removeMeasure } = measuresSlice.actions;

export const selectMeasurePointers = (state) => Object.keys(state.measures);
export const selectMeasure = (measureId) => (state) => state.measures[measureId];

export const removeMeasureThunk = (measureId) => {
  return (dispatch, getState) => {
    const state = getState();
    const measure = retrieveMeasure(
      state.hits,
      state.notes,
      state.beats,
      state.measures,
      measureId
    );
    const notesToRemove = [];
    const hitsToRemove = [];

    measure.beats.forEach(({ notes }) => {
      notesToRemove.push(...notes.map(({ id }) => id));
      notes.forEach(({ drums }) => {
        hitsToRemove.push(...Object.values(drums).map(({ id }) => id));
      });
    });

    dispatch(removeHits(hitsToRemove));
    dispatch(removeNotes(notesToRemove));
    dispatch(removeBeats(measure.beats));
    dispatch(removeMeasure(measure.id));
  };
};

export const addMeasureThunk = () => {
  return (dispatch, getState) => {
    const state = getState();
    const lastMeasureId = last(Object.keys(state.measures));

    const { measure, beats, notes, hits } = cloneMeasure(lastMeasureId, state);

    dispatch(addHits(hits));
    dispatch(addNotes(notes));
    dispatch(addBeats(beats));
    dispatch(addMeasure(measure));
  };
};
