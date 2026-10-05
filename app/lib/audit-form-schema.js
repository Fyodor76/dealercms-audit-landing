import { z } from "zod";
import { RU_PHONE_MASK_REGEX } from "./phone-mask";

export const auditFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введите имя")
    .max(100, "Имя слишком длинное"),
  email: z
    .string()
    .trim()
    .min(1, "Введите email")
    .email("Введите корректный email"),
  phone: z
    .string()
    .trim()
    .regex(RU_PHONE_MASK_REGEX, "Введите номер полностью"),
});
