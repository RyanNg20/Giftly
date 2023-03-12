import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import getLibrary from "../getLibrary";
import "../styles/globals.css";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Toaster />
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
