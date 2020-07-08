var Comment = /** @class */ (function () {
    function Comment(row, value) {
        this.row = row;
        this.value = value;
    }
    ;
    Comment.prototype.print = function () {
        return "#" + this.row + " " + this.value;
    };
    return Comment;
}());
var Counter = /** @class */ (function () {
    function Counter(name, index, comments) {
        if (index === void 0) { index = 1; }
        if (comments === void 0) { comments = []; }
        this.name = name;
        this.index = index;
        this.comments = comments;
    }
    ;
    Counter.prototype.addComment = function (comment) {
        this.comments.push(comment);
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
    Counter.prototype.getCommentsAtCurrentRow = function () {
        var i = this.index;
        return this.comments.
            filter(function (c) {
            return c.row == i;
        }).
            flatMap(function (c) { return c.print(); }).
            join("\n");
    };
    return Counter;
}());
