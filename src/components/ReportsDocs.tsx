"use client";

import { motion } from "framer-motion";
import { FileText, Download, CheckCircle, XCircle, Clock, BarChart3, BookOpen, ExternalLink } from "lucide-react";
import { useState } from "react";

const DOCUMENTS = [
  { 
    name: "Master Test Plan (Logistics)", 
    desc: "Comprehensive testing strategy documentation for EMIST logistics system integrations.",
    type: "PDF Document"
  },
  { 
    name: "Consignment Test Strategy", 
    desc: "Detailed verification protocols, locator guidelines, and regression schedule maps.",
    type: "PDF Document" 
  },
  { 
    name: "Sample Detailed Bug Reports", 
    desc: "Professional issue tickets with reproducible steps, logs, and root-cause analysis.",
    type: "Excel Sheet" 
  },
  { 
    name: "Postman API Test Collection", 
    desc: "Pre-configured environment collection including environment authentication tokens and schema verifications.",
    type: "JSON Collection" 
  }
];

export default function ReportsDocs() {
  const [activeReportTab, setActiveReportTab] = useState<"smoke" | "regression">("regression");

  // Mock report metrics
  const reportData = {
    smoke: {
      total: 120,
      passed: 119,
      failed: 1,
      duration: "3.2 mins",
      successRate: "99.1%"
    },
    regression: {
      total: 1045,
      passed: 1024,
      failed: 21,
      duration: "14.8 mins",
      successRate: "98.0%"
    }
  };

  const activeStats = reportData[activeReportTab];

  return (
    <section id="reports" className="py-24 relative bg-black">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Metrics & Artifacts</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Reports & <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">Documentation</span>
          </h3>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
            Demonstrating execution transparency and delivery verification through structured test reports.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Allure-style Execution Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 glass p-8 rounded-2xl border border-white/5 flex flex-col justify-between relative group hover:border-primary/10 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <h4 className="text-base font-bold text-white">Pipeline Execution Metrics</h4>
                </div>
                
                {/* Selector */}
                <div className="p-0.5 bg-zinc-950 border border-white/5 rounded-lg flex text-[10px]">
                  <button
                    onClick={() => setActiveReportTab("regression")}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeReportTab === "regression" ? "bg-primary text-black font-semibold" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Full Regression
                  </button>
                  <button
                    onClick={() => setActiveReportTab("smoke")}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeReportTab === "smoke" ? "bg-primary text-black font-semibold" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Smoke Suite
                  </button>
                </div>
              </div>

              {/* Stats Rings / Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 text-left">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">Total Test Cases</span>
                  <span className="text-3xl font-extrabold text-white">{activeStats.total}</span>
                </div>
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 text-left">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">Execution Time</span>
                  <div className="flex items-center gap-1.5 mt-1 text-white">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-bold">{activeStats.duration}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 text-left">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[9px] uppercase tracking-wider mb-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Passed
                  </div>
                  <span className="text-2xl font-extrabold text-emerald-400">{activeStats.passed}</span>
                </div>
                
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10 text-left">
                  <div className="flex items-center gap-1.5 text-red-400 font-bold text-[9px] uppercase tracking-wider mb-1">
                    <XCircle className="w-3.5 h-3.5" /> Failed
                  </div>
                  <span className="text-2xl font-extrabold text-red-400">{activeStats.failed}</span>
                </div>

                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-left">
                  <span className="text-[9px] text-primary font-bold uppercase tracking-wider block mb-1">Pass Ratio</span>
                  <span className="text-2xl font-extrabold text-primary">{activeStats.successRate}</span>
                </div>
              </div>
            </div>

            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="w-full py-3.5 border border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary hover:text-black rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Launch Simulated Allure Dashboard <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right Column: QA Deliverables Downloads */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2 text-left">
                <BookOpen className="w-6 h-6 text-primary" />
                <h4 className="text-base font-bold text-white">QA Deliverable Templates</h4>
              </div>
              <p className="text-zinc-500 text-xs text-left leading-relaxed mb-4">
                Review representative testing deliverables that establish the structure and metrics driving my automation framework executions.
              </p>

              <div className="grid gap-3">
                {DOCUMENTS.map((doc, idx) => (
                  <div 
                    key={doc.name} 
                    className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between hover:border-primary/25 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{doc.name}</h5>
                        <p className="text-[10px] text-zinc-500 mt-1 leading-snug">{doc.desc}</p>
                      </div>
                    </div>

                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Downloading sample template: ${doc.name}`);
                      }}
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all text-zinc-400 shrink-0"
                      title={`Download ${doc.name}`}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
