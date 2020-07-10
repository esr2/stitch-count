window.onload = () => { onLoad(); };
function onLoad() {
    let project = getOrCreateProject();
    updateDisplay(project);
    document.querySelector("#increaseButton").addEventListener("click", () => {
        project.increase();
        updateDisplay(project);
    });
    document.querySelector("#decreaseButton").addEventListener("click", () => {
        project.decrease();
        updateDisplay(project);
    });
}
function updateDisplay(project) {
    document.querySelector(".w3-bar-item").innerHTML =
        project.getName();
    // Clear current counters UI
    document.querySelector(".counters").innerHTML = '';
    project.render().forEach((element) => {
        document.querySelector(".counters").appendChild(element);
    });
    document.querySelector("#noteContent").innerHTML =
        project.getNotesAtCurrentIndex();
    localStorage.setItem('state', JSON.stringify(project));
}
;
function getOrCreateProject() {
    let storedState = localStorage.getItem('state');
    if (storedState) {
        return Project.create(JSON.parse(storedState));
    }
    else {
        return createProject();
    }
}
;
function createProject() {
    let secondaryCounter1 = new Counter({
        name: "border",
        index: 1,
        notes: [
            new Note({ index: 3, value: "note for row 3" }),
            new Note({ index: 4, value: "note for row 4" }),
        ],
        startIndex: 1,
        endIndex: 3
    });
    let secondaryCounter2 = new Counter({
        name: "panel",
        index: 1,
        notes: [
            new Note({ index: 3, value: "note for row 3" }),
            new Note({ index: 2, value: "note for row 2" }),
        ]
    });
    let secondaryCounter3 = new Counter({
        name: "third",
        index: 1,
        notes: [
            new Note({ index: 5, value: "note for row 5" }),
        ],
        startIndex: 3,
        endIndex: 7,
        showResets: true
    });
    let project = new Project({ name: 'Celtic Throw', counters: [
            new Counter({ name: "Global", index: 1, notes: [] }),
            secondaryCounter1,
            secondaryCounter2,
            secondaryCounter3
        ] });
    return project;
}
//# sourceMappingURL=init.js.map