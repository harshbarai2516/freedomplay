import React, { useMemo , useState, useEffect} from "react";
import Result from "./Result.jsx";
import Notification from "./Notification.jsx";
import UpperRow from "./Upperrow.jsx";
import Filter from "./Filter.jsx";
import NumberGrid from "./Numbergrid.jsx";
import Leftcol from "./Leftcol.jsx";
import RightCol from "./Rightcol.jsx";
import BottomRow from "./Bottomrow.jsx";
import { useAuth } from "./context/Authcontext.jsx";
import Advancedraw from "./Advancedraw.jsx"; // ✅ new import

function Home() {

  useEffect(() => {
    fetchTimeData();
  }, []);

  const [showAdvanceDraw, setShowAdvanceDraw] = useState(false);
    // Time API state
  const [timeData, setTimeData] = useState({
    currentTime: "10:35:02",
    currentTime12: "10:35:02",
    drawTime12: "10:30",
    drawTime: "10:40 am",
    closeTime: "10:45 am",
    remainingTime: "09:58",
    pointTotal: "17080",
  });

  const {
    mainRange,
    setMainRange,
    selectedRange,
    setSelectedRange,
    checkedRanges,
    setCheckedRanges,
    sharedGridData,
    handleSharedUpdate,
    startNumber,
  } = useAuth();

  const handleSelectRange = (range) => setSelectedRange(range);

  // ✅ Compute totalQty and totalAmt from all ranges
  const { totalQty, totalAmt } = useMemo(() => {
    let qty = 0;
    let amt = 0;
    Object.values(sharedGridData).forEach((range) => {
      qty += range.qty || 0;
      amt += range.amt || 0;
    });
    return { totalQty: qty, totalAmt: amt };
  }, [sharedGridData]);

    function barcode() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);
    const datePrefix = year + month + day;
    const randomSuffix = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const barcodeValue = datePrefix + randomSuffix;

    // Store barcodeValue in localStorage
    localStorage.setItem("barcodeValue", barcodeValue);

    return barcodeValue;
  }

    const fetchTimeData = async () => {
    try {
      const response = await fetch(`https://thegold.us/api/time/getTime`);
      const data = await response.json();

      if (data) {
        const newTimeData = {
          currentDate: data.current_date || timeData.currentDate,
          currentTime: data.current_time_24h || timeData.currentTime,
          currentTime12: data.current_time_12h || timeData.currentTime12,
          drawTime12: data.draw_time_12h || timeData.drawTime12,
          drawTime: data.next_draw_time_12h || timeData.drawTime,
          nextdrawTime: data.next_draw_time_24h || data.closeTime || timeData.closeTime,
          remainingTime: data.remaining_time || timeData.remainingTime,
          pointTotal:data.point_total || data.pointTotal || timeData.pointTotal,
        };

        setTimeData(newTimeData);

        // Store drawTime in sesionStorage
        sessionStorage.setItem("drawTime", newTimeData.drawTime);
        sessionStorage.setItem("drawTime24", newTimeData.prevDraw);
        sessionStorage.setItem("nextdrawTime", newTimeData.nextdrawTime);
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  return (
    <div className="h-portrait-60 h-landscape-full flex flex-col w-full">
      {/* Section 1 */}
      <div className="h-[7%] w-full bg-blue-600 flex items-center justify-center p-0 portrait:h-[10%]">
        <Result mainRange={mainRange} />
      </div>

      {/* Section 2 */}
      <div className="h-[4%] w-full bg-red-600 flex items-center justify-center p-0">
        <Notification />
      </div>

      {/* Section 3 */}
      <div className="h-[6%] w-full bg-green-600 flex items-center justify-center p-0">
        <UpperRow />
      </div>

      {/* Section 4 */}
      <div className="h-[6%] w-full bg-yellow-500 flex items-center justify-center p-0 portrait:h-[15%]">
        <Filter onMainRangeChange={setMainRange} />
      </div>

      {/* Section 5 */}
      <div className="h-[100%] w-full flex flex-row">
        {/* Left Column */}
        <div className="w-[20%] lg:w-[20%] bg-blue-500 flex items-center justify-center p-0">
          <Leftcol
            mainRange={mainRange}
            selectedRange={selectedRange}
            onSelectRange={handleSelectRange}
            onCheckedRangesChange={setCheckedRanges}
          />
        </div>

        {/* Center */}
        <div className="w-[65%] lg:w-[65%] bg-purple-600 overflow-hidden">
          <NumberGrid
            startNumber={startNumber}
            activeRange={selectedRange}
            checkedRanges={checkedRanges}
            sharedGridData={sharedGridData}
            onSharedUpdate={handleSharedUpdate}
          />
        </div>

        {/* Right Column */}
        <div className="w-[15%] lg:w-[15%] bg-teal-500 flex items-center justify-center p-0">
          <RightCol />
        </div>
      </div>

      {/* ✅ Bottom Row with Totals */}
      <div className="w-full h-[6vh] sm:h-[7vh] md:h-[8vh] lg:h-[9vh] xl:h-[7vh] bg-teal-500 flex items-center justify-between px-[0.1vw] py-[0.1vw] portrait:h-[3vh]">
        {/* LEFT - AdvanceDraw Button */}
        <div className="w-[20%] h-[100%] lg:w-[20%] bg-blue-500 flex items-center justify-center p-0">
          <button
            onClick={() => setShowAdvanceDraw(true)}
            className="bg-red-600 text-white font-bold w-[100%] h-[100%] text-[1.9vw] sm:text-[2vw] md:text-[2.1vw] hover:bg-red-700 active:scale-[0.98] transition"
          >
            AdvanceDraw
          </button>
        </div>
        <Advancedraw isOpen={showAdvanceDraw} onClose={() => setShowAdvanceDraw(false)} />

        {/* MIDDLE - Transaction + Barcode + Buy */}
        <div className="w-[65%] h-[100%] lg:w-[65%] bg-purple-600 overflow-hidden flex items-center justify-center gap-[2vw] p-2">
          <div className="flex flex-col justify-center items-start text-white font-semibold leading-tight min-w-[90px] ">
            <span className="text-[0.9vw] sm:text-[1vw] md:text-[1.1vw]">
              Last Transaction:
            </span>
            <span className="text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] font-bold">
              #22081690601 Pt(40)
            </span>
          </div>

          <input
            type="text"
            placeholder="Barcode"
            className="flex-1 w-[3vw] text-center text-gray-700 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] font-medium border-2 border-black rounded-md py-[0.3vw] px-[0.6vw] bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button className="bg-red-600 text-white font-bold px-[4vw] py-[4vw] text-[0.9vw] sm:text-[1vw] md:text-[1.1vw] hover:bg-red-700 active:scale-[0.98] transition whitespace-nowrap">
            Buy
          </button>
        </div>

        {/* ✅ RIGHT - Live Totals */}
        <div className="flex items-center justify-center w-[15%] lg:w-[15%] bg-teal-500 gap-[0.4vw]">
          <div className="flex-1 bg-white flex items-center justify-center font-bold text-gray-900 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] sm:h-[4vh] md:h-[4vh] lg:h-[8vh] xl:h-[5vh] portrait:h-[1.8vh]">
            {totalQty}
          </div>
          <div className="flex-1 bg-white flex items-center justify-center font-bold text-gray-900 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] sm:h-[4vh] md:h-[4vh] lg:h-[8vh] xl:h-[5vh] portrait:h-[1.8vh]">
            {totalAmt}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
