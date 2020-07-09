class Note {
    constructor(index, value) {
        this.index = index;
        this.value = value;
    }
    ;
    getIndex() {
        return this.index;
    }
    print() {
        return "#" + this.index + ": " + this.value;
    }
}
class Counter {
    constructor(name, index = 1, notes = [], startIndex = 1, endIndex) {
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
    }
    ;
    addNote(note) {
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
            (!!this.endIndex ? `  num Resets: ${this.numResets}` : '');
    }
    render(countersList) {
        let counterElement = document.createElement('li');
        counterElement.classList.add("w3-cell-row");
        countersList.appendChild(counterElement);
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
        if (this.numResets == 0) {
            resetsText.classList.add("hidden");
        }
        resetsElement.appendChild(resetsText);
        counterElement.appendChild(resetsElement);
    }
    getNotesAtCurrentIndex() {
        return this.notes.
            filter((note) => {
            return note.getIndex() == this.index;
        }).
            flatMap((note) => { return this.name + " " + note.print(); }).
            join('<br />');
    }
}
class Project {
    constructor(name, secondaryCounters) {
        this.name = name;
        this.counters = [new Counter("Global", 1, [])].concat(secondaryCounters);
    }
    addCounter(counter) {
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
            flatMap((counter) => {
            return counter.print();
        }).
            join('<br />');
    }
    render(countersList) {
        this.counters.forEach((counter) => {
            counter.render(countersList);
        });
    }
    getNotesAtCurrentIndex() {
        return this.counters
            .flatMap((counter) => {
            return counter.getNotesAtCurrentIndex();
        })
            .filter((notes) => { return notes.length > 0; })
            .join('<br />');
    }
}
//# sourceMappingURL=code.js.map