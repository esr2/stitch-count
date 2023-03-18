import PropTypes from "prop-types";
import { ProjectDetails, PROJECT_VALUES } from "./ProjectDetails";

function Project(props: { project: ProjectDetails }) {
  const name = props.project.name;

  return <>{name}</>;
}

Project.propTypes = {
  projectId: PropTypes.string,
};

export default Project;
