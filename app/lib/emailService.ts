import { Resend } from "resend";
import nodemailer from "nodemailer";

export interface EmailPayload {
  name: string;
  email: string;
  message: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
}

const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "nikhileshchavdawork@gmail.com";

export async function sendContactNotificationEmail(payload: EmailPayload): Promise<boolean> {
  const subject = `New Portfolio Contact - ${payload.name}`;
  
  const textContent = `
NEW PORTFOLIO CONTACT SUBMISSION

Name: ${payload.name}
Email: ${payload.email}
Message:
${payload.message}

--------------------------------------------------
Timestamp: ${payload.createdAt}
IP Address: ${payload.ip || "Unknown"}
User Agent: ${payload.userAgent || "Unknown"}
  `.trim();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #f4f4f4; border: 1px solid #222; border-radius: 12px;">
      <h2 style="color: #00ffff; margin-top: 0; border-b: 1px solid #333; padding-bottom: 10px;">New Portfolio Contact</h2>
      
      <p style="margin: 12px 0;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin: 12px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}" style="color: #38bdf8;">${escapeHtml(payload.email)}</a></p>
      
      <div style="margin: 20px 0; padding: 15px; background-color: #141414; border-left: 4px solid #00ffff; border-radius: 6px;">
        <strong style="color: #aaa; display: block; margin-bottom: 8px;">Message:</strong>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #fff;">${escapeHtml(payload.message)}</p>
      </div>

      <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />

      <table style="width: 100%; font-size: 12px; color: #777;">
        <tr>
          <td><strong>Timestamp:</strong></td>
          <td>${payload.createdAt}</td>
        </tr>
        <tr>
          <td><strong>IP Address:</strong></td>
          <td>${payload.ip || "N/A"}</td>
        </tr>
        <tr>
          <td><strong>User Agent:</strong></td>
          <td>${payload.userAgent || "N/A"}</td>
        </tr>
      </table>
    </div>
  `.trim();

  // Primary Attempt: Resend API
  if (process.env.RESEND_API_KEY) {
    try {
      console.log("[EmailService] Attempting delivery via Resend...");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const resendResult = await resend.emails.send({
        from: process.env.RESEND_SENDER_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
        to: RECEIVER_EMAIL,
        subject,
        text: textContent,
        html: htmlContent,
        replyTo: payload.email,
      });

      if (resendResult.data?.id) {
        console.log("[EmailService] Delivered via Resend. ID:", resendResult.data.id);
        return true;
      }
      if (resendResult.error) {
        console.error("[EmailService] Resend API returned error:", resendResult.error);
      }
    } catch (resendErr) {
      console.error("[EmailService] Resend exception:", resendErr);
    }
  }

  // Fallback Attempt: Nodemailer (SMTP)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      console.log("[EmailService] Attempting fallback delivery via Nodemailer SMTP...");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: RECEIVER_EMAIL,
        replyTo: payload.email,
        subject,
        text: textContent,
        html: htmlContent,
      });

      console.log("[EmailService] Delivered via Nodemailer SMTP.");
      return true;
    } catch (smtpErr) {
      console.error("[EmailService] Nodemailer SMTP exception:", smtpErr);
    }
  }

  console.warn("[EmailService] No active email service succeeded or credentials missing. Email delivery skipped.");
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
