import { BigNumber } from "ethers";
import { ethers } from 'ethers';

const rpcUrl = 'https://eth-mainnet.g.alchemy.com/v2/kw9vAXInnWOK15QvxLNfalefNumkiCcf';
const ensAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';


// Define the ABI for the ENS contract
const ensAbi = [
  'function resolver(bytes32 node) external view returns (address)',
  'function owner(bytes32 node) external view returns (address)',
  'function setResolver(bytes32 node, address resolver) external',
];
export async function getEthAddress(ensName) {
  if (ensName.match(/^0x[a-fA-F0-9]{40}$/)) {
    return ensName
  }
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const ensContract = new ethers.Contract(ensAddress, ensAbi, provider);
  if (ensName == '') {
    return false;
  }
  const nodeHash = ethers.utils.namehash(ensName);
  const holderAddress = await ensContract.owner(nodeHash);
  if (holderAddress == '0x0000000000000000000000000000000000000000') {
    return false;
  }
  console.log(holderAddress)
  return holderAddress;
}
export async function getEthAddressx2(ensName) {
  if (ensName.match(/^0x[a-fA-F0-9]{40}$/)) {
    return ensName
  }
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const ensContract = new ethers.Contract(ensAddress, ensAbi, provider);
  if (ensName == '') {
    return false;
  }
  const nodeHash = ethers.utils.namehash(ensName);
  const holderAddress = await ensContract.owner(nodeHash);
  if (holderAddress == '0x0000000000000000000000000000000000000000') {
    return false;
  }
  console.log(holderAddress)
  return holderAddress;
}

export const shortenTxHash = (txHash: string) => {
  return `${txHash.slice(0, 6)}...${txHash.slice(txHash.length - 4)}`;
};

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const generateRandomString = (length: number) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export const isValidAddress = (address: string) => {

  getEthAddress(address).then((holderAddress) => {
    console.log(holderAddress)
    return !!holderAddress.match(/^0x[a-fA-F0-9]{40}$/);
  }).catch((error) => {
    // console.log(error)
    return false;
  });
};

export const formatEtherToNearestWeiOrEth = (bn: BigNumber) => {
  const value = bn.toString();
  const ether = Number(value) / 1e18;
  if (ether < 0.0001) {
    return `${Number(value).toFixed(0)} wei`;
  } else {
    return `${ether.toFixed(4)} ETH`;
  }
};
const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

export function formatEtherscanLink(txhash, chainId) {
  return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${txhash}`;
}