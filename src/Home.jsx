import { useState } from 'react'
import NumberGrid from './Numbergrid.jsx';

function Home() {
    return (
        <div className="h-[60vh] lg:h-screen flex flex-col w-full">
            {/* Section 1: 15% - Blue */}
            <div className="h-[7%] w-full bg-blue-600 flex items-center justify-center p-4">
                <span className="text-white font-bold text-sm lg:text-lg text-center">Section 1 (7%)</span>
            </div>

            {/* Section 2: 5% - Red */}
            <div className="h-[4%] w-full bg-red-600 flex items-center justify-center p-4">
                <span className="text-white font-bold text-xs lg:text-base text-center">Section 2 (4%)</span>
            </div>

            {/* Section 3: 10% - Green */}
            <div className="h-[6%] w-full bg-green-600 flex items-center justify-center p-4">
                <span className="text-white font-bold text-xs lg:text-base text-center">Section 3 (6%)</span>
            </div>

            {/* Section 4: 10% - Yellow */}
            <div className="h-[6%] w-full bg-yellow-500 flex items-center justify-center p-4">
                <span className="text-white font-bold text-xs lg:text-base text-center">Section 4 (6%)</span>
            </div>

            {/* Section 5: 50% - Divided into 3 horizontal parts */}
            <div className="h-[70%] w-full flex flex-row">
                {/* Section 5.1: Left - Blue */}
                <div className="w-[18%] lg:w-[18%] bg-blue-500 flex items-center justify-center p-4">
                    <span className="text-white font-bold text-xs lg:text-base text-center">Section 5.1</span>
                </div>

                {/* Section 5.2: 60% - Center - Purple */}
                    <div className="w-[65%] lg:w-[65%] bg-purple-600 flex items-stretch justify-center overflow-hidden">
                    <div className="w-full h-full">
                        <NumberGrid />
                    </div>
                </div>

                {/* Section 5.3: Right - Teal */}
                <div className="w-[17%] lg:w-[17%] bg-teal-500 flex items-center justify-center p-4">
                    <span className="text-white font-bold text-xs lg:text-base text-center">
                        Set
                    </span>
                </div>
            </div>

            {/* Section 6: 10% - Orange */}
            <div className="h-[7%] w-full bg-orange-600 flex items-center justify-center p-4">
                <span className="text-white font-bold text-xs lg:text-base text-center">Section 6 (7%)</span>
            </div>
        </div>
    );
}

export default Home;


