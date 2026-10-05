# dealercms-form-audit

Standalone-страница заявки на бесплатный аудит сайта. Стиль DigiCod, отправка писем через Unisender Go — тот же канал, что у `sender` / `request.storage`.

## Запуск

```bash
npm install --registry=https://registry.npmjs.org/
npm run dev
```

Откройте http://localhost:3000

## Почта

Письмо уходит через Unisender Go:

`POST https://go2.unisender.ru/ru/transactional/api/v1/email/send.json`

Переменные в `.env.local` (см. `.env.example`):

- `UNISENDER_API_KEY` — ключ API
- `MAIL_FROM` — `info@dealercms.ru`
- `MAIL_TO` — кому приходит заявка (можно несколько адресов через запятую)
- `UNISENDER_CUSTOM_BACKEND_ID` — `34717` (домен ссылок `email.dealercms.ru`)
