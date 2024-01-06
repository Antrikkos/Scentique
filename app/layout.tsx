import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "./components/Providers";
import Navbar from "./components/Navbar";
import ShoppingCartModal from "./components/ShoppingCartModal";
import React from 'react'
import Footer from '@/app/components/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scentique",
  description: "Scentique candle shop in Cyprus",
  verification: {
    google: "jpg9UCgbQGhsG6jMvE6zLdjLUexnERfI2jq1Z20xmLU"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <div className='min-h-screen'>
            <Navbar />
            <ShoppingCartModal />
            {children}
          </div>
          <Footer />
        </div>
      </CartProvider>
    </body>
</html>
)
  ;
}
