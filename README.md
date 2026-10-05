# dealercms-form-audit

Standalone-страница заявки на бесплатный аудит сайта. Стиль DigiCod, отправка писем через Unisender Go — тот же канал, что у `sender` / `request.storage`.

## Запуск

```bash
npm install --registry=https://registry.npmjs.org/
npm run dev
```

Откройте http://localhost:3000

## Деплой на сервер

Одной командой (install → build → verify → restart → healthcheck CSS):

```bash
cd /home/dealercms-audit-landing
git pull
npm run deploy
```

`npm run build` сам проверяет, что в `.next` есть `BUILD_ID` и CSS-чанки.  
`npm start` / systemd не стартуют, если сборка битая (`prestart`).

## Почта

Письмо уходит через Unisender Go:

`POST https://go2.unisender.ru/ru/transactional/api/v1/email/send.json`

Переменные в `.env.local` (см. `.env.example`):

- `UNISENDER_API_KEY` — ключ API
- `MAIL_FROM` — `info@dealercms.ru`
- `MAIL_TO` — кому приходит заявка (можно несколько адресов через запятую)
- `UNISENDER_CUSTOM_BACKEND_ID` — `34717` (домен ссылок `email.dealercms.ru`)
- `NEXT_PUBLIC_SITE_URL` — `https://audit.dealercms.ru`
