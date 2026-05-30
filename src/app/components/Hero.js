'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from('.hero__eyebrow', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
        })
          .from(
            '.hero__headline-word',
            {
              y: 100,
              opacity: 0,
              duration: 1,
              stagger: 0.08,
            },
            '-=0.4'
          )
          .from(
            '.hero__sub',
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.5'
          )
          .from(
            '.hero__actions',
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
            },
            '-=0.4'
          )
          .from(
            '.hero__scroll-hint',
            {
              opacity: 0,
              duration: 1,
            },
            '-=0.2'
          );
      }, sectionRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  const scrollToServices = (e) => {
    e.preventDefault();
    const el = document.querySelector('#services');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Background effects — three soft gradient orbs */}
      <div className="hero__orb hero__orb--purple" />
      <div className="hero__orb hero__orb--cyan" />
      <div className="hero__orb hero__orb--pink" />

      <div className="hero__content">
        {/* Eyebrow */}
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          vibeflow.team
          <span className="hero__eyebrow-line" />
        </div>

        {/* Headline */}
        <h1 className="hero__headline">
          <span className="hero__headline-line">
            <span className="hero__headline-word">Out&nbsp;</span>
            <span className="hero__headline-word">of&nbsp;</span>
            <span className="hero__headline-word">Nowhere.&nbsp;</span>
          </span>
          <span className="hero__headline-line">
            <span className="hero__headline-word">Into&nbsp;</span>
            <span className="hero__headline-word">The&nbsp;</span>
            <span className="hero__headline-word">
              <em>Flow.</em>
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p className="hero__sub">
          We don&apos;t chase algorithms; we curate digital legacies. Strategy,
          design, and technology — fused into one cinematic experience.
        </p>

        {/* CTAs */}
        <div className="hero__actions">
          <a href="#contact" className="btn btn--primary" onClick={scrollToServices}>
            See Our Work
            <ArrowRight size={16} />
          </a>
          <a href="#services" className="btn btn--outline" onClick={scrollToServices}>
            Explore Services
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint">
        <ChevronDown size={14} />
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
