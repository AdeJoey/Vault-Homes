import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sanitizeFormData, escapeHtml } from "@/lib/sanitize";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX) return true;
  record.count++;
  return false;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ success: false, message: "Invalid content type" }, { status: 415 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the form for errors.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ success: true, message: "Message sent." });
  }

  const data = sanitizeFormData(parsed.data);

  try {
    await resend.emails.send({
      from: "Vault Homes <notifications@vaulthomes.com>",
      to: [process.env.NOTIFICATION_EMAIL || "adelajajoseph10@gmail.com"],
      replyTo: data.email,
      subject: `✉️ New Contact Message — ${data.fullName}`,
      html: buildContactEmailHtml(data),
    });

    return NextResponse.json(
      { success: true, message: "Your message has been received. We'll get back to you shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Email send failed:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function buildContactEmailHtml(data: ReturnType<typeof sanitizeFormData>): string {
  const timestamp = new Date().toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; background: #f9f9f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
    .header { background: #1a1a1a; color: #ffffff; padding: 32px; }
    .badge { display: inline-block; background: #c9a96e; color: #1a1a1a; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 6px 14px; border-radius: 100px; margin-bottom: 16px; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
    .body { padding: 32px; }
    .field-label { color: #888; font-size: 13px; margin-bottom: 4px; }
    .field-value { font-weight: 500; margin-bottom: 20px; }
    .message-box { background: #f9f9f9; border-left: 3px solid #c9a96e; padding: 16px; border-radius: 4px; white-space: pre-wrap; }
    .footer { background: #f5f5f5; padding: 20px 32px; font-size: 12px; color: #888; }
    .reply-btn { display: inline-block; margin-top: 20px; background: #c9a96e; color: #1a1a1a; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="badge">Contact</div>
    <h1>New message from the website</h1>
  </div>
  <div class="body">
    <div class="field-label">Name</div>
    <div class="field-value">${escapeHtml(String(data.fullName))}</div>
    <div class="field-label">Email</div>
    <div class="field-value">${escapeHtml(String(data.email))}</div>
    <div class="field-label">Message</div>
    <div class="message-box">${escapeHtml(String(data.message))}</div>
    <div style="margin-top: 8px; color: #888; font-size: 12px;">Received: ${timestamp}</div>
    <a href="mailto:${escapeHtml(String(data.email))}" class="reply-btn">Reply to ${escapeHtml(String(data.fullName))}</a>
  </div>
  <div class="footer">
    This notification was generated by vaulthomes.com. Lead type: CONTACT.
  </div>
</div>
</body>
</html>
  `.trim();
}
