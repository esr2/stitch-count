import React, { useEffect, useState } from "react";
import { ProjectDetails } from "./ProjectDetails";
import Counter from "./Counter";
import { Card, CardHeader } from "reactstrap";
import PatternViewer from "./PatternViewer";
import { getRepeatInfo } from "./storage";

function Project(props: { project: ProjectDetails }) {
  const { storageKey } = props.project;
  const [globalIndex, setGlobalIndex] = useState<number>(() => {
    return parseInt(localStorage.getItem(storageKey) || "1");
  });
  let repeatInfo = getRepeatInfo(storageKey);

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
    numRows: repeatInfo[0].numRows,
    showRelativeIndex: repeatInfo[0].offset === 1,
    showRepeats: repeatInfo[0].numRepeats !== 1,
    repeats: [
      {
        startIndex: repeatInfo[0].offset,
        maxRepeats: repeatInfo[0].numRepeats,
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
