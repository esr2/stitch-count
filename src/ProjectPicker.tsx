import { Form } from "react-bootstrap";

import { ProjectDetails, PROJECT_VALUES } from "./ProjectDetails";

function ProjectPicker() {
  const projectOptions = PROJECT_VALUES.map((value: ProjectDetails) => {
    return <option>{value.name}</option>;
  });

  return (
    <Form.Group>
      <select
        className="form-control form-control-lg"
        id="projectPickerSelect"
        defaultValue={"Ingrid Sweater"}
      >
        {projectOptions}
      </select>
    </Form.Group>
  );
}

export default ProjectPicker;
