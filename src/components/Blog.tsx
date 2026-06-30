"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, BookOpen, X, Share2, Heart } from "lucide-react";
import { useState } from "react";

const ARTICLES = [
  {
    id: "art-1",
    title: "Playwright vs. Selenium: Architectural Speed & Isolation Benchmarks",
    date: "June 12, 2026",
    readTime: "6 min read",
    desc: "A structural analysis of browser-context isolation in Playwright (ICONSIGNMENT) vs. WebDriver HTTP handshakes in Selenium (EMIST), with real-world parallel benchmarks.",
    category: "Automation",
    content: `### Speed and Architecture Comparison

In modern high-transaction logistics systems, test automation speed is a direct release gate. Let's analyze the structural differences between Selenium and Playwright.

#### 1. WebDriver Protocol vs. WebSocket Connection
* **Selenium** relies on W3C standardized HTTP JSON Wire handshakes. Each action (e.g., clicking driver elements) requires a round-trip HTTP request, creating network overhead.
* **Playwright** connects to browser execution targets over a single persistent WebSocket connection. Commands are sent as direct JSON payloads, resulting in zero protocol latency.

#### 2. Incognito Browser Contexts
Spawning multiple browser instances in Selenium is CPU and RAM intensive. Playwright introduces **Browser Contexts**, which function like isolated private windows. You can run hundreds of isolated tests in parallel on a single launch instance:

\`\`\`python
# Playwright Context Isolation Example (ICONSIGNMENT Engine)
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # Lightweight, isolated browser environment
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://iconsignment.com/dispatch")
    context.close()
    browser.close()
\`\`\`

#### Benchmark Results (100 E2E sanity runs)
* **Selenium WebDriver (Serial execution)**: 14.8 minutes
* **Playwright (Parallel execution inside Docker)**: 1.4 minutes (90.5% speedup)
`
  },
  {
    id: "art-2",
    title: "Building SEO-First Next.js Web Applications with SSR",
    date: "May 28, 2026",
    readTime: "5 min read",
    desc: "Optimizing core web vitals, metadata generation, and index capabilities for dynamic portals like TheDronaClasses.com and TheApnaSolution.com.",
    category: "Frontend",
    content: `### Optimizing SEO and Vitals

Modern full-stack web development requires high performance and search visibility. Transitioning client-heavy frameworks to Next.js server-rendered (SSR) structures ensures indexability and fast loading.

#### 1. Dynamic SEO Metadata Generation
Using Next.js App Router, page metadata is compiled on the server before transferring content, enabling crawlers to scrape keyword tags:

\`\`\`typescript
// src/app/courses/[id]/page.tsx (TheDronaClasses implementation)
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const course = await fetchCourse(params.id);
  return {
    title: \`\${course.name} | The Drona Classes\`,
    description: \`Join our \${course.level} training session.\`,
    keywords: [course.tag, "drona learning", "education"]
  };
}
\`\`\`

#### 2. Performance Metrics Optimization
By implementing server components and CSS-in-JS styling with Tailwind CSS v4, we strip heavy client scripts. This allows us to keep the First Contentful Paint (FCP) under 0.8s, leading to a perfect 100/100 Lighthouse score.
`
  },
  {
    id: "art-3",
    title: "Hands-Free Interfaces: Implementing Voice-Driven UI in PWAs",
    date: "April 18, 2026",
    readTime: "8 min read",
    desc: "Integrating HTML5 Speech Recognition for hands-free recipe controls and accessibility in premium web applications like Salt Sprinkle.",
    category: "Web Apps",
    content: `### Designing Hands-Free Web Interfaces

When using a cooking app, users often have messy hands. Integrating speech recognition allows them to control steps hands-free.

#### 1. Implementing the Web Speech API
We build a React hook that wraps the browser's \`SpeechRecognition\` engine to listen for specific commands:

\`\`\`typescript
// Voice command controller (Salt Sprinkle implementation)
const useVoiceNavigation = (onCommand: (cmd: string) => void) => {
  useEffect(() => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return;

    const recognizer = new Speech();
    recognizer.continuous = true;
    recognizer.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      onCommand(result.trim().toLowerCase());
    };
    recognizer.start();
    return () => recognizer.stop();
  }, [onCommand]);
};
\`\`\`

#### 2. Progressive Web App (PWA) Offline Access
Combining voice controls with service workers ensures that the application runs offline in kitchens with weak network signals, caching recipes and voice assets.
`
  },
  {
    id: "art-4",
    title: "Express API Validation & Database Query Optimization",
    date: "March 02, 2026",
    readTime: "7 min read",
    desc: "Developing robust Express.js request validators and query optimization strategies for high-volume admissions portals like AmarInstitute.in.",
    category: "Backend",
    content: `### Scaling Backend REST Services

In high-concurrency environments, dynamic forms (such as student admissions registries) can overload database query pipelines.

#### 1. Middleware Payload Validation
Always validate request schemas at the router level before executing controller logic:

\`\`\`javascript
// Express.js middleware validation (AmarInstitute implementation)
const validateInquirySchema = (req, res, next) => {
  const { name, email, courseCode } = req.body;
  if (!name || !email || !courseCode) {
    return res.status(400).json({ error: "Required fields missing" });
  }
  if (!/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}\$/.test(email)) {
    return res.status(400).json({ error: "Invalid email syntax" });
  }
  next();
};
\`\`\`

#### 2. Database Query Indexing
Adding compound indexes on active inquiry columns (e.g., \`status\` + \`created_at\`) ensures data query times stay below 50ms, even with thousands of concurrent operations.
`
  }
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="blog" className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Insights</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">Articles</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-xl mt-3">
              Deep dives into automated test framework design, speeds benchmarks, and continuous integration methodologies.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setSelectedArticle(article)}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group cursor-pointer text-left"
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-[10px] text-zinc-500 mb-4 font-mono font-medium">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" /> {article.date}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-primary" /> {article.readTime}</span>
                </div>

                <span className="text-[9px] uppercase tracking-wider font-semibold text-primary border border-primary/20 px-2 py-0.5 rounded bg-primary/5 self-start block w-max mb-3">
                  {article.category}
                </span>
                
                <h4 className="text-base font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                  {article.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-300 group-hover:text-primary transition-colors flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <button
                  onClick={(e) => toggleLike(article.id, e)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    likedArticles[article.id] 
                      ? "bg-red-500/10 text-red-500 border-red-500/20" 
                      : "text-zinc-500 border-transparent hover:text-white"
                  }`}
                  title="Like Article"
                >
                  <Heart className="w-3.5 h-3.5" fill={likedArticles[article.id] ? "currentColor" : "none"} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Reader Full Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Content Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] glass border border-primary/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl z-10 text-left"
            >
              {/* Header */}
              <div className="p-6 bg-zinc-950 border-b border-white/5 flex justify-between items-start">
                <div className="space-y-2 max-w-[85%]">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                    <span>•</span>
                    <span className="text-primary font-bold">{selectedArticle.category}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                    {selectedArticle.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-zinc-950/40 text-xs md:text-sm text-zinc-300 leading-relaxed space-y-4">
                
                {/* Simulated Markdown Render */}
                <div className="prose prose-invert max-w-none space-y-4">
                  {selectedArticle.content.split("\n\n").map((para, pIdx) => {
                    if (para.startsWith("### ")) {
                      return <h4 key={pIdx} className="text-base font-extrabold text-white pt-2">{para.replace("### ", "")}</h4>;
                    }
                    if (para.startsWith("#### ")) {
                      return <h5 key={pIdx} className="text-sm font-bold text-zinc-200">{para.replace("#### ", "")}</h5>;
                    }
                    if (para.startsWith("* ")) {
                      return (
                        <ul key={pIdx} className="list-disc pl-5 space-y-1 text-zinc-400">
                          {para.split("\n").map((li, lIdx) => (
                            <li key={lIdx}>{li.replace("* ", "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith("```")) {
                      const codeLines = para.split("\n");
                      const language = codeLines[0].replace("```", "").trim();
                      const code = codeLines.slice(1, codeLines.length - 1).join("\n");
                      return (
                        <div key={pIdx} className="bg-zinc-950 p-4 rounded-xl border border-white/5 font-mono text-[10px] md:text-xs overflow-x-auto text-zinc-400">
                          <pre><code>{code}</code></pre>
                        </div>
                      );
                    }
                    return <p key={pIdx} className="text-zinc-400">{para}</p>;
                  })}
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-950 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-zinc-500">Written by Neeraj Singh</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleLike(selectedArticle.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" fill={likedArticles[selectedArticle.id] ? "currentColor" : "none"} />
                    <span>{likedArticles[selectedArticle.id] ? "Liked" : "Like"}</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Portfolio link copied to clipboard!");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
