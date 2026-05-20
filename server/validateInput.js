import {
  VALID_DESCRIPTIONS,
  VALID_OPINIONS,
  VALID_THEMES,
} from "./wordLists.js";

function isWordSet(obj, keys) {
  return (
    obj &&
    typeof obj === "object" &&
    keys.every((key) => typeof obj[key] === "string" && obj[key].length > 0)
  );
}

function isKnownWord(word, validWords) {
  return typeof word === "string" && validWords.has(word);
}

export function isValidScenario(body) {
  if (!body || typeof body.Theme !== "string" || !body.Theme.trim()) {
    return false;
  }
  if (!isKnownWord(body.Theme, VALID_THEMES)) {
    return false;
  }
  if (!isWordSet(body.W1, ["A", "B", "C"])) {
    return false;
  }
  if (!isWordSet(body.W2, ["D", "E", "F"])) {
    return false;
  }
  for (const key of ["A", "B", "C"]) {
    if (!isKnownWord(body.W1[key], VALID_DESCRIPTIONS)) {
      return false;
    }
  }
  for (const key of ["D", "E", "F"]) {
    if (!isKnownWord(body.W2[key], VALID_OPINIONS)) {
      return false;
    }
  }
  return true;
}

export function isValidTarget(target) {
  return typeof target === "string" && /^[ABC][DEF]$/i.test(target.trim());
}

export function isValidClue(clue) {
  return typeof clue === "string" && clue.trim().length > 0 && clue.length <= 40;
}
