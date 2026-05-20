import "dotenv/config";
import cors from "cors";
import express from "express";
import { clue, guess } from "./ai.js";
import { sendRouteError } from "./apiErrors.js";
import {
  isValidClue,
  isValidScenario,
  isValidTarget,
} from "./validateInput.js";
import { clueRateLimit, guessRateLimit } from "./rateLimit.js";

const app = express();
const port = process.env.PORT || 3001;

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/clue", clueRateLimit, async (req, res) => {
  if (!isValidScenario(req.body) || !isValidTarget(req.body.Target)) {
    return res.sendStatus(400);
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

app.post("/api/guess", guessRateLimit, async (req, res) => {
  if (!isValidScenario(req.body) || !isValidClue(req.body.Clue)) {
    return res.sendStatus(400);
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
