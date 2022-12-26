import React from 'react';
import { times } from '../../../lib/utils';
import { Note } from '../Note/Note';
import { ID } from '../../../lib/types';
import { useSelector } from 'react-redux';
import { Beat, selectBeat } from '../../../store/beats';
import styles from './Beat.module.scss';

type Props = {
  id: ID;
}

const Beat = ({ id }: Props) => {
  const { division, notes }: Beat = useSelector(selectBeat(id));
  const notesEntries = Object.entries(notes);

  return (
    <div className={styles.beat}>
      {times(division, (_, index) => {
        const currentNote = {};
        notesEntries.forEach(([key, notes]) => {
          currentNote[key] = notes[index];
        });

        return (
          <Note
            note={currentNote}
            key={index}
          />
        );
      })}
    </div>
  );
};

export { Beat };
