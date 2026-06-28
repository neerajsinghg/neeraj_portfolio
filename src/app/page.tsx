import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Architecture from "@/components/Architecture";
import Experience from "@/components/Experience";
import ReportsDocs from "@/components/ReportsDocs";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingChatbots from "@/components/FloatingChatbots";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
        <div className="w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Architecture />
          <ReportsDocs />
          <Experience />
          <Blog />
          <Contact />
        </div>
      </main>
      <Footer />
      <FloatingChatbots />
    </>
  );
}
