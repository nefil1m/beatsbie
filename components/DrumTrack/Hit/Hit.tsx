import React from 'react';
import styles from './Hit.module.scss';
import { Drum, HitType, ID } from '../../../lib/types';
import classNames from 'classnames';
import { changeHitType, selectHit, toggleHit } from '../../../store/hits';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectDrumKit } from '../../../store/drumKit';
import {
  RiArrowRightSLine,
  RiParenthesesLine,
  RiRecordCircleFill,
  RiAlarmWarningLine,
  RiMenuFill,
  RiCloseLine,
} from 'react-icons/ri';

type Props = {
  id: ID;
  drum: Drum;
};

export const Hit = ({ id, drum }: Props) => {
  const dispatch = useAppDispatch();
  const drumKit = useAppSelector(selectDrumKit);
  const { hit, hitType } = useAppSelector(selectHit(id));

  const onClick = (e) => {
    if (e.ctrlKey) {
      dispatch(changeHitType({ id, drum }));
    } else {
      if (!hit) {
        new Audio(drumKit[drum][hitType]).play();
      }
      dispatch(toggleHit(id));
    }
    console.log(e.ctrlKey);
  };

  return (
    <button
      onClick={onClick}
      className={classNames(styles.hit, {
        [styles.hitActive]: hit,
      })}
    >
      {hitType === HitType.ACCENT && <RiArrowRightSLine />}
      {hitType === HitType.GHOST && <RiParenthesesLine />}
      {hitType === HitType.OPEN && <RiRecordCircleFill />}
      {hitType === HitType.BELL && <RiAlarmWarningLine />}
      {hitType === HitType.CROSS_STICK && <RiCloseLine />}
      {hitType === HitType.BUZZ && <RiMenuFill />}
    </button>
  );
};
