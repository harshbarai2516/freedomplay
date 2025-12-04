import React, { useEffect, useState, useCallback } from "react";
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
}) => {
  const [quantity, setQuantity] = useState("");

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

  useEffect(() => {
    const qty = parseInt(quantity || 0);
    const total = qty * selectedRate;
    setTotalAmount(total);
  }, [quantity, selectedRate, setTotalAmount]);

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
            style={{
              padding: "0.15rem 0.25rem",
              height: "clamp(22px, 1vw, 28px)"
            }}
            maxLength={isTwoDigitOnly ? 2 : 3}
          />
        </div>

        {/* Range Input */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "0.05rem", paddingRight: "0.1rem" }}>
          <label className="fw-bold nav8-font" style={{ whiteSpace: "nowrap", marginRight: 0 }}>RANGE:</label>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="NUM"
            maxLength={isTwoDigitOnly ? 2 : 3}
            value={rangeFrom}
            disabled={inputsDisabled}
            onChange={(e) => setRangeFrom(e.target.value.replace(/\D/g, ""))}
            className="form-control text-center fw-bold flex-grow-1 nav8-font"
            style={{
              padding: "0.15rem 0.1rem",
              height: "clamp(22px, 1vw, 28px)",
              minWidth: 0
            }}
          />

          <label className="fw-bold nav8-font" style={{ whiteSpace: "nowrap", marginRight: 0, marginLeft: "0.05rem" }}>TO</label>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="NUM"
            maxLength={isTwoDigitOnly ? 2 : 3}
            value={rangeTo}
            disabled={inputsDisabled}
            onChange={(e) => setRangeTo(e.target.value.replace(/\D/g, ""))}
            className="form-control text-center fw-bold flex-grow-1 nav8-font"
            style={{
              padding: "0.15rem 0.1rem",
              height: "clamp(22px, 1vw, 28px)",
              minWidth: 0,
              marginLeft: "0.05rem"
            }}
          />
        </div>

        {/* L-pick + Qty */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "0.05rem", paddingRight: "0.1rem" }}>
          <label className="fw-bold nav8-font" style={{ whiteSpace: "nowrap", marginRight: 0 }}>lpick:</label>

          <select
            value={lpickType}
            onChange={(e) => setLpickType(e.target.value)}
            className="btn btn-secondary dropdown-toggle fw-bold nav8-font"
            style={{
              padding: "0.15rem 0.1rem",
              height: "clamp(22px, 1vw, 28px)",
              flex: "0.5 1 auto"
            }}
          >
            <option value="BOX">BOX</option>
            <option value="STR">STR</option>
          </select>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="ENTER QTY"
            value={quantity}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 3);
              setQuantity(val);
            }}
            className="form-control text-center fw-bold flex-grow-1 nav8-font"
            style={{
              padding: "0.15rem 0.1rem",
              height: "clamp(22px, 1vw, 28px)",
              minWidth: 0,
              marginLeft: "0.05rem"
            }}
          />
        </div>

        {/* Rate Selector */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "0.05rem", paddingRight: "0.1rem" }}>
          <label className="fw-bold nav8-font" style={{ whiteSpace: "nowrap", marginRight: 0 }}>RATE:</label>

          <div style={{ display: "flex", gap: "0.05rem", flex: 1, minWidth: 0 }}>
            {[10, 20, 30, 40, 50, 100, 200].map((rate) => (
              <div key={rate} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, minWidth: 0 }}>
                <input
                  type="radio"
                  name="rate"
                  id={`rate-${rate}`}
                  checked={selectedRate === rate}
                  onChange={() => setSelectedRate(rate)}
                  style={{
                    width: "clamp(10px, 1.2vw, 14px)",
                    height: "clamp(10px, 1vw, 14px)",
                    cursor: "pointer"
                  }}
                />

                <label htmlFor={`rate-${rate}`} className="fw-bold nav8-font" style={{ margin: 0, whiteSpace: "nowrap" }}>
                  {rate}
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Nav8;
