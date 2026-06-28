"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./Icons";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tighter">
          Dev<span className="text-primary">QA</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="#projects" className="hover:text-foreground transition-colors">Projects</Link>
          <Link href="#reports" className="hover:text-foreground transition-colors">Reports</Link>
          <Link href="#experience" className="hover:text-foreground transition-colors">Experience</Link>
          <Link href="#blog" className="hover:text-foreground transition-colors">Blog</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="#contact" className="hidden md:flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium">
            Contact Me
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
