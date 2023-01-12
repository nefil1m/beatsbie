import { addDrumThunk, selectDrums } from '../../../store/drumKit';
import { Drum } from '../../../lib/types';
import styles from './Drums.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';

const drumLabels = {
  [Drum.HI_HAT]: 'Hi-hat',
  [Drum.HI_HAT_FOOT]: 'Hi-hat kick',
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
  const dispatch = useAppDispatch();

  const onDrumSelect = ({ target: { value } }) => {
    dispatch(addDrumThunk(value));
  };

  return (
    <div className={styles.drums}>
      {drums.map((drum) => {
        return (
          <p key={drum} className={styles.drum}>
            {drumLabels[drum]}
          </p>
        );
      })}
      <select onChange={onDrumSelect} value="">
        <option>Add drum...</option>
        {Object.keys(Drum)
          .filter((drum) => !drums.includes(drum))
          .map((drum) => (
            <option value={drum} key={drum}>
              {drumLabels[drum]}
            </option>
          ))}
      </select>
    </div>
  );
};
