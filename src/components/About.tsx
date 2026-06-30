"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Code2, Cpu, BarChart3, Award } from "lucide-react";

const STATS = [
  { value: "10.5+", label: "Years Experience" },
  { value: "1000+", label: "Automated Tests" },
  { value: "98%", label: "Pipeline Success Rate" },
  { value: "20+", label: "Frameworks Architected" }
];

const EXPERTISE_CARDS = [
  {
    icon: <Truck className="w-6 h-6 text-primary" />,
    title: "Logistics & Supply Chain",
    description: "Deep domain knowledge in large-scale logistics applications including EMIST and ICONSIGNMENT, optimizing dispatch scheduling, tracking, and consignment validation pipelines."
  },
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: "Automation Architecture",
    description: "Architecting Hybrid, Data-Driven, and Page Object Model frameworks from scratch using Playwright, Selenium, and Pytest/TestNG, ensuring low maintenance overhead and high reuse."
  },
  {
    icon: <Code2 className="w-6 h-6 text-primary" />,
    title: "Full-Stack Web Engineering",
    description: "Designing and developing modern, responsive, and SEO-optimized frontend/backend solutions using React, Next.js, TypeScript, Express, Node.js, and RESTful APIs."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "API & Database Validation",
    description: "Comprehensive automated API testing using REST Assured and Postman, integrated with SQL compound indexing and database integrity verification."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative bg-black">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">About Me</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Pioneering Enterprise <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">Quality Systems</span>
          </h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            A software quality engineer and full-stack developer with over a decade of experience designing test automation ecosystems and high-performance web applications.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Bio Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass border border-white/5 p-8 md:p-10 rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Software Engineer & SDET Specialist
              </h4>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                I am a Software Engineer, SDET, and Full-Stack Web Developer with 10.5+ years of experience in software quality engineering, test automation, and modern web development. I specialize in Python, Java, Playwright, Selenium, Pytest, TestNG, REST API Automation, and CI/CD, building scalable automation frameworks for Logistics and Supply Chain platforms.
              </p>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Beyond test automation, I develop modern, responsive, and high-performance web applications using React, Next.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap, and Node.js. I am passionate about creating premium user experiences, integrating AI-powered features, and delivering secure, scalable, and SEO-friendly applications.
              </p>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                My expertise spans automation architecture, web application development, API integration, cloud-ready deployments, DevOps practices, and AI-assisted solutions, enabling organizations to build reliable software with exceptional user experiences.
              </p>
            </div>
            
            {/* Quick Milestones Checklist */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Custom Python POM Expert</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>GitLab CI/CD Orchestration</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>REST Assured API Testing</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Parallel Cross-Browser Testing</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            {/* Tech Illustration */}
            <div className="relative aspect-[1.5] w-full rounded-2xl border border-white/5 overflow-hidden shadow-2xl bg-zinc-950 mb-6 group hover:border-primary/25 transition-all duration-300">
              <img 
                src="/tech_illustration.png" 
                alt="QA & Full-Stack Automation Pipelines" 
                className="w-full h-full object-cover opacity-85 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div 
                  key={stat.label} 
                  className="glass border border-white/5 p-5 rounded-2xl flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-all duration-300"
                >
                  <span className="text-3xl md:text-4xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </span>
                  <span className="text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold mt-2.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERTISE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
                  {card.icon}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                  {card.title}
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
