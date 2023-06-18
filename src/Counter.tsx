import React from "react";
import { Alert, Progress } from "reactstrap";
import ButtonRow from "./ButtonRow";

export type CounterRepeat = {
  startIndex: number;
  maxRepeats: number;
  // The equivalent chart index of the start index. Useful only for charts that
  // have repeat sections and continue their numbering as if they didn't.
  alias?: number;
};

export interface CounterDetails {
  name: string;
  notes: { index: number; value: string }[];
  numRows: number;
  showRelativeIndex?: boolean;
  showRepeats?: boolean;
  repeats: CounterRepeat[];
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
    return repeats.find((repeat: CounterRepeat): boolean => {
      return isWithinRepeat(globalIndex, repeat.startIndex, repeat.maxRepeats);
    });
  }

  // Adjust previously calculated index value to account for whether the index
  // should be shown relative to the repeat block or to the global index.
  function adjustIndex(
    calculatedValue: number,
    startIndex: number,
    alias: number | undefined
  ): { index: number; chartAlias: number | null } {
    return {
      index: showRelativeIndex
        ? calculatedValue - startIndex + 1
        : calculatedValue,
      chartAlias: alias ? calculatedValue - startIndex + alias : null,
    };
  }

  // Calculate state to render
  const repeat = getRepeat(globalIndex);
  if (!repeat) {
    return props.includeButtons ? (
      <>
        <ButtonRow
          decrease={props.decrease}
          increase={props.increase}
          index={globalIndex.toString()}
        />
        <Alert color="danger">Counter Overflow</Alert>
      </>
    ) : null;
  }

  const { startIndex, maxRepeats, alias } = repeat;
  const isWithinFirstRepeat = globalIndex < startIndex + numRows;

  const numRowsIntoRepeat = globalIndex - startIndex;
  const numRepeats = isWithinFirstRepeat
    ? 0
    : Math.floor(numRowsIntoRepeat / numRows);
  let indexWithinRepeat = startIndex + (numRowsIntoRepeat % numRows);
  const { index, chartAlias } = adjustIndex(
    isWithinFirstRepeat ? globalIndex : indexWithinRepeat,
    startIndex,
    alias
  );

  const perecent = Math.floor((numRepeats / maxRepeats) * 100);

  const getNoteAtIndex = () => {
    const notesAtIndex = notes.filter(
      (value: { index: number; value: string }) => {
        return value.index === index;
      }
    );
    if (notesAtIndex.length > 1) {
      return <Alert color="danger">"Multiple notes specified"</Alert>;
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
          index={!!chartAlias ? chartAlias.toString() : index.toString()}
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
