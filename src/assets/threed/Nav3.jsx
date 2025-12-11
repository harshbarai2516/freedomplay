import React, { useEffect, useState } from "react";
import axios from "axios";

const Nav3 = ({ setNextSlot }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [nextSlot, setLocalNextSlot] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const response = await axios.get("https://freedomplay.us/api/time/getTime");
        const data = response.data;

        // ✅ Format date: Sat 06-Dec-2025
        const dateObj = new Date(data.current_date);
        const options = {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        };
        const formattedDate = dateObj.toLocaleDateString("en-GB", options);
        const [weekday, day, month, year] = formattedDate.split(" ");
        setCurrentDate(`${weekday} ${day}-${month}-${year}`);

        // ✅ Current Time with seconds - KEEP FORMAT FROM API
        const currentTimeWithSeconds = data.current_time_12h.replace(" ", " ");
        setCurrentTime(currentTimeWithSeconds);

        // ✅ Next Slot with leading zero (01:45PM)
        let nextSlotRaw = data.next_draw_time_12h.replace(" ", ""); // e.g., "1:45 PM" → "1:45PM"

        const timePart = nextSlotRaw.slice(0, -2); // "1:45"
        const ampm = nextSlotRaw.slice(-2); // "PM"

        let [hour, minute] = timePart.split(":");

        // ✅ Add leading zero if hour is single digit
        hour = hour.padStart(2, "0");

        const nextSlotFormatted = `${hour}:${minute} ${ampm}`;
        setLocalNextSlot(nextSlotFormatted);
        setNextSlot(nextSlotFormatted);

        // ✅ Remaining Time (HH:MM)
        const remaining = data.remaining_time.slice(0, 5);
        setRemainingTime(remaining);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    fetchTimeData();
    const interval = setInterval(fetchTimeData, 1000);
    return () => clearInterval(interval);
  }, [setNextSlot]);

  return (
    <div className="container-fluid fw-bold responsive-container" style={{ marginTop: "-1px" }}>
      <div
        className="d-flex flex-nowrap align-items-center justify-content-between text-center p-2"
        style={{ overflowX: "auto", minHeight: "30px", width: "100%", gap: "0.1rem" }}
      >
        <div className="bg-dark text-light flex-grow-1 flex-shrink-0 responsive-text">
          {currentDate || "Loading..."}
        </div>

        <div className="bg-dark text-light flex-grow-1 flex-shrink-0 responsive-text">
          <span className="d-none d-sm-inline">Current Time: </span>
          <span className="d-inline d-sm-none">Time: </span>
          {currentTime || "Loading..."}
        </div>

        <div className="bg-dark text-light flex-grow-1 flex-shrink-0 responsive-text">
          <span className="d-none d-sm-inline">Time Slot: </span>
          <span className="d-inline d-sm-none">Slot: </span>
          {nextSlot || "Loading..."}
        </div>

        <div className="bg-dark text-light flex-grow-1 flex-shrink-0 responsive-text">
          <span className="d-none d-sm-inline">Remaining: </span>
          <span className="d-inline d-sm-none">Time: </span>
          {remainingTime || "Loading..."}
        </div>
      </div>

      <style>{`
        .responsive-text {
          font-size: clamp(0.5rem, 1.2vw, 0.9rem);
          padding: 0.2rem 0.3rem;
          margin-top: -8px !important;
        }
        @media (min-width: 992px) {
          .responsive-text { font-size: clamp(0.85rem, 1.5vw, 1.2rem); }
        }
        @media (max-width: 991px) and (orientation: landscape) {
          .responsive-container { 
            padding: 0 !important; 
            margin: 0 !important; 
            margin-top: -4px !important; 
          }
          .responsive-text { 
            font-size: clamp(0.5rem, 0.5vw, 0.5rem); 
            padding: 0 !important; 
          }
        }
      `}</style>
    </div>
  );
};

export default Nav3;