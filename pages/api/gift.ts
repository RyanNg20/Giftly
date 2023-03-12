import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { short_url } = req.body;
  if (!short_url) {
    return res.status(400).json({ error: "Missing short_url" });
  }
  const { data, error } = await supabase
    .from("short_urls")
    .select("*")
    .filter("short_url", "eq", short_url);
  res.status(200).json({ data, error });
}
