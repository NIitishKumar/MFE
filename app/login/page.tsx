'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();

  const [email, setEmail] = useState('aditya.sharma@example.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'Aditya Sharma');
    router.push('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-[#A39B8F] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B89758]" /> Client Portal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
          Welcome back
        </h1>
        <p className="text-xs text-[#78716C]">
          Sign in to view your residence orders, saved wishlist, and addresses.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE7DC] shadow-sm space-y-6">
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
                className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#57534E] font-medium">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-[#443224] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#57534E]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#443224] rounded-sm"
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-[#F2ECE1] text-center text-xs text-[#78716C]">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="font-semibold text-[#443224] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
