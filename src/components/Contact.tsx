"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Send, Calendar as CalendarIcon, Clock, CheckCircle2, PhoneCall } from "lucide-react";
import { useState, useEffect } from "react";

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

// Generate next 5 business days starting today
const getUpcomingDays = () => {
  const days = [];
  const current = new Date();
  
  while (days.length < 5) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sunday (0) and Saturday (6)
      days.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
};

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calendar Booking state
  const [upcomingDays, setUpcomingDays] = useState<Date[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    setUpcomingDays(getUpcomingDays());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name]) {
      setFormErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFormSubmitted(false);
    }, 4000);
  };

  const handleConfirmBooking = () => {
    if (selectedDayIndex === null || !selectedTimeSlot) return;
    setBookingConfirmed(true);
  };

  const formattedSelectedDate = selectedDayIndex !== null 
    ? upcomingDays[selectedDayIndex].toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })
    : "";

  return (
    <section id="contact" className="py-24 relative bg-black">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Contact</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">Connect</span>
          </h3>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
            Schedule an interview slot instantly or send a direct validation message.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calendar Scheduling Widget */}
          <div className="lg:col-span-6 glass p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col text-left">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h4 className="text-base font-bold text-white">Schedule Interview Slot</h4>
            </div>

            <AnimatePresence mode="wait">
              {!bookingConfirmed ? (
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Pick a convenient date and time slot below to schedule a brief meeting. Invite details will be logged.
                  </p>

                  {/* Date Grid Selector */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Select Date</span>
                    <div className="grid grid-cols-5 gap-2">
                      {upcomingDays.map((day, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDayIndex(idx);
                            setSelectedTimeSlot(null);
                          }}
                          className={`p-2.5 rounded-lg border transition-all flex flex-col items-center justify-center cursor-pointer ${
                            selectedDayIndex === idx 
                              ? "bg-primary text-black border-primary font-bold shadow-[0_0_10px_rgba(255,215,0,0.1)]" 
                              : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700"
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono tracking-tighter">
                            {day.toLocaleDateString("en-US", { weekday: 'short' })}
                          </span>
                          <span className="text-base font-extrabold mt-1">
                            {day.getDate()}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selector */}
                  {selectedDayIndex !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Available Times
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                              selectedTimeSlot === slot 
                                ? "bg-primary text-black border-primary" 
                                : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Confirm CTA */}
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    disabled={selectedDayIndex === null || !selectedTimeSlot}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      selectedDayIndex !== null && selectedTimeSlot
                        ? "bg-primary text-black hover:bg-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                        : "bg-zinc-900 text-zinc-600 border border-white/5 cursor-not-allowed"
                    }`}
                  >
                    Confirm Interview Time
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-lg font-bold text-white">Interview Scheduled!</h5>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                      Your meeting is locked in for <span className="text-primary font-bold">{formattedSelectedDate}</span> at <span className="text-primary font-bold">{selectedTimeSlot}</span>. Calendar invitation logs have been sent.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setBookingConfirmed(false);
                      setSelectedDayIndex(null);
                      setSelectedTimeSlot(null);
                    }}
                    className="px-6 py-2 border border-white/10 hover:border-primary/50 text-white hover:text-primary rounded-lg text-xs font-semibold transition-colors"
                  >
                    Schedule Another Slot
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Quick Contacts details */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
              <a 
                href="https://wa.me/918982005428" 
                target="_blank" 
                className="flex items-center gap-3 group text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-all">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="truncate">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">WhatsApp</span>
                  <span className="text-[11px] font-mono text-zinc-300 group-hover:text-primary transition-colors">+91 8982005428</span>
                </div>
              </a>
              
              <a 
                href="mailto:hello@example.com" 
                className="flex items-center gap-3 group text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="truncate">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block">Email Link</span>
                  <span className="text-[11px] font-mono text-zinc-300 group-hover:text-primary transition-colors">hello@example.com</span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-6 glass p-6 md:p-8 rounded-2xl border border-white/5 text-left h-full flex flex-col justify-between">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
              <PhoneCall className="w-5 h-5 text-primary" />
              <h4 className="text-base font-bold text-white">Direct Message</h4>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Submission success notification */}
              <AnimatePresence>
                {formSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Message sent successfully! I will respond within 24 hours.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Full Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full bg-zinc-950 border rounded-xl px-4 py-3 text-xs text-white outline-none focus:ring-1 focus:ring-primary transition-all ${
                    formErrors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-primary"
                  }`}
                />
                {formErrors.name && <span className="text-[9px] text-red-400 block">{formErrors.name}</span>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    className={`w-full bg-zinc-950 border rounded-xl px-4 py-3 text-xs text-white outline-none focus:ring-1 focus:ring-primary transition-all ${
                      formErrors.email ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-primary"
                    }`}
                  />
                  {formErrors.email && <span className="text-[9px] text-red-400 block">{formErrors.email}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Phone Number (Optional)</label>
                  <input 
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Message Details</label>
                <textarea 
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your test architecture challenges..."
                  className={`w-full bg-zinc-950 border rounded-xl px-4 py-3 text-xs text-white outline-none focus:ring-1 focus:ring-primary transition-all resize-none ${
                    formErrors.message ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-primary"
                  }`}
                ></textarea>
                {formErrors.message && <span className="text-[9px] text-red-400 block">{formErrors.message}</span>}
              </div>

              <button 
                type="submit"
                disabled={formSubmitted}
                className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  formSubmitted 
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                    : "bg-primary text-black hover:bg-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                }`}
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
