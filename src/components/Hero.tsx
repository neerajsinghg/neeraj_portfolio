"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const badges = [
  "React / Next.js", "Java / Node.js", "Spring Boot", 
  "Selenium WebDriver", "TestNG / Appium", "API Testing", 
  "PostgreSQL", "Docker / Kubernetes", "Jenkins CI/CD"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        
        {/* Floating Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl mx-auto">
          {badges.map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="px-4 py-1.5 rounded-full border border-white/10 glass text-xs font-medium text-foreground/80"
            >
              {badge}
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          Senior Software Developer <br />
          <span className="text-primary">& SDET Specialist</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Architecting enterprise software solutions and building robust automation testing frameworks to ensure flawless delivery.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/resume.pdf" target="_blank" className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center justify-center font-medium gap-2">
            <Download className="w-4 h-4" /> Download Resume
          </Link>
          <Link href="#projects" className="w-full sm:w-auto px-8 py-3 glass hover:bg-white/5 border border-white/10 rounded-lg transition-colors flex items-center justify-center font-medium gap-2">
            View Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
