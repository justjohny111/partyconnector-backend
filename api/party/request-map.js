import { getParty, putParty } from "./_kv.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).json({ ok: true });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const partyCode = (req.body?.partyCode || "").toUpperCase();
  const modIdRaw = req.body?.modId;
  const requestedBy = (req.body?.requestedBy || "host").trim();

  if (!partyCode) return res.status(400).json({ error: "Missing partyCode" });
  if (modIdRaw === undefined || modIdRaw === null) return res.status(400).json({ error: "Missing modId" });

  const modId = Number(modIdRaw);
  if (!Number.isFinite(modId) || modId <= 0) return res.status(400).json({ error: "Invalid modId" });

  const party = await getParty(partyCode);
  if (!party) return res.status(404).json({ error: "Party not found" });

  party.currentModId = modId;
  party.lastRequest = { modId, requestedBy, ts: Date.now() };

  await putParty(partyCode, party);
  return res.status(200).json({ ok: true, party });
}
