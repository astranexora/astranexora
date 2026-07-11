import { useEffect } from 'react';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import About from '../components/About';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import VideoShowcase from '../components/VideoShowcase';
import Founder from '../components/Founder';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

function NavyDivider({ label, num }: { label?: string; num?: string }) {
  return (
    <div className="relative navy-divider py-4 md:py-5 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
        {num && (
          <span className="font-display font-bold text-2xl md:text-3xl text-white/30 select-none">{num}</span>
        )}
        {label && (
          <span className="font-display text-xs md:text-sm tracking-[0.25em] uppercase text-white/60">{label}</span>
        )}
        <div className="flex-1 mx-6 h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-enter">
      <Hero />
      <ClientLogos />
      <About />
      <NavyDivider label="Why Choose Us" num="02" />
      <WhyUs />
      <Services />
      <NavyDivider label="Selected Work" num="04" />
      <Portfolio />
      <VideoShowcase />
      <Founder />
      <Stats />
      <NavyDivider label="Client Voices" num="09" />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
