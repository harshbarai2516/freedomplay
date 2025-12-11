import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav4 = ({ onDrawSelect }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(null);
  const [remainingDraws, setRemainingDraws] = useState([]);
  const [selectedDraws, setSelectedDraws] = useState([]);
  const [drawCount, setDrawCount] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("username");
    if (u) setUsername(u);

    // 🚀 NEW BALANCE API (POST)
    if (u) {
      axios
        .post("https://freedomplay.us/api/balance", {
          username: u,
        })
        .then((res) => {
          setBalance(res.data?.balance);
        })
        .catch((err) => {
          console.error("Balance API Error:", err);
        });
    }

    generateRemainingDraws();
  }, []);

  const generateRemainingDraws = () => {
    const all = [];
    const s = new Date();
    s.setHours(9, 0, 0, 0);
    const e = new Date();
    e.setHours(22, 0, 0, 0);

    while (s <= e) {
      const h = s.getHours();
      const m = s.getMinutes();
      const am = h >= 12 ? "PM" : "AM";
      const f = `${String(h > 12 ? h - 12 : h).padStart(2, "0")}:${String(
        m
      ).padStart(2, "0")} ${am}`;
      all.push(f);
      s.setMinutes(s.getMinutes() + 15);
    }

    const now = new Date();
    const r = all.filter((t) => {
      const [ti, p] = t.split(" ");
      const [hh, mm] = ti.split(":");
      let H = Number(hh);
      if (p === "PM" && H !== 12) H += 12;
      if (p === "AM" && H === 12) H = 0;
      const d = new Date();
      d.setHours(H, Number(mm), 0, 0);
      return d > now;
    });

    setRemainingDraws(r);
  };

  const Refresh = () => window.location.reload();

  const toggleDrawSelection = (t) =>
    setSelectedDraws((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const handleDrawCountChange = (e) => {
    const v = e.target.value.replace(/\D/g, "");
    setDrawCount(v);
    if (!v) return setSelectedDraws([]);
    const c = Math.min(Number(v), remainingDraws.length);
    setSelectedDraws(remainingDraws.slice(0, c));
  };

  const handleOk = () => {
    if (onDrawSelect) onDrawSelect(selectedDraws);
    // alert(`Selected Draws: ${selectedDraws.join(", ")}`);
  };

  return (
    <div
      className="container-fluid fw-bold py-0 px-0 px-sm-3 nav4-content"
      style={{ marginTop: "-4px" }}
      id="nav4Container"
    >
      <div
        className="d-flex flex-nowrap align-items-center justify-content-between gap-1 gap-sm-2 gap-md-3"
        style={{ overflowX: "auto", minHeight: "15px", width: "100%" }}
      >
        <div
          className="text-danger fw-bold flex-shrink-0 text-nowrap desktop-big-font"
          style={{
            fontSize: "clamp(0.7rem, 1.0vw, 0.5rem)",
            minWidth: "fit-content",
          }}
        >
          {username
            ? `${username} : ${balance ?? "Loading..."}`
            : "Guest : 00000"}
        </div>

        <div
          className="d-flex flex-nowrap gap-1 gap-sm-1 gap-md-1"
          style={{
            overflowX: "auto",
            flex: "1 1 auto",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={Refresh}
            className="btn rounded-0 text-light fw-bold desktop-big-font"
            style={{
              minWidth: "50px",
              fontSize: "clamp(0.6rem, 0.5vw, 0.5rem)",
              padding: "0.3rem 0.3rem",
              whiteSpace: "nowrap",
              flexShrink: 0,
              flex: "1 1 auto",
              background: "linear-gradient(to right, #dc3545, #a71d2a)",
            }}
          >
            REFRESH(F5)
          </button>
          <button
            onClick={() => navigate("/result")}
            className="btn rounded-0 text-light fw-bold desktop-big-font"
            style={{
              minWidth: "50px",
              fontSize: "clamp(0.55rem, 0.5vw, 0.75rem)",
              padding: "0.3rem 0.3rem",
              whiteSpace: "nowrap",
              flexShrink: 0,
              flex: "1 1 auto",
              background: "linear-gradient(to right, #28a745, #1e7e34)",
            }}
          >
            RESULT(F1)
          </button>
          <button
            onClick={() => navigate("/account")}
            className="btn rounded-0 text-light fw-bold desktop-big-font"
            style={{
              minWidth: "50px",
              fontSize: "clamp(0.55rem, 0.5vw, 0.75rem)",
              padding: "0.3rem 0.3rem",
              whiteSpace: "nowrap",
              flexShrink: 0,
              flex: "1 1 auto",
              background: "linear-gradient(135deg, #495057, #adb5bd)",
              color: "white",
              border: "none",
            }}
          >
            ACCOUNT(F2)
          </button>
          <button
            onClick={() => navigate("/reprint")}
            className="btn rounded-0 text-light fw-bold desktop-big-font"
            style={{
              minWidth: "50px",
              fontSize: "clamp(0.55rem, 0.5vw, 0.75rem)",
              padding: "0.3rem 0.3rem",
              whiteSpace: "nowrap",
              flexShrink: 0,
              flex: "1 1 auto",
              background: "linear-gradient(to right, #007bff, #0056b3)",
            }}
          >
            REPRINT(F3)
          </button>
          <button
            onClick={() => navigate("/cancel")}
            className="btn rounded-0 text-light fw-bold desktop-big-font"
            style={{
              minWidth: "50px",
              fontSize: "clamp(0.55rem, 0.5vw, 0.75rem)",
              padding: "0.3rem 0.3rem",
              whiteSpace: "nowrap",
              flexShrink: 0,
              flex: "1 1 auto",
              background: "linear-gradient(135deg, #495057, #adb5bd)",
              color: "white",
              border: "none",
            }}
          >
            CANCEL(F4)
          </button>

          <button
            type="button"
            className="btn text-light rounded-0 fw-bold desktop-big-font"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{
              minWidth: "50px",
              fontSize: "clamp(0.55rem, 0.5vw, 0.75rem)",
              padding: "0.3rem 0.3rem",
              whiteSpace: "nowrap",
              flexShrink: 0,
              flex: "1 1 auto",
              background: "linear-gradient(to right, #dc3545, #a71d2a)",
            }}
          >
            ADVANCED DRAW(F9){" "}
            {selectedDraws.length > 0 && <sup>{selectedDraws.length}</sup>}
          </button>
        </div>
      </div>
       {/* ================== ADVANCED DRAW MODAL (FULLY OPTIMIZED) ================== */}
<div
  className="modal fade"
  id="staticBackdrop"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabIndex={-1}
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
  <div
    className="modal-dialog modal-dialog-centered"
    style={{
      maxWidth: "clamp(300px, 90vw, 900px)",
      margin: "0 auto",
    }}
  >
    <div
      className="modal-content"
      style={{
        borderRadius: "0.5rem",
        boxShadow: "0 5px 20px rgba(0,0,0,0.35)",
      }}
    >
      {/* ================= HEADER ================= */}
      <div
        className="modal-header"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "0.5rem 0.5rem 0 0",
          padding: "clamp(0.6rem, 2vw, 1rem)",
          border: "none",
        }}
      >
        <h1
          className="modal-title fw-bold"
          id="staticBackdropLabel"
          style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", margin: 0 }}
        >
          🎲 Advanced Draw
        </h1>

        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
          style={{ transform: "scale(0.9)" }}
        ></button>
      </div>

      {/* ================= BODY ================= */}
      <div
        className="modal-body"
        style={{
          maxHeight: "75vh",
          overflowY: "auto",
          padding: "clamp(0.8rem, 2vw, 1.2rem)",
        }}
      >
        <h5
          className="fw-bold mb-2"
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "#333",
            textAlign: "center",
          }}
        >
          📅 Select Draw Times
        </h5>

        {/* Input Box */}
        <div className="mb-3 text-center">
          <input
            type="text"
            value={drawCount}
            onChange={handleDrawCountChange}
            placeholder="Enter number of draws"
            className="form-control text-center fw-bold mx-auto d-block"
            style={{
              width: "100%",
              maxWidth: "230px",
              fontSize: "clamp(0.85rem,1.8vw,1rem)",
              padding: "0.5rem 0.7rem",
              borderRadius: "0.45rem",
              border: "2px solid #667eea",
            }}
          />
        </div>

        {/* Draw Time Buttons */}
        <div
          className="advanced-draw-buttons"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {remainingDraws.length > 0 ? (
            remainingDraws.map((time, index) => (
              <button
                key={index}
                onClick={() => toggleDrawSelection(time)}
                type="button"
                className={`btn ${
                  selectedDraws.includes(time)
                    ? "btn-success"
                    : "btn-outline-secondary"
                }`}
                style={{
                  fontSize: "clamp(0.75rem,1.5vw,0.95rem)",
                  padding: "0.3rem 0.55rem",
                  minWidth: "60px",
                  borderRadius: "0.3rem",
                  flex: "0 0 auto",
                  fontWeight: "600",
                  transition: "0.2s ease",
                  border: selectedDraws.includes(time)
                    ? "none"
                    : "1.5px solid #ccc",
                }}
              >
                {time}
              </button>
            ))
          ) : (
            <p className="text-danger fw-bold py-2">No remaining draws today</p>
          )}
        </div>

        {/* Selected Summary */}
        {selectedDraws.length > 0 && (
          <div
            className="alert alert-info mt-3 mb-0 text-center fw-bold"
            style={{
              fontSize: "clamp(0.75rem, 1.6vw, 0.95rem)",
              borderRadius: "0.4rem",
              padding: "0.6rem",
            }}
          >
            <strong>Selected: </strong>
            {selectedDraws.length} draw
            {selectedDraws.length > 1 ? "s" : ""} <br />
            {selectedDraws.join(", ")}
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div
        className="modal-footer"
        style={{
          padding: "clamp(0.7rem,2vw,1rem)",
          borderTop: "1px solid #eee",
        }}
      >
        <button
          type="button"
          className="btn flex-grow-1 fw-bold"
          data-bs-dismiss="modal"
          style={{
            background: "transparent",
            color: "#667eea",
            border: "1.5px solid #667eea",
            borderRadius: "0.3rem",
            fontSize: "clamp(0.8rem,1.6vw,1rem)",
            padding: "0.45rem",
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn flex-grow-1 fw-bold text-white"
          style={{
            background: "linear-gradient(135deg,#667eea,#764ba2)",
            borderRadius: "0.3rem",
            fontSize: "clamp(0.8rem,1.6vw,1rem)",
            padding: "0.45rem",
            border: "none",
          }}
          onClick={handleOk}
          data-bs-dismiss="modal"
        >
          ✓ Confirm
        </button>
      </div>
    </div>
  </div>
</div>
{/* ================== END ADVANCED DRAW MODAL ================== */}

     </div>
   );
 };

export default Nav4;
