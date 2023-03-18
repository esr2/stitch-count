import React, { useState } from "react";
import "./App.scss";
import ProjectPicker from "./ProjectPicker";
import Project from "./Project";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState("");

  function onProjectPick(projectId: string) {
    setSelectedProjectId(projectId);
  }

  return (
    <>
      {!selectedProjectId ? (
        <ProjectPicker />
      ) : (
        <Project projectId={selectedProjectId} />
      )}
    </>
  );
}

export default App;
