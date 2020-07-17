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
    loadPdf();
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
function loadPdf() {
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    var url = './AK-Celtic_Traveller_Throw-v052220.pdf';
    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js';
    // Asynchronous download of PDF
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        console.log('PDF loaded');
        // Fetch the first page
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
            console.log('Page loaded');
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });
            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('the-canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                console.log('Page rendered');
            });
        });
    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });
}
//# sourceMappingURL=init.js.map