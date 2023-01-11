import React from 'react';
import { Note } from '../Note/Note';
import { HitType, ID } from '../../../lib/types';
import { useDispatch, useSelector } from 'react-redux';
import { Beat as TBeat, selectBeat, updateBeat } from '../../../store/beats';
import styles from './Beat.module.scss';
import { addNotes, selectNoteState, removeNotes } from '../../../store/notes';
import { addHits, removeHits } from '../../../store/hits';
import { cloneDeep, times, uniqueId } from 'lodash';
import { selectDrums } from '../../../store/drumKit';

type Props = {
  id: ID;
};

export const Beat = ({ id }: Props) => {
  const beat: TBeat = useSelector(selectBeat(id));
  const allNotesMap = useSelector(selectNoteState);
  const drums = useSelector(selectDrums);
  const dispatch = useDispatch();
  const { notes, division } = beat;

  const onDivisionChange = ({ target: { value } }) => {
    const newDivision = Number(value);
    const notesToRemove = [];
    const notesToAdd = [];
    const hitsToRemove = [];
    const hitsToAdd = [];
    const newBeat = { ...cloneDeep(beat), division: newDivision };

    if (division > newDivision) {
      notesToRemove.push(...newBeat.notes.splice(newDivision));
      notesToRemove.forEach((noteId) => {
        Object.entries(allNotesMap[noteId].drums).forEach(([, hitId]) => {
          hitsToRemove.push(hitId);
        });
      });
    } else if (division < newDivision) {
      times(newDivision - division, () => {
        const note = {
          id: uniqueId('_note-'),
          drums: {},
        };

        drums.forEach((drum) => {
          const hit = {
            id: uniqueId('_hit-'),
            hit: false,
            hitType: HitType.NORMAL,
          };

          hitsToAdd.push(hit);
          note.drums[drum] = hit.id;
        });

        notesToAdd.push(note);
        newBeat.notes.push(note.id);
      });
    }

    dispatch(removeNotes(notesToRemove));
    dispatch(removeHits(hitsToRemove));
    dispatch(addHits(hitsToAdd));
    dispatch(addNotes(notesToAdd));
    dispatch(updateBeat(newBeat));
  };

  return (
    <div>
      <div className={styles.beat}>
        {notes.map((noteId) => (
          <Note id={noteId} key={noteId} />
        ))}
      </div>
      <select value={String(division)} onChange={onDivisionChange}>
        <option value="1">Quarter notes</option>
        <option value="2">8th notes</option>
        <option value="3">Triplets</option>
        <option value="4">16th notes</option>
        <option value="5">Quintuplet</option>
        <option value="6">Sextuplets</option>
        <option value="7">7</option>
        <option value="8">32th notes</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
    </div>
  );
};
