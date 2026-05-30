'use client';

import { useEffect, useRef } from 'react';
import { TrendingUp, Star, Globe } from 'lucide-react';

const CASE_STUDIES = [
  {
    icon: TrendingUp,
    category: 'মেন্যু ডিজাইন',
    name: 'Avanti',
    description: 'চাইনিজ রেস্টুরেন্ট — ঢাকা',
    problem:
      'একটি সাধারণ, টেক্সট-ভারী মেন্যু যা হাই-মার্জিন ডিশগুলো লুকিয়ে রাখত এবং নতুন গেস্টদের বিভ্রান্ত করত। কোনো ভার্বাল আইডেন্টিটি ছিল না — মেন্যুটি যেকোনো রেস্টুরেন্টের হতে পারত।',
    outcomeStat: '৪০%',
    outcomeLabel: 'হাই-মার্জিন অর্ডার বৃদ্ধি',
    outcomeText:
      'ডিশ সাইকোলজি, স্ট্র্যাটেজিক প্লেসমেন্ট এবং স্টোরিটেলিং কপি দিয়ে সম্পূর্ণ মেন্যু পুনর্গঠন যা গেস্টদের প্রিমিয়াম অভিজ্ঞতার দিকে গাইড করে।',
  },
  {
    icon: Star,
    category: 'ব্র্যান্ড আইডেন্টিটি',
    name: 'Aroma',
    description: 'বুটিক ক্যাফে — লাইফস্টাইল ব্র্যান্ড',
    problem:
      'কোনো ব্র্যান্ড আইডেন্টিটি ছিল না, অসামঞ্জস্য ভিজুয়াল এবং সোশ্যাল মিডিয়ায় কোনো উপস্থিতি ছিল না। দুর্দান্ত কফি ছিল কিন্তু অনলাইনে অদৃশ্য ছিল।',
    outcomeStat: '৩×',
    outcomeLabel: 'সোশ্যাল এনগেজমেন্ট বৃদ্ধি',
    outcomeText:
      'সিনেমাটিক কনটেন্ট, সামঞ্জস্যপূর্ণ ব্র্যান্ড সিস্টেম এবং ডিজিটাল উপস্থিতি দিয়ে প্রিমিয়াম রিপজিশনিং যা সাধারণ ভিজিটরদের বিশ্বস্ত অনুরাগীতে পরিণত করে।',
  },
  {
    icon: Globe,
    category: 'ডিজিটাল ইকোসিস্টেম',
    name: 'Saffron',
    description: 'ফাইন ডাইনিং চেইন — মাল্টি-লোকেশন',
    problem:
      'একাধিক লোকেশনে অসামঞ্জস্য ব্র্যান্ডিং, বিচ্ছিন্ন ডিজিটাল টাচপয়েন্ট এবং তিনটি রেস্টুরেন্ট লোকেশন জুড়ে কোনো ইউনিফাইড কনভার্সন স্ট্র্যাটেজি ছিল না।',
    outcomeStat: '৬০%',
    outcomeLabel: 'ইনবাউন্ড ক্লায়েন্ট বৃদ্ধি',
    outcomeText:
      'কনভার্সন ইঞ্জিন সহ ইউনিফাইড ডিজিটাল উপস্থিতি — সামঞ্জস্যপূর্ণ ব্র্যান্ডিং, কেন্দ্রীভূত বুকিং সিস্টেম এবং সব লোকেশনে পারফরম্যান্স-অপ্টিমাইজড ওয়েব।',
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
          <div className="section__label">কেস স্টাডি</div>
          <h2 className="section__title">
            ফলাফল যা
            <br />
            জোরে কথা বলে
          </h2>
          <p className="section__subtitle">
            বাস্তব রেস্টুরেন্টের বাস্তব রূপান্তর। স্ট্র্যাটেজি এবং বাস্তবায়ন মিলে গেলে কী ঘটে দেখুন।
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
                      চ্যালেঞ্জ
                    </span>
                    <p className="portfolio-card__problem-text">
                      {study.problem}
                    </p>
                  </div>

                  <div className="portfolio-card__outcome">
                    <span className="portfolio-card__outcome-label">
                      ফলাফল
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
