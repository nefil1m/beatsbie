import { uniqueId } from 'lodash';
import { Drum, ID } from './types';

export const cloneMeasure = (measureId, state) => {
  const measure = state.measures[measureId];
  const hits = [];
  const notes = [];
  const beats = [];
  const newMeasure = {
    ...measure,
    id: uniqueId('_measure-'),
    beats: measure.beats.map((originalBeatId) => {
      const beat = state.beats[originalBeatId];
      const beatId = uniqueId('_beat-');

      beats.push({
        ...beat,
        notes: beat.notes.map((originalNoteId) => {
          const note = state.notes[originalNoteId];
          const noteId = uniqueId('_note-');

          notes.push({
            ...note,
            id: noteId,
            drums: Object.entries(note.drums).reduce((all, [drum, originalHitId]: [Drum, ID]) => {
              const hit = state.hits[originalHitId];
              const hitId = uniqueId('_hit-');

              hits.push({
                ...hit,
                id: hitId,
              });

              return {
                ...all,
                [drum]: hitId,
              };
            }, {}),
          });

          return noteId;
        }),
        id: beatId,
      });

      return beatId;
    }),
  };

  return {
    measure: newMeasure,
    beats,
    notes,
    hits,
  };
};
