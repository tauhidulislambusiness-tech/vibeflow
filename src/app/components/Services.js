'use client';

import { useEffect, useRef } from 'react';
import { BookOpen, Cloud, Clapperboard, Calculator } from 'lucide-react';

const SERVICES = [
  {
    icon: BookOpen,
    number: '01',
    title: 'স্টোরিটেলিং মেন্যু',
    description:
      'আমরা এমন মেন্যু তৈরি করি যা বিক্রি করে — ভার্বাল আইডেন্টিটি, ডিশ সাইকোলজি এবং ভিজুয়াল হায়ারার্কি মিশিয়ে আপনার গেস্টদের হাই-মার্জিন অভিজ্ঞতার দিকে গাইড করি কোনো হার্ড সেল ছাড়াই।',
    tags: ['মেন্যু সাইকোলজি', 'ভার্বাল আইডেন্টিটি', 'প্রিন্ট ও ডিজিটাল'],
  },
  {
    icon: Cloud,
    number: '02',
    title: 'ভাইবফ্লো SaaS',
    description:
      'ক্লাউড-নেটিভ POS, কিচেন ডিসপ্লে সিস্টেম এবং রিয়েল-টাইম অ্যানালিটিক্স — যেসব রেস্টুরেন্ট অন্ধকারে চলতে অস্বীকার করে তাদের জন্য তৈরি। একটি ড্যাশবোর্ড, সব তথ্য।',
    tags: ['ক্লাউড POS', 'KDS', 'অ্যানালিটিক্স ড্যাশবোর্ড'],
  },
  {
    icon: Clapperboard,
    number: '03',
    title: 'সিনেমাটিক ব্র্যান্ড',
    description:
      '4K সিনেমাটিক মিডিয়া প্রোডাকশন, প্রিমিয়াম ওয়েব এক্সপেরিয়েন্স এবং ভিজুয়াল সিস্টেম যা আপনার ব্র্যান্ডকে স্ক্রল করে পেরিয়ে যাওয়া অসম্ভব করে তোলে। আমরা টেমপ্লেট ব্যবহার করি না।',
    tags: ['4K ভিডিও', 'ওয়েব ডিজাইন', 'ব্র্যান্ড সিস্টেম'],
  },
  {
    icon: Calculator,
    number: '04',
    title: 'স্মার্ট বুককিপিং',
    description:
      'রেস্টুরেন্ট-স্পেসিফিক ফাইন্যান্সিয়াল ইন্টেলিজেন্স — দৈনিক P&L ট্র্যাকিং থেকে ট্যাক্স-রেডি রিপোর্ট পর্যন্ত। আমরা আপনার সংখ্যাগুলোকে এমন গল্পে রূপান্তর করি যা স্মার্ট সিদ্ধান্ত নিতে সাহায্য করে।',
    tags: ['P&L ট্র্যাকিং', 'ট্যাক্স প্রস্তুতি', 'আর্থিক রিপোর্ট'],
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
          <div className="section__label">আমরা কী তৈরি করি</div>
          <h2 className="section__title">
            রেস্টুরেন্ট
            <br />
            আধিপত্যের চার স্তম্ভ
          </h2>
          <p className="section__subtitle">
            প্রতিটি সেবা পরস্পর সংযুক্ত — মেন্যু সাইকোলজি ব্র্যান্ড স্ট্র্যাটেজি গড়ে তোলে, SaaS ডেটা সংগ্রহ করে, এবং বুককিপিং পুরো প্রক্রিয়া সম্পূর্ণ করে।
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
