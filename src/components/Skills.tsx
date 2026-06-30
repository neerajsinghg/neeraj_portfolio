"use client";

import { motion } from "framer-motion";
import { Code, Terminal, Layers, Database, ShieldAlert, Cpu, Settings } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: <Code className="w-5 h-5 text-primary" />,
    skills: ["Python", "Java", "JavaScript", "TypeScript", "HTML5 & CSS3"]
  },
  {
    title: "QA & Automation",
    icon: <Terminal className="w-5 h-5 text-primary" />,
    skills: ["Playwright", "Selenium WebDriver", "Pytest", "TestNG", "Page Object Model (POM)", "Hybrid & Data-Driven Testing"]
  },
  {
    title: "Web Development",
    icon: <Layers className="w-5 h-5 text-primary" />,
    skills: ["React", "Next.js (App Router)", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap"]
  },
  {
    title: "API & Databases",
    icon: <Database className="w-5 h-5 text-primary" />,
    skills: ["REST Assured", "Postman", "REST APIs", "SQL & MySQL", "Database Validation"]
  },
  {
    title: "DevOps & CI/CD",
    icon: <Cpu className="w-5 h-5 text-primary" />,
    skills: ["Git & GitHub", "GitLab CI/CD", "Jenkins", "Docker", "Vercel Deployments", "Cloud Testing Grids"]
  },
  {
    title: "AI & Modern Tech",
    icon: <ShieldAlert className="w-5 h-5 text-primary" />,
    skills: ["AI Chat Integration", "Voice AI (Speech API)", "Progressive Web Apps (PWA)", "Framer Motion & GSAP", "Performance Tuning"]
  },
  {
    title: "Tools & OS",
    icon: <Settings className="w-5 h-5 text-primary" />,
    skills: ["VS Code & PyCharm", "JIRA", "BrowserStack", "Linux & Windows"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Skills</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Comprehensive <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">QA Stack</span>
          </h3>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
            A specialized toolset tailored for automating enterprise web systems, API verification, and CI/CD operations.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
                  {category.icon}
                </div>
                
                <h4 className="text-base font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {category.title}
                </h4>
                
                <ul className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-zinc-400 text-xs flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
