'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clientTypes = [
  {
    id: 'ecommerce',
    emoji: '🛒',
    title: 'E-commerce Brand',
    subtitle: 'I sell products online and want more sales',
    accentColor: 'indigo',
    borderSel: 'border-indigo-500',
    bgSel: 'bg-indigo-50',
    textAccent: 'text-indigo-700',
    pillBg: 'bg-indigo-100 text-indigo-700',
    iconBg: 'bg-indigo-100',
    services: ['Shopify Store Development', 'Meta & Google Ads', 'Conversion Rate Optimization'],
    whatYouNeed: [
      'A high-converting Shopify store (or optimized existing one)',
      'Meta (Facebook/Instagram) & Google Shopping campaigns',
      'Product pages with tested copy, images, and clear CTAs',
      'Retargeting flows for abandoned carts and warm audiences',
    ],
    outcome: 'E-commerce brands we work with see an average 35–60% revenue lift within the first 90 days.',
    budget: '$2,500 – $8,000 / month',
    timeline: 'First measurable results in 2–4 weeks',
  },
  {
    id: 'b2b',
    emoji: '💼',
    title: 'B2B Service Company',
    subtitle: 'I sell to other businesses and need qualified leads',
    accentColor: 'violet',
    borderSel: 'border-violet-500',
    bgSel: 'bg-violet-50',
    textAccent: 'text-violet-700',
    pillBg: 'bg-violet-100 text-violet-700',
    iconBg: 'bg-violet-100',
    services: ['Custom Web Development', 'LinkedIn B2B Advertising', 'Google Search Campaigns'],
    whatYouNeed: [
      'A professional website that positions you as the credible expert',
      'LinkedIn ads targeting decision-makers by title, industry & company size',
      'Google Search campaigns capturing buyers actively searching for your service',
      'A clear lead capture flow — contact forms, calendars, or gated content',
    ],
    outcome: 'Our B2B clients typically see 2–4× more qualified demo requests and pipeline within 60 days.',
    budget: '$3,000 – $10,000 / month',
    timeline: 'First qualified leads in 3–5 weeks',
  },
  {
    id: 'launching',
    emoji: '🚀',
    title: 'Launching Something New',
    subtitle: "I have a product or idea I'm ready to bring to market",
    accentColor: 'teal',
    borderSel: 'border-teal-500',
    bgSel: 'bg-teal-50',
    textAccent: 'text-teal-700',
    pillBg: 'bg-teal-100 text-teal-700',
    iconBg: 'bg-teal-100',
    services: ['Web or Shopify Build', 'Meta Launch Campaigns', 'CRO & Landing Pages'],
    whatYouNeed: [
      'A fast, polished website or Shopify store built for launch-day traffic',
      'A pre-launch email capture and warm-up strategy',
      'Paid social campaigns timed for maximum launch impact',
      'Landing pages A/B tested to find your best-converting message',
    ],
    outcome: "We've helped 50+ brands go from zero to first 100 customers in under 6 weeks.",
    budget: '$1,500 – $5,000 project + monthly ad spend',
    timeline: 'Launch-ready in 2–5 weeks',
  },
  {
    id: 'scaling',
    emoji: '📈',
    title: 'Scaling an Existing Business',
    subtitle: 'I have traction and revenue — I want to grow faster',
    accentColor: 'sky',
    borderSel: 'border-sky-500',
    bgSel: 'bg-sky-50',
    textAccent: 'text-sky-700',
    pillBg: 'bg-sky-100 text-sky-700',
    iconBg: 'bg-sky-100',
    services: ['Google Performance Max', 'Meta Scaling Campaigns', 'CRO & Analytics Audit'],
    whatYouNeed: [
      'A full audit of your current ads, site, and conversion funnel',
      'Google Performance Max + Shopping campaigns pushing volume profitably',
      'Meta campaigns scaled with tested creative and audience expansion',
      'CRO improvements to your highest-traffic pages to lift conversion rates',
    ],
    outcome: 'Established businesses typically unlock 40–80% more revenue from the same marketing budget.',
    budget: '$5,000 – $20,000 / month',
    timeline: 'Meaningful scale impact in 4–8 weeks',
  },
];

export default function ClientGuide() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Animate panel in whenever selection changes
  useEffect(() => {
    if (selected && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [selected]);

  const handleSelect = (type) => {
    if (selected?.id === type.id) {
      setSelected(null);
      return;
    }
    if (selected && panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0, y: 12, duration: 0.18, ease: 'power2.in',
        onComplete: () => setSelected(type),
      });
    } else {
      setSelected(type);
    }
  };

  const t = selected;

  return (
    <section ref={sectionRef} className="py-28 px-4 bg-gradient-to-br from-slate-50 to-indigo-50/40 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">Find Your Fit</span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight mt-2">
            Which Best{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">
              Describes You?
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Pick the option closest to your situation. We'll show you exactly what you need — services, expected results, and a realistic budget.
          </p>
        </div>

        {/* Selector cards */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {clientTypes.map((type) => {
            const isActive = selected?.id === type.id;
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type)}
                className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 group will-change-transform
                  ${isActive
                    ? `${type.borderSel} ${type.bgSel} shadow-lg`
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}
              >
                <div className={`text-3xl mb-3 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {type.emoji}
                </div>
                <h3 className={`font-bold text-sm leading-tight mb-1 ${isActive ? type.textAccent : 'text-slate-900'}`}>
                  {type.title}
                </h3>
                <p className="text-xs text-slate-500 leading-snug">{type.subtitle}</p>

                {/* Active checkmark */}
                {isActive && (
                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center ${type.bgSel}`}>
                    <svg className={`w-3 h-3 ${type.textAccent}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Recommendation panel */}
        {t && (
          <div
            ref={panelRef}
            className={`rounded-3xl border ${t.borderSel} bg-white shadow-xl overflow-hidden`}
            style={{ opacity: 0 }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left — What you need */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-100">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                  What you'll need
                </p>
                <ul className="space-y-3">
                  {t.whatYouNeed.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-0.5 w-5 h-5 rounded-full ${t.iconBg} ${t.textAccent} flex items-center justify-center shrink-0`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm text-slate-700 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Recommended services</p>
                  <div className="flex flex-wrap gap-2">
                    {t.services.map((s, i) => (
                      <span key={i} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${t.pillBg}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Outcomes + CTA */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                    What to expect
                  </p>
                  <p className="text-slate-800 font-medium text-sm leading-relaxed mb-6">
                    "{t.outcome}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className={`rounded-xl p-4 ${t.bgSel}`}>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Investment</div>
                      <div className={`font-black text-base ${t.textAccent}`}>{t.budget}</div>
                    </div>
                    <div className="rounded-xl p-4 bg-slate-50">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Timeline</div>
                      <div className="font-black text-base text-slate-800">{t.timeline}</div>
                    </div>
                  </div>
                </div>

                <a
                  href="#quote-form"
                  className="inline-flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-colors shadow-lg shadow-indigo-200"
                >
                  Get a Free Proposal for This Package
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <p className="text-center text-xs text-slate-400 mt-3">No commitment. Response within 24 hours.</p>
              </div>
            </div>
          </div>
        )}

        {!t && (
          <p className="text-center text-slate-400 text-sm mt-2">
            ↑ Select your situation above to see a tailored recommendation
          </p>
        )}
      </div>
    </section>
  );
}
