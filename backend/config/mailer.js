import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendProjectConfirmation({
  name,
  email,
  companyName,
  projectType,
  selectedDate,
  selectedTime,
  meetUrl,
}) {
  await transporter.sendMail({
    from: `"Phronix" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Phronix Discovery Call is Confirmed",

    text: `
Hi ${name},

Your Phronix discovery call has been confirmed.

Project: ${companyName}
Project Type: ${projectType}

Date: ${selectedDate}
Time: ${selectedTime}

Google Meet:
${meetUrl}

We look forward to speaking with you.

— Phronix Team
    `.trim(),

    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Your Phronix Discovery Call is Confirmed</h2>

        <p>Hi ${name},</p>

        <p>
          Your discovery call with the Phronix team has been scheduled.
        </p>

        <p>
          <strong>Project:</strong> ${companyName}<br/>
          <strong>Project Type:</strong> ${projectType}<br/>
          <strong>Date:</strong> ${selectedDate}<br/>
          <strong>Time:</strong> ${selectedTime}
        </p>

        <p>
          <a
            href="${meetUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#38bdf8;
              color:#06111f;
              text-decoration:none;
              border-radius:8px;
              font-weight:bold;
            "
          >
            Join Google Meet
          </a>
        </p>

        <p>
          Looking forward to speaking with you.
        </p>

        <p>— Phronix Team</p>
      </div>
    `,
  });
}