import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

import './globals.css';

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Stuff I've done",
  description: 'Tom Rishworth - My Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={lexend.className}>{children}</body>
    </html>
  );
}
