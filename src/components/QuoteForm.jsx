'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const N8N_WEBHOOK_URL = 'https://your-n8n-domain.com/webhook/lead-capture';

const trustBadges = [
  { icon: '⚡', text: 'Response within 24 hours' },
  { icon: '🔒', text: 'Your info stays private' },
  { icon: '📋', text: 'No commitment required' },
  { icon: '💬', text: 'Talk to a real strategist' },
];

const CheckMark = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/* ── Animated text input / textarea ─────────────────────────── */
function AnimatedField({ label, required, multiline, wrapClass = '', ...props }) {
  const wrapRef  = useRef(null);
  const checkRef = useRef(null);
  const prevLen  = useRef(0);

  const animate = (value) => {
    const len = value.length;
    // First character typed → spring pulse on the wrapper
    if (len === 1 && prevLen.current === 0) {
      gsap.fromTo(wrapRef.current,
        { scale: 1.012 },
        { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.4)' }
      );
    }
    // Field filled → checkmark springs in
    if (len > 0 && prevLen.current === 0) {
      gsap.fromTo(checkRef.current,
        { scale: 0, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' }
      );
    }
    // Field cleared → checkmark disappears
    if (len === 0 && prevLen.current > 0) {
      gsap.to(checkRef.current, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
    }
    prevLen.current = len;
  };

  const handleChange = (e) => {
    props.onChange?.(e);
    animate(e.target.value);
  };

  const baseClass =
    'w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm';

  return (
    <div className={wrapClass}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          {label}{required && ' *'}
        </label>
      )}
      <div ref={wrapRef} className="relative">
        {multiline ? (
          <textarea {...props} onChange={handleChange} className={`${baseClass} resize-none`} />
        ) : (
          <input {...props} onChange={handleChange} className={baseClass} />
        )}
        {/* Animated checkmark */}
        <span
          ref={checkRef}
          className="absolute right-3 top-3.5 text-teal-500 pointer-events-none"
          style={{ opacity: 0, transform: 'scale(0)' }}
        >
          <CheckMark />
        </span>
      </div>
    </div>
  );
}

/* ── Animated select ─────────────────────────────────────────── */
function AnimatedSelect({ label, children, wrapClass = '', ...props }) {
  const wrapRef  = useRef(null);
  const checkRef = useRef(null);
  const triggered = useRef(false);

  const handleChange = (e) => {
    props.onChange?.(e);
    if (!triggered.current) {
      triggered.current = true;
      gsap.fromTo(wrapRef.current,
        { scale: 1.01 },
        { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' }
      );
      gsap.fromTo(checkRef.current,
        { scale: 0, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' }
      );
    }
  };

  return (
    <div className={wrapClass}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          {label}
        </label>
      )}
      <div ref={wrapRef} className="relative">
        <select
          {...props}
          onChange={handleChange}
          className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm appearance-none cursor-pointer"
        >
          {children}
        </select>
        <span
          ref={checkRef}
          className="absolute right-3 top-3.5 text-teal-500 pointer-events-none"
          style={{ opacity: 0, transform: 'scale(0)' }}
        >
          <CheckMark />
        </span>
      </div>
    </div>
  );
}

/* ── Main Form ───────────────────────────────────────────────── */
export default function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'Shopify Store Development',
    estimatedBudget: '$1,000 – $3,000',
    requirements: '',
  });
  const [status, setStatus]         = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef  = useRef(null);
  const formCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formCardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const set = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleFocus = () =>
    gsap.to(formCardRef.current, { boxShadow: '0 25px 60px -12px rgba(99,102,241,0.13)', duration: 0.4 });

  const handleBlur = () =>
    gsap.to(formCardRef.current, { boxShadow: '0 20px 25px -5px rgba(0,0,0,0.08)', duration: 0.4 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const btn = e.target.querySelector('button[type="submit"]');
    gsap.timeline()
      .to(btn, { scale: 0.96, duration: 0.1 })
      .to(btn, { scale: 1, duration: 0.25, ease: 'power2.out' });

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'NexusFlow Landing Page',
        }),
      });
      if (response.ok) {
        setStatus({ type: 'success', message: "You're all set! We'll send your custom proposal within 24 hours." });
        setFormData({
          fullName: '', email: '', phone: '', company: '',
          serviceRequired: 'Shopify Store Development',
          estimatedBudget: '$1,000 – $3,000', requirements: '',
        });
      } else {
        throw new Error('Server error');
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please email us at hello@nexusflow.io' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote-form" ref={sectionRef} className="py-28 px-4 bg-white">
      <div className="max-w-2xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">Get Started</span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mt-2">
            Start{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">
              Your Project
            </span>{' '}
            Today
          </h2>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Tell us what you need and we'll build a custom proposal with timeline and budget — no strings attached.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
              <span>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>

        <div
          ref={formCardRef}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/60"
          style={{ opacity: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedField
                label="Full Name" required
                type="text" name="fullName"
                value={formData.fullName} onChange={set('fullName')}
                onFocus={handleFocus} onBlur={handleBlur}
                placeholder="Jane Smith"
              />
              <AnimatedField
                label="Email Address" required
                type="email" name="email"
                value={formData.email} onChange={set('email')}
                onFocus={handleFocus} onBlur={handleBlur}
                placeholder="jane@company.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedField
                label="Phone Number"
                type="tel" name="phone"
                value={formData.phone} onChange={set('phone')}
                onFocus={handleFocus} onBlur={handleBlur}
                placeholder="+1 (555) 019-9000"
              />
              <AnimatedField
                label="Company Name"
                type="text" name="company"
                value={formData.company} onChange={set('company')}
                onFocus={handleFocus} onBlur={handleBlur}
                placeholder="Acme Inc."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedSelect
                label="Service Needed"
                name="serviceRequired"
                value={formData.serviceRequired} onChange={set('serviceRequired')}
                onFocus={handleFocus} onBlur={handleBlur}
              >
                <option>Shopify Store Development</option>
                <option>Custom Web Development (React)</option>
                <option>Meta Ads (Facebook & Instagram)</option>
                <option>Google Search & Performance Max</option>
                <option>LinkedIn B2B Advertising</option>
                <option>Full-Suite Growth Marketing</option>
                <option>Conversion Rate Optimization</option>
              </AnimatedSelect>

              <AnimatedSelect
                label="Monthly Budget"
                name="estimatedBudget"
                value={formData.estimatedBudget} onChange={set('estimatedBudget')}
                onFocus={handleFocus} onBlur={handleBlur}
              >
                <option>Under $1,000</option>
                <option>$1,000 – $3,000</option>
                <option>$3,000 – $7,000</option>
                <option>$7,000 – $15,000</option>
                <option>$15,000+</option>
              </AnimatedSelect>
            </div>

            <AnimatedField
              label="Project Details" required
              multiline
              name="requirements" rows="4"
              value={formData.requirements} onChange={set('requirements')}
              onFocus={handleFocus} onBlur={handleBlur}
              placeholder="Describe your goals, current challenges, and any specific requirements..."
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold py-4 rounded-xl text-sm uppercase tracking-wider text-white transition-all duration-300 ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
              }`}
            >
              {isSubmitting ? 'Sending your request...' : 'Request My Free Proposal — No Commitment →'}
            </button>

            <p className="text-center text-xs text-slate-400 -mt-2">
              We review every submission manually and reply with a tailored proposal — not a generic template.
            </p>

            {status.message && (
              <div className={`mt-2 p-4 rounded-xl text-center text-sm font-semibold border ${
                status.type === 'success'
                  ? 'bg-teal-50 text-teal-800 border-teal-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
