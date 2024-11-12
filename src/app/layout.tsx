import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'حجز الطاولات',
  description: 'مرحبا بكم في موقع حجز الطاولات',
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html
      lang={locale}
      dir={'rtl'}
    >
      <body>{children}</body>
    </html>
  );
}
