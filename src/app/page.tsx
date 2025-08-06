'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ThemeToggle } from '@/components/theme-toggle';
import { Mail, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [recipients, setRecipients] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEmail = async () => {
    try {
      setIsGenerating(true);
      const res = await axios.post('/api/generate', { prompt });
      setGeneratedEmail(res.data.email);
    } catch (error) {
      toast.error('Failed to generate email.');
    } finally {
      setIsGenerating(false);
    }
  };

  const sendEmail = async () => {
    try {
      setIsSending(true);
      await axios.post('/api/send', {
        to: recipients.split(',').map(r => r.trim()),
        emailBody: generatedEmail,
      });
      toast.success('Email sent!');
    } catch (error) {
      toast.error('Failed to send email.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 transition-colors duration-300">
      <ToastContainer />
      <div className="max-w-2xl mx-auto space-y-8 py-8">
        {/* Theme Toggle */}
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-600 dark:bg-blue-500 rounded-xl shadow-lg transition-colors duration-200">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-200">AI Email Sender</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto transition-colors duration-200">
            Create professional emails with AI assistance and send them to multiple recipients
          </p>
        </div>

        {/* Main Form */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-colors duration-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl flex items-center space-x-2 text-gray-900 dark:text-white">
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Email Composer</span>
            </CardTitle>
            <CardDescription className="dark:text-gray-300">
              Generate and send professional emails with AI assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              placeholder="Recipients (comma separated)"
              value={recipients}
              onChange={e => setRecipients(e.target.value)}
              className="h-12 text-base border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-colors duration-200"
            />

            <Textarea
              placeholder="Enter your email prompt..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="min-h-32 text-base border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 resize-none dark:bg-slate-700 dark:text-white transition-colors duration-200"
            />

            <Button
              onClick={generateEmail}
              className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 transition-all duration-200"
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Email
                </>
              )}
            </Button>

            <Textarea
              className="h-60 text-sm font-mono border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 resize-none dark:bg-slate-700 dark:text-white transition-colors duration-200"
              value={generatedEmail}
              onChange={e => setGeneratedEmail(e.target.value)}
              placeholder="Your generated email will appear here..."
            />

            <Button
              disabled={isSending || !generatedEmail.trim() || !recipients.trim()}
              onClick={sendEmail}
              className="w-full h-12 text-base bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:opacity-50 transition-all duration-200"
            >
              {isSending ? 'Sending...' : 'Send Email'}
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 shadow-md transition-colors duration-200">
            <Sparkles className="h-6 w-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-800 dark:text-white">AI-Powered</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Generate professional emails</p>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 shadow-md transition-colors duration-200">
            <Mail className="h-6 w-6 mx-auto mb-2 text-green-600 dark:text-green-400" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Bulk Sending</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Send to multiple recipients</p>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 shadow-md transition-colors duration-200">
            <div className="w-6 h-6 mx-auto mb-2 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Professional</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Business-ready content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
