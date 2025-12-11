import React from "react";
import Result from "./Result.jsx";
import Notification from "./Notification.jsx";
import UpperRow from "./Upperrow.jsx";
import Filter from "./Filter.jsx";
import NumberGrid from "./Numbergrid.jsx";
import Leftcol from "./Leftcol.jsx";
import RightCol from "./Rightcol.jsx";
import BottomRow from "./Bottomrow.jsx";
import { useAuth } from "./context/Authcontext.jsx"; // 🔁 adjust path if needed

function Home() {

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

      <div className="w-full h-[6vh] sm:h-[7vh] md:h-[8vh] lg:h-[9vh] xl:h-[7vh] bg-teal-500 flex items-center justify-between px-[0.1vw] py-[0.1vw] portrait:h-[3vh]">

        {/* LEFT - AdvanceDraw Button */}
        <div className="w-[20%] h-[100%] lg:w-[20%] bg-blue-500 flex items-center justify-center p-0">
          <button className="bg-red-600 text-white font-bold w-[100%] h-[100%]   text-[1.9vw] sm:text-[2vw] md:text-[2.1vw] hover:bg-red-700 active:scale-[0.98] transition potrait: text-[2.5vw] portrait:px-[3vw] portrait:py-[1vw]">
            AdvanceDraw
          </button>
        </div>

        {/* MIDDLE - Transaction + Barcode + Buy */}
        <div className="w-[65%] h-[100%] lg:w-[65%] bg-purple-600 overflow-hidden flex items-center justify-center gap-[2vw] p-2">

          {/* Last Transaction */}
          <div className="flex flex-col justify-center items-start text-white font-semibold leading-tight min-w-[90px] ">
            <span className="text-[0.9vw] sm:text-[1vw] md:text-[1.1vw] portrait: text-[2.5vw]">
              Last Transaction:
            </span>
            <span className="text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] font-bold portrait: text-[2.5vw]">
              #22081690601 Pt(40)
            </span>
          </div>

          {/* Barcode Input */}
          <input
            type="text"
            placeholder="Barcode"
            className="flex-1 w-[3vw] text-center text-gray-700 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] font-medium border-2 border-black rounded-md py-[0.3vw] px-[0.6vw] bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 potrait: text-[2.5vw] "
          />

          {/* Buy Button */}
          <button className="bg-red-600 text-white font-bold  px-[4vw] py-[4vw] text-[0.9vw] sm:text-[1vw] md:text-[1.1vw] hover:bg-red-700 active:scale-[0.98] transition whitespace-nowrap potrait: text-[2.5vw] ">
            Buy
          </button>
        </div>

        {/* RIGHT - Result Boxes */}
        <div className="flex items-center justify-center w-[15%] lg:w-[15%] bg-teal-500 flex items-center justify-center p-0  gap-[0.4vw]">
          <div className="flex-1 bg-white  flex items-center justify-center font-bold text-gray-900 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] h-[5vh] portrait: h-[2.4vh] potrait: text-[3vw]">
            0
          </div>
          <div className="flex-1 bg-white  flex items-center justify-center font-bold text-gray-900 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] h-[5vh]  portrait: h-[2.4vh] potrait: text-[3vw] ">
            0
          </div>
        </div>
      </div>



    </div>
  );
}

export default Home;
