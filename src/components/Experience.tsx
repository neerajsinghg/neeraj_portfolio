"use client";

import { motion } from "framer-motion";

const timeline = [
  { year: "2023 - Present", role: "Senior Software Developer & SDET", desc: "Architecting microservices and leading enterprise automation strategies." },
  { year: "2021 - 2023", role: "Software Developer in Test", desc: "Built scalable UI/API automation frameworks and integrated CI/CD pipelines." },
  { year: "2019 - 2021", role: "QA Automation Engineer", desc: "Developed test automation scripts and improved test coverage by 40%." }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Professional <span className="text-primary">Journey</span></h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {timeline.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black glass text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-white/10">
                <div className="flex flex-col mb-2">
                  <span className="text-primary text-sm font-bold">{item.year}</span>
                  <h3 className="text-xl font-bold">{item.role}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
