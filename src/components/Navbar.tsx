"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Search, X, ShieldAlert } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./Icons";
import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Architecture", href: "#architecture" },
  { name: "Reports", href: "#reports" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" }
];

const SEARCHABLE_ITEMS = [
  { term: "TheDronaClasses.com", section: "#projects", category: "Project" },
  { term: "TheApnaSolution.com", section: "#projects", category: "Project" },
  { term: "AmarInstitute.in", section: "#projects", category: "Project" },
  { term: "Salt Sprinkle", section: "#projects", category: "Project" },
  { term: "EMIST Logistics System", section: "#projects", category: "Project" },
  { term: "ICONSIGNMENT Transport", section: "#projects", category: "Project" },
  { term: "Enterprise Automation Suite", section: "#projects", category: "Project" },
  { term: "Logistics & Supply Chain Domain", section: "#about", category: "Domain" },
  { term: "Full-Stack Web Engineering", section: "#about", category: "Expertise" },
  { term: "Playwright & Selenium Testing", section: "#skills", category: "Skill" },
  { term: "React & Next.js Development", section: "#skills", category: "Skill" },
  { term: "Node.js & Express REST APIs", section: "#skills", category: "Skill" },
  { term: "Allure & Extent Execution Reports", section: "#reports", category: "Reports" },
  { term: "Blog & Technical Articles", section: "#blog", category: "Articles" },
  { term: "Contact & Interview Scheduling", section: "#contact", category: "Booking" }
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof SEARCHABLE_ITEMS>([]);

  // Keyboard shortcut listener for "/" key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" && 
        document.activeElement?.tagName !== "INPUT" && 
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = SEARCHABLE_ITEMS.filter(item =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleResultClick = (sectionId: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-1.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-white group-hover:text-primary transition-colors">Neeraj</span>
            <span className="text-primary font-light">.Singh</span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-primary transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Trigger */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-muted-foreground hover:text-primary transition-colors border border-white/5 bg-white/5 rounded-lg flex items-center gap-2 text-xs"
              title="Search Portfolio"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-[10px] text-muted-foreground/60 border border-white/10 px-1.5 py-0.5 rounded">/</span>
            </button>

            <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            
            <Link href="#contact" className="hidden sm:flex items-center justify-center px-4 py-1.5 border border-primary text-primary hover:bg-primary hover:text-black rounded-lg transition-all text-xs font-semibold tracking-wide">
              Hire Me
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Global Command/Search Palette Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Content box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="relative w-full max-w-lg glass border border-primary/20 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center px-4 border-b border-white/10">
                <Search className="w-5 h-5 text-primary mr-3" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search skills, projects, case studies..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 bg-transparent outline-none text-white placeholder-muted-foreground text-sm"
                />
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="p-1 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Suggestions/Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {searchQuery.trim() === "" ? (
                  <div className="p-4 text-xs text-muted-foreground text-center">
                    Type to search for <span className="text-primary font-medium">Playwright, Selenium, GitLab, Logistics, Resume</span>...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((item) => (
                      <button
                        key={item.term}
                        onClick={() => handleResultClick(item.section)}
                        className="w-full text-left p-3 hover:bg-primary/10 rounded-xl flex justify-between items-center transition-colors group cursor-pointer"
                      >
                        <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">{item.term}</span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-white/5 px-2 py-0.5 rounded bg-white/5 group-hover:border-primary/20">{item.category}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-muted-foreground">
                    No results found for <span className="text-white">"{searchQuery}"</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
