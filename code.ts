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
    // Inclusive row number of the first row within the repeated block.
    private startIndex: number;
    // Total number of rows within a repeated block.
    private numRows: number;
    // Current repetition.
    private numRepeats: number;
    // Maximum number of repetitions to do this block from the when the
    // globalIndex matches the startIndex of the block. If null, continually
    // repeat.
    private maxRepeats?: number;
    // Whether to show repeats within the counter.
    private showRepeats: boolean;

  constructor (obj : {
      name: string,
      notes?: Note[],
      startIndex: number,
      numRows: number,
      maxRepeats?: number,
      showRepeats?: boolean}) {
    this.name = obj.name;
    this.notes = obj.notes || [];

    // These values will be reset immedidately after creation via #updateIndex.
    this.index = 1;
    this.numRepeats = 0;

    this.startIndex = obj.startIndex;
    this.numRows = obj.numRows;
    this.maxRepeats = obj.maxRepeats || null;
    this.showRepeats = obj.showRepeats || false;
  };

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateIndex(globalIndex : number) {
    if (globalIndex <= this.startIndex + this.numRows) {
      this.index = globalIndex;
      this.numRepeats = 0;
    } else {
      let remainder = globalIndex - this.startIndex;
      this.index = this.startIndex + (remainder % this.numRows);
      this.numRepeats = Math.floor(remainder / this.numRows);
    }
  }

  isApplicable(globalIndex) : boolean {
    if (globalIndex < this.startIndex) {
      return false;
    } else if (globalIndex <= this.startIndex + this.numRows) {
      // Within initial block.
      return true;
    } if (this.numRepeats < this.maxRepeats) {
      return true;
    }
    return false;
  }

  render() : HTMLElement {
    let counterElement = createElement('li', "w3-cell-row");

    let titleElement = createElement(
        'div', "w3-container", "w3-cell", "w3-cell-middle", "counterTitle");
    let titleText = createElement('span');
    titleText.textContent = this.name;
    titleElement.appendChild(titleText);
    counterElement.appendChild(titleElement);

    let indexElement = createElement(
      'div', "w3-container", "w3-cell", "w3-cell-middle", "counterIndex");
    let indexText = createElement('span', "w3-xlarge");
    indexText.textContent = this.index.toString();
    indexElement.appendChild(indexText);
    counterElement.appendChild(indexElement);

    let repeatsElement = createElement(
        'div', "w3-container", "w3-cell", "w3-cell-middle", "numRepeats");
    if (this.showRepeats) {
      let repeatsText = createElement('span', "circle");
      let numerator = createElement('span', 'numerator');
      numerator.innerText = this.numRepeats.toString();
      repeatsText.appendChild(numerator);

      let slash = createElement('span', 'slash-entity');
      slash.innerText = "⁄";
      repeatsText.appendChild(slash);

      let denominator = createElement('span', 'denominator');
      denominator.innerText = this.maxRepeats.toString();
      repeatsText.appendChild(denominator);

      repeatsElement.appendChild(repeatsText);
    }
    counterElement.appendChild(repeatsElement);

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
    startIndex: number,
    showRepeats: boolean,
    notes: Object[],
    numRows: number,
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
    return this.counters
        .filter((counter: Counter) => {
            return counter.isApplicable(this.globalIndex);
          })
        .map((counter: Counter): HTMLElement => {
          return counter.render();
        });
  }

  getNotesAtCurrentIndex() {
      return this.counters
          .filter((counter: Counter) => {
              return counter.isApplicable(this.globalIndex);
            })
          .flatMap((counter: Counter) => {
              return counter.getNotesAtCurrentIndex();
            })
          .filter((notes: string) => { return notes.length > 0; })
          .join('<br />');
  }

  updateIndices(globalIndex: number) {
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
        startIndex: number,
        showRepeats: boolean,
        notes: Object[],
        numRows: number,
      }) : Counter => {
        return Counter.create(c);
      })};
    const project = new Project(params);
    project.updateIndices(globalIndex);
    return project;
  }
}

function createElement(type: string, ...tokens : string[]) : HTMLElement {
  let element = document.createElement(type);
  element.classList.add(...tokens);
  return element;
}
