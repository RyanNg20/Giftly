import { useWeb3React } from "@web3-react/core";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { Inter, Josefin_Sans } from "@next/font/google";
import { formatEtherscanLink, formatEtherToNearestWeiOrEth, shortenTxHash } from "../lib/utils";
import EthereumLogo from "../images/ethereum.svg";

const interFont = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
});

const josefinSansFont = Josefin_Sans({
  variable: "--josefin-sans-font",
  subsets: ["latin"],
});

const Present = ({ title, message, amounts, recipient, txHash, chainId }) => {
  const josefinSansFont = ""; // You might want to add the font classname here
  const interFont = ""; // You might want to add the font classname here

  return (
    <div className="max-w-md mx-auto p-20 bg-white bg-opacity-10 rounded-lg shadow-lg text-white text-center">
      <div className="flex items-center">
        <h1 className={`${josefinSansFont} text-3xl font-bold`}>Hi {title}</h1>
      </div>
      <p className={`${interFont} text-xl mt-6 leading-relaxed`}>{message}</p>
      <div className="flex justify-between items-center mt-8">
        <div className={`${interFont} font-semibold text-sm border rounded-lg px-4 py-2 flex items-center`}>
          <Image src={EthereumLogo} alt="Ethereum logo" height={16} width={16} className="mr-2" />
          <span>{formatEtherToNearestWeiOrEth(amounts[0]).toUpperCase()}</span>
        </div>
      </div>
      <div className="mt-8">
        <a
          href={formatEtherscanLink(txHash, chainId)}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-red-500 hover:text-red-600 transition-colors"
        >
          View on Etherscan
        </a>
      </div>
      <div className="mt-8">
        <Link legacyBehavior href="../" passHref>
          <a className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md transition-colors">
            Send Gift
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Present;