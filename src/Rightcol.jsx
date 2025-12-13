import React from "react";
import { useAuth } from "./context/Authcontext";

export default function RightCol() {
  const { sharedGridData, selectedRange, mainRange } = useAuth();

  // Generate 10 sub-ranges from the main range (e.g., 0100–0199 → 0100–0199, 0200–0299 ...)
  const [start] = mainRange.split("-");
  const base = parseInt(start, 10) * 100;
  const ranges = Array.from({ length: 10 }, (_, i) => {
    const low = base + i * 100;
    const high = low + 99;
    return `${String(low).padStart(4, "0")}-${String(high).padStart(4, "0")}`;
  });

  const columns = [
    { title: "Qty", key: "qty" },
    { title: "Amt", key: "amt" },
  ];

  return (
    <div className="w-full h-full bg-[#f5f5f5] flex box-border overflow-hidden p-[1px]">
      <div className="grid grid-cols-2 w-full h-full gap-[3px] sm:gap-[2.5px] md:gap-[3px] overflow-hidden">
        {columns.map((col) => (
          <div
            key={col.key}
            className="flex flex-col h-full gap-[3px] sm:gap-[2.5px] md:gap-[3px]"
          >
            {/* Header with Gradient */}
            <div
              className="h-[5vh] sm:h-[8.5vh] md:h-[8.5vh] lg:h-[5vh] xl:h-[5vh] 
              font-bold text-white flex items-center justify-center flex-shrink-0 
              portrait:h-[3.2vh] portrait:text-[2vw]"
              style={{
                background: "linear-gradient(90deg, #333334ff 0%, #7f7f7ff2 100%)",
              }}
            >
              {col.title}
            </div>

            {/* Grid Rows */}
            <div className="grid grid-rows-10 h-full gap-[3px] sm:gap-[2.5px] md:gap-[3px] overflow-hidden">
              {ranges.map((range) => {
                const val = sharedGridData?.[range]?.[col.key] || 0;
                return (
                  <div
                    key={range}
                    className="border border-[#ffbaba] rounded-[5vw] font-bold text-black flex items-center justify-center overflow-hidden text-center transition-all duration-200 hover:scale-[1.03]"
                    style={{
                      background:
                        "linear-gradient(90deg, #ffeb8a 0%, #ff0000f2 100%)",
                      color: "#000",
                      fontSize: "calc(9px + 0.4vw)",
                    }}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Font Adjustments */}
      <style jsx="true">{`
        @media (max-width: 1024px) {
          .qty-header {
            font-size: calc(9px + 0.4vw);
            height: calc(50px + 0.5vh);
          }
          .qty-cell {
            font-size: calc(8px + 0.4vw);
          }
        }

        @media (max-width: 999px) {
          .qty-header {
            font-size: calc(9px + 0.4vw);
            height: calc(30px + 0.5vh);
          }
          .qty-cell {
            font-size: calc(8px + 0.4vw);
            border-radius: 4vw;
          }
        }

        @media (max-width: 768px) and (orientation: landscape) {
          .qty-header {
            font-size: calc(8px + 0.4vw);
            height: calc(25px + 0.5vh);
          }
          .qty-cell {
            font-size: calc(7px + 0.4vw);
            border-radius: 4vw;
          }
        }

        @media (max-width: 480px) {
          .qty-header {
            font-size: calc(7px + 0.4vw);
            height: calc(50px + 0.5vh);
          }
          .qty-cell {
            font-size: calc(6px + 0.4vw);
            border-radius: 3vw;
          }
        }

        @media (max-width: 360px) {
          .qty-header {
            font-size: calc(6px + 0.4vw);
            height: calc(50px + 0.5vh);
          }
          .qty-cell {
            font-size: calc(5px + 0.4vw);
          }
        }
      `}</style>
    </div>
  );
}
