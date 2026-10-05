"use client";

import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { formatRuPhone } from "../lib/phone-mask";
import { auditFormSchema } from "../lib/audit-form-schema";

const INITIAL = { name: "", email: "", phone: "", consent: false };

function Field({ icon: Icon, error, children }) {
  const isInvalid = Boolean(error);

  return (
    <div className={`field${isInvalid ? " is-invalid" : ""}`}>
      <div className="field-control">
        <Icon className="field-icon" size={18} aria-hidden="true" />
        {children}
      </div>
      <p className={`field-error${error ? " is-visible" : ""}`} aria-live="polite">
        <span>{error || ""}</span>
      </p>
    </div>
  );
}

export default function AuditForm({ onSuccess }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setFormError("");

    const parsed = auditFormSchema.safeParse(values);
    if (!parsed.success) {
      const next = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (!next[key]) {
          next[key] = issue.message;
        }
      }
      setErrors(next);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          consent: true,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "send_failed");
      }

      onSuccess?.();
    } catch {
      setStatus("idle");
      setFormError("Не удалось отправить заявку. Попробуйте позже.");
    }
  }

  return (
    <form className="audit-form" onSubmit={onSubmit} noValidate>
      {formError ? <p className="form-error">{formError}</p> : null}

      <Field icon={User} error={errors.name}>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Ваше имя*"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          onChange={(event) => update("name", event.target.value)}
        />
      </Field>

      <Field icon={Mail} error={errors.email}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Ваш email*"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          onChange={(event) => update("email", event.target.value)}
        />
      </Field>

      <Field icon={Phone} error={errors.phone}>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="Телефон"
          value={values.phone}
          aria-invalid={Boolean(errors.phone)}
          onChange={(event) => update("phone", formatRuPhone(event.target.value))}
        />
      </Field>

      <div className={`consent${errors.consent ? " is-invalid" : ""}`}>
        <label className="consent-label">
          <input
            className="consent-input"
            type="checkbox"
            name="consent"
            checked={values.consent}
            aria-invalid={Boolean(errors.consent)}
            onChange={(event) => update("consent", event.target.checked)}
          />
          <span className="consent-box" aria-hidden="true" />
          <span className="consent-text">
            Я соглашаюсь с условиями{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              Политики обработки персональных данных
            </a>{" "}
            и даю{" "}
            <a
              href="/soglasie"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              Согласие на обработку персональных данных
            </a>
          </span>
        </label>
        <p
          className={`field-error${errors.consent ? " is-visible" : ""}`}
          aria-live="polite"
        >
          <span>{errors.consent || ""}</span>
        </p>
      </div>

      <button className="submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="spin" size={18} />
            Отправляем...
          </>
        ) : (
          <>
            Получить бесплатный аудит
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
