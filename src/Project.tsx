import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ProjectDetails, PROJECT_VALUES } from "./ProjectDetails";
import Counter, { CounterDetails } from "./Counter";
import { Card, CardBody, CardHeader, Button } from "reactstrap";

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

  const counters = patternJson.counters.map((counterJson: CounterDetails) => {
    return <Counter details={counterJson} globalIndex={globalIndex} />;
  });

  return (
    <Card className="shadow">
      {/* TODO make this the first counter */}
      <CardHeader>
        <div className="row align-items-center">
          <div className="col">
            <Button block color="primary" size="lg" onClick={() => decrease()}>
              <i className="fa fa-minus"></i>
            </Button>
          </div>{" "}
          <div className="col">
            <h1 className="display-1 text-center">{globalIndex}</h1>
          </div>
          <div className="col">
            <Button block color="primary" size="lg" onClick={() => increase()}>
              <i className="fa fa-plus"></i>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <ul className="list-group list-group-flush">{counters}</ul>
      </CardBody>
    </Card>
  );
}

export default Project;
