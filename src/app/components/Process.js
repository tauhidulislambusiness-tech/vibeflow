'use client';

import { useEffect, useRef } from 'react';
import { Search, PenTool, Rocket, BarChart3 } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'আবিষ্কার',
    description:
      'ব্র্যান্ড অডিট ও স্ট্র্যাটেজি অ্যালাইনমেন্ট — একটি শব্দ লেখার আগে আমরা আপনার মার্কেট পজিশন, প্রতিযোগী এবং অব্যবহৃত সুযোগগুলো বিশ্লেষণ করি।',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'ডিজাইন',
    description:
      'ন্যারেটিভ কপিরাইটিং ও ভিজুয়াল ইঞ্জিনিয়ারিং — প্রতিটি পিক্সেল এবং বাক্য কনভার্ট করতে, প্রভাবিত করতে এবং স্থায়ী ছাপ ফেলতে তৈরি।',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'ডেপ্লয়',
    description:
      'সব টাচপয়েন্টে প্রোডাকশন লঞ্চ — প্রিন্ট, ডিজিটাল, সোশ্যাল, ভেন্যু। আমরা দ্রুত শিপ করি, পলিশড শিপ করি, সম্পূর্ণ শিপ করি।',
  },
  {
    icon: BarChart3,
    number: '04',
    title: 'অপ্টিমাইজ',
    description:
      '৩০ দিনের ফিডব্যাক লুপ ও ডেটা-ড্রিভেন রিফাইনমেন্ট — বাস্তব মেট্রিক্স, বাস্তব অ্যাডজাস্টমেন্ট, প্রতিটি সাইকেলে ক্রমবর্ধমান ফলাফল।',
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
          <div className="section__label">আমরা কীভাবে কাজ করি</div>
          <h2 className="section__title">
            দৃষ্টি থেকে
            <br />
            গতিতে
          </h2>
          <p className="section__subtitle">
            একটি প্রমাণিত চার-পর্যায়ের সিস্টেম যা ব্র্যান্ডকে অদৃশ্য থেকে অপরিহার্যে পরিণত করে — প্রতিটি পর্যায়ে পরিমাপযোগ্য মাইলস্টোন সহ।
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
