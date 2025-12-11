import React from "react";

export default function BottomRow() {
  return (
    <div className="h-[7%] w-full bg-gray-600 flex items-center justify-center p-0 portrait:h-[100%]">
      {/* LEFT - AdvanceDraw Button */}
        <div className="w-[20%] lg:w-[20%] bg-blue-500 flex items-center justify-center p-0">
          <button className="bg-red-600 text-white font-bold rounded-md px-[1.5vw] py-[0.4vw] text-[0.9vw] sm:text-[1vw] md:text-[1.1vw] hover:bg-red-700 active:scale-[0.98] transition portrait:w-[]">
            AdvanceDraw
          </button>
        </div>

        {/* MIDDLE - Transaction + Barcode + Buy */}
        <div className="flex items-center justify-center flex-[3] gap-[1vw] min-w-[300px]">

          {/* Last Transaction */}
          <div className="flex flex-col justify-center items-start text-white font-semibold leading-tight min-w-[120px]">
            <span className="text-[0.9vw] sm:text-[1vw] md:text-[1.1vw]">
              Last Transaction:
            </span>
            <span className="text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] font-bold">
              #22081690601 Pt(40)
            </span>
          </div>

          {/* Barcode Input */}
          <input
            type="text"
            placeholder="Barcode"
            className="flex-1 max-w-[200px] text-center text-gray-700 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] font-medium border-2 border-black rounded-md py-[0.3vw] px-[0.6vw] bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          {/* Buy Button */}
          <button className="bg-red-600 text-white font-bold rounded-md px-[1.5vw] py-[0.4vw] text-[0.9vw] sm:text-[1vw] md:text-[1.1vw] hover:bg-red-700 active:scale-[0.98] transition whitespace-nowrap">
            Buy
          </button>
        </div>

        {/* RIGHT - Result Boxes */}
        <div className="flex items-center justify-center flex-[1] gap-[0.4vw] min-w-[80px]">
          <div className="flex-1 bg-white rounded-lg flex items-center justify-center font-bold text-gray-900 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] h-[4vh] min-h-[35px]">
            0
          </div>
          <div className="flex-1 bg-white rounded-lg flex items-center justify-center font-bold text-gray-900 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] h-[4vh] min-h-[35px]">
            0
          </div>
        </div>
    </div>
  );
}