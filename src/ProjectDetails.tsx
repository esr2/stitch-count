export interface ProjectDetails {
  storageKey: string;
  name: string;
  patternUrl?: string;
  pdfUrl: string;
  pdfStartPage: number;
  pdfRotation: number;
  isDefault?: boolean;
}

// Next ID: 7
export const PROJECT_VALUES: ProjectDetails[] = [
  {
    storageKey: "ID-3",
    name: "Be Mine Cardigan",
    patternUrl: "../pattern-json/be_mine_cardigan.json",
    pdfUrl: "../pattern-pdfs/Be_Mine_Cardigan-medium_highlighted.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  {
    storageKey: "ID-1",
    name: "Celtic Throw",
    patternUrl: "../pattern-json/celtic_throw.json",
    pdfUrl: "../pattern-pdfs/AK-Celtic_Traveller_Throw-v052220.pdf",
    pdfStartPage: 5,
    pdfRotation: -90,
  },
  {
    storageKey: "ID-2",
    name: "Drachenfels",
    patternUrl: "../pattern-json/drachenfels.json",
    pdfUrl: "../pattern-pdfs/Drachenfels.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  {
    storageKey: "ID-5",
    name: "Geometric Scarf",
    patternUrl: "../pattern-json/geometric_scarf.json",
    pdfUrl: "../pattern-pdfs/Geometric-scarf.pdf",
    pdfStartPage: 0,
    pdfRotation: 0,
  },
  {
    storageKey: "ID-4",
    name: "Helgoland",
    patternUrl: "../pattern-json/helgoland.json",
    pdfUrl: "../pattern-pdfs/Helgoland-en.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
  },
  {
    storageKey: "ID-6",
    name: "Ingrid Sweater",
    pdfUrl: "../pattern-pdfs/Ingrid_Sweater-small_highlighted.pdf",
    pdfStartPage: 3,
    pdfRotation: 0,
    isDefault: true,
  },
];