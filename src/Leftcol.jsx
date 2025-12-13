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
    <div className="w-full h-full bg-gradient-to-b from-amber-50 to-yellow-50 flex flex-col box-border overflow-hidden p-0.5">
      <div className="grid w-full h-full gap-1">
        {/* All Button */}
        <div
          className={`flex items-center border-2 rounded-lg text-white cursor-pointer transition-all duration-200 overflow-hidden px-2 py-1.5 hover:scale-[1.02] hover:shadow-lg ${
            selectAll
              ? "bg-gradient-to-r from-red-600 to-red-800 border-red-900 shadow-md"
              : "bg-gradient-to-r from-gray-600 to-gray-800 border-gray-700 hover:from-gray-700 hover:to-gray-900"
          }`}
          onClick={handleSelectAll}
        >
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 accent-red-500 cursor-pointer"
          />
          <span className="font-bold text-center w-full text-xs sm:text-sm md:text-base whitespace-nowrap">
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
              className={`flex items-center border-2 rounded-lg cursor-pointer transition-all duration-200 overflow-hidden px-2 py-1.5 ${
                isActive
                  ? "bg-black text-white border-black shadow-lg scale-[1.03]"
                  : isChecked
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-600 text-white shadow-md"
                  : "hover:scale-[1.02] hover:shadow-md"
              }`}
              style={
                !isActive && !isChecked
                  ? {
                      background: "linear-gradient(90deg, #ffeb8a 0%, #ff0000f2 100%)",
                      borderColor: "#ff9900",
                      color: "#333"
                    }
                  : {}
              }
            >
              <input
                type="checkbox"
                className="w-3 h-3 sm:w-4 sm:h-4 mr-2 accent-amber-500 cursor-pointer"
                checked={isChecked}
                onChange={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(range);
                }}
              />
              <span className="font-bold text-center w-full text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                {range}
              </span>
            </div>
          );
        })}
      </div>

      {/* Portrait Mode CSS */}
      <style jsx="true">{`
        @media (max-width: 768px) and (orientation: portrait) {
          .range-item {
            padding: 4px 6px !important;
            min-height: 32px !important;
          }
          
          .range-text {
            font-size: 9px !important;
            letter-spacing: -0.1px;
          }
          
          .all-text {
            font-size: 10px !important;
          }
          
          .checkbox {
            width: 12px !important;
            height: 12px !important;
            margin-right: 6px !important;
          }
          
          .all-checkbox {
            width: 14px !important;
            height: 14px !important;
            margin-right: 8px !important;
          }
        }
        
        @media (max-width: 480px) and (orientation: portrait) {
          .range-text {
            font-size: 8px !important;
          }
          
          .all-text {
            font-size: 9px !important;
          }
          
          .checkbox {
            width: 10px !important;
            height: 10px !important;
            margin-right: 4px !important;
          }
          
          .all-checkbox {
            width: 12px !important;
            height: 12px !important;
            margin-right: 6px !important;
          }
        }
      `}</style>
    </div>
  );
}