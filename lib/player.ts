import { noop } from 'lodash';
import { store } from '../store';
import { Drum, HitType, ID, Metre, MetronomeSound } from './types';
import { setMeasureId, setNoteId } from '../store/general';

const A_MINUTE = 1000 * 60;

/* Yeah, yeah I know it's against the rules to use store directly but in this case the time is crucial
 * and connecting Player to the store directly improves performance *a lot* */
class Player {
  _playing = false;
  onStop = noop;

  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
    this.setOnStop = this.setOnStop.bind(this);
  }

  async playNote(noteId: ID, duration: number, beatIndex: number, noteIndex: number) {
    const state = store.getState();
    const note = state.notes[noteId];

    if (this.playing) {
      return new Promise<void>((resolve) => {
        const toPlay = [];

        if (state.metronome.on && noteIndex === 0) {
          const beep = new Audio(
            state.metronome.tune[beatIndex === 0 ? MetronomeSound.ONE : MetronomeSound.BASIC]
          );
          beep.volume = state.metronome.volume / 100;

          toPlay.push(beep);
        }

        Object.entries(note.drums).forEach(([drum, hitId]: [Drum, ID]) => {
          const hit = state.hits[hitId];

          if (hit.hit) {
            const sound = new Audio(state.drumKit.drumKit[drum][hit.hitType]);

            if (hit.hitType === HitType.GHOST) {
              sound.volume = 0.17;
            } else if (hit.hitType === HitType.ACCENT) {
              sound.volume = 1;
            } else {
              sound.volume = 0.7;
            }

            toPlay.push(sound);
          }
        });

        if (toPlay.length) {
          this.setActiveNoteId(noteId);
          toPlay.forEach((sound) => sound.play());
        }

        setTimeout(() => resolve(), duration);
      });
    }

    return Promise.resolve();
  }

  async playBeat(beatId: ID, metreBase: Metre[1], beatIndex: number) {
    const beatLength = A_MINUTE / this.tempo / (metreBase / 4);
    const state = store.getState();
    const beat = state.beats[beatId];

    for (const note of beat.notes) {
      await this.playNote(note, beatLength / beat.division, beatIndex, beat.notes.indexOf(note));
    }
  }

  async playMeasure(measureId: ID) {
    const state = store.getState();
    const measure = state.measures.hashmap[measureId];

    for (const beat of measure.beats) {
      await this.playBeat(beat, measure.metre[1], measure.beats.indexOf(beat));
    }
  }

  async play() {
    const state = store.getState();

    if (this.playing) {
      const measures = state.measures.order;

      for (const measureId of measures) {
        this.setActiveMeasureId(measureId);
        await this.playMeasure(measureId);
      }

      return this.play();
    }

    return Promise.resolve();
  }

  get playing() {
    return this._playing && !!Object.keys(store.getState().measures).length;
  }

  set playing(playing) {
    this._playing = playing;

    if (!playing) {
      this.onStop();
    }
  }

  get tempo() {
    return store.getState().general.tempo;
  }

  setActiveNoteId(id) {
    store.dispatch(setNoteId(id));
  }

  setActiveMeasureId(id) {
    store.dispatch(setMeasureId(id));
  }

  setOnStop(cb) {
    this.onStop = cb;
  }

  start() {
    this.playing = true;
    this.play();
  }

  stop() {
    this.playing = false;
  }

  togglePlaying() {
    if (this.playing) {
      this.stop();
    } else {
      this.start();
    }
  }
}

export const player = new Player();
