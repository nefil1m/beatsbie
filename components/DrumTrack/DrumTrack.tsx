import { Measure } from './Measure/Measure';
import { useDispatch, useSelector } from 'react-redux';
import { addMeasure, selectMeasurePointers } from '../../store/measures';
import { selectActiveMeasureIndex } from '../../store/general';
import styles from './DrumTrack.module.scss';
import { Button, ButtonShape, ButtonSize } from '../Button/Button';
import { RiAddFill } from 'react-icons/ri';
import { identity, last } from 'lodash';
import { addHits } from '../../store/hits';
import { addNotes } from '../../store/notes';
import { addBeats } from '../../store/beats';
import { cloneMeasure } from '../../lib/generators';

export const DrumTrack = () => {
  const measures = useSelector(selectMeasurePointers);
  const activeMeasureIndex = useSelector(selectActiveMeasureIndex);
  const allState = useSelector(identity);
  const lastMeasureId = last(measures);
  const dispatch = useDispatch();

  const onClick = () => {
    const { measure, beats, notes, hits } = cloneMeasure(lastMeasureId, allState);
    dispatch(addHits(hits));
    dispatch(addNotes(notes));
    dispatch(addBeats(beats));
    dispatch(addMeasure(measure));
  };

  return (
    <div className={styles.drumTrack}>
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
