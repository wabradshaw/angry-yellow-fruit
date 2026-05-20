import { createMessage, getMessageText, MODEL } from "./anthropicCall.js";

export async function clue(scenario) {
  const { Theme, W1, W2, Target } = scenario;
  const w1Key = Target[0];
  const w2Key = Target[1];
  const word1 = W1[w1Key];
  const word2 = W2[w2Key];

  const prompt = `You are the clue-giver in a board game. The theme is "${Theme}".

Your clue must connect these two adjectives:
- ${word1} (${w1Key})
- ${word2} (${w2Key})

Give a single clue word or short phrase that fits the theme and connects both adjectives. Do not use any of the adjectives or theme words in your clue.

Reply with JSON only, no explanation:
{"Clue": "<your clue>", "Target": "${Target}"}`;

  const response = await createMessage({
    model: MODEL,
    max_tokens: 256,
    messages: [{ role: "user", content: prompt }],
  });

  const text = getMessageText(response);
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error(`Clue: unexpected response: ${text}`);
  }
  const result = JSON.parse(match[0]);
  return { Clue: result.Clue, Target };
}

export async function guess(clueInput) {
  const systemPrompt = `You are playing a guessing role in a board game. The user will give you a clue, a theme, and two word sets (W1 and W2), each containing three adjectives (A/B/C and D/E/F). Your job is to decide which adjective from W1 and which from W2 the clue most strongly fits. Rules: If the clue does not fit the theme, reply with: false. Otherwise, reply with two letters only (e.g. AE or CF). No explanation.`;

  const response = await createMessage({
    model: MODEL,
    max_tokens: 16,
    system: systemPrompt,
    messages: [{ role: "user", content: JSON.stringify(clueInput) }],
  });

  return getMessageText(response);
}
