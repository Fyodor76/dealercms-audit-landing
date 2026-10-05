import Link from "next/link";

export default function LegalLayout({ title, children }) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="legal-header-inner">
          <Link href="/" className="legal-brand">
            DealerCMS
          </Link>
          <Link href="/" className="legal-back">
            На главную
          </Link>
        </div>
      </header>
      <main className="legal-main">
        <h1 className="legal-title">{title}</h1>
        {children}
      </main>
    </div>
  );
}
