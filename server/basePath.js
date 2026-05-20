/** Mount path for API routes, e.g. /angry-yellow-fruit-api/api */
export function getApiMountPath() {
  const raw = process.env.BASE_PATH?.trim() ?? "";
  if (!raw) {
    return "/api";
  }
  const base = raw.replace(/\/$/, "");
  return `${base}/api`;
}
