import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Nav.css";

const Nav = () => {
  const [currentDraw, setCurrentDraw] = useState("Loading...");
  const [results, setResults] = useState({ A: ["-", "-", "-"], B: ["-", "-", "-"], C: ["-", "-", "-"] });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("https://freedomplay.us/api/results/3dPreviousResult");
        const data = res.data.results;

        // Current India Time
        const now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);

        // Round DOWN to nearest 15 min slot
        const mins = now.getMinutes();
        now.setMinutes(mins - (mins % 15));

        // For search: "11:00:00" format
        const slotString = now.toTimeString().slice(0, 8);

        // For display: "11:00 AM" format
        const formattedSlot = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setCurrentDraw(formattedSlot);

        // Filter A/B/C
        const A = data.find((x) => x.draw_time === slotString && x.game === "A");
        const B = data.find((x) => x.draw_time === slotString && x.game === "B");
        const C = data.find((x) => x.draw_time === slotString && x.game === "C");

        setResults({
          A: A ? A.straight.split("") : ["-", "-", "-"],
          B: B ? B.straight.split("") : ["-", "-", "-"],
          C: C ? C.straight.split("") : ["-", "-", "-"],
        });

      } catch (error) {
        console.error("ERROR:", error);
      }
    };

    fetchResults();
    const interval = setInterval(fetchResults, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid text-light py-0 nav-responsive">
      <div className="d-flex flex-row flex-nowrap justify-content-start align-items-start overflow-auto">

        {/* Draw Time */}
        <div className="text-center me-2 w-25 d-flex flex-column align-items-center">
          <div className="fw-bold py-1 px-5 bg-dark text-white">
            Draw <br />
            {currentDraw}
          </div>
        </div>

        {/* Box A */}
        <div className="text-center me-1 w-100">
          <div className="fw-bold py-2 mb-0 text-white" style={{ background: "linear-gradient(to right, #2196f3, #0d47a1)" }}>A</div>
          <div className="d-flex">
            {results.A.map((n, i) => (
              <div key={i} className="flex-fill py-2 border text-white fw-bold" style={{ background: "linear-gradient(to right, #009688, #004d40)" }}>{n}</div>
            ))}
          </div>
        </div>

        {/* Box B */}
        <div className="text-center me-1 w-100">
          <div className="fw-bold py-2 mb-0 text-white" style={{ background: "linear-gradient(45deg, #000000, #1a1a1a)" }}>B</div>
          <div className="d-flex">
            {results.B.map((n, i) => (
              <div key={i} className="flex-fill py-2 border text-white fw-bold" style={{ background: "linear-gradient(to right, #009688, #004d40)" }}>{n}</div>
            ))}
          </div>
        </div>

        {/* Box C */}
        <div className="text-center me-2 w-100">
          <div className="fw-bold py-2 mb-0 text-white" style={{ background: "linear-gradient(to right, #e0218a, #ff3e6c)" }}>C</div>
          <div className="d-flex">
            {results.C.map((n, i) => (
              <div key={i} className="flex-fill py-2 border text-white fw-bold" style={{ background: "linear-gradient(to right, #009688, #004d40)" }}>{n}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Nav;
