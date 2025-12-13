import React, { useState, useEffect } from "react";

export default function NumberGrid({
  startNumber = 0,
  activeRange,
  checkedRanges = [], // currently not used here, mirroring is handled in context
  sharedGridData,
  onSharedUpdate,
}) {
  const rows = Array.from({ length: 10 }, (_, i) => `F${i}`);
  const cols = Array.from({ length: 10 }, (_, i) => i);

  const [gridValues, setGridValues] = useState(
    Array.from({ length: 10 }, () => Array(10).fill(""))
  );
  const [colValues, setColValues] = useState(Array(10).fill(""));
  const [rowValues, setRowValues] = useState(Array(10).fill(""));

  const getNumber = (r, c) =>
    String(startNumber + r * 10 + c).padStart(4, "0");

  // ✅ Sync only when activeRange changes (NOT on every sharedGridData change)
  useEffect(() => {
    const data = sharedGridData[activeRange];

    if (data) {
      setRowValues(data.rows || Array(10).fill(""));
      setColValues(data.cols || Array(10).fill(""));
      setGridValues(
        data.cells ||
        Array.from({ length: 10 }, () => Array(10).fill(""))
      );
    } else {
      // New range → blank grid
      setRowValues(Array(10).fill(""));
      setColValues(Array(10).fill(""));
      setGridValues(
        Array.from({ length: 10 }, () => Array(10).fill(""))
      );
    }
  }, [activeRange, sharedGridData,]);

  const handleColChange = (colIndex, value) => {
    setColValues((prev) => {
      const updated = [...prev];
      updated[colIndex] = value;
      return updated;
    });

    setGridValues((prev) =>
      prev.map((row) => {
        const newRow = [...row];
        newRow[colIndex] = value;
        return newRow;
      })
    );

    onSharedUpdate(activeRange, "col", colIndex, value);
  };

  const handleRowChange = (rowIndex, value) => {
    setRowValues((prev) => {
      const updated = [...prev];
      updated[rowIndex] = value;
      return updated;
    });

    setGridValues((prev) => {
      const updated = [...prev];
      updated[rowIndex] = Array(10).fill(value);
      return updated;
    });

    onSharedUpdate(activeRange, "row", rowIndex, value);
  };

  const handleCellChange = (r, c, value) => {
    setGridValues((prev) => {
      const updated = prev.map((row) => [...row]);
      updated[r][c] = value;
      return updated;
    });

    // ✅ Persist + mirror via context
    onSharedUpdate(activeRange, "cell", { row: r, col: c }, value);
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="w-full h-full bg-white flex flex-col">
        {/* Header Row */}
        <div className="grid grid-cols-11 bg-gray-200 text-gray-800 font-semibold text-[0.5rem] portrait:h-[3.2vh]"
          style={{
            backgroundColor: "#9d6161",
          }}
        >
          <div className="border-r border-gray-300 flex items-center justify-center portrait:text-[0.4rem]">
            BLOCK
          </div>
          {cols.map((colIndex) => (
            <div
              key={colIndex}
              className="border-r border-gray-300 flex flex-col items-center"
            >
              <div className="text-[0.6rem] font-bold portrait:text-[0.4rem]">{`B${colIndex}`}</div>
              <input
                type="text"
                value={colValues[colIndex]}
                onChange={(e) => handleColChange(colIndex, e.target.value)}
                className="
                  text-center border border-black text-[0.6rem]
                  w-8 h-3
                  sm:w-10 sm:h-4
                  md:w-12 md:h-5
                  lg:w-14 lg:h-5
                  xl:w-16 xl:h-5
                  2xl:w-18 2xl:h-6
                  portrait:w-[4.5vw] portrait:h-[3.2vw]
                "
              />
            </div>
          ))}
        </div>

        {/* Grid Body */}
        {rows.map((rowLabel, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-11 border-t border-gray-300 flex-1"
          >
            {/* Row label + row input */}
            <div className="bg-gray-200 text-gray-900 border-r border-gray-300 flex flex-col items-center justify-center"
              style={{
                backgroundColor: "#9d6161",
              }}>
              <div className="text-[0.6rem] font-bold portrait:text-[0.4rem]">
                {rowLabel}
              </div>
              <input
                type="text"
                value={rowValues[rowIndex]}
                onChange={(e) => handleRowChange(rowIndex, e.target.value)}
                className="
                  text-center border border-black text-[0.6rem]
                  w-8 h-3
                  sm:w-10 sm:h-4
                  md:w-12 md:h-5
                  lg:w-14 lg:h-5
                  xl:w-16 xl:h-5
                  2xl:w-18 2xl:h-6
                  portrait:w-[4.5vw] portrait:h-[3.2vw]
                "
              />
            </div>

            {/* Cells */}
            {cols.map((colIndex) => (
              <div
                key={colIndex}
                className="border-r border-gray-300 flex flex-col items-center justify-center"
                style={{
                  backgroundColor: "#e4bbbb",
                }}
              >
                <div className="text-[0.8rem] font-black text-gray-900 portrait:text-[0.4rem]">
                  {getNumber(rowIndex, colIndex)}
                </div>
                <input
                  type="text"
                  value={gridValues[rowIndex][colIndex]}
                  onChange={(e) =>
                    handleCellChange(rowIndex, colIndex, e.target.value)
                  }
                  className="
                    text-center border border-black text-[0.6rem]
                    w-8 h-3
                    sm:w-10 sm:h-4
                    md:w-12 md:h-5
                    lg:w-14 lg:h-5
                    xl:w-16 xl:h-5
                    2xl:w-18 2xl:h-6
                    portrait:w-[4.5vw] portrait:h-[3.2vw]
                  "
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
