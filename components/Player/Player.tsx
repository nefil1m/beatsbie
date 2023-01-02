import React, { useRef, useState } from 'react';
import { MetalDrumKit } from '../../lib/drumkits';
import { HitType } from '../../lib/types';
import { useSelector } from 'react-redux';
import { selectAll } from '../../store';
import { times } from '../../lib/utils';
import { selectTempo } from '../../store/general';

const getHitsByNote = (drumkit, notes, count) => {
  const out = [];
  Object.entries(notes).forEach(([drum, hits]) => {
    const hit = hits[count];

    if (hit.hit) {
      const drumDef = drumkit[drum];
      const hitSound = drumDef[hit.hitType] || drumDef[HitType.NORMAL];

      out.push(new Audio(hitSound));
    }
  });

  return out;
};

const trackToQueue = (drumkit, measures) => {
  const out = [];

  measures.forEach(({ beats, metre: [, baseValue] }) => {
    const m = [];

    beats.forEach(({ division, notes }) => {
      times(division, (_, index) => {
        m.push({
          value: division,
          toPlay: getHitsByNote(drumkit, notes, index),
        });
      });
    });

    out.push(m);
  });

  return out;
};

const A_MINUTE = 1000 * 60;

const playNote = async (note, beatLength) => {
  return new Promise((resolve) => {
    note.toPlay.forEach((hit) => {
      hit.play();
    });

    setTimeout(resolve, beatLength / note.value);
  });
};

const playMeasure = async (measure, beatLength) => {
  for (const hit of measure) {
    await playNote(hit, beatLength);
  }
};

const playQueue = async (queue, tempo, cb) => {
  const beatLength = A_MINUTE / tempo;

  for (const measure of queue) {
    await playMeasure(measure, beatLength);
  }

  return cb();
};

const Player = () => {
  const measures = useSelector(selectAll);
  const tempo = useSelector(selectTempo);
  const playingRef = useRef(false);

  const play = () => {
    const playLikeACrazy = async () => {
      if (playingRef.current) {
        await playQueue(trackToQueue(MetalDrumKit, measures), tempo, playLikeACrazy);
      }
    };

    playingRef.current = !playingRef.current;

    if (playingRef.current) {
      playLikeACrazy();
    }
  };

  return (
    <button onClick={play}>play</button>
  );
};

export { Player };
