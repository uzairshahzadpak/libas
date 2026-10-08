

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Libas | Fashion Store",
  description: "Libas - Fashion for Women, Men and Kids",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#FAF8F6] text-gray-900">
          <CartProvider>
            <Navbar />

            <main>{children}</main>

            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

