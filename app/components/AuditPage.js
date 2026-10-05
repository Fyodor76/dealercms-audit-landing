import VisualPanel from "./VisualPanel";
import HeroBackground from "./HeroBackground";
import FormPanel from "./FormPanel";

export default function AuditPage() {
  return (
    <main className="hero-shell">
      <HeroBackground />
      <article className="split-card reveal-card">
        <VisualPanel />
        <FormPanel />
      </article>
    </main>
  );
}
