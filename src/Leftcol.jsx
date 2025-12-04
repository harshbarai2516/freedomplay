import React, { useMemo, useEffect, useState } from "react";

export default function Leftcol({ mainRange = "00-09", selectedRange, onSelectRange }) {
  const [activeRange, setActiveRange] = useState(selectedRange || "");

  // ✅ Generate subranges based on mainRange
  const ranges = useMemo(() => {
    const [start] = mainRange.split("-");
    const base = parseInt(start || "0", 10) * 100;
    return Array.from({ length: 10 }, (_, i) => {
      const low = String(base + i * 100).padStart(4, "0");
      const high = String(base + i * 100 + 99).padStart(4, "0");
      return `${low}-${high}`;
    });
  }, [mainRange]);

  // ✅ Auto-select the first range if mainRange changes
  useEffect(() => {
    if (!ranges.length) return;
    if (!selectedRange || !ranges.includes(selectedRange)) {
      const first = ranges[0];
      setActiveRange(first);
      onSelectRange?.(first);
    }
  }, [ranges, selectedRange, onSelectRange]);

  const handleClick = (range) => {
    setActiveRange(range);
    onSelectRange?.(range);
  };

  return (
    <div className="w-full h-full bg-[#fff8dc] flex flex-col box-border overflow-hidden p-[1px]">
      <div className="grid w-full h-full gap-[3px]">
        {/* All Option (red) */}
        <div className="flex items-center bg-gradient-to-r from-red-500 to-red-700 border border-red-800 rounded-[5vw] text-white cursor-pointer transition-all duration-200 overflow-hidden px-[6px] hover:scale-[1.03] hover:shadow-md">
          <input
            type="checkbox"
            className="w-[14px] h-[14px] mr-[6px] accent-red-600 cursor-pointer sm:w-[18px] sm:h-[18px]"
          />
          <span className="font-bold text-center w-full text-[calc(11px+0.3vw)]">
            All
          </span>
        </div>

        {/* Subrange list */}
        {ranges.map((range) => {
          const isActive = activeRange === range;
          return (
            <div
              key={range}
              onClick={() => handleClick(range)}
              className={`flex items-center border rounded-[5vw] cursor-pointer transition-all duration-200 overflow-hidden px-[6px] ${
                isActive
                  ? "bg-black text-white border-black shadow-md scale-[1.02]"
                  : "bg-gradient-to-r from-[#ffeb8a] to-[#ffd700] border-[#e6c200] text-[#333] hover:scale-[1.01]"
              }`}
            >
              <input
                type="radio"
                className="w-[14px] h-[14px] mr-[6px] accent-[#ffcc00] cursor-pointer"
                checked={isActive}
                onChange={() => handleClick(range)}
              />
              <span className="font-bold text-center w-full text-[calc(11px+0.3vw)]">
                {range}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
