import { addDrumThunk, removeDrumThunk, selectDrumKit, selectDrums } from '../../../store/drumKit';
import { Drum, HitType } from '../../../lib/types';
import styles from './Drums.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { RiCloseCircleLine } from 'react-icons/ri';
import React from 'react';
import { Select } from '../../Select/Select';

const drumLabels = {
  [Drum.HI_HAT]: 'Hi-hat',
  [Drum.SNARE]: 'Snare',
  [Drum.TOM1]: 'Tom 1',
  [Drum.TOM2]: 'Tom 2',
  [Drum.FLOOR1]: 'Floor tom',
  [Drum.KICK1]: 'Kick 1',
  [Drum.KICK2]: 'Kick 2',
  [Drum.CRASH1]: 'Crash 1',
  [Drum.CRASH2]: 'Crash 2',
  [Drum.RIDE]: 'Ride',
};

export const Drums = () => {
  const drums = useAppSelector(selectDrums);
  const drumKit = useAppSelector(selectDrumKit);
  const dispatch = useAppDispatch();

  const onDrumSelect = (value) => {
    new Audio(drumKit[value][HitType.NORMAL]).play();
    dispatch(addDrumThunk(value));
  };

  const onDrumDelete = (drum) => {
    dispatch(removeDrumThunk(drum));
  };

  const possibleDrums = Object.keys(Drum).filter((drum) => !drums.includes(drum));

  return (
    <div className={styles.drums}>
      {drums.map((drum) => {
        return (
          <p key={drum} className={styles.drum}>
            {drumLabels[drum]}
            <button type="button" onClick={() => onDrumDelete(drum)} className={styles.deleteBtn}>
              <RiCloseCircleLine />
            </button>
          </p>
        );
      })}
      {possibleDrums.length ? (
        <Select
          placeholder="Add drum..."
          items={possibleDrums.map((drum) => ({
            value: drum,
            label: drumLabels[drum],
          }))}
          onChange={onDrumSelect}
        />
      ) : null}
    </div>
  );
};
