class Note {
  index: number;
  value: string;

  constructor (index: number, value: string) {
    this.index = index;
    this.value = value;
  };

 print() {
   return "#" + this.index + ": " + this.value;
 }
}

class Counter {
    name: string;
    index: number;
    notes: Note[];

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
    let i = this.index;
    return this.notes.
					filter((note: Note) => {
                    return note.index == i;
                }).
    			flatMap((note: Note) => { return this.name + " " + note.print(); }).
					join('<br />');
  }
}

class Project {
  name: string;
	private counters: Counter[];

  constructor(name: string, counters: Counter[]) {
  	this.name = name;
    this.counters = counters;
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
