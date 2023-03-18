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
      <Navbar className="navbar-horizontal navbar-dark bg-default" expand="lg">
        <Container>
          <NavbarBrand href="#" onClick={(e) => e.preventDefault()}>
            {!selectedProjectId ? "Stitch Count" : selectedProjectId}
          </NavbarBrand>
        </Container>
      </Navbar>
      {!selectedProjectId ? (
        <ProjectPicker onProjectPick={onProjectPick} />
      ) : (
        <Project projectId={selectedProjectId} />
      )}
    </>
  );
}

export default App;
