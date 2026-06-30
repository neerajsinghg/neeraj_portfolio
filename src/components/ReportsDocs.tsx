"use client";

import { motion } from "framer-motion";
import { FileText, Download, CheckCircle, XCircle, Clock, BarChart3, BookOpen, ExternalLink, X, AlertTriangle, Monitor } from "lucide-react";
import { useState } from "react";

const DOCUMENTS = [
  { 
    name: "Master Test Plan (EMIST Logistics)", 
    desc: "Comprehensive QA automation blueprint covering Vendor, Driver, Vehicle, and Detention Masters for EMIST Logistics.",
    type: "PDF Document"
  },
  { 
    name: "Playwright E2E Strategy (ICONSIGNMENT)", 
    desc: "Parallel execution schedules, browser context isolation configurations, and proof-of-delivery validation rules.",
    type: "PDF Document" 
  },
  { 
    name: "Allure Multi-Stack Report Configuration", 
    desc: "Centralized reporting schemas consolidating execution runs from Python, Playwright, and Java TestNG suites.",
    type: "Allure Config" 
  },
  { 
    name: "REST Assured & Postman Collections", 
    desc: "Pre-configured environment keys, JSON schema assertion files, and JWT token injection scripts.",
    type: "JSON Collection" 
  }
];

const MOCK_TEST_SUITES = [
  {
    name: "ICONSIGNMENT Carrier Dispatch",
    tests: [
      { name: "test_carrier_consignment_creation", status: "passed", duration: "1.2s", steps: ["Open /consignments/create", "Fill form parameters", "Submit form", "Verify API response status 201"] },
      { name: "test_pod_pdf_generation", status: "failed", duration: "4.5s", error: "AssertionError: Expected status to be 'DISPATCHED' but got 'PENDING'", steps: ["Open /consignments/upload", "Upload pod_receipt.pdf", "Click button#submit-pod", "Wait for network response", "Verify status badge displays 'DISPATCHED'"] },
      { name: "test_routing_engine_lat_long", status: "passed", duration: "0.8s", steps: ["Call routing API with coordinates", "Validate geographical geofence boundaries", "Assert response coordinates match Google Maps API"] }
    ]
  },
  {
    name: "EMIST Driver Sync Suite",
    tests: [
      { name: "test_driver_active_status_sync", status: "passed", duration: "2.1s", steps: ["Inject driver login token", "Update status to ACTIVE in database", "Fetch profile status from UI page", "Assert status text displays ACTIVE"] },
      { name: "test_vehicle_detention_fees", status: "failed", duration: "3.2s", error: "TimeoutError: Element button#calculate-fees not clickable within 15000ms", steps: ["Navigate to /detention/calculate", "Input vehicle number MH-12-Q-4452", "Select warehouse IN-PNQ-01", "Click button#calculate-fees"] }
    ]
  },
  {
    name: "REST Assured Payment APIs",
    tests: [
      { name: "test_payment_gateway_payload_signature", status: "passed", duration: "0.4s", steps: ["Serialize payment signature payload", "POST request to /api/v1/payment/signature", "Verify SHA-256 HMAC signature matches response"] },
      { name: "test_invoice_pdf_schema", status: "passed", duration: "0.6s", steps: ["GET invoice PDF download endpoint", "Extract content bytes", "Assert PDF structure matches dynamic JSON schema"] }
    ]
  }
];

export default function ReportsDocs() {
  const [activeReportTab, setActiveReportTab] = useState<"smoke" | "regression">("regression");
  const [showAllureModal, setShowAllureModal] = useState(false);
  const [allureTab, setAllureTab] = useState<"overview" | "suites" | "graphs">("overview");
  const [selectedSuiteIdx, setSelectedSuiteIdx] = useState(0);
  const [selectedTestIdx, setSelectedTestIdx] = useState(0);

  // High-performance dockerized execution metrics
  const reportData = {
    smoke: {
      total: 180,
      passed: 180,
      failed: 0,
      duration: "1.8 mins",
      successRate: "100%"
    },
    regression: {
      total: 1450,
      passed: 1438,
      failed: 12,
      duration: "14.2 mins",
      successRate: "99.1%"
    }
  };

  const activeStats = reportData[activeReportTab];
  const activeSuite = MOCK_TEST_SUITES[selectedSuiteIdx];
  const activeTest = activeSuite?.tests[selectedTestIdx];

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
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      activeReportTab === "regression" ? "bg-primary text-black font-semibold" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Full Regression
                  </button>
                  <button
                    onClick={() => setActiveReportTab("smoke")}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
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

            <button 
              onClick={() => setShowAllureModal(true)}
              className="w-full py-3.5 border border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary hover:text-black rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Launch Simulated Allure Dashboard <ExternalLink className="w-4 h-4" />
            </button>
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
                {DOCUMENTS.map((doc) => (
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

      {/* Simulated Allure Interactive Modal */}
      {showAllureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-6xl h-[85vh] bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden flex flex-col text-zinc-300 font-sans shadow-2xl">
            
            {/* Allure Header */}
            <div className="bg-[#1c1c1f] border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 bg-[#d5aa00] text-black font-extrabold rounded text-xs tracking-wider">ALLURE</div>
                <span className="text-sm font-bold text-white tracking-wide">EXECUTION TEST REPORT</span>
              </div>
              <button 
                onClick={() => setShowAllureModal(false)}
                className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main content grid */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-48 bg-[#18181a] border-r border-zinc-800 p-3 flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => setAllureTab("overview")}
                  className={`w-full px-3 py-2 rounded-lg flex items-center gap-2.5 text-xs font-semibold transition-all cursor-pointer ${
                    allureTab === "overview" ? "bg-[#d5aa00] text-black" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" /> Overview
                </button>
                <button
                  onClick={() => setAllureTab("suites")}
                  className={`w-full px-3 py-2 rounded-lg flex items-center gap-2.5 text-xs font-semibold transition-all cursor-pointer ${
                    allureTab === "suites" ? "bg-[#d5aa00] text-black" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <FileText className="w-4 h-4" /> Suites
                </button>
                <button
                  onClick={() => setAllureTab("graphs")}
                  className={`w-full px-3 py-2 rounded-lg flex items-center gap-2.5 text-xs font-semibold transition-all cursor-pointer ${
                    allureTab === "graphs" ? "bg-[#d5aa00] text-black" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Clock className="w-4 h-4" /> Graphs
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="flex-1 overflow-hidden flex flex-col bg-[#141416]">
                {allureTab === "overview" && (
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="grid md:grid-cols-12 gap-6">
                      
                      {/* Statistics Widget */}
                      <div className="md:col-span-7 bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800 flex flex-col justify-between text-left">
                        <div>
                          <h5 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Test Suite execution statistics</h5>
                          <div className="flex items-end gap-6 mb-4">
                            <div>
                              <span className="text-4xl font-black text-white">1,450</span>
                              <span className="text-[10px] text-zinc-500 block uppercase font-bold mt-1">Total Tests</span>
                            </div>
                            <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden flex">
                              <div className="bg-emerald-500 h-full" style={{ width: "99.1%" }} title="Passed" />
                              <div className="bg-red-500 h-full" style={{ width: "0.9%" }} title="Failed" />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 border-t border-zinc-800 pt-4 text-xs">
                          <div>
                            <span className="text-zinc-500 block">Passed</span>
                            <span className="font-bold text-emerald-400 text-lg">1,438</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Failed</span>
                            <span className="font-bold text-red-400 text-lg">12</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Pass Rate</span>
                            <span className="font-bold text-[#d5aa00] text-lg">99.17%</span>
                          </div>
                        </div>
                      </div>

                      {/* Environment Widget */}
                      <div className="md:col-span-5 bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800 text-left">
                        <h5 className="text-xs font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-1.5">
                          <Monitor className="w-3.5 h-3.5 text-[#d5aa00]" /> System Environment
                        </h5>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-zinc-800/50">
                            <span className="text-zinc-500">Runner Platform</span>
                            <span className="text-white font-mono">GitLab CI/CD Runner #40292</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-zinc-800/50">
                            <span className="text-zinc-500">Target Frameworks</span>
                            <span className="text-white font-mono">Playwright / REST Assured</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-zinc-800/50">
                            <span className="text-zinc-500">Docker Image</span>
                            <span className="text-white font-mono">python:3.10-slim-playwright</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-zinc-500">Host Environment</span>
                            <span className="text-white font-mono">Linux-Ubuntu-22.04-LTS</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Defect Categories & Timeline Overview */}
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                      
                      {/* Categories Defect Summary */}
                      <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800">
                        <h5 className="text-xs font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Defect Categorization
                        </h5>
                        <div className="space-y-3 text-xs">
                          <div className="p-3 bg-red-950/20 border border-red-500/10 rounded-lg flex items-center justify-between">
                            <div>
                              <span className="font-bold text-red-400 block">Product Defects (Assertion Errors)</span>
                              <span className="text-[10px] text-zinc-500 mt-0.5 block">Legitimate backend functional issues</span>
                            </div>
                            <span className="text-lg font-black text-red-400">8</span>
                          </div>
                          <div className="p-3 bg-amber-950/20 border border-amber-500/10 rounded-lg flex items-center justify-between">
                            <div>
                              <span className="font-bold text-amber-400 block">Test Defects (Automation Flakiness / Timeouts)</span>
                              <span className="text-[10px] text-zinc-500 mt-0.5 block">Dynamic wait conditions / stale selectors</span>
                            </div>
                            <span className="text-lg font-black text-amber-400">4</span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Stats */}
                      <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Execution Pipeline speed</h5>
                          <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                            Execution runs utilize parallel browser contexts inside dockerized pipelines, completing comprehensive regression suites in under 15 minutes.
                          </p>
                        </div>
                        <div className="bg-[#141416] p-3 rounded-lg border border-zinc-800/80 flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Total Run Time:</span>
                          <span className="font-mono font-bold text-[#d5aa00] text-sm flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> 14.2 minutes
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {allureTab === "suites" && (
                  <div className="flex-1 flex overflow-hidden">
                    {/* Suites Tree List */}
                    <div className="w-2/5 border-r border-zinc-800 overflow-y-auto p-4 flex flex-col gap-4">
                      {MOCK_TEST_SUITES.map((suite, sIdx) => (
                        <div key={suite.name} className="space-y-1.5">
                          <div className="text-[10px] font-extrabold uppercase text-zinc-500 tracking-wider px-1 text-left">
                            {suite.name}
                          </div>
                          <div className="space-y-1">
                            {suite.tests.map((test, tIdx) => {
                              const isSelected = selectedSuiteIdx === sIdx && selectedTestIdx === tIdx;
                              return (
                                <button
                                  key={test.name}
                                  onClick={() => {
                                    setSelectedSuiteIdx(sIdx);
                                    setSelectedTestIdx(tIdx);
                                  }}
                                  className={`w-full p-2.5 rounded-lg border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                                    isSelected 
                                      ? "bg-zinc-800 border-zinc-700 text-white font-semibold" 
                                      : "bg-[#18181a]/55 border-zinc-800/40 text-zinc-400 hover:text-white hover:bg-zinc-900"
                                  }`}
                                >
                                  <span className="truncate pr-2 font-mono">{test.name}</span>
                                  {test.status === "passed" ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  ) : (
                                    <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Suite Detail Panel */}
                    <div className="w-3/5 overflow-y-auto p-6 flex flex-col justify-between bg-[#111112] text-left">
                      {activeTest ? (
                        <div className="space-y-6">
                          <div className="border-b border-zinc-800 pb-4">
                            <div className="flex items-center gap-2 mb-2">
                              {activeTest.status === "passed" ? (
                                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[9px] uppercase rounded">Passed</span>
                              ) : (
                                <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-[9px] uppercase rounded">Failed</span>
                              )}
                              <span className="text-[10px] text-zinc-500 font-mono">Duration: {activeTest.duration}</span>
                            </div>
                            <h4 className="text-base font-extrabold text-white font-mono leading-snug">{activeTest.name}</h4>
                          </div>

                          {/* Step log */}
                          <div className="space-y-3">
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Execution Steps</h5>
                            <div className="space-y-1.5 font-mono text-[10px] text-zinc-400">
                              {activeTest.steps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 p-2 bg-[#18181a]/55 border border-zinc-800/40 rounded-lg">
                                  <span className="text-zinc-600 font-bold w-4">{idx + 1}.</span>
                                  <span className="flex-1">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Failure details */}
                          {activeTest.status === "failed" && activeTest.error && (
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider">Failure Exception Trace</h5>
                              <div className="p-4 bg-red-950/15 border border-red-500/15 rounded-lg font-mono text-[10px] text-red-400 whitespace-pre-wrap leading-relaxed">
                                {activeTest.error}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-zinc-500 text-xs">
                          Select a test case to view full execution details
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {allureTab === "graphs" && (
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
                    <div className="grid md:grid-cols-2 gap-6">
                      
                      {/* Duration Graph */}
                      <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800">
                        <h5 className="text-xs font-bold text-white mb-6 uppercase tracking-wider">Duration Distribution</h5>
                        <div className="space-y-4 text-xs">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-zinc-400">&lt; 1s (Ultra-fast APIs)</span>
                              <span className="font-mono text-white">82% (1,189 tests)</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: "82%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-zinc-400">1s - 3s (Standard UI Actions)</span>
                              <span className="font-mono text-white">13% (189 tests)</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: "13%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-zinc-400">3s - 5s (Asynchronous PDF Grids)</span>
                              <span className="font-mono text-white">4% (58 tests)</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: "4%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-zinc-400">&gt; 5s (Network Timeouts)</span>
                              <span className="font-mono text-white">1% (14 tests)</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="bg-red-500 h-full" style={{ width: "1%" }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Severity Graph */}
                      <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800">
                        <h5 className="text-xs font-bold text-white mb-6 uppercase tracking-wider">Severity Distribution</h5>
                        <div className="space-y-4 text-xs">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-zinc-400">Blocker / Critical</span>
                              <span className="font-mono text-white">450 tests</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="bg-red-500 h-full" style={{ width: "31%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-zinc-400">Normal</span>
                              <span className="font-mono text-white">920 tests</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: "63%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-zinc-400">Minor</span>
                              <span className="font-mono text-white">80 tests</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-full" style={{ width: "6%" }} />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
