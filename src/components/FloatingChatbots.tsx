"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, MessageSquare, X, Send } from "lucide-react";
import { useState } from "react";

export default function FloatingChatbots() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const whatsappUrl = `https://wa.me/918982005428?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setMessage("");
    setIsAIChatOpen(false);
  };

  return (
    <>
      {/* Left Floating: Voice AI */}
      <motion.a
        href="https://wa.me/918982005428?text=Hello,%20I%20would%20like%20to%20connect%20via%20voice."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-slate-900 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
        title="Voice AI (WhatsApp)"
      >
        <Mic className="w-6 h-6" />
      </motion.a>

      {/* Right Floating: AI Assistant (WhatsApp Integration) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isAIChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mb-4 w-80 glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary via-secondary to-accent p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white font-bold text-sm">AI Assistant</span>
                </div>
                <button 
                  onClick={() => setIsAIChatOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="p-4 h-48 bg-slate-950/80 flex flex-col gap-3 overflow-y-auto">
                <div className="bg-slate-900 border border-white/5 text-slate-200 text-xs p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%]">
                  Hi! I'm the AI Assistant. How can I help you today? Send a message and we'll connect on WhatsApp!
                </div>
              </div>

              {/* Input */}
              <div className="p-3 bg-slate-900/90 border-t border-white/10">
                <form onSubmit={handleWhatsAppSend} className="relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 pl-3 pr-10 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-secondary transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsAIChatOpen(!isAIChatOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-shadow"
          title="AI Assistant"
        >
          {isAIChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>
    </>
  );
}
