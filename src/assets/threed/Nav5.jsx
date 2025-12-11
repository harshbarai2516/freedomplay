import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav5 = ({ onZoneChange }) => {
  const navigate = useNavigate();
  const items = ["ALL", "A", "B", "C"];
  const [checkedItems, setCheckedItems] = useState({
    A: true,
    B: false,
    C: false,
    ALL: false,
  });

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (item) => {
    if (item === "ALL") {
      const newChecked = !checkedItems.ALL;
      setCheckedItems({
        ALL: newChecked,
        A: newChecked,
        B: newChecked,
        C: newChecked,
      });
    } else {
      const newCheckedItems = {
        ...checkedItems,
        [item]: !checkedItems[item],
      };
      newCheckedItems.ALL =
        newCheckedItems.A && newCheckedItems.B && newCheckedItems.C;
      setCheckedItems(newCheckedItems);
    }
  };

  useEffect(() => {
    const selectedZones = [];
    if (checkedItems.A) selectedZones.push("A");
    if (checkedItems.B) selectedZones.push("B");
    if (checkedItems.C) selectedZones.push("C");
    onZoneChange(selectedZones);
  }, [checkedItems, onZoneChange]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div
      className="container-fluid fw-bold nav5-container"
      style={{ padding: "0.1rem 0.5rem", margin: 0 }}
    >
      <div
        className="d-flex flex-nowrap align-items-center justify-content-between gap-1 gap-sm-1"
        style={{ overflowX: "auto", minHeight: "30px", width: "100%" }}
      >
        {/* Zone Checkboxes */}
        {items.map((item, i) => (
          <div
            key={i}
            className="d-flex align-items-center flex-grow-1"
            style={{
              gap: "0.2rem",
              minWidth: "fit-content",
              justifyContent: "center",
            }}
          >
            <input
              type="checkbox"
              checked={checkedItems[item]}
              onChange={() => handleChange(item)}
              style={{
                height: isDesktop ? "20px" : "clamp(16px, 1vw, 20px)",
                width: isDesktop ? "20px" : "clamp(16px, 1vw, 20px)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            />
            <label
              className="fw-bold text-light rounded-0 m-0 text-center"
              style={{
                background:
                  item === "A"
                    ? "linear-gradient(to right, #28a745, #1e7e34)"
                    : item === "B"
                    ? "linear-gradient(to right, #dc3545, #a71d2a)"
                    : item === "C"
                    ? "linear-gradient(to right, #343a40, #1d2124)"
                    : "linear-gradient(to right, #007bff, #0056b3)",
                padding: isDesktop
                  ? "0.3rem 0.5rem"
                  : "clamp(0.15rem, 0.8vw, 0.3rem) clamp(0.2rem, 1vw, 0.4rem)",
                fontSize: isDesktop ? "1rem" : "clamp(0.5rem, 1vw, 0.65rem)",
                fontWeight: isDesktop ? "bold" : "normal",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                flex: "1 1 auto",
              }}
            >
              {item}
            </label>
          </div>
        ))}

        {/* How to Play Button */}
        <button
          type="button"
          className="btn rounded-0 text-light fw-bold flex-grow-1 text-center"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{
            padding: isDesktop
              ? "0.3rem 0.5rem"
              : "clamp(0.15rem, 0.8vw, 0.3rem) clamp(0.2rem, 1vw, 0.4rem)",
            fontSize: isDesktop ? "1rem" : "clamp(0.5rem, 1vw, 0.65rem)",
            fontWeight: isDesktop ? "bold" : "normal",
            whiteSpace: "nowrap",
            minWidth: "fit-content",
            background: "linear-gradient(135deg, #495057, #adb5bd)",
            color: "white",
            border: "none",
          }}
        >
          How to Play
        </button>

        {/* Logout Button */}
        <button
          className="btn text-light rounded-0 fw-bold flex-grow-1 text-center"
          onClick={handleLogout}
          style={{
            padding: isDesktop
              ? "0.3rem 0.5rem"
              : "clamp(0.15rem, 0.8vw, 0.3rem) clamp(0.2rem, 1vw, 0.4rem)",
            fontSize: isDesktop ? "1rem" : "clamp(0.5rem, 1vw, 0.65rem)",
            fontWeight: isDesktop ? "bold" : "normal",
            whiteSpace: "nowrap",
            minWidth: "fit-content",
            background: "linear-gradient(to right, #dc3545, #a71d2a)",
          }}
        >
          Logout(F8)
        </button>
      </div>

      {/* MODAL - How to Play */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold"
                id="exampleModalLabel"
                style={{ fontSize: isDesktop ? "1.2rem" : "1rem" }}
              >
                How to Play
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="table-responsive">
                <table className="table table-success table-bordered border-dark fw-bold small">
                  <thead>
                    <tr>
                      <th scope="col">PLAY</th>
                      <th scope="col">NO.</th>
                      <th scope="col">IF LUCKY COUPON DRAWS</th>
                      <th scope="col">POINTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example rows */}
                    <tr>
                      <th scope="row">Straight</th>
                      <td>1&nbsp;2&nbsp;3</td>
                      <td>
                        <div className="howto-flex">
                          <button className="btn btn-primary rounded-pill py-0 px-2 border-dark">
                            1
                          </button>
                          <button className="btn btn-primary rounded-pill py-0 px-2 border-dark">
                            2
                          </button>
                          <button className="btn btn-primary rounded-pill py-0 px-2 border-dark">
                            3
                          </button>

                          <span>only Excel match Wins</span>
                        </div>
                      </td>
                      <td>900 x 10 = 9000</td>
                    </tr>
                    <tr>
                      <th scope="row">Box-3-Way</th>
                      <td>1&nbsp;1&nbsp;2</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                      </td>
                      <td>300 x 10 = 3000</td>
                    </tr>
                    <tr>
                      <th scope="row">Box-6-Way</th>
                      <td>1&nbsp;2&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <br />
                        <br />
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                      </td>
                      <td>150 x 10 = 1500</td>
                    </tr>
                    <tr>
                      <th scope="row">Front Pair</th>
                      <td>1&nbsp;2&nbsp;X</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                      </td>
                      <td>90 x 10 = 900</td>
                    </tr>
                    <tr>
                      <th scope="row">Back Pair</th>
                      <td>X&nbsp;2&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                      </td>
                      <td>90 x 10 = 900</td>
                    </tr>
                    <tr>
                      <th scope="row">Split Pair</th>
                      <td>1&nbsp;X&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          1
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                      </td>
                      <td>90 x 10 = 900</td>
                    </tr>
                    <tr>
                      <th scope="row">Any Pair</th>
                      <td>X&nbsp;2&nbsp;3</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          2
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          3
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill border-1 py-0 px-2 border-dark"
                        >
                          X
                        </button>
                        &nbsp;
                      </td>
                      <td>30 x 10 = 300</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav5;
