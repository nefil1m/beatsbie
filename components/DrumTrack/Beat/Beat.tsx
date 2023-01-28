import React from 'react';
import { Note } from '../Note/Note';
import { ID, Metre } from '../../../lib/types';
import { BeatPointed as TBeat, changeBeatDivisionThunk, selectBeat } from '../../../store/beats';
import styles from './Beat.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { times } from 'lodash';
import { Select } from '../../Select/Select';

type Props = {
  id: ID;
  metre: Metre;
};

const labelByMetreBaseAndValue = {
  4: {
    1: 'Quarter notes',
    2: '8th notes',
    3: '8th note triplets',
    4: '16th notes',
    5: '5',
    6: '16th note triplets',
    7: '7',
    8: '32nd notes',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
  },
  8: {
    1: '8th notes',
    2: '16th notes',
    3: '16th note triplets',
    4: '32nd notes',
    5: '5',
    6: '32nd note triplets',
    7: '7',
    8: '64th notes',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
  },
  16: {
    1: '16th notes',
    2: '32nd notes',
    3: '32nd note triplets',
    4: '64th notes',
    5: '5',
    6: '64th note triplets',
    7: '7',
    8: '128th notes',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
  },
};

export const Beat = ({ id, metre }: Props) => {
  const beat: TBeat = useAppSelector(selectBeat(id));
  const dispatch = useAppDispatch();
  const { notes, division } = beat;

  const onDivisionChange = (newDivision) => {
    dispatch(changeBeatDivisionThunk(id, Number(newDivision)));
  };

  return (
    <div>
      <div className={styles.beat}>
        {notes.map((noteId) => (
          <Note id={noteId} key={noteId} />
        ))}
      </div>
      <Select
        onChange={onDivisionChange}
        items={times(12, (index) => ({
          value: index + 1,
          label: labelByMetreBaseAndValue[metre[1]][index + 1],
        }))}
        value={division}
      />
    </div>
  );
};
