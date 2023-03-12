import QRCode from "react-qr-code";
import { config } from "../lib/config";
import { inter } from "./fonts";

const SharePresent = ({ shortName }) => {
  const url = `${config.baseUrl}/gift/${shortName}`;
  return (
    <div className="flex flex-col items-center ml-[auto] mr-[auto] justify-center w-[fit-content]">
      <h1 className="text-[20px] font-semibold">
        Sucessfully generated a link:{" "}
      </h1>
      <p className="text-[14px] font-light">
        Send the link physically or print it and deliver in person!{" "}
      </p>

      <div className="relative text-white w-[100%] mt-[36px] mb-[36px]">
        <div className="bg-[#E08787] absolute top-[-10px] left-[13px] pl-[5px] pr-[5px]">
          <h3 className={`${inter.className} text-[14px] font-semibold`}>Link</h3>
        </div>
        <div className="pl-[18px] pr-[18px] pt-[12px] pb-[12px] border-solid border-[1px] border-white rounded-[12px]">
          <p className={`font-[16px] ${inter.className}`}>{url}</p>
        </div>
      </div>

      <QRCode value={url} bgColor="#E08787" fgColor="white"/>
    </div>
  );
};

export default SharePresent;
