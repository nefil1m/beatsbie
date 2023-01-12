import { useAppSelector } from '../../store';
import { selectDrumKit } from '../../store/drumKit';
import { useEffect, useState } from 'react';
import { uniq } from 'lodash';

export const SoundPreloader = () => {
  const drumKit = useAppSelector(selectDrumKit);
  const [soundsList, setSoundsList] = useState([]);

  useEffect(() => {
    setSoundsList(
      uniq(
        Object.values(drumKit).reduce(
          (all: string[], current) => [...all, ...Object.values(current)],
          []
        ) as string[]
      )
    );
  }, [drumKit]);

  return (
    <>
      {soundsList.map((src) => (
        <link rel="prefetch" href={src} key={src} as="audio" />
      ))}
    </>
  );
};
