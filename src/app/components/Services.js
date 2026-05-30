'use client';

import { useEffect, useRef } from 'react';
import { BookOpen, Cloud, Clapperboard, Calculator } from 'lucide-react';

const SERVICES = [
  {
    icon: BookOpen,
    number: '01',
    title: 'The Storytelling Menu',
    description:
      'We engineer menus that sell — blending verbal identity, dish psychology, and visual hierarchy to guide your guests toward high-margin experiences without a single hard sell.',
    tags: ['Menu Psychology', 'Verbal Identity', 'Print & Digital'],
  },
  {
    icon: Cloud,
    number: '02',
    title: 'Vibeflow SaaS',
    description:
      'Cloud-native POS, Kitchen Display Systems, and real-time analytics — built for restaurants that refuse to operate in the dark. One dashboard, every insight.',
    tags: ['Cloud POS', 'KDS', 'Analytics Dashboard'],
  },
  {
    icon: Clapperboard,
    number: '03',
    title: 'Cinematic Brand',
    description:
      '4K cinematic media production, premium web experiences, and visual systems that make your brand impossible to scroll past. We don\'t do templates.',
    tags: ['4K Video', 'Web Design', 'Brand Systems'],
  },
  {
    icon: Calculator,
    number: '04',
    title: 'Smart Bookkeeping',
    description:
      'Restaurant-specific financial intelligence — from daily P&L tracking to tax-ready reports. We turn your numbers into narratives that drive smarter decisions.',
    tags: ['P&L Tracking', 'Tax Prep', 'Financial Reports'],
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Header reveal
        gsap.from('.services__header .section__label', {
          scrollTrigger: {
            trigger: '.services__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
        });

        gsap.from('.services__header .section__title', {
          scrollTrigger: {
            trigger: '.services__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.15,
        });

        gsap.from('.services__header .section__subtitle', {
          scrollTrigger: {
            trigger: '.services__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 20,
          opacity: 0,
          duration: 0.7,
          delay: 0.3,
        });

        // Staggered card reveals
        gsap.from('.service-card', {
          scrollTrigger: {
            trigger: '.services__grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }, sectionRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="services" className="section services" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="services__header">
          <div className="section__label">What We Build</div>
          <h2 className="section__title">
            Four Pillars of
            <br />
            Restaurant Dominance
          </h2>
          <p className="section__subtitle">
            Every service is designed to compound — menu psychology feeds brand
            strategy, SaaS captures data, and bookkeeping closes the loop.
          </p>
        </div>

        {/* Grid */}
        <div className="services__grid">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.number} className="glass-card service-card">
                <div className="service-card__icon">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="service-card__number">{service.number}</span>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
                <div className="service-card__tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="service-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
