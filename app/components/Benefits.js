import { Check } from "lucide-react";

const ITEMS = [
  "Индивидуальные рекомендации",
  "Конкретные шаги для роста заявок",
  "Решения под ваш сайт и нишу",
];

export default function Benefits() {
  return (
    <ul className="benefits">
      {ITEMS.map((item) => (
        <li key={item} className="benefit reveal reveal-item">
          <span className="benefit-icon">
            <Check size={16} strokeWidth={2.6} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
