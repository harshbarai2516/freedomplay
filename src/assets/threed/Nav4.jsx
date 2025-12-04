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

    const tokenStr = localStorage.getItem("token");
    let token = null;
    try {
      token = JSON.parse(tokenStr);
    } catch {
      token = tokenStr;
    }
    if (!token) return;

    axios
      .get("https://thewonder.uk/royalgame/api/balance", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBalance(res.data?.balance))
      .catch(() => {});

    generateRemainingDraws();
  }, []);

  const generateRemainingDraws = () => {
    const all = [];
    const s = new Date();
    s.setHours(8, 0, 0, 0);
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
    alert(`Selected Draws: ${selectedDraws.join(", ")}`);
  };

  return (
    <div
      className="container-fluid fw-bold py-0 px-0 px-sm-3"
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

      {/* ==================== */}
      {/* ADVANCED DRAW MODAL */}
      {/* ==================== */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        style={{
          display: "flex !important",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <div
          className="modal-dialog"
          style={{
            maxWidth: "clamp(280px, 90vw, 500px)",
            margin: 0,
            position: "relative",
            width: "auto",
            pointerEvents: "none",
          }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "0.5rem",
              boxShadow: "0 5px 20px rgba(0,0,0,0.35)",
              pointerEvents: "auto",
            }}
          >
            <div
              className="modal-header"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "0.5rem 0.5rem 0 0",
                padding: "clamp(0.6rem, 2vw, 0.9rem)",
                border: "none",
              }}
            >
              <h1
                className="modal-title fw-bold"
                id="staticBackdropLabel"
                style={{ fontSize: "clamp(0.45rem, 3vw, 1rem)", margin: 0 }}
              >
                🎲 Advanced Draw
              </h1>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ transform: "scale(0.8)" }}
              ></button>
            </div>

            <div
              className="modal-body"
              style={{
                maxHeight: "clamp(30vh, 60vh, 400px)",
                overflowY: "auto",
                padding: "clamp(0.8rem, 2.5vw, 1.2rem)",
              }}
            >
              <h5
                className="fw-bold mb-2 mb-sm-3"
                style={{
                  fontSize: "clamp(0.75rem, 2vw, 0.95rem)",
                  color: "#333",
                }}
              >
                📅 Select Draw Times
              </h5>
              <div className="mb-2 mb-sm-3 text-center">
                <input
                  type="text"
                  value={drawCount}
                  onChange={handleDrawCountChange}
                  placeholder="Enter number of draws"
                  className="form-control text-center fw-bold mx-auto d-block"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    fontSize: "clamp(0.6rem,1.8vw,0.85rem)",
                    padding: "0.4rem 0.6rem",
                    borderRadius: "0.4rem",
                    border: "2px solid #667eea",
                  }}
                />
              </div>

              <div
                className="d-flex flex-wrap gap-1 gap-sm-2 justify-content-center"
                style={{ width: "100%" }}
              >
                {remainingDraws.length > 0 ? (
                  remainingDraws.map((time, index) => (
                    <button
                      key={index}
                      type="button"
                      className={
                        selectedDraws.includes(time)
                          ? "btn btn-success"
                          : "btn btn-outline-secondary"
                      }
                      onClick={() => toggleDrawSelection(time)}
                      style={{
                        fontSize: "clamp(0.55rem,1.5vw,0.7rem)",
                        padding: "0.25rem 0.45rem",
                        minWidth: "48px",
                        flex: "0 0 auto",
                        borderRadius: "0.3rem",
                        fontWeight: "600",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        border: selectedDraws.includes(time)
                          ? "none"
                          : "1.5px solid #dee2e6",
                      }}
                      onMouseEnter={(e) => {
                        if (!selectedDraws.includes(time)) {
                          e.target.style.background = "#e7f3ff";
                          e.target.style.borderColor = "#667eea";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selectedDraws.includes(time)) {
                          e.target.style.background = "transparent";
                          e.target.style.borderColor = "#dee2e6";
                        }
                      }}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <div className="text-center py-3">
                    <p
                      className="text-danger fw-bold mb-0"
                      style={{ fontSize: "clamp(0.6rem,1.8vw,0.8rem)" }}
                    >
                      ⏰ No remaining draws today
                    </p>
                  </div>
                )}
              </div>

              {selectedDraws.length > 0 && (
                <div
                  className="alert alert-info mt-2 mt-sm-3 mb-0"
                  style={{
                    padding: "clamp(0.4rem,1.5vw,0.6rem)",
                    fontSize: "clamp(0.55rem,1.3vw,0.7rem)",
                    borderRadius: "0.4rem",
                  }}
                >
                  <strong>Selected:</strong> {selectedDraws.length} draw
                  {selectedDraws.length > 1 ? "s" : ""} -{" "}
                  {selectedDraws.join(", ")}
                </div>
              )}
            </div>

            <div
              className="modal-footer gap-1 gap-sm-2"
              style={{
                borderTop: "1px solid #e9ecef",
                padding: "clamp(0.6rem,2vw,0.85rem)",
              }}
            >
              <button
                type="button"
                className="btn flex-grow-1"
                data-bs-dismiss="modal"
                style={{
                  background: "transparent",
                  color: "#667eea",
                  border: "1.5px solid #667eea",
                  borderRadius: "0.3rem",
                  fontWeight: "600",
                  fontSize: "clamp(0.55rem,1.8vw,0.75rem)",
                  padding: "0.35rem 0.6rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#667eea";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#667eea";
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn flex-grow-1"
                onClick={handleOk}
                data-bs-dismiss="modal"
                style={{
                  background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
                  color: "white",
                  borderRadius: "0.3rem",
                  fontWeight: "600",
                  fontSize: "clamp(0.55rem,1.8vw,0.75rem)",
                  padding: "0.35rem 0.6rem",
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 5px 15px rgba(102,126,234,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                ✓ Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav4;
