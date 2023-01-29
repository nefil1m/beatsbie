import { useEffect, useState } from 'react';
import { player } from '../../lib/player';
import styles from './Player.module.scss';
import { Button, ButtonShape, ButtonSize, ButtonStyle } from '../Button/Button';
import { RiPlayLine, RiStopLine } from 'react-icons/ri';
import { Tempo } from './Tempo/Tempo';
import { Metronome } from './Metronome/Metronome';

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    player.setOnStop(() => setIsPlaying(false));
  }, [setIsPlaying]);

  return (
    <div className={styles.player}>
      <Tempo />
      <div className={styles.playBtnWrapper}>
        <Button
          onClick={() => {
            player.togglePlaying();
            setIsPlaying(!isPlaying);
          }}
          shape={ButtonShape.CIRCLE}
          className={styles.playBtn}
          size={ButtonSize.XL}
          btnStyle={isPlaying ? ButtonStyle.ERROR : ButtonStyle.SUCCESS}
        >
          {isPlaying ? <RiStopLine /> : <RiPlayLine />}
        </Button>
      </div>
      <Metronome />
    </div>
  );
};
