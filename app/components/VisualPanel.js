import Image from "next/image";

export default function VisualPanel() {
  return (
    <section className="visual-panel" aria-label="Заявка на аудит">
      <Image
        className="visual-photo"
        src="/hero-showroom.png"
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <div className="visual-overlay" aria-hidden="true" />
      <div className="visual-copy">
        <p className="visual-badge reveal reveal-badge">
          Бесплатный аудит для дилеров
        </p>
        <h1 className="visual-title reveal reveal-title">
          <span className="visual-title-line">Узнайте, где ваш сайт</span>
          <span className="visual-title-line">теряет заявки</span>
        </h1>
        <p className="visual-lead reveal reveal-lead">
          Проверим видимость по моделям, наличию и сервисным запросам, а также
          путь посетителя до звонка, заявки или записи на сервис. Покажем точки
          роста и дадим приоритетные рекомендации.
        </p>
      </div>
    </section>
  );
}
