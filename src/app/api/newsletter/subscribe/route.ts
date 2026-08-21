import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Subscriber from '@/lib/models/Subscriber';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const emailClean = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailClean)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address format.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingSubscriber = await Subscriber.findOne({ email: emailClean });

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to TechTweak updates!',
          alreadySubscribed: true,
        });
      } else {
        existingSubscriber.status = 'active';
        await existingSubscriber.save();
      }
    } else {
      await Subscriber.create({
        email: emailClean,
        status: 'active',
        source: 'footer_newsletter',
      });
    }

    // Send Welcome Email & Admin Notification via SMTP
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || 'affilancersanzid@gmail.com';

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // 1. Welcome Email to Subscriber
        const welcomeHtml = `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <div style="background-color: #0f172a; padding: 28px 32px; text-align: center; border-bottom: 3px solid #2563eb;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                Tech<span style="color: #3b82f6;">Tweak</span>
              </h1>
              <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">
                Premium Smartphone Reviews & Tech Media
              </p>
            </div>
            
            <div style="padding: 32px; color: #334155; line-height: 1.6;">
              <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-top: 0;">
                🎉 Welcome to the TechTweak Community!
              </h2>
              <p style="font-size: 15px;">
                Thank you for subscribing to our newsletter. You are now first in line to receive our latest:
              </p>

              <ul style="padding-left: 20px; font-size: 14px; color: #475569; line-height: 1.8;">
                <li>🔥 In-depth Smartphone Reviews & Lab Tested Benchmarks</li>
                <li>⚡ Side-by-side Flagship Comparisons</li>
                <li>🚀 Breaking Tech News & Upcoming Launch Alerts</li>
                <li>💡 Authentic Buying Guides & Price Drops</li>
              </ul>

              <div style="margin: 28px 0; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech'}" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                  Explore Latest Smartphone Reviews →
                </a>
              </div>

              <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
                Have questions or review suggestions? Feel free to reply directly to this email!
              </p>
            </div>

            <div style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} TechTweak Platform • All rights reserved.
              </p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"TechTweak" <${smtpUser}>`,
          to: emailClean,
          subject: "🎉 Welcome to TechTweak Newsletter!",
          html: welcomeHtml,
        });

        // 2. Alert Email to Admin (Sanzid)
        const adminAlertHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; max-width: 500px;">
            <h3 style="color: #1e40af; margin-top: 0;">🚀 New Newsletter Subscriber!</h3>
            <p style="font-size: 14px; color: #334155;">
              A new visitor has just subscribed to your newsletter via the TechTweak footer:
            </p>
            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 6px; margin: 16px 0;">
              <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1e3a8a;">
                ✉️ ${emailClean}
              </p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">
                Date: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"TechTweak System" <${smtpUser}>`,
          to: adminEmail,
          subject: `[TechTweak] New Subscriber: ${emailClean}`,
          html: adminAlertHtml,
        });
      } catch (err) {
        console.error('Newsletter Email Send Error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! Check your inbox for a welcome email.',
    });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
