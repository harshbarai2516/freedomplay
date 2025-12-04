import React from "react";
import { useNavigate } from "react-router-dom";

export default function Filter({ onMainRangeChange }) {

  const mainRanges = [
    { label: "00-09", color: "bg-blue-600" },
    { label: "10-19", color: "bg-blue-600" },
    { label: "20-29", color: "bg-green-600" },
    { label: "30-39", color: "bg-red-600" },
    { label: "40-49", color: "bg-purple-600" },
    { label: "50-59", color: "bg-yellow-500" },
    { label: "60-69", color: "bg-pink-600" },
    { label: "70-79", color: "bg-teal-600" },
    { label: "80-89", color: "bg-orange-500" },
    { label: "90-99", color: "bg-indigo-600" },
  ];
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-row flex-wrap items-center justify-start gap-[0.5vw] p-[0.3vw] overflow-hidden bg-gray-50">
      {/* All button */}
      <div className="flex items-center gap-[0.4vw]">
        <input
          type="checkbox"
          className="w-[1vw] h-[1vw] accent-black cursor-pointer"
        />
        <button className="bg-black text-white rounded-md px-[0.8vw] py-[0.3vw] text-[1vw] font-semibold">
          All
        </button>
      </div>

      {/* Range Buttons with checkbox (restored) */}
      {mainRanges.map((btn) => (
        <div key={btn.label} className="flex items-center gap-[0.4vw]">
          <input
            type="checkbox"
            className="w-[1vw] h-[1vw] accent-blue-500 cursor-pointer"
          />
          <button
            onClick={() => onMainRangeChange?.(btn.label)}
            className={`${btn.color} text-white rounded-md px-[0.8vw] py-[0.3vw] text-[1vw] font-semibold hover:scale-105 transition`}
          >
            {btn.label}
          </button>
        </div>
      ))}

      {/* Type Filters */}
      {["EVEN", "ODD", "CP", "FP"].map((type) => (
        <div key={type} className="flex items-center gap-[0.4vw]">
          <input
            type="checkbox"
            className="w-[1vw] h-[1vw] accent-gray-600 cursor-pointer"
          />
          <span className="text-black text-[1.25vw] font-medium">{type}</span>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex items-center gap-[0.5vw] flex-wrap">
        <button className="bg-red-600 text-white font-semibold rounded-md px-[0.8vw] py-[0.3vw] text-[1vw]" onClick={() => navigate('/home')}>
          3D Game
        </button>
        <button className="bg-black text-white rounded-md px-[0.8vw] py-[0.3vw] text-[1vw]">
          Password
        </button>
        <button className="bg-black text-white rounded-md px-[0.8vw] py-[0.3vw] text-[1vw]">
          Logout
        </button>
      </div>
    </div>
  );
}
