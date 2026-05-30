import { Zap } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
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
              VIBE FLOW © {new Date().getFullYear()}. All Rights Reserved.
            </span>
            <span className="footer__tagline">Shift the Perspective.</span>
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
