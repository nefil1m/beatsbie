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

  const onMetrePulseChange = ({ target: { value: measure } }) => {
    dispatch(changeMetrePulseThunk(id, Number(measure)));
  };

  const onMetreBaseChange = ({ target: { value: base } }) => {
    dispatch(changeMetreBaseThunk(id, Number(base)));
  };

  return (
    <div>
      <div>
        <select value={metre[0]} onChange={onMetrePulseChange}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
        </select>
        /
        <select value={metre[1]} onChange={onMetreBaseChange}>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
        </select>
      </div>
      <div className={classNames(styles.measure, { [styles.measureActive]: active })} ref={ref}>
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
