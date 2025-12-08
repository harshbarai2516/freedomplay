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
    <div className="w-full bg-gray-100 px-1 py-0.5">
      {/* Popup Notification */}
      {popup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold z-50 shadow-lg text-center max-w-[90vw]">
          {popup}
        </div>
      )}

      {/* Main Container - Single Row with Wrap */}
      <div
        className="
    flex flex-nowrap items-center justify-between w-full 
    gap-[0.4vw] px-[0.5vw] py-[0.3vw] overflow-hidden 
    portrait:gap-[0.2vw] portrait:scale-[1]
  "
      >
        {/* CT (Current Time) */}
        <div className="flex-shrink-0 flex items-center bg-yellow-300 border border-black rounded-lg px-[0.6vw] py-[0.3vw]">
          <span className="bg-black text-white text-[0.8vw] font-bold rounded px-[0.3vw] mr-[0.3vw] portrait:text-[2.2vw]">
            CT
          </span>
          <span className="text-[0.8vw] font-bold truncate portrait:text-[2.2vw]">
            {timeData?.currentTime12?.slice(0, 8) || "Loading"}
          </span>
        </div>

        {/* CS (Close Time) */}
        <div className="flex-shrink-0 flex items-center bg-yellow-300 border border-black rounded-lg px-[0.6vw] py-[0.3vw]">
          <span className="bg-black text-white text-[0.8vw] font-bold rounded px-[0.3vw] mr-[0.3vw] portrait:text-[2.2vw]">
            CS
          </span>
          <span className="text-[0.8vw] font-bold truncate portrait:text-[2.2vw]">
            {formatTimeWithoutSeconds(timeData?.drawTime)?.slice(0, 8) || "Loading"}
          </span>
        </div>

        {/* RT (Remaining Time) */}
        <div className="flex-shrink-0 flex items-center justify-center bg-yellow-300 border border-black rounded-lg px-[0.8vw] py-[0.3vw]">
          <span className="text-[0.9vw] font-extrabold text-gray-900 portrait:text-[2.4vw]">
            {timeData?.remainingTime?.slice(0, 5) || "00:00"}
          </span>
          <span className="ml-[0.3vw] text-[0.8vw] font-semibold portrait:text-[2.2vw]">RT</span>
        </div>

        {/* Static Buttons */}
        {["RESULT", "ACCOUNT", "REPRINT", "CANCEL", "REFRESH"].map((label) => (
          <button
            key={label}
            className="flex-shrink-0 bg-lime-400 border border-black rounded-lg font-bold 
      px-[0.8vw] py-[0.3vw] text-[0.8vw] hover:brightness-105 active:brightness-90 transition truncate 
      portrait:text-[2.3vw] portrait:px-[0.5vw]"
          >
            {label}
          </button>
        ))}

        {/* Balance Box */}
        <div className="flex-shrink-0 flex items-center bg-yellow-300 border border-black rounded-lg px-[0.8vw] py-[0.3vw] portrait:hidden">
          <span className="text-[0.8vw] font-bold leading-tight portrait:text-[2.3vw]">Balance</span>
          <span className="ml-[0.3vw] bg-white text-red-600 font-extrabold text-[0.8vw] px-[0.5vw] py-[0.1vw] rounded border border-black truncate portrait:text-[2.3vw]">
            10000$
          </span>
        </div>
      </div>

    </div>
  );
}