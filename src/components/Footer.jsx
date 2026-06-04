import React from 'react';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'Shopify Development', href: '#services' },
    { label: 'Meta & Google Ads', href: '#services' },
    { label: 'LinkedIn B2B Ads', href: '#services' },
    { label: 'CRO & Analytics', href: '#services' },
  ],
  Company: [
    { label: 'How We Work', href: '#process' },
    { label: 'Why NexusFlow', href: '#matrix' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Client Results', href: '#testimonials' },
  ],
  Contact: [
    { label: 'hello@nexusflow.io', href: 'mailto:hello@nexusflow.io' },
    { label: 'Get a Free Proposal', href: '#quote-form' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="inline-block mb-4">
              <span className="text-xl font-black tracking-tight text-indigo-400">
                Nexus<span className="text-white">Flow</span>
              </span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed">
              Full-service digital agency helping US brands grow through smarter web infrastructure and ROI-driven advertising.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{col}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-white font-bold">Ready to grow your business?</p>
            <p className="text-slate-400 text-sm mt-0.5">Get a free, no-obligation proposal in 24 hours.</p>
          </div>
          <a
            href="#quote-form"
            className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap"
          >
            Start Your Project →
          </a>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} NexusFlow Digital. All rights reserved.</p>
          <p>Built for US brands that want real results.</p>
        </div>
      </div>
    </footer>
  );
}
