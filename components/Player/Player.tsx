import React from 'react';
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
    beats.forEach(({ division, notes }) => {
      times(division, (_, index) => {
        out.push({
          value: baseValue * division,
          toPlay: getHitsByNote(drumkit, notes, index),
        });
      });
    });
  });

  return out;
};

const A_MINUTE = 1000 * 60;

const playNote = async (note, wholeNoteLength) => {
  return new Promise((resolve) => {
    note.toPlay.forEach((hit) => {
      hit.play();
    });

    setTimeout(resolve, wholeNoteLength / note.value);
  });
};

const playMeasure = async (measure, wholeNoteLength) => {
  for (const hit of measure) {
    await playNote(hit, wholeNoteLength);
  }
};

const playQueue = async (queue, tempo) => {
  const wholeNoteLength = A_MINUTE / tempo;
  await playMeasure(queue, wholeNoteLength);
};

const Player = () => {
  const measures = useSelector(selectAll);
  const tempo = useSelector(selectTempo);

  const play = () => {
    playQueue(trackToQueue(MetalDrumKit, measures), tempo);
  };

  return (
    <button onClick={play}>play</button>
  );
};

export { Player };
