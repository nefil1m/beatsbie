import { noop } from 'lodash';
import { retrieveTrack, store } from '../store';
import { MetalDrumKit } from './drumKits';
import { DrumKit, HitType } from './types';
import { Hit } from '../store/hits';
import { setMeasureIndex, setNoteId } from '../store/general';

const A_MINUTE = 1000 * 60;

const getHitsByNote = (drumKit: DrumKit, drums: Hit[] = []) => {
  const out = [];

  Object.entries(drums).forEach(([drum, hit]) => {
    if (hit?.hit) {
      const drumDef = drumKit[drum];
      const hitSound = drumDef[hit.hitType] || drumDef[HitType.NORMAL];

      out.push(new Audio(hitSound));
    }
  });

  return out;
};

const trackToQueue = (drumKit: DrumKit, measures) => {
  const out = [];

  measures.forEach(({ beats = [] }) => {
    const m = [];

    beats.forEach(({ division, notes = [] }) => {
      notes.forEach((note) => {
        m.push({
          id: note?.id,
          value: division,
          toPlay: getHitsByNote(drumKit, note?.drums),
        });
      });
    });

    out.push(m);
  });

  return out;
};

/* Yeah, yeah I know it's against the rules to use store directly but in this case the time is crucial
 * and connecting Player to the store directly improves performance *a lot* */
class Player {
  _playing = false;
  _queue = [];
  previousState = null;
  _onStop = noop;

  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.playNote = this.playNote.bind(this);
    this.playMeasure = this.playMeasure.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
    this.listenStateChange = this.listenStateChange.bind(this);

    store.subscribe(this.listenStateChange);
  }

  get playing() {
    return this._playing && !!this.queue.length;
  }

  set playing(playing) {
    this._playing = playing;
  }

  set queue(queue) {
    this._queue = queue;
  }

  get queue() {
    return this._queue;
  }

  get tempo() {
    return store.getState().general.tempo;
  }

  set activeNoteId(id) {
    store.dispatch(setNoteId(id));
  }

  set activeMeasureIndex(index) {
    store.dispatch(setMeasureIndex(index));
  }

  set onStop(cb) {
    this._onStop = cb;
  }

  get onStop() {
    return this._onStop;
  }

  async playNote(note, beatLength) {
    return new Promise((resolve) => {
      note.toPlay.forEach((hit) => {
        hit.play();
      });

      if (this.playing) {
        setTimeout(resolve, beatLength / note.value);
      } else {
        this.stop();
      }
    });
  }

  async playMeasure(measure, beatLength) {
    for (const note of measure) {
      this.activeNoteId = note.id;
      await this.playNote(note, beatLength);
    }
  }

  async play() {
    if (this.playing) {
      const beatLength = A_MINUTE / this.tempo;

      for (const [index, measure] of Object.entries(this._queue)) {
        this.activeMeasureIndex = +index % this._queue.length;
        await this.playMeasure(measure, beatLength);
      }

      this.play();
    }
  }

  listenStateChange() {
    const newState = store.getState();

    if (!this.previousState) {
      this.previousState = newState;
    }

    if (this.previousState !== newState && this.playing) {
      // basically ignore:
      // - `general.activeMeasureIndex`
      // - `general.activeNoteId`
      // - `drumKit.drums`
      // - `general.tempo` - it is always gotten fresh
      if (
        this.previousState.hits !== newState.hits ||
        this.previousState.notes !== newState.notes ||
        this.previousState.beats !== newState.beats ||
        this.previousState.measures !== newState.measures ||
        this.previousState.drumKit.drumKit !== newState.drumKit.drumKit
      ) {
        this.previousState = newState;
        this.queue = this.getQueue(newState);
      }
    }
  }

  getQueue(state = store.getState()) {
    return trackToQueue(state.drumKit.drumKit, retrieveTrack(state));
  }

  start() {
    this.queue = this.getQueue();
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
