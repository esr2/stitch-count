import { CounterDetails } from "./Counter";
import BeMineJSON from "./pattern-json/be_mine_cardigan.json";
import CelticThrowJSON from "./pattern-json/celtic_throw.json";
import DrachenfelsJSON from "./pattern-json/drachenfels.json";
import GeometricScarfJSON from "./pattern-json/geometric_scarf.json";
import HelgolandJSON from "./pattern-json/helgoland.json";

export interface ProjectDetails {
  storageKey: string;
  name: string;
  patternJson?: { name: string; counters: CounterDetails[] };
  pdfUrl: string;
  // Zero index
  pdfStartPage: number;
  isDefault?: boolean;
}

export const DEFAULT_FREESTYLE_NUM_REPEATS = "1";
export const DEFAULT_FREESTYLE_NUM_ROWS = "500";
export const DEFAULT_FREESTYLE_OFFSET = "1";

// Next ID: 12
export const PROJECT_VALUES: ProjectDetails[] = [
  {
    storageKey: "ID-3",
    name: "Be Mine Cardigan",
    patternJson: BeMineJSON,
    pdfUrl: "./pattern-pdfs/Be_Mine_Cardigan-medium_highlighted.pdf",
    pdfStartPage: 3,
  },
  {
    storageKey: "ID-1",
    name: "Celtic Throw",
    patternJson: CelticThrowJSON,
    pdfUrl: "./pattern-pdfs/AK-Celtic_Traveller_Throw-v052220.pdf",
    pdfStartPage: 5,
  },
  {
    storageKey: "ID-2",
    name: "Drachenfels",
    patternJson: DrachenfelsJSON,
    pdfUrl: "./pattern-pdfs/Drachenfels.pdf",
    pdfStartPage: 3,
  },
  {
    storageKey: "ID-5",
    name: "Geometric Scarf",
    patternJson: GeometricScarfJSON,
    pdfUrl: "./pattern-pdfs/Geometric-scarf.pdf",
    pdfStartPage: 0,
  },
  {
    storageKey: "ID-4",
    name: "Helgoland",
    patternJson: HelgolandJSON,
    pdfUrl: "./pattern-pdfs/Helgoland-en.pdf",
    pdfStartPage: 3,
  },
  {
    storageKey: "ID-6",
    name: "Ingrid Sweater",
    pdfUrl: "./pattern-pdfs/Ingrid_Sweater-small_highlighted.pdf",
    pdfStartPage: 3,
    isDefault: false,
  },
  {
    storageKey: "ID-7",
    name: "Ginevra Mitts",
    pdfUrl: "./pattern-pdfs/Ginevra_Mitts_worsted.pdf",
    pdfStartPage: 4,
    isDefault: false,
  },
  {
    storageKey: "ID-8",
    name: "Daisy Chain Top",
    pdfUrl: "./pattern-pdfs/Daisy_Chain_Cardigan.pdf",
    pdfStartPage: 1,
    isDefault: false,
  },
  {
    storageKey: "ID-9",
    name: "Border for Cable Blanket",
    pdfUrl: "./pattern-pdfs/Border_cable_blanket.pdf",
    pdfStartPage: 1,
    isDefault: false,
  },
  {
    storageKey: "ID-10",
    name: "Minarets at Midnight",
    pdfUrl: "./pattern-pdfs/Minarets_At_Midnight.pdf",
    pdfStartPage: 2,
    isDefault: false,
  },
  {
    storageKey: "ID-11",
    name: "Unicorn Sweater",
    pdfUrl: "./pattern-pdfs/Unicorn_Chart_4y.pdf",
    pdfStartPage: 1,
    isDefault: true,
  },
];
