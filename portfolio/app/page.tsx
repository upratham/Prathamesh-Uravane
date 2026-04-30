import About from "@/components/About";
import DigitalTwinChatClient from "@/components/DigitalTwinChatClient";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import EmailAction from "@/components/EmailAction";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ChatbotWidget from "@/components/ChatbotWidget";
import { FiArrowUpRight, FiMail } from "react-icons/fi";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Nav />
      <ChatbotWidget />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <DigitalTwinChatClient />

        <section id="contact" className="relative py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative">
              <div className="absolute inset-0 opacity-40 pointer-events-none grid-bg" />
              <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <p className="section-label mb-3">Contact</p>
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    Let&apos;s build something that is useful,
                    <span className="gradient-text block">measurable, and shipped.</span>
                  </h2>
                  <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    I am open to internships, product engineering roles, and research collaborations
                    where AI needs to move from prototype to production.
                  </p>
                </div>

                <div className="flex flex-col gap-3 justify-self-start lg:justify-self-end w-full sm:w-auto">
                  <EmailAction
                    email="upratham2002@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                      color: "#fff",
                    }}
                  >
                    <FiMail size={16} />
                    upratham2002@gmail.com
                  </EmailAction>
                  <a
                    href="https://linkedin.com/in/upratham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold border transition-all duration-200"
                    style={{
                      borderColor: "rgba(0,212,255,0.3)",
                      color: "var(--foreground)",
                    }}
                  >
                    Connect on LinkedIn
                    <FiArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 text-sm" style={{ color: "var(--text-muted)" }}>
              <p>Prathamesh Uravane · AI Engineer · ML Researcher</p>
              <p>Built with Next.js, Framer Motion, and a portfolio-first layout.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
