import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "./hooks/useCentralMotion";
import CustomCursor from "./components/CustomCursor";
import { ErrorBoundary } from "./components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NIK | AI Engineer Portfolio",
  description: "Senior-level AI/ML engineering and high-end cinematic design portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden`}>
        <div>
          <MotionProvider>
            <CustomCursor />
            {children}
          </MotionProvider>
        </div>

      </body>
    </html>
  );
}
