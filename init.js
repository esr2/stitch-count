window.onload = () => { onLoad(); };
function onLoad() {
    getOrCreateProject().then((project) => {
        updateDisplay(project);
        document.querySelector("#increaseButton").addEventListener("click", () => {
            project.increase();
            updateDisplay(project);
        });
        document.querySelector("#decreaseButton").addEventListener("click", () => {
            project.decrease();
            updateDisplay(project);
        });
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
        return Promise.resolve(Project.create(JSON.parse(storedState)));
    }
    else {
        return createProject();
    }
}
;
function createProject() {
    return new Promise((resolve, reject) => {
        let oXHR = new XMLHttpRequest();
        // Initiate request.
        oXHR.onreadystatechange = () => {
            // Check if request is complete.
            if (oXHR.readyState == 4) {
                resolve(Project.create(JSON.parse(oXHR.responseText)));
            }
        };
        oXHR.open("GET", "https://esr2.github.io/stitch-count/celtic_throw.json", true); // get json file.
        oXHR.send();
    });
}
//# sourceMappingURL=init.js.map