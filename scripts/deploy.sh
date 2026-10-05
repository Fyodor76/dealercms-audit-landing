#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SERVICE_NAME="${SERVICE_NAME:-dealercms-audit}"
PORT="${PORT:-3010}"
SITE_URL="${SITE_URL:-https://audit.dealercms.ru}"

echo "==> install"
npm install --registry=https://registry.npmjs.org/

echo "==> build"
npm run build

echo "==> restart ${SERVICE_NAME}"
systemctl restart "$SERVICE_NAME"

echo "==> wait"
sleep 2

echo "==> health local"
curl -fsS -o /dev/null -I "http://127.0.0.1:${PORT}"

CSS_PATH="$(curl -fsS "http://127.0.0.1:${PORT}" | grep -oE '/_next/static/chunks/[^"]+\.css' | head -n 1 || true)"
if [[ -z "${CSS_PATH}" ]]; then
  echo "ERROR: в HTML нет ссылки на CSS"
  exit 1
fi

echo "==> health css ${CSS_PATH}"
CSS_CODE="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}${CSS_PATH}")"
if [[ "${CSS_CODE}" != "200" ]]; then
  echo "ERROR: CSS вернул ${CSS_CODE} (ожидали 200). Сервис не подняли со сломанными стилями."
  exit 1
fi

echo "==> health public ${SITE_URL}"
curl -fsS -o /dev/null -I "${SITE_URL}" || true

echo "OK: deploy готов"
