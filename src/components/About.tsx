"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Full-Stack Development (React/Java)",
  "Enterprise Automation Frameworks",
  "Microservices Architecture",
  "CI/CD & DevOps Integration"
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bridging <span className="text-primary">Development & Testing</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I am a Senior Software Developer and SDET with extensive experience in architecting full-stack applications and building highly scalable test automation frameworks. I specialize in merging enterprise-level software engineering with strict quality pipelines to ensure flawless product delivery from code to production.
              </p>
            </div>
            
            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
