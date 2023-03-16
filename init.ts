window.onload = () => { onLoad() };

interface ProjectDetails {
  storageKey: string;
  name?: string;
  patternUrl?: string;
  pdfUrl: string;
  pdfStartPage: number;
  pdfRotation: number;
}

// Next ID: 6
const PROJECT_VALUES = {
  "be_mine_cardigan" : {
    storageKey: "ID-3",
    patternUrl: "https://esr2.github.io/stitch-count/pattern-json/be_mine_cardigan.json",
    pdfUrl: './pattern-pdfs/Be_Mine_Cardigan-medium_highlighted.pdf',
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  "celtic_throw" : {
    storageKey: "ID-1",
    patternUrl: "https://esr2.github.io/stitch-count/pattern-json/celtic_throw.json",
    pdfUrl: './pattern-pdfs/AK-Celtic_Traveller_Throw-v052220.pdf',
    pdfStartPage: 5,
    pdfRotation: -90,
  },
  "drachenfels" : {
    storageKey: "ID-2",
    patternUrl: "https://esr2.github.io/stitch-count/pattern-json/drachenfels.json",
    pdfUrl: './pattern-pdfs/Drachenfels.pdf',
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  "geometric_scarf" : {
    storageKey: "ID-5",
    patternUrl: "https://esr2.github.io/stitch-count/pattern-json/geometric_scarf.json",
    pdfUrl: './pattern-pdfs/Geometric-scarf.pdf',
    pdfStartPage: 0,
    pdfRotation: 0,
  },
  "helgoland" : {
    storageKey: "ID-4",
    patternUrl: "https://esr2.github.io/stitch-count/pattern-json/helgoland.json",
    pdfUrl: './pattern-pdfs/Helgoland-en.pdf',
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  "ingrid_sweater": {
    storageKey: "ID-6",
    name: "Ingrid Sweater",
    // patternUrl: "./pattern-json/ingrid_sweater.json",
    pdfUrl: "./pattern-pdfs/Ingrid_Sweater-small_highlighted.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
  }
}

function onLoad() {
  showProjectPicker().then((projectName: string) => {
    const projectDetails = PROJECT_VALUES[projectName];
    getProject(projectDetails).then(
      (project: Project) => {
        init(project, projectDetails.storageKey)
        loadPdf(projectDetails);
      });
  });
}

function init(project: Project, storageKey: string) {
  const domContainer = document.querySelector('#project_container');
  const root = ReactDOM.createRoot(domContainer);
  root.render(e(LikeButton));

  updateDisplay(project, storageKey);

  document.querySelector("#increaseButton").addEventListener(
      "click",
      () => {
        project.increase();
        updateDisplay(project, storageKey);
      });
  document.querySelector("#decreaseButton").addEventListener(
      "click",
      () => {
        project.decrease();
        updateDisplay(project, storageKey);
      });

  document.querySelector("#zoomInButton").addEventListener(
    "click", () => { zoomIn(); });
  document.querySelector("#zoomOutButton").addEventListener(
    "click", () => { zoomOut(); });
}

function updateDisplay(project: Project, storageKey: string) {
  document.querySelector(".w3-bar-item").innerHTML =
      project.getName();

  // Clear current counters UI
  document.querySelector(".counters").innerHTML = '';
  project.render().forEach((element: HTMLElement) => {
    document.querySelector(".counters").appendChild(element);
  });
  document.querySelector("#noteContent").innerHTML =
      project.getNotesAtCurrentIndex();

  localStorage.setItem(
      storageKey, project.getGlobalIndex().toString());
};

function getProject(details : ProjectDetails) : Promise<Project> {
  let globalIndex =
      parseInt(localStorage.getItem(details.storageKey)) || 1;

  // Support as-you-go patterns counting
  if (!details.patternUrl) {
    const editCounterButton = document.getElementById("freeStyleEditCounterButton")
    editCounterButton.style.display = "block";
    editCounterButton.onclick = () => {showFreestyleCounterEditModal(details.storageKey, details.name);}

    const numRepeats = 
        parseInt(localStorage.getItem(details.storageKey+"-numRepeats")) || 1;
    const numRows = parseInt(localStorage.getItem(details.storageKey+"-numRows")) || 500;

    return Promise.resolve(Project.createSimple(details.name, globalIndex, numRepeats, numRows));
  }

  return new Promise((resolve, reject) => {
    let oXHR = new XMLHttpRequest();
    // Initiate request.
    oXHR.onreadystatechange = () => {
      // Check if request is complete.
      if (oXHR.readyState == 4) {
        resolve(Project.create(JSON.parse(oXHR.responseText), globalIndex));
      }
    };
    oXHR.open("GET", details.patternUrl, true);  // get json file.
    oXHR.send();
  });
}

function showProjectPicker() : Promise<string> {
  let promise = new Promise<string>((resolve, reject) => {
    document.getElementById('projectPickerSelectButton').onclick = () => {
      // Hide the modal.
      document.getElementById('projectPickerModal').style.display = 'none';

      // Find the selected value and return it.
      let form = document.getElementById('projectPickerForm') as HTMLFormElement;
      let checkedItem = Array.from(form.elements).find((radioElement) => {
        const el = radioElement as HTMLInputElement;
        return el.checked;
      }) as HTMLInputElement;
      resolve(checkedItem.value);
    }
  });

  document.getElementById('projectPickerModal').style.display = 'block';
  return promise;
}

function showFreestyleCounterEditModal(storageKey: string, projectName: string): void {
  // Prepopulate the form fields with the current values
  let numRows = parseInt(localStorage.getItem(storageKey+"-numRows"));
  (document.getElementById('numRows') as HTMLInputElement).value = numRows.toString();
  let numRepeats = parseInt(localStorage.getItem(storageKey+"-numRepeats"));
  (document.getElementById('numRepeats') as HTMLInputElement).value = numRepeats.toString();

  // Show the modal
  document.getElementById('freeStyleInputModal').style.display = 'block';

  // Set up the onClicks
  document.getElementById("freeStyleInputResetButton").onclick = () => {
    (document.getElementById('numRows') as HTMLInputElement).value = "500";
    (document.getElementById('numRepeats') as HTMLInputElement).value = "1";
  }
  document.getElementById('freeStyleInputUpdateButton').onclick = () => {
    // Hide the modal.
    document.getElementById('freeStyleInputModal').style.display = 'none';

    // Store the new values.
    let numRows = (document.getElementById('numRows') as HTMLInputElement).value;
    let numRepeats = (document.getElementById('numRepeats') as HTMLInputElement).value;

    localStorage.setItem(storageKey, "1");
    localStorage.setItem(storageKey+"-numRows", numRows);
    localStorage.setItem(storageKey+"-numRepeats", numRepeats);

    init(
      Project.createSimple(
        projectName,
        1 /* globalIndex */,
        parseInt(numRepeats),
        parseInt(numRows)),
      storageKey);
  };
}

const PDF_VIEWS = [];
var DEFAULT_SCALE_DELTA = 1.1;
var MIN_SCALE = 0.25;
var MAX_SCALE = 10.0;
var PDF_ROTATION = 0;

function loadPdf(details: ProjectDetails) {
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  var url = details.pdfUrl;
  PDF_ROTATION = details.pdfRotation;

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var pdfjsLib = window['pdfjs-dist/build/pdf'];

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js';

  var DEFAULT_SCALE = .6;
  var desiredWidth = window.innerWidth;

  var DEFAULT_URL = url;
  var container = document.getElementById("pageContainer");

  var eventBus = new pdfjsViewer.EventBus();

  // Fetch the PDF document from the URL using promises.
  var loadingTask = pdfjsLib.getDocument(DEFAULT_URL);
  loadingTask.promise.then(function (doc) {
    // Use a promise to fetch and render the next page.
    var promise = Promise.resolve();

    for (var i = details.pdfStartPage; i <= doc.numPages; i++) {
      promise = promise.then(
        function (pageNum) {
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

            PDF_VIEWS.push(pdfPageView);
            pdfPageView.update(scale, PDF_ROTATION)

            // Associate the actual page with the view and draw it.
            pdfPageView.setPdfPage(pdfPage);
            return pdfPageView.draw();
          });
        }.bind(null, i)
      );
    }
  });
}

function zoomIn() {
  PDF_VIEWS.forEach((pdfView) => {
    var newScale = pdfView.scale;
    newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
    newScale = Math.ceil(newScale * 10) / 10;
    newScale = Math.min(MAX_SCALE, newScale);

    pdfView.update(newScale, PDF_ROTATION);
  });
}

function zoomOut() {
  PDF_VIEWS.forEach((pdfView) => {
    var newScale = pdfView.scale;
    newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
    newScale = Math.floor(newScale * 10) / 10;
    newScale = Math.max(MIN_SCALE, newScale);

    pdfView.update(newScale, PDF_ROTATION);
  });
}
