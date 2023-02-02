import { createSlice } from '@reduxjs/toolkit';
import { Collection, ID, Metre, Pointer } from '../lib/types';
import { addBeats, Beat, removeBeats } from './beats';
import { addNotes, removeNotes } from './notes';
import { addHits, removeHits } from './hits';
import { cloneBeat, cloneMeasure, generateEmptyMeasure } from '../lib/generators';
import { cloneDeep, last, times } from 'lodash';

export type MeasurePointed = {
  id: ID;
  metre: Metre;
  beats: Pointer[];
};

export type Measure = {
  id: ID;
  metre: Metre;
  beats: Beat[];
};

export type State = {
  hashmap: Collection<MeasurePointed>;
  order: Pointer[];
};

export const measuresSlice = createSlice({
  name: 'measures',
  initialState: {
    hashmap: {
      'measure-1': {
        id: 'measure-1',
        metre: [4, 4],
        beats: ['beat-1', 'beat-2', 'beat-3', 'beat-4'],
      },
    },
    order: ['measure-1'],
  },
  reducers: {
    addMeasure(state, { payload: { measure, insertAfter } }) {
      state.hashmap[measure.id] = measure;
      const index = state.order.findIndex((id) => id === insertAfter);

      if (index === -1) {
        state.order.push(measure.id);
      } else {
        state.order.splice(index + 1, 0, measure.id);
      }
    },
    removeMeasure(state, { payload }) {
      delete state.hashmap[payload];
      state.order = state.order.filter((id) => id !== payload);
    },
    updateMeasure(state, { payload }) {
      state.hashmap[payload.id] = payload;
    },
  },
});

export const { addMeasure, removeMeasure, updateMeasure } = measuresSlice.actions;

export const selectMeasurePointers = (state) => state.measures.order;
export const selectMeasure = (measureId) => (state) => state.measures.hashmap[measureId];

export const removeMeasureThunk = (measureId) => {
  return (dispatch, getState) => {
    const state = getState();
    const measure = state.measures.hashmap[measureId];
    const notesToRemove = [];
    const hitsToRemove = [];

    measure.beats.forEach((beatId) => {
      const { notes } = state.beats[beatId];
      notesToRemove.push(...notes);
      notes.forEach((noteId) => {
        hitsToRemove.push(...Object.values(state.notes[noteId].drums));
      });
    });

    dispatch(removeHits(hitsToRemove));
    dispatch(removeNotes(notesToRemove));
    dispatch(removeBeats(measure.beats));
    dispatch(removeMeasure(measure.id));
  };
};

export const cloneMeasureThunk = (measureId: ID, insertAfter: ID = measureId) => {
  return (dispatch, getState) => {
    const state = getState();
    const { measure, beats, notes, hits } = cloneMeasure(measureId, state);

    dispatch(addHits(hits));
    dispatch(addNotes(notes));
    dispatch(addBeats(beats));
    dispatch(addMeasure({ measure, insertAfter }));
  };
};

export const cloneLastMeasureThunk = () => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(cloneMeasureThunk(last(state.measures.order)));
  };
};

export const addEmptyMeasureThunk = (metre: Metre = [4, 4], insertAfter: ID) => {
  return (dispatch, getState) => {
    const state = getState();
    const { measure, beats, notes, hits } = generateEmptyMeasure(state, metre);

    dispatch(addHits(hits));
    dispatch(addNotes(notes));
    dispatch(addBeats(beats));
    dispatch(addMeasure({ measure, insertAfter }));
  };
};

export const changeMetrePulseThunk = (measureId: ID, metrePulse: Metre[0]) => {
  return (dispatch, getState) => {
    const state = getState();
    const oldMeasure = state.measures.hashmap[measureId];
    const newMeasure = cloneDeep(oldMeasure);
    newMeasure.metre = [metrePulse, newMeasure.metre[1]];

    if (oldMeasure.metre[0] > metrePulse) {
      const notesToRemove = [];
      const hitsToRemove = [];

      const beatsToRemove = newMeasure.beats.splice(metrePulse);

      beatsToRemove.forEach((beatId) => {
        state.beats[beatId].notes.forEach((noteId) => {
          const { drums } = state.notes[noteId];
          notesToRemove.push(noteId);
          hitsToRemove.push(...Object.values(drums));
        });
      });

      dispatch(removeHits(hitsToRemove));
      dispatch(removeNotes(notesToRemove));
      dispatch(removeBeats(beatsToRemove));
      dispatch(updateMeasure(newMeasure));
    } else if (oldMeasure.metre[0] < metrePulse) {
      const beatsToAdd = [];
      const notesToAdd = [];
      const hitsToAdd = [];
      const lastBeat = state.beats[last(oldMeasure.beats) as ID];

      times(metrePulse - oldMeasure.metre[0], () => {
        const { beat, notes, hits } = cloneBeat(state, lastBeat);
        newMeasure.beats.push(beat.id);
        beatsToAdd.push(beat);
        notesToAdd.push(...notes);
        hitsToAdd.push(...hits);
      });

      dispatch(addHits(hitsToAdd));
      dispatch(addNotes(notesToAdd));
      dispatch(addBeats(beatsToAdd));
      dispatch(updateMeasure(newMeasure));
    }
  };
};

export const changeMetreBaseThunk = (measureId: ID, base: Metre[1]) => {
  return (dispatch, getState) => {
    const state = getState();
    const oldMeasure = state.measures.hashmap[measureId];
    const newMeasure = cloneDeep(oldMeasure);
    newMeasure.metre[1] = base;

    dispatch(updateMeasure(newMeasure));
  };
};
