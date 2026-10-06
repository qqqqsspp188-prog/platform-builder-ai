import './globals.css';

export const metadata = {
  title: 'Platform Builder AI',
  description: 'AI-powered SaaS website builder',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
