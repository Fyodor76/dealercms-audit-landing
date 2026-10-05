import { z } from "zod";
import { RU_PHONE_MASK_REGEX } from "./phone-mask";

export const auditFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Введите имя")
      .max(100, "Имя слишком длинное"),
    email: z
      .string()
      .trim()
      .min(1, "Введите email")
      .email("Введите email"),
    phone: z.string().trim(),
    consent: z
      .boolean()
      .refine((value) => value === true, {
        message: "Нужно согласие на обработку данных",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.phone.length > 0 && !RU_PHONE_MASK_REGEX.test(data.phone)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Введите телефон",
      });
    }
  });
