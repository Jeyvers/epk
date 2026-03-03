import { NextResponse } from "next/server";

const NOTIFY_EMAIL = "meetjeyvers@gmail.com";
const RESEND_API_URL = "https://api.resend.com/emails";

const message = `Video 3 started playing on the Vee birthday page at ${new Date().toISOString()}`;

async function notifyDiscord(webhookUrl: string): Promise<boolean> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });
  return res.ok;
}

async function notifyResend(apiKey: string): Promise<boolean> {
  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.RESEND_FROM ?? "Vee Birthday <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      subject: "Vee birthday page — Video 3 started playing",
      html: `<p>${message}</p>`,
    }),
  });
  return res.ok;
}

export async function POST() {
  const discordUrl = process.env.DISCORD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  if (!discordUrl && !resendKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Set one of: DISCORD_WEBHOOK_URL or RESEND_API_KEY in .env.local",
      },
      { status: 503 },
    );
  }

  const results: boolean[] = [];

  if (discordUrl) {
    try {
      results.push(await notifyDiscord(discordUrl));
    } catch (e) {
      console.error("vee-notify Discord:", e);
      results.push(false);
    }
  }

  if (resendKey) {
    try {
      results.push(await notifyResend(resendKey));
    } catch (e) {
      console.error("vee-notify Resend:", e);
      results.push(false);
    }
  }

  const anyOk = results.some(Boolean);
  return NextResponse.json(
    { ok: anyOk, sent: anyOk ? "At least one notification was sent." : "All failed." },
    { status: anyOk ? 200 : 502 },
  );
}
