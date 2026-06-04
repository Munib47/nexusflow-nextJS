'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: "For web and Shopify builds, most projects go live in 2–4 weeks depending on complexity. Ad campaigns are usually live within 5–7 business days of onboarding. We move fast because we use pre-built systems for common patterns — but we never sacrifice quality to hit a deadline.",
  },
  {
    q: 'What do you need from me to get started?',
    a: "To kick off, we need: access to your existing accounts (ad accounts, website, analytics), your brand assets (logo, colors, fonts), and a clear brief on your goals and target customer. Most clients have these ready in a single onboarding call. We handle everything else.",
  },
  {
    q: 'How does pricing work — is it a monthly retainer or project-based?',
    a: "Both, depending on the service. Web and Shopify development are priced per project (fixed scope, fixed cost). Ad management and ongoing growth marketing are monthly retainers. We'll always give you a clear breakdown before you commit — no surprises on your invoice.",
  },
  {
    q: 'Do you require a long-term contract?',
    a: "For ad management, we ask for a minimum 3-month engagement. That's the honest timeline needed to gather data, test, and optimize to the point where results are predictable. After that, it's month-to-month. For web builds, there's no ongoing commitment unless you want a maintenance plan.",
  },
  {
    q: "How do I stay updated on my project's progress?",
    a: "Every client gets a dedicated Slack channel with their account lead. We send weekly performance reports for ad accounts, and use a shared project board (Notion or Trello) for web builds. You'll always know where things stand — no chasing us for updates.",
  },
  {
    q: 'What results can I realistically expect in the first 30–60 days?',
    a: "Ad campaigns: in the first 30 days, we're in the testing and data-gathering phase. Expect stable spend with improving metrics. By day 60, you should see clear ROAS trends and the first scaling signals. For web builds, results (conversion rate lift, speed gains) are visible immediately after launch.",
  },
  {
    q: 'Can you take over my existing website or ad accounts, or do you start from scratch?',
    a: "Both. We regularly inherit existing accounts and websites. We'll audit what's already there — keeping what works, rebuilding what's underperforming. If you're starting from scratch, we'll build the foundation right the first time so scaling later is straightforward.",
  },
  {
    q: 'Do you only work with US-based clients?',
    a: "Our primary focus is the US market — that's where our case studies, platform expertise, and networks are strongest. That said, we work with clients outside the US as long as the target audience or ad spend is US-focused. Reach out and we'll let you know if we're a fit.",
  },
  {
    q: 'Do you handle everything in-house or do you outsource?',
    a: "Everything is handled in-house. We don't white-label work or hand it off to freelancers. The team you onboard with is the team that builds and manages your project. This is a non-negotiable for us — it's the only way to guarantee the quality we promise.",
  },
  {
    q: "What if I'm not happy with the results?",
    a: "We stand behind our work. If you're not seeing agreed-upon benchmarks, we'll diagnose the issue together and adjust at no extra cost. We also do a thorough audit before starting so we only take on projects we're genuinely confident we can deliver results for.",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.42, ease: 'power3.out' }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
    }
  }, [isOpen]);

  return (
    <div className={`border-b border-slate-200 last:border-0 ${isOpen ? 'bg-indigo-50/40' : ''} transition-colors duration-300`}>
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between py-5 px-6 text-left gap-4 group"
      >
        <span className={`font-semibold text-sm md:text-base leading-snug ${isOpen ? 'text-indigo-700' : 'text-slate-800 group-hover:text-indigo-600'} transition-colors`}>
          {faq.q}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            isOpen ? 'border-indigo-500 bg-indigo-500 text-white rotate-45' : 'border-slate-300 text-slate-500 group-hover:border-indigo-400'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div ref={contentRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed max-w-3xl">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const accordionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        accordionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: accordionRef.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section id="faq" ref={sectionRef} className="py-28 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">FAQ</span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight mt-2">
            Questions We{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">
              Always
            </span>{' '}
            Get Asked
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
            Everything you'd want to know before hiring an agency — answered straight.
          </p>
        </div>

        <div
          ref={accordionRef}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200"
          style={{ opacity: 0 }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={toggle}
            />
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Still have questions?{' '}
          <a href="#quote-form" className="text-indigo-600 font-semibold hover:underline">
            Send us a message →
          </a>
        </p>
      </div>
    </section>
  );
}
