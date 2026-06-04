'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { themeConfig, themeBorder } from '@/config/themeConfig';

// ── Badge colour map ──────────────────────────────────────────────────────────
const CATEGORY_BADGE = {
  shopify: { bg: '#ecfdf5', color: '#065f46' },
  ghl:     { bg: '#f5f3ff', color: '#4c1d95' },
};

// ── Icon primitives ───────────────────────────────────────────────────────────
const GlobeIcon = () => (
  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const CaseStudyIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// ═════════════════════════════════════════════════════════════════════════════
// PortfolioCard — Stretch-Link Pattern
//
// HTML validity contract:
//   <article>                        ← card root; position:relative; group hover
//     <Link>                         ← EMPTY stretch anchor; absolute inset-0 z-[1]
//                                      no children → no block-inside-<a> violation
//     <div> image region             ← z:auto; flows above z-auto < z-[1] link
//       <Image />
//       <div> overlay z-[2]          ← pointer-events:none on backdrop
//           <span> View Case Study   ← pointer-events:none → click falls to Link
//           <a>   Launch Live Site   ← pointer-events:auto → captured before Link
//       <span> badge z-[3]
//     <div> text content             ← z:auto; stretch link above captures clicks
//
// Interaction matrix:
//   Default card click      → stretch Link navigates to /portfolio/[slug]
//   Hover overlay           → opacity-0 → group-hover:opacity-100
//   "View Case Study" span  → pointer-events:none; stretch Link fires
//   "Launch Live Site" <a>  → pointer-events:auto; <a> fires; Link never reached
// ═════════════════════════════════════════════════════════════════════════════
export default function PortfolioCard({ project }) {
  const cardRef = useRef(null);
  const badge   = CATEGORY_BADGE[project.category] ?? CATEGORY_BADGE.shopify;

  const onEnter = () =>
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: '0 24px 48px -8px rgba(0,0,0,0.18)',
      duration: 0.35,
      ease: 'power2.out',
    });

  const onLeave = () =>
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 4px 16px -4px rgba(0,0,0,0.08)',
      duration: 0.4,
      ease: 'power2.out',
    });

  return (
    // ── <article> is the card root — a valid block container ──────────────────
    // GSAP targets this element; 'group' drives all hover transitions.
    // position:relative establishes the stacking context for the stretch link.
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative group rounded-2xl overflow-hidden will-change-transform flex flex-col h-full bg-white"
      style={{
        border:     themeBorder('border'),
        boxShadow:  '0 4px 16px -4px rgba(0,0,0,0.08)',
        fontFamily: themeConfig.fonts.family,
      }}
    >

      {/*
        ── STRETCH LINK ────────────────────────────────────────────────────────
        Empty <a> covers the entire card surface at z-[1].
        Zero children → zero block-level descendants → valid HTML.
        All card-area clicks that are NOT captured by a higher-z element
        flow naturally to this anchor.
      */}
      <Link
        href={`/portfolio/${project.slug}`}
        className="absolute inset-0 z-[1] rounded-2xl"
        aria-label={`View ${project.title} case study`}
      />

      {/* ── IMAGE REGION ──────────────────────────────────────────────────── */}
      {/*
        position:relative with no explicit z-index → participates in article
        stacking context at z:auto. The stretch link (z-[1]) sits above this
        div in the stacking order for pointer events. The overlay at z-[2]
        inside this div rises above both.
      */}
      <div className={`relative h-52 bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}>

        <Image
          src={project.thumbnailImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={() => {}}
        />

        {/*
          ── HOVER OVERLAY ─────────────────────────────────────────────────
          z-[2] rises above stretch link (z-[1]) in the article stacking context.
          pointer-events:none on the backdrop itself — clicks on the dark area
          pass through to the stretch link below.
          Only the "Launch Live Site" <a> restores pointer-events:auto.
        */}
        <div
          className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 px-4 pointer-events-none"
          style={{ backgroundColor: 'rgba(2, 6, 23, 0.84)' }}
        >

          {/*
            Button 1 — "View Case Study"
            pointer-events:none — click falls through backdrop → stretch Link.
            Visual feedback via onMouseEnter still fires on the span because
            the overlay backdrop relays hover events through pointer-events:none.
          */}
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white pointer-events-none select-none"
            style={{
              border:          '1px solid rgba(99,102,241,0.5)',
              backgroundColor: 'rgba(99,102,241,0.25)',
            }}
          >
            <CaseStudyIcon /> View Case Study
          </span>

          {/*
            Button 2 — "Launch Live Site"
            pointer-events:auto restores click capture on this element only.
            It intercepts the click before it can reach the stretch link,
            opening the external URL in a new tab. No stopPropagation needed —
            the z-stacking and pointer-events model handle routing cleanly.
          */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors pointer-events-auto"
            style={{
              border:          '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
          >
            <ExternalLinkIcon /> Launch Live Site
          </a>
        </div>

        {/* Category badge — z-[3] ensures it paints above overlay (z-[2]) at all times */}
        <span
          className="absolute top-3 left-3 z-[3] text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: badge.bg, color: badge.color }}
        >
          {project.category === 'shopify' ? 'Shopify' : 'GHL Funnel'}
        </span>
      </div>

      {/* ── CARD CONTENT ──────────────────────────────────────────────────── */}
      {/*
        No explicit z-index — sits at z:auto below the stretch link (z-[1]).
        Visually rendered normally; pointer clicks on this region are captured
        by the transparent stretch link directly above.
      */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className="flex items-center gap-1.5 text-xs font-medium mb-2"
          style={{ color: themeConfig.colors.mutedText }}
        >
          <GlobeIcon /> {project.market}
        </div>

        <h3
          className={`${themeConfig.fonts.tailwind.cardTitle} font-black leading-tight`}
          style={{ color: themeConfig.colors.headerText }}
        >
          {project.title}
        </h3>

        <p
          className="font-semibold text-xs mb-2"
          style={{ color: themeConfig.colors.primary }}
        >
          {project.subtitle}
        </p>

        <p
          className="text-sm leading-relaxed flex-1 mb-4 line-clamp-3"
          style={{ color: themeConfig.colors.bodyText }}
        >
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: themeConfig.colors.surface,
                color:           themeConfig.colors.bodyText,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
