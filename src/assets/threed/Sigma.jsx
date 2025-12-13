import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Nav.css";
import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ switched to HashRouter
import Alpha from "./Alpha.jsx";
import Login from "./Login.jsx";
import Home from "../../Home.jsx"; // ✅ keep your Home page
import Reprint3D from "./Reprint3D.jsx";
import Cancel3D from "./Cancel3D.jsx";
import Account3D from "./Account3D.jsx";
import Result3D from "./Result3D.jsx";
import Testing from "./Testing.jsx";
import Advancedraw from "../../Advancedraw.jsx";
import Account2D from "../../Account2D.jsx";
import Ogresult from "../../Ogresult.jsx";


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
        <Route path="/reprint" element={<Reprint3D/>} />
      <Route path="/cancel" element={<Cancel3D/>} />
      <Route path="/account" element={<Account3D/>}/>
     <Route path="/result" element={<Result3D/>}/>
     <Route path="/account2d" element={<Account2D/>}/>
      <Route path="/advancedraw" element={<Advancedraw/>}/>
      <Route path="/ogresult" element={<Ogresult/>}/>
      </Routes>
    </HashRouter>
  );
}
