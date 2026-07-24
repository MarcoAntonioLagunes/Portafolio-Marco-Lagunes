import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos requeridos." },
      { status: 400 },
    );
  }

  // TODO: conectar Resend (o el servicio de email elegido) para enviar el mensaje.

  return NextResponse.json({ ok: true });
}
