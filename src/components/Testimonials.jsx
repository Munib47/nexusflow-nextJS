'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { themeConfig, textGradientStyle, themeBorder } from '../config/themeConfig';
import { usePluckCMS } from '../hooks/usePluckCMS';

gsap.registerPlugin(ScrollTrigger);

// ── Static fallback data ──────────────────────────────────────────────────────
// CMS fields per slide: rating, badge_metric, review_text,
//                       author_name, author_role, author_image
const STATIC_TESTIMONIALS = {
  eyebrow:          'Client Results',
  heading:          'Trusted by',
  heading_gradient: 'Growing US Brands',
  subtext:          'Real outcomes from real clients — not vanity metrics.',
  items: [
    {
      id:           'marcus',
      rating:       5,
      badge_metric: '+40% Conversion Rate in 30 Days',
      review_text:  "NexusFlow rebuilt our Shopify store and our conversion rate jumped 40% in month one. They didn't just make it look good — they made it sell. First agency that actually moved the needle.",
      author_name:  'Marcus Reynolds',
      author_role:  'Founder, Atlas Commerce · Austin, TX',
      author_image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
      avatarBg:     themeConfig.colors.primary,
    },
    {
      id:           'sarah',
      rating:       5,
      badge_metric: '55% Lower CPA · 3× Budget Scaled',
      review_text:  "Their Google Ads team cut our cost-per-acquisition by 55% while we tripled the budget. Weekly reports, zero fluff. I've worked with four agencies — NexusFlow is the only one I'd recommend without hesitation.",
      author_name:  'Sarah Chen',
      author_role:  'Marketing Director, Luminary Brands · New York, NY',
      author_image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
      avatarBg:     themeConfig.colors.secondary,
    },
    {
      id:           'david',
      rating:       5,
      badge_metric: '3× Qualified Leads in 60 Days',
      review_text:  "LinkedIn campaigns generated 3× more qualified demo requests in 60 days. The proposal they sent before we even signed showed they'd actually done their homework on our business.",
      author_name:  'David Walsh',
      author_role:  'CEO, TechBridge Solutions · Chicago, IL',
      author_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      avatarBg:     '#7c3aed',
    },
    {
      id:           'priya',
      rating:       5,
      badge_metric: '+62% Revenue Per Visitor',
      review_text:  "Their CRO audit uncovered 14 friction points we'd never caught internally. After the redesigned checkout and A/B-tested landing pages went live, revenue per visitor climbed 62% in under six weeks — without touching ad spend.",
      author_name:  'Priya Nair',
      author_role:  'VP eCommerce, Archetype Goods · San Francisco, CA',
      author_image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
      avatarBg:     '#0891b2',
    },
    {
      id:           'james',
      rating:       5,
      badge_metric: '4,200 hrs Saved Annually',
      review_text:  "NexusFlow built our entire lead-nurture and onboarding automation stack inside GHL. What used to take my team 12 hours a week now runs hands-free. The ROI on this engagement paid for itself inside 30 days.",
      author_name:  'James Kowalski',
      author_role:  'COO, Meridian Advisory Group · Dallas, TX',
      author_image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face',
      avatarBg:     '#059669',
    },
    {
      id:           'lisa',
      rating:       5,
      badge_metric: '0.8s Load · 40× Traffic Handled',
      review_text:  "Our legacy platform was collapsing under Black Friday load. NexusFlow re-architected the delivery layer in three weeks. We hit 0.8s load time, maintained 99.9% uptime, and handled 40× our usual concurrent users without a single outage.",
      author_name:  'Lisa Fontaine',
      author_role:  'CTO, Vantage Commerce · Miami, FL',
      author_image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face',
      avatarBg:     '#7c3aed',
    },
  ],
};

// ── Star icon ─────────────────────────────────────────────────────────────────
const StarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" style={{ color: '#fbbf24' }}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ── Arrow button ──────────────────────────────────────────────────────────────
function ArrowBtn({ className, label, onClick, children }) {
  return (
    <button
      className={className}
      aria-label={label}
      onClick={onClick}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        border: `1px solid ${themeConfig.colors.border}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        const b = e.currentTarget;
        b.style.transform = 'scale(1.12)';
        b.style.backgroundColor = themeConfig.colors.primary;
        b.style.borderColor = themeConfig.colors.primary;
        b.style.boxShadow = `0 4px 16px -4px ${themeConfig.colors.primary}55`;
        const svg = b.querySelector('svg');
        if (svg) svg.style.color = '#ffffff';
      }}
      onMouseLeave={e => {
        const b = e.currentTarget;
        b.style.transform = 'scale(1)';
        b.style.backgroundColor = '#ffffff';
        b.style.borderColor = themeConfig.colors.border;
        b.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)';
        const svg = b.querySelector('svg');
        if (svg) svg.style.color = themeConfig.colors.primary;
      }}
    >
      {children}
    </button>
  );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
// h-full flex flex-col justify-between pins the author row to the base of every
// card regardless of review text length — guarantees a flat horizontal line
// across all slides in the same Swiper row.
function TestimonialCard({ t }) {
  const stars      = t.rating ?? 5;
  const reviewText = t.review_text || t.quote || '';
  const initials   = t.author_name
    ? t.author_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-sm flex flex-col justify-between h-full"
      style={{ border: themeBorder('border') }}
    >
      {/* ── TOP: stars · badge · review — flex-col keeps ordering locked ── */}
      <div className="flex flex-col gap-4">

        <div className="flex gap-0.5">
          {Array.from({ length: stars }).map((_, i) => <StarIcon key={i} />)}
        </div>

        <span
          className="self-start text-xs font-bold px-3 py-1 rounded-full border"
          style={{
            color: '#0f766e',
            backgroundColor: '#f0fdfa',
            borderColor: '#99f6e4',
            whiteSpace: 'nowrap',
          }}
        >
          {t.badge_metric}
        </span>

        {t.review_html ? (
          <div
            className="prose prose-sm max-w-none"
            style={{ color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: t.review_html }}
          />
        ) : (
          <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>
            &ldquo;{reviewText}&rdquo;
          </p>
        )}

      </div>

      {/* ── BOTTOM: author — always anchored to card base via justify-between ── */}
      <div
        className="flex items-center gap-3 mt-6 pt-5"
        style={{ borderTop: themeBorder('border') }}
      >
        {t.author_image && (
          <img
            src={t.author_image}
            alt={t.author_name}
            className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-slate-100"
            onError={e => {
              e.currentTarget.style.display = 'none';
              const fb = e.currentTarget.nextSibling;
              if (fb) fb.style.display = 'flex';
            }}
          />
        )}
        <div
          className="w-11 h-11 rounded-full items-center justify-center text-white text-xs font-bold shrink-0"
          style={{
            backgroundColor: t.avatarBg || themeConfig.colors.primary,
            display: t.author_image ? 'none' : 'flex',
          }}
        >
          {initials}
        </div>

        <div className="min-w-0">
          <div
            className="font-bold text-sm truncate"
            style={{ color: themeConfig.colors.headerText }}
          >
            {t.author_name}
          </div>
          <div
            className="text-xs truncate"
            style={{ color: themeConfig.colors.mutedText }}
          >
            {t.author_role}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  const { data: cms } = usePluckCMS('testimonials', STATIC_TESTIMONIALS);
  const [swiper, setSwiper] = useState(null);

  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const wrapperRef = useRef(null);

  // Section entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(wrapperRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: wrapperRef.current, start: 'top 85%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const testimonials =
    cms.items && cms.items.length > 0 ? cms.items : STATIC_TESTIMONIALS.items;

  return (
    <section
      ref={sectionRef}
      id="testimonials-inner"
      className="py-28 px-4 border-y overflow-hidden"
      style={{
        backgroundColor: themeConfig.colors.surface,
        borderColor:     themeConfig.colors.border,
        fontFamily:      themeConfig.fonts.family,
      }}
    >
      {/*
        Scoped CSS — all selectors are prefixed with .t-swiper so they
        ONLY affect this slider and never bleed into the Portfolio slider.
        Pagination is injected into .testimonials-pagination (unique class).
      */}
      <style>{`
        .t-swiper .swiper-wrapper { align-items: stretch; }
        .t-swiper .swiper-slide   { height: auto; }

        .testimonials-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 28px;
        }
        .testimonials-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 !important;
          border-radius: 4px;
          background: #cbd5e1;
          opacity: 1;
          cursor: pointer;
          transition: width 0.25s ease, background-color 0.25s ease;
        }
        .testimonials-pagination .swiper-pagination-bullet-active {
          background: ${themeConfig.colors.primary};
          width: 28px;
        }

      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <div ref={titleRef} className="text-center mb-14">
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

          {cms.subtext_html ? (
            <div
              className="prose prose-sm md:prose-base max-w-xl mx-auto mt-4"
              dangerouslySetInnerHTML={{ __html: cms.subtext_html }}
            />
          ) : (
            <p
              className={`${themeConfig.fonts.tailwind.bodyLead} mt-4 max-w-xl mx-auto`}
              style={{ color: themeConfig.colors.bodyText }}
            >
              {cms.subtext}
            </p>
          )}
        </div>

        {/* ── Slider frame ────────────────────────────────────────────────── */}
        <div ref={wrapperRef}>

          {/*
            relative + px-14 sm:px-16 creates the gutter space so the
            absolutely-positioned arrows sit outside the visible card track.
          */}
          <div className="relative px-14 sm:px-16">

            {/* Left arrow — outer left, vertically centred on the card track */}
            <ArrowBtn
              className="testimonials-prev absolute left-0 top-1/2 -translate-y-1/2 z-10"
              label="Previous testimonial"
              onClick={() => swiper?.slidePrev()}
            >
              <svg
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2.5}
                style={{ width: 18, height: 18, color: themeConfig.colors.primary, transition: 'color 0.2s' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </ArrowBtn>

            {/* Swiper — navigation + pagination target unique class names only */}
            <Swiper
              modules={[Pagination, Autoplay]}
              onSwiper={setSwiper}
              pagination={{
                el: '.testimonials-pagination',
                clickable: true,
              }}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={true}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640:  { slidesPerView: 1, spaceBetween: 20 },
                768:  { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 },
              }}
              className="t-swiper"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={t.id || i}>
                  <TestimonialCard t={t} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right arrow — outer right, vertically centred on the card track */}
            <ArrowBtn
              className="testimonials-next absolute right-0 top-1/2 -translate-y-1/2 z-10"
              label="Next testimonial"
              onClick={() => swiper?.slideNext()}
            >
              <svg
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2.5}
                style={{ width: 18, height: 18, color: themeConfig.colors.primary, transition: 'color 0.2s' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </ArrowBtn>

          </div>

          {/* Pagination dots — unique class, rendered directly below cards */}
          <div className="testimonials-pagination" />

        </div>
      </div>
    </section>
  );
}
