import {
  DEFAULT_FREESTYLE_NUM_REPEATS,
  DEFAULT_FREESTYLE_NUM_ROWS,
  DEFAULT_FREESTYLE_OFFSET,
} from "./ProjectDetails";

export type RepeatInfo = {
  numRows: number;
  numRepeats: number;
  // The row the repeat starts on relative to the Global Index.
  offset: number;
  // The equivalent chart index of the start index. Useful only for charts that
  // have repeat sections and continue their numbering as if they didn't.
  chartOffset?: number;
};

export function getRepeatInfo(storageKey: string): RepeatInfo[] {
  let repeatInfo = JSON.parse(
    localStorage.getItem(`${storageKey}-repeatInfo`) || "[]"
  );
  if (repeatInfo.length === 0) {
    repeatInfo = DEFAULT_REPEAT_INFO;
  }
  return repeatInfo;
}

export const DEFAULT_REPEAT_INFO = [
  {
    numRepeats: parseInt(DEFAULT_FREESTYLE_NUM_REPEATS),
    numRows: parseInt(DEFAULT_FREESTYLE_NUM_ROWS),
    offset: parseInt(DEFAULT_FREESTYLE_OFFSET),
  },
];
