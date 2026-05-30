import './globals.css';

export const metadata = {
  title: 'VIBE FLOW — Premium Digital Agency for Restaurants & Hospitality',
  description:
    'We don\'t chase algorithms; we curate digital legacies. Menu design, SaaS solutions, cinematic branding, and restaurant bookkeeping — all from one creative powerhouse.',
  keywords: [
    'restaurant branding',
    'menu design',
    'hospitality SaaS',
    'restaurant POS',
    'digital agency',
    'Vibe Flow',
  ],
  metadataBase: new URL('https://vibeflow.team'),
  openGraph: {
    title: 'VIBE FLOW — Shift the Perspective',
    description:
      'Premium digital agency crafting cinematic brands, storytelling menus, and intelligent SaaS for the hospitality industry.',
    url: 'https://vibeflow.team',
    siteName: 'VIBE FLOW',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
