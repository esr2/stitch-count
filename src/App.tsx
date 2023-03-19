import React, { useState } from "react";
import "./App.scss";
import ProjectPicker from "./ProjectPicker";
import Project from "./Project";
import FreeStyleProject from "./FreeStyleProject";
import { NavbarBrand, Navbar, Container } from "reactstrap";
import { ProjectDetails } from "./ProjectDetails";

function App() {
  const [selectedDetails, setSelectedDetails] = useState<ProjectDetails>();

  function onProjectPick(project: ProjectDetails) {
    setSelectedDetails(project);
  }

  let projectComponent;
  if (!selectedDetails) {
    projectComponent = <ProjectPicker onProjectPick={onProjectPick} />;
  } else if (!!selectedDetails.patternJson) {
    projectComponent = <Project project={selectedDetails} />;
  } else {
    projectComponent = <FreeStyleProject project={selectedDetails} />;
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
