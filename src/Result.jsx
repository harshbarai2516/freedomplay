import React, { useState, useEffect } from "react";
import logo from "./assets/logo.jpeg";

export default function Result({ mainRange }) {
  const [allResults, setAllResults] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);

  // ✅ Fetch API results
  const fetchResults = async () => {
    try {
      const res = await fetch("https://tenx.game.thegold.us/api/results/current");
      const data = await res.json();

      if (data?.ok && data?.result?.result) {
        const nums = data.result.result
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean)
          .map((n) => n.padStart(4, "0"))
          .sort((a, b) => parseInt(a) - parseInt(b));

        setAllResults(nums);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Auto-refresh every 15 minutes
  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Whenever mainRange changes, show that 10-number group
  useEffect(() => {
    if (!allResults.length || !mainRange) return;

    // Extract starting index from mainRange (e.g. "30-39" → 30)
    const rangeStart = parseInt(mainRange.split("-")[0], 10);
    const startIdx = rangeStart;
    const endIdx = startIdx + 10;

    setDisplayResults(allResults.slice(startIdx, endIdx));
  }, [mainRange, allResults]);

  const jokers = ["2x", "3x", "1x", "1x", "2x", "3x", "3x", "2x", "1x", "2x"];
  const colors = [
    "bg-red-600", "bg-blue-600", "bg-purple-600", "bg-green-600",
    "bg-violet-600", "bg-orange-500", "bg-pink-600", "bg-rose-500",
    "bg-teal-600", "bg-yellow-500"
  ];

  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="w-full flex items-center justify-between bg-black text-white px-[0.6vw] py-[0.4vw] overflow-hidden">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-[3vw] min-h-[28px] max-h-[50px] w-auto object-contain" />
      </div>

{/* Middle: Display numbers */}
<div
  className="
    flex flex-1 justify-between items-center gap-[0.4vw] mx-[0.5vw] overflow-hidden
    portrait:grid portrait:grid-cols-5 portrait:gap-[1vw] portrait:justify-items-center
  "
>
  {displayResults.map((num, idx) => (
    <div
      key={idx}
      className={`flex items-center justify-center gap-[0.3vw] ${
        colors[idx % colors.length]
      } text-white font-bold rounded-md text-[1.3vw] px-[0.3vw] py-[0.2vw]
      flex-1 portrait:flex-none portrait:w-[15vw] portrait:h-[5vw] portrait:text-[3vw]`}
    >
      <div className="flex gap-[0.1vw]">
        {num.split("").map((digit, dIdx) => (
          <span key={dIdx}>{digit}</span>
        ))}
      </div>

      <div className="flex items-center justify-center bg-gray-300 text-red-600 font-bold text-[1vw] rounded-md px-[0.4vw] py-[0.1vw] h-[70%] min-w-[1.8vw] portrait:w-[15vw] portrait:h-[4vw] portrait:text-[3vw]">
        {jokers[idx % jokers.length]}
      </div>
    </div>
  ))}
</div>


      {/* Right: Date/Time */}
      <div className="flex flex-col items-end text-right ml-[0.5vw] leading-tight portrait:text-[5.5vw]">
        <span className="text-[1vw] sm:text-[1.2vw] portrait:text-[2vw]">{currentDate}</span>
        <span className="text-[0.9vw] sm:text-[1vw] portrait:text-[2vw]">{currentTime}</span>
      </div>
    </div>
  );
}
