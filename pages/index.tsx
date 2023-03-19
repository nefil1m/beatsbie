import Head from 'next/head';
import { Player } from '../components/Player/Player';
import { DrumTrack } from '../components/DrumTrack/DrumTrack';
import { SoundPreloader } from '../components/SoundPreloader/SoundPreloader';

export default function Home() {
  return (
    <>
      <Head>
        <title>Beatsbie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Player />
        <DrumTrack />
        <SoundPreloader />
      </main>
    </>
  );
}
