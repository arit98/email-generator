'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function Home() {
  const [recipients, setRecipients] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const generateEmail = async () => {
    const res = await axios.post('/api/generate', { prompt });
    setGeneratedEmail(res.data.email);
  };

  const sendEmail = async () => {
    setIsSending(true);
    await axios.post('/api/send', {
      to: recipients.split(',').map(r => r.trim()),
      emailBody: generatedEmail,
    });
    setIsSending(false);
    alert('Email sent!');
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 p-6">
      <h1 className="text-2xl font-bold">AI Email Sender</h1>
      <Input
        placeholder="Recipients (comma separated)"
        value={recipients}
        onChange={e => setRecipients(e.target.value)}
      />
      <Textarea
        placeholder="Enter your email prompt..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <Button onClick={generateEmail}>Generate Email</Button>
      <Textarea
        className="h-60"
        value={generatedEmail}
        onChange={e => setGeneratedEmail(e.target.value)}
      />
      <Button disabled={isSending} onClick={sendEmail}>
        {isSending ? 'Sending...' : 'Send Email'}
      </Button>
    </div>
  );
}