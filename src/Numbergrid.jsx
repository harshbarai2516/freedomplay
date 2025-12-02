import React, { useEffect, useRef, useState } from "react";

const NumberGrid = () => {
  const rows = Array.from({ length: 10 }, (_, i) => `F${i}`);
  const cols = ["B0", ...Array.from({ length: 9 }, (_, i) => i + 1)];
  const startNumber = 1000;

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 });

  const getNumber = (rowIndex, colIndex) => startNumber + rowIndex * 100 + colIndex;

  useEffect(() => {
    if (!contentRef.current) return;

    // ✅ Store the *natural unscaled size* of content once
    const rect = contentRef.current.getBoundingClientRect();
    setBaseSize({ width: rect.width, height: rect.height });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !baseSize.width || !baseSize.height) return;

      const container = containerRef.current.getBoundingClientRect();
      const scaleX = container.width / baseSize.width;
      const scaleY = container.height / baseSize.height;
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [baseSize]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-gray-50 overflow-hidden"
    >
      {/* Wrapper that applies the scale */}
      <div
        className="transform-origin-top-left transition-transform duration-300 ease-in-out"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Actual content (natural size) */}
        <div ref={contentRef} className="bg-white inline-block">
          {/* Header Row */}
          <div className="grid grid-cols-11 bg-gray-200 text-gray-800 font-semibold text-[0.6rem] sm:text-xs md:text-sm lg:text-base">
            <div className="border-r border-gray-300 flex flex-col items-center justify-center py-1 px-1">
              <div>BLOCK</div>
            </div>

            {cols.map((col, i) => (
              <div
                key={i}
                className="border-r border-gray-300 flex flex-col items-center justify-center py-1 px-1"
              >
                <div>{col}</div>
                <div className="w-6 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-purple-500 rounded-full mt-0" />
              </div>
            ))}
          </div>

          {rows.map((rowLabel, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-11 border-t border-gray-300">
              <div className="bg-gray-200 border-r border-gray-300 flex flex-col items-center justify-center font-semibold text-[0.6rem] sm:text-xs md:text-sm lg:text-base py-1 px-1">
                <div>{rowLabel}</div>
                <div className="w-6 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-purple-500 rounded-full mt-0" />
              </div>

              {cols.map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="border-r border-gray-300 flex flex-col items-center justify-center py-1 px-1"
                >
                  <div className="text-[0.6rem] sm:text-xs md:text-sm lg:text-base font-bold text-gray-800">
                    {getNumber(rowIndex, colIndex)}
                  </div>
                  <div className="w-6 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-purple-500 rounded-full mt-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberGrid;
