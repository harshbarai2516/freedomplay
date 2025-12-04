import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Nav.css";
import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ switched to HashRouter
import Alpha from "./Alpha.jsx";
import Login from "./Login.jsx";
import Home from "../../Home.jsx"; // ✅ keep your Home page

export default function Sigma() {
  return (
    // ✅ HashRouter replaces BrowserRouter here
    <HashRouter>
      <Routes>
        {/* Default route → Login */}
        <Route path="/" element={<Login />} />

        {/* Other pages */}
        <Route path="/home" element={<Alpha />} />
        <Route path="/twod" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
