import { supabase } from "../../lib/supabase";
export default async function handler(req, res) {
  const { encryptedParams, shortenName, animation, previewImage } = req.body;
  const { data, error } = await supabase.from("short_urls").insert({
    url: encryptedParams,
    short_url: shortenName,
    animation,
    preview_image: previewImage,
  });
  console.log(error);
  res.status(!error ? 200 : 400).json({ error });
}