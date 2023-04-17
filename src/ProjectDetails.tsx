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
  pdfStartPage: number;
  isDefault?: boolean;
}

export const DEFAULT_FREESTYLE_NUM_REPEATS = "1";
export const DEFAULT_FREESTYLE_NUM_ROWS = "500";
export const DEFAULT_FREESTYLE_OFFSET = "1";

// Next ID: 8
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
    isDefault: true,
  },
  {
    storageKey: "ID-7",
    name: "Three Pines Mitts",
    pdfUrl: "./pattern-pdfs/Three_Pines_v5.pdf",
    pdfStartPage: 2,
    isDefault: false,
  },
];
