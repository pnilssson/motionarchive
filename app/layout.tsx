import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motion Archive",
  description: "Your digital workout archive.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className}`}>
        <Navbar></Navbar>
        <div className="h-[calc(100vh-64px)]">{children}</div>
      </body>
    </html>
  );
}
