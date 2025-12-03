import React from "react";

export default function Filter() {
  return (
    <div className="w-full h-full flex flex-row flex-wrap items-center justify-start gap-[0.5vw] p-[0.3vw] overflow-hidden bg-gray-50">
      {/* Range Filters with Checkboxes */}
      <div className="flex items-center gap-[0.4vw]">
        <input
          type="checkbox"
          className="w-[1vw] h-[1vw] accent-black cursor-pointer"
        />
        <button className="bg-black text-white rounded-md px-[0.8vw] py-[0.3vw] text-[1vw] font-semibold">
          All
        </button>
      </div>

      {/* Range Buttons */}
      {[
        { label: "10-19", color: "bg-blue-600" },
        { label: "20-29", color: "bg-green-600" },
        { label: "30-39", color: "bg-red-600" },
        { label: "40-49", color: "bg-red-600" },
        { label: "50-59", color: "bg-red-600" },
        { label: "60-69", color: "bg-red-600" },
        { label: "70-79", color: "bg-red-600" },
        { label: "80-89", color: "bg-red-600" },
        { label: "90-99", color: "bg-red-600" },

      ].map((btn) => (
        <div key={btn.label} className="flex items-center gap-[0.4vw]">
          <input
            type="checkbox"
            className="w-[1vw] h-[1vw] accent-blue-500 cursor-pointer"
          />
          <button
            className={`${btn.color} text-white rounded-md px-[0.8vw] py-[0.3vw] text-[1vw] font-semibold`}
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
        <button className="bg-red-600 text-white font-semibold rounded-md px-[0.8vw] py-[0.3vw] text-[1vw]">
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
