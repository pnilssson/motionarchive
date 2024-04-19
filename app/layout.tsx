import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from './navbar';
import { auth } from './auth';
import { Box, Container, Theme } from '@radix-ui/themes';

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
      <body className={`${inter.className} antialiased`}>
        <Theme accentColor="violet">
          <Container>
            <Navbar session={session} />
            <Box className="h-[calc(100vh-56px)]">{children}</Box>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
