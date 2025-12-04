import React, { useEffect, useState } from "react";

export default function UpperRow() {
  const [timeData, setTimeData] = useState({});
  const [popup, setPopup] = useState("");
  const [prevTime, setPrevTime] = useState(null);

  // ✅ Fetch time API
  const fetchTimeData = async () => {
    try {
      const response = await fetch(`https://kgf3.us/api/time/getTime`);
      const data = await response.json();

      if (data) {
        const newTimeData = {
          currentDate: data.current_date || timeData.currentDate,
          currentTime: data.current_time_24h || timeData.currentTime,
          currentTime12: data.current_time_12h || timeData.currentTime12,
          drawTime12: data.draw_time_12h || timeData.drawTime12,
          drawTime: data.next_draw_time_12h || timeData.drawTime,
          nextdrawTime:
            data.next_draw_time_24h || data.closeTime || timeData.closeTime,
          remainingTime: data.remaining_time || timeData.remainingTime,
          pointTotal:
            data.point_total || data.pointTotal || timeData.pointTotal,
        };

        setTimeData(newTimeData);

        // optional: session storage
        sessionStorage.setItem("drawTime", newTimeData.drawTime);
        sessionStorage.setItem("drawTime24", newTimeData.prevDraw || "");
        sessionStorage.setItem("nextdrawTime", newTimeData.nextdrawTime || "");
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  // ✅ Auto-fetch every second
  useEffect(() => {
    fetchTimeData();
    const interval = setInterval(fetchTimeData, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Popup logic (time alerts)
  useEffect(() => {
    const parseTimeToSeconds = (str) => {
      if (!str) return NaN;
      if (/^\d+$/.test(str)) return Number(str);
      const parts = str.split(":");
      if (parts.length === 2) {
        const min = parseInt(parts[0], 10);
        const sec = parseInt(parts[1], 10);
        return min * 60 + sec;
      }
      return NaN;
    };

    const rt = parseTimeToSeconds(timeData?.remainingTime);
    if (isNaN(rt)) return;

    if (prevTime !== null && prevTime > 30 && rt <= 30) {
      setPopup("⏰ Time is almost up!");
      setTimeout(() => setPopup(""), 2000);
    } else if (prevTime !== null && prevTime < 899 && rt >= 899) {
      setPopup("🎉 New round started!");
      setTimeout(() => setPopup(""), 2000);
    }

    setPrevTime(rt);
  }, [timeData?.remainingTime]);

  const formatTimeWithoutSeconds = (timeString) =>
    timeString?.replace(/:\d{2}(?=\s*(AM|PM|am|pm))/i, "") || "";

  return (
    <div className="w-full h-full bg-gray-100 p-1 flex flex-col justify-center">
      {/* Popup Notification */}
      {popup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg text-base sm:text-lg font-semibold z-50 shadow-lg text-center max-w-[90vw]">
          {popup}
        </div>
      )}

      {/* Upper Row */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 sm:gap-2 w-full h-full">
        {/* CT (Current Time) */}
        <div className="flex items-center justify-center bg-yellow-300 border border-black rounded-xl px-2 py-1 flex-1 min-w-[60px]">
          <span className="bg-black text-white text-xs sm:text-sm font-bold rounded px-1 mr-1">
            CT
          </span>
          <span className="text-xs sm:text-sm font-bold">
            {timeData?.currentTime12 || "Loading..."}
          </span>
        </div>

        {/* CS (Close Time) */}
        <div className="flex items-center justify-center bg-yellow-300 border border-black rounded-xl px-2 py-1 flex-1 min-w-[60px]">
          <span className="bg-black text-white text-xs sm:text-sm font-bold rounded px-1 mr-1">
            CS
          </span>
          <span className="text-xs sm:text-sm font-bold">
            {formatTimeWithoutSeconds(timeData?.drawTime) || "Loading..."}
          </span>
        </div>

        {/* RT (Remaining Time) */}
        <div className="flex items-center justify-center bg-yellow-300 border border-black rounded-xl px-2 py-1 flex-1 min-w-[60px]">
          <span className="text-sm sm:text-base font-extrabold text-gray-900">
            {timeData?.remainingTime || "00:00"}
          </span>
          <span className="ml-1 text-xs sm:text-sm font-semibold">RT</span>
        </div>

        {/* Static Buttons */}
        {["RESULT", "ACCOUNT", "REPRINT", "CANCEL", "REFRESH"].map((label) => (
          <button
            key={label}
            className="flex-1 min-w-[70px] bg-lime-400 border border-black rounded-xl text-xs sm:text-sm font-bold py-1 hover:brightness-105 active:brightness-90 transition"
          >
            {label}
          </button>
        ))}

        {/* Bonus Box */}
        <div className="flex items-center justify-center bg-yellow-300 border border-black rounded-xl px-2 py-1 flex-1 min-w-[80px]">
          <div className="flex flex-col items-center text-center leading-tight">
            <span className="text-[10px] sm:text-xs font-bold">Balance</span>
          </div>
          <span className="ml-2 bg-white text-red-600 font-extrabold text-[10px] sm:text-sm px-2 py-1 rounded border border-black">
            10000$
          </span>
        </div>
      </div>
    </div>
  );
}
