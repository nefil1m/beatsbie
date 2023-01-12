import React from 'react';
import styles from './Hit.module.scss';
import { Drum, HitType, ID } from '../../../lib/types';
import classNames from 'classnames';
import { selectHit, toggleHit } from '../../../store/hits';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectDrumKit } from '../../../store/drumKit';

type Props = {
  id: ID;
  drum: Drum;
};

export const Hit = ({ id, drum }: Props) => {
  const dispatch = useAppDispatch();
  const drumKit = useAppSelector(selectDrumKit);
  const hit = useAppSelector(selectHit(id));

  const onClick = () => {
    if (!hit.hit) {
      new Audio(drumKit[drum][HitType.NORMAL]).play();
    }
    dispatch(toggleHit(id));
  };

  return (
    <button
      onClick={onClick}
      className={classNames(styles.hit, {
        [styles.hitActive]: hit.hit,
      })}
    />
  );
};
