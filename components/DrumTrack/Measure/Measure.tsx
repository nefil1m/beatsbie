import React, { useEffect, useRef } from 'react';
import { ID, MetreBase, MetrePulse } from '../../../lib/types';
import { Beat } from '../Beat/Beat';
import {
  cloneLastMeasureThunk,
  changeMetreBaseThunk,
  changeMetrePulseThunk,
  removeMeasureThunk,
  selectMeasure,
  cloneMeasureThunk,
  addEmptyMeasureThunk,
} from '../../../store/measures';
import styles from './Measure.module.scss';
import classNames from 'classnames';
import { RiDeleteBin5Line, RiFileCopy2Line, RiAddLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../store';
import { Select } from '../../Select/Select';

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

  const onMetrePulseChange = (pulse: MetrePulse) => {
    dispatch(changeMetrePulseThunk(id, pulse));
  };

  const onMetreBaseChange = (base: MetreBase) => {
    dispatch(changeMetreBaseThunk(id, base));
  };

  const onNewMeasure = () => {
    dispatch(addEmptyMeasureThunk(metre, id));
  };

  const onCloneMeasure = () => {
    dispatch(cloneMeasureThunk(id));
  };

  return (
    <div className={classNames(styles.measure, { [styles.measureActive]: active })}>
      <div className={styles.metre}>
        <Select<MetrePulse>
          items={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          value={metre[0]}
          onChange={onMetrePulseChange}
          className={classNames(styles.metreSelect)}
        />
        <Select<MetreBase>
          items={[4, 8, 16]}
          value={metre[1]}
          onChange={onMetreBaseChange}
          className={classNames(styles.metreSelect)}
        />
      </div>
      <div className={styles.measureBeats} ref={ref}>
        {beats.map((beatId) => (
          <Beat id={beatId} key={beatId} metre={metre} />
        ))}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          title="Add new empty measure"
          onClick={onNewMeasure}
          className={classNames(styles.controlBtn, styles.addBtn)}
        >
          <RiAddLine />
        </button>
        <button
          type="button"
          title="Clone current measure"
          onClick={onCloneMeasure}
          className={classNames(styles.controlBtn, styles.cloneBtn)}
        >
          <RiFileCopy2Line />
        </button>
        <button
          type="button"
          title="Delete measure"
          onClick={onDelete}
          className={classNames(styles.controlBtn, styles.deleteBtn)}
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    </div>
  );
};
