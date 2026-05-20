import Anthropic from "@anthropic-ai/sdk";
import { InsufficientTokensError, isInsufficientTokensError } from "./errors.js";

const client = new Anthropic();
export const MODEL = "claude-haiku-4-5";
export const MAX_RETRIES = 1;

export async function createMessage(params) {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await client.messages.create(params);
    } catch (err) {
      lastError = err;

      if (isInsufficientTokensError(err)) {
        throw new InsufficientTokensError(err);
      }

      if (attempt < MAX_RETRIES) {
        console.warn(
          `Anthropic request failed (attempt ${attempt + 1}/${MAX_RETRIES + 1}), retrying...`,
          err.message,
        );
      }
    }
  }

  throw lastError;
}

export function getMessageText(response) {
  return response.content[0].text.trim();
}
