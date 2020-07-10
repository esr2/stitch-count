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
    private showResets: boolean;

  constructor (
      name: string,
      index: number = 1,
      notes: Note[] = [],
      startIndex: number = 1,
      endIndex?: number,
      showResets: boolean = false) {
    this.name = name;
    this.notes = notes;

    if (startIndex >= endIndex) {
      alert(`Counter ${name} of has startIndex ${startIndex} greater than the ${endIndex}`);
      // TODO Kill app
    }
    this.index = index;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.numResets = 0;
    this.showResets = showResets;
  };

  addNote(note: Note) {
    this.notes.push(note);
  }

  increase() {
    this.index += 1;
    if (!!this.endIndex && this.index > this.endIndex) {
      this.index = this.startIndex;
      this.numResets += 1;
    }
  }

  decrease() {
    this.index -= 1;
    if (!!this.endIndex && this.index < this.startIndex) {
      this.index = this.endIndex;
      this.numResets -= 1;
    }
  }

  render() : HTMLElement {
    let counterElement = document.createElement('li');
    counterElement.classList.add("w3-cell-row");

    let titleElement = document.createElement('div');
    titleElement.classList.add("w3-container", "w3-cell", "w3-cell-middle", "counterTitle");
    let titleText = document.createElement('span');
    titleText.textContent = this.name;
    titleElement.appendChild(titleText);
    counterElement.appendChild(titleElement);

    let indexElement = document.createElement('div');
    indexElement.classList.add("w3-container", "w3-cell", "w3-cell-middle", "counterIndex");
    let indexText = document.createElement('span');
    indexText.classList.add("w3-xxlarge");
    indexText.textContent = this.index.toString();
    indexElement.appendChild(indexText);
    counterElement.appendChild(indexElement);

    let resetsElement = document.createElement('div');
    resetsElement.classList.add("w3-container", "w3-cell", "w3-cell-middle", "numResets");
    let resetsText = document.createElement('span');
    resetsText.textContent = this.numResets.toString();
    resetsText.classList.add("circle");
    if (!this.showResets) {
      resetsText.classList.add( "hidden");
    }
    resetsElement.appendChild(resetsText);
    counterElement.appendChild(resetsElement);

    return counterElement;
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

  addCounters(counters: Counter[]) {
    this.counters = this.counters.concat(counters);
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

  render() : HTMLElement[] {
    return this.counters.map((counter: Counter): HTMLElement => {
      return counter.render();
    });
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
