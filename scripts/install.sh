#!/usr/bin/env bash
# Run from your EC2 deploy directory (e.g. ~/web):
#   bash ../angry-yellow-fruit/scripts/install.sh
# Or copy this file to the server as ~/web/install-ayf.sh
#
# Expects ayf.zip in ../staging/
set -euo pipefail

STAGING_ZIP="../staging/ayf.zip"
STATIC_DIR="${AYF_STATIC_DIR:-angry-yellow-fruit}"
BUNDLE_DIR="${AYF_BUNDLE_DIR:-angry-yellow-fruit-bundle}"
API_NAME="${AYF_API_NAME:-angry-yellow-fruit-api}"
DEPLOY_USER="$(whoami)"
ENV_BACKUP="/tmp/ayf-server.env.bak"

if [[ ! -f "$STAGING_ZIP" ]]; then
  echo "Error: ayf.zip not found in staging!"
  exit 1
fi

echo "==> Copying ayf.zip from staging..."
sudo cp "$STAGING_ZIP" ./ayf.zip

echo "==> Extracting..."
sudo rm -rf ayf-extract
sudo unzip -aqo ayf.zip -d ayf-extract
sudo chown -R "$DEPLOY_USER:$DEPLOY_USER" ayf-extract

if [[ ! -d ayf-extract/app/dist ]]; then
  echo "error: app/dist missing. Run scripts/package-deploy.ps1 on Windows first." >&2
  exit 1
fi

if [[ ! -d ayf-extract/app/src/cards ]]; then
  echo "error: app/src/cards missing (required for API validation)." >&2
  exit 1
fi

echo "==> Publishing static site to ${STATIC_DIR}/ ..."
sudo rm -rf "$STATIC_DIR"
sudo mkdir -p "$STATIC_DIR"
sudo cp -a ayf-extract/app/dist/. "$STATIC_DIR/"
sudo chmod o+x /home/"$DEPLOY_USER" /home/"$DEPLOY_USER"/web 2>/dev/null || true
sudo chmod -R o+rX "$STATIC_DIR"

if [[ -f "$BUNDLE_DIR/server/.env" ]]; then
  cp "$BUNDLE_DIR/server/.env" "$ENV_BACKUP"
fi

echo "==> Installing API bundle to ${BUNDLE_DIR}/ ..."
sudo rm -rf "$BUNDLE_DIR"
mkdir -p "$BUNDLE_DIR"
cp -a ayf-extract/app "$BUNDLE_DIR/"
cp -a ayf-extract/server "$BUNDLE_DIR/"

if [[ -f "$ENV_BACKUP" ]]; then
  cp "$ENV_BACKUP" "$BUNDLE_DIR/server/.env"
  rm -f "$ENV_BACKUP"
fi

cd "$BUNDLE_DIR/server"

if [[ ! -f .env.example ]]; then
  cat > .env.example <<'EOF'
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
BASE_PATH=/angry-yellow-fruit-api
EOF
fi

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo ""
  echo "Created ${BUNDLE_DIR}/server/.env from .env.example"
  echo "Edit it now, then re-run this script:"
  echo "  nano ${BUNDLE_DIR}/server/.env   # set ANTHROPIC_API_KEY"
  exit 1
fi

if grep -q 'your_api_key_here' .env 2>/dev/null; then
  echo ""
  echo "error: set ANTHROPIC_API_KEY in ${BUNDLE_DIR}/server/.env"
  exit 1
fi

echo "==> Installing API dependencies..."
npm ci --omit=dev

echo "==> Restarting API (${API_NAME})..."
pm2 delete angry-yellow-fruit 2>/dev/null || true

if pm2 describe "$API_NAME" &>/dev/null; then
  pm2 restart "$API_NAME"
else
  pm2 start index.js --name "$API_NAME" --cwd "$(pwd)"
fi
pm2 save

cd - >/dev/null

echo "==> Cleaning up..."
rm -rf ayf-extract
sudo rm -f ayf.zip

echo ""
echo "Deployment complete."
echo "  Static:  ${STATIC_DIR}/  ->  /angry-yellow-fruit/"
echo "  API:     ${BUNDLE_DIR}/server/  (pm2: ${API_NAME})"
echo "  Health:  curl -s https://www.wabradshaw.com/angry-yellow-fruit-api/api/health"
