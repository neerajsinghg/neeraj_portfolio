"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, MessageSquare, X, Send, Volume2, VolumeX, MicOff, RefreshCw } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const QUICK_CHIPS = [
  "Who is Neeraj?",
  "Explain his framework",
  "What projects has he built?",
  "Book Interview",
  "Download Resume"
];

export default function FloatingChatbots() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "Hello! I am Neeraj's AI Assistant. You can speak to me by clicking the Mic icon, or select a query chip below!" }
  ]);
  
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Check Speech Synthesis and Recognition support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";
        
        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onerror = () => setIsListening(false);
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleUserQuery(transcript);
          }
        };
        recognitionRef.current = rec;
        setSpeechSupported(true);
      }
    }
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    
    // Cancel any active speech
    window.speechSynthesis.cancel();
    
    const cleanText = text.replace(/[#*`]/g, ""); // Strip markdown tags before speaking
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    
    // Attempt to pick a premium English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.includes("en-US") && v.name.includes("Google")) || 
                         voices.find(v => v.lang.includes("en-US") || v.lang.includes("en-GB"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handleUserQuery = (query: string) => {
    if (!query.trim()) return;
    
    const userMsg: Message = { sender: "user", text: query };
    setMessages(prev => [...prev, userMsg]);
    
    const norm = query.toLowerCase();
    let reply = "";
    
    if (norm.includes("who is") || norm.includes("about") || norm.includes("background")) {
      reply = "Neeraj Singh is a Senior Software Test Automation Engineer and SDET with over 10.5 years of experience. He specializes in Python, Java, Playwright, and Selenium, designing robust frameworks for Logistics and Supply Chain systems.";
    } else if (norm.includes("framework") || norm.includes("explain") || norm.includes("architecture")) {
      reply = "Neeraj architectures scalable Page Object Model (POM) and hybrid frameworks. They feature custom decorators to eliminate stale element flakiness, automated failure captures, and parallel worker threads inside dockerized GitLab pipelines.";
    } else if (norm.includes("project") || norm.includes("build") || norm.includes("what has he done")) {
      reply = "He has designed 5 primary frameworks: 1) Python Selenium POM Framework, 2) Playwright Parallel Framework, 3) Java Selenium TestNG Hybrid, 4) Rest Assured API Test Suite, and 5) GitLab CI/CD Pipeline integration.";
    } else if (norm.includes("resume") || norm.includes("cv") || norm.includes("download")) {
      reply = "You can download Neeraj's detailed resume by clicking the 'Download Resume' button in the Hero section or the button below. Let me trigger the download for you!";
      if (typeof window !== "undefined") {
        window.open("/Neeraj_Singh_Resume.pdf", "_blank");
      }
    } else if (norm.includes("github") || norm.includes("repo")) {
      reply = "You can explore Neeraj's repositories and code patterns on GitHub. I will open his GitHub in a new tab!";
      if (typeof window !== "undefined") {
        window.open("https://github.com", "_blank");
      }
    } else if (norm.includes("linkedin") || norm.includes("connect")) {
      reply = "Connect with Neeraj on LinkedIn to discuss professional opportunities. Spawning his profile tab now!";
      if (typeof window !== "undefined") {
        window.open("https://linkedin.com", "_blank");
      }
    } else if (norm.includes("book") || norm.includes("interview") || norm.includes("schedule") || norm.includes("calendar")) {
      reply = "You can schedule a interview slot immediately using the live calendar booking widget in the Contact section. Let me scroll you down to the scheduler!";
      scrollToSection("#contact");
    } else if (norm.includes("contact") || norm.includes("phone") || norm.includes("email") || norm.includes("reach out")) {
      reply = "You can contact Neeraj by emailing hello@example.com or via WhatsApp at +91 8982005428. I am scrolling you to the Contact Form now!";
      scrollToSection("#contact");
    } else {
      reply = "I'm sorry, I didn't quite catch that. Try asking: 'Who is Neeraj?', 'Explain his framework', 'Show projects', or 'Book Interview'!";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "ai", text: reply }]);
      speakText(reply);
    }, 600);
  };

  const scrollToSection = (id: string) => {
    if (typeof document !== "undefined") {
      const el = document.querySelector(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 800);
      }
    }
  };

  const startVoiceInput = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Cancel any active TTS speech
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      recognitionRef.current.start();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    const query = messageText;
    setMessageText("");
    handleUserQuery(query);
  };

  return (
    <>
      {/* Floating AI chatbot toggle button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="mb-4 w-[340px] md:w-[380px] h-[500px] glass rounded-2xl overflow-hidden border border-primary/20 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="bg-zinc-950 px-4 py-3 border-b border-white/5 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-white font-bold tracking-wider font-mono">QA.Assistant_v1.0</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Voice Toggle */}
                  <button 
                    onClick={() => {
                      setIsVoiceEnabled(!isVoiceEnabled);
                      if (isVoiceEnabled && typeof window !== "undefined" && window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white"
                    title={isVoiceEnabled ? "Mute Assistant" : "Unmute Assistant"}
                  >
                    {isVoiceEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  
                  {/* Close */}
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      if (typeof window !== "undefined" && window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 p-4 overflow-y-auto bg-zinc-950/40 space-y-3 scrollbar-none text-xs leading-relaxed">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`max-w-[85%] p-3 rounded-2xl text-left ${
                      msg.sender === "user" 
                        ? "bg-primary text-black font-semibold rounded-tr-none self-end ml-auto text-right" 
                        : "bg-zinc-900 border border-white/5 text-zinc-300 rounded-tl-none self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick action chips */}
              <div className="px-4 py-2 border-t border-white/5 bg-zinc-950/20 flex gap-1.5 overflow-x-auto scrollbar-none select-none">
                {QUICK_CHIPS.map(chip => (
                  <button
                    key={chip}
                    onClick={() => handleUserQuery(chip)}
                    className="text-[9px] font-semibold tracking-wider text-zinc-400 hover:text-primary hover:border-primary/30 border border-white/5 rounded-full px-2.5 py-1 bg-zinc-950/50 shrink-0 transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Form Input */}
              <div className="p-3 bg-zinc-950 border-t border-white/5">
                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Ask about frameworks, resume..."}
                    disabled={isListening}
                    className="flex-1 bg-zinc-900 border border-white/5 rounded-xl py-3 pl-4 pr-10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  
                  {/* Voice input button inside query line */}
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={startVoiceInput}
                      className={`absolute right-12 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isListening 
                          ? "bg-red-500/10 text-red-500 hover:text-red-400" 
                          : "text-zinc-500 hover:text-primary"
                      }`}
                      title="Speak your query"
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  )}

                  <button 
                    type="submit"
                    className="p-3 bg-primary text-black rounded-xl hover:bg-yellow-400 transition-colors"
                    title="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.35)] hover:shadow-[0_0_25px_rgba(255,215,0,0.55)] transition-shadow cursor-pointer border border-primary/20"
          title="Open AI Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>
    </>
  );
}
