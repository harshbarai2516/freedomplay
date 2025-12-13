import React from "react";
import { useNavigate } from "react-router-dom";

export default function Ogresult() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-rose-400 via-red-400 to-orange-300 overflow-hidden">
      
      {/* 🔝 Top Controls (Full Width Bar) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-white/20 backdrop-blur-md border-b border-white/30">
        {/* 📅 Date Picker */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-white font-semibold text-sm sm:text-base">
            📅 Select Date:
          </span>
          <input
            type="date"
            className="px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-800 text-sm sm:text-base rounded-md border-2 border-rose-500 focus:ring-2 focus:ring-rose-400 outline-none w-[150px] sm:w-[180px]"
          />
        </div>

        {/* 🔘 Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/result")}
            className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
          >
            Result
          </button>

          <button
            onClick={() => navigate("/account")}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
          >
            Account
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* 🧾 Scrollable Full-Width Content */}
      <div className="flex-1 overflow-y-auto w-full px-2 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-6 flex flex-col gap-5">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="w-full bg-white/95 rounded-xl shadow-lg border border-rose-200 p-3 sm:p-6"
          >
            {/* Header */}
            <h3 className="text-center text-sm sm:text-lg font-bold text-gray-700 bg-gradient-to-r from-rose-500 to-red-500 text-white py-2 rounded-md mb-3 shadow-sm w-full">
              09:00 AM — 2025-12-13
            </h3>

            {/* Responsive Grid */}
            {[...Array(3)].map((__, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-10 gap-[3px] sm:gap-1 mb-2 sm:mb-3 w-full"
              >
                {[...Array(10)].map((___, numIdx) => (
                  <div
                    key={numIdx}
                    className="flex flex-col items-center justify-center bg-rose-50 rounded-md text-gray-800 text-[3.5vw] sm:text-sm md:text-base font-semibold py-2 sm:py-3 hover:bg-rose-100 transition-all duration-150 w-full"
                  >
                    <span>
                      {Math.floor(Math.random() * 99)
                        .toString()
                        .padStart(2, "0")}
                    </span>
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[2.8vw] sm:text-[0.7rem] font-bold px-[3px] py-[1px] rounded-md mt-[2px] leading-none shadow-sm">
                      2x
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
