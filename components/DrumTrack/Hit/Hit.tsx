import React from 'react';
import styles from './Hit.module.scss';
import { ID } from '../../../lib/types';
import classNames from 'classnames';
import { selectHit, toggleHit } from '../../../store/hits';
import { useAppDispatch, useAppSelector } from '../../../store';

type Props = {
  id: ID;
};

export const Hit = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const hit = useAppSelector(selectHit(id));

  return (
    <button
      onClick={() => dispatch(toggleHit(id))}
      className={classNames(styles.hit, {
        [styles.hitActive]: hit.hit,
      })}
    />
  );
};
