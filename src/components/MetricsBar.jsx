'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { display: '+250%', countTo: 250, prefix: '+', suffix: '%', label: 'Average Traffic Growth', accent: true },
  { display: '6.8x',  countTo: 6.8,  prefix: '',  suffix: 'x', label: 'Peak ROAS Achieved',    accent: false },
  { display: '< 1.8s', static: true,              label: 'Target Page Load (LCP)',  accent: true },
  { display: 'Enterprise', static: true,          label: 'GHL Automation Standard', accent: false },
];

export default function MetricsBar() {
  const barRef = useRef(null);
  const numRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade-in for the whole bar
      gsap.fromTo(
        barRef.current.children,
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: barRef.current, start: 'top 88%' },
        }
      );

      // Counter animations for numeric metrics
      metrics.forEach((metric, i) => {
        if (metric.static || !numRefs.current[i]) return;

        const el = numRefs.current[i];
        const isDecimal = metric.suffix === 'x';
        const counter = { val: 0 };

        gsap.to(counter, {
          val: metric.countTo,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: barRef.current, start: 'top 88%' },
          onUpdate() {
            el.textContent =
              metric.prefix +
              (isDecimal ? counter.val.toFixed(1) : Math.round(counter.val)) +
              metric.suffix;
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white border-b border-slate-200/80 relative z-20">
      <div
        ref={barRef}
        className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
      >
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`${i > 0 ? 'md:border-l md:border-slate-100' : ''} ${i === 2 ? 'border-l border-slate-100' : ''}`}
          >
            <div
              ref={(el) => (numRefs.current[i] = el)}
              className={`text-3xl font-black tracking-tight ${metric.accent ? 'text-indigo-600' : 'text-slate-900'}`}
            >
              {metric.display}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
