import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/client-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
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
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Provider session={session}>
          <Navbar></Navbar>
          {children}
        </Provider>
      </body>
    </html>
  );
}
