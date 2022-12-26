import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { Measure } from '../components/DrumTrack/Measure/Measure';
import { useSelector } from 'react-redux';
import { selectMeasurePointers } from '../store/measures';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const measures = useSelector(selectMeasurePointers);

  return (
    <>
      <Head>
        <title>Beatsby</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        {measures.map((measureId) => <Measure id={measureId} key={measureId}/>)}
      </main>
    </>
  );
}
