const API_BASE = import.meta.env.VITE_API_URL ?? "";

export const TOKEN_HUNGER_MESSAGE = "I hunger for tokens! Ask William to add more.";
export const RATE_LIMIT_MESSAGE = "I'm tired, wait a minute.";

export class InsufficientTokensError extends Error {
  constructor() {
    super(TOKEN_HUNGER_MESSAGE);
    this.name = "InsufficientTokensError";
  }
}

export class RateLimitError extends Error {
  constructor() {
    super(RATE_LIMIT_MESSAGE);
    this.name = "RateLimitError";
  }
}

async function postJson(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 429) {
      throw new RateLimitError();
    }
    if (data.code === "insufficient_tokens") {
      throw new InsufficientTokensError();
    }
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}

export function getAiErrorMessage(err) {
  if (err instanceof InsufficientTokensError || err instanceof RateLimitError) {
    return err.message;
  }
  return "Sorry, something went wrong.";
}

export function cellNumberToTarget(cellNumber) {
  const w1Letters = ["A", "B", "C"];
  const w2Letters = ["D", "E", "F"];
  const value = cellNumber - 1;
  const row = Math.floor(value / 3);
  const col = value % 3;
  return w1Letters[col] + w2Letters[row];
}

export function buildScenario(theme, descriptions, opinions) {
  return {
    Theme: theme,
    W1: {
      A: descriptions[0],
      B: descriptions[1],
      C: descriptions[2],
    },
    W2: {
      D: opinions[0],
      E: opinions[1],
      F: opinions[2],
    },
  };
}

export function requestClue(scenario, target) {
  return postJson("/api/clue", { ...scenario, Target: target });
}

export function requestGuess(scenario, clue) {
  return postJson("/api/guess", { ...scenario, Clue: clue });
}
