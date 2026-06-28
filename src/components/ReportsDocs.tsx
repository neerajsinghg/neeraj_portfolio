"use client";

import { motion } from "framer-motion";
import { FileText, Download, CheckCircle, XCircle, Clock, BarChart3, BookOpen } from "lucide-react";
import Link from "next/link";

const documents = [
  { name: "Test Plan Example", icon: <FileText className="w-5 h-5 text-accent" /> },
  { name: "Test Strategy", icon: <FileText className="w-5 h-5 text-accent" /> },
  { name: "Sample Bug Reports", icon: <FileText className="w-5 h-5 text-accent" /> },
  { name: "API Test Collection", icon: <FileText className="w-5 h-5 text-accent" /> }
];

export default function ReportsDocs() {
  return (
    <section id="reports" className="py-24 relative bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Reports & <span className="text-primary">Documentation</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Providing transparency and proof of work through comprehensive test reporting and documentation.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Test Reports Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[50px] group-hover:bg-secondary/20 transition-colors" />
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-secondary" />
              <h3 className="text-2xl font-bold">Automation Execution</h3>
            </div>
            
            <div className="space-y-4 mb-8 z-10">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Total Tests</span>
                <span className="font-bold text-xl">150</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 flex flex-col">
                  <div className="flex items-center gap-2 mb-2 text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">Passed</span>
                  </div>
                  <span className="text-3xl font-bold text-green-400">145</span>
                </div>
                <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 flex flex-col">
                  <div className="flex items-center gap-2 mb-2 text-red-500">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">Failed</span>
                  </div>
                  <span className="text-3xl font-bold text-red-400">5</span>
                </div>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">Execution Time</span>
                </div>
                <span className="font-bold">25 minutes</span>
              </div>
            </div>

            <Link href="#" className="w-full py-3 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-xl flex items-center justify-center gap-2 font-medium transition-colors z-10">
              View Full Allure Report <ExternalLinkIcon className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* QA Documentation Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-bold">QA Documentation</h3>
            </div>
            
            <p className="text-muted-foreground mb-4">Sample documentation artifacts representing industry-standard test planning and strategy formulation.</p>

            <div className="grid gap-4">
              {documents.map((doc, i) => (
                <div key={doc.name} className="glass p-4 rounded-xl border border-white/10 flex items-center justify-between hover:border-accent/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {doc.icon}
                    </div>
                    <span className="font-medium text-foreground/90">{doc.name}</span>
                  </div>
                  <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-muted-foreground">
                    <Download className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}
