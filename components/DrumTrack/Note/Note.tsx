import React from 'react';
import { Hit } from '../Hit/Hit';
import styles from './Note.module.scss';
import classNames from 'classnames';
import { NotePointed as TNote, selectNote } from '../../../store/notes';
import { Drum, ID } from '../../../lib/types';
import { selectActiveNoteId } from '../../../store/general';
import { useAppSelector } from '../../../store';

type Props = {
  id: ID;
};

export const Note = ({ id }: Props) => {
  const note: TNote = useAppSelector(selectNote(id));
  const activeNoteId = useAppSelector(selectActiveNoteId);

  return (
    <div
      className={classNames(styles.note, {
        [styles.noteActive]: activeNoteId === id,
      })}
    >
      {Object.entries(note.drums).map(([drum, hitId]: [Drum, ID]) => (
        <Hit id={hitId} key={hitId} drum={drum} />
      ))}
    </div>
  );
};
