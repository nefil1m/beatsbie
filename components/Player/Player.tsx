import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MetalDrumKit } from '../../lib/drumKits';
import { DrumKit, HitType } from '../../lib/types';
import { retrieveTrack } from '../../store';
import { selectTempo, setMeasureIndex, setNoteId, setTempo } from '../../store/general';
import { player } from '../../lib/player';
import { Hit } from '../../store/hits';
import styles from './Player.module.scss';
import { Button, ButtonShape, ButtonSize, ButtonStyle } from '../Button/Button';
import { RiPlayLine, RiStopLine, RiTimerLine } from 'react-icons/ri';

const getHitsByNote = (drumKit: DrumKit, drums: Hit[]) => {
  const out = [];

  Object.entries(drums).forEach(([drum, hit]) => {
    if (hit.hit) {
      const drumDef = drumKit[drum];
      const hitSound = drumDef[hit.hitType] || drumDef[HitType.NORMAL];

      out.push(new Audio(hitSound));
    }
  });

  return out;
};

const trackToQueue = (drumKit: DrumKit, measures) => {
  const out = [];

  measures.forEach(({ beats }) => {
    const m = [];

    beats.forEach(({ division, notes }) => {
      notes.forEach((note) => {
        m.push({
          id: note.id,
          value: division,
          toPlay: getHitsByNote(drumKit, note.drums),
        });
      });
    });

    out.push(m);
  });

  return out;
};

export const Player = () => {
  const allState = useSelector(retrieveTrack);
  const tempo = useSelector(selectTempo);
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    player.init({
      onMeasureIndexChange: (index) => dispatch(setMeasureIndex(index)),
      onNoteIdChange: (id) => dispatch(setNoteId(id)),
      onStop: () => {
        setIsPlaying(false);
        dispatch(setMeasureIndex(null));
      },
    });
  }, [dispatch]);

  useEffect(() => {
    player.tempo = tempo;
  }, [tempo]);

  useEffect(() => {
    player.queue = trackToQueue(MetalDrumKit, allState);
  }, [allState]);

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
