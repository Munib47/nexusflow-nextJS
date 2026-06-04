/**
 * NexusFlow — Unified Theme & System Configuration
 *
 * This is the single source of truth for all global styling parameters.
 * Edit values here and they propagate automatically across every component.
 *
 * Sections:
 *   cms        → Headless Pluck CMS connection settings
 *   fonts      → Font family + responsive size scales
 *   colors     → Brand color hex values
 *   gradients  → Configurable gradient stop arrays
 *   brand      → Agency metadata (name, email, tagline)
 */

export const themeConfig = {

  // ── Headless Pluck CMS ──────────────────────────────────────────────────────
  // Set baseUrl to your live Pluck CMS domain once deployed.
  // The usePluckCMS hook auto-detects 'yourdomain.com' as a placeholder
  // and skips the network request, rendering static fallback content instead.
  cms: {
    baseUrl: 'https://yourdomain.com/pluck_cms/api/',
    timeout: 5000,                    // ms — abort fetch and fall back to static copy
    endpoints: {
      hero:         'content/hero',
      services:     'content/services',
      testimonials: 'content/testimonials',
      portfolio:    'content/portfolio',
      faq:          'content/faq',
    },
  },

  // ── Typography ──────────────────────────────────────────────────────────────
  fonts: {
    // Core font stack — applied to root <div> in App.jsx
    family: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

    // Exact pixel sizes — used as inline styles when Tailwind is insufficient.
    // Components read these via responsiveFontSize() below.
    sizes: {
      heroHeadline:   { mobile: '2.25rem',  desktop: '4.5rem'   },  // 36px → 72px
      sectionHeading: { mobile: '1.625rem', desktop: '2.25rem'  },  // 26px → 36px
      bodyLead:       { mobile: '1rem',     desktop: '1.125rem' },  // 16px → 18px
      cardTitle:      { mobile: '1rem',     desktop: '1.125rem' },
      eyebrow:        { mobile: '0.7rem',   desktop: '0.75rem'  },  // 11.2px → 12px
    },

    // Tailwind responsive class strings — safe for JIT because the file is in content[].
    // Compose directly into className props.
    tailwind: {
      heroHeadline:   'text-4xl sm:text-5xl lg:text-[72px]',
      sectionHeading: 'text-2xl sm:text-3xl lg:text-4xl',
      bodyLead:       'text-base md:text-lg',
      cardTitle:      'text-base lg:text-lg',
      eyebrow:        'text-[11px] md:text-xs',
    },
  },

  // ── Brand Color Palette ─────────────────────────────────────────────────────
  colors: {
    primary:     '#6366f1',  // indigo-500  — main CTA, links, accents
    secondary:   '#14b8a6',  // teal-500    — secondary highlights
    accent:      '#38bdf8',  // sky-400     — tertiary pops
    highlight:   '#2dd4bf',  // teal-400    — CTA button fill
    headerText:  '#0f172a',  // slate-950   — primary heading color
    bodyText:    '#475569',  // slate-600   — paragraph copy
    mutedText:   '#94a3b8',  // slate-400   — captions, labels
    background:  '#ffffff',  // site canvas
    surface:     '#f8fafc',  // slate-50    — card/panel fill
    surfaceDark: '#020617',  // slate-950   — dark section background
    border:      '#e2e8f0',  // slate-200   — subtle dividers
    borderDark:  '#1e293b',  // slate-800   — dark bg borders
  },

  // ── Gradient Definitions ────────────────────────────────────────────────────
  // Pass any node to cssGradient() or textGradientStyle() helpers below.
  // Fields: from (required), via (optional — null to skip), to (required), dir (optional)
  gradients: {
    // Hero section dark background canvas
    heroBg: {
      from: '#020617',
      via:  '#1e1b4b',
      to:   '#0c1a2e',
      dir:  '135deg',
    },
    // Headline sweep (teal → sky → indigo)
    heroText: {
      from: '#2dd4bf',
      via:  '#7dd3fc',
      to:   '#818cf8',
      dir:  'to right',
    },
    // Standard brand accent — used on section subheading highlights
    brand: {
      from: '#6366f1',
      via:  null,
      to:   '#14b8a6',
      dir:  'to right',
    },
    // Advantages / Why-Us strip background
    stripBg: {
      from: '#f1f5f9',
      via:  null,
      to:   '#e2e8f0',
      dir:  '160deg',
    },
    // PainPoints / ProcessPipeline dark section
    darkSection: {
      from: '#020617',
      via:  '#0f172a',
      to:   '#020617',
      dir:  '160deg',
    },
    // Footer dark canvas
    footerBg: {
      from: '#020617',
      via:  null,
      to:   '#0f172a',
      dir:  '160deg',
    },
    // Indigo badge / pill fills
    badgeFill: {
      from: '#4f46e5',
      via:  null,
      to:   '#6366f1',
      dir:  'to right',
    },
  },

  // ── Agency Brand Metadata ───────────────────────────────────────────────────
  brand: {
    name:    'NexusFlow',
    tagline: 'Full-Service Digital Growth Agency',
    email:   'hello@nexusflow.io',
    ctaPrimary:   'Get a Free Proposal',
    ctaSecondary: 'See Our Services',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Build a CSS linear-gradient() string from a gradient config node.
 * @param {object} g  — gradient node from themeConfig.gradients
 * @returns {string}  — e.g. "linear-gradient(to right, #6366f1, #14b8a6)"
 */
export function cssGradient(g) {
  const dir = g.dir || 'to right';
  if (g.via) {
    return `linear-gradient(${dir}, ${g.from}, ${g.via}, ${g.to})`;
  }
  return `linear-gradient(${dir}, ${g.from}, ${g.to})`;
}

/**
 * Inline style object for CSS gradient text (bg-clip-text pattern).
 * Apply to a <span> containing the gradient words.
 * @param {object} g — gradient node from themeConfig.gradients
 * @returns {object}  — React style prop object
 */
export function textGradientStyle(g) {
  return {
    backgroundImage: cssGradient(g),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline',
  };
}

/**
 * Returns a CSS border value string using a theme color.
 * @param {string} colorKey — key from themeConfig.colors
 * @param {string} width    — e.g. '1px'
 * @returns {string}
 */
export function themeBorder(colorKey, width = '1px') {
  return `${width} solid ${themeConfig.colors[colorKey] || '#e2e8f0'}`;
}
