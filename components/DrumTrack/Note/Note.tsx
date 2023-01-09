import React from 'react';
import { Hit } from '../Hit/Hit';
import { useSelector } from 'react-redux';
import styles from './Note.module.scss';
import classNames from 'classnames';
import { Note, selectNote } from '../../../store/notes';
import { ID } from '../../../lib/types';
import { selectActiveNoteId } from '../../../store/general';

type Props = {
  id: ID;
}

const Note = ({ id }: Props) => {
  const note: Note = useSelector(selectNote(id));
  const activeNoteId = useSelector(selectActiveNoteId);

  return (
    <div className={classNames(styles.note, { [styles.noteActive]: activeNoteId === id})}>
      {Object.values(note.drums).map((hitId) => (
        <Hit id={hitId} key={hitId} />
      ))}
    </div>
  );
};

export { Note };