import { parties, code6 } from "./_store.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const hostName = req.body?.hostName || "host";
  const partyCode = code6();

  const party = {
    code: partyCode,
    hostName,
    members: [],
    currentModId: null,
    lastRequest: null
  };

  parties.set(partyCode, party);
  return res.status(200).json({ partyCode });
}
