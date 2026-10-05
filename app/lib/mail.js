const DEFAULT_API_BASE =
  "https://go2.unisender.ru/ru/transactional/api/v1";
const DEFAULT_BACKEND_ID = 34717;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseRecipients(raw) {
  return String(raw || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((email) => ({ email }));
}

export async function sendAuditEmail({ name, email, phone }) {
  const apiKey = process.env.UNISENDER_API_KEY;
  const apiBase = (
    process.env.UNISENDER_API_BASE || DEFAULT_API_BASE
  ).replace(/\/$/, "");
  const fromEmail = process.env.MAIL_FROM || "info@dealercms.ru";
  const fromName = process.env.MAIL_FROM_NAME || "DealerCMS";
  const recipients = parseRecipients(process.env.MAIL_TO || fromEmail);
  const customBackendId = Number(
    process.env.UNISENDER_CUSTOM_BACKEND_ID || DEFAULT_BACKEND_ID,
  );

  if (!apiKey) {
    throw new Error("UNISENDER_API_KEY is not configured");
  }

  if (recipients.length === 0) {
    throw new Error("MAIL_TO is empty");
  }

  const emailValue = email || "не указан";
  const phoneValue = phone || "не указан";
  const emailHtml = email
    ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`
    : "не указан";
  const phoneHtml = phone
    ? `<a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>`
    : "не указан";

  const subject = `Заявка на аудит сайта — ${name}`;
  const plaintext = [
    "Новая заявка на бесплатный аудит сайта",
    "",
    `Имя: ${name}`,
    `Email: ${emailValue}`,
    `Телефон: ${phoneValue}`,
  ].join("\n");

  const html = `
    <h2>Новая заявка на бесплатный аудит сайта</h2>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${emailHtml}</p>
    <p><strong>Телефон:</strong> ${phoneHtml}</p>
  `;

  const payload = {
    message: {
      recipients,
      from_email: fromEmail,
      from_name: fromName,
      ...(email ? { reply_to: email } : {}),
      subject,
      body: {
        html,
        plaintext,
      },
      options: {
        custom_backend_id: customBackendId,
      },
    },
  };

  const response = await fetch(`${apiBase}/email/send.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || String(data.status).toLowerCase() === "error") {
    const details =
      data.message || data.code || JSON.stringify(data).slice(0, 400);
    throw new Error(`Unisender send failed: ${details}`);
  }

  return data;
}
