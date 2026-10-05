import Image from "next/image";

export default function VisualPanel() {
  return (
    <section className="visual-panel" aria-label="Заявка на аудит">
      <Image
        className="visual-photo"
        src="/hero-car.png"
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <div className="visual-overlay" aria-hidden="true" />
      <div className="visual-copy">
        <p className="visual-badge reveal reveal-badge">Бесплатный аудит</p>
        <h1 className="visual-title reveal reveal-title">
          <span className="visual-title-line">Бесплатный аудит</span>
          <span className="visual-title-line">сайта</span>
        </h1>
        <p className="visual-lead reveal reveal-lead">
          Покажем слабые места сайта и дадим
          <br />
          рекомендации по росту заявок.
        </p>
      </div>
    </section>
  );
}
