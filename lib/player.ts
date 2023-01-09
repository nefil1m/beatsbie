const A_MINUTE = 1000 * 60;

class Foo {
  playing = false;
  _noteId = 0;
  _measureIndex = 0;
  _queue = [];
  _tempo = 0;
  noteIdSetter = id => id;
  measureIndexSetter = number => number;

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
    this._noteId = id;
    this.noteIdSetter(id);
  }

  set measureIndex(index) {
    this._measureIndex = index;
    this.measureIndexSetter(index);
  }

  setIndexSetters(measureIndexSetter, noteIdSetter) {
    this.measureIndexSetter = measureIndexSetter;
    this.noteIdSetter = noteIdSetter;
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

  async playMeasure (measure, beatLength) {
    for (const note of measure) {
      this.activeNoteId = note.id;
      await this.playNote(note, beatLength);
    }
  }

  async play() {
    if (this.playing) {
      const beatLength = A_MINUTE / this._tempo;

      for (const [index, measure] of Object.entries(this._queue)) {
        this.measureIndex = +index % this._queue.length;
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
  }

  togglePlaying() {
    if (this.playing) {
      this.stop();
    } else {
      this.start();
    }
  }
}

export const player = new Foo();
