import React, { useMemo, useEffect, useState } from "react";

export default function Leftcol({
  mainRange = "00-09",
  selectedRange,
  onSelectRange,
  onCheckedRangesChange,
}) {
  const [activeRange, setActiveRange] = useState(selectedRange || "");
  const [checkedRanges, setCheckedRanges] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Generate 10 subranges per mainRange
  const ranges = useMemo(() => {
    const [start] = mainRange.split("-");
    const base = parseInt(start || "0", 10) * 100;
    return Array.from({ length: 10 }, (_, i) => {
      const low = String(base + i * 100).padStart(4, "0");
      const high = String(base + i * 100 + 99).padStart(4, "0");
      return `${low}-${high}`;
    });
  }, [mainRange]);

  // Select a range (activates NumberGrid)
  const handleClick = (range) => {
    setActiveRange(range);
    onSelectRange?.(range);
  };

  // Toggle checkbox
  const handleCheckboxChange = (range) => {
    setCheckedRanges((prev) => {
      const isChecked = prev.includes(range);
      const updated = isChecked
        ? prev.filter((r) => r !== range)
        : [...prev, range];
      onCheckedRangesChange?.(updated);
      return updated;
    });
  };

  // "All" checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setCheckedRanges([]);
      onCheckedRangesChange?.([]);
    } else {
      setSelectAll(true);
      setCheckedRanges(ranges);
      onCheckedRangesChange?.(ranges);
    }
  };

  // Auto-select first range
  useEffect(() => {
    if (!ranges.length) return;
    if (!selectedRange || !ranges.includes(selectedRange)) {
      const first = ranges[0];
      setActiveRange(first);
      onSelectRange?.(first);
    }
  }, [ranges, selectedRange, onSelectRange]);

  // Keep All checkbox synced
  useEffect(() => {
    setSelectAll(checkedRanges.length === ranges.length);
  }, [checkedRanges, ranges]);

  return (
    <div className="w-full h-full bg-[#fff8dc] flex flex-col box-border overflow-hidden p-[1px]">
      {/* Add CSS for mobile portrait mode */}
      <style jsx>{`
        @media (max-width: 768px) and (orientation: portrait) {
          .range-text {
            font-size: 8px !important;
            letter-spacing: -0.2px;
          }
          
          .all-text {
            font-size: 11px !important;
            letter-spacing: -0.1px;
          }
          
          .checkbox-size {
            width: 12px !important;
            height: 12px !important;
          }
          
          .sm-checkbox-size {
            width: 16px !important;
            height: 16px !important;
          }
        `}
      </style>
      
      <div className="grid w-full h-full gap-[3px]">
        {/* All */}
        <div
          className="flex items-center bg-gradient-to-r from-red-500 to-red-700 border border-red-800 rounded-[1vw] text-white cursor-pointer transition-all duration-200 overflow-hidden px-[6px] hover:scale-[1.03] hover:shadow-md"
        >
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="checkbox-size sm:sm-checkbox-size mr-[6px] accent-red-600 cursor-pointer"
          />
          <span className="font-bold text-center w-full all-text range-text">
            All
          </span>
        </div>

        {/* Subranges */}
        {ranges.map((range) => {
          const isActive = activeRange === range;
          const isChecked = checkedRanges.includes(range);
          return (
            <div
              key={range}
              onClick={() => handleClick(range)}
              className={`flex items-center border rounded-[1vw] cursor-pointer transition-all duration-200 overflow-hidden px-[6px] ${
                isActive
                  ? "bg-black text-white border-black shadow-md scale-[1.02]"
                  : "bg-gradient-to-r from-[#ffeb8a] to-[#ffd700] border-[#e6c200] text-[#333] hover:scale-[1.01]"
              }`}
            >
              <input
                type="checkbox"
                className="checkbox-size mr-[6px] accent-[#ffcc00] cursor-pointer"
                checked={isChecked}
                onChange={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(range);
                }}
              />
              <span className="font-bold text-center w-full range-text">
                {range}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}