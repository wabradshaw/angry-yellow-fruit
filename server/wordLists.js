import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const cardsDir = join(dirname(fileURLToPath(import.meta.url)), "../app/src/cards");

function loadWordSet(...files) {
  const words = new Set();
  for (const file of files) {
    const list = JSON.parse(readFileSync(join(cardsDir, file), "utf8"));
    for (const word of list) {
      words.add(word);
    }
  }
  return words;
}

export const VALID_THEMES = loadWordSet("baseThemes.json", "testThemes.json");
export const VALID_DESCRIPTIONS = loadWordSet(
  "baseDescriptions.json",
  "testDescriptions.json",
);
export const VALID_OPINIONS = loadWordSet("baseOpinions.json", "testOpinions.json");
