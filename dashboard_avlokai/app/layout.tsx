import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AvlokAI Automation Console",
  description: "Professional automation observability and control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased h-full flex`}
        style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#0B0F14", color: "#E5E7EB" }}
      >
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: "#0B0F14" }}>
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
