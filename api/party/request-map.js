import { parties } from "./_store.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const partyCode = (req.body?.partyCode || "").toUpperCase();
  const modId = req.body?.modId;
  const requestedBy = req.body?.requestedBy || "host";

  if (!partyCode || !modId) return res.status(400).json({ error: "Missing partyCode/modId" });

  const party = parties.get(partyCode);
  if (!party) return res.status(404).json({ error: "Party not found" });

  party.currentModId = Number(modId);
  party.lastRequest = { modId: Number(modId), requestedBy, ts: Date.now() };

  return res.status(200).json({ ok: true, party });
}
