class Note {
    constructor(obj) {
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
    constructor(obj) {
        this.name = obj.name;
        this.notes = obj.notes || [];
        this.numRows = obj.numRows;
        this.showRelativeIndex = obj.showRelativeIndex || false;
        this.showRepeats = obj.showRepeats || false;
        // Assumes each repeat is a disjoint range.
        this.repeats = obj.repeats;
    }
    ;
    addNote(note) {
        this.notes.push(note);
    }
    isWithinRepeat(globalIndex, startIndex, maxRepeats) {
        if (globalIndex < startIndex) {
            return false;
        }
        return globalIndex < (this.numRows * maxRepeats) + startIndex;
    }
    getRepeat(globalIndex) {
        return this.repeats.find((repeat) => {
            return this.isWithinRepeat(globalIndex, repeat.startIndex, repeat.maxRepeats);
        });
    }
    calculateState(globalIndex) {
        let index, numRepeats;
        let { startIndex, maxRepeats } = this.getRepeat(globalIndex);
        if (globalIndex < startIndex + this.numRows) {
            index = this.calculateIndex(globalIndex, startIndex);
            numRepeats = 0;
        }
        else {
            let remainder = globalIndex - startIndex;
            index = this.calculateIndex(startIndex + (remainder % this.numRows), startIndex);
            numRepeats = Math.floor(remainder / this.numRows);
        }
        return {
            "index": index,
            "numRepeats": numRepeats,
            "maxRepeats": maxRepeats
        };
    }
    // Adjust previously calculated index value to account for whether the index
    // should be shown relative to the repeat block or to the global index.
    calculateIndex(calculatedValue, startIndex) {
        return this.showRelativeIndex ?
            calculatedValue - startIndex + 1 :
            calculatedValue;
    }
    isApplicable(globalIndex) {
        return !!this.getRepeat(globalIndex);
    }
    render(globalIndex) {
        // Calculate values from globalIndex.
        let { maxRepeats, index, numRepeats } = this.calculateState(globalIndex);
        // Create HTMLElement.
        let counterElement = createElement('li', "w3-cell-row");
        let titleElement = createElement('div', "w3-container", "w3-cell", "w3-cell-middle", "counterTitle");
        let titleText = createElement('span');
        titleText.textContent = this.name;
        titleElement.appendChild(titleText);
        counterElement.appendChild(titleElement);
        let indexElement = createElement('div', "w3-container", "w3-cell", "w3-cell-middle", "counterIndex");
        let indexText = createElement('span', "w3-xlarge");
        indexText.textContent = index.toString();
        indexElement.appendChild(indexText);
        counterElement.appendChild(indexElement);
        let repeatsElement = createElement('div', "w3-container", "w3-cell", "w3-cell-middle", "numRepeats");
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
    getNotesAtIndex(globalIndex) {
        let { index } = this.calculateState(globalIndex);
        return this.notes.
            filter((note) => {
            return note.getIndex() == index;
        }).
            flatMap((note) => { return this.name + " " + note.print(); }).
            join('<br />');
    }
    static create(json) {
        let params = Object.assign(Object.assign({}, json), { notes: json.notes.map((n) => {
                return new Note(n);
            }) });
        return new Counter(params);
    }
}
class Project {
    constructor(obj) {
        this.name = obj.name;
        this.counters = obj.counters;
        this.globalIndex = obj.index;
    }
    addCounters(counters) {
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
    render() {
        return this.counters
            .filter((counter) => {
            return counter.isApplicable(this.globalIndex);
        })
            .map((counter) => {
            return counter.render(this.globalIndex);
        });
    }
    getNotesAtCurrentIndex() {
        return this.counters
            .filter((counter) => {
            return counter.isApplicable(this.globalIndex);
        })
            .flatMap((counter) => {
            return counter.getNotesAtIndex(this.globalIndex);
        })
            .filter((notes) => { return notes.length > 0; })
            .join('<br />');
    }
    getGlobalIndex() {
        return this.globalIndex;
    }
    static create(json, globalIndex) {
        let params = Object.assign(Object.assign({}, json), { index: globalIndex, counters: json.counters.map((c) => {
                return Counter.create(c);
            }) });
        return new Project(params);
    }
}
function createElement(type, ...tokens) {
    let element = document.createElement(type);
    element.classList.add(...tokens);
    return element;
}
//# sourceMappingURL=code.js.map