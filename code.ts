class Comment {
  row: number;
  value: string;

  constructor (row: number, value: string) {
    this.row = row;
    this.value = value;
  };

 print() {
   return "#" + this.row + " " + this.value;
 }
}

class Counter {
    name: string;
    index: number;
    comments: Comment[];

  constructor (
       name: string,
       index: number = 1,
       comments: Comment[] = []) {
    this.name = name;
    this.index = index;
    this.comments = comments;
  };
  
  addComment(comment: Comment) {
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
					filter((c: Comment) => {
                    return c.row == i;
                }).
    			flatMap((c) => { return c.print(); }).
					join("\n");
  }
}
