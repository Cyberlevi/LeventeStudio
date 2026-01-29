type RateLimitConfig = {
  maxAttempts: number;
  windowMs: number;
};

const clickTimestamps = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  config: RateLimitConfig = { maxAttempts: 3, windowMs: 60000 }
): boolean {
  const now = Date.now();
  const timestamps = clickTimestamps.get(key) || [];

  const recentClicks = timestamps.filter((t) => now - t < config.windowMs);

  if (recentClicks.length >= config.maxAttempts) {
    return true;
  }

  recentClicks.push(now);
  clickTimestamps.set(key, recentClicks);

  setTimeout(() => {
    const current = clickTimestamps.get(key) || [];
    const filtered = current.filter((t) => Date.now() - t < config.windowMs);
    if (filtered.length === 0) {
      clickTimestamps.delete(key);
    } else {
      clickTimestamps.set(key, filtered);
    }
  }, config.windowMs);

  return false;
}

export function getRateLimitMessage(windowSeconds: number = 60): string {
  return `Túl sok kattintás rövid időn belül. Kérlek várj ${windowSeconds} másodpercet.`;
}
