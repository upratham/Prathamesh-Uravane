"use client";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";

import EmailAction from "@/components/EmailAction";

const stats = [
  { value: "4.0", label: "GPA at UMD", suffix: "" },
  { value: "5", label: "IEEE/Elsevier Papers", suffix: "+" },
  { value: "34", label: "Engagement Boost", suffix: "%" },
  { value: "3", label: "Countries Worked", suffix: "" },
];

const orbs = [
  { size: 400, x: "70%", y: "20%", color: "rgba(0,212,255,0.06)", delay: 0 },
  { size: 300, x: "10%", y: "60%", color: "rgba(124,58,237,0.07)", delay: 2 },
  { size: 200, x: "80%", y: "75%", color: "rgba(0,212,255,0.04)", delay: 4 },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Ambient orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none float-anim"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)",
          top: "30%",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
            >
              AI Engineer · ML Researcher · Builder
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-none mb-4"
            >
              <span className="block" style={{ color: "var(--foreground)" }}>Prathamesh</span>
              <span className="block gradient-text">Uravane</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              MS in Applied ML at{" "}
              <span style={{ color: "var(--foreground)" }}>University of Maryland</span>{" "}
              (GPA 4.0). I build production-ready AI systems — from data pipelines and
              LLM agents to computer vision and clinical AI — that ship to real users and
              create measurable impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="#contact"
                className="px-6 py-3 rounded text-sm font-semibold transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                }}
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 rounded text-sm font-semibold border transition-all duration-200 hover:bg-[rgba(0,212,255,0.08)]"
                style={{
                  borderColor: "rgba(0,212,255,0.3)",
                  color: "var(--foreground)",
                }}
              >
                View Projects
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-5"
            >
              {[
                { icon: <FiLinkedin size={20} />, href: "https://linkedin.com/in/upratham", label: "LinkedIn" },
                { icon: <FiGithub size={20} />, href: "https://github.com/upratham", label: "GitHub" },
                { icon: <SiGooglescholar size={18} />, href: "https://scholar.google.com", label: "Scholar" },
                { icon: <FiMail size={20} />, href: "email", label: "Email" },
              ].map((s) => (
                s.href === "email" ? (
                  <EmailAction
                    key={s.label}
                    email="upratham2002@gmail.com"
                    aria-label={s.label}
                    className="transition-all duration-200 hover:scale-110"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--accent-blue)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                    }
                    title="Compose email"
                  >
                    {s.icon}
                  </EmailAction>
                ) : (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="transition-all duration-200 hover:scale-110"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--accent-blue)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                    }
                  >
                    {s.icon}
                  </a>
                )
              ))}

              <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>
                · Open to Summer 2026 Internships
              </span>
            </motion.div>
          </div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <div
                  className="text-4xl font-bold mb-1"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {s.value}
                  <span className="text-2xl">{s.suffix}</span>
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="col-span-2 glass-card rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="glow-dot timeline-dot" />
                <span className="text-xs font-mono" style={{ color: "var(--accent-blue)" }}>
                  CURRENTLY BUILDING
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                AI agents · RAG pipelines · Production ML systems for real-world clients
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {["LangChain", "FastAPI", "Next.js", "OpenCV"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      background: "rgba(0,212,255,0.08)",
                      color: "var(--accent-blue)",
                      border: "1px solid rgba(0,212,255,0.2)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-16"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>scroll</span>
            <div
              className="w-px h-12"
              style={{
                background: "linear-gradient(to bottom, var(--accent-blue), transparent)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
