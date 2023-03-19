import Head from 'next/head';
import { Player } from '../components/Player/Player';
import { DrumTrack } from '../components/DrumTrack/DrumTrack';
import { SoundPreloader } from '../components/SoundPreloader/SoundPreloader';
import { useHotkey, useRegisterHotkeyHandler } from '../hooks/useHotkey';

export default function Home() {
  useRegisterHotkeyHandler();
  useHotkey(['Ctrl', 'z'], () => console.log('undo'));
  useHotkey(['Ctrl', 'shIft', 'z'], () => console.log('redo'));
  useHotkey(['CTRL', 'Y'], () => console.log('REDO'));

  return (
    <>
      <Head>
        <title>Beatsbie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          background: process.env.NODE_ENV === 'production' ? 'transparent' : 'url(skulls.jfif)',
        }}
      >
        <Player />
        <DrumTrack />
        <SoundPreloader />
      </main>
    </>
  );
}
