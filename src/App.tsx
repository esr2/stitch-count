import React, { useState } from "react";
import "./App.scss";
import ProjectPicker from "./ProjectPicker";
import Project from "./Project";
import { NavbarBrand, Navbar, Container, Button } from "reactstrap";
import { ProjectDetails } from "./ProjectDetails";
import FreeStyleEditor from "./FreeStyleEditor";

function App() {
  const [selectedDetails, setSelectedDetails] = useState<ProjectDetails>();
  const [inFreeStyleEditMode, setInFreeStyleEditMode] = useState(false);

  function onProjectPick(project: ProjectDetails) {
    setSelectedDetails(project);
  }

  let projectComponent;
  let showEditButton = false;
  if (!selectedDetails) {
    projectComponent = <ProjectPicker onProjectPick={onProjectPick} />;
  } else if (inFreeStyleEditMode) {
    projectComponent = (
      <FreeStyleEditor
        project={selectedDetails}
        exitFn={() => setInFreeStyleEditMode(false)}
      />
    );
  } else {
    projectComponent = <Project project={selectedDetails} />;
    showEditButton = !selectedDetails.patternJson;
  }

  return (
    <>
      <Navbar
        className="navbar-main navbar-transparent navbar-light bg-default"
        expand="lg"
      >
        <Container>
          <NavbarBrand href="#" onClick={(e) => e.preventDefault()}>
            {!selectedDetails ? "Stitch Count" : selectedDetails.name}
          </NavbarBrand>
          {showEditButton && (
            <Button onClick={() => setInFreeStyleEditMode(true)}>
              <span className="btn-inner--icon">
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </span>
            </Button>
          )}
        </Container>
      </Navbar>
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container>{projectComponent}</Container>
          </section>
          <section className="section section-lg bg-gradient-blue">
            <Container className="pt-lg pb-300"></Container>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
