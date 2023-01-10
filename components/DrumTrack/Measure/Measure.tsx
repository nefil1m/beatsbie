import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ID } from '../../../lib/types';
import { Beat } from '../Beat/Beat';
import { removeMeasure, selectMeasure } from '../../../store/measures';
import styles from './Measure.module.scss';
import classNames from 'classnames';
import { RiCloseCircleLine } from 'react-icons/ri';
import { removeBeats } from '../../../store/beats';
import { retrieveMeasure, RootState } from '../../../store';
import { removeNotes } from '../../../store/notes';
import { removeHits } from '../../../store/hits';

type Props = {
  id: ID;
  active?: boolean;
};

export const Measure = ({ id, active = false }: Props) => {
  const dispatch = useDispatch();
  const { beats } = useSelector(selectMeasure(id));
  const measure = useSelector((state: RootState) =>
    retrieveMeasure(id, state.hits, state.notes, state.beats, state.measures)
  );
  const ref = useRef();

  useEffect(() => {
    if (ref.current && active) {
      (ref.current as HTMLDivElement).scrollIntoView();
    }
  });

  const onDelete = () => {
    const notesToRemove = [];
    const hitsToRemove = [];

    measure.beats.forEach(({ notes }) => {
      notesToRemove.push(...notes.map(({ id }) => id));
      notes.forEach(({ drums }) => {
        hitsToRemove.push(...Object.values(drums).map(({ id }) => id));
      });
    });

    dispatch(removeMeasure(measure.id));
    dispatch(removeBeats(beats));
    dispatch(removeNotes(notesToRemove));
    dispatch(removeHits(hitsToRemove));
  };

  return (
    <div className={classNames(styles.measure, { [styles.measureActive]: active })} ref={ref}>
      {beats.map((beatId) => (
        <Beat id={beatId} key={beatId} />
      ))}
      <button type="button" onClick={onDelete} className={styles.deleteBtn}>
        <RiCloseCircleLine />
      </button>
    </div>
  );
};
