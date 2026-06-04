'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  'You pay a 3-month retainer before seeing a single result',
  'You get a polished deck — but no measurable revenue growth',
  'A senior rep sells you, then a junior team delivers',
  'Pricing is vague until you\'re already two invoices deep',
  'Five tools, three vendors, and nobody owns the outcome',
];

const solutions = [
  'Campaigns go live in days. First real data within 2 weeks',
  'Every decision is tied to revenue metrics — not vanity stats',
  'The team you meet is the team that builds your project',
  'Fixed-price proposals in writing before you commit to anything',
  'One team, full stack, single point of accountability',
];

const XIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function PainPoints() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(leftRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 82%' } }
      );
      gsap.fromTo(rightRef.current.children,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-4 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-rose-400 uppercase">Sound Familiar?</span>
          <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight mt-2 text-white">
            The Problem with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              Most Agencies
            </span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            If you've hired an agency before, you've probably felt at least one of these.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* Left — Problems */}
          <div className="rounded-2xl bg-rose-500/5 border border-rose-500/15 p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="text-sm font-bold text-rose-400 uppercase tracking-widest">The Old Way</span>
            </div>
            <ul ref={leftRef} className="space-y-4">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-snug">
                  <span className="text-rose-400 mt-0.5"><XIcon /></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Solutions */}
          <div className="rounded-2xl bg-teal-500/5 border border-teal-500/20 p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span className="text-sm font-bold text-teal-400 uppercase tracking-widest">The NexusFlow Way</span>
            </div>
            <ul ref={rightRef} className="space-y-4">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200 text-sm leading-snug font-medium">
                  <span className="text-teal-400 mt-0.5"><CheckIcon /></span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom pull quote */}
        <p className="text-center text-slate-500 text-sm mt-10">
          Close one client with us and you've covered a full year of working together.
          <a href="#quote-form" className="text-indigo-400 font-semibold hover:text-indigo-300 ml-1 transition-colors">
            See if we're a fit →
          </a>
        </p>
      </div>
    </section>
  );
}
