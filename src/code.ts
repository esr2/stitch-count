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
    private notes: Note[];

    // Total number of rows within a repeated block.
    private numRows: number;
    // Whether to show the row index relative to the repeated block rather than
    // the beginning of the pattern. Affects note indices as well.
    // Defaults to false.
    private showRelativeIndex: boolean;
    // Whether to show repeats within the counter. Defaults to false.
    private showRepeats: boolean;

    /**
     * startIndex: Inclusive row number of the first row within the repeated
     *    block.
     * maxRepeats: Maximum number of repetitions to do this block from the when
     *    the globalIndex matches the startIndex of the block.
     */
    private repeats: {startIndex: number, maxRepeats: number}[];

  constructor (obj : {
      name: string,
      notes?: Note[],
      numRows: number,
      showRelativeIndex?: boolean,
      showRepeats?: boolean,
      repeats: {startIndex: number, maxRepeats: number}[]}) {
    this.name = obj.name;
    this.notes = obj.notes || [];
    this.numRows = obj.numRows;
    this.showRelativeIndex = obj.showRelativeIndex || false;
    this.showRepeats = obj.showRepeats || false;

    // Assumes each repeat is a disjoint range.
    this.repeats = obj.repeats;
  };

  addNote(note: Note) {
    this.notes.push(note);
  }

  private isWithinRepeat(
      globalIndex: number, startIndex: number, maxRepeats: number) : boolean {
    if (globalIndex < startIndex) {
      return false;
    }

    return globalIndex < (this.numRows * maxRepeats) + startIndex;
  }

  private getRepeat(globalIndex: number) {
    return this.repeats.find(
      (repeat : {startIndex: number, maxRepeats: number}) : boolean => {
        return this.isWithinRepeat(
          globalIndex, repeat.startIndex, repeat.maxRepeats);
      });
  }

  private calculateState(globalIndex: number) :
        {index: number, numRepeats: number, maxRepeats: number} {
    let index: number, numRepeats: number;
    let {startIndex, maxRepeats} = this.getRepeat(globalIndex);

    if (globalIndex < startIndex + this.numRows) {
      index = this.calculateIndex(globalIndex, startIndex);
      numRepeats = 0;
    } else {
      let remainder = globalIndex - startIndex;
      index = this.calculateIndex(
        startIndex + (remainder % this.numRows), startIndex);
      numRepeats = Math.floor(remainder / this.numRows);
    }

    return {
      index: index,
      numRepeats: numRepeats,
      maxRepeats: maxRepeats
    }
  }

  // Adjust previously calculated index value to account for whether the index
  // should be shown relative to the repeat block or to the global index.
  private calculateIndex(calculatedValue: number, startIndex: number) : number {
    return this.showRelativeIndex ?
        calculatedValue - startIndex + 1:
        calculatedValue;
  }

  isApplicable(globalIndex: number) : boolean {
    return !!this.getRepeat(globalIndex);
  }

  render(globalIndex: number) : HTMLElement {
    // Calculate values from globalIndex.
    let {maxRepeats, index, numRepeats} = this.calculateState(globalIndex);

    // Create HTMLElement.
    let counterElement = createElement('li', "w3-cell-row");

    if (this.name) {
      let titleElement = createElement(
          'div', "w3-container", "w3-cell", "w3-cell-middle", "counterTitle");
      let titleText = createElement('span');
      titleText.textContent = this.name;
      titleElement.appendChild(titleText);
      counterElement.appendChild(titleElement);
    }

    let indexElement = createElement(
      'div', "w3-container", "w3-cell", "w3-cell-middle", "counterIndex");
    let indexText = createElement('span', "w3-xlarge");
    indexText.textContent = index.toString();
    indexElement.appendChild(indexText);
    counterElement.appendChild(indexElement);

    let repeatsElement = createElement(
        'div', "w3-container", "w3-cell", "w3-cell-middle", "numRepeats");
    if (this.showRepeats) {
      let repeatsText = createElement('span', "circle");
      let numerator = createElement('span', 'numerator');
      numerator.innerText = numRepeats.toString();
      repeatsText.appendChild(numerator);

      let slash = createElement('span', 'slash-entity');
      slash.innerText = "⁄";
      repeatsText.appendChild(slash);

      let denominator = createElement('span', 'denominator');
      denominator.innerText = maxRepeats.toString();
      repeatsText.appendChild(denominator);

      repeatsElement.appendChild(repeatsText);
    }
    counterElement.appendChild(repeatsElement);

    return counterElement;
  }

  getNotesAtIndex(globalIndex: number) {
    let {index} = this.calculateState(globalIndex);
    return this.notes.
					filter((note: Note) => {
                    return note.getIndex() == index;
                }).
    			flatMap((note: Note) => { return this.name + " " + note.print(); }).
					join('<br />');
  }

  static create(json: {
    name: string,
    showRepeats: boolean,
    showRelativeIndex?: boolean,
    notes: Object[],
    numRows: number,
    repeats: {startIndex: number, maxRepeats: number}[],
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

  constructor(obj: {name: string, counters: Counter[], index: number}) {
  	this.name = obj.name;
    this.counters = obj.counters;
    this.globalIndex = obj.index;
  }

  addCounters(counters: Counter[]) {
    this.counters = this.counters.concat(counters);
  }

  getName() {
    return this.name;
  }

  increase() {
    this.globalIndex++;
  }

  decrease() {
  	this.globalIndex--;
  }

  render() : HTMLElement[] {
    return this.counters
        .filter((counter: Counter) => {
            return counter.isApplicable(this.globalIndex);
          })
        .map((counter: Counter): HTMLElement => {
          return counter.render(this.globalIndex);
        });
  }

  getNotesAtCurrentIndex() {
      return this.counters
          .filter((counter: Counter) => {
              return counter.isApplicable(this.globalIndex);
            })
          .flatMap((counter: Counter) => {
              return counter.getNotesAtIndex(this.globalIndex);
            })
          .filter((notes: string) => { return notes.length > 0; })
          .join('<br />');
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
      index : globalIndex,
      counters : json.counters.map((c : {
        name: string,
        showRepeats: boolean,
        showRelativeIndex?: boolean,
        notes: Object[],
        numRows: number,
        repeats: {startIndex: number, maxRepeats: number}[],
      }) : Counter => {
        return Counter.create(c);
      })};
    return new Project(params);
  }

  static createSimple(name: string, globalIndex: number, numRepeats: number, numRows: number) {
    return new Project({
      name, 
      counters: [
        new Counter({
          name: '', 
          notes:[], 
          numRows, 
          showRelativeIndex: true, 
          showRepeats: numRepeats != 1,
          repeats: [{
            startIndex: 1,
            maxRepeats: numRepeats,
          }],
        }),
      ],
      index: globalIndex,
    });
  }
}

function createElement(type: string, ...tokens : string[]) : HTMLElement {
  let element = document.createElement(type);
  element.classList.add(...tokens);
  return element;
}
