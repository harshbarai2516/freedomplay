import React, { useState, useEffect } from "react";

export default function NumberGrid({
  startNumber = 0,
  activeRange,
  checkedRanges = [],
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

  const getNumber = (r, c) => String(startNumber + r * 10 + c).padStart(4, "0");

  // Sync values from sharedGridData when switching ranges
  useEffect(() => {
    const data = sharedGridData[activeRange];
    if (data) {
      setRowValues(data.rows);
      setColValues(data.cols);
      setGridValues(data.cells);
    } else {
      // Reset to blank if range has no data yet
      setRowValues(Array(10).fill(""));
      setColValues(Array(10).fill(""));
      setGridValues(Array.from({ length: 10 }, () => Array(10).fill("")));
    }
  }, [sharedGridData, activeRange]);


  const handleColChange = (colIndex, value) => {
    setColValues((prev) => {
      const updated = [...prev];
      updated[colIndex] = value;
      return updated;
    });
    setGridValues((prev) =>
      prev.map((r) => {
        const newRow = [...r];
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
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="w-full h-full bg-white flex flex-col">
        {/* Header Row */}
        <div className="grid grid-cols-11 bg-gray-200 text-gray-800 font-semibold text-[0.5rem]">
          <div className="border-r border-gray-300 flex items-center justify-center portrait:text-[0.4rem]">
            BLOCK
          </div>
          {cols.map((colIndex) => (
            <div
              key={colIndex}
              className="border-r border-gray-300 flex flex-col items-center"
            >
              <div  className="text-[0.6rem] font-bold portrait:text-[0.4rem]">{`B${colIndex}`}</div>
              <input
                type="text"
                value={colValues[colIndex]}
                onChange={(e) => handleColChange(colIndex, e.target.value)}
                className="w-10 h-5 border-1 border-black text-center text-[0.6rem] portrait:w-[4.5vw] portrait:h-[3.2vw]"
              />
            </div>
          ))}
        </div>

        {/* Grid Body */}
        {rows.map((rowLabel, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-11 border-t border-gray-300 flex-1">
            <div className="bg-gray-200 border-r border-gray-300 flex flex-col items-center justify-center">
              <div className="text-[0.6rem] font-bold portrait:text-[0.4rem]">{rowLabel}</div>
              <input
                type="text"
                value={rowValues[rowIndex]}
                onChange={(e) => handleRowChange(rowIndex, e.target.value)}
                className="w-10 h-5 border-1 border-black text-center text-[0.6rem]  portrait:w-[4.5vw] portrait:h-[3.2vw]"
              />
            </div>

            {cols.map((colIndex) => (
              <div
                key={colIndex}
                className="border-r border-gray-300 flex flex-col items-center justify-center"
              >
                <div className="text-[0.6rem] font-bold text-gray-800 portrait:text-[0.4rem]">
                  {getNumber(rowIndex, colIndex)}
                </div>
                <input
                  type="text"
                  value={gridValues[rowIndex][colIndex]}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  className="w-10 h-5 border-1 border-black text-center text-[0.6rem] portrait:w-[4.5vw] portrait:h-[3.2vw]"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
