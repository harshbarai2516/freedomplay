import React from "react";

export default function Leftcol() {
  const ranges = [
    "1000-1099",
    "1100-1199",
    "1200-1299",
    "1300-1399",
    "1400-1499",
    "1500-1599",
    "1600-1699",
    "1700-1799",
    "1800-1899",
    "1900-1999",
  ];

  return (
    <div className="w-full h-full bg-[#fff8dc] flex flex-col box-border overflow-hidden p-[1px]">
      <div className="grid w-full h-full gap-[3px] sm:gap-[2.5px] md:gap-[3px]">
        {/* "All" Option */}
        <div className="flex items-center bg-gradient-to-r from-[#ffeb8a] to-[#ffd700] border border-[#e6c200] rounded-[5vw] text-[#333] cursor-pointer transition-all duration-200 overflow-hidden px-[6px] hover:scale-[1.01] hover:text-[#f2f0f0] hover:bg-gradient-to-r hover:from-[#e1e118] hover:to-[#f3c01b] hover:shadow-sm">
          <input
            type="checkbox"
            className="w-[14px] h-[14px] mr-[6px] accent-[#ffcc00] cursor-pointer flex-shrink-0 sm:w-[18px] sm:h-[18px]"
          />
          <span className="font-bold text-center w-full whitespace-nowrap overflow-hidden text-ellipsis text-[calc(11px+0.3vw)] sm:text-[calc(12px+0.3vw)]">
            All
          </span>
        </div>

        {/* Range Options */}
        {ranges.map((range) => (
          <div
            key={range}
            className="flex items-center bg-gradient-to-r from-[#ffeb8a] to-[#ffd700] border border-[#e6c200] rounded-[5vw] text-[#333] cursor-pointer transition-all duration-200 overflow-hidden px-[6px] hover:scale-[1.01] hover:text-[#f2f0f0] hover:bg-gradient-to-r hover:from-[#e1e118] hover:to-[#f3c01b] hover:shadow-sm"
          >
            <input
              type="checkbox"
              className="w-[14px] h-[14px] mr-[6px] accent-[#ffcc00] cursor-pointer flex-shrink-0 sm:w-[18px] sm:h-[18px]"
            />
            <span className="font-bold text-center w-full whitespace-nowrap overflow-hidden text-ellipsis text-[calc(11px+0.3vw)] sm:text-[calc(12px+0.3vw)]">
              {range}
            </span>
          </div>
        ))}
      </div>

      {/* Custom Responsive Styling */}
      <style jsx="true">{`
        /* Mobile landscape */
        @media (max-width: 768px) and (orientation: landscape) {
          .range-item {
            padding: 0 4px;
          }
          input[type="checkbox"] {
            width: 12px !important;
            height: 12px !important;
            margin-right: 4px !important;
          }
          span {
            font-size: calc(8px + 0.3vw) !important;
          }
        }

        /* Mobile portrait */
        @media (max-width: 768px) and (orientation: portrait) {
          input[type="checkbox"] {
            width: 12px !important;
            height: 12px !important;
            margin-right: 4px !important;
          }
          span {
            font-size: calc(8px + 0.3vw) !important;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .range-item {
            padding: 0 3px !important;
            border-radius: 3px !important;
          }
          input[type="checkbox"] {
            width: 11px !important;
            height: 11px !important;
            margin-right: 3px !important;
          }
          span {
            font-size: calc(6px + 0.3vw) !important;
          }
        }

        /* Extra small mobile */
        @media (max-width: 360px) {
          .range-item {
            padding: 0 2px !important;
          }
          input[type="checkbox"] {
            width: 10px !important;
            height: 10px !important;
            margin-right: 2px !important;
          }
          span {
            font-size: calc(5.5px + 0.3vw) !important;
          }
        }

        /* High contrast mode */
        @media (forced-colors: active) {
          .range-item {
            forced-color-adjust: none;
            border-color: ButtonText;
          }
          .range-item.selected {
            background: Highlight;
            color: HighlightText;
          }
        }
      `}</style>
    </div>
  );
}
