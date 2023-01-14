import { createSlice } from '@reduxjs/toolkit';
import { Collection, HitType, ID, Metre, Pointer } from '../lib/types';
import { addBeats, removeBeats } from './beats';
import { addNotes, removeNotes } from './notes';
import { addHits, removeHits } from './hits';
import { retrieveMeasure } from './index';
import { cloneMeasure } from '../lib/generators';
import { cloneDeep, last, times, uniqueId } from 'lodash';

export type Measure = {
  id: ID;
  metre: Metre;
  beats: Pointer[];
};

export type State = {
  map: Collection<Measure>;
  order: Pointer[];
};

export const measuresSlice = createSlice({
  name: 'measures',
  initialState: {
    map: {
      'measure-1': {
        id: 'measure-1',
        metre: [4, 4],
        beats: ['beat-1', 'beat-2', 'beat-3', 'beat-4'],
      },
    },
    order: ['measure-1'],
  },
  reducers: {
    addMeasure(state, { payload }) {
      state.map[payload.id] = payload;
      state.order.push(payload.id);
    },
    removeMeasure(state, { payload }) {
      delete state.map[payload];
      state.order = state.order.filter((id) => id !== payload);
    },
    updateMeasure(state, { payload }) {
      state.map[payload.id] = payload;
    },
  },
});

export const { addMeasure, removeMeasure, updateMeasure } = measuresSlice.actions;

export const selectMeasurePointers = (state) => state.measures.order;
export const selectMeasure = (measureId) => (state) => state.measures.map[measureId];

export const removeMeasureThunk = (measureId) => {
  return (dispatch, getState) => {
    const state = getState();
    const measure = retrieveMeasure(
      state.hits,
      state.notes,
      state.beats,
      state.measures.map,
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
    const lastMeasureId = last(state.measures.order);

    const { measure, beats, notes, hits } = cloneMeasure(lastMeasureId, state);

    dispatch(addHits(hits));
    dispatch(addNotes(notes));
    dispatch(addBeats(beats));
    dispatch(addMeasure(measure));
  };
};

export const changeMetrePulseThunk = (measureId, metrePulse) => {
  return (dispatch, getState) => {
    const state = getState();
    const oldMeasure = state.measures.map[measureId];
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
        const beat = {
          id: uniqueId('_beat-'),
          division: lastBeat.division,
          notes: lastBeat.notes.map(() => {
            const note = {
              id: uniqueId('_note-'),
              drums: state.drumKit.drums.reduce((all, drum) => {
                const hit = {
                  id: uniqueId('_hit-'),
                  hit: false,
                  hitType: HitType.NORMAL,
                };

                all[drum] = hit.id;
                hitsToAdd.push(hit);

                return all;
              }, {}),
            };

            notesToAdd.push(note);
            return note.id;
          }),
        };

        newMeasure.beats.push(beat.id);
        beatsToAdd.push(beat);
      });

      dispatch(addHits(hitsToAdd));
      dispatch(addNotes(notesToAdd));
      dispatch(addBeats(beatsToAdd));
      dispatch(updateMeasure(newMeasure));
    }
  };
};

export const changeMetreBaseThunk = (measureId, base) => {
  return (dispatch, getState) => {
    const state = getState();
    const oldMeasure = state.measures.map[measureId];
    const newMeasure = cloneDeep(oldMeasure);
    newMeasure.metre[1] = base;

    if (oldMeasure.metre[1] > base) {
      // add every nth note
      const notesToAdd = [];
      const hitsToAdd = [];

      const diff = oldMeasure.metre[1] / base;
      console.log(diff);
    } else if (oldMeasure.metre[1] < base) {
      // remove every nth note
      const diff = base / oldMeasure.metre[1];
      console.log(diff);
    }

    dispatch(updateMeasure(newMeasure));
  };
};
