"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  { title: "Frontend & Backend Dev Layer", desc: "React, Node.js, Next.js, Spring Boot" },
  { title: "Unit & Integration Testing", desc: "Jest, JUnit, React Testing Library" },
  { title: "E2E Automation Layer (UI & API)", desc: "Playwright, Selenium, Rest Assured" },
  { title: "Reporting & Analytics", desc: "Allure, ReportPortal, Coverage metrics" },
  { title: "CI/CD Pipeline", desc: "Docker, Kubernetes, Jenkins, GitHub Actions" }
];

export default function Architecture() {
  return (
    <section className="py-24 relative bg-black/20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Architecture & <span className="text-primary">Workflow</span></h2>
        
        <div className="relative">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="w-full max-w-lg glass p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors z-10"
              >
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
              
              {i !== steps.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.3 }}
                  className="w-px bg-gradient-to-b from-primary/50 to-transparent flex items-center justify-center py-6"
                >
                  <ArrowDown className="w-4 h-4 text-primary absolute animate-bounce" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
