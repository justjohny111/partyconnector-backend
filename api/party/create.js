import { code6, putParty } from "./_kv.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).json({ ok: true });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const hostName = req.body?.hostName || "host";
  const partyCode = code6();

  const party = {
    code: partyCode,
    hostName,
    members: [],
    currentModId: null,
    lastRequest: null,
  };

  await putParty(partyCode, party);
  return res.status(200).json({ partyCode });
}
