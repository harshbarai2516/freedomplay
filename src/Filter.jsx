import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/Authcontext"; // adjust path if needed

export default function Filter() {


  const {
    mainRange,
    setMainRange,
    checkedMainRanges,
    setCheckedMainRanges,
  } = useAuth();

  const navigate = useNavigate();

  const mainRanges = [
    { label: "00-,09", color: "bg-blue-600" },
    { label: "10-,19", color: "bg-blue-600" },
    { label: "20-,29", color: "bg-green-600" },
    { label: "30-,39", color: "bg-red-600" },
    { label: "40-,49", color: "bg-purple-600" },
    { label: "50-,59", color: "bg-yellow-500" },
    { label: "60-,69", color: "bg-pink-600" },
    { label: "70-,79", color: "bg-teal-600" },
    { label: "80-,89", color: "bg-orange-500" },
    { label: "90-,99", color: "bg-indigo-600" },
  ];

  const toggleMainCheck = (label) => {
    setCheckedMainRanges((prev) => {
      const updated = prev.includes(label)
        ? prev.filter((r) => r !== label)
        : [...prev, label];
      return updated;
    });
  };

  const handleAllToggle = (checked) => {
    if (checked) {
      setCheckedMainRanges(mainRanges.map((r) => r.label));
    } else {
      setCheckedMainRanges([]);
    }
  };

  return (
    <div className="w-full h-full flex flex-row flex-wrap items-center justify-start gap-[0.5vw] p-[0.3vw] overflow-hidden bg-gray-50">
      {/* All checkbox */}
      <div className="flex items-center gap-[0.6vw]">
        <input
          type="checkbox"
          className="w-[1vw] h-[1vw] accent-black cursor-pointer portrait:w-[3vw] portrait:h-[3vw]"
          checked={checkedMainRanges.length === mainRanges.length}
          onChange={(e) => handleAllToggle(e.target.checked)}
        />
        <button className="bg-black text-white rounded-md px-[0.8vw] py-[0.3vw] text-[1vw] font-semibold
         portrait:text-[2.5vw] portrait:px-[0.5vw] portrait:py-[3vw] portrait:p-1">
          All
        </button>
      </div>

      {/* Range buttons with checkboxes */}
      {mainRanges.map((btn) => (
        <div key={btn.label} className="flex items-center gap-[0.4vw]">
          <input
            type="checkbox"
            className="w-[1vw] h-[1vw] accent-blue-500 cursor-pointer  portrait:w-[3vw] portrait:h-[3vw]"
            checked={checkedMainRanges.includes(btn.label)}
            onChange={() => toggleMainCheck(btn.label)}
          />
          <button
            onClick={() => setMainRange(btn.label)}
            className={`${btn.color} text-white rounded-md px-[0.8vw] py-[0.3vw] text-[1vw] font-semibold 
            ${mainRange === btn.label ? "ring-1 ring-black" : ""}
            portrait:text-[2.5vw] portrait:px-[0.5vw] portrait:py-[2vw] portrait:p-1 flex flex-col portrait:leading-tight`}
          >
            <span className="hidden portrait:block">
              {btn.label.split(",")[0]}<br />{btn.label.split(",")[1]}
            </span>
            <span className="portrait:hidden">{btn.label}</span>
          </button>

        </div>
      ))}

      {/* Optional filters */}
      {["EVEN", "ODD", "CP", "FP"].map((type) => (
        <div key={type} className="flex items-center gap-[0.4vw]">
          <input
            type="checkbox"
            className="w-[1vw] h-[1vw] accent-gray-600 cursor-pointer portrait:w-[3vw] portrait:h-[3vw]"
          />
          <span className="text-black text-[1.25vw] font-medium portrait:text-[3vw]">{type}</span>
        </div>
      ))}


      {/* Action Buttons */}
      <div className="flex items-center gap-[0.5vw] flex-wrap">
        <button className="bg-red-600 text-white font-semibold rounded-md px-[0.8vw] py-[0.3vw] text-[1vw] portrait:text-[2.5vw]" onClick={() => navigate('/home')}>
          3D Game
        </button>
        <button className="bg-black text-white  px-[0.8vw] py-[0.3vw] text-[1vw] portrait:text-[3vw]">
          Password
        </button>
        <button className="bg-black text-white  px-[0.8vw] py-[0.3vw] text-[1vw] portrait:text-[3vw]">
          Logout
        </button>
        <button className="bg-yellow-300 text-white px-[0.6vw] py-[0.3vw] text-[1vw] 
  portrait:text-[3vw] portrait:w-[23vw] portrait:h-[6vw] flex items-center justify-center 
  flex-col portrait:flex-row">

          <span className="text-[10px] text-black sm:text-[10px] font-bold leading-tight text-center portrait:mr-1">
            Balance
          </span>

          <span className="bg-white text-red-600 font-extrabold text-[9px] sm:text-[10px] px-0.1 py-0.5 border border-black truncate">
            10000$
          </span>

        </button>

      </div>
    </div>
  );
}
