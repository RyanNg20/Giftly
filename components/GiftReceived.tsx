import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";

import Image from "next/image";
import Gift from "../images/gift.svg"
import { Inter } from "@next/font/google";

import Confetti from "react-dom-confetti";

// import Giftlyfooter from "../components/footer";

// import GiftlyTop from "../components/giftlytop";

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
});

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 100,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

import { Josefin_Sans } from "@next/font/google";

export const josefinSans = Josefin_Sans({
  variable: "--josefin-sans-font",
  subsets: ["latin"],
});

// const gradientBackground = {
//   background: 'radial-gradient(120.26% 120.26% at 49.18% -7.33%, #453B62 0%, #423737 100%)',

// };
function GiftReceived({ address, setAddress, onSubmitAddress }) {
  const [confettiActive, setConfettiActive] = useState(false);
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleButtonClick = () => {
    onSubmitAddress();
    setConfettiActive(true);
    // sleep(500)

    // setConfettiActive(false);
  };
  return (
    <div className="w-[400px] flex flex-col items-center justify-center">
      <Image src={Gift} alt="picture of a gift" height={56}/>
      <h2 className={`${inter.className} font-semibold text-white text-[20px] mt-[20px]`}>
        You have received a gift!
      </h2>
      <h3 className={`${inter.className} font-regular text-white text-[14px]`}>
        Enter your gifting address to unlock
      </h3>
      <div
        className="flex flex-row border-1 border-white border rounded-[16px] h-[49px] justify-between items-center mt-[36px] mb-[24px] text-white pl-[14px] pr-[2px] text-[16px]"
      >
        <input
          type="text"
          value={address}
          placeholder="Enter Wallet Address"
          onChange={(e) => setAddress(e.target.value)}
          className="focus:outline-none bg-[rgba(0,0,0,0)] placeholder-[rgba(255,255,255,0.5)]"
        />
        <button
          className="ml-2 bg-gradient-to-r from-[#C572E2] to-[#6AC3D7] p-2 rounded-[14px] text-white w-[100px] h-[calc(100%-4px)] text-[16px] font-semibold"
          onClick={handleButtonClick}
        >
          Open
        </button>
      </div>
      <Confetti active={confettiActive} config={config} />
    {/* <Giftlyfooter /> */}
  </div>
  );
}

export default GiftReceived;
