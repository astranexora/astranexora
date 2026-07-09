import { useEffect } from 'react';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import About from '../components/About';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Founder from '../components/Founder';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <ClientLogos />
      <About />
      <WhyUs />
      <Services />
      <Portfolio />
      <Founder />
      <Stats />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
