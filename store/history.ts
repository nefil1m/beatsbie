import { createSlice } from '@reduxjs/toolkit';
import { replaceMeasuresState, State as MeasureState } from './measures';
import { replaceBeatsState, State as BeatsState } from './beats';
import { replaceNotesState, State as NotesState } from './notes';
import { replaceHitsState, State as HitsState } from './hits';
import { replaceDrumKitState, State as DrumKitState } from './drumKit';
import { last } from 'lodash';

const HISTORY_LENGTH_LIMIT = 50;

export type HistoryFragment = {
  measures: MeasureState;
  beats: BeatsState;
  notes: NotesState;
  hits: HitsState;
  drumKit: DrumKitState;
};

export type State = {
  past: HistoryFragment[];
  future: HistoryFragment[];
};

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    past: [],
    future: [],
  },
  reducers: {
    undo: (state, { payload }) => {
      state.past.pop();
      state.future.unshift(payload);
    },
    redo: (state, { payload }) => {
      state.past.push(payload);
      state.future.shift();
    },
    rememberSignificantAction: (state, { payload }) => {
      state.past = state.past.slice(0, HISTORY_LENGTH_LIMIT - 1);
      state.past.push(payload);
      state.future = [];
    },
  },
});

const { rememberSignificantAction, undo, redo } = historySlice.actions;

const getStateToRemember = (state) => ({
  measures: state.measures,
  beats: state.beats,
  notes: state.notes,
  hits: state.hits,
  drumKit: state.drumKit,
});

export const rememberSignificantActionThunk = () => {
  return (dispatch, getState) => {
    dispatch(rememberSignificantAction(getStateToRemember(getState())));
  };
};

export const undoThunk = () => {
  return (dispatch, getState) => {
    const currentState = getState();
    const stateToRestore: HistoryFragment = last(currentState.history.past);

    if (!stateToRestore) return;

    dispatch(undo(getStateToRemember(currentState)));
    dispatch(replaceMeasuresState(stateToRestore.measures));
    dispatch(replaceBeatsState(stateToRestore.beats));
    dispatch(replaceNotesState(stateToRestore.notes));
    dispatch(replaceHitsState(stateToRestore.hits));
    dispatch(replaceDrumKitState(stateToRestore.drumKit));
  };
};

export const redoThunk = () => {
  return (dispatch, getState) => {
    const currentState = getState();
    const stateToRestore: HistoryFragment = currentState.history.future[0];

    if (!stateToRestore) return;

    dispatch(redo(getStateToRemember(currentState)));
    dispatch(replaceMeasuresState(stateToRestore.measures));
    dispatch(replaceBeatsState(stateToRestore.beats));
    dispatch(replaceNotesState(stateToRestore.notes));
    dispatch(replaceHitsState(stateToRestore.hits));
    dispatch(replaceDrumKitState(stateToRestore.drumKit));
  };
};
