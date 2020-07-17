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
    var DEFAULT_SCALE = 1.0;
    var desiredWidth = 230;
    var DEFAULT_URL = url;
    var container = document.getElementById("pageContainer");
    var eventBus = new pdfjsViewer.EventBus();
    // Fetch the PDF document from the URL using promises.
    var loadingTask = pdfjsLib.getDocument(DEFAULT_URL);
    loadingTask.promise.then(function (doc) {
        // Use a promise to fetch and render the next page.
        var promise = Promise.resolve();
        for (var i = 5; i <= doc.numPages; i++) {
            promise = promise.then(function (pageNum) {
                return doc.getPage(pageNum).then(function (pdfPage) {
                    var viewport = pdfPage.getViewport({ scale: DEFAULT_SCALE, });
                    var scale = desiredWidth / viewport.width;
                    // Create the page view.
                    var pdfPageView = new pdfjsViewer.PDFPageView({
                        container: container,
                        id: pageNum,
                        scale: scale,
                        defaultViewport: pdfPage.getViewport({ scale: scale }),
                        eventBus: eventBus,
                        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
                        renderInteractiveForms: false,
                    });
                    pdfPageView.update(scale, -90);
                    // Associate the actual page with the view and draw it.
                    pdfPageView.setPdfPage(pdfPage);
                    return pdfPageView.draw();
                });
            }.bind(null, i));
        }
    });
}
//# sourceMappingURL=init.js.map