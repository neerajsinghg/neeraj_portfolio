import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neeraj Singh | Software Engineer, SDET & Full-Stack Web Developer",
  description: "Portfolio of Neeraj Singh, a Software Engineer, SDET, and Full-Stack Web Developer with 10.5+ years of experience in software quality engineering, test automation, and modern web development.",
  keywords: ["QA Automation", "SDET", "Software Developer in Test", "Playwright", "Selenium", "Python QA", "Test Framework Architect", "GitLab CI/CD", "Logistics QA", "Full-Stack Developer", "Next.js", "React"],
  authors: [{ name: "Neeraj Singh" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

