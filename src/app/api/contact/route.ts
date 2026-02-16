import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Rate limiting: Track requests per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

// Escape HTML to prevent XSS/HTML injection attacks
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Map role value to readable label
function getRoleLabel(role: string): string {
  const roleMap: Record<string, string> = {
    'clinic-owner': 'Clinic Owner',
    'laser-technician': 'Laser Technician',
    'industry-professional': 'Industry Professional',
    'consumer': 'Consumer',
    'other': 'Other',
  };
  return roleMap[role] || role;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { role, message, email } = body;

    // Validate required fields
    if (!role || !message || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const safeRole = escapeHtml(getRoleLabel(role));
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    // Send email using Resend
    const data = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'contact@example.com',
      replyTo: email,
      subject: `[Is It a Real Laser?] New message from ${safeRole}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2D2D2D; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #5E8B7E; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">New Contact Form Submission</h1>
            </div>

            <div style="background: #FAF9F7; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #E8E4DF; border-top: none;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #E8E4DF;">
                <p style="margin: 0 0 12px 0;">
                  <strong style="color: #5E8B7E;">Who:</strong>
                  <span style="display: inline-block; margin-left: 8px; padding: 4px 12px; background: rgba(94, 139, 126, 0.1); border-radius: 9999px; font-size: 14px;">${safeRole}</span>
                </p>
                <p style="margin: 0;">
                  <strong style="color: #5E8B7E;">Email:</strong>
                  <a href="mailto:${safeEmail}" style="color: #5E8B7E; margin-left: 8px;">${safeEmail}</a>
                </p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #E8E4DF;">
                <h2 style="color: #5E8B7E; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message</h2>
                <div style="background: #FAF9F7; padding: 16px; border-radius: 6px; border-left: 3px solid #5E8B7E;">
                  <p style="margin: 0; white-space: pre-wrap; line-height: 1.7;">${safeMessage}</p>
                </div>
              </div>

              <p style="text-align: center; margin-top: 20px; color: #5A5550; font-size: 12px;">
                Sent from Is It a Real Laser? contact form
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
