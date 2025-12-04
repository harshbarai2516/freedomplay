import React, { useState, useEffect } from "react";

const Nav6 = ({
  setDisplayList,
  selectedRate,
  rangeFrom,
  rangeTo,
  lpickType = "BOX",
  setInputsDisabled,
}) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selected, setSelected] = useState([]);

  const [isSingle, setIsSingle] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isTriple, setIsTriple] = useState(false);

  // ⭐ Desktop flag
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNumber = (num) => {
    if (selected.includes(num)) {
      setSelected(selected.filter((n) => n !== num));
    } else {
      setSelected([...selected, num]);
    }
  };

  const toggleAll = () => {
    if (selected.length === numbers.length) {
      setSelected([]);
    } else {
      setSelected([...numbers]);
    }
  };

  const generateSingleCombinations = (arr) => {
    const combos = [];
    arr.forEach((a) => {
      arr.forEach((b) => {
        arr.forEach((c) => {
          if (a !== b && b !== c && a !== c) combos.push(`${a}${b}${c}`);
        });
      });
    });
    return combos;
  };

  const generateDuplicateCombinations = (arr) => {
    const combos = [];
    arr.forEach((a) => {
      arr.forEach((b) => {
        if (a !== b) {
          combos.push(`${a}${a}${b}`);
          combos.push(`${a}${b}${a}`);
          combos.push(`${b}${a}${a}`);
        }
      });
    });
    return [...new Set(combos)];
  };

  const generateTripleCombinations = (arr) => arr.map((n) => `${n}${n}${n}`);

  const handleLuckyPick = () => {
    setInputsDisabled(false);
    const count = Math.floor(Math.random() * 7) + 3;
    const shuffled = [...numbers].sort(() => 0.5 - Math.random());
    const randomNums = shuffled.slice(0, count).sort((a, b) => a - b);
    setSelected(randomNums);

    const combos = generateSingleCombinations(randomNums);
    const finalCombos = combos.map((num) => ({
      number: num,
      type: "BOX",
      rate: selectedRate,
    }));
    setDisplayList(finalCombos);
  };

  const handleMotor = () => {
    if (selected.length === 0) return;

    setInputsDisabled(true);

    let combos = [];
    if (isSingle) {
      combos = generateSingleCombinations(selected);
    } else if (isDuplicate) {
      combos = generateDuplicateCombinations(selected);
    } else if (isTriple) {
      combos = generateTripleCombinations(selected);
    } else {
      combos = generateSingleCombinations(selected);
    }

    const finalCombos = combos.map((num) => ({
      number: num,
      type: lpickType,
      rate: selectedRate,
    }));

    setDisplayList((prev) => [...prev, ...finalCombos]);
  };

  return (
    <div
      className="container-fluid fw-bold nav6-container"
      style={{
        padding: "0.1rem 0.5rem",
        margin: 0,
        background: "linear-gradient(to top, #17a2b8, #0f7586)"
      }}
    >
      <div
        className="d-flex flex-nowrap align-items-center justify-content-between gap-1 gap-sm-2"
        style={{ overflowX: "auto", minHeight: "20px", width: "100%" }}
      >
        {/* ALL Button */}
        <button
          className={`btn flex-grow-1 fw-bold ${
            selected.length === numbers.length
              ? "btn-danger text-light"
              : "btn-light border-dark"
          }`}
          onClick={toggleAll}
          style={{
            padding: "0.2rem 0rem",
            fontSize: isDesktop ? "1rem" : "clamp(0.5rem, 1.5vw, 0.2rem)",
            fontWeight: isDesktop ? "bold" : "normal",
            minWidth: "fit-content",
          }}
        >
          ALL
        </button>

        {/* Number Buttons 0-9 */}
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => toggleNumber(num)}
            className={`btn flex-grow-1 fw-bold ${
              selected.includes(num)
                ? "btn-danger text-light"
                : "btn-light border-dark"
            }`}
            style={{
              padding: "0rem 0rem",
              fontSize: isDesktop ? "1rem" : "clamp(0.5rem, 0.3vw, 0.2rem)",
              fontWeight: isDesktop ? "bold" : "normal",
              minWidth: "fit-content",
              height: isDesktop ? "32px" : "clamp(20px, 0.5vw, 32px)",
            }}
          >
            {num}
          </button>
        ))}

        {/* Single, Duplicate, Triple Checkboxes */}
        <div
          className="d-flex align-items-center flex-grow-1 gap-1 gap-sm-2 text-light"
          style={{ minWidth: "fit-content", justifyContent: "center" }}
        >
          {[
            { label: "Single", state: isSingle, setState: setIsSingle },
            { label: "Duplicate", state: isDuplicate, setState: setIsDuplicate },
            { label: "Triple", state: isTriple, setState: setIsTriple },
          ].map(({ label, state, setState }) => (
            <div key={label} className="d-flex align-items-center gap-1" style={{ minWidth: "fit-content" }}>
              <input
                type="checkbox"
                checked={state}
                onChange={() => {
                  setIsSingle(false);
                  setIsDuplicate(false);
                  setIsTriple(false);
                  setState(!state);
                }}
                style={{ cursor: "pointer" }}
              />
              <label
                className="m-0 fw-bold"
                style={{
                  fontSize: isDesktop ? "1rem" : "clamp(0.5rem, 1.5vw, 0.65rem)",
                  fontWeight: isDesktop ? "bold" : "normal",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </label>
            </div>
          ))}
        </div>

        {/* Motor Button */}
        <button
          className="btn fw-bold flex-grow-1 rounded-0"
          onClick={handleMotor}
          style={{
            padding: "0rem 0rem",
            fontSize: isDesktop ? "1rem" : "clamp(0.5rem, 1vw, 0.65rem)",
            fontWeight: isDesktop ? "bold" : "normal",
            minWidth: "fit-content",
            whiteSpace: "nowrap",
            background: "linear-gradient(to right, #007bff, #0056b3)",
            color: "white",
          }}
        >
          Motor
        </button>

        {/* Lucky Pick Button */}
        <button
          className="btn fw-bold flex-grow-1 rounded-0"
          onClick={handleLuckyPick}
          style={{
            padding: "0rem 0rem",
            fontSize: isDesktop ? "1rem" : "clamp(0.5rem, 1vw, 0.65rem)",
            fontWeight: isDesktop ? "bold" : "normal",
            minWidth: "fit-content",
            whiteSpace: "nowrap",
            background: "linear-gradient(to right, #007bff, #0056b3)",
            color: "white"
          }}
        >
          <span className="d-none d-sm-inline">Lucky Pick</span>
          <span className="d-inline d-sm-none">Lucky Pick</span>
        </button>
      </div>
    </div>
  );
};

export default Nav6;
