'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { UtensilsCrossed, Heart, Megaphone, Truck, ChevronLeft, ChevronRight } from 'lucide-react';

const SERVICES = [
  {
    icon: UtensilsCrossed,
    number: '01',
    title: 'খাবারের মান',
    subtitle: 'Food Quality',
    points: [
      'সুস্বাদু ও ধারাবাহিক মানের খাবার',
      'তাজা উপকরণ ব্যবহার',
      'ইউনিক সিগনেচার মেনু',
    ],
    accent: '#7c5cff',
  },
  {
    icon: Heart,
    number: '02',
    title: 'গ্রাহক অভিজ্ঞতা',
    subtitle: 'Customer Experience',
    points: [
      'দ্রুত ও ভদ্র সার্ভিস',
      'পরিচ্ছন্ন পরিবেশ',
      'আরামদায়ক বসার ব্যবস্থা',
      'গ্রাহকের অভিযোগ দ্রুত সমাধান',
    ],
    accent: '#00d4ff',
  },
  {
    icon: Megaphone,
    number: '03',
    title: 'ব্র্যান্ড ও মার্কেটিং',
    subtitle: 'Brand & Marketing',
    points: [
      'শক্তিশালী সামাজিক যোগাযোগমাধ্যম উপস্থিতি',
      'নিয়মিত কনটেন্ট ও বিজ্ঞাপন',
      'রিভিউ ও রেপুটেশন ম্যানেজমেন্ট',
      'লোকাল ব্র্যান্ড হিসেবে পরিচিতি তৈরি',
    ],
    accent: '#ff6b9d',
  },
  {
    icon: Truck,
    number: '04',
    title: 'অপারেশন ও ডেলিভারি',
    subtitle: 'Operations & Delivery',
    points: [
      'দ্রুত খাবার প্রস্তুত',
      'কার্যকর স্টাফ ম্যানেজমেন্ট',
      'নির্ভরযোগ্য ডেলিভারি সিস্টেম',
      'খরচ নিয়ন্ত্রণ ও লাভজনকতা নিশ্চিত করা',
    ],
    accent: '#ffa751',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [animState, setAnimState] = useState('idle'); // idle | exit | enter
  const [direction, setDirection] = useState(1);
  const autoRef = useRef(null);
  const pausedRef = useRef(false);

  const goTo = useCallback(
    (idx) => {
      if (animState !== 'idle') return;
      const nextIdx = (idx + SERVICES.length) % SERVICES.length;
      if (nextIdx === active) return;
      setDirection(nextIdx > active ? 1 : -1);
      setAnimState('exit');
      setTimeout(() => {
        setActive(nextIdx);
        setAnimState('enter');
        setTimeout(() => setAnimState('idle'), 600);
      }, 350);
    },
    [active, animState]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Auto-play
  useEffect(() => {
    const start = () => {
      autoRef.current = setInterval(() => {
        if (!pausedRef.current) next();
      }, 5000);
    };
    start();
    return () => clearInterval(autoRef.current);
  }, [next]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // GSAP header reveal
  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from('.services__header .section__label', {
          scrollTrigger: { trigger: '.services__header', start: 'top 85%', toggleActions: 'play none none none' },
          y: 20, opacity: 0, duration: 0.6,
        });
        gsap.from('.services__header .section__title', {
          scrollTrigger: { trigger: '.services__header', start: 'top 85%', toggleActions: 'play none none none' },
          y: 30, opacity: 0, duration: 0.8, delay: 0.15,
        });
        gsap.from('.services__header .section__subtitle', {
          scrollTrigger: { trigger: '.services__header', start: 'top 85%', toggleActions: 'play none none none' },
          y: 20, opacity: 0, duration: 0.7, delay: 0.3,
        });
        gsap.from('.svc-slider', {
          scrollTrigger: { trigger: '.svc-slider', start: 'top 88%', toggleActions: 'play none none none' },
          y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
        });
      }, sectionRef);
    };
    init();
    return () => ctx && ctx.revert();
  }, []);

  const current = SERVICES[active];
  const Icon = current.icon;

  const cardClass = `svc-slider__card ${
    animState === 'exit' ? 'svc-slider__card--exit' :
    animState === 'enter' ? 'svc-slider__card--enter' :
    'svc-slider__card--idle'
  }`;

  return (
    <section
      id="services"
      className="section services services--light"
      ref={sectionRef}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="container">
        {/* Header */}
        <div className="services__header">
          <div className="section__label">আমরা কী তৈরি করি</div>
          <h2 className="section__title">
            রেস্টুরেন্ট
            <br />
            আধিপত্যের চার স্তম্ভ
          </h2>
          <p className="section__subtitle">
            রেস্টুরেন্টে বাজারে আধিপত্য গড়ে তুলতে চারটি প্রধান স্তম্ভ — খাবারের মান, গ্রাহক অভিজ্ঞতা, ব্র্যান্ডিং এবং অপারেশন।
          </p>
        </div>

        {/* Slider */}
        <div className="svc-slider">
          {/* Left Arrow */}
          <button
            className="svc-slider__nav svc-slider__nav--prev"
            onClick={prev}
            aria-label="আগের স্তম্ভ"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Card */}
          <div className="svc-slider__stage">
            <div className={cardClass} key={active}>
              {/* Card Top — Icon + Number */}
              <div className="svc-slider__card-top">
                <div className="svc-slider__icon" style={{ borderColor: `${current.accent}30`, background: `${current.accent}10` }}>
                  <Icon size={28} strokeWidth={1.5} style={{ color: current.accent }} />
                </div>
                <span className="svc-slider__number">{current.number}</span>
              </div>

              {/* Title */}
              <h3 className="svc-slider__title">{current.title}</h3>
              <span className="svc-slider__subtitle">{current.subtitle}</span>

              {/* Points */}
              <ul className="svc-slider__points">
                {current.points.map((point, i) => (
                  <li key={i} className="svc-slider__point">
                    <span className="svc-slider__bullet" style={{ background: current.accent }} />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Accent bar */}
              <div className="svc-slider__accent-bar" style={{ background: `linear-gradient(90deg, ${current.accent}, ${current.accent}40)` }} />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="svc-slider__nav svc-slider__nav--next"
            onClick={next}
            aria-label="পরের স্তম্ভ"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="svc-slider__dots">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              className={`svc-slider__dot ${i === active ? 'svc-slider__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`স্তম্ভ ${i + 1}`}
              style={i === active ? { background: SERVICES[i].accent } : {}}
            />
          ))}
        </div>

        {/* Mini preview cards */}
        <div className="svc-slider__previews">
          {SERVICES.map((svc, i) => {
            const PrevIcon = svc.icon;
            return (
              <button
                key={i}
                className={`svc-slider__preview ${i === active ? 'svc-slider__preview--active' : ''}`}
                onClick={() => goTo(i)}
                style={i === active ? { borderColor: svc.accent } : {}}
              >
                <PrevIcon size={18} strokeWidth={1.5} style={{ color: i === active ? svc.accent : '#8892b0' }} />
                <span className="svc-slider__preview-title">{svc.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
