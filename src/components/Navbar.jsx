'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ── Nav links — each `id` must match an actual section id on the page ─────────
const NAV_LINKS = [
  { href: '#services',  label: 'Services',    id: 'services'  },
  { href: '#process',   label: 'How We Work', id: 'process'   },
  { href: '#portfolio', label: 'Portfolio',   id: 'portfolio' },
  { href: '#pricing',   label: 'Pricing',     id: 'pricing'   },
  { href: '#faq',       label: 'FAQ',         id: 'faq'       },
];

const NAVBAR_HEIGHT = 80; // matches h-20 (5rem)

export default function Navbar() {
  const mobileMenuRef       = useRef(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState('');
  const [scrolled, setScrolled]   = useState(false);

  // ── Scroll-spy via scroll listener ────────────────────────────────────────
  // Logic: iterate every watched section top-to-bottom. Keep updating `found`
  // for every section whose top edge is at or above (navbar + 60px). The LAST
  // match is the deepest section the user has scrolled into → that's active.
  // After the loop, if the matched section's bottom has also scrolled above the
  // trigger (user is in an unmapped area like the contact form or footer), or
  // if the user is at the very bottom of the page, we clear active to ''.
  useEffect(() => {
    const TRIGGER = NAVBAR_HEIGHT + 60;

    const handleScroll = () => {
      let found = '';

      const atPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      if (!atPageBottom) {
        for (const { id } of NAV_LINKS) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= TRIGGER) found = id;
        }

        // User has scrolled past the bottom of the last matched section
        // into an unmapped area (contact form, footer, etc.) — clear active.
        if (found) {
          const foundEl = document.getElementById(found);
          if (foundEl && foundEl.getBoundingClientRect().bottom <= TRIGGER) {
            found = '';
          }
        }
      }

      setActiveId(found); // always call so clearing to '' is never skipped
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount to set initial active state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Scrolled state — adds extra shadow below the glass bar ────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Smooth scroll with navbar offset ──────────────────────────────────────
  const scrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // ── Mobile menu GSAP open / close ─────────────────────────────────────────
  const openMenu = () => {
    setMenuOpen(true);
    gsap.fromTo(
      mobileMenuRef.current,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }
    );
  };

  const closeMenu = () => {
    gsap.to(mobileMenuRef.current, {
      height: 0, opacity: 0, duration: 0.25, ease: 'power3.in',
      onComplete: () => setMenuOpen(false),
    });
  };

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  const handleNavClick = (e, href) => {
    scrollTo(e, href);
    if (menuOpen) closeMenu();
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter:  'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom:    '1px solid rgba(30, 41, 59, 0.8)',
        boxShadow:       scrolled ? '0 4px 32px -4px rgba(0,0,0,0.45)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center shrink-0"
        >
          <span className="text-2xl font-black tracking-tight text-indigo-400">
            Nexus<span className="text-white">Flow</span>
          </span>
        </a>

        {/* ── Desktop nav links ─────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className="relative text-sm font-semibold transition-colors duration-200"
                style={{ color: isActive ? '#818cf8' : '#94a3b8' }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = '#94a3b8';
                }}
              >
                {link.label}

                {/* Active glowing underline */}
                <span
                  className="absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    width:      isActive ? '100%' : '0%',
                    backgroundColor: '#6366f1',
                    boxShadow:  isActive ? '0 0 10px 1px rgba(99,102,241,0.7)' : 'none',
                  }}
                />
              </a>
            );
          })}
        </div>

        {/* ── Desktop CTA + hamburger ───────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={e => handleNavClick(e, '#contact')}
            className="hidden md:inline-flex items-center font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200"
            style={{
              backgroundColor: '#6366f1',
              color: '#ffffff',
              boxShadow: '0 4px 16px -4px rgba(99,102,241,0.55)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#4f46e5';
              e.currentTarget.style.boxShadow = '0 6px 20px -4px rgba(99,102,241,0.7)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#6366f1';
              e.currentTarget.style.boxShadow = '0 4px 16px -4px rgba(99,102,241,0.55)';
            }}
          >
            Free Proposal
          </a>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 rounded-lg items-center transition-colors duration-200"
            style={{ backgroundColor: menuOpen ? 'rgba(99,102,241,0.15)' : 'transparent' }}
          >
            <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer — GSAP animates height ──────────────────────── */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0, borderTop: '1px solid rgba(30,41,59,0.8)' }}
      >
        <div className="px-4 pb-5 pt-3 flex flex-col gap-1">
          {NAV_LINKS.map(link => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className="py-3 px-4 rounded-xl text-sm font-semibold transition-colors duration-200"
                style={{
                  color:           isActive ? '#818cf8' : '#cbd5e1',
                  backgroundColor: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                }}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={e => handleNavClick(e, '#contact')}
            className="mt-2 font-bold text-sm px-5 py-3 rounded-xl text-center transition-colors duration-200"
            style={{ backgroundColor: '#6366f1', color: '#ffffff' }}
          >
            Free Proposal
          </a>
        </div>
      </div>
    </nav>
  );
}
