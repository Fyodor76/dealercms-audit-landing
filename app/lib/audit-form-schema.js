import { z } from "zod";
import { RU_PHONE_MASK_REGEX } from "./phone-mask";

export const auditFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Введите имя")
      .max(100, "Имя слишком длинное"),
    email: z.string().trim(),
    phone: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    const hasEmail = data.email.length > 0;
    const hasPhone = data.phone.length > 0;

    if (!hasEmail && !hasPhone) {
      ctx.addIssue({
        code: "custom",
        path: ["contact"],
        message: "Укажите email или телефон",
      });
      return;
    }

    if (hasEmail && !z.string().email().safeParse(data.email).success) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Введите email",
      });
    }

    if (hasPhone && !RU_PHONE_MASK_REGEX.test(data.phone)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Введите телефон",
      });
    }
  });
