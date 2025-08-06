import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req:Request) {
  const { to, emailBody } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'AI Generated Email',
      html: `<p>${emailBody.replace(/\n/g, '<br>')}</p>`
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email send failed:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}