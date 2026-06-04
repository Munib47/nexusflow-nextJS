'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { themeConfig, cssGradient, textGradientStyle } from '../config/themeConfig';
import { usePluckCMS } from '../hooks/usePluckCMS';

// ── Static fallback content ─────────────────────────────────────────────────
const STATIC_CONTENT = {
  badge:          'Full-Service Digital Growth Agency',
  headline_line1: 'Stop Paying Agencies That',
  headline_line2: "Can't Show You the ROI.",
  description:    `NexusFlow runs your full digital stack — Shopify builds, paid ads, and CRO —
                   with fixed-price proposals, transparent reporting, and a team that owns your
                   results. Get a custom proposal in 24 hours, no commitment required.`,
  cta_primary:    themeConfig.brand.ctaPrimary,
  cta_secondary:  themeConfig.brand.ctaSecondary,
};

// ── Cycling pain-point phrases for headline line 2 ──────────────────────────
// First phrase matches headline_line2 above — they stay in sync on first render.
// Cycles every 6s starting after the entry animation completes (~3.5s delay).
const CYCLING_LINES = [
  "Can't Show You the ROI.",
  "Guess At Your Ad Spend.",
  "Miss Every Deadline.",
  "Don't Know Your Numbers.",
];

const socialProof = [
  { value: '250+', label: 'Projects Delivered' },
  { value: '4.9★', label: 'Average Client Rating' },
  { value: '98%',  label: 'Client Retention Rate' },
];

export default function Hero() {
  // ── CMS data with static fallback ─────────────────────────────────────────
  const { data: cms } = usePluckCMS('hero', STATIC_CONTENT);

  // ── Refs ──────────────────────────────────────────────────────────────────
  const containerRef = useRef(null);
  const badgeRef     = useRef(null);
  const line1Ref     = useRef(null);
  const line2Ref     = useRef(null);
  const descRef      = useRef(null);
  const buttonsRef   = useRef(null);
  const statsRef     = useRef(null);
  const orb1Ref      = useRef(null);
  const orb2Ref      = useRef(null);
  const orb3Ref      = useRef(null);

  // ── GSAP animations ───────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Looping ambient orb float
      gsap.to(orb1Ref.current, { y: -55, x: 35,  duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(orb2Ref.current, { y:  45, x: -35, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
      gsap.to(orb3Ref.current, { y: -30, x: 25,  duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });

      // Staggered entry timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(badgeRef.current,
          { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.1 })
        .fromTo(line1Ref.current,
          { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.6')
        .fromTo(line2Ref.current,
          { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.75')
        .fromTo(descRef.current,
          { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(Array.from(buttonsRef.current.children),
          { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
        .fromTo(Array.from(statsRef.current.children),
          { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Cycling headline animation ────────────────────────────────────────────
  // Starts after the entry animation finishes. Slides line 2 up+out, swaps
  // text directly in the DOM (no React state = no re-render flicker), then
  // slides the new phrase in from below.
  useEffect(() => {
    let phraseIndex = 0;
    let intervalId;

    const startDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        phraseIndex = (phraseIndex + 1) % CYCLING_LINES.length;
        const el = line2Ref.current;
        if (!el) return;

        gsap.to(el, {
          opacity: 0,
          y: -28,
          duration: 0.32,
          ease: 'power2.in',
          onComplete: () => {
            el.textContent = CYCLING_LINES[phraseIndex];
            gsap.fromTo(el,
              { opacity: 0, y: 32 },
              { opacity: 1, y: 0, duration: 0.48, ease: 'power3.out' }
            );
          },
        });
      }, 6000);
    }, 3500);

    return () => {
      clearTimeout(startDelay);
      clearInterval(intervalId);
    };
  }, []);

  // ── Mouse parallax on orbs ────────────────────────────────────────────────
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    gsap.to(orb1Ref.current, { x: x *  45, y: y *  30, duration: 1.6, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(orb2Ref.current, { x: x * -28, y: y * -22, duration: 2.0, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(orb3Ref.current, { x: x *  20, y: y *  35, duration: 1.3, ease: 'power2.out', overwrite: 'auto' });
  };

  // ── Magnetic CTA ──────────────────────────────────────────────────────────
  const handleCtaMouseMove = (e) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x    = (e.clientX - rect.left - rect.width  / 2) * 0.28;
    const y    = (e.clientY - rect.top  - rect.height / 2) * 0.28;
    gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
  };
  const handleCtaMouseLeave = (e) =>
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });

  // ── Dynamic styles from themeConfig ──────────────────────────────────────
  const heroStyle = {
    background:  cssGradient(themeConfig.gradients.heroBg),
    fontFamily:  themeConfig.fonts.family,
  };

  const dotGridStyle = {
    backgroundImage: `radial-gradient(circle, ${themeConfig.colors.primary}55 1px, transparent 1px)`,
    backgroundSize:  '36px 36px',
  };

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={heroStyle}
      className="relative overflow-hidden text-white pt-52 pb-32 md:pt-56 md:pb-40 px-4 text-center"
    >
      {/* Ambient orbs — colors pulled from palette */}
      <div
        ref={orb1Ref}
        className="absolute -top-32 -right-20 w-[580px] h-[580px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: `${themeConfig.colors.primary}33` }}
      />
      <div
        ref={orb2Ref}
        className="absolute -bottom-24 -left-20 w-[480px] h-[480px] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: `${themeConfig.colors.secondary}26` }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/3 w-[320px] h-[320px] rounded-full blur-[80px] pointer-events-none"
        style={{ backgroundColor: `${themeConfig.colors.accent}1a` }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={dotGridStyle}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Badge ─────────────────────────────────────────────────────── */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 bg-white/5 font-semibold uppercase px-4 py-2 rounded-full border border-white/10 tracking-widest"
          style={{
            color: themeConfig.colors.accent,
            fontSize: themeConfig.fonts.sizes.eyebrow.desktop,
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: themeConfig.colors.highlight }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: themeConfig.colors.highlight }}
            />
          </span>
          {cms.badge}
        </div>

        {/* ── Headline ──────────────────────────────────────────────────── */}
        <h1
          className={`${themeConfig.fonts.tailwind.heroHeadline} font-black tracking-tight mt-6 mb-6 leading-[1.06]`}
          style={{ color: themeConfig.colors.background }}
        >
          <span ref={line1Ref} className="block">
            {cms.headline_line1}
          </span>
          <span className="block overflow-hidden" style={{ paddingBottom: '0.08em' }}>
            <span
              ref={line2Ref}
              className="block"
              style={textGradientStyle(themeConfig.gradients.heroText)}
            >
              {cms.headline_line2}
            </span>
          </span>
        </h1>

        {/* ── Description — supports CMS rich-text HTML ──────────────────
            When cms.description_html is present (CMS rich-text field),
            it is injected via dangerouslySetInnerHTML inside a prose wrapper.
            Falls back to plain text string when the field is absent.        */}
        <div
          ref={descRef}
          className={`${themeConfig.fonts.tailwind.bodyLead} mb-10 max-w-2xl mx-auto leading-relaxed`}
          style={{ color: themeConfig.colors.mutedText }}
        >
          {cms.description_html ? (
            <div
              className="prose prose-invert prose-sm md:prose-base max-w-none"
              dangerouslySetInnerHTML={{ __html: cms.description_html }}
            />
          ) : (
            <p>{cms.description}</p>
          )}
        </div>

        {/* ── CTAs ──────────────────────────────────────────────────────── */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* Primary — magnetic + shimmer */}
          <div className="relative inline-block w-full sm:w-auto">
            <span
              className="animate-pulse-ring absolute inset-0 rounded-xl pointer-events-none"
              style={{ backgroundColor: `${themeConfig.colors.highlight}66` }}
            />
            <a
              href="#quote-form"
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              className="group relative w-full sm:w-auto overflow-hidden font-extrabold px-10 py-4 rounded-xl shadow-xl transition-colors text-center inline-block"
              style={{
                backgroundColor: themeConfig.colors.highlight,
                color: themeConfig.colors.headerText,
                boxShadow: `0 20px 40px -8px ${themeConfig.colors.highlight}4d`,
              }}
            >
              <span className="relative z-10">{cms.cta_primary}</span>
              <span className="animate-shimmer absolute inset-0 bg-white/25 pointer-events-none" />
            </a>
          </div>

          {/* Secondary */}
          <a
            href="#services"
            className="w-full sm:w-auto group font-semibold px-6 py-4 hover:text-white transition-colors text-center inline-flex items-center justify-center gap-2"
            style={{ color: themeConfig.colors.mutedText }}
          >
            {cms.cta_secondary}
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>

        {/* ── Social proof bar ──────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="mt-16 pt-8 flex flex-wrap justify-center gap-x-12 gap-y-6"
          style={{ borderTop: `1px solid ${themeConfig.colors.background}1a` }}
        >
          {socialProof.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl font-black"
                style={{ color: themeConfig.colors.background }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs mt-0.5 uppercase tracking-wider"
                style={{ color: themeConfig.colors.mutedText }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </header>
  );
}
