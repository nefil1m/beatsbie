import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Measure } from '../components/DrumTrack/Measure/Measure';
import { useSelector } from 'react-redux';
import { selectMeasurePointers } from '../store/measures';
import { Player } from '../components/Player/Player';
import { selectActiveMeasureIndex } from '../store/general';

export default function Home() {
  const measures = useSelector(selectMeasurePointers);
  const activeMeasureIndex = useSelector(selectActiveMeasureIndex);

  return (
    <>
      <Head>
        <title>Beatsby</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <Player/>
        {measures.map((measureId, index) => (
          <Measure
            id={measureId}
            key={measureId}
            active={index === activeMeasureIndex}
          />
        ))}
      </main>
    </>
  );
}
