export class InsufficientTokensError extends Error {
  constructor(cause) {
    super("Insufficient tokens");
    this.name = "InsufficientTokensError";
    this.cause = cause;
  }
}

function getAnthropicErrorDetail(err) {
  const body = err?.error;
  if (body?.error?.type) {
    return body.error;
  }
  return null;
}

export function isInsufficientTokensError(err) {
  if (err instanceof InsufficientTokensError) {
    return true;
  }

  const detail = getAnthropicErrorDetail(err);
  if (detail?.type === "billing_error") {
    return true;
  }

  const text = `${err?.message || ""} ${detail?.message || ""}`.toLowerCase();
  return /credit balance|too low|purchase credits|insufficient credit|out of credits|billing|lack of credits/.test(text);
}
