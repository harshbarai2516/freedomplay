import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Nav.css";

const Nav8 = ({
  numberInput,
  setNumberInput,
  selectedRate,
  setSelectedRate,
  selectedTypes,
  setDisplayList,
  setTotalAmount,
  rangeFrom,
  setRangeFrom,
  rangeTo,
  setRangeTo,
  lpickType,
  setLpickType,
  inputsDisabled,
  setQuantity,
}) => {
  const [quantity, setLocalQuantity] = useState("");

  // ✅ Refs for auto jump
  const rangeFromRef = useRef(null);
  const rangeToRef = useRef(null);

  const isTwoDigitOnly =
    selectedTypes.length > 0 &&
    selectedTypes.every((t) => ["SP", "FP", "BP", "AP"].includes(t));

  const getTwoDigitCombo = useCallback((numStr, type) => {
    const d1 = numStr[0];
    const d2 = numStr[1];
    const d3 = numStr[2];
    switch (type) {
      case "SP":
        return d1 + d3;
      case "FP":
        return d1 + d2;
      case "BP":
        return d2 + d3;
      case "AP": {
        const randomType = ["SP", "FP", "BP"][Math.floor(Math.random() * 3)];
        return getTwoDigitCombo(numStr, randomType);
      }
      default:
        return numStr;
    }
  }, []);

  // ✅ TOTAL CALCULATION (unchanged)
  useEffect(() => {
    const qty = parseInt(quantity || 0);
    const total = qty * selectedRate;
    setTotalAmount(total);
    setQuantity(qty);
  }, [quantity, selectedRate, setTotalAmount, setQuantity]);

  // ✅ RANDOM NUMBER GENERATION - console only (unchanged)
  useEffect(() => {
    const qty = parseInt(quantity || 0);
    if (!qty || qty <= 0) return;
    if (lpickType !== "BOX" && lpickType !== "STR") return;

    const generated = [];

    for (let i = 0; i < qty; i++) {
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      generated.push({
        number: randomNum,
        type: lpickType,
        rate: selectedRate,
      });
    }

    console.log("🎯 Random Numbers (hidden from UI):", generated);
    window._lpickRandomNumbers = generated;
  }, [quantity, lpickType, selectedRate]);

  // ✅ RANGE LOGIC (unchanged)
  useEffect(() => {
    const fromValid = isTwoDigitOnly
      ? /^\d{2}$/.test(rangeFrom)
      : /^\d{3}$/.test(rangeFrom);
    const toValid = isTwoDigitOnly
      ? /^\d{2}$/.test(rangeTo)
      : /^\d{3}$/.test(rangeTo);
    if (!fromValid || !toValid) return;

    const start = parseInt(rangeFrom);
    const end = parseInt(rangeTo);
    if (start > end) return;

    const newItems = [];
    for (let i = start; i <= end; i++) {
      const num = i.toString().padStart(3, "0");
      selectedTypes.forEach((type) => {
        let finalNumber = num;
        if (["SP", "FP", "BP", "AP"].includes(type)) {
          finalNumber = getTwoDigitCombo(num, type);
        }
        newItems.push({ number: finalNumber, type, rate: selectedRate });
      });
    }

    setDisplayList([]);
    setDisplayList((prev) => [...prev, ...newItems]);
    setRangeFrom("");
    setRangeTo("");
  }, [
    rangeFrom,
    rangeTo,
    selectedTypes,
    selectedRate,
    isTwoDigitOnly,
    setDisplayList,
    setRangeFrom,
    setRangeTo,
    getTwoDigitCombo,
  ]);

  useEffect(() => {
    setLpickType(lpickType);
  }, [lpickType, setLpickType]);

  // ✅ AUTO JUMP HANDLERS (NEW FEATURE)
  const handleRangeFromChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const limited = isTwoDigitOnly ? value.slice(0, 2) : value.slice(0, 3);

    setRangeFrom(limited);

    // ✅ AUTO FOCUS
    if (
      (isTwoDigitOnly && limited.length === 2) ||
      (!isTwoDigitOnly && limited.length === 3)
    ) {
      rangeToRef.current?.focus();
    }
  };

  const handleRangeToChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const limited = isTwoDigitOnly ? value.slice(0, 2) : value.slice(0, 3);
    setRangeTo(limited);
  };

  return (
    <div
      className="fw-bold"
      id="bco"
      style={{ padding: "0.1rem 0.5rem", overflowX: "auto", minHeight: "22px", width: "100%" }}
    >
      <div
        className="d-flex flex-nowrap align-items-center"
        style={{ minWidth: "fit-content", width: "100%", gap: 0 }}
      >
        {/* Number Input */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", paddingRight: "0.1rem" }}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="ADD NUMBER"
            value={numberInput}
            disabled={inputsDisabled}
            onChange={(e) => setNumberInput(e.target.value.replace(/\D/g, ""))}
            className="form-control text-center fw-bold rounded-pill w-100 nav8-font"
            style={{ padding: "0.15rem 0.25rem", height: "clamp(22px, 1vw, 28px)" }}
            maxLength={isTwoDigitOnly ? 2 : 3}
          />
        </div>

        {/* ✅ Range Input with Auto Jump */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "0.05rem", paddingRight: "0.1rem" }}>
          <label className="fw-bold nav8-font">RANGE:</label>

          <input
            ref={rangeFromRef}
            type="text"
            inputMode="numeric"
            placeholder="NUM"
            maxLength={isTwoDigitOnly ? 2 : 3}
            value={rangeFrom}
            disabled={inputsDisabled}
            onChange={handleRangeFromChange}
            className="form-control text-center fw-bold flex-grow-1 nav8-font"
          />

          <label className="fw-bold nav8-font">TO</label>

          <input
            ref={rangeToRef}
            type="text"
            inputMode="numeric"
            placeholder="NUM"
            maxLength={isTwoDigitOnly ? 2 : 3}
            value={rangeTo}
            disabled={inputsDisabled}
            onChange={handleRangeToChange}
            className="form-control text-center fw-bold flex-grow-1 nav8-font"
          />
        </div>

        {/* L-pick + Qty */}
        <div style={{ flex: "1 1 0", display: "flex", alignItems: "center", gap: "0.05rem", paddingRight: "0.1rem" }}>
          <label className="fw-bold nav8-font">lpick:</label>

          <select
            value={lpickType}
            onChange={(e) => setLpickType(e.target.value)}
            className="btn btn-secondary dropdown-toggle fw-bold nav8-font"
          >
            <option value="BOX">BOX</option>
            <option value="STR">STR</option>
          </select>

          <input
            type="text"
            inputMode="numeric"
            placeholder="ENTER QTY"
            value={quantity}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 3);
              setLocalQuantity(val);
              setQuantity(val);
            }}
            className="form-control text-center fw-bold flex-grow-1 nav8-font"
          />
        </div>

        {/* Rate */}
        <div style={{ flex: "1 1 0", display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <label className="fw-bold nav8-font">RATE:</label>

          <div style={{ display: "flex", gap: "1.5rem", flex: 1 }}>
            {[10, 20, 30, 40, 50, 100, 200].map((rate) => (
              <div key={rate} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input
                  type="radio"
                  name="rate"
                  checked={selectedRate === rate}
                  onChange={() => setSelectedRate(rate)}
                />
                <label className="fw-bold nav8-font">{rate}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav8;