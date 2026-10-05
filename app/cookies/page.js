import Link from "next/link";
import LegalLayout from "../components/LegalLayout";
import {
  LEGAL_ADDRESS,
  LEGAL_ENTITY_SHORT,
  LEGAL_INN,
  LEGAL_POLICY_DATE,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_PHONE_TEL,
  SITE_URL,
} from "../lib/site";

export const metadata = {
  title: "Политика использования cookie",
  description:
    "Политика использования cookie-файлов на сайте DealerCMS: какие cookie применяются и как ими управлять.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  const siteHost = SITE_URL.replace(/^https?:\/\//, "");

  return (
    <LegalLayout title="Политика использования cookie">
      <p className="legal-date">Дата публикации: {LEGAL_POLICY_DATE}</p>

      <div className="legal-body legal-body-spaced">
        <section>
          <h2 className="legal-h2">1. Оператор</h2>
          <p>
            Сайтом {siteHost} управляет {LEGAL_ENTITY_SHORT} (ИНН {LEGAL_INN}),
            юридический адрес: {LEGAL_ADDRESS}. Обработка данных, связанных с
            cookie, осуществляется в соответствии с{" "}
            <Link href="/privacy">Политикой обработки персональных данных</Link>
            .
          </p>
        </section>

        <section>
          <h2 className="legal-h2">2. Что такое cookie</h2>
          <p>
            Cookie — это небольшие текстовые файлы, которые сохраняются на вашем
            устройстве при посещении сайта DealerCMS (далее — «Сайт»). Они
            помогают Сайту запоминать ваши настройки и обеспечивать корректную
            работу.
          </p>
        </section>

        <section>
          <h2 className="legal-h2">3. Какие cookie мы используем</h2>
          <ul className="legal-list">
            <li>
              <strong>Необходимые</strong> — обеспечивают базовую работу Сайта,
              например сохранение вашего согласия на использование cookie.
            </li>
            <li>
              <strong>Аналитические</strong> — помогают понять, как посетители
              используют Сайт, чтобы улучшать его работу (например, сервисы
              веб-аналитики).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="legal-h2">4. Зачем мы используем cookie</h2>
          <ul className="legal-list">
            <li>Обеспечение корректной работы Сайта</li>
            <li>Сохранение пользовательских настроек</li>
            <li>Анализ посещаемости и улучшение пользовательского опыта</li>
          </ul>
        </section>

        <section>
          <h2 className="legal-h2">5. Как управлять cookie</h2>
          <p>
            Вы можете отключить или удалить cookie в настройках вашего браузера.
            Обратите внимание: при отключении cookie некоторые функции Сайта
            могут работать некорректно.
          </p>
          <p>
            Инструкции по управлению cookie доступны в справке вашего браузера
            (Chrome, Safari, Firefox, Edge и др.).
          </p>
        </section>

        <section>
          <h2 className="legal-h2">6. Срок хранения</h2>
          <p>
            Необходимые cookie хранятся до истечения срока их действия или до
            удаления вами. Срок хранения аналитических cookie зависит от
            используемого сервиса и обычно составляет от нескольких месяцев до
            одного года.
          </p>
        </section>

        <section>
          <h2 className="legal-h2">7. Контакты</h2>
          <p>
            По вопросам использования cookie обращайтесь:{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>, тел.{" "}
            <a href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE}</a>, адрес:{" "}
            {LEGAL_ADDRESS}.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
