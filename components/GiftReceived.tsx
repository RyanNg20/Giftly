import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";

import Image from "next/image";
import Gift from "../images/gift.svg"
import { Inter } from "@next/font/google";

import Confetti from "react-dom-confetti";
import { toast } from "react-hot-toast";

// import Giftlyfooter from "../components/footer";

// import GiftlyTop from "../components/giftlytop";

import useETHBalance from "../hooks/useETHBalance";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { injected } from "../connectors";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { isValidAddress, getEthAddress } from "../lib/utils";

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
  const { library, account, activate } = useWeb3React();
  const { data: balance } = useETHBalance(account);
  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();
  function connect() {
    if (!account) {
      if (isMetaMaskInstalled) {
        const toastId = toast.loading("Connecting to MetaMask...");
        activate(injected, undefined, true)
          .catch((error) => {
            // ignore the error if it's a user rejected request
            if (error instanceof UserRejectedRequestError) {
            } else {
              toast.error("Error connecting to MetaMask");
            }
          })
          .finally(() => {
            toast.dismiss(toastId);
          });
      } else {
        startOnboarding();
      }
      return;
    }
  }
  const handleButtonClick = () => {
    onSubmitAddress();
    // setConfettiActive(true);
    // sleep(500)

    // setConfettiActive(false);
  };
  console.log(account)
  return (
    <div className="w-[400px] flex flex-col items-center justify-center">
      <Image src={Gift} alt="picture of a gift" height={56} />
      <h2 className={`${inter.className} font-semibold text-white text-2xl mt-6`}>
        You have received a gift!
      </h2>
      <h3 className={`${inter.className} font-normal text-white text-base mb-8`}>
        Enter your gifting address to unlock
      </h3>
      {/* <div className="flex flex-row border rounded-xl h-12 justify-between items-center mb-8  pl-4 pr-2 text-lg"> */}
      {/* <input
      type="text"
      value={address}
      placeholder="Enter Wallet Address"
      onChange={(e) => setAddress(e.target.value)}
      className="focus:outline-none bg-transparent placeholder-white opacity-50"
    /> */}
      <button
        className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl text-white
      w-44 h-full text-lg font-semibold"
        onClick={() => {
          if (account === undefined) {
            connect();
          }
          setAddress(account);
          handleButtonClick();
          setTimeout(() => {
            setAddress(account);
            onSubmitAddress();
          }, 500);
        }}
      >
        {account ? "Open" : "Connect"}
      </button>
      {/* <button
      className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl text-white w-32 h-full text-lg font-semibold"
      onClick={handleButtonClick}
    >
      Open
    </button> */}
      {/* </div> */}
      <Confetti active={confettiActive} config={config} />
      {/* <Giftlyfooter /> */}
    </div >

  );
}

export default GiftReceived;
