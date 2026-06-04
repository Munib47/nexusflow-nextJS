// Home page — Server Component.
// All child sections that use GSAP, Swiper, or React state declare
// 'use client' individually; this shell stays server-rendered.

import Navbar           from '@/components/Navbar';
import Hero             from '@/components/Hero';
import MetricsBar       from '@/components/MetricsBar';
import PainPoints       from '@/components/PainPoints';
import Services         from '@/components/Services';
import ClientGuide      from '@/components/ClientGuide';
import Testimonials     from '@/components/Testimonials';
import ProcessPipeline  from '@/components/ProcessPipeline';
import PortfolioSection from '@/components/Portfolio/PortfolioSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import FAQ              from '@/components/FAQ';
import QuoteForm        from '@/components/QuoteForm';
import Footer           from '@/components/Footer';
import CursorTrail      from '@/components/CursorTrail';

export default function HomePage() {
  return (
    <>
      <CursorTrail />
      <Navbar />
      <Hero />
      <MetricsBar />
      <PainPoints />
      <Services />
      <ClientGuide />
      <section id="testimonials">
        <Testimonials />
      </section>
      <ProcessPipeline />
      <PortfolioSection />
      <AdvantagesSection />
      <FAQ />
      <section id="contact">
        <QuoteForm />
      </section>
      <Footer />
    </>
  );
}
