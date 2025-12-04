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

  useEffect(() => {
    const selected = Object.entries(checkedItems)
      .filter(([key, value]) => value && key !== "ALL")
      .map(([key]) => key);
    setSelectedTypes(selected);
  }, [checkedItems, setSelectedTypes]);

  const handleChange = (item) => {
    if (inputsDisabled) return; // 🔹 Prevent changing when disabled

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
    <div className="container-fluid bg-light text-dark py-2 fw-bold fs-6 nav7-container">
      {items.map((item, i) => (
        <span key={i} className="mx-3">
          <input
            type="checkbox"
            checked={checkedItems[item]}
            disabled={inputsDisabled} // 🔹 disable checkboxes
            onChange={() => handleChange(item)}
          />{" "}
          <label className="me-5">{item}</label>
        </span>
      ))}
      <input
        type="text"
        placeholder="Last Trans-ID:"
        className="fw-bold rounded-0 border mx-5"
        style={{ width: "20%" }}
        disabled={inputsDisabled}
      />
    </div>
  );
};

export default Nav7;