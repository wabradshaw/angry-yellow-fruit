import { InsufficientTokensError, isInsufficientTokensError } from "./errors.js";

export function sendRouteError(res, err, routeLabel) {
  if (err instanceof InsufficientTokensError || isInsufficientTokensError(err)) {
    return res.status(402).json({
      code: "insufficient_tokens",
      error: "Insufficient tokens",
    });
  }

  console.error(`${routeLabel} failed:`, err);
  return res.status(500).json({ error: "Request failed" });
}
