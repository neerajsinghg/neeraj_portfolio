"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, BookOpen, X, Share2, Heart } from "lucide-react";
import { useState } from "react";

const ARTICLES = [
  {
    id: "art-1",
    title: "E2E Speed Showdown: Playwright vs. Selenium WebDriver",
    date: "June 12, 2026",
    readTime: "6 min read",
    desc: "A structural analysis of browser-context isolation vs. WebDriver HTTP handshakes, with real-world execution benchmarks.",
    category: "Architecture",
    content: `### Speed and Architecture Comparison

In modern single-page applications, testing speed and reliability are paramount. Let's analyze the core architectural differences between Selenium and Playwright.

#### 1. The WebDriver Protocol vs. Chrome DevTools Protocol (CDP)
* **Selenium** relies on the HTTP WebDriver JSON Wire Protocol (now W3C standardized). Each instruction (e.g., clicking a button) is sent as an HTTP request to the driver binary, which then communicates with the browser. This creates network roundtrip latency.
* **Playwright** establishes a single persistent WebSocket connection directly to the browser. Commands are sent as JSON payloads over a single socket, resulting in near-zero protocol latency.

#### 2. Isolation: Browser Contexts
In Selenium, running tests in parallel requires spawning separate browser instances, which is CPU and memory heavy. 
Playwright introduces **Browser Contexts**, which act like incognito tabs. You can spawn thousands of isolated contexts in a single browser session:

\`\`\`python
# Playwright Context Isolation Example
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    # Spawns a lightweight, completely isolated context
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://emist.logistics.com")
    context.close()
    browser.close()
\`\`\`

#### Real-World Benchmark Results
In our regression suite (100 E2E tests):
* **Selenium WebDriver (Chrome)**: 14 mins (Local Execution)
* **Playwright (Chromium)**: 3.2 mins (Parallel Local Execution)
`
  },
  {
    id: "art-2",
    title: "Designing a Flake-Free Page Object Model in Pytest",
    date: "May 28, 2026",
    readTime: "5 min read",
    desc: "Avoid dynamic rendering errors by wrapping wait strategies inside a robust BasePage class with custom decorators.",
    category: "Frameworks",
    content: `### Eliminating Test Flakiness

Test flakiness is the biggest enemy of automation pipelines. A test that fails 5% of the time without a bug wastes developer hours. Here is how to structure page objects to prevent timing anomalies.

#### The BasePage Pattern
Never call wait commands inside test functions. Create a centralized wait mechanism in a \`BasePage\` class:

\`\`\`python
# pages/base_page.py
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def wait_for_element(self, locator):
        return self.wait.until(EC.presence_of_element_located(locator))

    def safe_click(self, locator):
        element = self.wait.until(EC.element_to_be_clickable(locator))
        element.click()
\`\`\`

#### Dynamic Element Retry Decorators
Use Python decorators to automatically retry stale element references:

\`\`\`python
import time
from selenium.common.exceptions import StaleElementReferenceException

def retry_on_stale(max_retries=3):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except StaleElementReferenceException:
                    if i == max_retries - 1:
                        raise
                    time.sleep(0.5)
        return wrapper
    return decorator
\`\`\`
`
  },
  {
    id: "art-3",
    title: "Orchestrating GitLab Quality Gates with Docker Runners",
    date: "April 18, 2026",
    readTime: "8 min read",
    desc: "A walkthrough of building optimized Docker images to run Playwright test suites inside isolated CI/CD tasks.",
    category: "DevOps",
    content: `### Automating the Quality Gate

CI/CD integration ensures bugs are caught instantly. Setting up Playwright dependencies on raw runner servers is error-prone. Docker is the preferred solution.

#### Creating the Dockerfile
We build a slim image pre-packaged with Python, Playwright, and chromium requirements:

\`\`\`dockerfile
# Dockerfile
FROM python:3.10-slim

# Install system dependencies for Playwright
RUN apt-get update && apt-get install -y \\
    wget \\
    gnupg \\
    libnss3 \\
    libatk1.0-0 \\
    libatk-bridge2.0-0 \\
    libcups2 \\
    libdrm2 \\
    libxkbcommon0 \\
    libxcomposite1 \\
    libxdamage1 \\
    libxrandr2 \\
    libgbm1 \\
    libasound2 \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN playwright install chromium
\`\`\`

#### Defining the GitLab CI/CD Pipeline
Mount report artifacts so failures can be inspected visually:

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - test

run_regression:
  stage: test
  image: registry.gitlab.com/neeraj/qa-image:latest
  script:
    - pytest tests/ --html=reports/report.html
  artifacts:
    when: always
    paths:
      - reports/
    expire_in: 7 days
\`\`\`
`
  },
  {
    id: "art-4",
    title: "API Automation: Best Practices with Rest Assured",
    date: "March 02, 2026",
    readTime: "7 min read",
    desc: "Why JSON Schema validations and token caching are mandatory for enterprise API regression suites.",
    category: "API Testing",
    content: `### Designing REST Assured Frameworks

API testing is fast, stable, and catches logic bugs early. Rest Assured is a powerful tool to assert JSON payloads.

#### 1. Implement Schema Validations
Never assert each field individually when there are large response payloads. Use JSON schema validators to verify structural contracts:

\`\`\`java
// Asserting Response Schema
import static io.restassured.module.jsonschema.JsonSchemaValidator.matchesJsonSchemaInClasspath;

given()
    .get("/api/v1/consignments/SHIP-882")
.then()
    .statusCode(200)
    .body(matchesJsonSchemaInClasspath("consignment-schema.json"));
\`\`\`

#### 2. Caching Auth Tokens
Authentication endpoints are expensive. Do not request a login token before every single test request. Cache the JWT token globally:

\`\`\`java
public class BaseAPITest {
    protected static String jwtToken;

    @BeforeSuite
    public void obtainToken() {
        jwtToken = given()
            .formParam("username", "sdet")
            .formParam("password", "pass")
            .post("/api/auth")
            .path("token");
    }
}
\`\`\`
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
