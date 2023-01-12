import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectTempo, setTempo } from '../../store/general';
import { player } from '../../lib/player';
import styles from './Player.module.scss';
import { Button, ButtonShape, ButtonSize, ButtonStyle } from '../Button/Button';
import { RiPlayLine, RiStopLine, RiTimerLine } from 'react-icons/ri';

export const Player = () => {
  const tempo = useAppSelector(selectTempo);
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    player.setOnStop(() => setIsPlaying(false));
  }, [setIsPlaying]);

  const onTempoChange = ({ target: { value } }) => {
    dispatch(setTempo(Number(value)));
  };

  return (
    <div className={styles.player}>
      <div className={styles.tempo}>
        <RiTimerLine />
        <input onChange={onTempoChange} value={tempo} className={styles.tempoInput} />
      </div>
      <div className={styles.playBtnWrapper}>
        <Button
          onClick={() => {
            player.togglePlaying();
            setIsPlaying(true);
          }}
          shape={ButtonShape.CIRCLE}
          className={styles.playBtn}
          size={ButtonSize.XL}
          btnStyle={isPlaying ? ButtonStyle.ERROR : ButtonStyle.SUCCESS}
        >
          {isPlaying ? <RiStopLine /> : <RiPlayLine />}
        </Button>
      </div>
      <span />
    </div>
  );
};
