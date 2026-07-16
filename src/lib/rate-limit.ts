const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true; // Allowed
  }

  if (record.count >= limit) {
    return false; // Rate limited
  }

  record.count += 1;
  return true; // Allowed
}
