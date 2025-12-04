import React, { useEffect, useState } from "react";
import axios from "axios";

const Nav3 = ({ setNextSlot }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [nextSlot, setLocalNextSlot] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const fetchDateAndTime = async () => {
      try {
        const response = await axios.get(
          "https://thewonder.uk/royalgame/api/servertime"
        );
        const data = response.data;

        const now = new Date();
        const formattedDate = now
          .toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(",", "")
          .replace(/ /g, "-");

        const parts = formattedDate.split("-");
        const finalDate = `${parts[0]}, ${parts[1]}-${parts[2]}-${parts[3]}`;

        const hour = data.hour ?? 0;
        const minute = data.minute ?? 0;
        const second = data.second ?? 0;
        const formattedTime = new Date(0, 0, 0, hour, minute, second)
          .toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
          .replace(" ", "");

        setCurrentDate(finalDate);
        setCurrentTime(formattedTime);
      } catch (error) {
        console.error("Error fetching date/time:", error);
      }
    };

    const getNextQuarterHourSlot = (startTime) => {
      let nextTime = new Date(startTime);
      nextTime.setSeconds(0);
      nextTime.setMilliseconds(0);

      const currentMinutes = nextTime.getMinutes();
      const remainder = currentMinutes % 15;
      const minutesToAdd = remainder === 0 ? 15 : 15 - remainder;
      nextTime.setMinutes(currentMinutes + minutesToAdd);

      return nextTime;
    };

    const calculateRemainingTime = (nextSlotTime) => {
      const now = new Date();
      const diff = nextSlotTime - now;

      if (diff <= 0) return "00:00:00";

      const totalSeconds = Math.floor(diff / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    };

    let nextSlotTime = getNextQuarterHourSlot(new Date());
    const slot = nextSlotTime
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" ", "");

    setLocalNextSlot(slot);
    setNextSlot(slot);

    fetchDateAndTime();

    const interval = setInterval(() => {
      fetchDateAndTime();
      const remaining = calculateRemainingTime(nextSlotTime);
      setRemainingTime(remaining);

      if (remaining === "00:00:00") {
        nextSlotTime = getNextQuarterHourSlot(new Date());
        const slot = nextSlotTime
          .toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace(" ", "");

        setLocalNextSlot(slot);
        setNextSlot(slot);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setNextSlot]);

  return (
    <div className="container-fluid fw-bold responsive-container">
      <div
        className="d-flex flex-nowrap align-items-center justify-content-between text-center"
        style={{
          overflowX: "auto",
          minHeight: "30px",
          width: "100%",
          gap: "0.1rem",
        }}
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
          {nextSlot}
        </div>

        <div className="bg-dark text-light flex-grow-1 flex-shrink-0 responsive-text">
          <span className="d-none d-sm-inline">Remaining: </span>
          <span className="d-inline d-sm-none">Time: </span>
          {remainingTime || "Loading..."}
        </div>
      </div>

      <style>{`
        /* Default font size for mobile portrait */
        .responsive-text {
          font-size: clamp(0.5rem, 1.2vw, 0.9rem);
          padding: 0.2rem 0.3rem;
          margin-top: -8px !important;
        }

        /* Desktop & large screens */
        @media (min-width: 992px) {
          .responsive-text {
            font-size: clamp(0.85rem, 1.5vw, 1.2rem);
          }
        }

        /* Mobile landscape: remove padding/margin & adjust font */
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