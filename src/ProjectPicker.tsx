import { Card, CardBody, CardHeader, Button } from "reactstrap";

import { ProjectDetails, PROJECT_VALUES } from "./ProjectDetails";

function ProjectPicker() {
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

        <Button color="primary">Pick</Button>
      </CardBody>
    </Card>
  );
}

export default ProjectPicker;
