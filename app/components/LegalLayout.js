export default function LegalLayout({ title, children }) {
  return (
    <div className="legal-page">
      <main className="legal-main">
        <h1 className="legal-title">{title}</h1>
        {children}
      </main>
    </div>
  );
}
