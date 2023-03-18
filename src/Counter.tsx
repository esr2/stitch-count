import React, { useState } from "react";
import { Progress } from "reactstrap";

export interface CounterDetails {
  name: string;
  notes: object;
  numRows: number;
  showRelativeIndex?: boolean;
  showRepeats?: boolean;
  repeats: { startIndex: number; maxRepeats: number }[];
}

function Counter(props: { details: CounterDetails; globalIndex: number }) {
  const { name, showRelativeIndex, numRows, repeats } = props.details;
  const globalIndex = props.globalIndex;

  function isWithinRepeat(
    globalIndex: number,
    startIndex: number,
    maxRepeats: number
  ): boolean {
    if (globalIndex < startIndex) {
      return false;
    }

    return globalIndex < numRows * maxRepeats + startIndex;
  }

  function getRepeat(globalIndex: number) {
    return repeats.find(
      (repeat: { startIndex: number; maxRepeats: number }): boolean => {
        return isWithinRepeat(
          globalIndex,
          repeat.startIndex,
          repeat.maxRepeats
        );
      }
    );
  }

  // Adjust previously calculated index value to account for whether the index
  // should be shown relative to the repeat block or to the global index.
  function calculateIndex(calculatedValue: number, startIndex: number): number {
    return showRelativeIndex
      ? calculatedValue - startIndex + 1
      : calculatedValue;
  }

  // Calculate state to render
  const repeat = getRepeat(globalIndex);
  if (!repeat) {
    return null;
  }

  let index: number, numRepeats: number;
  const { startIndex, maxRepeats } = repeat;
  if (globalIndex < startIndex + numRows) {
    index = calculateIndex(globalIndex, startIndex);
    numRepeats = 0;
  } else {
    let remainder = globalIndex - startIndex;
    index = calculateIndex(startIndex + (remainder % numRows), startIndex);
    numRepeats = Math.floor(remainder / numRows);
  }
  const perecent = Math.floor((numRepeats / maxRepeats) * 100);

  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        {name && <div className="col">{name}</div>}
        <div className={`col ${name ? "col-4" : ""}`}>
          <h3 className={`${name ? "text-right" : "text-center"}`}>{index}</h3>
        </div>
      </div>
      {maxRepeats > 1 && (
        <Progress max="100" value={perecent}>
          {numRepeats} / {maxRepeats}
        </Progress>
      )}
    </li>
  );
}

Counter.defaultProps = {
  details: {
    name: "",
    showRepeats: false,
    showRelativeIndex: false,
    notes: [],
    numRows: -1,
    repeats: [],
  },
  globalIndex: 1,
};

export default Counter;
