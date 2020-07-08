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

  constructor (
       name: string,
       index: number = 1,
       notes: Note[] = []) {
    this.name = name;
    this.index = index;
    this.notes = notes;
  };

  addNote(note: Note) {
    this.notes.push(note);
  }

  increase() {
    this.index += 1;
  }

  decrease() {
    this.index -= 1;
  }

  print() {
    return this.name + ": " + this.index;
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
    return this.name + '<br />' + this.counters.
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
