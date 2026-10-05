#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SERVICE_NAME="${SERVICE_NAME:-dealercms-audit}"
PORT="${PORT:-3010}"
SITE_URL="${SITE_URL:-https://audit.dealercms.ru}"

echo "==> install"
npm install --registry=https://registry.npmjs.org/

# Важно: не билдить поверх работающего next start —
# иначе HTML/runtime ссылаются на уже удалённые chunks (ChunkLoadError).
echo "==> stop ${SERVICE_NAME}"
systemctl stop "$SERVICE_NAME" || true

echo "==> build"
npm run build

echo "==> start ${SERVICE_NAME}"
systemctl start "$SERVICE_NAME"

echo "==> wait"
sleep 2

echo "==> health local"
curl -fsS -o /dev/null -I "http://127.0.0.1:${PORT}"

HTML="$(curl -fsS "http://127.0.0.1:${PORT}")"

CSS_PATH="$(printf '%s' "$HTML" | grep -oE '/_next/static/[^"]+\.css' | head -n 1 || true)"
if [[ -z "${CSS_PATH}" ]]; then
  echo "ERROR: в HTML нет ссылки на CSS"
  exit 1
fi

echo "==> health css ${CSS_PATH}"
CSS_CODE="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}${CSS_PATH}")"
if [[ "${CSS_CODE}" != "200" ]]; then
  echo "ERROR: CSS вернул ${CSS_CODE} (ожидали 200)."
  exit 1
fi

PAGE_JS="$(printf '%s' "$HTML" | grep -oE '/_next/static/chunks/app/page-[^"]+\.js' | head -n 1 || true)"
if [[ -n "${PAGE_JS}" ]]; then
  echo "==> health page js ${PAGE_JS}"
  PAGE_CODE="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}${PAGE_JS}")"
  if [[ "${PAGE_CODE}" != "200" ]]; then
    echo "ERROR: page chunk вернул ${PAGE_CODE} (ожидали 200). Будет ChunkLoadError в браузере."
    exit 1
  fi
fi

echo "==> health public ${SITE_URL}"
curl -fsS -o /dev/null -I "${SITE_URL}" || true

BUILD_ID="$(cat .next/BUILD_ID 2>/dev/null || echo unknown)"
echo "OK: deploy готов (build ${BUILD_ID})"
