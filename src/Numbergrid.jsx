import React from "react";

const NumberGrid = () => {
    const rows = Array.from({ length: 10 }, (_, i) => `F${i}`);
    const cols = ["B0", ...Array.from({ length: 9 }, (_, i) => i + 1)];
    const startNumber = 1000;

    // Ensure: B0 column -> 1000, 1100, 1200, ... (downwards)
    const getNumber = (rowIndex, colIndex) => startNumber + rowIndex * 100 + colIndex;

    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {/* Container fits exactly inside parent */}
            <div className="w-full h-full bg-white flex flex-col">
                {/* Header Row */}
                <div className="grid grid-cols-11 bg-gray-200 text-gray-800 font-semibold text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm">
                    {/* BLOCK column (no capsule) */}
                    <div className="border-r border-gray-300 flex flex-col items-center justify-center">
                        <div>BLOCK</div>
                    </div>

                    {/* B0, 1, 2... with capsules below */}
                    {cols.map((col, i) => (
                        <div
                            key={i}
                            className="border-r border-gray-300 flex flex-col items-center justify-center"
                        >
                            <div>{col}</div>
                            <div className="w-4 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-black rounded-0 mt-0" />
                        </div>
                    ))}
                </div>

                {/* Body rows */}
                {rows.map((rowLabel, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="grid grid-cols-11 border-t border-gray-300 flex-1"
                    >
                        {/* F0, F1... with capsule below */}
                        <div className="bg-gray-200 border-r border-gray-300 flex flex-col items-center justify-center font-semibold text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm">
                            <div>{rowLabel}</div>
                            <div className="w-4 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-black rounded-0 mt-0" />
                        </div>

                        {/* Numbers with capsules below */}
                        {cols.map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className="border-r border-gray-300 flex flex-col items-center justify-center"
                            >
                                <div className="text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm font-bold text-gray-800">
                                    {getNumber(rowIndex, colIndex)}
                                </div>
                                <div className="w-4 sm:w-10 md:w-12 h-3 sm:h-4 md:h-5 border-2 border-black rounded-0 mt-0" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NumberGrid;





