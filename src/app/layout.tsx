import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from './navbar';
import { auth } from './auth';
import { Box, Container, Theme } from '@radix-ui/themes';
import Script from 'next/script';

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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Theme accentColor="violet">
          <Container className="background">
            <Navbar session={session} />
            <Box className="h-[calc(100vh-56px)]">{children}</Box>
          </Container>
        </Theme>
      </body>
      <Script
        id="cookieyes"
        type="text/javascript"
        src="https://cdn-cookieyes.com/client_data/10577b4edf41f96f02b72272/script.js"
      ></Script>
    </html>
  );
}
