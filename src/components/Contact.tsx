"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's <span className="text-primary">Connect</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Have a project in mind or want to discuss enterprise automation? I'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 bg-black/20 glass p-8 md:p-12 rounded-3xl border border-white/10">
          
          {/* Contact Info */}
          <div className="md:col-span-2 flex flex-col justify-center space-y-8">
            <h3 className="text-2xl font-bold mb-2">Reach Out</h3>
            
            <a 
              href="https://wa.me/918982005428" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                <p className="font-medium group-hover:text-primary transition-colors">+91 8982005428</p>
              </div>
            </a>

            <a 
              href="mailto:hello@example.com" 
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium group-hover:text-primary transition-colors">hello@example.com</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <form className="md:col-span-3 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">First Name</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Email</label>
              <input 
                type="email" 
                placeholder="john@company.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Message</label>
              <textarea 
                rows={4}
                placeholder="How can I help you?" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
              ></textarea>
            </div>

            <button className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium transition-colors">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
