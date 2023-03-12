import Head from "next/head";
import { useState, useEffect } from "react";
import HomeComponent from "../components/Home";
import AddGiftForm from "../components/AddGiftForm";
import useEagerConnect from "../hooks/useEagerConnect";
import Account from "../components/Account";
import { Toaster } from "react-hot-toast";
import SharePresent from "../components/SharePresent";
import { josefinSans } from "../components/fonts";
import { inter } from "../components/fonts";
import { ENS } from '@ensdomains/ensjs'
import { ethers } from 'ethers'

type Reward = {
  token: string;
  amount: string;
};





function Home() {
  const triedToEagerConnect = useEagerConnect();
  const [address, setAddress] = useState("");
  const rpcUrl = 'https://eth-mainnet.g.alchemy.com/v2/kw9vAXInnWOK15QvxLNfalefNumkiCcf';
  const ensAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';


  // Define the ABI for the ENS contract
  const ensAbi = [
    'function resolver(bytes32 node) external view returns (address)',
    'function owner(bytes32 node) external view returns (address)',
    'function setResolver(bytes32 node, address resolver) external',
  ];
  async function getEthAddress(ensName) {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const ensContract = new ethers.Contract(ensAddress, ensAbi, provider);
    if (ensName == '') {
      return '';
    }
    const nodeHash = ethers.utils.namehash(ensName);
    const holderAddress = await ensContract.owner(nodeHash);
    if (holderAddress == '0x0000000000000000000000000000000000000000') {
      return '';
    }
    console.log(holderAddress)
    return holderAddress;
  }


  useEffect(() => {
    // Update the document title using the browser API

  });
  const [chainId, setChainId] = useState(1); // only ethereum is supported for now
  const [reward, setReward] = useState<Reward>({
    amount: "",
    token: "0x0000000000000000000000000000000000000000", // ethereum
  });
  const [shortName, setShortName] = useState("");
  const handleSubmitGift = (shortName: string) => {
    setShortName(shortName);
  };
  return (
    <div className={`h-[100%] ${inter.className} text-white`}>
      <Head>
        <title>Giftly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center ml-[auto] mr-[auto] h-[100%] justify-center w-[100%]">
        {/* <Account triedToEagerConnect={triedToEagerConnect} /> */}

        {!address && <HomeComponent setAddress={setAddress} />}
        {address && !shortName && (
          <AddGiftForm
            address={address}
            reward={reward}
            setReward={setReward}
            onSubmitGift={handleSubmitGift}
          />
        )}
        {shortName && <SharePresent shortName={shortName} />}
        <h6 className="absolute bottom-3 right-3 text-[12px] text-[rgba(255,255,255,70%)] font-thin">Made by @0xjonomom @ropher20 @braverelliot</h6>
      </main>
    </div>
  );
}

export default Home;
