import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entrance from "./Pages/Entrance";
import Home from "./Pages/Home";
import { FaceReCog } from "./Pages/FaceRecog";
import ViewPost from "./Pages/ViewPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/home" element={<Home />} />
        <Route path="/facerecognition" element={<FaceReCog />} />
        <Route path="/view" element={<ViewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
