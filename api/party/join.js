import { getParty, putParty } from "./_kv.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).json({ ok: true });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const partyCode = (req.body?.partyCode || "").toUpperCase();
  const name = (req.body?.name || "member").trim();

  if (!partyCode) return res.status(400).json({ error: "Missing partyCode" });

  const party = await getParty(partyCode);
  if (!party) return res.status(404).json({ error: "Party not found" });

  if (!party.members.includes(name)) party.members.push(name);

  await putParty(partyCode, party);
  return res.status(200).json({ ok: true, party });
}
