import { uniqueId } from 'lodash';

export const createHitId = () => uniqueId('_hit-');
export const createNoteId = () => uniqueId('_note-');
export const createBeatId = () => uniqueId('_beat-');
export const createMeasureId = () => uniqueId('_measure-');
