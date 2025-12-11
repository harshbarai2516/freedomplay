import React, { useEffect, useState } from "react";

const Nav7 = ({ setSelectedTypes, inputsDisabled }) => {
  const items = ["ALL", "BOX", "STR", "SP", "FP", "BP", "AP"];
  const [checkedItems, setCheckedItems] = useState({
    ALL: false,
    BOX: true,
    STR: false,
    SP: false,
    FP: false,
    BP: false,
    AP: false,
  });

  // Desktop flag
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const selected = Object.entries(checkedItems)
      .filter(([key, value]) => value && key !== "ALL")
      .map(([key]) => key);
    setSelectedTypes(selected);
  }, [checkedItems, setSelectedTypes]);

  const handleChange = (item) => {
    if (inputsDisabled) return; // Prevent changing when disabled

    if (item === "ALL") {
      const newChecked = !checkedItems.ALL;
      const updated = {
        ALL: newChecked,
        BOX: newChecked,
        STR: newChecked,
        SP: newChecked,
        FP: newChecked,
        BP: newChecked,
        AP: newChecked,
      };
      setCheckedItems(updated);
    } else {
      const updated = {
        ...checkedItems,
        [item]: !checkedItems[item],
      };
      const allSelected = ["BOX", "STR", "SP", "FP", "BP", "AP"].every(
        (type) => updated[type]
      );
      updated.ALL = allSelected;
      setCheckedItems(updated);
    }
  };

  return (
    <div
      className="fw-bold nav7-container"
      style={{
        padding: "0.1rem 0.5rem",
        overflowX: "auto",
        minHeight: "20px",
        width: "100%",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="d-flex flex-nowrap align-items-center"
        style={{ gap: 0, minWidth: "fit-content", width: "100%" }}
      >
        {/* Checkboxes Section */}
        <div
          style={{
            flex: "1.2 1 0",
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.02rem",
            paddingRight: "0.1rem",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="d-flex align-items-center"
              style={{
                minWidth: "fit-content",
                gap: "0.04rem",
                flex: "1 1 auto",
              }}
            >
              <input
                type="checkbox"
                checked={checkedItems[item]}
                disabled={inputsDisabled}
                onChange={() => handleChange(item)}
                style={{
                  width: isDesktop ? "18px" : "12px",
                  height: isDesktop ? "18px" : "12px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              <label
                style={{
                  margin: 0,
                  fontSize: isDesktop ? "1rem" : "clamp(0.4rem, 1.2vw, 0.6rem)",
                  fontWeight: isDesktop ? "bold" : "normal",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  minWidth: "fit-content",
                }}
              >
                {item}
              </label>
            </div>
          ))}
        </div>

        {/* Trans-ID Input */}
        <div style={{ flex: "1 1 0", minWidth: 0, paddingLeft: "0.1rem" }}>
          <input
            type="number"
            placeholder="Trans-ID"
            className="form-control fw-bold"
            style={{
              fontSize: isDesktop ? "1rem" : "clamp(0.4rem, 0.1vw, 0.6rem)",
              fontWeight: isDesktop ? "bold" : "normal",
              padding: "0.12rem 0.15rem",
              height: isDesktop ? "30px" : "clamp(22px, 1vw, 28px)",
              width: "100%",
            }}
            disabled={inputsDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav7;