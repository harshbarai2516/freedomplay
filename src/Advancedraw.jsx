import React, { useState, useEffect, useMemo, useCallback } from "react";

const Advancedraw = ({ isOpen, onClose, onSlotsSelected }) => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [filteredTimes, setFilteredTimes] = useState([]);
    const [remainingDraws, setRemainingDraws] = useState(0);
    const [nextDrawIn, setNextDrawIn] = useState("--:--");

    // Update current time every second for countdown accuracy
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // every second
        return () => clearInterval(interval);
    }, []);

    // Generate all possible times (09:00 am → 10:30 pm)
    const allTimes = useMemo(() => {
        const times = [];
        for (let h = 9; h <= 22; h++) {
            for (let m = 0; m < 60; m += 15) {
                if (h === 22 && m > 30) break;
                const hour = h % 12 || 12;
                const minute = m.toString().padStart(2, "0");
                const period = h < 12 ? "am" : "pm";
                const time12hr = `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
                const time24hr = `${h.toString().padStart(2, "0")}:${minute}`;
                times.push({
                    time12hr,
                    time24hr,
                    hour: h,
                    minute: m,
                    isPast: false,
                });
            }
        }
        return times;
    }, []);

    // ✅ Function to get Date object for a draw time (today)
    const getTimeAsDate = useCallback((time) => {
        const [t, period] = time.time12hr.split(" ");
        let [hour, minute] = t.split(":").map(Number);
        if (period === "pm" && hour !== 12) hour += 12;
        if (period === "am" && hour === 12) hour = 0;
        const now = new Date();
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            minute,
            0,
            0
        );
    }, []);

    // ✅ Filter upcoming times + mark past times
    useEffect(() => {
        if (!isOpen) return;
        const now = currentTime;
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        const filtered = allTimes
            .filter((time) => {
                if (time.hour > currentHour) return true;
                if (time.hour === currentHour && time.minute > currentMinute) return true;
                return false;
            })
            .map((time) => ({
                ...time,
                isPast:
                    time.hour < currentHour ||
                    (time.hour === currentHour && time.minute <= currentMinute),
            }));

        setFilteredTimes(filtered);
    }, [currentTime, isOpen, allTimes]);

    // ✅ Calculate Remaining Draws and Next Draw Countdown
    useEffect(() => {
        const now = currentTime;
        const upcoming = allTimes
            .map((t) => getTimeAsDate(t))
            .find((t) => t > now);

        if (upcoming) {
            // Remaining draws
            const drawsLeft = allTimes.filter((t) => getTimeAsDate(t) >= upcoming)
                .length;
            setRemainingDraws(drawsLeft);

            // Countdown to next draw
            const diffMs = upcoming - now;
            const mins = Math.floor(diffMs / 60000);
            const secs = Math.floor((diffMs % 60000) / 1000);
            setNextDrawIn(
                `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
            );
        } else {
            setRemainingDraws(0);
            setNextDrawIn("--:--");
        }
    }, [currentTime, allTimes, getTimeAsDate]);

    // ✅ Toggle selection logic
    const toggleSelect = useCallback((time) => {
        if (time.isPast) return; // Don't allow selecting past times
        setSelectedTimes((prev) =>
            prev.includes(time.time12hr)
                ? prev.filter((t) => t !== time.time12hr)
                : [...prev, time.time12hr]
        );
    }, []);

    const handleSelectAll = () => {
        const futureTimes = filteredTimes
            .filter((time) => !time.isPast)
            .map((time) => time.time12hr);
        setSelectedTimes(futureTimes);
    };

    const handleOkay = () => {
        if (onSlotsSelected) onSlotsSelected(selectedTimes);

        const time24hArray = selectedTimes
            .map((time12hr) => {
                const timeObj = allTimes.find((t) => t.time12hr === time12hr);
                return timeObj ? timeObj.time24hr : "";
            })
            .filter(Boolean);

        localStorage.setItem("selectedSlotsString", selectedTimes.join(","));
        localStorage.setItem("selectedSlotsString24h", time24hArray.join(","));
        onClose();
    };

    const handleClear = () => {
        setSelectedTimes([]);
        localStorage.removeItem("selectedSlotsString");
        localStorage.removeItem("selectedSlotsString24h");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white w-full max-w-[800px] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
                {/* Header */}
                <div className="bg-blue-800 p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg sm:text-2xl font-bold text-white w-full text-center">
                            ADVANCE DRAW
                        </h2>
                        <button
                            onClick={onClose}
                            className="bg-red-600 text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-red-700 text-lg sm:text-xl -mt-1"
                        >
                            ✕
                        </button>
                    </div>

                    {/* ✅ Dynamic Remaining Draw & Countdown */}
                    <div className="flex flex-wrap justify-between text-xs sm:text-sm text-white/90">
                        <p className="mb-1 sm:mb-0">
                            Remaining Draw: <span className="font-bold">{remainingDraws}</span>
                        </p>
                        <p>
                            Next Draw in: <span className="font-bold">{nextDrawIn}</span>
                        </p>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="p-3 sm:p-4 border-b">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <input
                            type="number"
                            placeholder="Enter number of slots"
                            min="1"
                            className="flex-1 border border-gray-400 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none min-h-[40px]"
                            onChange={(e) => {
                                const count = parseInt(e.target.value);
                                if (isNaN(count) || count <= 0) {
                                    setSelectedTimes([]);
                                    return;
                                }

                                // Get first 'count' future slots
                                const futureSlots = filteredTimes
                                    .filter((t) => !t.isPast)
                                    .slice(0, count)
                                    .map((t) => t.time12hr);

                                setSelectedTimes(futureSlots);
                            }}
                        />


                        <div className="flex gap-2">
                            <button
                                onClick={handleSelectAll}
                                className="bg-amber-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-amber-800 text-sm sm:text-base whitespace-nowrap flex-1 min-h-[40px]"
                            >
                                Select All
                            </button>
                            <button
                                onClick={handleOkay}
                                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base whitespace-nowrap flex-1 min-h-[40px]"
                            >
                                OKAY
                            </button>
                            <button
                                onClick={handleClear}
                                className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-600 text-sm sm:text-base whitespace-nowrap flex-1 min-h-[40px]"
                            >
                                CLEAR
                            </button>
                        </div>
                    </div>
                </div>

                {/* Times Grid */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                    <div className="mb-3 text-sm text-gray-600">
                        <p>
                            Current Time:{" "}
                            {currentTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </p>
                        <p>Selected: {selectedTimes.length} slot(s)</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {filteredTimes.map((time) => (
                            <button
                                key={time.time12hr}
                                onClick={() => toggleSelect(time)}
                                disabled={time.isPast}
                                className={`
                  text-sm font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200
                  ${time.isPast
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : selectedTimes.includes(time.time12hr)
                                            ? "bg-amber-700 text-white transform scale-[0.98] shadow-md"
                                            : "bg-amber-500 text-white hover:bg-amber-600 hover:shadow"
                                    }
                  ${selectedTimes.includes(time.time12hr)
                                        ? "border-2 border-amber-900"
                                        : ""
                                    }
                `}
                            >
                                {time.time12hr}
                                {time.isPast && (
                                    <span className="block text-xs text-red-500 mt-1">Past</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {filteredTimes.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p className="text-lg">No more draws available for today</p>
                            <p className="text-sm mt-2">Come back tomorrow!</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t p-3 sm:p-4 bg-gray-50">
                    <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600">
                        <div className="mb-2 sm:mb-0">
                            <span className="font-semibold">Instructions:</span> Select future draw times
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-gray-300"></div>
                                <span>Past</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-amber-500"></div>
                                <span>Available</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-amber-700"></div>
                                <span>Selected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advancedraw;
