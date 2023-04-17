import React, { useEffect, useState } from "react";
import {
  DEFAULT_FREESTYLE_NUM_REPEATS,
  DEFAULT_FREESTYLE_NUM_ROWS,
  DEFAULT_FREESTYLE_OFFSET,
  ProjectDetails,
} from "./ProjectDetails";
import Counter from "./Counter";
import { Card, CardHeader } from "reactstrap";
import PatternViewer from "./PatternViewer";

function Project(props: { project: ProjectDetails }) {
  const { storageKey } = props.project;
  const [globalIndex, setGlobalIndex] = useState<number>(() => {
    return parseInt(localStorage.getItem(storageKey) || "1");
  });
  const numRepeats = parseInt(
    localStorage.getItem(`${storageKey}-numRepeats`) ||
      DEFAULT_FREESTYLE_NUM_REPEATS
  );
  const numRows = parseInt(
    localStorage.getItem(`${storageKey}-numRows`) || DEFAULT_FREESTYLE_NUM_ROWS
  );
  const offset = parseInt(
    localStorage.getItem(`${storageKey}-offset`) || DEFAULT_FREESTYLE_OFFSET
  );

  useEffect(() => {
    localStorage.setItem(storageKey, globalIndex.toString());
  }, [storageKey, globalIndex]);

  const increase = () => {
    setGlobalIndex(globalIndex + 1);
  };
  const decrease = () => {
    setGlobalIndex(globalIndex - 1);
  };

  const details = {
    name: "",
    notes: [],
    numRows,
    showRelativeIndex: offset === 1,
    showRepeats: numRepeats !== 1,
    repeats: [
      {
        startIndex: offset,
        maxRepeats: numRepeats,
      },
    ],
  };

  return (
    <>
      <Card className="shadow">
        <CardHeader>
          <Counter
            details={details}
            globalIndex={globalIndex}
            includeButtons={true}
            decrease={decrease}
            increase={increase}
          />
        </CardHeader>
      </Card>
      <PatternViewer details={props.project} />
    </>
  );
}

export default Project;
