function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getForbiddenBoardWords(scenario) {
  const words = [];
  for (const key of ["A", "B", "C"]) {
    if (scenario.W1?.[key]) {
      words.push(scenario.W1[key]);
    }
  }
  for (const key of ["D", "E", "F"]) {
    if (scenario.W2?.[key]) {
      words.push(scenario.W2[key]);
    }
  }
  return words;
}

function clueUsesBoardWord(clue, word) {
  if (word.includes(" ") || /[^a-zA-Z0-9]/.test(word)) {
    return clue.toLowerCase().includes(word.toLowerCase());
  }
  return new RegExp(`\\b${escapeRegex(word)}\\b`, "i").test(clue);
}

function clueUsesForbiddenWords(clue, forbiddenWords) {
  const sorted = [...forbiddenWords].sort((a, b) => b.length - a.length);
  return sorted.some((word) => clueUsesBoardWord(clue, word));
}

function hasThinkingArtifacts(clue) {
  if (/[\r\n]/.test(clue)) {
    return true;
  }
  if (/```/.test(clue)) {
    return true;
  }
  if (/\*\*|__/.test(clue)) {
    return true;
  }
  if (/`/.test(clue)) {
    return true;
  }
  if (/^#{1,6}\s/m.test(clue)) {
    return true;
  }
  if (/^\s*[-*+]\s/m.test(clue)) {
    return true;
  }
  if (/^\s*\d+\.\s/m.test(clue)) {
    return true;
  }
  if (/\[[^\]]+\]\([^)]+\)/.test(clue)) {
    return true;
  }
  if (/^\s*>\s/m.test(clue)) {
    return true;
  }
  return false;
}

/** One of nine grid cells (e.g. AE) or "false". */
export function parseGuessResponse(text) {
  if (typeof text !== "string") {
    return null;
  }
  const trimmed = text.trim();
  if (trimmed.toLowerCase() === "false") {
    return "false";
  }
  const upper = trimmed.toUpperCase();
  if (/^[ABC][DEF]$/.test(upper)) {
    return upper;
  }
  return null;
}

export function parseClueResponse(text, scenario) {
  if (typeof text !== "string" || !scenario?.Target) {
    return null;
  }

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    return null;
  }

  let result;
  try {
    result = JSON.parse(match[0]);
  } catch {
    return null;
  }

  const clue = result?.Clue;
  if (typeof clue !== "string" || !clue.trim()) {
    return null;
  }

  if (hasThinkingArtifacts(clue)) {
    return null;
  }

  if (clueUsesForbiddenWords(clue, getForbiddenBoardWords(scenario))) {
    return null;
  }

  const target = scenario.Target.trim().toUpperCase();
  const responseTarget =
    typeof result.Target === "string" ? result.Target.trim().toUpperCase() : "";

  if (responseTarget && responseTarget !== target) {
    return null;
  }

  return { Clue: clue.trim(), Target: target };
}
