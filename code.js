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
    constructor(name, index = 1, notes = []) {
        this.name = name;
        this.index = index;
        this.notes = notes;
    }
    ;
    addNote(note) {
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
            filter((note) => {
            return note.getIndex() == this.index;
        }).
            flatMap((note) => { return this.name + " " + note.print(); }).
            join('<br />');
    }
}
class Project {
    constructor(name, counters) {
        this.name = name;
        this.counters = counters;
    }
    addCounter(counter) {
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
            flatMap((counter) => {
            return counter.print();
        }).
            join('<br />');
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