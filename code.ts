class Note {
  private index: number;
  private value: string;

  constructor (index: number, value: string) {
    this.index = index;
    this.value = value;
  };

  getIndex() {
    return this.index;
  }

  print() {
    return "#" + this.index + ": " + this.value;
  }
}

class Counter {
    private name: string;
    private index: number;
    private notes: Note[];
    private startIndex: number;
    private endIndex?: number;
    private numResets?: number;

  constructor (
      name: string,
      index: number = 1,
      notes: Note[] = [],
      startIndex: number = 1,
      endIndex?: number) {
    this.name = name;
    this.notes = notes;

    if (index < startIndex || index > endIndex) {
      alert(`Bad counter index ${index} on Counter ${name} out of bounds [${startIndex} - ${endIndex}]`);
      // TODO Kill app
    }
    if (startIndex >= endIndex) {
      alert(`Counter ${name} of has startIndex ${startIndex} greater than the ${endIndex}`);
      // TODO Kill app
    }
    this.index = index;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.numResets = 0;
  };

  addNote(note: Note) {
    this.notes.push(note);
  }

  increase() {
    this.index += 1;
    if (this.index > this.endIndex) {
      this.index = this.startIndex;
      this.numResets += 1;
    }
  }

  decrease() {
    this.index -= 1;
    if (this.index < this.startIndex) {
      this.index = this.endIndex;
      this.numResets -= 1;
    }
  }

  print() {
    return this.name + ": " + this.index +
        (!!this.endIndex ? `  num Resets: ${this.numResets}` : '') ;
  }

  getNotesAtCurrentIndex() {
    return this.notes.
					filter((note: Note) => {
                    return note.getIndex() == this.index;
                }).
    			flatMap((note: Note) => { return this.name + " " + note.print(); }).
					join('<br />');
  }
}

class Project {
  private name: string;
	private counters: Counter[];

  constructor(name: string, secondaryCounters: Counter[]) {
  	this.name = name;
    this.counters = [new Counter("Global", 1, [])].concat(secondaryCounters);
  }

  addCounter(counter: Counter) {
    this.counters.push(counter);
  }

  getName() {
    return this.name;
  }

  // TODO figure out if we ever want unliked Counters and accommodate that here.
  increase() {
  	this.counters.forEach((counter) => {
    	counter.increase();
    });
  }

  decrease() {
  	this.counters.forEach((counter) => {
    	counter.decrease();
    });
  }

  print() {
    return this.counters.
        flatMap((counter: Counter) => {
            return counter.print();
          }).
        join('<br />');
  }

  getNotesAtCurrentIndex() {
      return this.counters
          .flatMap((counter: Counter) => {
              return counter.getNotesAtCurrentIndex();
            })
          .filter((notes: string) => { return notes.length > 0; })
          .join('<br />');
  }
}
