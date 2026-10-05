import VisualPanel from "./VisualPanel";
import HeroBackground from "./HeroBackground";
import AuditForm from "./AuditForm";

export default function AuditPage() {
  return (
    <main className="hero-shell">
      <HeroBackground />
      <article className="split-card reveal-card">
        <VisualPanel />
        <section className="form-panel reveal-form" aria-labelledby="form-heading">
          <div className="form-wrap">
            <h2 id="form-heading" className="form-title">
              Оставьте контакты
            </h2>
            <p className="form-lead">
              Свяжемся с вами и расскажем, где сайт может терять заявки.
            </p>
            <AuditForm />
          </div>
        </section>
      </article>
    </main>
  );
}
