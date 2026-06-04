import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { themeConfig, textGradientStyle, cssGradient, themeBorder } from '../config/themeConfig';

gsap.registerPlugin(ScrollTrigger);

// ══════════════════════════════════════════════════════════════════════════════
// DATA LAYER — Append new project objects here at any time.
// The layout wrappers below never need editing — only this array.
//
// Required fields per project:
//   id         {number}  — unique integer
//   category   {string}  — 'shopify' | 'ghl'
//   title      {string}  — project name (displayed as card heading)
//   subtitle   {string}  — one-line descriptor
//   market     {string}  — target market / geography
//   tags       {Array}   — technology / service labels
//   description{string}  — 2–3 sentence project summary
//   image      {string}  — path relative to /public (e.g. '/portfolio/qoffah.webp')
//   gradient   {string}  — Tailwind bg-gradient fallback when image is missing
//   link       {string}  — live site URL (opens in new tab on hover)
// ══════════════════════════════════════════════════════════════════════════════
const PROJECTS = [

  /* ── Shopify Stores ─────────────────────────────────────────────────────── */
  {
    id: 1,
    category: 'shopify',
    title: 'QOFFAH',
    subtitle: 'Luxury Handbags & Accessories',
    market: 'Global · 100+ Countries',
    tags: ['Shopify', 'Luxury E-commerce', 'Multi-currency'],
    description: 'As seen in Vogue, Grazia & Glamour. Custom Shopify build for a Moroccan-inspired luxury handbag brand with global checkout and editorial-grade presentation.',
    image: '/portfolio/qoffah.webp',
    gradient: 'from-amber-900 via-stone-800 to-amber-950',
    link: 'https://qoffah.com/',
  },
  {
    id: 2,
    category: 'shopify',
    title: 'SAYA USA',
    subtitle: "Women's Luxury Couture",
    market: 'United States',
    tags: ['Shopify', 'US Market', 'Apparel'],
    description: "US-targeted storefront for a luxury women's couture brand. 254+ verified reviews, multi-collection architecture, and international shipping flows.",
    image: '/portfolio/sayausa.jpg',
    gradient: 'from-rose-900 via-pink-900 to-rose-950',
    link: 'https://sayausa.com/',
  },
  {
    id: 3,
    category: 'shopify',
    title: 'IMAGE 1993',
    subtitle: 'Multi-Country Fashion Rollout',
    market: 'USA · UK · Pakistan',
    tags: ['Shopify', 'Multi-storefront', 'Fashion'],
    description: 'Three dedicated storefronts (US, UK, PK) for an established fashion brand — multi-currency, region shipping rules, and seasonal lookbook integration.',
    image: '/portfolio/image1993.jpg',
    gradient: 'from-indigo-900 via-slate-800 to-indigo-950',
    link: 'https://image1993.com/',
  },
  {
    id: 4,
    category: 'shopify',
    title: 'Silent Luxury',
    subtitle: 'Premium Menswear',
    market: 'Pakistan',
    tags: ['Shopify', 'Custom Theme', 'Luxury Fashion'],
    description: 'Fully custom Liquid theme for a sophisticated menswear brand — curated seasonal collections, outfit lookbooks, and premium editorial visual design.',
    image: '/portfolio/silentluxury.webp',
    gradient: 'from-slate-800 via-zinc-900 to-slate-950',
    link: 'https://silentluxury.com.pk/',
  },
  {
    id: 5,
    category: 'shopify',
    title: 'MiStore Pakistan',
    subtitle: 'Xiaomi Official Store',
    market: 'Pakistan',
    tags: ['Shopify', 'Electronics', 'Official Reseller'],
    description: "Pakistan's official Xiaomi destination — the widest range of original smartphones, accessories, and eco-products with warranty, built on Shopify.",
    image: '/portfolio/mistore.jpg',
    gradient: 'from-orange-900 via-red-900 to-orange-950',
    link: 'https://mistore.pk/',
  },
  {
    id: 6,
    category: 'shopify',
    title: 'Route2Health',
    subtitle: "Asia's #1 Certified Supplements",
    market: 'Asia · Global',
    tags: ['Shopify', 'Health & Wellness', 'USP Certified'],
    description: "Asia's first USP-certified premium multivitamin brand. Shopify store built for credibility, conversion, and subscription-based supplement sales.",
    image: '/portfolio/route2health.jpg',
    gradient: 'from-green-900 via-emerald-900 to-green-950',
    link: 'https://route2health.com/',
  },
  {
    id: 7,
    category: 'shopify',
    title: 'ShoeStreet',
    subtitle: 'Authorised SKECHERS Dealer',
    market: 'Pakistan',
    tags: ['Shopify', 'Footwear', 'Authorised Dealer'],
    description: 'Official SKECHERS authorised dealer store on Shopify — full catalogue management, size/colour variant system, and branded checkout experience.',
    image: '/portfolio/shoestreet.png',
    gradient: 'from-blue-900 via-sky-900 to-blue-950',
    link: 'https://shoestreet.pk/',
  },
  {
    id: 8,
    category: 'shopify',
    title: 'North Naturals',
    subtitle: 'Natural Wellness Products',
    market: 'Global',
    tags: ['Shopify', 'Natural Products', 'Wellness'],
    description: 'Clean-label wellness brand on Shopify — natural supplements and lifestyle products with a strong brand identity and streamlined purchase flow.',
    image: '/portfolio/northnaturals.jpg',
    gradient: 'from-teal-900 via-cyan-900 to-teal-950',
    link: 'https://northnaturals.com/',
  },
  {
    id: 9,
    category: 'shopify',
    title: 'AK Galleria',
    subtitle: 'Multi-Brand Fashion & Lifestyle',
    market: 'Pakistan · Global',
    tags: ['Shopify', 'Multi-Brand', 'Fashion'],
    description: 'Premium multi-brand destination for footwear, clothing, accessories, and lifestyle products — curated collections from leading international brands.',
    image: '/portfolio/akgalleria.png',
    gradient: 'from-violet-900 via-purple-900 to-violet-950',
    link: 'https://akgalleria.com/',
  },
  {
    id: 10,
    category: 'shopify',
    title: 'Limelight',
    subtitle: "Pakistan's Leading Fashion Brand",
    market: 'Pakistan · Worldwide Shipping',
    tags: ['Shopify', 'Fashion', '80+ Stores'],
    description: "Pakistan's largest fashion brand with 80+ physical stores and a flagship Shopify storefront — clothing, fabric, and accessories for men, women, and girls.",
    image: '/portfolio/limelight.jpg',
    gradient: 'from-fuchsia-900 via-pink-900 to-fuchsia-950',
    link: 'https://www.limelight.pk/',
  },

  /* ── GHL Funnels ────────────────────────────────────────────────────────── */
  {
    id: 11,
    category: 'ghl',
    title: 'Beyond Remedy CO',
    subtitle: 'Longevity & Wellness Clinic',
    market: 'United States',
    tags: ['GHL Funnel', 'Medical Wellness', 'High-ticket'],
    description: 'Consultation funnel for a physician-led longevity clinic — peptide therapy & hormone optimization. WWE & UFC partner trust signals. Starting at $250/month.',
    image: '/portfolio/beyondremedy.webp',
    gradient: 'from-teal-900 via-cyan-900 to-teal-950',
    link: 'https://go.beyondremedyco.com/',
  },
  {
    id: 12,
    category: 'ghl',
    title: 'Wingman Aero',
    subtitle: 'Flight Training Discovery Funnel',
    market: 'Sarasota, FL · USA',
    tags: ['GHL Funnel', 'Aviation', 'Lead Capture'],
    description: 'Discovery flight lead funnel for a certified Florida flight school. $299 offer, scarcity messaging, and a multi-CTA flow converting aspirants into pilot trainees.',
    image: '/portfolio/wingman.png',
    gradient: 'from-sky-900 via-blue-900 to-sky-950',
    link: 'https://uft.wingmanaero.com/',
  },
  {
    id: 13,
    category: 'ghl',
    title: 'My Injury Case Help',
    subtitle: 'Personal Injury Legal Funnel',
    market: 'Atlanta, GA · USA',
    tags: ['GHL Funnel', 'Legal Services', '4-in-1'],
    description: 'Personal injury qualification funnel bundling legal, medical, and property damage services. "$0 Upfront" hook, 60-second qualifier form, 24/7 callback automation.',
    image: '/portfolio/injurycase.png',
    gradient: 'from-violet-900 via-purple-900 to-violet-950',
    link: 'https://myinjurycasehelp.com/',
  },
  {
    id: 14,
    category: 'ghl',
    title: 'Strong Refuge Pool',
    subtitle: '3-Funnel Pool Service System',
    market: 'United States',
    tags: ['GHL Funnel', 'Pool Services', 'Multi-page'],
    description: 'Complete GHL funnel suite for a pool service company — community, commercial, and equipment pages. Lead capture, quote requests, and automated follow-up built in.',
    image: '/portfolio/strongrefuge.png',
    gradient: 'from-cyan-900 via-blue-900 to-cyan-950',
    link: 'https://equip.strongrefugepool.com/',
  },
  {
    id: 15,
    category: 'ghl',
    title: 'Beyond Remedy NY',
    subtitle: 'Injectable Wellness Promo Funnel',
    market: 'New York, USA',
    tags: ['GHL Funnel', 'Medical Aesthetics', 'Promo'],
    description: 'High-converting injectable wellness promotional funnel for the NY clinic — IV drips and aesthetic injectables offer page with urgency-driven CTA and booking flow.',
    image: '/portfolio/beyondremedyny.png',
    gradient: 'from-emerald-900 via-teal-900 to-emerald-950',
    link: 'https://go.beyondremedyny.com/brinjectablespromo',
  },

  // ── ADD NEW PROJECTS BELOW THIS LINE ─────────────────────────────────────
  // Copy the object structure above and append here.
  // The slider, tab counts, and filter tabs update automatically.
];

// ── Tab filter definitions ────────────────────────────────────────────────────
// Counts are derived from PROJECTS — no manual sync needed.
const TABS = [
  { key: 'all',     label: 'All Work',       count: PROJECTS.length },
  { key: 'shopify', label: 'Shopify Stores', count: PROJECTS.filter(p => p.category === 'shopify').length },
  { key: 'ghl',     label: 'GHL Funnels',   count: PROJECTS.filter(p => p.category === 'ghl').length },
];

// ── Category badge styles ─────────────────────────────────────────────────────
const CATEGORY_BADGE = {
  shopify: { bg: '#ecfdf5', color: '#065f46' },
  ghl:     { bg: '#f5f3ff', color: '#4c1d95' },
};

// ── Icon components ───────────────────────────────────────────────────────────
const GlobeIcon = () => (
  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const ArrowIcon = ({ dir }) => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const badge   = CATEGORY_BADGE[project.category] || CATEGORY_BADGE.shopify;

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
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="bg-white rounded-2xl overflow-hidden will-change-transform flex flex-col h-full"
      style={{
        border:     themeBorder('border'),
        boxShadow:  '0 4px 16px -4px rgba(0,0,0,0.08)',
        fontFamily: themeConfig.fonts.family,
      }}
    >
      {/* ── Image ─────────────────────────────────────────────────────────── */}
      <div className={`relative h-52 bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* Live site overlay on hover */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-bold text-sm"
          style={{ backgroundColor: `${themeConfig.colors.headerText}99` }}
        >
          <ExternalIcon /> Visit Live Site
        </a>

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: badge.bg, color: badge.color }}
        >
          {project.category === 'shopify' ? 'Shopify' : 'GHL Funnel'}
        </span>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
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
          {project.description}
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
    </div>
  );
}

// ── Main Portfolio section ────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const tabsRef    = useRef(null);

  const filtered = activeTab === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeTab);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(tabsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-28 border-b overflow-hidden"
      style={{
        backgroundColor: themeConfig.colors.background,
        borderColor:     themeConfig.colors.border,
        fontFamily:      themeConfig.fonts.family,
      }}
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* ── Section header ───────────────────────────────────────────────── */}
        <div ref={titleRef} className="text-center mb-10">
          <span
            className={`${themeConfig.fonts.tailwind.eyebrow} font-bold tracking-widest uppercase`}
            style={{ color: themeConfig.colors.primary }}
          >
            Our Work
          </span>

          <h2
            className={`${themeConfig.fonts.tailwind.sectionHeading} font-extrabold tracking-tight mt-2`}
            style={{ color: themeConfig.colors.headerText }}
          >
            Real Projects.{' '}
            <span style={textGradientStyle(themeConfig.gradients.brand)}>
              Real Results.
            </span>
          </h2>

          <p
            className={`${themeConfig.fonts.tailwind.bodyLead} mt-4 max-w-xl mx-auto`}
            style={{ color: themeConfig.colors.bodyText }}
          >
            {PROJECTS.length} live projects — Shopify stores and GHL funnels built for real clients.
            Every card links to the live site.
          </p>
        </div>

        {/* ── Tab filter ───────────────────────────────────────────────────── */}
        <div ref={tabsRef} className="flex justify-center gap-2 mb-10 flex-wrap">
          {TABS.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: isActive ? themeConfig.colors.primary : themeConfig.colors.surface,
                  color:           isActive ? '#fff' : themeConfig.colors.bodyText,
                  boxShadow:       isActive ? `0 4px 12px -2px ${themeConfig.colors.primary}40` : 'none',
                }}
              >
                {tab.label}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : themeConfig.colors.border,
                    color:           isActive ? '#fff' : themeConfig.colors.mutedText,
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Swiper slider ─────────────────────────────────────────────────── */}
      <div className="relative px-4 max-w-6xl mx-auto">

        {/* Custom nav arrows */}
        <button
          className="portfolio-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full shadow-md hidden md:flex items-center justify-center transition-all duration-200 -translate-x-1/2"
          style={{
            backgroundColor: themeConfig.colors.background,
            border:          themeBorder('border'),
            color:           themeConfig.colors.bodyText,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = themeConfig.colors.primary;
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = themeConfig.colors.primary;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = themeConfig.colors.background;
            e.currentTarget.style.color = themeConfig.colors.bodyText;
            e.currentTarget.style.borderColor = themeConfig.colors.border;
          }}
        >
          <ArrowIcon dir="left" />
        </button>

        <button
          className="portfolio-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full shadow-md hidden md:flex items-center justify-center transition-all duration-200 translate-x-1/2"
          style={{
            backgroundColor: themeConfig.colors.background,
            border:          themeBorder('border'),
            color:           themeConfig.colors.bodyText,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = themeConfig.colors.primary;
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = themeConfig.colors.primary;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = themeConfig.colors.background;
            e.currentTarget.style.color = themeConfig.colors.bodyText;
            e.currentTarget.style.borderColor = themeConfig.colors.border;
          }}
        >
          <ArrowIcon dir="right" />
        </button>

        <Swiper
          key={activeTab}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{ prevEl: '.portfolio-prev', nextEl: '.portfolio-next' }}
          pagination={{ clickable: true, el: '.portfolio-pagination' }}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={filtered.length > 2}
          centeredSlides={filtered.length > 2}
          grabCursor
          spaceBetween={24}
          breakpoints={{
            0:    { slidesPerView: 1.1 },
            640:  { slidesPerView: 1.6 },
            1024: { slidesPerView: 3   },
          }}
          className="!pb-12"
        >
          {filtered.map(project => (
            <SwiperSlide key={project.id} className="h-auto self-stretch">
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination dots */}
        <div className="portfolio-pagination flex justify-center gap-2 mt-0" />
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <div className="text-center mt-10 px-4">
        <p
          className="text-xs mb-4"
          style={{ color: themeConfig.colors.mutedText }}
        >
          Want results like these for your business?
        </p>
        <a
          href="#quote-form"
          className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-colors"
          style={{
            backgroundColor: themeConfig.colors.primary,
            color:           '#fff',
            boxShadow:       `0 10px 24px -4px ${themeConfig.colors.primary}4d`,
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#4f46e5'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = themeConfig.colors.primary; }}
        >
          Start Your Project →
        </a>
      </div>
    </section>
  );
}
