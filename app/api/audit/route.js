import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { auditFormSchema } from "../../lib/audit-form-schema";
import { sendAuditEmail } from "../../lib/mail";

export async function POST(request) {
  try {
    const body = await request.json();
    const data = auditFormSchema.parse(body);

    await sendAuditEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Некорректные данные формы", details: error.issues },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      error.message.includes("UNISENDER_API_KEY")
    ) {
      console.error("Audit form: Unisender is not configured");
      return NextResponse.json(
        { error: "Сервис отправки временно недоступен" },
        { status: 503 },
      );
    }

    console.error("Audit form send error:", error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 500 },
    );
  }
}
