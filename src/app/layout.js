import './globals.css';

export const metadata = {
  title: 'ভাইব ফ্লো — রেস্টুরেন্ট ও হসপিটালিটি ব্র্যান্ডের জন্য প্রিমিয়াম ডিজিটাল এজেন্সি',
  description:
    'আমরা অ্যালগরিদম চেজ করি না; আমরা ডিজিটাল লেগেসি তৈরি করি। মেন্যু ডিজাইন, SaaS সলিউশন, সিনেমাটিক ব্র্যান্ডিং এবং রেস্টুরেন্ট বুককিপিং — সব কিছু এক ছাদের নিচে।',
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
    title: 'ভাইব ফ্লো — দৃষ্টিভঙ্গি বদলে দিন',
    description:
      'হসপিটালিটি ইন্ডাস্ট্রির জন্য সিনেমাটিক ব্র্যান্ড, স্টোরিটেলিং মেন্যু এবং ইন্টেলিজেন্ট SaaS তৈরি করা প্রিমিয়াম ডিজিটাল এজেন্সি।',
    url: 'https://vibeflow.team',
    siteName: 'VIBE FLOW',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
