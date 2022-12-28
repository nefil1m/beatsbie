import React from 'react';
import styles from './Hit.module.scss';
import { ID } from '../../../lib/types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectHit, toggleHit } from '../../../store/hits';

type Props = {
  id: ID;
}

const Hit = ({ id }: Props) => {
  const dispatch = useDispatch();
  const hit = useSelector(selectHit(id));

  return (
    <button
      onClick={() => dispatch(toggleHit(id))}
      className={classNames(styles.hit, {
        [styles.hitActive]: hit.hit,
      })}
    />
  );
};

export { Hit };
