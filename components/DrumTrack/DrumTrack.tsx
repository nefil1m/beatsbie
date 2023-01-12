import { Measure } from './Measure/Measure';
import { addMeasureThunk, selectMeasurePointers } from '../../store/measures';
import { selectActiveMeasureIndex } from '../../store/general';
import styles from './DrumTrack.module.scss';
import { Button, ButtonShape, ButtonSize } from '../Button/Button';
import { RiAddFill } from 'react-icons/ri';
import { Drums } from './Drums/Drums';
import { useAppDispatch, useAppSelector } from '../../store';

export const DrumTrack = () => {
  const measures = useAppSelector(selectMeasurePointers);
  const activeMeasureIndex = useAppSelector(selectActiveMeasureIndex);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(addMeasureThunk());
  };

  return (
    <div className={styles.drumTrack}>
      <Drums />
      {measures.map((measureId, index) => (
        <Measure id={measureId} key={measureId} active={index === activeMeasureIndex} />
      ))}
      <div>
        <Button size={ButtonSize.LG} shape={ButtonShape.CIRCLE} onClick={onClick}>
          <RiAddFill />
        </Button>
      </div>
    </div>
  );
};
