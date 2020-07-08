var Note = /** @class */ (function () {
    function Note(row, value) {
        this.row = row;
        this.value = value;
    }
    ;
    Note.prototype.print = function () {
        return "#" + this.row + " " + this.value;
    };
    return Note;
}());
var Counter = /** @class */ (function () {
    function Counter(name, index, notes) {
        if (index === void 0) { index = 1; }
        if (notes === void 0) { notes = []; }
        this.name = name;
        this.index = index;
        this.notes = notes;
    }
    ;
    Counter.prototype.addNote = function (note) {
        this.notes.push(note);
    };
    Counter.prototype.increase = function () {
        this.index += 1;
    };
    Counter.prototype.decrease = function () {
        this.index -= 1;
    };
    Counter.prototype.print = function () {
        return this.name + " is at " + this.index;
    };
    Counter.prototype.getNotesAtCurrentRow = function () {
        var i = this.index;
        return this.notes.
            filter(function (note) {
            return note.row == i;
        }).
            flatMap(function (note) { return note.print(); }).
            join("\n");
    };
    return Counter;
}());
