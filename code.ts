class Note {
  private index: number;
  private value: string;

  constructor(obj : {index: number, value: string}) {
    this.index = obj.index;
    this.value = obj.value;
  }

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

  constructor (obj : {
      name: string,
      index: number,
      notes?: Note[],
      startIndex?: number,
      endIndex?: number,
      showResets?: boolean,
      numResets?: number}) {
    this.name = obj.name;
    this.notes = obj.notes || [];

    if (!!obj.endIndex && obj.startIndex >= obj.endIndex) {
      alert(`Counter ${obj.name} of has startIndex ${obj.startIndex} greater than the ${obj.endIndex}`);
      // TODO Kill app
    }
    this.index = obj.index;
    this.startIndex = obj.startIndex || 1;
    this.endIndex = obj.endIndex || null;
    this.numResets = obj.numResets || 0;
    this.showResets = obj.showResets || false;
  };

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateIndex(globalIndex : number) {
    if (!this.endIndex) {
      // Not a repeating counter, index should match globalIndex.
      this.index = globalIndex;
    } else {
      // Repeating counter, reset index and numResets.
      if (globalIndex <= this.endIndex) {
        this.index = globalIndex;
        this.numResets = 0;
      } else {
        let remainder = globalIndex - this.startIndex;
        // +1 because endIndex is inclusive.
        let base = this.endIndex - this.startIndex + 1;
        this.index = this.startIndex + (remainder % base);
        this.numResets = Math.floor(remainder / base);
      }
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
    indexText.classList.add("w3-xlarge");
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

  static create(json: {
    name: string,
    index: number,
    startIndex: number,
    numResets: number,
    showResets: boolean,
    notes: Object[],
    endIndex?: number,
  }) : Counter {
    let params = {
      ...json,
      notes : json.notes.map((n : {index: number, value: string}) : Note => {
        return new Note(n);
      })};
    return new Counter(params);
  }
}

class Project {
  private name: string;
	private counters: Counter[];
  private globalIndex: number;

  constructor(obj: {name: string, counters: Counter[]}) {
  	this.name = obj.name;
    this.counters = obj.counters;
    this.globalIndex = 1;
  }

  addCounters(counters: Counter[]) {
    this.counters = this.counters.concat(counters);
  }

  getName() {
    return this.name;
  }

  // TODO figure out if we ever want unliked Counters and accommodate that here.
  increase() {
    this.updateIndices(this.globalIndex + 1);
  }

  decrease() {
  	this.updateIndices(this.globalIndex - 1);
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

  updateIndices(globalIndex) {
    this.globalIndex = globalIndex;
    this.counters.forEach((counter) => {
    	counter.updateIndex(globalIndex);
    });
  }

  getGlobalIndex() {
    return this.globalIndex;
  }

  static create(json : {
    name: string,
    counters: Object[]
  }, globalIndex: number) : Project {
    let params = {
      ...json,
      counters : json.counters.map((c : {
        name: string,
        index: number,
        startIndex: number,
        numResets: number,
        showResets: boolean,
        notes: Object[],
        endIndex?: number,
      }) : Counter => {
        return Counter.create(c);
      })};
    const project = new Project(params);
    project.updateIndices(globalIndex);
    return project;
  }
}
