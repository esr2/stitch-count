"use strict";
class Comment {
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
    constructor(name, index = 1, comments = []) {
        this.name = name;
        this.index = index;
        this.comments = comments;
    }
    ;
    addComment(comment) {
        this.comments.push(comment);
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
    getCommentsAtCurrentRow() {
        let i = this.index;
        return this.comments.
            filter((c) => {
                return c.row == i;
            }).
            flatMap((c) => { return c.print(); }).
            join("\n");
    }
}
