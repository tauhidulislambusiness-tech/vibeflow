'use client';

import { useEffect, useRef } from 'react';
import { Search, PenTool, Rocket, BarChart3 } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Discover',
    description:
      'Brand audit & strategy alignment — we dissect your market position, competitors, and untapped opportunities before writing a single word.',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Design',
    description:
      'Narrative copywriting & visual engineering — every pixel and phrase is crafted to convert, compel, and leave a lasting impression.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Deploy',
    description:
      'Production launch across all touchpoints — print, digital, social, in-venue. We ship fast, we ship polished, we ship complete.',
  },
  {
    icon: BarChart3,
    number: '04',
    title: 'Optimize',
    description:
      '30-day feedback loops & data-driven refinement — real metrics, real adjustments, compounding results every cycle.',
  },
];

export default function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Header
        gsap.from('.process__header .section__label', {
          scrollTrigger: {
            trigger: '.process__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
        });

        gsap.from('.process__header .section__title', {
          scrollTrigger: {
            trigger: '.process__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.15,
        });

        gsap.from('.process__header .section__subtitle', {
          scrollTrigger: {
            trigger: '.process__header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 20,
          opacity: 0,
          duration: 0.7,
          delay: 0.3,
        });

        // Timeline steps stagger
        gsap.from('.process-step', {
          scrollTrigger: {
            trigger: '.process__timeline',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }, sectionRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="process" className="section process" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="process__header">
          <div className="section__label">How We Work</div>
          <h2 className="section__title">
            From Vision
            <br />
            to Velocity
          </h2>
          <p className="section__subtitle">
            A proven four-phase system that takes brands from invisible to
            inevitable — with measurable milestones at every stage.
          </p>
        </div>

        {/* Timeline */}
        <div className="process__timeline">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="process-step">
                <div className="process-step__number">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__desc">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
