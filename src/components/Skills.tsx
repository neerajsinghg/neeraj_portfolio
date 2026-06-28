"use client";

import { motion } from "framer-motion";
import { Terminal, Database, ShieldCheck, Cog, Code2 } from "lucide-react";

const skillCategories = [
  {
    title: "Software Development",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    skills: ["React, Next.js, Vue", "Node.js, Spring Boot, Java", "Microservices Architecture", "PostgreSQL, MongoDB"]
  },
  {
    title: "UI & Mobile Automation",
    icon: <Terminal className="w-6 h-6 text-primary" />,
    skills: ["Selenium WebDriver", "Appium (Android & iOS)", "Page Object Model", "Playwright, Cypress"]
  },
  {
    title: "API & Backend Testing",
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    skills: ["Rest Assured", "Postman", "JSON Validation", "Authentication Handling"]
  },
  {
    title: "CI/CD & DevOps",
    icon: <Database className="w-6 h-6 text-primary" />,
    skills: ["Jenkins CI/CD", "Docker & Kubernetes", "Git Actions", "AWS / GCP"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core <span className="text-primary">Competencies</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A comprehensive toolkit spanning full-stack development and enterprise quality engineering.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map(skill => (
                  <li key={skill} className="text-muted-foreground text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
