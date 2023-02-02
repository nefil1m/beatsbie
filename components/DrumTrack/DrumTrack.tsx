import { Measure } from './Measure/Measure';
import { cloneLastMeasureThunk, selectMeasurePointers } from '../../store/measures';
import { selectActiveMeasureId } from '../../store/general';
import styles from './DrumTrack.module.scss';
import { Button, ButtonShape, ButtonSize } from '../Button/Button';
import { RiAddFill } from 'react-icons/ri';
import { Drums } from './Drums/Drums';
import { useAppDispatch, useAppSelector } from '../../store';

export const DrumTrack = () => {
  const measures = useAppSelector(selectMeasurePointers);
  const activeMeasureIid = useAppSelector(selectActiveMeasureId);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cloneLastMeasureThunk());
  };

  return (
    <div className={styles.drumTrack}>
      <Drums />
      {measures.map((measureId) => (
        <Measure id={measureId} key={measureId} active={measureId === activeMeasureIid} />
      ))}
      <div>
        <Button size={ButtonSize.LG} shape={ButtonShape.CIRCLE} onClick={onClick}>
          <RiAddFill />
        </Button>
      </div>
    </div>
  );
};
