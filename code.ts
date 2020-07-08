class Note {
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
    notes: Note[];

  constructor (
       name: string,
       index: number = 1,
       notes: Note[] = []) {
    this.name = name;
    this.index = index;
    this.notes = notes;
  };

  addNote(note: Note) {
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

  getNotesAtCurrentRow() {
    let i = this.index;
    return this.notes.
					filter((note: Note) => {
                    return note.row == i;
                }).
    			flatMap((note: Note) => { return note.print(); }).
					join("\n");
  }
}
