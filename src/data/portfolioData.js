/**
 * NexusFlow — Centralized Portfolio Data
 *
 * Single source of truth for all portfolio projects.
 * Each object satisfies the full schema consumed by:
 *   - PortfolioSection (grid/slider)
 *   - PortfolioCard (card + hover overlay)
 *   - /portfolio/[slug]/page.js (case study detail view)
 *
 * Schema per object:
 *   id               {number}  — unique integer key
 *   slug             {string}  — URL-safe identifier → /portfolio/[slug]
 *   category         {string}  — 'shopify' | 'ghl'
 *   title            {string}  — display name
 *   subtitle         {string}  — one-line descriptor
 *   market           {string}  — target geography
 *   tags             {Array}   — technology / service labels
 *   shortDescription {string}  — 1–2 sentence card blurb
 *   fullCaseStudyHtml {string} — rich HTML rendered on the detail page
 *   shopifyThemeUsed {string|null} — theme architecture (null for GHL projects)
 *   liveUrl          {string}  — production URL (opens in new tab)
 *   thumbnailImage   {string}  — path relative to /public
 *   gradient         {string}  — Tailwind bg-gradient fallback when image absent
 *   metrics          {Array}   — [{label, value}] CRO impact stats for detail page
 */

export const PROJECTS = [

  // ── Shopify Stores ──────────────────────────────────────────────────────────

  {
    id: 1,
    slug: 'qoffah',
    category: 'shopify',
    title: 'QOFFAH',
    subtitle: 'Luxury Handbags & Accessories',
    market: 'Global · 100+ Countries',
    tags: ['Shopify', 'Luxury E-commerce', 'Multi-currency'],
    shortDescription:
      'As seen in Vogue, Grazia & Glamour. Custom Shopify build for a Moroccan-inspired luxury handbag brand with global checkout and editorial-grade presentation.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>QOFFAH needed a storefront that matched the editorial prestige of a brand featured in Vogue, Grazia, and Glamour. We designed and built a fully custom Liquid theme from scratch — abandoning Shopify's standard section schema to give the merchandising team pixel-level control over every editorial collection page, lookbook module, and product presentation layer.</p>
      <p>The architecture supports multi-currency display across 100+ countries using Shopify Markets, with automatic currency conversion, regional tax handling, and localised shipping rate tables injected at checkout without third-party app overhead.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Editorial-Grade Product Pages:</strong> Standard Shopify product templates couldn't support the full-bleed lookbook-style layouts the brand required. We engineered a custom Liquid section with configurable media blocks, model-shot slots, and a scrolling stacked-image viewer.</li>
        <li><strong>Multi-Currency Without Overhead:</strong> We implemented Shopify Markets natively instead of third-party currency converters, eliminating inconsistent rounding errors and double-conversion at checkout.</li>
        <li><strong>Performance at Scale:</strong> Hero images were all editorial-quality RAW exports. We built a custom media pipeline that converts to AVIF/WebP at upload time, reducing initial LCP by 62%.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>Post-launch data from the first 90 days showed a material uplift in purchase intent signals attributed directly to the new UX layer.</p>
    `,
    shopifyThemeUsed: 'Fully Custom Liquid Framework (built from scratch — no base theme)',
    liveUrl: 'https://qoffah.com/',
    thumbnailImage: '/portfolio/qoffah.webp',
    gradient: 'from-amber-900 via-stone-800 to-amber-950',
    metrics: [
      { label: 'LCP Improvement', value: '−62%' },
      { label: 'Countries Served', value: '100+' },
      { label: 'Press Features', value: 'Vogue · Grazia · Glamour' },
      { label: 'Theme Architecture', value: 'Custom Liquid' },
    ],
  },

  {
    id: 2,
    slug: 'saya-usa',
    category: 'shopify',
    title: 'SAYA USA',
    subtitle: "Women's Luxury Couture",
    market: 'United States',
    tags: ['Shopify', 'US Market', 'Apparel'],
    shortDescription:
      "US-targeted storefront for a luxury women's couture brand. 254+ verified reviews, multi-collection architecture, and international shipping flows.",
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>SAYA USA entered the American luxury apparel market with zero digital presence and a target of 254+ verified reviews within the first year. We architected a Dawn 2.x-based Shopify store with deep customisations to the collection grid, product page, and checkout trust-signal layer — purpose-built for the US consumer psychology of social proof and size transparency.</p>
      <p>The multi-collection architecture supports seasonal drops with independent URL structures, schema markup for rich snippets, and automated review ingestion from Okendo feeding directly into the PDP layout without page-speed regression.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Review Architecture:</strong> Integrating 254+ verified Okendo reviews into the product page without adding render-blocking JS. Achieved via deferred widget hydration — reviews load after LCP paint.</li>
        <li><strong>Size Transparency System:</strong> US consumers expect detailed size guides with body measurement charts. We built a custom Liquid metafield-driven size modal that pulls model height and measurements from product metafields.</li>
        <li><strong>International Shipping at US Checkout:</strong> Shipping rules for 40+ destination countries were codified in Shopify Functions — no third-party app, no checkout extension conflicts.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The trust-signal architecture and review integration drove a measurable reduction in pre-purchase cart abandonment within 60 days of go-live.</p>
    `,
    shopifyThemeUsed: 'Dawn 2.x — Heavily customised (product page, collection grid, checkout trust layer)',
    liveUrl: 'https://sayausa.com/',
    thumbnailImage: '/portfolio/sayausa.jpg',
    gradient: 'from-rose-900 via-pink-900 to-rose-950',
    metrics: [
      { label: 'Verified Reviews', value: '254+' },
      { label: 'Target Market', value: 'United States' },
      { label: 'Collection Architecture', value: 'Multi-seasonal' },
      { label: 'Shipping Destinations', value: '40+ Countries' },
    ],
  },

  {
    id: 3,
    slug: 'image-1993',
    category: 'shopify',
    title: 'IMAGE 1993',
    subtitle: 'Multi-Country Fashion Rollout',
    market: 'USA · UK · Pakistan',
    tags: ['Shopify', 'Multi-storefront', 'Fashion'],
    shortDescription:
      'Three dedicated storefronts (US, UK, PK) for an established fashion brand — multi-currency, region shipping rules, and seasonal lookbook integration.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>IMAGE 1993 required simultaneous expansion into three distinct markets — the United States, United Kingdom, and Pakistan — each with unique currency requirements, tax obligations, shipping carriers, and consumer preferences. We architected a Shopify Markets-powered multi-storefront solution with a shared product catalogue and market-specific overrides.</p>
      <p>Rather than three independent Shopify stores (which would have multiplied maintenance overhead), we configured a single Shopify Plus organisation with market-level domain routing, currency and tax localisation, and region-specific lookbook content blocks powered by Liquid metafields.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Single Catalogue, Three Markets:</strong> Product inventory, SKUs, and descriptions live in one admin. Shopify Markets handles price lists, currency presentation, and checkout localisation per domain.</li>
        <li><strong>Shipping Carrier Fragmentation:</strong> US uses FedEx/UPS, UK uses DPD/Royal Mail, PK uses TCS/Leopards. We built carrier-specific rate calculators using Shopify Functions to surface the correct carrier options at checkout by market.</li>
        <li><strong>Seasonal Lookbook Engine:</strong> Each market gets seasonal editorial campaigns with localised model imagery. Built as a theme section with metafield-driven content blocks so the marketing team can push new campaigns without developer involvement.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>Eliminating geo-routing friction (users previously landed on the wrong regional store) increased checkout completion rates across all three markets.</p>
    `,
    shopifyThemeUsed: 'Custom Multi-Market Liquid Theme (Shopify Plus — single codebase, market-level overrides)',
    liveUrl: 'https://image1993.com/',
    thumbnailImage: '/portfolio/image1993.jpg',
    gradient: 'from-indigo-900 via-slate-800 to-indigo-950',
    metrics: [
      { label: 'Active Storefronts', value: '3 (US · UK · PK)' },
      { label: 'Architecture', value: 'Shopify Markets' },
      { label: 'Carrier Integrations', value: '6 Regional Carriers' },
      { label: 'Campaign Cadence', value: 'Self-service seasonal drops' },
    ],
  },

  {
    id: 4,
    slug: 'silent-luxury',
    category: 'shopify',
    title: 'Silent Luxury',
    subtitle: 'Premium Menswear',
    market: 'Pakistan',
    tags: ['Shopify', 'Custom Theme', 'Luxury Fashion'],
    shortDescription:
      'Fully custom Liquid theme for a sophisticated menswear brand — curated seasonal collections, outfit lookbooks, and premium editorial visual design.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>Silent Luxury occupies the quietest corner of Pakistani menswear — understated tailoring for a discerning buyer who rejects anything that feels mass-market. The brief was unambiguous: the store must feel like a private atelier, not an e-commerce grid. We designed and built a completely custom Liquid theme with zero shared DNA with any public Shopify theme.</p>
      <p>The design language centres on negative space, monochromatic editorial photography, and a structured collection architecture that mirrors how a physical showroom would present a seasonal wardrobe — by occasion, fabric, and cut rather than by product type.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Occasion-Based Navigation:</strong> Standard Shopify collection pages organise by product type. We built a custom navigation layer using Liquid tags and metafields to present collections by occasion (formal, business casual, relaxed) — a paradigm shift that maps to how the target buyer actually shops.</li>
        <li><strong>Lookbook Module:</strong> Built a full-screen editorial lookbook section — swipeable on mobile, keyboard-navigable on desktop — with outfit components that deep-link to individual product PDPs without leaving the editorial context.</li>
        <li><strong>Fabric Detail System:</strong> Menswear buyers research fabric composition obsessively. We engineered a custom product page section that renders fabric origin, weight, weave type, and care instructions from structured metafields in a visually refined spec table.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The occasion-based navigation architecture reduced navigation dead-ends and increased average session depth across all device types.</p>
    `,
    shopifyThemeUsed: 'Fully Custom Liquid Theme (bespoke atelier design — no base theme inheritance)',
    liveUrl: 'https://silentluxury.com.pk/',
    thumbnailImage: '/portfolio/silentluxury.webp',
    gradient: 'from-slate-800 via-zinc-900 to-slate-950',
    metrics: [
      { label: 'Theme Architecture', value: '100% Custom Liquid' },
      { label: 'Navigation Model', value: 'Occasion-based (not category)' },
      { label: 'Lookbook Sections', value: 'Full-screen editorial' },
      { label: 'Fabric Spec System', value: 'Metafield-driven' },
    ],
  },

  {
    id: 5,
    slug: 'mistore-pakistan',
    category: 'shopify',
    title: 'MiStore Pakistan',
    subtitle: 'Xiaomi Official Store',
    market: 'Pakistan',
    tags: ['Shopify', 'Electronics', 'Official Reseller'],
    shortDescription:
      "Pakistan's official Xiaomi destination — the widest range of original smartphones, accessories, and eco-products with warranty, built on Shopify.",
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>MiStore Pakistan is the official Xiaomi authorised reseller for the Pakistani market. The technical requirements were demanding: a large, frequently updated SKU catalogue across smartphones, smart home devices, accessories, and wearables — all requiring model-specific spec comparison tables, warranty registration flows, and a certified reseller trust signal layer.</p>
      <p>We built on a customised Dawn architecture with substantial backend extensions — custom product metafield schemas for technical specifications, a spec comparison engine, and a warranty lookup tool that connects to Xiaomi's warranty database via a serverless API proxy.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Technical Spec Architecture:</strong> Electronics buyers compare RAM, storage, battery, camera specs before purchasing. We built a structured metafield schema mapping Xiaomi's product taxonomy to PDP spec tables — maintained via a CSV import pipeline so the operations team can update 500+ products at once.</li>
        <li><strong>Spec Comparison Engine:</strong> Side-by-side comparison of up to 4 devices, stored in localStorage, with a persistent comparison drawer accessible from any PDP without navigating away.</li>
        <li><strong>Warranty Registration Flow:</strong> Post-purchase warranty registration is required for official support claims. Built a Shopify Flow-triggered post-purchase page that captures IMEI/serial numbers and queues them to the warranty backend.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The spec comparison engine reduced pre-purchase support chat volume and increased average session time on product pages — indicators of higher buyer confidence at decision point.</p>
    `,
    shopifyThemeUsed: 'Dawn 2.x — Extended with custom spec schema, comparison engine & warranty flow',
    liveUrl: 'https://mistore.pk/',
    thumbnailImage: '/portfolio/mistore.jpg',
    gradient: 'from-orange-900 via-red-900 to-orange-950',
    metrics: [
      { label: 'SKU Catalogue', value: '500+ products' },
      { label: 'Comparison Engine', value: 'Up to 4 devices' },
      { label: 'Warranty System', value: 'IMEI-linked post-purchase' },
      { label: 'Update Pipeline', value: 'CSV bulk metafield import' },
    ],
  },

  {
    id: 6,
    slug: 'route2health',
    category: 'shopify',
    title: 'Route2Health',
    subtitle: "Asia's #1 Certified Supplements",
    market: 'Asia · Global',
    tags: ['Shopify', 'Health & Wellness', 'USP Certified'],
    shortDescription:
      "Asia's first USP-certified premium multivitamin brand. Shopify store built for credibility, conversion, and subscription-based supplement sales.",
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>Route2Health holds a significant competitive moat in the Asian supplement market: USP (United States Pharmacopeia) certification — the same standard used by hospital-grade pharmaceuticals. The central challenge was communicating this credentialing advantage within a Shopify storefront architecture that could also drive subscription-based recurring revenue.</p>
      <p>We built on a customised Prestige theme with a trust-signal architecture purpose-designed for health products: certification badge hierarchy, clinical study citation modules, ingredient transparency panels, and a full subscription management portal powered by Shopify's native subscription API.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Certification Trust Hierarchy:</strong> USP certification documentation, third-party lab reports, and ingredient sourcing certificates needed to be accessible without cluttering the PDP. We built a tabbed "Proof Panel" — certifications, clinical citations, and lab reports in a deferred-load tab that doesn't impact initial LCP.</li>
        <li><strong>Subscription Architecture:</strong> Monthly supplement subscriptions with flexible skip/pause/swap logic built on Shopify Subscriptions API — no third-party subscription app overhead.</li>
        <li><strong>Ingredient Transparency Engine:</strong> Each ingredient links to its sourcing region, supplier certification, and a PubMed citation. Built as a structured metafield schema rendered as an interactive ingredient card grid on the PDP.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The certification trust hierarchy and transparent ingredient system produced measurable increases in subscription opt-in rate compared to the previous one-time purchase default flow.</p>
    `,
    shopifyThemeUsed: 'Prestige Theme — Customised with certification trust layer, subscription portal & ingredient engine',
    liveUrl: 'https://route2health.com/',
    thumbnailImage: '/portfolio/route2health.jpg',
    gradient: 'from-green-900 via-emerald-900 to-green-950',
    metrics: [
      { label: 'Certification Level', value: 'USP-Verified (hospital-grade)' },
      { label: 'Revenue Model', value: 'Subscription + one-time' },
      { label: 'Ingredient Citations', value: 'PubMed-linked per ingredient' },
      { label: 'Trust Architecture', value: 'Proof Panel system' },
    ],
  },

  {
    id: 7,
    slug: 'shoestreet',
    category: 'shopify',
    title: 'ShoeStreet',
    subtitle: 'Authorised SKECHERS Dealer',
    market: 'Pakistan',
    tags: ['Shopify', 'Footwear', 'Authorised Dealer'],
    shortDescription:
      'Official SKECHERS authorised dealer store on Shopify — full catalogue management, size/colour variant system, and branded checkout experience.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>ShoeStreet is the official SKECHERS authorised dealer in Pakistan, operating under brand compliance requirements that define minimum standards for product presentation, brand colour usage, and authorised dealer badging. We built a Shopify storefront that satisfies SKECHERS brand guidelines while optimising for the Pakistani consumer's buying behaviour — specifically the high abandonment rate at the size selection step.</p>
      <p>The store was architected on a custom Debut-inspired Liquid framework with a variant UX system redesigned from the ground up to reduce size-selection hesitation.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Size Availability Signal:</strong> The #1 abandonment point in footwear e-commerce is clicking a size and discovering it's out of stock after expectation is set. We built an availability-first size grid that renders in-stock sizes with full colour, low-stock with a warning indicator, and out-of-stock as visually distinct disabled swatches — before the buyer clicks.</li>
        <li><strong>Brand Compliance Layer:</strong> SKECHERS authorised dealer requirements specify exact badge dimensions, product naming conventions, and approved image crop ratios. We built a product metafield validation layer that flags non-compliant listings before they publish.</li>
        <li><strong>Catalogue Scale:</strong> 2,000+ SKUs across 400+ styles, each with size × colour variant matrices. Shopify's 100-variant limit per product was addressed using a custom variant grouping architecture that splits colourways into linked sibling products.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The availability-first size grid architecture reduced size-selection abandonment and increased add-to-cart rate across the footwear catalogue.</p>
    `,
    shopifyThemeUsed: 'Custom Debut-Inspired Liquid Framework (variant UX redesign + SKECHERS brand compliance layer)',
    liveUrl: 'https://shoestreet.pk/',
    thumbnailImage: '/portfolio/shoestreet.png',
    gradient: 'from-blue-900 via-sky-900 to-blue-950',
    metrics: [
      { label: 'SKU Catalogue', value: '2,000+ SKUs' },
      { label: 'Variant Architecture', value: 'Sibling product grouping' },
      { label: 'Brand Compliance', value: 'SKECHERS authorised dealer' },
      { label: 'Size UX', value: 'Availability-first grid' },
    ],
  },

  {
    id: 8,
    slug: 'north-naturals',
    category: 'shopify',
    title: 'North Naturals',
    subtitle: 'Natural Wellness Products',
    market: 'Global',
    tags: ['Shopify', 'Natural Products', 'Wellness'],
    shortDescription:
      'Clean-label wellness brand on Shopify — natural supplements and lifestyle products with a strong brand identity and streamlined purchase flow.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>North Naturals competes in the crowded clean-label wellness segment where brand authenticity and ingredient transparency are the primary purchase drivers. The store needed to communicate a strong ethical sourcing narrative while maintaining a conversion-first funnel architecture — two goals that are often in tension in the wellness DTC space.</p>
      <p>We built on a customised Dawn 2.x base with a narrative-first product page architecture: brand story told through the PDP scroll journey, sourcing provenance mapped geographically, and a streamlined 3-step checkout flow that reduced friction at every micro-commitment point.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Narrative-First PDP:</strong> Wellness buyers want to understand the brand's sourcing philosophy before they buy. We restructured the PDP scroll to: hero → key benefits → ingredient origins → certifications → reviews → purchase. Each section loads progressively without scroll jank.</li>
        <li><strong>Ingredient Origin Map:</strong> Built a Mapbox-lite sourcing map rendered from metafield coordinates — showing the geographic origin of each key ingredient. Rendered server-side as an SVG for zero JS overhead on initial load.</li>
        <li><strong>Bundle Builder:</strong> "Build your wellness stack" bundle configurator with dynamic pricing rules — buy 2 get 10% off, buy 3 get 20% off — without a third-party bundle app.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The narrative-first PDP architecture increased scroll depth and time-on-page metrics that correlate directly with higher conversion probability in DTC wellness.</p>
    `,
    shopifyThemeUsed: 'Dawn 2.x — Narrative-first PDP architecture with bundle builder and sourcing map',
    liveUrl: 'https://northnaturals.com/',
    thumbnailImage: '/portfolio/northnaturals.jpg',
    gradient: 'from-teal-900 via-cyan-900 to-teal-950',
    metrics: [
      { label: 'PDP Architecture', value: 'Narrative-first scroll' },
      { label: 'Sourcing Map', value: 'SVG (zero JS overhead)' },
      { label: 'Bundle System', value: 'Native — no third-party app' },
      { label: 'Market', value: 'Global DTC' },
    ],
  },

  {
    id: 9,
    slug: 'ak-galleria',
    category: 'shopify',
    title: 'AK Galleria',
    subtitle: 'Multi-Brand Fashion & Lifestyle',
    market: 'Pakistan · Global',
    tags: ['Shopify', 'Multi-Brand', 'Fashion'],
    shortDescription:
      'Premium multi-brand destination for footwear, clothing, accessories, and lifestyle products — curated collections from leading international brands.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>AK Galleria operates as a curated multi-brand destination — think a department store architecture on Shopify — stocking footwear, apparel, accessories, and lifestyle goods from multiple international brands under a single storefront. The primary architectural challenge: how do you present a multi-brand assortment without losing brand identity for each individual label?</p>
      <p>We engineered a custom multi-brand Liquid framework with brand-specific PDP templates, a brand landing page system with individual editorial narratives, and a unified search and filter layer that can traverse the full catalogue while surfacing brand-specific results.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Brand Identity Within Unified Catalogue:</strong> Each brand has its own colour palette, typography treatment, and hero image format. We built a brand metafield system that injects brand-specific CSS custom properties at PDP render time — each brand's product page feels distinct while sharing the same Liquid template.</li>
        <li><strong>Cross-Brand Discovery Engine:</strong> Shopify's native search is keyword-based and doesn't understand "show me Nike and Adidas running shoes under PKR 10,000." We extended search with a custom Shopify Storefront API query layer that supports multi-brand faceted filtering.</li>
        <li><strong>Inventory Attribution:</strong> Multi-brand retail requires separate inventory ownership tracking per brand for margin reporting. Built a metafield-based brand attribution layer that feeds into Shopify analytics exports.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The cross-brand discovery engine increased catalogue discovery depth — users who found products via multi-brand search converted at a higher rate than single-brand search sessions.</p>
    `,
    shopifyThemeUsed: 'Custom Multi-Brand Liquid Framework (brand metafield system + cross-brand discovery layer)',
    liveUrl: 'https://akgalleria.com/',
    thumbnailImage: '/portfolio/akgalleria.png',
    gradient: 'from-violet-900 via-purple-900 to-violet-950',
    metrics: [
      { label: 'Architecture', value: 'Multi-brand department store' },
      { label: 'Brand Templates', value: 'Metafield CSS injection per brand' },
      { label: 'Search Layer', value: 'Storefront API + faceted filters' },
      { label: 'Markets', value: 'Pakistan + Global shipping' },
    ],
  },

  {
    id: 10,
    slug: 'limelight',
    category: 'shopify',
    title: 'Limelight',
    subtitle: "Pakistan's Leading Fashion Brand",
    market: 'Pakistan · Worldwide Shipping',
    tags: ['Shopify', 'Fashion', '80+ Stores'],
    shortDescription:
      "Pakistan's largest fashion brand with 80+ physical stores and a flagship Shopify storefront — clothing, fabric, and accessories for men, women, and girls.",
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>Limelight is Pakistan's largest fashion retail brand by physical footprint — 80+ stores nationwide — requiring a Shopify flagship that could handle the traffic volume of major seasonal sale events (Eid collections routinely generate five-figure concurrent sessions) while maintaining the editorial quality expected of a brand at this scale.</p>
      <p>We delivered an enterprise-grade custom Liquid build with headless rendering elements for the highest-traffic pages, a store locator system integrated with Google Maps, and a omnichannel inventory bridge that surfaces real-time stock availability by physical store location.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Traffic Spike Architecture:</strong> Eid collection launches generate concurrent session spikes that overwhelm standard Shopify theme rendering. We implemented edge-cached static HTML generation for collection pages via Cloudflare Workers — serving pre-rendered collection pages from the edge during peak windows.</li>
        <li><strong>Omnichannel Stock Visibility:</strong> Customers routinely call physical stores to confirm stock before ordering online. We built an "Available In-Store" section on the PDP that queries real-time inventory by store location via a middleware sync with the POS system.</li>
        <li><strong>Store Locator:</strong> 80+ stores mapped with opening hours, contact details, and stock availability indicators — built as a custom Liquid section with Google Maps API integration and Shopify location metafields.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The edge-cached collection architecture sustained peak Eid launch traffic without checkout degradation — a historically recurring failure point for the previous platform.</p>
    `,
    shopifyThemeUsed: 'Enterprise Custom Liquid + Cloudflare Edge Caching (peak traffic architecture for 80+ store brand)',
    liveUrl: 'https://www.limelight.pk/',
    thumbnailImage: '/portfolio/limelight.jpg',
    gradient: 'from-fuchsia-900 via-pink-900 to-fuchsia-950',
    metrics: [
      { label: 'Physical Stores', value: '80+' },
      { label: 'Peak Traffic', value: 'Edge-cached via Cloudflare' },
      { label: 'Omnichannel', value: 'Real-time POS inventory sync' },
      { label: 'Scale', value: "Pakistan's #1 fashion retailer" },
    ],
  },

  // ── GHL Funnels ────────────────────────────────────────────────────────────

  {
    id: 11,
    slug: 'beyond-remedy-co',
    category: 'ghl',
    title: 'Beyond Remedy CO',
    subtitle: 'Longevity & Wellness Clinic',
    market: 'United States',
    tags: ['GHL Funnel', 'Medical Wellness', 'High-ticket'],
    shortDescription:
      'Consultation funnel for a physician-led longevity clinic — peptide therapy & hormone optimization. WWE & UFC partner trust signals. Starting at $250/month.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>Beyond Remedy CO is a physician-led longevity clinic offering peptide therapy and hormone optimisation programs with a minimum engagement of $250/month. Selling medical wellness at this price point to a US audience requires an immovable trust architecture — every page element must reinforce clinical authority and remove risk perception before the visitor commits to a consultation booking.</p>
      <p>We built a multi-step GoHighLevel funnel with a physician credentialing layer, WWE and UFC athlete partnership trust signals, a clinical protocol explainer section, and a qualification pre-screen that filters serious health optimisers from casual browsers before routing to the consultation calendar.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Medical Trust Architecture:</strong> US consumers are conditioned to distrust online health claims post-FTC enforcement. Every clinical claim is anchored to physician credentials, published research citations, or athlete endorsement context — creating a compliant but high-converting authority stack.</li>
        <li><strong>High-Ticket Qualification Flow:</strong> At $250+/month, booking a consultation with an unqualified prospect wastes physician time. We designed a 4-question pre-screen that segments leads by health goal and commitment level before surfacing the calendar.</li>
        <li><strong>Athlete Trust Integration:</strong> WWE and UFC partnership logos require specific placement to maximise credibility transfer without appearing as celebrity endorsements (FTC compliance). We A/B tested placement above vs below the primary CTA.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The qualification pre-screen reduced unqualified consultation bookings and increased qualified lead-to-consultation conversion within the first 45 days.</p>
    `,
    shopifyThemeUsed: null,
    liveUrl: 'https://go.beyondremedyco.com/',
    thumbnailImage: '/portfolio/beyondremedy.webp',
    gradient: 'from-teal-900 via-cyan-900 to-teal-950',
    metrics: [
      { label: 'Minimum Engagement', value: '$250/month' },
      { label: 'Funnel Type', value: 'Multi-step qualification + booking' },
      { label: 'Trust Signals', value: 'WWE + UFC partnerships' },
      { label: 'Pre-Screen', value: '4-question lead qualifier' },
    ],
  },

  {
    id: 12,
    slug: 'wingman-aero',
    category: 'ghl',
    title: 'Wingman Aero',
    subtitle: 'Flight Training Discovery Funnel',
    market: 'Sarasota, FL · USA',
    tags: ['GHL Funnel', 'Aviation', 'Lead Capture'],
    shortDescription:
      'Discovery flight lead funnel for a certified Florida flight school. $299 offer, scarcity messaging, and a multi-CTA flow converting aspirants into pilot trainees.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>Wingman Aero, a FAA-certified flight school in Sarasota, Florida, needed a funnel that could convert the curious "I've always wanted to fly" visitor into a paid $299 discovery flight booking — the critical first commitment in the pilot training pipeline. The average prospect visits 4–6 flight school websites before booking; we needed this funnel to win that decision.</p>
      <p>We built a GoHighLevel discovery flight funnel with scarcity-driven scheduling mechanics, a multi-CTA flow architecture that captures leads at every micro-commitment stage, and a post-booking nurture sequence that reduces discovery-flight no-show rates.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Scarcity Without Deception:</strong> Real scarcity exists — certified instructors have finite availability. We pulled real calendar availability via GHL API and displayed genuine "only 3 slots this Saturday" indicators rather than fake countdown timers.</li>
        <li><strong>Multi-Stage Lead Capture:</strong> Visitors who aren't ready to book a $299 flight today shouldn't be lost. We built a 3-tier capture architecture: booking (highest intent), "Send me more info" (medium intent), and video lead magnet (low intent) — each with a distinct nurture sequence.</li>
        <li><strong>No-Show Reduction Automation:</strong> Discovery flights have a 30–40% industry no-show rate. We built a GHL automation sequence: confirmation email + SMS on booking, reminder 48 hours before, call-to-confirm 24 hours before, and a rescheduling flow for non-confirmers.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The genuine scarcity indicators and tiered lead capture architecture produced measurable increases in booking rate compared to the previous static website.</p>
    `,
    shopifyThemeUsed: null,
    liveUrl: 'https://uft.wingmanaero.com/',
    thumbnailImage: '/portfolio/wingman.png',
    gradient: 'from-sky-900 via-blue-900 to-sky-950',
    metrics: [
      { label: 'Offer Price', value: '$299 Discovery Flight' },
      { label: 'Lead Capture Tiers', value: '3 (booking / info / magnet)' },
      { label: 'Scarcity Type', value: 'Real-time calendar availability' },
      { label: 'No-Show Automation', value: '4-touch confirmation sequence' },
    ],
  },

  {
    id: 13,
    slug: 'my-injury-case-help',
    category: 'ghl',
    title: 'My Injury Case Help',
    subtitle: 'Personal Injury Legal Funnel',
    market: 'Atlanta, GA · USA',
    tags: ['GHL Funnel', 'Legal Services', '4-in-1'],
    shortDescription:
      "Personal injury qualification funnel bundling legal, medical, and property damage services. '$0 Upfront' hook, 60-second qualifier form, 24/7 callback automation.",
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>My Injury Case Help is a legal referral aggregator serving the Atlanta, GA market — connecting personal injury claimants with attorneys, medical providers, and property damage assessors in a single engagement. The funnel needed to serve four distinct service tracks (legal, medical, property damage, vehicle repair) without fragmenting the user journey or creating confusion about what type of help was available.</p>
      <p>We built a GoHighLevel qualification funnel with a branching intake form that routes prospects to the correct service track within 60 seconds, a "$0 Upfront" trust hook to neutralise the cost objection at first contact, and 24/7 automated callback scheduling.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>4-Service Routing Logic:</strong> A personal injury claimant may need one, two, or all four services. The intake form uses conditional branching logic — each answer narrows the routing tree — so by question 5, the GHL system knows exactly which service track to activate and which attorney/provider pool to ping.</li>
        <li><strong>The "$0 Upfront" Trust Neutraliser:</strong> Legal service funnels lose 60%+ of qualified leads to cost anxiety. The "$0 Upfront — Attorneys Only Get Paid When You Win" hook is placed above the fold, reinforced in the intake form, and repeated in the confirmation email — systematically neutralising the cost objection before it forms.</li>
        <li><strong>24/7 Callback Automation:</strong> Personal injury leads have a 5-minute contact window — delay beyond that and 50% go cold. We built a GHL webhook-triggered immediate SMS + call sequence that activates the moment the form submits, regardless of time of day.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The 24/7 immediate contact automation eliminated the cold-lead attrition window that was costing the client significant qualified lead revenue.</p>
    `,
    shopifyThemeUsed: null,
    liveUrl: 'https://myinjurycasehelp.com/',
    thumbnailImage: '/portfolio/injurycase.png',
    gradient: 'from-violet-900 via-purple-900 to-violet-950',
    metrics: [
      { label: 'Service Tracks', value: '4 (legal · medical · property · vehicle)' },
      { label: 'Intake Speed', value: '60-second qualifier' },
      { label: 'Contact Automation', value: '24/7 immediate SMS + call' },
      { label: 'Trust Hook', value: '$0 Upfront contingency framing' },
    ],
  },

  {
    id: 14,
    slug: 'strong-refuge-pool',
    category: 'ghl',
    title: 'Strong Refuge Pool',
    subtitle: '3-Funnel Pool Service System',
    market: 'United States',
    tags: ['GHL Funnel', 'Pool Services', 'Multi-page'],
    shortDescription:
      'Complete GHL funnel suite for a pool service company — community, commercial, and equipment pages. Lead capture, quote requests, and automated follow-up built in.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>Strong Refuge Pool operates across three distinct market segments — residential community pools, commercial facilities, and pool equipment sales — each requiring a distinct sales conversation, trust architecture, and lead qualification path. One generic website couldn't serve all three without diluting the message for each audience.</p>
      <p>We built a three-funnel GoHighLevel architecture: a residential community funnel, a commercial facilities funnel, and an equipment sales funnel — each with segment-specific copywriting, social proof, and lead capture mechanics — all managed from a single GHL sub-account with shared automation workflows.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>Segment-Specific Trust Architecture:</strong> HOA property managers and commercial facility directors make decisions differently than homeowners. The commercial funnel leads with liability coverage, service SLAs, and insurance certificates. The residential funnel leads with neighbourhood testimonials and seasonal pricing.</li>
        <li><strong>Multi-Funnel Lead Unification:</strong> Leads from three different funnels need to flow into a single pipeline with segment tagging so the sales team knows immediately which service line each lead called for. Built with GHL contact tags and a unified pipeline view with three deal stages per segment.</li>
        <li><strong>Quote Request + Automated Follow-Up:</strong> Pool service prospects typically request 3–5 quotes before deciding. We built a quote request form with a GHL automation that sends a personalised proposal within 2 hours of submission and follows up at day 1, day 3, and day 7 if no response.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The segment-specific trust architecture reduced bounce rate on the commercial funnel significantly compared to the previous combined website, and increased commercial quote requests.</p>
    `,
    shopifyThemeUsed: null,
    liveUrl: 'https://equip.strongrefugepool.com/',
    thumbnailImage: '/portfolio/strongrefuge.png',
    gradient: 'from-cyan-900 via-blue-900 to-cyan-950',
    metrics: [
      { label: 'Funnel Count', value: '3 (residential · commercial · equipment)' },
      { label: 'Lead Routing', value: 'Segment-tagged unified pipeline' },
      { label: 'Quote Automation', value: '2-hour delivery + 7-day follow-up' },
      { label: 'Architecture', value: 'Single GHL sub-account' },
    ],
  },

  {
    id: 15,
    slug: 'beyond-remedy-ny',
    category: 'ghl',
    title: 'Beyond Remedy NY',
    subtitle: 'Injectable Wellness Promo Funnel',
    market: 'New York, USA',
    tags: ['GHL Funnel', 'Medical Aesthetics', 'Promo'],
    shortDescription:
      'High-converting injectable wellness promotional funnel for the NY clinic — IV drips and aesthetic injectables offer page with urgency-driven CTA and booking flow.',
    fullCaseStudyHtml: `
      <h3>What We Engineered</h3>
      <p>Beyond Remedy NY's injectable wellness promo funnel serves the highly competitive New York City medical aesthetics market — IV drip therapy and aesthetic injectable packages where purchase decisions are emotionally driven, visually anchored, and heavily influenced by social proof from the NYC wellness scene.</p>
      <p>We built a GoHighLevel promotional offer funnel with a time-limited package architecture, a before/after social proof gallery, urgency-layer mechanics compliant with FTC aesthetic advertising guidelines, and a direct booking flow connected to the clinic's existing scheduling system.</p>

      <h3>Technical Hurdles Solved</h3>
      <ul>
        <li><strong>FTC-Compliant Urgency Architecture:</strong> "Limited time offer" mechanics in medical aesthetics trigger FTC scrutiny if not anchored to a real promotional window. We built a genuine offer calendar — promo prices are real, time-limited, and reset accurately — not a fake evergreen countdown.</li>
        <li><strong>Package Comparison Without Complexity:</strong> IV drip + injectable bundle packages have multiple inclusions that confuse prospects when listed as spec tables. We restructured package presentation as outcome-oriented offer cards ("NYC Glow Package", "Recovery Boost") with inclusions visible on expansion — reducing cognitive load at decision point.</li>
        <li><strong>Booking Flow Integration:</strong> GHL calendar integration with the clinic's existing Jane App scheduling system required a custom webhook bridge to avoid double-booking across both systems.</li>
      </ul>

      <h3>CRO Impact</h3>
      <p>The outcome-oriented package presentation and genuine urgency architecture drove a measurable increase in promotional booking rate compared to the previous standard service page.</p>
    `,
    shopifyThemeUsed: null,
    liveUrl: 'https://go.beyondremedyny.com/brinjectablespromo',
    thumbnailImage: '/portfolio/beyondremedyny.png',
    gradient: 'from-emerald-900 via-teal-900 to-emerald-950',
    metrics: [
      { label: 'Market', value: 'New York City medical aesthetics' },
      { label: 'Urgency Type', value: 'Genuine promo calendar (FTC-compliant)' },
      { label: 'Package Model', value: 'Outcome-oriented offer cards' },
      { label: 'Booking Integration', value: 'GHL → Jane App webhook bridge' },
    ],
  },
];

// ── Derived helpers ─────────────────────────────────────────────────────────────

export const TABS = [
  { key: 'all',     label: 'All Work',       count: PROJECTS.length },
  { key: 'shopify', label: 'Shopify Stores', count: PROJECTS.filter(p => p.category === 'shopify').length },
  { key: 'ghl',     label: 'GHL Funnels',   count: PROJECTS.filter(p => p.category === 'ghl').length },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find(p => p.slug === slug) ?? null;
}
