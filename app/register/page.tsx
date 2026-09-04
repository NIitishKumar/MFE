'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name || 'Valued Member');
    router.push('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-[#A39B8F] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B89758]" /> New Residence Registration
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
          Create an Account
        </h1>
        <p className="text-xs text-[#78716C]">
          Enjoy personalized white-glove coordination, order tracking, and trade privileges.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE7DC] shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#57534E] font-medium mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Iyer"
                className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#57534E] font-medium mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@example.in"
                className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#57534E] font-medium mb-1">Mobile Number (+91) *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98450 00000"
                className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#57534E] font-medium mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-[#F2ECE1] text-center text-xs text-[#78716C]">
          <span>Already registered? </span>
          <Link href="/login" className="font-semibold text-[#443224] hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
