import React from "react";
import Result from "./Result.jsx";
import Notification from "./Notification.jsx";
import UpperRow from "./Upperrow.jsx";
import Filter from "./Filter.jsx";
import NumberGrid from "./Numbergrid.jsx";
import Leftcol from "./Leftcol.jsx";
import RightCol from "./Rightcol.jsx";
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

      <div className="w-full bg-teal-500 flex items-center justify-between px-[0.5vw] py-[0.3vw] h-[7vh] min-h-[55px]">

  {/* LEFT - AdvanceDraw Button */}
  <div className="flex items-center justify-center flex-[1] min-w-[90px]">
    <button className="bg-red-600 text-white font-bold rounded-md px-[1.5vw] py-[0.4vw] text-[0.9vw] sm:text-[1vw] md:text-[1.1vw] hover:bg-red-700 active:scale-[0.98] transition">
      AdvanceDraw
    </button>
  </div>

  {/* MIDDLE - Transaction + Barcode + Buy */}
  <div className="flex items-center justify-center flex-[3] gap-[1vw] min-w-[300px]">

    {/* Last Transaction */}
    <div className="flex flex-col justify-center items-start text-white font-semibold leading-tight min-w-[120px]">
      <span className="text-[0.9vw] sm:text-[1vw] md:text-[1.1vw]">
        Last Transaction:
      </span>
      <span className="text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] font-bold">
        #22081690601 Pt(40)
      </span>
    </div>

    {/* Barcode Input */}
    <input
      type="text"
      placeholder="Barcode"
      className="flex-1 max-w-[200px] text-center text-gray-700 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] font-medium border-2 border-black rounded-md py-[0.3vw] px-[0.6vw] bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
    />

    {/* Buy Button */}
    <button className="bg-red-600 text-white font-bold rounded-md px-[1.5vw] py-[0.4vw] text-[0.9vw] sm:text-[1vw] md:text-[1.1vw] hover:bg-red-700 active:scale-[0.98] transition whitespace-nowrap">
      Buy
    </button>
  </div>

  {/* RIGHT - Result Boxes */}
  <div className="flex items-center justify-center flex-[1] gap-[0.4vw] min-w-[80px]">
    <div className="flex-1 bg-white rounded-lg flex items-center justify-center font-bold text-gray-900 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] h-[4vh] min-h-[35px]">
      0
    </div>
    <div className="flex-1 bg-white rounded-lg flex items-center justify-center font-bold text-gray-900 text-[1vw] sm:text-[1.1vw] md:text-[1.2vw] h-[4vh] min-h-[35px]">
      0
    </div>
  </div>
</div>



    </div>
  );
}

export default Home;
