import { Hit } from '../store/hits';
import { uniqueId } from 'lodash';
import { Drum } from './types';

export const cloneMeasure = (measure) => {
  const hits = [];
  const notes = [];
  const beats = [];
  const newMeasure = {
    ...measure,
    id: uniqueId('_measure-'),
    beats: measure.beats.map((beat) => {
      const beatId = uniqueId('_beat-');

      beats.push({
        ...beat,
        notes: beat.notes.map((note) => {
          const noteId = uniqueId('_note-');

          notes.push({
            ...note,
            id: noteId,
            drums: Object.entries(note.drums).reduce((all, [drum, hit]: [Drum, Hit]) => {
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
