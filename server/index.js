import "dotenv/config";
import cors from "cors";
import express from "express";
import { clue, guess } from "./ai.js";
import { sendRouteError } from "./apiErrors.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function isWordSet(obj, keys) {
  return obj && typeof obj === "object" && keys.every((key) => typeof obj[key] === "string" && obj[key].length > 0);
}

function validateScenario(body) {
  if (!body || typeof body.Theme !== "string" || !body.Theme.trim()) {
    return "Theme is required";
  }
  if (!isWordSet(body.W1, ["A", "B", "C"])) {
    return "W1 must include non-empty A, B, and C strings";
  }
  if (!isWordSet(body.W2, ["D", "E", "F"])) {
    return "W2 must include non-empty D, E, and F strings";
  }
  return null;
}

function validateTarget(target) {
  if (typeof target !== "string" || !/^[ABC][DEF]$/i.test(target.trim())) {
    return "Target must be two letters identifying W1 and W2 (e.g. AE)";
  }
  return null;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/clue", async (req, res) => {
  const error = validateScenario(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  const targetError = validateTarget(req.body.Target);
  if (targetError) {
    return res.status(400).json({ error: targetError });
  }

  try {
    const result = await clue({
      ...req.body,
      Target: req.body.Target.trim().toUpperCase(),
    });
    res.json(result);
  } catch (err) {
    sendRouteError(res, err, "POST /api/clue");
  }
});

app.post("/api/guess", async (req, res) => {
  const error = validateScenario(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  if (typeof req.body.Clue !== "string" || !req.body.Clue.trim()) {
    return res.status(400).json({ error: "Clue is required" });
  }
  if (req.body.Clue.length > 40) {
    return res.status(400).json({ error: "Clue must be at most 40 characters" });
  }

  try {
    const result = await guess({
      Clue: req.body.Clue.trim(),
      Theme: req.body.Theme,
      W1: req.body.W1,
      W2: req.body.W2,
    });
    res.json({ guess: result });
  } catch (err) {
    sendRouteError(res, err, "POST /api/guess");
  }
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
