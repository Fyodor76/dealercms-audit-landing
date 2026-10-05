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
        <p className="visual-badge reveal reveal-badge">Свяжемся с вами</p>
        <h1 className="visual-title reveal reveal-title">
          Бесплатный аудит
          <br />
          сайта
        </h1>
        <p className="visual-lead reveal reveal-lead">
          Покажем, где вы теряете обращения и что мешает конверсии.
        </p>
      </div>
    </section>
  );
}
