import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ID } from '../../../lib/types';
import { Beat } from '../Beat/Beat';
import { selectMeasure } from '../../../store/measures';
import styles from './Measure.module.scss';
import classNames from 'classnames';

type Props = {
  id: ID;
  active?: boolean;
};

export const Measure = ({ id, active = false }: Props) => {
  const { beats } = useSelector(selectMeasure(id));
  const ref = useRef();

  useEffect(() => {
    if (ref.current && active) {
      (ref.current as HTMLDivElement).scrollIntoView();
    }
  });

  return (
    <div className={classNames(styles.measure, { [styles.measureActive]: active })} ref={ref}>
      {beats.map((beatId) => (
        <Beat id={beatId} key={beatId} />
      ))}
    </div>
  );
};
