"use client";

import { motion } from "framer-motion";
import { ArrowRight, Laptop, Cpu, FileSpreadsheet, BarChart2, GitPullRequest, Settings } from "lucide-react";
import { useState } from "react";

const ARCH_LAYERS = [
  {
    id: "layer-1",
    title: "1. Target App / Browser",
    icon: <Laptop className="w-5 h-5 text-primary" />,
    desc: "EMIST & ICONSIGNMENT web apps running Chrome, Firefox, WebKit.",
    details: "Automated execution executes tests across headless and headed browsers. The framework intercepts calls to handle complex logistics routing applications with dynamic inputs."
  },
  {
    id: "layer-2",
    title: "2. Automation Driver",
    icon: <Cpu className="w-5 h-5 text-primary" />,
    desc: "Playwright / Selenium WebDriver APIs.",
    details: "Playwright is utilized for fast headless E2E verification, while Selenium is integrated for deep cross-browser compatibility grids (BrowserStack) and legacy portal validation."
  },
  {
    id: "layer-3",
    title: "3. Page Objects (POM)",
    icon: <FileSpreadsheet className="w-5 h-5 text-primary" />,
    desc: "Page elements encapsulation, explicit waits, locators.",
    details: "Separates page elements and actions from test assertions. Built with base page layers containing synchronized waits, preventing flakiness on dynamic logistics shipment portals."
  },
  {
    id: "layer-4",
    title: "4. Test Utilities",
    icon: <Settings className="w-5 h-5 text-primary" />,
    desc: "Database queries, cookie injection, logger utilities.",
    details: "Custom helper libraries handling OAuth 2.0 authentication, database validation, dynamic test data loading from JSON, and automatic capture of trace files."
  },
  {
    id: "layer-5",
    title: "5. Reporting Engine",
    icon: <BarChart2 className="w-5 h-5 text-primary" />,
    desc: "Allure Reports & Extent dashboards.",
    details: "Generates rich HTML report dashboards containing screenshots, log traces, execution steps, and historical metrics on failure, sent directly to development teams."
  },
  {
    id: "layer-6",
    title: "6. CI/CD Orchestrator",
    icon: <GitPullRequest className="w-5 h-5 text-primary" />,
    desc: "GitLab Pipeline runners inside Docker.",
    details: "Automatically triggers parallel jobs on dockerized GitLab runners upon merge request triggers, blocking code integration if sanity checkpoints fail."
  }
];

export default function Architecture() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(2); // Page Objects default

  return (
    <section id="architecture" className="py-24 relative bg-black">
      {/* Golden accent radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Architecture</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Automation <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">Pipeline Flow</span>
          </h3>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
            Click on any phase in the execution diagram below to see detailed framework configurations.
          </p>
        </div>

        {/* Workflow Block Diagram */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 mb-10 items-stretch">
          {ARCH_LAYERS.map((layer, idx) => (
            <div key={layer.id} className="flex flex-col h-full">
              <motion.div
                onClick={() => setSelectedLayerIndex(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className={`flex-1 glass p-5 rounded-xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between select-none relative ${
                  selectedLayerIndex === idx 
                    ? "border-primary/50 shadow-[0_0_15px_rgba(255,215,0,0.15)] bg-primary/5" 
                    : "border-white/5 hover:border-primary/20"
                }`}
              >
                {selectedLayerIndex === idx && (
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                <div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                    selectedLayerIndex === idx ? "bg-primary/10 text-primary" : "bg-white/5 text-zinc-400"
                  }`}>
                    {layer.icon}
                  </div>
                  <h4 className={`text-xs font-bold mb-2 transition-colors ${
                    selectedLayerIndex === idx ? "text-primary" : "text-white"
                  }`}>
                    {layer.title}
                  </h4>
                  <p className="text-zinc-500 text-[10px] leading-relaxed">
                    {layer.desc}
                  </p>
                </div>

                {/* Arrow indicator on desktop */}
                {idx !== ARCH_LAYERS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-zinc-950 border border-white/5 items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Detailed Layer Breakdown Box */}
        <motion.div
          key={selectedLayerIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass p-6 md:p-8 border border-primary/20 rounded-2xl text-left bg-gradient-to-r from-zinc-950 via-[#070709] to-zinc-950 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
            Technical Details — {ARCH_LAYERS[selectedLayerIndex].title}
          </h4>
          <p className="text-zinc-200 text-xs md:text-sm leading-relaxed">
            {ARCH_LAYERS[selectedLayerIndex].details}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
