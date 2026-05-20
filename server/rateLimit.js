import rateLimit from "express-rate-limit";

const aiRateLimitOptions = {
  windowMs: 60_000,
  max: 3,
  standardHeaders: false,
  legacyHeaders: false,
  handler: (_req, res) => res.sendStatus(429),
};

export const clueRateLimit = rateLimit(aiRateLimitOptions);
export const guessRateLimit = rateLimit(aiRateLimitOptions);
