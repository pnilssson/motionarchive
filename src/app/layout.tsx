import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from './navbar';
import { auth } from './auth';
import { Box, Container, Theme } from '@radix-ui/themes';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

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
      <body>
        <Theme accentColor="violet">
          <Toaster />
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
