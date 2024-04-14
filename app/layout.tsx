import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Motion Archive',
  description: 'Your digital workout archive.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="ingenium">
      <body className={`${inter.className} antialiased container mx-auto`}>
        <Navbar>
          <div className="h-[calc(100vh-64px)]">{children}</div>
        </Navbar>
      </body>
    </html>
  );
}
