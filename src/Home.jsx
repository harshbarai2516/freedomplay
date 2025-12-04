import { useState, useMemo, useEffect } from 'react'
import Result from './Result.jsx';
import Notification from './Notification.jsx';
import UpperRow from './Upperrow.jsx';
import Filter from './Filter.jsx';
import NumberGrid from './Numbergrid.jsx';
import Leftcol from './Leftcol.jsx';
import RightCol from './Rightcol.jsx';

function Home() {
    // ✅ Default to 00–09 main range (first series)
    const [mainRange, setMainRange] = useState("00-09");

    // ✅ Selected subrange inside that series
    const [selectedRange, setSelectedRange] = useState("0000-0099");

    // ✅ When mainRange changes → update Leftcol and NumberGrid automatically
    useEffect(() => {
        const [start] = mainRange.split("-");
        const base = parseInt(start, 10) * 100;
        setSelectedRange(`${String(base).padStart(4, "0")}-${String(base + 99).padStart(4, "0")}`);
    }, [mainRange]);

    const handleSelectRange = (range) => setSelectedRange(range);

    // ✅ Extract numeric start from range like "6000-6099"
    const startNumber = useMemo(() => {
        if (!selectedRange) return 0;
        const [low] = selectedRange.split("-");
        return parseInt(low, 10) || 0;
    }, [selectedRange]);

    return (
        <div className="h-portrait-60 h-landscape-full flex flex-col w-full">

            {/* Section 1: 15% - Blue */}
            <div className="h-[7%] w-full bg-blue-600 flex items-center justify-center p-0">
                <Result />
            </div>

            {/* Section 2: 5% - Red */}
            <div className="h-[4%] w-full bg-red-600 flex items-center justify-center p-0">
                <Notification />
            </div>

            {/* Section 3: 10% - Green */}
            <div className="h-[6%] w-full bg-green-600 flex items-center justify-center p-0">
                <UpperRow />
            </div>

            {/* Section 4: 10% - Yellow */}
            <div className="h-[6%] w-full bg-yellow-500 flex items-center justify-center p-0">
                <Filter onMainRangeChange={setMainRange} />
            </div>

            {/* Section 5: 50% - Divided into 3 horizontal parts */}
            <div className="h-[100%] w-full flex flex-row">
                {/* Section 5.1: Left - Blue */}
                <div className="w-[20%] lg:w-[20%] bg-blue-500 flex items-center justify-center p-0">
                    <Leftcol
                        mainRange={mainRange}
                        selectedRange={selectedRange}
                        onSelectRange={handleSelectRange}
                    />
                </div>

                {/* Section 5.2: 60% - Center - Purple */}
                <div className="w-[65%] lg:w-[65%] bg-purple-600 overflow-hidden ">
                    <NumberGrid startNumber={startNumber} />
                </div>

                {/* Section 5.3: Right - Teal */}
                <div className="w-[15%] lg:w-[15%] bg-teal-500 flex items-center justify-center p-0">
                    <RightCol />
                </div>
            </div>

            {/* Section 6: 10% - Orange */}
            <div className="h-[7%] w-full bg-teal-500 flex flex-row">
                <div className="w-[20%] lg:w-[20%] bg-teal-500 flex items-center justify-center p-0">
                    <div className="flex w-full h-full gap-[0.3vw] items-center justify-center p-2">
                        <div className="flex-1 bg-white rounded-lg flex items-center justify-center font-bold text-pink-900 text-sm sm:text-base lg:text-lg h-[80%] p-4">
                            Advance Draw
                        </div>
                    </div>
                </div>

                {/* Section 5.2: 60% - Center - Purple */}
                <div className="w-[65%] lg:w-[65%] bg-teal-500 flex items-center justify-center p-[0.4vw]">
                    <div className="flex w-full h-full items-center justify-between gap-[0.6vw] px-[0.6vw]">
                        {/* Left Text */}
                        <div className="flex flex-col justify-center text-white font-semibold leading-tight">
                            <span className="text-[0.8rem] sm:text-sm md:text-base lg:text-lg">
                                Last Transaction:
                            </span>
                            <span className="text-[0.75rem] sm:text-sm md:text-base font-bold">
                                #22081690601 Pt(40)
                            </span>
                        </div>

                        {/* Middle Input */}
                        <input
                            type="text"
                            placeholder="Barcode"
                            className="flex-1 max-w-[40%] text-center text-gray-700 text-sm sm:text-base font-medium border-2 border-black rounded-md py-[0.4vw] px-[0.6vw] bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />

                        {/* Right Button */}
                        <button className="bg-red-600 text-white font-bold rounded-md px-[8vw] py-[0.5vw] text-sm sm:text-base hover:bg-red-700 active:scale-[0.98] transition">
                            Buy
                        </button>
                    </div>
                </div>


                {/* Section 5.3: Right - Teal */}
                <div className="w-[15%] lg:w-[15%] bg-teal-500 flex items-center justify-center p-1">
                    <div className="flex w-full h-full gap-[0.3vw] items-center justify-center">
                        {/* Left Box */}
                        <div className="flex-1 bg-white rounded-lg flex items-center justify-center font-bold text-gray-900 text-sm sm:text-base lg:text-lg h-[80%]">
                            0
                        </div>

                        {/* Right Box */}
                        <div className="flex-1 bg-white rounded-lg flex items-center justify-center font-bold text-gray-900 text-sm sm:text-base lg:text-lg h-[80%]">
                            0
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;


