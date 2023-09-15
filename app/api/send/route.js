import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  const emailData = await req.json();

  console.log('===========++++++++++++++', emailData);
  const { title, description, url } = emailData;

  try {
    const data = await resend.emails.send({
      from: 'toolcenter <onboarding@resend.dev>',
      to: ['yorick.tenfeld@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ title, description, url }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
