import CryptoJS from "crypto-js";
import { config } from "./config";

type EncLinkParams = {
  txHash: any;
  chainId: number;
  amounts: string[];
  tokens: string[];
  recipient: any;
  animation: string;
  previewImage: string;
  message: string;
  title: string;

};

export function encLink(params: EncLinkParams) {
  const url = new URL(config.baseUrl);
  url.searchParams.append("txHash", params.txHash);
  url.searchParams.append("chainId", params.chainId.toString());
  url.searchParams.append("amounts", params.amounts.toString());
  url.searchParams.append("tokens", params.tokens.toString());
  url.searchParams.append("recipient", params.recipient);
  url.searchParams.append("message", params.message);
  url.searchParams.append("title", params.title);

  //   url.searchParams.append("animation", params.animation);
  //   url.searchParams.append("previewImage", params.previewImage);
  const encryptedParams = enc(url.searchParams.toString(), params.recipient);
  return encryptedParams;
}

function makeLink(params) {
  const url = new URL(config.baseUrl);
  url.searchParams.append("txHash", params.txHash);
  url.searchParams.append("chainId", params.chainId);
  url.searchParams.append("amounts", params.amounts);
  url.searchParams.append("tokens", params.tokens);
  url.searchParams.append("recipient", params.recipient);
  url.searchParams.append("animation", params.animation);
  url.searchParams.append("previewImage", params.previewImage);
  console.log(url.searchParams.toString());
  const url2 = new URL(config.baseUrl + "?" + url.searchParams.toString());
  console.log({ url2tokens: url2.searchParams.get("tokens") });
  return url.toString();
}

export function enc(plainText, secret) {
  var b64 = CryptoJS.AES.encrypt(plainText, secret).toString();
  var e64 = CryptoJS.enc.Base64.parse(b64);
  var eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
}

export function dec(cipherText, secret) {
  var reb64 = CryptoJS.enc.Hex.parse(cipherText);
  var bytes = reb64.toString(CryptoJS.enc.Base64);
  var decrypt = CryptoJS.AES.decrypt(bytes, secret);
  var plain = decrypt.toString(CryptoJS.enc.Utf8);
  return plain;
}
