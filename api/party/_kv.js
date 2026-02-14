import { kv } from "@vercel/kv";

export function partyKey(code) {
  return `party:${code}`;
}

export function code6() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export const PARTY_TTL_SECONDS = 60 * 60 * 6;

export async function getParty(code) {
  return await kv.get(partyKey(code));
}

export async function putParty(code, party) {
  await kv.set(partyKey(code), party, { ex: PARTY_TTL_SECONDS });
}
