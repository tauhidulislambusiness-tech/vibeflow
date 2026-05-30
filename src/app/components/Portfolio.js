'use client';

import { useEffect, useRef } from 'react';
import { TrendingUp, Star, Globe } from 'lucide-react';

const CASE_STUDIES = [
  {
    icon: TrendingUp,
    category: 'Menu Design',
    name: 'Avanti',
    description: 'Chinese restaurant — Dhaka',
    problem:
      'A generic, text-heavy menu that buried high-margin dishes and confused first-time guests. Zero verbal identity — the menu could belong to any restaurant.',
    outcomeStat: '40%',
    outcomeLabel: 'increase in high-margin orders',
    outcomeText:
      'Complete menu overhaul with dish psychology, strategic placement, and storytelling copy that guides guests to premium experiences.',
  },
  {
    icon: Star,
    category: 'Brand Identity',
    name: 'Aroma',
    description: 'Boutique café — lifestyle brand',
    problem:
      'No brand identity, inconsistent visuals, and zero social media presence. The café had great coffee but looked invisible online.',
    outcomeStat: '3×',
    outcomeLabel: 'social engagement growth',
    outcomeText:
      'Premium repositioning with cinematic content, cohesive brand system, and a digital presence that turned casual visitors into loyal advocates.',
  },
  {
    icon: Globe,
    category: 'Digital Ecosystem',
    name: 'Saffron',
    description: 'Fine dining chain — multi-location',
    problem:
      'Inconsistent multi-location branding, fragmented digital touchpoints, and no unified conversion strategy across three restaurant locations.',
    outcomeStat: '60%',
    outcomeLabel: 'inbound client growth',
    outcomeText:
      'Unified digital presence with a conversion engine — cohesive branding, centralized booking system, and performance-optimized web across all locations.',
  },
];

export default function Portfolio() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Header
        gsap.from('.portfolio__header .section__label', {
          scrollTrigger: {
            trigger: '.portfolio__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
        });

        gsap.from('.portfolio__header .section__title', {
          scrollTrigger: {
            trigger: '.portfolio__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.15,
        });

        // Cards stagger
        const cards = gsap.utils.toArray('.portfolio-card');
        cards.forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            y: 80,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
          });
        });
      }, sectionRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="portfolio" className="section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="portfolio__header">
          <div className="section__label">Case Studies</div>
          <h2 className="section__title">
            Results That
            <br />
            Speak Louder
          </h2>
          <p className="section__subtitle">
            Real transformations for real restaurants. Here&apos;s what happens when
            strategy meets execution.
          </p>
        </div>

        {/* Cards */}
        <div className="portfolio__grid">
          {CASE_STUDIES.map((study) => {
            const Icon = study.icon;
            return (
              <div key={study.name} className="glass-card portfolio-card">
                {/* Visual placeholder */}
                <div className="portfolio-card__visual">
                  <div className="portfolio-card__visual-inner">
                    <Icon size={40} strokeWidth={1} />
                    <span className="portfolio-card__visual-text">
                      {study.name}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="portfolio-card__meta">
                  <span className="portfolio-card__category">
                    {study.category}
                  </span>
                  <h3 className="portfolio-card__name">{study.name}</h3>
                  <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--fs-small)' }}>
                    {study.description}
                  </p>

                  <div className="portfolio-card__problem">
                    <span className="portfolio-card__problem-label">
                      Challenge
                    </span>
                    <p className="portfolio-card__problem-text">
                      {study.problem}
                    </p>
                  </div>

                  <div className="portfolio-card__outcome">
                    <span className="portfolio-card__outcome-label">
                      Outcome
                    </span>
                    <p className="portfolio-card__outcome-text">
                      {study.outcomeText}
                    </p>
                  </div>

                  <div className="portfolio-card__stat">
                    <span className="portfolio-card__stat-number">
                      {study.outcomeStat}
                    </span>
                    <span className="portfolio-card__stat-label">
                      {study.outcomeLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
