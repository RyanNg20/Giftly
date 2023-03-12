import Image from "next/image";
import { useState } from "react";
import { inter, kalam, josefinSans } from "./fonts";
import Aztec from "../images/aztec.svg";
import Button from "./button";
import { isValidAddress, getEthAddress } from "../lib/utils";
import { toast } from "react-hot-toast";
// import { getEthAddress } from "../lib/utils";

const Home = ({ setAddress }) => {
  const [localAddress, setLocalAddress] = useState("");
  return (
    <div className="flex flex-col items-center ml-[auto] mr-[auto] h-[100%] justify-center">
      <h1 className={`${kalam.className} text-[64px] text-[white] font-bold`}>
        Giftly
      </h1>
      <h2 className={`${inter.className} text-white text-[20px] font-normal`}>
        Send Crypto Anonymously
      </h2>
      <div
        className="flex flex-row border-1 border-white border rounded-[16px] h-[49px] 
        -[387px] justify-between items-center mt-[36px] mb-[24px] text-white pl-[14px] pr-[2px] text-[16px]"
      >
        <input
          value={localAddress}
          placeholder="Enter Wallet Address"
          onChange={(e) => {
            setLocalAddress(e.target.value);
          }}
          className="focus:outline-none bg-[rgba(0,0,0,0)] placeholder-[rgba(255,255,255,0.5)]"
        />
        <button
          className="ml-2 bg-gradient-to-r from-[#C572E2] to-[#6AC3D7] p-2 rounded-[14px] text-white w-[151px] h-[calc(100%-4px)] text-[16px] font-semibold"
          onClick={() => {
            // if (!isValidAddress(localAddress)) {
            //   toast.error("Please input a correct address");
            //   return;
            // }
            getEthAddress(localAddress).then((holderAddress) => {
              console.log(holderAddress)
              setAddress(holderAddress);
            }).catch((error) => {
              // console.log(error)
              toast.error("Please input a correct address - or another error :(");

              return false;
            });
          }}
        >
          Generate Link
        </button>
      </div>
      <div className="flex align-middle gap-1">
        <h5 className={`${inter.className} text-white text-[12px]`}>
          Arriving on
        </h5>
        <Image src={Aztec} alt="" height={50} width={50} />
      </div>
    </div>
  );
};

export default Home;
