import React from 'react';
import { Hit } from '../Hit/Hit';
import { useSelector } from 'react-redux';
import { selectHits } from '../../../store/hits';
import { Note } from '../../../store/beats';
import styles from './Note.module.scss';

type Props = {
  note: Note;
}

const Note = ({ note }: Props) => {
  const requiredHits = Object.values(note);
  const hits = useSelector(selectHits(requiredHits));

  return (
    <div className={styles.note}>
      {hits.map((hit) => (
        <Hit id={hit.id} key={hit.id} />
      ))}
    </div>
  );
};

export { Note };
