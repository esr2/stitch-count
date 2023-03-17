import { Form } from "react-bootstrap";

interface ProjectDetails {
  storageKey: string;
  name: string;
  patternUrl?: string;
  pdfUrl: string;
  pdfStartPage: number;
  pdfRotation: number;
}

// Next ID: 7
const PROJECT_VALUES: ProjectDetails[] = [
  {
    storageKey: "ID-3",
    name: "Be Mine Cardigan",
    patternUrl:
      "https://esr2.github.io/stitch-count/pattern-json/be_mine_cardigan.json",
    pdfUrl: "./pattern-pdfs/Be_Mine_Cardigan-medium_highlighted.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  {
    storageKey: "ID-1",
    name: "Celtic Throw",
    patternUrl:
      "https://esr2.github.io/stitch-count/pattern-json/celtic_throw.json",
    pdfUrl: "./pattern-pdfs/AK-Celtic_Traveller_Throw-v052220.pdf",
    pdfStartPage: 5,
    pdfRotation: -90,
  },
  {
    storageKey: "ID-2",
    name: "Drachenfels",
    patternUrl:
      "https://esr2.github.io/stitch-count/pattern-json/drachenfels.json",
    pdfUrl: "./pattern-pdfs/Drachenfels.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  {
    storageKey: "ID-5",
    name: "Geometric Scarf",
    patternUrl:
      "https://esr2.github.io/stitch-count/pattern-json/geometric_scarf.json",
    pdfUrl: "./pattern-pdfs/Geometric-scarf.pdf",
    pdfStartPage: 0,
    pdfRotation: 0,
  },
  {
    storageKey: "ID-4",
    name: "Helgoland",
    patternUrl:
      "https://esr2.github.io/stitch-count/pattern-json/helgoland.json",
    pdfUrl: "./pattern-pdfs/Helgoland-en.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  {
    storageKey: "ID-6",
    name: "Ingrid Sweater",
    // patternUrl: "./pattern-json/ingrid_sweater.json",
    pdfUrl: "./pattern-pdfs/Ingrid_Sweater-small_highlighted.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
  },
];

function ProjectPicker() {
  const projectOptions = PROJECT_VALUES.map((value: ProjectDetails) => {
    return <option>{value.name}</option>;
  });

  return (
    <Form.Group>
      <select
        className="form-control form-control-lg"
        id="exampleFormControlSelect1"
      >
        {projectOptions}
      </select>
    </Form.Group>
  );
}

export default ProjectPicker;
