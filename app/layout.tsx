import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackgroundProvider } from "@/components/BackgroundProvider";
import { MasterBackground } from "@/components/MasterBackground";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "Matt's Portfolio",
  description: "Showcasing my projects and technical work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <BackgroundProvider>
          <ThemeProvider>
            <MasterBackground />
            <ThemeCustomizer />
            {children}
          </ThemeProvider>
        </BackgroundProvider>
      </body>
    </html>
  );
}
