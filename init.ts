window.onload = () => { onLoad() };

function onLoad() {
  let project = createProject();
  updateDisplay(project);

  document.querySelector("#increaseButton").addEventListener(
      "click",
      () => {
        project.increase();
        updateDisplay(project);
      });
  document.querySelector("#decreaseButton").addEventListener(
      "click",
      () => {
        project.decrease();
        updateDisplay(project);
      });
}

function updateDisplay(project: Project) {
  document.querySelector(".w3-bar-item").innerHTML =
      project.getName();

  // Clear current counters UI
  document.querySelector(".counters").innerHTML = '';
  project.render(document.querySelector(".counters"));
  document.querySelector("#noteContent").innerHTML =
      project.getNotesAtCurrentIndex();
};

function createProject() {
  let secondaryCounter1 = new Counter(
          "border",
          1 /* index */,
          [
            new Note(3, "note for row 3"),
            new Note(4, "note for row 4"),
          ],
          1 /* startIndex */,
          3 /* endIndex */);
  let secondaryCounter2 = new Counter(
          "panel",
          1 /* index */,
          [
            new Note(3, "note for row 3"),
            new Note(2, "note for row 2"),
          ]);
  let secondaryCounter3 = new Counter(
          "third",
          1 /* index */,
          [
            new Note(5, "note for row 5"),
          ],
          3 /* startIndex */,
          7 /* endIndex */,
          true /* showResets */);
  let project = new Project('Celtic Throw', [secondaryCounter1]);
  project.addCounters([secondaryCounter2, secondaryCounter3]);

  return project;
}
