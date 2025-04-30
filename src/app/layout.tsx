import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import LenisProvider from '../components/LenisProvider';
import './globals.css';

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Tom Rishworth - My Portfolio",
  description: 'Stuff I\'ve done',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={lexend.className}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
