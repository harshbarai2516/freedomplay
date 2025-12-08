import React from "react";

export default function Notification() {
  return (
    <div className="w-full bg-[#0d0d0e] text-white text-center font-bold  box-border">
      {/* Scrolling marquee text */}
      <marquee
        behavior="scroll"
        direction="left"
        className="block text-[1.2vw] sm:text-[1.4vw] md:text-[1.2vw] lg:text-[1vw] xl:text-[0.9vw] py-[1vw] sm:py-[0.8vw] md:py-[0.6vw] rounded-[0.6vw] portrait:text-[2.5vw] "
      >
        Welcome to the Main Star!  Welcome to the Main Star!  Welcome to the Main Star!
      </marquee>
    </div>
  );
}
