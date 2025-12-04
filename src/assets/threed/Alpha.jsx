import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Nav2 from "./Nav2";
import Nav3 from "./Nav3";
import Nav4 from "./Nav4";
import Nav5 from "./Nav5";
import Nav6 from "./Nav6";
import Nav7 from "./Nav7";
import Nav8 from "./Nav8";
import Nav9 from "./Nav9";
import Nav10 from "./Nav10";
import axios from "axios";

const Alpha = () => {
  const navigate = useNavigate();
  const [lpickType, setLpickType] = useState("BOX");
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [numberInput, setNumberInput] = useState("");
  const [selectedTypes, setSelectedTypes] = useState(["BOX"]);
  const [selectedRate, setSelectedRate] = useState(10);
  const [displayList, setDisplayList] = useState([]);
  const [selectedZones, setSelectedZones] = useState(["A"]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [advancedDraws, setAdvancedDraws] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [nextSlot, setNextSlot] = useState("");
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const today = new Date().toISOString().split("T")[0];
    const lastGenerated = localStorage.getItem("lastGeneratedDate");

    if (lastGenerated !== today) {
      axios
        .get("https://thewonder.uk/royalgame/api/generate_result", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("✅ Result generated:", res.data);
          localStorage.setItem("lastGeneratedDate", today);
        })
        .catch((err) => console.error("❌ Error generating result:", err));
    }
  }, []);

  const handleAddNumber = useCallback(() => {
    const trimmed = numberInput.trim();
    if (!/^\d{2,3}$/.test(trimmed)) return;

    const first = trimmed[0];
    const second = trimmed[1];
    const last = trimmed[2];
    const newItems = [];

    selectedTypes.forEach((type) => {
      if ((type === "BOX" || type === "STR") && trimmed.length === 3) {
        newItems.push({ number: trimmed, type, rate: selectedRate });
        return;
      }

      if (trimmed.length === 3) {
        if (type === "SP")
          newItems.push({
            number: `${first}${last}`,
            type,
            rate: selectedRate,
          });
        else if (type === "FP")
          newItems.push({
            number: `${first}${second}`,
            type,
            rate: selectedRate,
          });
        else if (type === "BP")
          newItems.push({
            number: `${second}${last}`,
            type,
            rate: selectedRate,
          });
        else if (type === "AP") {
          const options = [
            `${first}${last}`,
            `${first}${second}`,
            `${second}${last}`,
          ];
          const pick = options[Math.floor(Math.random() * options.length)];
          newItems.push({ number: pick, type, rate: selectedRate });
        }
      } else {
        if (["SP", "FP", "BP", "AP"].includes(type)) {
          newItems.push({
            number: `${first}${second}`,
            type,
            rate: selectedRate,
          });
        }
      }
    });

    if (newItems.length > 0) {
      setDisplayList((prev) => [...prev, ...newItems]);
      setNumberInput("");
    }
  }, [numberInput, selectedTypes, selectedRate]);

  useEffect(() => {
    if (!numberInput) return;
    const onlySpecials =
      selectedTypes.length > 0 &&
      selectedTypes.every((t) => ["SP", "FP", "BP", "AP"].includes(t));

    if (onlySpecials && /^\d{2}$/.test(numberInput)) {
      handleAddNumber();
      return;
    }
    if (/^\d{3}$/.test(numberInput)) {
      handleAddNumber();
    }
  }, [numberInput, selectedTypes, handleAddNumber]);

  const handleRemove = (indexToRemove) => {
    setDisplayList((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const baseAmount = displayList.reduce(
    (sum, item) => sum + Number(item.rate || 0),
    0
  );

  const advanceDrawFee = advancedDraws.length; // fee per draw
  const grandTotal = baseAmount * selectedZones.length + totalAmount;
  const FinalTotal =
    advanceDrawFee > 0 ? grandTotal * advanceDrawFee : grandTotal;

  return (
    <div>
      <Nav />
      <Nav2 />
      <Nav3 setNextSlot={setNextSlot} />
      <Nav4 onDrawSelect={(draws) => setAdvancedDraws(draws)} />
      <Nav5 onZoneChange={setSelectedZones} />
      <Nav6
        setDisplayList={setDisplayList}
        selectedRate={selectedRate}
        rangeFrom={rangeFrom}
        rangeTo={rangeTo}
        lpickType={lpickType}
        setInputsDisabled={setInputsDisabled}
      />
      <Nav7
        setSelectedTypes={setSelectedTypes}
        inputsDisabled={inputsDisabled}
      />
      <Nav8
        numberInput={numberInput}
        setNumberInput={setNumberInput}
        selectedRate={selectedRate}
        setSelectedRate={setSelectedRate}
        selectedTypes={selectedTypes}
        setDisplayList={setDisplayList}
        setTotalAmount={setTotalAmount}
        rangeFrom={rangeFrom}
        setRangeFrom={setRangeFrom}
        rangeTo={rangeTo}
        setRangeTo={setRangeTo}
        lpickType={lpickType}
        setLpickType={setLpickType}
        inputsDisabled={inputsDisabled} // ✅ add this line
        setQuantity={setQuantity}
      />

      <Nav9 displayList={displayList} onRemove={handleRemove} />
      <Nav10
        totalAmount={FinalTotal}
        quantity={quantity}
        nextSlot={nextSlot}
        displayList={displayList}
        selectedZones={selectedZones}
        advancedDraws={advancedDraws}
        clearDisplayList={() => setDisplayList([])}
      />
    </div>
  );
};

export default Alpha;
