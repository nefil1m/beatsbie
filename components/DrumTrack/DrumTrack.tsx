import { Measure } from './Measure/Measure';
import { useSelector } from 'react-redux';
import { selectMeasurePointers } from '../../store/measures';
import { selectActiveMeasureIndex } from '../../store/general';
import styles from './DrumTrack.module.scss';
import { Button, ButtonShape, ButtonSize } from '../Button/Button';
import { RiAddFill } from 'react-icons/ri';

export const DrumTrack = () => {
  const measures = useSelector(selectMeasurePointers);
  const activeMeasureIndex = useSelector(selectActiveMeasureIndex);

  return (
    <div className={styles.drumTrack}>
      {measures.map((measureId, index) => (
        <Measure id={measureId} key={measureId} active={index === activeMeasureIndex} />
      ))}
      <div>
        <Button size={ButtonSize.LG} shape={ButtonShape.CIRCLE}>
          <RiAddFill />
        </Button>
      </div>
    </div>
  );
};
