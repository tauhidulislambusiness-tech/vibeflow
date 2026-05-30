'use client';

import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import AntiGravitySlider from './components/AntiGravitySlider';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import WaterRipple from './components/WaterRipple';

export default function Home() {
  return (
    <>
      <CursorTrail />
      <WaterRipple />
      <Navbar />

      <main>
        <Hero />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Portfolio />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <AntiGravitySlider />
        <div className="section-divider" />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/8801XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
      >
        <span className="whatsapp-fab__pulse" />
        <MessageCircle size={26} fill="#fff" strokeWidth={0} />
      </a>
    </>
  );
}
