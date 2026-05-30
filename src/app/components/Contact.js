'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, Mail, Globe, MessageSquare } from 'lucide-react';

const INVESTMENT_OPTIONS = [
  { value: '', label: 'Select your investment range' },
  { value: 'premium', label: 'Premium Blueprint — $499 – $799' },
  { value: 'elite', label: 'Elite Ecosystem — $899 – $1,299' },
  { value: 'custom', label: 'Custom Legacy Scale — $1,299+' },
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
            <div className="section__label">Get Started</div>
            <h2 className="section__title">
              Let&apos;s Build
              <br />
              Something Iconic
            </h2>
            <p className="contact__info-text">
              This isn&apos;t a generic inquiry form — it&apos;s a pre-qualification
              step. Tell us about your brand, your biggest bottleneck, and your
              investment mindset. We&apos;ll respond within 24 hours with a
              tailored game plan.
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
                <span>WhatsApp — Available 10 AM – 8 PM</span>
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
                  Message Sent
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  We&apos;ll get back to you within 24 hours with a tailored
                  strategy.
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-group">
                  <label className="form-group__label" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-group__input"
                    placeholder="e.g. Rafiq Ahmed"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Website / Social */}
                <div className="form-group">
                  <label className="form-group__label" htmlFor="website">
                    Business Website or Social Link
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    className="form-group__input"
                    placeholder="https://your-restaurant.com or @handle"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Bottleneck */}
                <div className="form-group">
                  <label className="form-group__label" htmlFor="bottleneck">
                    Main bottleneck holding your brand back
                  </label>
                  <textarea
                    id="bottleneck"
                    name="bottleneck"
                    className="form-group__textarea"
                    placeholder="Tell us what's not working — menu, branding, online presence, operations..."
                    value={formData.bottleneck}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Investment Range */}
                <div className="form-group">
                  <label className="form-group__label" htmlFor="investment">
                    Investment Range
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
                  Submit Pre-Qualification
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
