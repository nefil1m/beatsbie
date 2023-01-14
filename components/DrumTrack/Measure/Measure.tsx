import React, { useEffect, useRef } from 'react';
import { ID } from '../../../lib/types';
import { Beat } from '../Beat/Beat';
import {
  changeMetreBaseThunk,
  changeMetrePulseThunk,
  removeMeasureThunk,
  selectMeasure,
} from '../../../store/measures';
import styles from './Measure.module.scss';
import classNames from 'classnames';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../store';
import { Select } from '../../Select/Select';
import { Josefin_Sans } from '@next/font/google';

const font2 = Josefin_Sans({ weight: '700' });

type Props = {
  id: ID;
  active?: boolean;
};

export const Measure = ({ id, active = false }: Props) => {
  const dispatch = useAppDispatch();
  const { beats, metre } = useAppSelector(selectMeasure(id));
  const ref = useRef();

  useEffect(() => {
    if (ref.current && active) {
      (ref.current as HTMLDivElement).scrollIntoView();
    }
  });

  const onDelete = () => {
    dispatch(removeMeasureThunk(id));
  };

  const onMetrePulseChange = (pulse) => {
    dispatch(changeMetrePulseThunk(id, Number(pulse)));
  };

  const onMetreBaseChange = (base) => {
    dispatch(changeMetreBaseThunk(id, Number(base)));
  };

  return (
    <div className={classNames(styles.measure, { [styles.measureActive]: active })}>
      <div className={styles.metre}>
        <Select
          items={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          value={metre[0]}
          onChange={onMetrePulseChange}
          className={classNames(styles.metreSelect, font2.className)}
        />
        <Select
          items={[4, 8, 16]}
          value={metre[1]}
          onChange={onMetreBaseChange}
          className={classNames(styles.metreSelect, font2.className)}
        />
      </div>
      <div className={styles.measureBeats} ref={ref}>
        {beats.map((beatId) => (
          <Beat id={beatId} key={beatId} metre={metre} />
        ))}
        <button type="button" onClick={onDelete} className={styles.deleteBtn}>
          <RiCloseCircleLine />
        </button>
      </div>
    </div>
  );
};
