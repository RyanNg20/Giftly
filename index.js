const CryptoJS = require("crypto-js");
require("dotenv").config();
const Supabase = require("@supabase/supabase-js");
if (!process.env.SUPABASE_ACCESS_TOKEN) {
  throw "supabase access token missing";
}
const supabaseProjectId = "athjrozbzdctcjwlctjo";
const supabase = Supabase.createClient(
  `https://${supabaseProjectId}.supabase.co`,
  process.env.SUPABASE_ACCESS_TOKEN
);

const BASE_URL = "https://localhost:3000";

const SECRET = "0x397A7EC90bb4f0e89Ffd2Fb3269a3ef295d4f84A";

function makeLink(params) {
  const url = new URL(BASE_URL);
  url.searchParams.append("txHash", params.txHash);
  url.searchParams.append("chainId", params.chainId);
  url.searchParams.append("amounts", params.amounts);
  url.searchParams.append("tokens", params.tokens);
  url.searchParams.append("recipient", params.recipient);
  url.searchParams.append("animation", params.animation);
  url.searchParams.append("previewImage", params.previewImage);
  console.log(url.searchParams.toString());
  const url2 = new URL(BASE_URL + "?" + url.searchParams.toString());
  console.log({ url2tokens: url2.searchParams.get("tokens") });
  return url.toString();
}

function enc(plainText) {
  var b64 = CryptoJS.AES.encrypt(plainText, SECRET).toString();
  var e64 = CryptoJS.enc.Base64.parse(b64);
  var eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
}

function dec(cipherText) {
  var reb64 = CryptoJS.enc.Hex.parse(cipherText);
  var bytes = reb64.toString(CryptoJS.enc.Base64);
  var decrypt = CryptoJS.AES.decrypt(bytes, SECRET);
  var plain = decrypt.toString(CryptoJS.enc.Utf8);
  return plain;
}

function shortenUrl(url) {}

async function getShortUrl(url) {
  const { data, error } = await supabase
    .from("short_urls")
    .select("*")
    .filter("short_url", "eq", "jono");
  // .eq("url", url);
  // .or("short_url", url);
  if (error) {
    throw error;
  }
  return data;
}

async function addShortUrl(shortenName, url) {
  const { data, error } = await supabase
    .from("short_urls")
    .insert({ url, short_url: shortenName });
  if (error) {
    throw error;
  }
  return data;
}

async function main() {
  // link params
  const params = {
    txHash:
      "0xcc6d622ba852b861f70f97b3b7c4b8428d64ac64de3d72c79eee5ab328aa18f3",
    chainId: 1,
    amounts: ["7822006391"],
    tokens: ["0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "1"],
    recipient: "0x1A7d280A7cE089485a4c6279F08c8a964d459423",
    animation: "default",
    previewImage:
      "https://cdn.vox-cdn.com/uploads/chorus_image/image/44294754/grumpy_cat.0.0.jpg",
  };
  const url = makeLink(params);
  console.log("Generated url:", url);
  const encryptedUrl = enc(url);
  let data;
  console.log({ encryptedUrl });

  try {
    // await addShortUrl("jono", encryptedUrl);
    data = await getShortUrl(encryptedUrl);
    // console.log(data, data[0].url == encryptedUrl);
  } catch (error) {
    console.log(error);
  }

  const decryptedMessage = dec(data[0].url);
  console.log("Decrypted message:", decryptedMessage);
}

// main();

const f = dec(
  "53616c7465645f5f955708e01c0e4334c24799f8b5bb21063f05e2b03407e962f4070afd95f24ec3195130fe9b62f3c2dc29d4b85b1e04c6acfffb4593778e1b9f1697b90278bca17e698eb020c7c94defeb7ea910c200bf9de2180a0dc809bdc421de6e3b04782c331e5d97bc71f7199659835b2c371f706a1e04d68a404546cf3d79cef910606a8befc47d964a96b67fb1af52a6c0841e8e19af545949bf5795de9b839484db5e1906c405c93c599a9079e9ccceb5ffe4a88be949418f350864aa04c1c74c81be9dee5aa4636437015ca0ef0661a60160cd1b5000eee05809"
);
console.log(f);
