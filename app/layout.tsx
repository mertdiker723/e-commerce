import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Components
import Navbar from "@/common/Navbar";

// Core
import ClientProvider from "@/core/redux/provider";

// Styles
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Generated by e-commerce company",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>

        <ClientProvider>
          <Navbar />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}