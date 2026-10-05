export function formatRuPhone(input) {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.startsWith("7")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (!digits) {
    return "";
  }

  let formatted = "+7 (";
  formatted += digits.slice(0, 3);

  if (digits.length <= 3) {
    return formatted;
  }

  formatted += `) ${digits.slice(3, 6)}`;

  if (digits.length <= 6) {
    return formatted;
  }

  formatted += `-${digits.slice(6, 8)}`;

  if (digits.length <= 8) {
    return formatted;
  }

  formatted += `-${digits.slice(8, 10)}`;
  return formatted;
}

export const RU_PHONE_MASK_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
