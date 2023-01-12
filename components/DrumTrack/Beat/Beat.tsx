import React from 'react';
import { Note } from '../Note/Note';
import { ID } from '../../../lib/types';
import { Beat as TBeat, changeBeatDivisionThunk, selectBeat } from '../../../store/beats';
import styles from './Beat.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';

type Props = {
  id: ID;
};

export const Beat = ({ id }: Props) => {
  const beat: TBeat = useAppSelector(selectBeat(id));
  const dispatch = useAppDispatch();
  const { notes, division } = beat;

  const onDivisionChange = ({ target: { value } }) => {
    dispatch(changeBeatDivisionThunk(id, Number(value)));
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
