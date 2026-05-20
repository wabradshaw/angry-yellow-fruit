import "dotenv/config";
import cors from "cors";
import express from "express";
import { clue, guess } from "./ai.js";
import { getApiMountPath } from "./basePath.js";
import { corsOptions } from "./corsConfig.js";
import { sendRouteError } from "./apiErrors.js";
import {
  isValidClue,
  isValidScenario,
  isValidTarget,
} from "./validateInput.js";
import { clueRateLimit, guessRateLimit } from "./rateLimit.js";

const app = express();
const port = process.env.PORT || 3001;
const apiMountPath = getApiMountPath();

app.set("trust proxy", 1);
app.use(cors(corsOptions()));
app.use(express.json());

const api = express.Router();

api.get("/health", (_req, res) => {
  res.json({ ok: true });
});

api.post("/clue", clueRateLimit, async (req, res) => {
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

api.post("/guess", guessRateLimit, async (req, res) => {
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

app.use(apiMountPath, api);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}${apiMountPath}`);
});
