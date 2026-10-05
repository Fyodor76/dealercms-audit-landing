"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { formatRuPhone } from "../lib/phone-mask";
import { auditFormSchema } from "../lib/audit-form-schema";

const INITIAL = { name: "", email: "", phone: "" };

function Field({
  icon: Icon,
  error,
  children,
}) {
  return (
    <div className={`field${error ? " is-invalid" : ""}`}>
      <div className="field-control">
        <Icon className="field-icon" size={18} aria-hidden="true" />
        {children}
      </div>
      <p className={`field-error${error ? " is-visible" : ""}`} aria-live="polite">
        {error || "\u00a0"}
      </p>
    </div>
  );
}

export default function AuditForm() {
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
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "send_failed");
      }

      setStatus("success");
    } catch {
      setStatus("idle");
      setFormError("Не удалось отправить заявку. Попробуйте позже.");
    }
  }

  if (status === "success") {
    return (
      <div className="success" role="status">
        <span className="success-icon">
          <Check size={28} strokeWidth={2.4} />
        </span>
        <h3>Спасибо! Заявка отправлена</h3>
        <p>Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form className="audit-form" onSubmit={onSubmit} noValidate>
      {formError ? <p className="form-error">{formError}</p> : null}

      <Field icon={User} error={errors.name}>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Как к вам можно обращаться?"
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
          placeholder="Ваш email"
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
          placeholder="+7 (___) ___-__-__"
          value={values.phone}
          aria-invalid={Boolean(errors.phone)}
          onChange={(event) => update("phone", formatRuPhone(event.target.value))}
        />
      </Field>

      <button className="submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="spin" size={18} />
            Отправляем...
          </>
        ) : (
          <>
            Получить аудит
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="hint">
        <LockKeyhole size={14} />
        Свяжемся только по вашему запросу.
      </p>
    </form>
  );
}
