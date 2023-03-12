import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import GiftReceived from "../../components/GiftReceived";
import Head from "next/head";
import { dec } from "../../lib/crypto";
import Present from "../../components/Present";
import { config } from "../../lib/config";
import { isValidAddress, getEthAddress } from "../../lib/utils";
import { toast } from "react-hot-toast";

const Post = ({ url, short_url, animation, previewImage }) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");
  const [chainId, setChainId] = useState("");
  const [tokens, setTokens] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [title, setTitle] = useState("");
  getEthAddress(address).then((holderAddress) => {
    setAddress(holderAddress);
  }).catch((error) => {
    // console.log(error)
    toast.error("Please input a correct address - or another error :(");

    // return false;
  });
  const [message, setMessage] = useState("");
  const handleSubmitAddress = () => {
    console.log("submitted address");
    try {
      const res = dec(url, address.toLowerCase());
      console.log(res);
      const urlObj = new URL(`${config.baseUrl}/gift/?` + res);
      const txHash = urlObj.searchParams.get("txHash");
      const chainId = urlObj.searchParams.get("chainId");
      const tokens = urlObj.searchParams.get("tokens").split(",");
      const amounts = urlObj.searchParams.get("amounts").split(",");
      const message = urlObj.searchParams.get("message");
      const title = urlObj.searchParams.get("title");

      setTxHash(txHash);
      setChainId(chainId);
      setTokens(tokens);
      setAmounts(amounts);
      setMessage(message);
      setTitle(title);
      setChainId(chainId);

      console.log(res);
    } catch (e) {
      setError("Invalid address");
    }
  };
  return (
    <div className="h-[100%]">
      <Head>
        <title>Open Gift</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center h-[100%]">
        {!txHash && (
          <GiftReceived
            address={address}
            setAddress={setAddress}
            onSubmitAddress={handleSubmitAddress}
          />
        )}
        {txHash && (
          <Present
            amounts={amounts}
            title={title}
            message={message}
            recipient={address}
            txHash={txHash}
            chainId={chainId}
          />
        )}
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  let res;
  try {
    res = await axios.post(`${config.baseUrl}/api/gift`, {
      short_url: context.params.shortName,
    });
    return {
      props: {
        url: res.data.data[0].url,
        short_url: res.data.data[0].short_url,
        animation: res.data.data[0].animation,
        previewImage: res.data.data[0].preview_image,
      }, // will be passed to the page component as props
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}

export default Post;
