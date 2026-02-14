// WARNING: In-memory store is NOT reliable on serverless.
// Good for quick testing only.
export const parties = new Map();

export function code6() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
