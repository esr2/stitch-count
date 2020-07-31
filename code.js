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
        // These values will be reset immedidately after creation via #updateIndex.
        this.index = 1;
        this.numRepeats = 0;
        this.startIndex = obj.startIndex;
        this.numRows = obj.numRows;
        this.maxRepeats = obj.maxRepeats || null;
        this.showRepeats = obj.showRepeats || false;
    }
    ;
    addNote(note) {
        this.notes.push(note);
    }
    updateIndex(globalIndex) {
        if (globalIndex < this.startIndex + this.numRows) {
            this.index = globalIndex;
            this.numRepeats = 0;
        }
        else {
            let remainder = globalIndex - this.startIndex;
            this.index = this.startIndex + (remainder % this.numRows);
            this.numRepeats = Math.floor(remainder / this.numRows);
        }
    }
    isApplicable(globalIndex) {
        if (globalIndex < this.startIndex) {
            return false;
        }
        else if (globalIndex < this.startIndex + this.numRows) {
            // Within initial block.
            return true;
        }
        if (this.numRepeats < this.maxRepeats) {
            return true;
        }
        return false;
    }
    render() {
        let counterElement = createElement('li', "w3-cell-row");
        let titleElement = createElement('div', "w3-container", "w3-cell", "w3-cell-middle", "counterTitle");
        let titleText = createElement('span');
        titleText.textContent = this.name;
        titleElement.appendChild(titleText);
        counterElement.appendChild(titleElement);
        let indexElement = createElement('div', "w3-container", "w3-cell", "w3-cell-middle", "counterIndex");
        let indexText = createElement('span', "w3-xlarge");
        indexText.textContent = this.index.toString();
        indexElement.appendChild(indexText);
        counterElement.appendChild(indexElement);
        let repeatsElement = createElement('div', "w3-container", "w3-cell", "w3-cell-middle", "numRepeats");
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
            filter((note) => {
            return note.getIndex() == this.index;
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
        this.globalIndex = 1;
    }
    addCounters(counters) {
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
    render() {
        return this.counters
            .filter((counter) => {
            return counter.isApplicable(this.globalIndex);
        })
            .map((counter) => {
            return counter.render();
        });
    }
    getNotesAtCurrentIndex() {
        return this.counters
            .filter((counter) => {
            return counter.isApplicable(this.globalIndex);
        })
            .flatMap((counter) => {
            return counter.getNotesAtCurrentIndex();
        })
            .filter((notes) => { return notes.length > 0; })
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
    static create(json, globalIndex) {
        let params = Object.assign(Object.assign({}, json), { counters: json.counters.map((c) => {
                return Counter.create(c);
            }) });
        const project = new Project(params);
        project.updateIndices(globalIndex);
        return project;
    }
}
function createElement(type, ...tokens) {
    let element = document.createElement(type);
    element.classList.add(...tokens);
    return element;
}
//# sourceMappingURL=code.js.map