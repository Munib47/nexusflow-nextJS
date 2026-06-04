'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { themeConfig, cssGradient, textGradientStyle, themeBorder } from '@/config/themeConfig';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'No Hidden Fees',
    desc:  "Every proposal is fully itemized. You see exactly what you're paying for — development hours, deliverables, and ad spend — before signing anything.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Execution',
    desc:  'Most projects go live in 2–4 weeks. We move fast without cutting corners because we have pre-built systems for the most common digital challenges.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'ROI-First Thinking',
    desc:  'Every decision — from site architecture to ad targeting — is evaluated through one lens: will this generate more revenue than it costs?',
  },
];

export default function AdvantagesSection() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-28 px-4 border-y"
      style={{
        background:  cssGradient(themeConfig.gradients.stripBg),
        borderColor: themeConfig.colors.border,
        fontFamily:  themeConfig.fonts.family,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span
            className={`${themeConfig.fonts.tailwind.eyebrow} font-bold tracking-widest uppercase`}
            style={{ color: themeConfig.colors.primary }}
          >
            Why NexusFlow
          </span>
          <h2
            className={`${themeConfig.fonts.tailwind.sectionHeading} font-extrabold tracking-tight mt-2`}
            style={{ color: themeConfig.colors.headerText }}
          >
            Transparent Pricing.{' '}
            <span style={textGradientStyle(themeConfig.gradients.brand)}>
              Real Results.
            </span>
          </h2>
          <p
            className={`${themeConfig.fonts.tailwind.bodyLead} mt-4 max-w-xl mx-auto leading-relaxed`}
            style={{ color: themeConfig.colors.bodyText }}
          >
            We don't pad retainers or bill for strategy decks. Your budget goes directly into execution that moves the needle.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ border: themeBorder('border') }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  backgroundColor: `${themeConfig.colors.primary}14`,
                  color:           themeConfig.colors.primary,
                }}
              >
                {adv.icon}
              </div>
              <h3
                className={`${themeConfig.fonts.tailwind.cardTitle} font-bold mb-2`}
                style={{ color: themeConfig.colors.headerText }}
              >
                {adv.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: themeConfig.colors.bodyText }}>
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
