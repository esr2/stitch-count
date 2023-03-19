import React from "react";
import { Alert, Progress } from "reactstrap";
import ButtonRow from "./ButtonRow";

export interface CounterDetails {
  name: string;
  notes: { index: number; value: string }[];
  numRows: number;
  showRelativeIndex?: boolean;
  showRepeats?: boolean;
  repeats: { startIndex: number; maxRepeats: number }[];
}

function Counter(props: {
  details: CounterDetails;
  globalIndex: number;
  includeButtons: boolean;
  decrease: () => void;
  increase: () => void;
}) {
  const { name, showRelativeIndex, numRows, repeats, notes } = props.details;
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
    return props.includeButtons ? (
      <ButtonRow
        decrease={props.decrease}
        increase={props.increase}
        index={globalIndex.toString()}
      />
    ) : null;
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

  const getNoteAtIndex = () => {
    const notesAtIndex = notes.filter(
      (value: { index: number; value: string }) => {
        return value.index === index;
      }
    );
    if (notesAtIndex.length > 1) {
      return <Alert color="error">"Multiple notes specified"</Alert>;
    } else if (notesAtIndex.length === 1) {
      return <Alert color="info">{notesAtIndex[0].value}</Alert>;
    }
    return null;
  };

  const progressAndNotes = (
    <>
      {maxRepeats > 1 && (
        <Progress max="100" value={perecent}>
          {numRepeats} / {maxRepeats}
        </Progress>
      )}
      {getNoteAtIndex()}
    </>
  );

  if (props.includeButtons) {
    return (
      <>
        <ButtonRow
          decrease={props.decrease}
          increase={props.increase}
          index={index.toString()}
        />
        {progressAndNotes}
      </>
    );
  }
  return (
    <li key={name} className="list-group-item">
      <div className="row align-items-center">
        {name && <div className="col">{name}</div>}
        <div className={`col ${name ? "col-4" : ""}`}>
          <h3 className={`${name ? "text-right" : "text-center"}`}>{index}</h3>
        </div>
      </div>
      {progressAndNotes}
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
