import { Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./Icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <Link href="/" className="font-bold text-lg tracking-tighter flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-white">Neeraj</span>
            <span className="text-primary font-light">.Singh</span>
          </Link>
          <p className="text-zinc-600 text-xs mt-2">© 2026 Senior SDET Portfolio. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="mailto:hello@example.com" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center hover:bg-primary/5 hover:border-primary/30 transition-all text-zinc-400 hover:text-primary">
            <Mail className="w-4.5 h-4.5" />
          </Link>
          <Link href="https://github.com" target="_blank" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center hover:bg-primary/5 hover:border-primary/30 transition-all text-zinc-400 hover:text-primary">
            <Github className="w-4.5 h-4.5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center hover:bg-primary/5 hover:border-primary/30 transition-all text-zinc-400 hover:text-primary">
            <Linkedin className="w-4.5 h-4.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
