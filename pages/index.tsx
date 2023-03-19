import Head from 'next/head';
import { Player } from '../components/Player/Player';
import { DrumTrack } from '../components/DrumTrack/DrumTrack';
import { SoundPreloader } from '../components/SoundPreloader/SoundPreloader';
import { useHotkey, useRegisterHotkeyHandler } from '../hooks/useHotkey';
import { useAppDispatch } from '../store';
import { redoThunk, undoThunk } from '../store/history';

export default function Home() {
  const dispatch = useAppDispatch();

  useRegisterHotkeyHandler();

  useHotkey(['Ctrl', 'z'], () => dispatch(undoThunk()));
  useHotkey(['Ctrl', 'shIft', 'z'], () => dispatch(redoThunk()));
  useHotkey(['CTRL', 'Y'], () => dispatch(redoThunk()));

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
