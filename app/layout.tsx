import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron"
});

// แก้ไขตรงนี้ครับ (เปลี่ยนจาก meta Metadata เป็น metadata: Metadata)
export const metadata: Metadata = {
  title: "DIEOUT - Digital Universe",
  description: "Official website of DIEOUT artist collective",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${orbitron.variable} bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}