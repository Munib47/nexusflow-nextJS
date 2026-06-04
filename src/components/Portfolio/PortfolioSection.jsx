'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PROJECTS, TABS } from '@/data/portfolioData';
import { themeConfig, textGradientStyle, cssGradient, themeBorder } from '@/config/themeConfig';
import PortfolioCard from './PortfolioCard';

gsap.registerPlugin(ScrollTrigger);

// ── Arrow icon ────────────────────────────────────────────────────────────────
const ArrowIcon = ({ dir }) => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
  </svg>
);

// ── Nav button — shared style for prev/next arrows ────────────────────────────
function NavBtn({ dir, className }) {
  return (
    <button
      className={`${className} absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full shadow-md hidden md:flex items-center justify-center transition-all duration-200`}
      style={{
        backgroundColor: themeConfig.colors.background,
        border:          themeBorder('border'),
        color:           themeConfig.colors.bodyText,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = themeConfig.colors.primary;
        e.currentTarget.style.color           = '#fff';
        e.currentTarget.style.borderColor     = themeConfig.colors.primary;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = themeConfig.colors.background;
        e.currentTarget.style.color           = themeConfig.colors.bodyText;
        e.currentTarget.style.borderColor     = themeConfig.colors.border;
      }}
    >
      <ArrowIcon dir={dir} />
    </button>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function PortfolioSection() {
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
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(tabsRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
        }
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

        {/* ── Section header ───────────────────────────────────────────── */}
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
            Click any card for the full case study.
          </p>
        </div>

        {/* ── Tab filter ───────────────────────────────────────────────── */}
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

      {/* ── Swiper slider ─────────────────────────────────────────────── */}
      <div className="relative px-4 max-w-6xl mx-auto">

        <NavBtn dir="left"  className="portfolio-prev left-0 -translate-x-1/2" />
        <NavBtn dir="right" className="portfolio-next right-0 translate-x-1/2" />

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
              <PortfolioCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="portfolio-pagination flex justify-center gap-2 mt-0" />
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <div className="text-center mt-10 px-4">
        <p className="text-xs mb-4" style={{ color: themeConfig.colors.mutedText }}>
          Want results like these for your business?
        </p>
        <a
          href="#contact"
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
