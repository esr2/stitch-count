import React, { useEffect, useState } from "react";
import { ProjectDetails } from "./ProjectDetails";
import Counter, { CounterDetails } from "./Counter";
import { Card, CardBody, CardHeader } from "reactstrap";

function Project(props: { project: ProjectDetails }) {
  const { storageKey, patternJson } = props.project;
  const [globalIndex, setGlobalIndex] = useState<number>(() => {
    return parseInt(localStorage.getItem(storageKey) || "1");
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

  const counters = patternJson?.counters.map((counterJson: CounterDetails) => {
    return (
      <Counter
        details={counterJson}
        globalIndex={globalIndex}
        includeButtons={false}
        decrease={decrease}
        increase={increase}
      />
    );
  });

  return (
    <Card className="shadow">
      <CardHeader>
        <Counter
          details={patternJson?.counters[0]}
          globalIndex={globalIndex}
          includeButtons={true}
          decrease={decrease}
          increase={increase}
        />
      </CardHeader>
      <CardBody>
        <ul className="list-group list-group-flush">{counters?.slice(1)}</ul>
      </CardBody>
    </Card>
  );
}

export default Project;
