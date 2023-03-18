import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ProjectDetails, PROJECT_VALUES } from "./ProjectDetails";
import { Card, CardBody, CardHeader, Button } from "reactstrap";

function Project(props: { project: ProjectDetails }) {
  const name: string = props.project.name;
  const counters = [];
  const [globalIndex, setGlobalIndex] = useState<number>(() => {
    const storageKey = props.project.storageKey;
    return parseInt(localStorage.getItem(storageKey) || "1");
  });

  useEffect(() => {
    localStorage.setItem(props.project.storageKey, globalIndex.toString());
  });

  const increase = () => {
    setGlobalIndex(globalIndex + 1);
  };
  const decrease = () => {
    setGlobalIndex(globalIndex - 1);
  };

  return (
    <Card className="shadow">
      <CardHeader>
        <div className="row align-items-center">
          <div className="col">
            <Button block color="primary" size="lg" onClick={() => increase()}>
              <i className="fa fa-plus"></i>
            </Button>
          </div>
          <div className="col">
            <h1 className="display-1 text-center">{globalIndex}</h1>
          </div>
          <div className="col">
            <Button block color="primary" size="lg" onClick={() => decrease()}>
              <i className="fa fa-minus"></i>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

Project.propTypes = {
  projectId: PropTypes.string,
};

export default Project;
