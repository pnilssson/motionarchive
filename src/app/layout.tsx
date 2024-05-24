import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/navbar';
import { auth } from './auth';
import Script from 'next/script';
import { Toaster } from '../components/ui/toaster';

export const metadata: Metadata = {
  title: 'Motion Archive',
  description: 'Your digital workout archive.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased background container">
        <Toaster />
        <Navbar session={session} />
        <div className="min-h-[calc(100vh-56px)]">{children}</div>
      </body>
      <Script
        id="cookieyes"
        type="text/javascript"
        src="https://cdn-cookieyes.com/client_data/10577b4edf41f96f02b72272/script.js"
      ></Script>
    </html>
  );
}
