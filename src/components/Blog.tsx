"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    title: "How I designed a Selenium TestNG Framework",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    desc: "A deep dive into setting up an enterprise-grade automation framework from scratch."
  },
  {
    title: "Page Object Model Best Practices",
    date: "Nov 05, 2023",
    readTime: "4 min read",
    desc: "Avoid flaky tests and duplication by structuring your POM correctly."
  },
  {
    title: "Handling Dynamic Web Elements in Selenium",
    date: "Jan 18, 2024",
    readTime: "6 min read",
    desc: "Advanced locator strategies and explicit waits to handle complex UIs."
  },
  {
    title: "API Automation using Rest Assured",
    date: "Mar 02, 2024",
    readTime: "7 min read",
    desc: "Integrating API tests seamlessly into your UI automation pipeline."
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical <span className="text-primary">Articles</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Sharing insights, best practices, and automation strategies.</p>
          </div>
          <Link href="#" className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors flex flex-col group cursor-pointer"
            >
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {article.readTime}</span>
              </div>
              
              <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{article.desc}</p>
              
              <div className="mt-auto flex items-center gap-2 text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors">
                Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
