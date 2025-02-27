import React from "react";
import Home from "./home/Home";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import About_us from "./pages/About_us";
import AskExpert from "./pages/AskExpert";
import Login from "./components/Login";
import DiseaseDetection from "./pages/DiseaseDetection";
import FaqHelp from "./pages/FaqHelp";

const App = () => {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<About_us />} />
          <Route path="/askexpert" element={<AskExpert />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/diseasedetection" element={<DiseaseDetection />} />
          <Route path="/help" element={<FaqHelp />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
