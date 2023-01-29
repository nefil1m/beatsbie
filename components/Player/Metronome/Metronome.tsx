import styles from './Metronome.module.scss';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectMetronomeOn, toggleMetronome } from '../../../store/metronome';

export const Metronome = () => {
  const dispatch = useAppDispatch();
  const on = useAppSelector(selectMetronomeOn);

  const onMetronomeToggle = ({ target: { checked } }) => {
    dispatch(toggleMetronome(checked));
  };

  return (
    <div className={styles.metronome}>
      <div className={styles.onOffWrapper}>
        <div className={styles.metronomeIcon}>
          <RiNumber1 />
          <RiNumber2 />
          <RiNumber3 />
          <RiNumber4 />
        </div>
        <input onChange={onMetronomeToggle} type="checkbox" checked={on} />
      </div>
    </div>
  );
};
