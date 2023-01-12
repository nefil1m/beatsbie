import React, { useEffect, useRef } from 'react';
import { ID } from '../../../lib/types';
import { Beat } from '../Beat/Beat';
import { removeMeasureThunk, selectMeasure } from '../../../store/measures';
import styles from './Measure.module.scss';
import classNames from 'classnames';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../store';

type Props = {
  id: ID;
  active?: boolean;
};

export const Measure = ({ id, active = false }: Props) => {
  const dispatch = useAppDispatch();
  const { beats } = useAppSelector(selectMeasure(id));
  const ref = useRef();

  useEffect(() => {
    if (ref.current && active) {
      (ref.current as HTMLDivElement).scrollIntoView();
    }
  });

  const onDelete = () => {
    dispatch(removeMeasureThunk(id));
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
