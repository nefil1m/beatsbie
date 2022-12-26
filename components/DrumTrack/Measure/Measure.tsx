import React from 'react';
import {useSelector} from "react-redux";
import { ID } from '../../../lib/types';
import {Beat} from "../Beat/Beat";
import { selectMeasure } from '../../../store/measures';
import styles from './Measure.module.scss';

type Props = {
  id: ID;
}

const MeasureComponent = ({id}: Props) => {
  const { beats } = useSelector(selectMeasure(id));

  return (
    <div className={styles.measure}>
      {beats.map((beatId) => <Beat id={beatId} key={beatId}/>)}
    </div>
  );
}

export {MeasureComponent as Measure};
