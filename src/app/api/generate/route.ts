import { NextResponse } from 'next/server';

export async function POST(req:Request) {
  const { prompt } = await req.json();

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are an assistant that writes professional emails.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return NextResponse.json({ email: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate email.' }, { status: 500 });
  }
}
