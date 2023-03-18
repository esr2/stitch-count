import { Card, CardBody, CardHeader, Button } from "reactstrap";

import { ProjectDetails, PROJECT_VALUES } from "./ProjectDetails";
import React, { useState } from "react";
import PropTypes from "prop-types";

function ProjectPicker(props: { onProjectPick: (projectId: string) => void }) {
  const defaultDetails =
    PROJECT_VALUES.find((value) => {
      return value.isDefault;
    }) || PROJECT_VALUES[0];

  const [selectedId, setSelectedId] = useState(defaultDetails.storageKey);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(e.target.id);
  };
  const onButtonPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onProjectPick(selectedId);
  };

  return (
    <Card className="shadow">
      <CardHeader>Projects</CardHeader>
      <CardBody>
        {PROJECT_VALUES.map((value: ProjectDetails) => {
          return (
            <div className="custom-control custom-radio mb-3">
              <input
                className="custom-control-input"
                id={value.storageKey}
                defaultChecked={value.isDefault}
                onChange={onChange}
                name="custom-radio-2"
                type="radio"
              />
              <label
                className="custom-control-label"
                htmlFor={value.storageKey}
              >
                {value.name}
              </label>
            </div>
          );
        })}

        <Button color="primary" onClick={onButtonPress}>
          Select
        </Button>
      </CardBody>
    </Card>
  );
}

ProjectPicker.propTypes = {
  onProjectPick: PropTypes.func,
};

export default ProjectPicker;
