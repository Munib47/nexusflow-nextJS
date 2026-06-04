'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { themeConfig, textGradientStyle, themeBorder } from '../config/themeConfig';
import { usePluckCMS } from '../hooks/usePluckCMS';

gsap.registerPlugin(ScrollTrigger);

// ── SVG Icon Components ───────────────────────────────────────────────────────
const WebIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
const ShopifyIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);
const TrendIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const BoltIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Icon registry — keyed by the CMS iconKey field.
// Add new entries here as you add new service types in the CMS.
const ICON_MAP = {
  web:        { Component: WebIcon,       accent: { bg: '#eef2ff', color: '#6366f1' } },
  shopify:    { Component: ShopifyIcon,   accent: { bg: '#ecfdf5', color: '#10b981' } },
  meta:       { Component: TrendIcon,     accent: { bg: '#fff1f2', color: '#f43f5e' } },
  google:     { Component: SearchIcon,    accent: { bg: '#f0f9ff', color: '#0ea5e9' } },
  linkedin:   { Component: BriefcaseIcon, accent: { bg: '#f5f3ff', color: '#7c3aed' } },
  cro:        { Component: BoltIcon,      accent: { bg: '#fffbeb', color: '#d97706' } },
};

// ── Static fallback service data ──────────────────────────────────────────────
// When Pluck CMS is unreachable, this array is rendered verbatim.
// To update live: replace in the CMS dashboard → services endpoint.
const STATIC_SERVICES = {
  eyebrow:          'What We Do',
  heading:          'Everything Your Brand',
  heading_gradient: 'Needs to Grow',
  subtext:          'We cover the full digital stack — from your storefront to your ad accounts — so you never have to coordinate between five different agencies.',
  items: [
    {
      iconKey: 'web',
      title:   'Web Development',
      desc:    'High-performance React applications built for speed, SEO, and conversions. We target sub-2s load times and score 95+ on Core Web Vitals — so you rank higher and convert better.',
    },
    {
      iconKey: 'shopify',
      title:   'Shopify Development',
      desc:    "Custom Liquid themes, app integrations, and full store migrations. Every build is optimized for checkout speed and conversion rate — because your store's performance directly drives revenue.",
    },
    {
      iconKey: 'meta',
      title:   'Meta Ads Management',
      desc:    'Full-funnel Facebook & Instagram campaigns with dynamic creative testing, precise audience segmentation, and clean pixel attribution to stabilize and scale your ROAS.',
    },
    {
      iconKey: 'google',
      title:   'Google Paid Search',
      desc:    'Intent-driven Search, Performance Max, and Shopping campaigns built to capture buyers at the bottom of the funnel. We own the keywords your competitors are missing.',
    },
    {
      iconKey: 'linkedin',
      title:   'LinkedIn B2B Ads',
      desc:    'Qualified B2B pipeline generation using laser-targeted filtering by job title, company size, and industry. Ideal for SaaS, agencies, and enterprise service providers.',
    },
    {
      iconKey: 'cro',
      title:   'Conversion Rate Optimization',
      desc:    'Data-driven site audits, heatmap analysis, A/B testing, and landing page redesigns that turn your existing traffic into measurable revenue — without spending more on ads.',
    },
  ],
};

// ── Service card component ────────────────────────────────────────────────────
function ServiceCard({ service, onMouseMove, onMouseLeave }) {
  const icon = ICON_MAP[service.iconKey] || ICON_MAP.web;
  const { Component: Icon, accent } = icon;

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="bg-white p-8 rounded-2xl shadow-sm transition-colors will-change-transform cursor-default"
      style={{ border: themeBorder('border') }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
        style={{ backgroundColor: accent.bg, color: accent.color }}
      >
        <Icon />
      </div>

      <h3
        className={`${themeConfig.fonts.tailwind.cardTitle} font-bold mb-2`}
        style={{ color: themeConfig.colors.headerText }}
      >
        {service.title}
      </h3>

      {/* desc supports CMS rich-text HTML via the desc_html field */}
      {service.desc_html ? (
        <div
          className="prose prose-sm max-w-none text-slate-600"
          dangerouslySetInnerHTML={{ __html: service.desc_html }}
        />
      ) : (
        <p
          className="text-sm leading-relaxed"
          style={{ color: themeConfig.colors.bodyText }}
        >
          {service.desc}
        </p>
      )}
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Services() {
  const { data: cms } = usePluckCMS('services', STATIC_SERVICES);

  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // 3D card tilt on hover
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width;
    const y    = (e.clientY - rect.top)  / rect.height;
    gsap.to(card, {
      rotationX: (y - 0.5) * -10,
      rotationY: (x - 0.5) *  10,
      scale: 1.025,
      transformPerspective: 900,
      boxShadow: `0 24px 48px -12px ${themeConfig.colors.primary}24`,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
      duration: 0.55,
      ease: 'power3.out',
    });
  };

  // Services displayed — prefers CMS items, falls back to static
  const services = (cms.items && cms.items.length > 0) ? cms.items : STATIC_SERVICES.items;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 px-4 max-w-6xl mx-auto"
      style={{ fontFamily: themeConfig.fonts.family }}
    >
      {/* ── Section header ───────────────────────────────────────────────── */}
      <div ref={titleRef} className="text-center mb-20">
        <span
          className={`${themeConfig.fonts.tailwind.eyebrow} font-bold tracking-widest uppercase`}
          style={{ color: themeConfig.colors.primary }}
        >
          {cms.eyebrow}
        </span>

        <h2
          className={`${themeConfig.fonts.tailwind.sectionHeading} font-extrabold tracking-tight mt-2`}
          style={{ color: themeConfig.colors.headerText }}
        >
          {cms.heading}{' '}
          <span style={textGradientStyle(themeConfig.gradients.brand)}>
            {cms.heading_gradient}
          </span>
        </h2>

        {/* subtext supports CMS rich-text via subtext_html */}
        {cms.subtext_html ? (
          <div
            className="prose prose-sm md:prose-base max-w-2xl mx-auto mt-4"
            dangerouslySetInnerHTML={{ __html: cms.subtext_html }}
          />
        ) : (
          <p
            className={`${themeConfig.fonts.tailwind.bodyLead} mt-4 max-w-2xl mx-auto leading-relaxed`}
            style={{ color: themeConfig.colors.bodyText }}
          >
            {cms.subtext}
          </p>
        )}
      </div>

      {/* ── Service cards grid ───────────────────────────────────────────── */}
      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <ServiceCard
            key={service.iconKey || idx}
            service={service}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </section>
  );
}
