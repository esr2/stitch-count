class Note {
    constructor(row, value) {
        this.row = row;
        this.value = value;
    }
    ;
    print() {
        return "#" + this.row + " " + this.value;
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
        return this.name + " is at " + this.index;
    }
    getNotesAtCurrentIndex() {
        let i = this.index;
        return this.notes.
            filter((note) => {
            return note.row == i;
        }).
            flatMap((note) => { return note.print(); }).
            join("\n");
    }
}
