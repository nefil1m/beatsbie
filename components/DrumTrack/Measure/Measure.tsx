import React from 'react';
import { useSelector } from 'react-redux';
import { ID } from '../../../lib/types';
import { Beat } from '../Beat/Beat';
import { selectMeasure } from '../../../store/measures';
import styles from './Measure.module.scss';
import classNames from 'classnames';
import { selectActiveNoteIndex } from '../../../store/general';

type Props = {
  id: ID;
  active?: boolean;
}

const MeasureComponent = ({ id, active = false }: Props) => {
  const { beats } = useSelector(selectMeasure(id));

  return (
    <div className={classNames(styles.measure, { [styles.measureActive]: active })}>
      {beats.map((beatId) => <Beat id={beatId} key={beatId} />)}
    </div>
  );
};

export { MeasureComponent as Measure };
