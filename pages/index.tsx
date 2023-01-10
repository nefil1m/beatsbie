import Head from 'next/head';
import { Player } from '../components/Player/Player';
import { DrumTrack } from '../components/DrumTrack/DrumTrack';

export default function Home() {
  return (
    <>
      <Head>
        <title>Beatsby</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <Player />
        <DrumTrack />
      </main>
    </>
  );
}
