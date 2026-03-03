import { NextResponse } from "next/server";

const NOTIFY_EMAIL = "meetjeyvers@gmail.com";
const RESEND_API_URL = "https://api.resend.com/emails";

export async function POST() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("vee-notify: RESEND_API_KEY not set, skipping email");
    return NextResponse.json(
      { ok: false, error: "Email not configured" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Vee Birthday <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: "Vee birthday page — Video 3 started playing",
        html: `<p>Someone started playing Video 3 on the Vee birthday page.</p><p>Time: ${new Date().toISOString()}</p>`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("vee-notify: Resend error", res.status, err);
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("vee-notify:", e);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
