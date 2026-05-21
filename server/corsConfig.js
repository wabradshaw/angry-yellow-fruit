const DEFAULT_ORIGINS = [
  "https://wabradshaw.com",
  "https://www.wabradshaw.com",
  "http://localhost:3000",
];

function getAllowedOrigins() {
  const fromEnv = process.env.CORS_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return fromEnv?.length ? fromEnv : DEFAULT_ORIGINS;
}

export function corsOptions() {
  const allowedOrigins = getAllowedOrigins();

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  };
}
