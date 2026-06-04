'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Discovery & Audit',
    desc: 'We dig into your analytics, ad accounts, and site infrastructure to map exactly where revenue is being left on the table.',
  },
  {
    num: '02',
    title: 'Strategy & Build',
    desc: 'Your dedicated team engineers the solution — whether that\'s a new Shopify store, React app, or a full paid media framework.',
  },
  {
    num: '03',
    title: 'Launch & Acquire',
    desc: 'We deploy your campaigns and assets together, so your paid traffic lands on a fully optimized destination from day one.',
  },
  {
    num: '04',
    title: 'Optimize & Scale',
    desc: 'Weekly data reviews and continuous A/B testing keep your ROAS climbing and your cost per acquisition falling.',
  },
];

export default function ProcessPipeline() {
  const containerRef = useRef(null);
  const stepsRef     = useRef(null);
  const titleRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
        }
      );
      gsap.fromTo(
        stepsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 78%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { y: -6, borderColor: 'rgba(99,102,241,0.35)', duration: 0.3, ease: 'power2.out' });
  };
  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, borderColor: 'rgba(30,41,59,0.6)', duration: 0.4, ease: 'power2.out' });
  };

  return (
    <section id="process" ref={containerRef} className="py-28 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* ── Section header ───────────────────────────────────────────────── */}
        <div ref={titleRef} className="mb-16 max-w-xl">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">How It Works</span>
          <h2 className="text-3xl font-black tracking-tight mt-2 text-white sm:text-4xl">
            From Brief to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">
              Revenue
            </span>{' '}
            in 4 Steps
          </h2>
          <p className="mt-3 text-slate-400 leading-relaxed">
            A streamlined delivery process built to get you results fast — without the back-and-forth of a typical agency engagement.
          </p>
        </div>

        {/* ── Step cards ───────────────────────────────────────────────────── */}
        <div ref={stepsRef} className="grid md:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative group p-7 rounded-2xl will-change-transform overflow-hidden"
              style={{
                background: 'rgba(15,23,42,0.7)',
                border: '1px solid rgba(30,41,59,0.6)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Gradient top accent strip */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400" />

              {/* Faint background watermark number */}
              <div
                className="absolute -top-3 -right-1 font-black leading-none pointer-events-none select-none"
                style={{ fontSize: '88px', color: 'rgba(255,255,255,0.025)' }}
              >
                {step.num}
              </div>

              {/* Step badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #14b8a6)',
                  boxShadow: '0 8px 20px -4px rgba(99,102,241,0.35)',
                }}
              >
                <span className="text-white text-sm font-black">{step.num}</span>
              </div>

              <h3 className="text-base font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
