import React, { useEffect, useState } from "react";
import { ProjectDetails } from "./ProjectDetails";
import Counter, { CounterDetails } from "./Counter";
import { Card, CardBody, CardHeader } from "reactstrap";
import PatternViewer from "./PatternViewer";
import { RepeatInfo, getRepeatInfo } from "./storage";

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

  const counterDetails = !!patternJson
    ? patternJson.counters
    : getRepeatInfo(storageKey).map((info: RepeatInfo, index: number) => {
        const notes =
          index === 0
            ? []
            : [
                {
                  index: info.numRows,
                  // TODO: Eventually have none hardcoded notes and title
                  value: "Decrease at start/end of round",
                },
              ];

        return {
          // TODO: Eventually have none hardcoded notes and title
          name: index === 0 ? "" : "Decreases",
          notes,
          numRows: info.numRows,
          showRelativeIndex: info.offset === 1,
          showRepeats: info.numRepeats !== 1,
          repeats: [
            {
              startIndex: info.offset,
              maxRepeats: info.numRepeats,
              alias: info.chartOffset,
            },
          ],
        };
      });

  const counters = counterDetails.map((details: CounterDetails) => {
    return (
      <Counter
        details={details}
        globalIndex={globalIndex}
        includeButtons={false}
        decrease={decrease}
        increase={increase}
      />
    );
  });

  return (
    <>
      <Card className="shadow mb-1">
        <CardHeader>
          <Counter
            details={counterDetails[0]}
            globalIndex={globalIndex}
            includeButtons={true}
            decrease={decrease}
            increase={increase}
          />
        </CardHeader>
        {counters?.length && counters.length > 1 && (
          <CardBody>
            <ul className="list-group list-group-flush">
              {counters?.slice(1)}
            </ul>
          </CardBody>
        )}
      </Card>
      <PatternViewer details={props.project} />
    </>
  );
}

export default Project;
