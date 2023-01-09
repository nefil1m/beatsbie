import React from 'react';
import { Note } from '../Note/Note';
import { ID } from '../../../lib/types';
import { useSelector } from 'react-redux';
import { Beat, selectBeat } from '../../../store/beats';
import styles from './Beat.module.scss';

type Props = {
  id: ID;
}

const Beat = ({ id }: Props) => {
  const { notes }: Beat = useSelector(selectBeat(id));

  return (
    <div className={styles.beat}>
      {notes.map((noteId) => (
        <Note id={noteId} key={noteId} />
      ))}
    </div>
  );
};

export { Beat };
