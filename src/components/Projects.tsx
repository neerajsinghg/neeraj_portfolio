"use client";

import { motion } from "framer-motion";
import { ExternalLink, LayoutTemplate } from "lucide-react";
import { GithubIcon as Github } from "./Icons";
import Link from "next/link";

const projects = [
  {
    title: "Enterprise Full-Stack Application",
    description: "A highly scalable web application built with React, Node.js, and PostgreSQL, featuring real-time data processing.",
    features: ["Microservices Architecture", "Real-time WebSockets", "JWT Authentication", "Automated CI/CD Deployment"],
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    link: "#"
  },
  {
    title: "Enterprise Automation Framework",
    description: "A robust and scalable Java Selenium TestNG automation framework following Page Object Model architecture.",
    features: ["Page Object Model", "Data Driven Testing", "Screenshot on Failure", "Cross Browser Testing"],
    tags: ["Java", "Selenium", "TestNG", "Maven"],
    link: "https://github.com/yourname/selenium-testng-framework"
  },
  {
    title: "API & Mobile Automation Suite",
    description: "Comprehensive test automation suite handling REST API validation and cross-platform mobile testing.",
    features: ["JSON Validation", "Authentication Handling", "Appium Gestures", "Deep linking"],
    tags: ["Rest Assured", "Appium", "TestNG", "Jackson"],
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-primary">Projects</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Showcasing enterprise software architecture and highly scalable test automation frameworks.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-3xl overflow-hidden border border-white/10 flex flex-col group"
            >
              <div className="h-40 bg-white/5 border-b border-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-primary/5 transition-colors">
                <LayoutTemplate className="w-16 h-16 text-white/20 group-hover:text-primary/40 transition-colors group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm flex-1">{project.description}</p>
                
                <div className="mb-6 space-y-2">
                  {project.features.map(feature => (
                    <div key={feature} className="text-xs text-foreground/80 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" /> {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-muted-foreground border border-white/5">{tag}</span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <Link href={project.link} className="flex-1 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                    <Github className="w-4 h-4" /> Repository
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
