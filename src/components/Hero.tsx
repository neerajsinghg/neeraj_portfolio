"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Play, Terminal, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const SUBTITLES = [
  "Senior QA Automation Engineer",
  "Python Developer",
  "Playwright Expert",
  "Selenium Specialist",
  "Automation Framework Architect",
  "API Testing Engineer",
  "CI/CD Automation Engineer"
];

const CODE_TEMPLATES = [
  {
    lang: "python",
    title: "playwright_suite.py",
    code: `import pytest
from playwright.sync_api import sync_playwright

def test_logistics_consignment():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://iconsignment.com")
        
        # Verify shipment dashboard
        page.click("#view-shipments")
        assert page.is_visible(".shipment-grid")
        print("Consignment check passed!")`,
    logs: [
      "[pytest] Running test_logistics_consignment...",
      "[playwright] Chromium launched successfully.",
      "[playwright] Navigating to ICONSIGNMENT portal...",
      "[playwright] Clicked #view-shipments element.",
      "[assert] Class .shipment-grid is present.",
      "Consignment check passed!",
      "---------------------------------------------",
      "RESULT: 1 Passed in 1.48s ✅"
    ]
  },
  {
    lang: "python",
    title: "selenium_pom_test.py",
    code: `import unittest
from pages.emist_dashboard import EmistPage
from utils.webdriver_factory import get_driver

class EmistRegression(unittest.TestCase):
    def setUp(self):
        self.driver = get_driver("chrome")
        self.page = EmistPage(self.driver)

    def test_supply_chain_dispatch(self):
        self.page.login("admin", "secure_pwd")
        self.page.trigger_dispatch(id="DIS-9820")
        self.assertTrue(self.page.is_dispatched())`,
    logs: [
      "[unittest] Launching Chrome Browser...",
      "[pom] Initialized EmistPage POM structure.",
      "[auth] Logging in with user 'admin'...",
      "[action] Triggering dispatch for ID DIS-9820...",
      "[assert] Dispatch status confirmed.",
      "---------------------------------------------",
      "RESULT: test_supply_chain_dispatch Passed ✅"
    ]
  },
  {
    lang: "javascript",
    title: "api_rest_assured.java",
    code: `import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@Test
public void testGetConsignmentAPI() {
    given()
        .header("Authorization", "Bearer token-xyz")
        .pathParam("id", "EMIST-2026")
    .when()
        .get("/api/v1/shipments/{id}")
    .then()
        .statusCode(200)
        .body("status", equalTo("DISPATCHED"))
        .body("carrier", notNullValue());
}`,
    logs: [
      "[testng] Running testGetConsignmentAPI...",
      "[rest-assured] Sending GET /api/v1/shipments/EMIST-2026",
      "[rest-assured] Received Response Status: 200 OK",
      "[assert] Body validation 'status' equals 'DISPATCHED' ... OK",
      "[assert] Body validation 'carrier' not null ... OK",
      "---------------------------------------------",
      "RESULT: testGetConsignmentAPI Passed ✅"
    ]
  }
];

export default function Hero() {
  const [subIndex, setSubIndex] = useState(0);
  const [typeText, setTypeText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [codeIndex, setCodeIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunningTest, setIsRunningTest] = useState(false);

  // Typewriter effect for subtitle
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = SUBTITLES[subIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypeText(prev => prev.substring(0, prev.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypeText(fullText.substring(0, typeText.length + 1));
      }, 100);
    }

    if (!isDeleting && typeText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && typeText === "") {
      setIsDeleting(false);
      setSubIndex(prev => (prev + 1) % SUBTITLES.length);
    }

    return () => clearTimeout(timer);
  }, [typeText, isDeleting, subIndex]);

  // Run test animation on 3D laptop
  const runTestSimulation = () => {
    if (isRunningTest) return;
    setIsRunningTest(true);
    setTerminalLogs(["[system] Initializing test execution..."]);
    
    const logs = CODE_TEMPLATES[codeIndex].logs;
    let currentLogIndex = 0;
    
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setTerminalLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsRunningTest(false);
      }
    }, 600);
  };

  useEffect(() => {
    runTestSimulation();
  }, [codeIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black">
      {/* Golden Radial Mesh and Background Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/6 left-1/10 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/6 right-1/10 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,215,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,215,0,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Copy */}
        <div className="lg:col-span-6 flex flex-col text-left space-y-6 lg:pr-8">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="self-start px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-[11px] font-semibold text-primary uppercase tracking-widest flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} /> SDET & Framework Architect
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl font-medium text-white/60 tracking-wide"
            >
              Hi, I'm Neeraj Singh
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Architecting <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-200 to-yellow-500">Flawless Delivery</span>
            </motion.h1>
          </div>

          {/* Animated Subtitle */}
          <div className="h-8 flex items-center">
            <span className="text-lg md:text-xl font-mono text-primary font-medium tracking-wide">
              {typeText}
            </span>
            <span className="w-1.5 h-5 bg-primary ml-1.5 animate-pulse" />
          </div>

          {/* Intro Description */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl"
          >
            Over 10.5 years of expertise designing hybrid automation frameworks (Playwright, Selenium, Rest Assured) for high-load Logistics & Supply Chain applications. Reducing manual testing efforts by up to 85% via scalable GitLab CI/CD pipelines.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link href="#projects" className="px-6 py-3 bg-primary hover:bg-primary/95 text-black rounded-lg transition-all flex items-center justify-center font-bold text-xs uppercase tracking-wider gap-2 shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]">
              View Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a href="/Neeraj_Singh_Resume.pdf" download className="px-6 py-3 border border-white/10 hover:border-primary/50 glass hover:bg-white/5 text-white rounded-lg transition-all flex items-center justify-center font-semibold text-xs uppercase tracking-wider gap-2">
              <Download className="w-4 h-4 text-primary" /> Download Resume
            </a>

            <Link href="#contact" className="px-6 py-3 hover:text-primary transition-colors text-white text-xs uppercase tracking-wider font-semibold">
              Contact Me
            </Link>
          </motion.div>
        </div>

        {/* Right Side: 3D Laptop Code Simulation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-6 flex items-center justify-center laptop-viewport h-[450px]"
        >
          {/* Laptop 3D Container */}
          <div className="laptop-container w-full max-w-[480px] aspect-[1.6] relative">
            
            {/* 1. Screen (Lid) */}
            <div className="laptop-screen w-full h-[90%] bg-[#080808] border-2 border-zinc-800 rounded-t-2xl p-2 relative overflow-hidden flex flex-col">
              
              {/* Screen Top Bezel Detail */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                <div className="w-1 h-1 rounded-full bg-blue-500/60 animate-pulse" />
              </div>
              
              {/* Terminal Frame */}
              <div className="w-full h-full bg-[#050505] rounded-lg border border-zinc-900 overflow-hidden flex flex-col relative">
                {/* Window Controls Header */}
                <div className="h-6 bg-zinc-950 border-b border-zinc-900 px-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                  
                  {/* File Selector Tabs */}
                  <div className="flex items-center gap-1">
                    {CODE_TEMPLATES.map((tpl, i) => (
                      <button
                        key={tpl.title}
                        onClick={() => setCodeIndex(i)}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-all ${
                          codeIndex === i 
                            ? "bg-primary/10 text-primary border-primary/20 font-bold" 
                            : "text-zinc-500 border-transparent hover:text-zinc-300"
                        }`}
                      >
                        {tpl.title}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[9px] text-zinc-500 font-mono">
                    <Terminal className="w-3 h-3 text-primary" /> term
                  </div>
                </div>

                {/* Split Terminal View */}
                <div className="flex-1 grid grid-rows-2 p-3 font-mono text-[9px] leading-relaxed overflow-hidden">
                  
                  {/* Code Snippet Display */}
                  <div className="border-b border-zinc-900/60 pb-2 overflow-y-auto select-none scrollbar-none text-zinc-300">
                    <pre className="text-zinc-400">
                      <code className="text-amber-500/90 font-semibold">{`# Active Automation Script`}</code>
                      <br />
                      <code>{CODE_TEMPLATES[codeIndex].code}</code>
                    </pre>
                  </div>

                  {/* Execution Logs Terminal */}
                  <div className="pt-2 flex flex-col justify-end overflow-hidden">
                    <div className="flex items-center justify-between text-[8px] text-zinc-500 border-b border-zinc-950 pb-1 mb-1">
                      <span>AUTOMATION PIPELINE SIMULATOR</span>
                      <button
                        onClick={runTestSimulation}
                        disabled={isRunningTest}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-all ${
                          isRunningTest 
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                            : "bg-primary text-black hover:bg-yellow-400 font-bold"
                        }`}
                      >
                        <Play className="w-2 h-2" /> RUN SCRIPT
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-left text-zinc-400 scrollbar-none">
                      {terminalLogs.map((log, idx) => (
                        <div key={idx} className={`whitespace-pre-wrap font-mono ${
                          log.includes("Passed ✅") || log.includes("passed")
                            ? "text-emerald-400 font-semibold" 
                            : log.includes("Failed") || log.includes("Error")
                            ? "text-red-400"
                            : log.includes("[assert]")
                            ? "text-sky-300"
                            : "text-zinc-400"
                        }`}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Base (Keyboard Section) */}
            <div className="laptop-base w-[106%] h-[8%] bg-zinc-800 border-t border-zinc-600 rounded-b-xl absolute bottom-0 -left-[3%] relative flex justify-center shadow-2xl">
              {/* Keyboard mock grid */}
              <div className="w-[90%] h-[50%] bg-zinc-900 rounded border border-zinc-700/60 mt-1 flex flex-col justify-between p-0.5">
                <div className="flex justify-between gap-0.5 h-[30%]">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div key={idx} className="flex-1 bg-zinc-950 rounded-sm" />
                  ))}
                </div>
                <div className="flex justify-between gap-0.5 h-[45%]">
                  <div className="w-[10%] bg-zinc-950 rounded-sm" />
                  <div className="w-[60%] bg-zinc-950 rounded-sm" />
                  <div className="w-[10%] bg-zinc-950 rounded-sm" />
                  <div className="w-[15%] bg-zinc-950 rounded-sm" />
                </div>
              </div>
              {/* Front notch */}
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-zinc-950 rounded-t-sm" />
            </div>

          </div>
        </motion.div>

      </div>

      {/* Mouse scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
