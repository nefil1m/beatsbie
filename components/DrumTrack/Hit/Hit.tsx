import React from 'react';
import styles from './Hit.module.scss';
import { ID } from '../../../lib/types';

type Props = {
  id: ID;
}

const Hit = ({ id }: Props) => {
  return (
    <div className={styles.hit}>
      hit
    </div>
  )
}

export { Hit }
