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
    <div className="container-fluid fw-bold" id="nav3">
      <div className="row gy-2">
        <div className="col-12 col-md bg-dark text-light py-1 text-center">
          {currentDate || "Loading..."}
        </div>
        <div className="col-12 col-md bg-dark text-light py-1 mx-1 text-center">
          Current Time: {currentTime || "Loading..."}
        </div>
        <div className="col-12 col-md bg-dark text-light py-1 me-1 text-center">
          Time Slot: {nextSlot}
        </div>
        <div className="col-12 col-md bg-dark text-light py-1 text-center">
          Remaining Time: {remainingTime || "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Nav3;

