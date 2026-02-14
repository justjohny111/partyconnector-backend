import { parties } from "./_store.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const partyCode = (req.body?.partyCode || "").toUpperCase();
  const name = req.body?.name || "member";
  if (!partyCode) return res.status(400).json({ error: "Missing partyCode" });

  const party = parties.get(partyCode);
  if (!party) return res.status(404).json({ error: "Party not found" });

  if (!party.members.includes(name)) party.members.push(name);
  return res.status(200).json({ ok: true, party });
}
