'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
          Password Recovery
        </h1>
        <p className="text-xs text-[#78716C]">
          Enter your account email to receive reset instructions.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE7DC] shadow-sm">
        {sent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF3ED] text-[#2D3E33] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Reset Link Dispatched
            </h3>
            <p className="text-xs text-[#78716C]">
              We have sent a secure password reset link to <strong>{email}</strong>.
            </p>
            <div className="pt-3">
              <Link
                href="/login"
                className="inline-block bg-[#2C241E] text-white text-xs font-semibold py-3 px-6 rounded-xl"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#57534E] font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aditya@example.in"
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Recovery Email</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <Link href="/login" className="text-xs text-[#443224] hover:underline inline-flex items-center gap-1">
                <ChevronLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
