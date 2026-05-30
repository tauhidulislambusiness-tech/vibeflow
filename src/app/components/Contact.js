'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, Mail, Globe, MessageSquare } from 'lucide-react';

const INVESTMENT_OPTIONS = [
  { value: '', label: 'আপনার বিনিয়োগ পরিসীমা নির্বাচন করুন' },
  { value: 'premium', label: 'প্রিমিয়াম ব্লুপ্রিন্ট — $৪৯৯ – $৭৯৯' },
  { value: 'elite', label: 'এলিট ইকোসিস্টেম — $৮৯৯ – $১,২৯৯' },
  { value: 'custom', label: 'কাস্টম লেগেসি স্কেল — $১,২৯৯+' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    bottleneck: '',
    investment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from('.contact__info', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });

        gsap.from('.contact__form-wrapper', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
        });
      }, sectionRef);
    };

    init();
    return () => ctx && ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, wire this to an API route or email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', website: '', bottleneck: '', investment: '' });
  };

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container">
        <div className="contact__inner">
          {/* Left — Info */}
          <div className="contact__info">
            <div className="section__label">শুরু করুন</div>
            <h2 className="section__title">
              আসুন কিছু
              <br />
              আইকনিক তৈরি করি
            </h2>
            <p className="contact__info-text">
              এটি কোনো সাধারণ ফর্ম নয় — এটি একটি প্রি-কোয়ালিফিকেশন ধাপ। আপনার
              ব্র্যান্ড, আপনার সবচেয়ে বড় সমস্যা এবং আপনার বিনিয়োগ মানসিকতা
              সম্পর্কে বলুন। আমরা ২৪ ঘণ্টার মধ্যে একটি কাস্টম গেম প্ল্যান নিয়ে
              উত্তর দেব।
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <Mail size={16} className="contact__detail-icon" />
                <span>hello@vibeflow.team</span>
              </div>
              <div className="contact__detail">
                <Globe size={16} className="contact__detail-icon" />
                <span>vibeflow.team</span>
              </div>
              <div className="contact__detail">
                <MessageSquare size={16} className="contact__detail-icon" />
                <span>হোয়াটসঅ্যাপ — সকাল ১০টা – রাত ৮টা</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="glass-card contact__form-wrapper">
            {submitted ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  padding: '3rem 1rem',
                  textAlign: 'center',
                }}
              >
                <Send
                  size={32}
                  style={{ color: 'var(--color-accent)' }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--fs-h3)',
                  }}
                >
                  বার্তা পাঠানো হয়েছে
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  আমরা ২৪ ঘণ্টার মধ্যে একটি কাস্টম স্ট্র্যাটেজি নিয়ে আপনার সাথে
                  যোগাযোগ করব।
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-group">
                  <label className="form-group__label" htmlFor="name">
                    আপনার নাম
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-group__input"
                    placeholder="যেমন: রফিক আহমেদ"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Website / Social */}
                <div className="form-group">
                  <label className="form-group__label" htmlFor="website">
                    ব্যবসার ওয়েবসাইট বা সোশ্যাল লিংক
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    className="form-group__input"
                    placeholder="https://your-restaurant.com অথবা @handle"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Bottleneck */}
                <div className="form-group">
                  <label className="form-group__label" htmlFor="bottleneck">
                    আপনার ব্র্যান্ডের প্রধান বাধা
                  </label>
                  <textarea
                    id="bottleneck"
                    name="bottleneck"
                    className="form-group__textarea"
                    placeholder="কী কাজ করছে না বলুন — মেন্যু, ব্র্যান্ডিং, অনলাইন উপস্থিতি, অপারেশন..."
                    value={formData.bottleneck}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Investment Range */}
                <div className="form-group">
                  <label className="form-group__label" htmlFor="investment">
                    বিনিয়োগ পরিসীমা
                  </label>
                  <select
                    id="investment"
                    name="investment"
                    className="form-group__select"
                    value={formData.investment}
                    onChange={handleChange}
                    required
                  >
                    {INVESTMENT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn--primary contact__submit">
                  <Send size={16} />
                  প্রি-কোয়ালিফিকেশন জমা দিন
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
