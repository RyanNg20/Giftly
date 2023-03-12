import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Ethereum from "../images/ethereum.svg"
import { Inter } from "@next/font/google";
import { formatEtherscanLink } from "../lib/utils";

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
import { formatEtherToNearestWeiOrEth, shortenTxHash } from "../lib/utils";
import { ethers } from "ethers";

export const josefinSans = Josefin_Sans({
  variable: "--josefin-sans-font",
  subsets: ["latin"],
});

// const gradientBackground = {
//   background: 'radial-gradient(120.26% 120.26% at 49.18% -7.33%, #453B62 0%, #423737 100%)',

// };
function Present({ title, message, amounts, recipient, txHash, chainId }) {
  console.log("message", message);
  console.log("title", title);

  return (
    <div className={`${inter.className} text-white`}>
      <h1 className={`${inter.className} font-semibold text-[24px]`}>
        {/* Hello {shortenTxHash(recipient)}, */}
        Hello {title},
      </h1>
      <p className={inter.className}>
        {message}
      </p>
      <div className="text-[14px] font-semibold mt-4">
        <a
          href={formatEtherscanLink(txHash, chainId)}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          View Transaction
        </a>
        {' '}
        or
        {' '}
        <a className="hover:underline" href="../" target="_blank"rel="noreferrer">Send Gift!</a>
      </div>
      <div className="font-semibold text-[12px] border-solid border-[1px] flex flex-row items-center justify-center rounded-md pt-2 pb-2 pr-3 pl-3 w-[fit-content] mt-2">
        <Image
          src={Ethereum}
          alt="Ethereum logo"
          height={16}
          className="mr-2"
        />
        {formatEtherToNearestWeiOrEth(amounts[0]).toUpperCase()}
      </div>
    </div>
  );
}

export default Present;
