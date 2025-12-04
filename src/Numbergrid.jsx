import React from "react";

export default function NumberGrid({ startNumber = 0 }) {
  const rows = Array.from({ length: 10 }, (_, i) => `F${i}`);
  const cols = Array.from({ length: 10 }, (_, i) => i);

  // Format with 4 digits
  const getNumber = (rowIndex, colIndex) => {
    const index = rowIndex * 10 + colIndex;
    return String(startNumber + index).padStart(4, "0");
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="w-full h-full bg-white flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-11 bg-gray-200 text-gray-800 font-semibold text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm">
          <div className="border-r border-gray-300 flex items-center justify-center">
            BLOCK
          </div>
          {cols.map((col) => (
            <div
              key={col}
              className="border-r border-gray-300 flex flex-col items-center justify-center"
            >
              <div>{`B${col}`}</div>
              <input
                type="text"
                className="w-4 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-black text-center text-[0.6rem] font-semibold"
              />
            </div>
          ))}
        </div>

        {/* Body */}
        {rows.map((rowLabel, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-11 border-t border-gray-300 flex-1">
            <div className="bg-gray-200 border-r border-gray-300 flex flex-col items-center justify-center font-semibold text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm">
              <div>{rowLabel}</div>
              <input
                type="text"
                className="w-4 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-black text-center text-[0.6rem] font-semibold"
              />
            </div>

            {cols.map((_, colIndex) => (
              <div
                key={colIndex}
                className="border-r border-gray-300 flex flex-col items-center justify-center"
              >
                <div className="text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm font-bold text-gray-800">
                  {getNumber(rowIndex, colIndex)}
                </div>
                <input
                  type="text"
                  className="w-4 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-black text-center text-[0.6rem] font-semibold"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

