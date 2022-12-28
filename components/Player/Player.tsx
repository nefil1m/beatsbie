import React from 'react';
import { MetalDrumKit } from '../../lib/drumkits';
import { Drum, HitType } from '../../lib/types';
// import { useSelector } from 'react-redux';

const Player = () => {
  // const [drums, setDrums] = useState({});
  // const rootState = useSelector((state) => state);
  // useEffect(() => {
  //   setDrums(Object.keys(MetalDrumKit).reduce((all, current) => ({
  //     ...all,
  //     [current]: new Audio(MetalDrumKit[current][HitType.NORMAL]),
  //   }), {}));
  // }, []);

  const play = () => {
    new Audio(MetalDrumKit[Drum.SNARE][HitType.NORMAL]).play();
  }

  return (
    <button onClick={play}>play</button>
  );
}

export { Player }
