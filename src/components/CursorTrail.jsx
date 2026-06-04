'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

const COLORS = [
  '#6366f1', // indigo
  '#38bdf8', // sky
  '#14b8a6', // teal
  '#a78bfa', // violet
  '#34d399', // emerald
  '#fb7185', // rose
  '#fbbf24', // amber
  '#f97316', // orange
];

const DOT_SIZE   = 13;   // px
const LERP       = 0.13; // follow speed  (lower = more lag = more premium)
const CYCLE_MS   = 800;  // ms between color changes
const BLEND_DUR  = 0.7;  // seconds for color transition (< CYCLE_MS/1000)

export default function CursorDot() {
  useEffect(() => {
    // ── Create the dot element ─────────────────────────────────
    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position:      'fixed',
      width:         `${DOT_SIZE}px`,
      height:        `${DOT_SIZE}px`,
      borderRadius:  '50%',
      backgroundColor: COLORS[0],
      boxShadow:     `0 0 12px 3px ${COLORS[0]}70`,
      pointerEvents: 'none',
      zIndex:        '9999',
      top:           '0px',
      left:          '0px',
      opacity:       '0',
      willChange:    'transform, background-color, box-shadow',
    });
    document.body.appendChild(dot);

    // ── Smooth follow via rAF lerp ────────────────────────────
    const xSet = gsap.quickSetter(dot, 'x', 'px');
    const ySet = gsap.quickSetter(dot, 'y', 'px');
    let mouseX = 0, mouseY = 0;
    let dotX   = 0, dotY   = 0;
    let raf;

    const loop = () => {
      dotX += (mouseX - dotX) * LERP;
      dotY += (mouseY - dotY) * LERP;
      xSet(dotX);
      ySet(dotY);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Show dot on first move
    let visible = false;
    const onMove = (e) => {
      mouseX = e.clientX - DOT_SIZE / 2;
      mouseY = e.clientY - DOT_SIZE / 2;
      if (!visible) {
        gsap.to(dot, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        visible = true;
      }
    };
    window.addEventListener('mousemove', onMove);

    // Hide when cursor leaves window
    const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.3 });
    const onEnter = () => { if (visible) gsap.to(dot, { opacity: 1, duration: 0.3 }); };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // ── Burst of trail dots on click ──────────────────────────
    const onClick = (e) => {
      const BURST_COUNT = 10;
      for (let i = 0; i < BURST_COUNT; i++) {
        const burst = document.createElement('div');
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size  = Math.random() * 9 + 5; // 5–14 px

        Object.assign(burst.style, {
          position:        'fixed',
          width:           `${size}px`,
          height:          `${size}px`,
          borderRadius:    '50%',
          backgroundColor: color,
          boxShadow:       `0 0 8px 2px ${color}80`,
          pointerEvents:   'none',
          zIndex:          '9998',
          left:            `${e.clientX - size / 2}px`,
          top:             `${e.clientY - size / 2}px`,
          opacity:         '1',
          willChange:      'transform, opacity',
        });

        document.body.appendChild(burst);

        const angle = (i / BURST_COUNT) * Math.PI * 2 + Math.random() * 0.5;
        const dist  = Math.random() * 70 + 35;

        gsap.to(burst, {
          x:        Math.cos(angle) * dist,
          y:        Math.sin(angle) * dist,
          opacity:  0,
          scale:    0,
          duration: 0.7 + Math.random() * 0.4,
          ease:     'power2.out',
          onComplete: () => burst.remove(),
        });
      }
    };
    window.addEventListener('click', onClick);

    // ── Smooth continuous color cycling ───────────────────────
    let colorIndex = 0;

    const cycleColor = () => {
      colorIndex = (colorIndex + 1) % COLORS.length;
      const color = COLORS[colorIndex];

      // Smooth transition to next color + update glow
      gsap.to(dot, {
        backgroundColor: color,
        boxShadow: `0 0 14px 4px ${color}65`,
        duration: BLEND_DUR,
        ease: 'power1.inOut',
      });

      // Subtle pulse on each color change
      gsap.timeline()
        .to(dot, { scale: 1.35, duration: 0.22, ease: 'power2.out' })
        .to(dot, { scale: 1,    duration: 0.45, ease: 'elastic.out(1, 0.4)' });
    };

    const colorTimer = setInterval(cycleColor, CYCLE_MS);

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(colorTimer);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      dot.remove();
    };
  }, []);

  return null;
}
