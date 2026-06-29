"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckSquare } from "lucide-react";

const experienceTimeline = [
  {
    period: "2022 - Present",
    role: "Lead QA Automation Engineer & SDET",
    company: "Logitech Systems (Supply Chain Div.)",
    description: "Architecting E2E quality orchestration pipelines for EMIST and ICONSIGNMENT dispatch systems. Leading a team of 4 QA engineers to automate critical supply chain workflows.",
    points: [
      "Designed a modern Python Playwright framework using Page Object Model and parallel test execution, saving over 35 hours per release cycle.",
      "Built and optimized GitLab CI/CD pipelines using custom Docker images to execute automated smoke and regression runs on every merge request.",
      "Integrated REST Assured and Pytest automation suites, achieving 95%+ coverage on core backend order-fulfillment API endpoints."
    ]
  },
  {
    period: "2018 - 2022",
    role: "Senior QA Automation Engineer / SDET",
    company: "SupplyChain Solutions Corp",
    description: "Built scalable testing frameworks from scratch. Standardized automated UI and API regressions across multiple inventory management web portals.",
    points: [
      "Architected a Java Selenium TestNG hybrid framework utilizing Page Factory, Data Provider patterns, and Extent Reports.",
      "Implemented cross-browser execution grids using BrowserStack, reducing multi-browser verification times by 65%.",
      "Developed automated failure-analysis scripts that capture logs and failure screenshots, reducing debugging time for developers."
    ]
  },
  {
    period: "2015 - 2018",
    role: "QA Automation Engineer",
    company: "Nexus Technologies",
    description: "Automated standard functional regression tests and participated in database-level verification suites.",
    points: [
      "Created and executed data-driven tests using Apache POI to parse transaction records, validating bulk ordering systems.",
      "Executed automated API regressions using Rest Assured, incorporating JSON schema validation and JWT authentication.",
      "Conducted weekly smoke and sanity test automation runs to verify build stability before staging deployments."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-black">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Journey</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">Journey</span>
          </h3>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
            A career focused on designing solid automation architectures and optimizing test infrastructure.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-0.5 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-primary/40 before:via-zinc-800 before:to-transparent space-y-12">
          
          {experienceTimeline.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative flex flex-col md:flex-row md:justify-between items-start md:even:flex-row-reverse"
            >
              {/* Checkpoint Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border border-primary/30 bg-black z-10 shadow-[0_0_10px_rgba(255,215,0,0.15)]">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              </div>
              
              {/* Content Panel */}
              <div className="w-full md:w-[46%] pl-10 md:pl-0">
                <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 relative group">
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {item.period}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 font-medium">
                      {item.company}
                    </span>
                  </div>

                  <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                    {item.role}
                  </h4>
                  <p className="text-zinc-500 text-xs mb-5 italic">
                    {item.description}
                  </p>

                  <ul className="space-y-3">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2.5">
                        <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacing element for grid layout on desktop */}
              <div className="hidden md:block w-[46%]" />

            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
