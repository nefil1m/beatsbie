import { noop } from 'lodash';
import { store } from '../store';
import { Drum, DrumKit, HitType, ID } from './types';
import { setMeasureIndex, setNoteId } from '../store/general';

const A_MINUTE = 1000 * 60;

const getHitSound = (drumKit: DrumKit, drum: Drum, hitType: HitType) => {
  return drumKit[drum][hitType] || drumKit[drum][HitType.NORMAL];
};

/* Yeah, yeah I know it's against the rules to use store directly but in this case the time is crucial
 * and connecting Player to the store directly improves performance *a lot* */
class Player {
  _playing = false;
  onStop = noop;

  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
  }

  async playNote(noteId: ID, duration: number) {
    const state = store.getState();
    const note = state.notes[noteId];

    if (this.playing) {
      return new Promise<void>((resolve) => {
        const toPlay = [];
        Object.entries(note.drums).forEach(([drum, hitId]: [Drum, ID]) => {
          const hit = state.hits[hitId];
          if (hit.hit) {
            toPlay.push(new Audio(getHitSound(state.drumKit.drumKit, drum, hit.hitType)));
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

  async playBeat(beatId: ID) {
    const beatLength = A_MINUTE / this.tempo;
    const state = store.getState();
    const beat = state.beats[beatId];

    for (const note of beat.notes) {
      await this.playNote(note, beatLength / beat.division);
    }
  }

  async playMeasure(measureId: ID) {
    const state = store.getState();
    const measure = state.measures[measureId];

    for (const beat of measure.beats) {
      await this.playBeat(beat);
    }
  }

  async play() {
    const state = store.getState();

    if (this.playing) {
      const measures = Object.values(state.measures);

      for (const measure of measures) {
        this.setActiveMeasureIndex(measures.indexOf(measure));
        await this.playMeasure(measure.id);
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
  }

  get tempo() {
    return store.getState().general.tempo;
  }

  setActiveNoteId(id) {
    store.dispatch(setNoteId(id));
  }

  setActiveMeasureIndex(index) {
    store.dispatch(setMeasureIndex(index));
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
    store.dispatch(setMeasureIndex(null));
    this.onStop();
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
