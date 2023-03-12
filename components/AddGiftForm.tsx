import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import logooo from "./logo.png";
import { BigNumber, ethers } from "ethers";
import Account from "./Account";
import useETHBalance from "../hooks/useETHBalance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { generateRandomString, shortenTxHash, wait } from "../lib/utils";
import { encLink } from "../lib/crypto";
import axios from "axios";
import Button from "./button";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { inter, kalam } from "./fonts";
import Ethereum from "../images/ethereum.svg";
import { injected } from "../connectors";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { config } from "../lib/config";
import { isValidAddress, getEthAddress } from "../lib/utils";

// const gradientBackground = {
//   background: 'radial-gradient(120.26% 120.26% at 49.18% -7.33%, #453B62 0%, #423737 100%)',

// };
function AddGiftForm({ address, reward, setReward, onSubmitGift }) {
  const { library, account, chainId, activate } = useWeb3React();
  const { data: balance } = useETHBalance(account);
  const [rewardInput, setRewardInput] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  getEthAddress(address).then((holderAddress) => {
    console.log(holderAddress)
    address = holderAddress
  }).catch((error) => {
    // console.log(error)
    toast.error("Please input a correct address - or another error :(");

    return false;
  });

  const handleSubmit = async (rewardInput) => {
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
    if (chainId !== 1 && chainId !== 5) {
      toast.error("Please switch to the Ethereum Network");
      return;
    }
    const readyToSendReward = ethers.utils.parseEther(rewardInput);
    console.log(readyToSendReward.toString(), balance.toString());
    if (readyToSendReward.gt(balance)) {
      toast.error("Insufficient funds");
      return;
    }
    console.log(account, library, balance);
    try {
      const args = {
        to: address,
        value: readyToSendReward,
      };
      // todo: add a try catch
      console.log("Submitting tx:", args);
      const tx = await library.getSigner().sendTransaction(args);
      console.log("Transaction submitted!");
      const loadingId = toast.loading("Boxing gift...");
      await tx.wait();

      toast.dismiss(loadingId);
      const wrapLoading = toast.loading("Wrapping gift...");

      const params = {
        txHash: tx.hash,
        chainId: chainId,
        amounts: [ethers.utils.parseEther(rewardInput).toString()],
        tokens: ["0x0000000000000000000000000000000000000000"],
        recipient: address.toLowerCase(),
        animation: "default",
        previewImage: "https://cdn.vox-cdn.com/uploads/chorus_image/image/44294754/grumpy_cat.0.0.jpg",
        title: title,
        message: message,
      };

      toast.dismiss(wrapLoading);
      const encryptedLoading = toast.loading("Adding the final touches...");
      await wait(2000);
      const encryptedLink = encLink(params);
      const randomString = generateRandomString(20);
      axios.post(config.baseUrl + "/api/addGift", {
        encryptedParams: encryptedLink,
        shortenName: randomString,
        animation: params.animation,
        previewImage: params.previewImage,
      });
      toast.dismiss(encryptedLoading);
      toast.success("Gift is ready!");

      onSubmitGift(randomString);
    } catch (e) {
      console.log(e);
      toast.error("Some went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center ml-[auto] mr-[auto] justify-center w-[fit-content]">
      {/* <p>
        How much ETH do you want to gift?{" "}
        {data && `(balance:${ethers.utils.formatEther(data)})`}
      </p> */}
      <h1 className={`${kalam.className} text-[64px] text-[white] font-bold`}>
        Giftly
      </h1>

      <div className="relative text-white w-[100%] mt-[12px]">
        <div className="bg-[#E08787] absolute top-[-10px] left-[13px] pl-[5px] pr-[5px]">
          <h3 className={`${inter.className} text-[14px] font-semibold`}>
            Address
          </h3>
        </div>
        <div className="pl-[18px] pr-[18px] pt-[12px] pb-[12px] border-solid border-[1px] border-white rounded-[12px]">
          <p className={`font-[16px] ${inter.className}`}>{address}</p>
        </div>
      </div>

      <div className="w-[100%] mt-[12px]">
        <h2 className="text-[14px] font-semibold">Chain</h2>
        <button
          className="flex flex-row text-[12px] font-semibold items-center 
          justify-center border-solid border-[1px] border-white rounded-[12px] pl-[12px] pr-[12px] pt-[8px] pb-[8px] mt-[10px]"
        >
          <Image
            src={Ethereum}
            alt="Ethereum Logo"
            height={25}
            className="pr-[4px]"
          />
          Ethereum
        </button>
      </div>

      <div className="relative text-white mt-[20px] w-[100%]">
        <div className="bg-[#E08787] absolute top-[-10px] left-[13px] pl-[5px] pr-[5px]">
          <h3 className={`${inter.className} text-[14px] font-semibold`}>
            Amount
          </h3>
        </div>
        <div
          className="pl-[18px] pr-[18px] pt-[12px] pb-[12px] border-solid border-[1px]
            border-white rounded-[12px] flex flex-row justify-between items-center"
        >
          <input
            type={"number"}
            className="focus:outline-none focus:ring-0 bg-[#E08787] placeholder-[rgba(255,255,255,0.5)] focus:border-none w-[100%] font-normal"
            placeholder="Enter ETH amount"
            value={rewardInput}
            onChange={(e) => {
              setRewardInput(e.target.value);
            }}
          />
          <div className="flex flex-row items-center">
            <div className="w-[1px] bg-white h-[24px] ml-[15px] mr-[15px]" />
            <Image src={Ethereum} alt="Ethereum Logo" height={40} />
            <h5 className="text-[12px] ml-[5px]">ETH</h5>
          </div>
        </div>
      </div>

      <div className="w-[100%] mt-[12px]">
        <h2 className="font-semibold text-[14px]">Title</h2>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="focus:outline-none focus:ring-0 bg-[#E08787] border-solid border-[1px] 
          border-white rounded-[12px] w-[100%] bg-[rgba(255,255,255,0.1)] mt-[8px] pl-[12px] pr-[12px] pt-[8px] pb-[8px]"
        />
      </div>

      <div className="w-[100%] mt-[12px]">
        <h2 className="font-semibold text-[14px]">Message</h2>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="focus:outline-none focus:ring-0 bg-[#E08787] border-solid border-[1px] 
          border-white rounded-[12px] w-[100%] bg-[rgba(255,255,255,0.1)] mt-[8px] min-h-[150px] pl-[12px] pr-[12px] pt-[8px] pb-[8px]"
        />
      </div>

      <div className="flex flex-row justify-between w-[100%] mt-[20px]">
        <button
          className="bg-[#E08787] border-solid border-[1px] 
          border-white rounded-[12px] w-[102px] h-[41px]"
        >
          Preview
        </button>
        <button
          className="ml-2 bg-gradient-to-r from-[#C572E2] to-[#6AC3D7] p-2 rounded-[14px] text-white
          w-[102px] h-[41px] text-[16px] font-semibold"
          onClick={() => {
            handleSubmit(rewardInput);
          }}
        >
          {account ? "Send" : "Connect Wallet"}
        </button>
      </div>
      {/* <div>
        <input
          placeholder="Enter ETH amount"
          value={rewardInput}
          onChange={(e) => {
            setRewardInput(e.target.value);
          }}
          className="focus:outline-none focus:ring-2"
        />
      </div>

      <Button onClick={() => {handleSubmit(rewardInput)}} text={account ? "Send Gift" : "Connect Wallet"}/> */}
    </div>
  );
}

export default AddGiftForm;
