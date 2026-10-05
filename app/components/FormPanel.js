"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import AuditForm from "./AuditForm";

export default function FormPanel() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="form-panel is-success" aria-live="polite">
        <div className="success" role="status">
          <span className="success-icon">
            <Check size={28} strokeWidth={2.4} />
          </span>
          <h2 className="success-title">Спасибо! Заявка отправлена</h2>
          <p className="success-lead">
            Мы получили заявку и свяжемся с вами в ближайшее время.
          </p>
          <button
            className="success-again"
            type="button"
            onClick={() => setSubmitted(false)}
          >
            Заполнить заново
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="form-panel reveal-form" aria-labelledby="form-heading">
      <div className="form-wrap">
        <h2 id="form-heading" className="form-title">
          Оставьте контакты
        </h2>
        <p className="form-lead">
          Свяжемся с вами и расскажем, где сайт может терять заявки.
        </p>
        <AuditForm onSuccess={() => setSubmitted(true)} />
      </div>
    </section>
  );
}
