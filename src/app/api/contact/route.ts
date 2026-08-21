import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/mongodb/mongoose';
import ContactMessage from '@/lib/models/ContactMessage';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (Name, Email, Subject, Message) are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Save message to MongoDB
    await connectToDatabase();
    const savedMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'unread',
    });

    // 2. Send email via SMTP if configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || 'affilancersanzid@gmail.com';

    let emailSent = false;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const port = Number(process.env.SMTP_PORT) || 465;
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port,
          secure: port === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const htmlContent = `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <div style="background-color: #0f172a; padding: 24px 32px; border-bottom: 2px solid #2563eb;">
              <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
                Tech<span style="color: #3b82f6;">Tweak</span> <span style="font-weight: 400; font-size: 14px; color: #94a3b8;">| New Contact Inquiry</span>
              </h2>
            </div>
            
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">From</p>
                <h3 style="margin: 0; font-size: 18px; color: #0f172a; font-weight: 700;">${name}</h3>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #2563eb; font-weight: 500;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </p>
              </div>

              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Subject</p>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; font-size: 15px; font-weight: 600; color: #1e293b;">
                  ${subject}
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Message Content</p>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
${message}
                </div>
              </div>

              <div style="padding: 16px; background-color: #eff6ff; border-radius: 10px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; font-size: 12px; color: #1e40af;">
                  💡 <strong>Quick Action:</strong> Click &ldquo;Reply&rdquo; in your email client to directly respond to <strong>${email}</strong>.
                </p>
              </div>
            </div>

            <div style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} TechTweak Platform • Message ID: #${savedMessage._id}
              </p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"TechTweak Contact" <${smtpUser}>`,
          to: receiverEmail,
          replyTo: `"${name}" <${email}>`,
          subject: `[TechTweak Contact] ${subject} - from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: htmlContent,
        });

        emailSent = true;
      } catch (mailError) {
        console.error('SMTP Mail Sending Error:', mailError);
        // Message is still saved in DB, so we do not fail the request
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      id: savedMessage._id,
      emailSent,
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
