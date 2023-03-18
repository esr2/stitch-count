import PropTypes from "prop-types";

function Project(props: { projectId: string }) {
  return <>{props.projectId}</>;
}

Project.propTypes = {
  projectId: PropTypes.string,
};

export default Project;
