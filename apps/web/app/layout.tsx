import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../providers/provider";
import { Space_Grotesk } from 'next/font/google'
import Sidebar from "../components/Navbar";
import { BarChart2 } from "lucide-react";
import { Children } from "react";
const inter = Space_Grotesk({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={"dim"}>
      <Providers>

      <body className={`${inter.className} overflow-x-hidden`}>
          {/* Sidebar on the left */}
          {/* <Sidebar /> */}

          {/* Main content on the right */}
          
            {children}
        
        </body>

      </Providers>
    </html>
  );
}
