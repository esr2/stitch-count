import React, { useEffect, useState } from "react";
import { ProjectDetails } from "./ProjectDetails";
import Counter, { CounterDetails } from "./Counter";
import { Card, CardBody, CardHeader } from "reactstrap";

function Project(props: { project: ProjectDetails }) {
  const { storageKey } = props.project;
  const [globalIndex, setGlobalIndex] = useState<number>(() => {
    return parseInt(localStorage.getItem(storageKey) || "1");
  });
  const [numRepeats, setNumRepeats] = useState<number>(() => {
    return parseInt(localStorage.getItem(`${storageKey}-numRepeats`) || "1");
  });
  const [numRows, setNumRows] = useState<number>(() => {
    return parseInt(localStorage.getItem(`${storageKey}-numRows`) || "500");
  });

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
    showRelativeIndex: true,
    showRepeats: numRepeats !== 1,
    repeats: [
      {
        startIndex: 1,
        maxRepeats: numRepeats,
      },
    ],
  };

  return (
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
  );
}

export default Project;
