'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Target, Palette, Film, Code, Share2, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    icon: Target,
    title: 'ডিজিটাল স্ট্র্যাটেজি',
    desc: 'আপনার ব্র্যান্ডকে ডিজিটাল বিশ্বে সঠিকভাবে পজিশন করি — ডেটা-ড্রিভেন প্ল্যান দিয়ে।',
  },
  {
    icon: Palette,
    title: 'ভিজ্যুয়াল আইডেন্টিটি',
    desc: 'লোগো, রং, টাইপোগ্রাফি — এমন ব্র্যান্ড ভিজ্যুয়াল তৈরি করি যা মানুষ ভুলতে পারে না।',
  },
  {
    icon: Film,
    title: 'কন্টেন্ট ক্রিয়েশন',
    desc: 'সিনেমাটিক ভিডিও, ফটোগ্রাফি ও কপিরাইটিং — প্রতিটি কন্টেন্ট একটি গল্প বলে।',
  },
  {
    icon: Code,
    title: 'ওয়েব ডেভেলপমেন্ট',
    desc: 'হাই-পারফরম্যান্স, মোবাইল-ফার্স্ট ওয়েবসাইট যা কনভার্ট করে এবং ব্র্যান্ড অভিজ্ঞতা দেয়।',
  },
  {
    icon: Share2,
    title: 'সোশ্যাল মিডিয়া',
    desc: 'অর্গানিক গ্রোথ এবং পেইড ক্যাম্পেইন — আপনার অডিয়েন্সকে এনগেজ রাখি।',
  },
  {
    icon: BarChart3,
    title: 'ডেটা অ্যানালিটিক্স',
    desc: 'রিয়েল-টাইম ইনসাইটস দিয়ে সিদ্ধান্ত নিন — আর অনুমানে নয়, তথ্যে চলুন।',
  },
];

const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_DURATION = 700; // ms

export default function AntiGravitySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'exit' | 'enter'
  const [nextIndex, setNextIndex] = useState(null);
  const autoplayRef = useRef(null);
  const containerRef = useRef(null);
  const isHovered = useRef(false);

  const goTo = useCallback(
    (newIndex) => {
      if (transitionState !== 'idle' || newIndex === activeIndex) return;

      // Phase 1: exit current card upward
      setTransitionState('exit');
      setNextIndex(newIndex);

      setTimeout(() => {
        // Phase 2: swap to new card, enter from below
        setActiveIndex(newIndex);
        setTransitionState('enter');

        setTimeout(() => {
          // Phase 3: back to idle (floating)
          setTransitionState('idle');
          setNextIndex(null);
        }, TRANSITION_DURATION);
      }, TRANSITION_DURATION * 0.5);
    },
    [activeIndex, transitionState]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % slides.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + slides.length) % slides.length);
  }, [activeIndex, goTo]);

  // Autoplay
  useEffect(() => {
    const start = () => {
      autoplayRef.current = setInterval(() => {
        if (!isHovered.current) {
          goNext();
        }
      }, AUTOPLAY_INTERVAL);
    };
    start();
    return () => clearInterval(autoplayRef.current);
  }, [goNext]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  // Compute card class for animation state
  const getCardClass = () => {
    let cls = 'slider__card';
    if (transitionState === 'exit') cls += ' slider__card--exit';
    else if (transitionState === 'enter') cls += ' slider__card--enter';
    else cls += ' slider__card--idle';
    return cls;
  };

  const ActiveIcon = slides[activeIndex].icon;

  return (
    <section id="expertise" className="section antigravity-section">
      <div className="container">
        {/* Header */}
        <div className="antigravity__header">
          <p className="section__label">আমাদের দক্ষতা</p>
          <h2 className="section__title">
            যেখানে সৃজনশীলতা প্রযুক্তির সাথে মিলিত হয়
          </h2>
        </div>

        {/* Slider */}
        <div
          className="slider__container"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left arrow */}
          <button
            className="slider__nav-btn slider__nav-btn--prev"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Card area */}
          <div className="slider__stage">
            <div className={getCardClass()} key={activeIndex}>
              <div className="slider__card-accent" />
              <div className="slider__card-icon">
                <ActiveIcon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="slider__card-title">{slides[activeIndex].title}</h3>
              <p className="slider__card-desc">{slides[activeIndex].desc}</p>
              <span className="slider__card-number">
                {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right arrow */}
          <button
            className="slider__nav-btn slider__nav-btn--next"
            onClick={goNext}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="slider__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slider__dot ${i === activeIndex ? 'slider__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
