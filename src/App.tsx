import React, { useState } from "react";
import "./App.scss";
import ProjectPicker from "./ProjectPicker";
import Project from "./Project";
import { NavbarBrand, Navbar, Container } from "reactstrap";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState("");

  function onProjectPick(projectId: string) {
    setSelectedProjectId(projectId);
  }

  return (
    <>
      <Navbar
        className="navbar-main navbar-transparent navbar-light bg-default"
        expand="lg"
      >
        <Container>
          <NavbarBrand href="#" onClick={(e) => e.preventDefault()}>
            {!selectedProjectId ? "Stitch Count" : selectedProjectId}
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
            <Container>
              {!selectedProjectId ? (
                <ProjectPicker onProjectPick={onProjectPick} />
              ) : (
                <Project projectId={selectedProjectId} />
              )}
            </Container>
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
