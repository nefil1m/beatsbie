import { times } from 'lodash';
import { HitType, Metre } from './types';
import { createBeatId, createHitId, createMeasureId, createNoteId } from './ids';
import { Hit } from '../store/hits';
import { NotePointed } from '../store/notes';
import { RootState } from '../store';
import { BeatPointed } from '../store/beats';

export const cloneHit = (hit: Partial<Hit>): Hit => ({
  hit: false,
  hitType: HitType.NORMAL,
  ...hit,
  id: createHitId(),
});

export const cloneNote = (state: RootState, note: Partial<NotePointed>) => {
  const newHits = [];
  const { drums } = state.drumKit;

  const newDrums = {};
  drums.forEach((drum) => {
    const hit = cloneHit(state.hits[note.drums?.[drum]]);
    newDrums[drum] = hit.id;
    newHits.push(hit);
  });

  const newNote = {
    ...note,
    id: createNoteId(),
    drums: newDrums,
  };

  return {
    hits: newHits,
    note: newNote,
  };
};

export const cloneBeat = (state: RootState, beat: Partial<BeatPointed>) => {
  const newHits = [];
  const newNotes = [];

  const newBeat = {
    division: 4,
    ...beat,
    id: createBeatId(),
    notes: (beat.notes ?? [...new Array(4)]).map((noteId) => {
      const { hits, note } = cloneNote(state, state.notes[noteId] ?? {});
      newHits.push(...hits);
      newNotes.push(note);
      return note.id;
    }),
  };

  return {
    hits: newHits,
    notes: newNotes,
    beat: newBeat,
  };
};

export const generateEmptyMeasure = (state: RootState, metre: Metre = [4, 4]) => {
  const newHits = [];
  const newNotes = [];
  const newBeats = [];

  const newMeasure = {
    id: createMeasureId(),
    metre,
    beats: times(metre[0], () => {
      const { beat, notes, hits } = cloneBeat(state, {});
      newHits.push(...hits);
      newNotes.push(...notes);
      newBeats.push(beat);
      return beat.id;
    }),
  };

  return {
    measure: newMeasure,
    beats: newBeats,
    notes: newNotes,
    hits: newHits,
  };
};

export const cloneMeasure = (measureId, state) => {
  const measure = state.measures.hashmap[measureId];

  if (!measure) {
    return generateEmptyMeasure(state);
  }

  const newHits = [];
  const newNotes = [];
  const newBeats = [];
  const newMeasure = {
    ...measure,
    id: createMeasureId(),
    beats: measure.beats.map((originalBeatId) => {
      const { beat, notes, hits } = cloneBeat(state, state.beats[originalBeatId]);
      newHits.push(...hits);
      newNotes.push(...notes);
      newBeats.push(beat);
      return beat.id;
    }),
  };

  return {
    measure: newMeasure,
    beats: newBeats,
    notes: newNotes,
    hits: newHits,
  };
};
