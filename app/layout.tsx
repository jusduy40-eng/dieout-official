import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron"
});

// ✅ แก้ตรงนี้: metadata: Metadata (มีเครื่องหมาย : )
export const metadata: Metadata = {
  title: "DIEOUT | Digital Universe",
  description: "Official website of DIEOUT artist collective",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}