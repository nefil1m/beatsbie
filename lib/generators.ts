import { times, uniqueId } from 'lodash';
import { Drum, HitType, ID } from './types';

const generateDefaultMeasure = (currentDrums = [Drum.HI_HAT, Drum.SNARE, Drum.KICK1]) => {
  const hits = [];
  const notes = [];
  const beats = [];

  const newMeasure = {
    id: uniqueId('_measure-'),
    metre: [4, 4],
    beats: times(4, () => {
      const beatId = uniqueId('_beat-');

      beats.push({
        id: beatId,
        division: 4,
        notes: times(4, () => {
          const noteId = uniqueId('_note-');

          notes.push({
            id: noteId,
            drums: currentDrums.reduce((all, drum) => {
              const hitId = uniqueId('_hit-');

              hits.push({
                hit: false,
                hitType: HitType.NORMAL,
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

export const cloneMeasure = (measureId, state) => {
  const measure = state.measures[measureId];

  if (!measure) {
    return generateDefaultMeasure();
  }

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
        id: beatId,
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
