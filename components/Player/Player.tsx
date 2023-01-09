import React, { useEffect } from 'react';
import { MetalDrumKit } from '../../lib/drumkits';
import { DrumKit, HitType } from '../../lib/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectAll } from '../../store';
import { selectTempo, setMeasureIndex, setNoteId } from '../../store/general';
import { player } from '../../lib/player';
import { Hit } from '../../store/hits';

const getHitsByNote = (drumkit: DrumKit, drums: Hit[]) => {
  const out = [];

  Object.entries(drums).forEach(([drum, hit]) => {
    if (hit.hit) {
      const drumDef = drumkit[drum];
      const hitSound = drumDef[hit.hitType] || drumDef[HitType.NORMAL];

      out.push(new Audio(hitSound));
    }
  });

  return out;
};

const trackToQueue = (drumkit: DrumKit, measures) => {
  const out = [];

  measures.forEach(({ beats }) => {
    const m = [];

    beats.forEach(({ division, notes }) => {
      notes.forEach((note) => {
        m.push({
          id: note.id,
          value: division,
          toPlay: getHitsByNote(drumkit, note.drums),
        })
      })
    });

    out.push(m);
  });

  return out;
};


const Player = () => {
  const allState = useSelector(selectAll);
  const tempo = useSelector(selectTempo)
  const dispatch = useDispatch();

  useEffect(() => {
    player.init({
      onMeasureIndexChange: (index) => dispatch(setMeasureIndex(index)),
      onNoteIdChange: (id) => dispatch(setNoteId(id)),
      onStop: () => {
        dispatch(setMeasureIndex(0));
        dispatch(setNoteId(null));
      },
  })
  }, [dispatch])

  useEffect(() => {
    player.tempo = tempo;
  }, [tempo]);

  useEffect(() => {
    player.queue = trackToQueue(MetalDrumKit, allState);
  }, [allState]);

  return (
    <button onClick={player.togglePlaying}>play</button>
  );
};

export { Player };