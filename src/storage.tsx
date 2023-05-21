import {
  DEFAULT_FREESTYLE_NUM_REPEATS,
  DEFAULT_FREESTYLE_NUM_ROWS,
  DEFAULT_FREESTYLE_OFFSET,
} from "./ProjectDetails";

export function getRepeatInfo(storageKey: string): {
  numRows: number;
  numRepeats: number;
  offset: number;
}[] {
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
