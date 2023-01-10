import { noop } from 'lodash';

const A_MINUTE = 1000 * 60;

class Player {
  playing = false;
  _queue = [];
  _tempo = 0;

  onNoteIdChange = noop;
  onMeasureIndexChange = noop;
  onStop = noop;

  constructor() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.playNote = this.playNote.bind(this);
    this.playMeasure = this.playMeasure.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
  }

  set tempo(tempo) {
    this._tempo = tempo;
  }

  set queue(queue) {
    this._queue = queue;
  }

  set activeNoteId(id) {
    this.onNoteIdChange(id);
  }

  set activeMeasureIndex(index) {
    this.onMeasureIndexChange(index);
  }

  init({ onMeasureIndexChange, onNoteIdChange, onStop }) {
    this.onMeasureIndexChange = onMeasureIndexChange;
    this.onNoteIdChange = onNoteIdChange;
    this.onStop = onStop;
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
      const beatLength = A_MINUTE / this._tempo;

      for (const [index, measure] of Object.entries(this._queue)) {
        this.activeMeasureIndex = +index % this._queue.length;
        await this.playMeasure(measure, beatLength);
      }

      this.play();
    }
  }

  start() {
    this.playing = true;
    this.play();
  }

  stop() {
    this.playing = false;
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
