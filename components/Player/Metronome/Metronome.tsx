import styles from './Metronome.module.scss';
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  selectMetronomeOn,
  selectMetronomeVolume,
  setMetronomeVolume,
  toggleMetronome,
} from '../../../store/metronome';
import { Slider } from '../../Slider/Slider';
import { useState } from 'react';

export const Metronome = () => {
  const metronomeVolume = useAppSelector(selectMetronomeVolume);
  const on = useAppSelector(selectMetronomeOn);
  const dispatch = useAppDispatch();
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);

  const onMetronomeToggle = () => {
    dispatch(toggleMetronome(!on));
  };

  const onMetronomeVolumeChange = (newVolume) => {
    dispatch(setMetronomeVolume(newVolume));
  };

  const onMouseEnter = () => setIsVolumeSliderVisible(true);
  const onMouseLeave = () => setIsVolumeSliderVisible(false);

  return (
    <div className={styles.metronome} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={styles.onOffWrapper}>
        <div className={styles.metronomeIcon}>
          <RiNumber1 />
          <RiNumber2 />
          <RiNumber3 />
          <RiNumber4 />
        </div>
        <div className={styles.volumeWrapper}>
          {isVolumeSliderVisible && (
            <div className={styles.volumeDropdown}>
              <Slider
                onChange={onMetronomeVolumeChange}
                min={0}
                max={100}
                value={metronomeVolume}
              />
            </div>
          )}
          <button type="button" onClick={onMetronomeToggle} className={styles.volumeButton}>
            {on ? <RiVolumeUpLine /> : <RiVolumeMuteLine />}
          </button>
        </div>
      </div>
    </div>
  );
};
