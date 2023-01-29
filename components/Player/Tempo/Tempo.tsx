import styles from './Tempo.module.scss';
import { RiTimerLine } from 'react-icons/ri';
import { selectTempo, setTempo } from '../../../store/general';
import { useAppDispatch, useAppSelector } from '../../../store';

export const Tempo = () => {
  const tempo = useAppSelector(selectTempo);
  const dispatch = useAppDispatch();

  const onTempoChange = ({ target: { value } }) => {
    dispatch(setTempo(Number(value)));
  };

  return (
    <div className={styles.tempo}>
      <RiTimerLine />
      <input onChange={onTempoChange} value={tempo} className={styles.tempoInput} />
    </div>
  );
};
