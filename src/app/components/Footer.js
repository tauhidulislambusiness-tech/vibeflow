import { Zap } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'সেবাসমূহ', href: '#services' },
  { label: 'পোর্টফোলিও', href: '#portfolio' },
  { label: 'প্রক্রিয়া', href: '#process' },
  { label: 'যোগাযোগ', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              VIBE&nbsp;<span className="footer__logo-accent">FLOW</span>
            </div>
            <span className="footer__copy">
              ভাইব ফ্লো © {new Date().getFullYear()}। সর্বস্বত্ব সংরক্ষিত।
            </span>
            <span className="footer__tagline">দৃষ্টিভঙ্গি বদলে দিন।</span>
          </div>

          {/* Links */}
          <div className="footer__links">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="footer__link">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
