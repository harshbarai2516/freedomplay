import React from "react";
import logo from "./assets/logo.jpeg";

export default function Result() {
  // Dummy display data
  const numbers = [
    "1085", "1190", "1251", "1339", "1434",
    "1502", "1604", "1765", "1848", "1920"
  ];
  const jokers = ["2x", "3x", "1x", "1x", "2x", "3x", "3x", "2x", "1x", "2x"];
  const colors = [
    "bg-red-600", "bg-blue-600", "bg-purple-600", "bg-green-600",
    "bg-violet-600", "bg-orange-500", "bg-pink-600", "bg-rose-500",
    "bg-teal-600", "bg-yellow-500"
  ];

  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex items-center justify-between bg-black text-white w-full px-[0.6vw] py-[0.4vw] overflow-hidden">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-[3vw] min-h-[28px] max-h-[50px] w-auto object-contain"
        />
      </div>

      {/* Middle: Boxes */}
      <div className="flex flex-1 justify-between items-center gap-[0.4vw] mx-[0.5vw] overflow-hidden">
        {numbers.map((num, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-center gap-[0.3vw] ${colors[idx]} text-white font-bold rounded-md text-[1.3vw] sm:text-[1.6vw] lg:text-[1vw] px-[0.3vw] py-[0.2vw] flex-1 min-w-0 relative`}
          >
            {/* Number digits */}
            <div className="flex gap-[0.1vw]">
              {num.split("").map((digit, dIdx) => (
                <span key={dIdx} className="block text-center">{digit}</span>
              ))}
            </div>

            {/* Joker */}
            <div className="flex items-center justify-center bg-gray-300 text-red-600 font-bold text-[1vw] rounded-md px-[0.4vw] py-[0.1vw] h-[70%] min-w-[1.8vw] relative">
              {jokers[idx]}
              {/* Crackers (decorative, static) */}
         
            </div>
          </div>
        ))}
      </div>

      {/* Right: Date and Time */}
      <div className="flex flex-col items-end text-right ml-[0.5vw] leading-tight">
        <span className="text-[1vw] sm:text-[1.2vw]">{currentDate}</span>
        <span className="text-[0.9vw] sm:text-[1vw] text-gray-300">{currentTime}</span>
      </div>
    </div>
  );
}