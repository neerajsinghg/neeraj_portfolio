import { Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./Icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="py-12 border-t border-white/5 relative bg-black/40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Link href="/" className="font-bold text-xl tracking-tighter">
            Dev<span className="text-primary">QA</span>
          </Link>
          <p className="text-muted-foreground text-sm mt-2">© 2024 Senior SDET Portfolio. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="mailto:hello@example.com" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
            <Mail className="w-5 h-5" />
          </Link>
          <Link href="https://github.com" target="_blank" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
