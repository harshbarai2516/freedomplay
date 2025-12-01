import React from "react";

export default function RightCol() {
  const rows = 10;
  const columns = [
    { title: "Quantity", color: "#1a2d5a" },
    { title: "Amount", color: "#1a5a3a" },
  ];

  return (
    <div className="w-full h-full bg-[#f5f5f5] flex box-border overflow-hidden p-[1px]">
      <div className="grid grid-cols-2 w-full h-full gap-[3px] sm:gap-[2.5px] md:gap-[3px] overflow-hidden">
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col h-full gap-[3px] sm:gap-[2.5px] md:gap-[3px]">
            {/* Header */}
            <div
              className="text-white font-bold rounded-[4px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: col.color,
                fontSize: "calc(10px + 0.4vw)",
                height: "calc(50px + 0.5vh)",
              }}
            >
              {col.title}
            </div>

            {/* Rows */}
            <div className={`grid grid-rows-${rows} h-full gap-[3px] sm:gap-[2.5px] md:gap-[3px] overflow-hidden`}>
              {Array(rows)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-[#ffeb8a] to-[#ffd700] border border-[#e0d5a4] rounded-[5vw] font-bold text-black flex items-center justify-center overflow-hidden"
                    style={{ fontSize: "calc(9px + 0.4vw)" }}
                  >
                    0
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Responsive Styling */}
      <style jsx="true">{`
        /* Tablet and small desktop */
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

        /* Mobile landscape */
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

        /* Small mobile devices */
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

        /* Extra small mobile devices */
        @media (max-width: 360px) {
          .qty-header {
            font-size: calc(6px + 0.4vw);
            height: calc(50px + 0.5vh);
          }
          .qty-cell {
            font-size: calc(5px + 0.4vw);
          }
        }

        /* High contrast mode */
        @media (forced-colors: active) {
          .qty-header {
            forced-color-adjust: none;
            background-color: ButtonText !important;
            color: ButtonFace !important;
          }
          .qty-cell {
            forced-color-adjust: none;
            background-color: Canvas;
            color: black;
            border-color: ButtonText;
            border-radius: 3vw;
          }
        }
      `}</style>
    </div>
  );
}
