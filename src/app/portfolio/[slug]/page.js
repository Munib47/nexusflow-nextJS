// /portfolio/[slug] — Server Component (no 'use client' needed).
// All data is static; the only interactive element is a plain <a> target="_blank".

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS, getProjectBySlug } from '@/data/portfolioData';
import { themeConfig, cssGradient } from '@/config/themeConfig';

// ── Static param generation (SSG) ────────────────────────────────────────────
export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

// ── Per-page SEO metadata ────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Not Found' };
  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
    openGraph: {
      title:       `${project.title} — NexusFlow Case Study`,
      description: project.shortDescription,
      images:      [{ url: project.thumbnailImage }],
    },
  };
}

// ── Category label map ───────────────────────────────────────────────────────
const CATEGORY_LABEL = {
  shopify: 'Shopify Store',
  ghl:     'GHL Funnel',
};

const CATEGORY_BADGE = {
  shopify: { bg: 'rgba(236,253,245,0.1)', color: '#34d399', border: 'rgba(52,211,153,0.25)' },
  ghl:     { bg: 'rgba(245,243,255,0.1)', color: '#a78bfa', border: 'rgba(167,139,250,0.25)' },
};

// ── Icon primitives ───────────────────────────────────────────────────────────
const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const LayersIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page component
// ═════════════════════════════════════════════════════════════════════════════
export default function PortfolioDetailPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const badge = CATEGORY_BADGE[project.category] ?? CATEGORY_BADGE.shopify;

  return (
    <div
      className="min-h-screen"
      style={{
        background:  cssGradient(themeConfig.gradients.darkSection),
        fontFamily:  themeConfig.fonts.family,
        color:       '#f1f5f9',
      }}
    >

      {/* ── Top navigation bar ────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: 'rgba(2, 6, 23, 0.9)',
          backdropFilter:  'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor:     '#1e293b',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            style={{ color: '#94a3b8' }}
            onMouseEnter={undefined}
          >
            <ArrowLeftIcon />
            Back to Portfolio
          </Link>

          <Link
            href="/"
            className="text-xl font-black tracking-tight"
          >
            <span style={{ color: '#818cf8' }}>Nexus</span>
            <span className="text-white">Flow</span>
          </Link>

          {/* Primary CTA repeated in nav for accessibility */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: themeConfig.colors.primary,
              color: '#fff',
              boxShadow: `0 4px 16px -4px ${themeConfig.colors.primary}55`,
            }}
          >
            <ExternalIcon /> Visit Live {project.category === 'shopify' ? 'Store' : 'Funnel'}
          </a>
        </div>
      </nav>

      {/* ── Hero banner ───────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(240px, 42vw, 520px)' }}>
        {/* Project thumbnail */}
        <Image
          src={project.thumbnailImage}
          alt={`${project.title} screenshot`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(2,6,23,0.1) 0%, rgba(2,6,23,0.7) 70%, rgba(2,6,23,1) 100%)',
          }}
        />

        {/* Hero text anchored to bottom of banner */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full border"
              style={{ backgroundColor: badge.bg, color: badge.color, borderColor: badge.border }}
            >
              {CATEGORY_LABEL[project.category]}
            </span>
            <span className="text-xs font-medium" style={{ color: '#64748b' }}>
              {project.market}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
            style={{ color: '#f8fafc' }}
          >
            {project.title}
          </h1>
          <p className="mt-2 text-base sm:text-lg" style={{ color: '#94a3b8' }}>
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* ── Main content grid ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* ── LEFT COLUMN — Case study narrative ──────────────────────── */}
          <div>

            {/* Short description lead */}
            <p
              className="text-lg leading-relaxed mb-8 pb-8"
              style={{
                color: '#cbd5e1',
                borderBottom: '1px solid #1e293b',
              }}
            >
              {project.shortDescription}
            </p>

            {/* Full case study HTML */}
            <div
              className="case-study-prose"
              dangerouslySetInnerHTML={{ __html: project.fullCaseStudyHtml }}
            />

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8" style={{ borderTop: '1px solid #1e293b' }}>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(99,102,241,0.12)',
                    color:           '#a5b4fc',
                    border:          '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Sticky spec panel + CTA ──────────────────── */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-6">

            {/* CRO Metrics panel */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: '#0f172a',
                border:          '1px solid #1e293b',
              }}
            >
              <h2
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: '#6366f1' }}
              >
                Impact Metrics
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {project.metrics.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.12)' }}
                  >
                    <div
                      className="text-xs font-medium mb-1.5 leading-tight"
                      style={{ color: '#64748b' }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm font-bold leading-tight"
                      style={{ color: '#e2e8f0' }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specification panel */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: '#0f172a',
                border:          '1px solid #1e293b',
              }}
            >
              <h2
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: '#6366f1' }}
              >
                Technical Specification
              </h2>

              <div className="flex flex-col gap-4">
                {/* Project type */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(99,102,241,0.12)', color: '#818cf8' }}
                  >
                    <LayersIcon />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: '#64748b' }}>
                      Platform
                    </div>
                    <div className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
                      {project.category === 'shopify' ? 'Shopify' : 'GoHighLevel (GHL)'}
                    </div>
                  </div>
                </div>

                {/* Theme / funnel architecture */}
                {project.shopifyThemeUsed && (
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(99,102,241,0.12)', color: '#818cf8' }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5" style={{ color: '#64748b' }}>
                        Theme Architecture
                      </div>
                      <div className="text-sm font-semibold leading-snug" style={{ color: '#e2e8f0' }}>
                        {project.shopifyThemeUsed}
                      </div>
                    </div>
                  </div>
                )}

                {/* Market */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(99,102,241,0.12)', color: '#818cf8' }}
                  >
                    <GlobeIcon />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: '#64748b' }}>
                      Target Market
                    </div>
                    <div className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
                      {project.market}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Primary CTA — Visit Live Store ────────────────────────── */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full font-bold text-sm px-6 py-4 rounded-xl transition-all duration-200 group"
              style={{
                background:  `linear-gradient(135deg, ${themeConfig.colors.primary}, #4f46e5)`,
                color:       '#fff',
                boxShadow:   `0 12px 28px -6px ${themeConfig.colors.primary}55`,
              }}
            >
              <ExternalIcon />
              Visit Live {project.category === 'shopify' ? 'Store' : 'Funnel'}
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secondary — back to portfolio */}
            <Link
              href="/#portfolio"
              className="flex items-center justify-center gap-2 w-full font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
                color:           '#64748b',
                border:          '1px solid #1e293b',
              }}
            >
              <ArrowLeftIcon />
              All Case Studies
            </Link>
          </aside>
        </div>
      </div>

      {/* ── Footer strip ──────────────────────────────────────────────────── */}
      <footer
        className="border-t mt-8"
        style={{ borderColor: '#1e293b', backgroundColor: '#020617' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-lg font-black tracking-tight">
            <span style={{ color: '#818cf8' }}>Nexus</span>
            <span className="text-white">Flow</span>
          </Link>
          <p className="text-xs" style={{ color: '#475569' }}>
            © {new Date().getFullYear()} NexusFlow. All rights reserved.
          </p>
          <a
            href="/#contact"
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'rgba(99,102,241,0.12)',
              color:           '#a5b4fc',
              border:          '1px solid rgba(99,102,241,0.2)',
            }}
          >
            Start a Project →
          </a>
        </div>
      </footer>
    </div>
  );
}
