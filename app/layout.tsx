import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from './navbar';
import { auth } from './auth';

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
  const session = await auth();
  return (
    <html lang="en" data-theme="ingenium">
      <body className={`${inter.className} antialiased container mx-auto`}>
        <Navbar session={session}>
          <div className="h-[calc(100vh-72px)]">{children}</div>
        </Navbar>
      </body>
    </html>
  );
}
