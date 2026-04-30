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
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Left - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <span className="section-label inline-block mb-4 px-3 py-1 rounded-full" style={{ background: "rgba(0, 212, 255, 0.1)", color: "var(--accent-blue)" }}>
                ✨ AI Engineer · ML Researcher · Builder
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
              style={{ display: "none" }}
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
              className="flex items-center gap-4 flex-wrap"
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
                    className="social-link transition-all duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--accent-blue)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                    }
                    title={s.label}
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
                    className="social-link transition-all duration-200"
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

              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                · Open to Summer 2026 Internships
              </span>
            </motion.div>
          </div>

          {/* Right - Profile Image & Stats */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Profile Image with animated border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="w-full max-w-2xl"
            >
              <div className="profile-image mx-auto aspect-square max-w-2xl">
                <img
                  src="/profile.png"
                  alt="Prathamesh Uravane"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            {/* Quick Stats Cards - Compact Version */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 w-full"
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="stat-card glass-card rounded-lg p-4 text-center hover:scale-105"
                >
                  <div className="text-2xl font-bold" style={{ color: "var(--accent-blue)" }}>
                    {s.value}<span className="text-lg">{s.suffix}</span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Currently Building Section - Full Width Below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-2xl glass-card rounded-2xl p-6 border-l-4"
          style={{ borderColor: "var(--accent-blue)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="glow-dot timeline-dot" />
            <span className="text-xs font-mono font-bold" style={{ color: "var(--accent-blue)" }}>
              🚀 CURRENTLY BUILDING
            </span>
          </div>
          <p className="text-base mb-4" style={{ color: "var(--text-muted)" }}>
            AI agents · RAG pipelines · Production ML systems for real-world clients
          </p>
          <div className="flex gap-2 flex-wrap">
            {["LangChain", "FastAPI", "Next.js", "OpenCV"].map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-full font-mono transition-all hover:scale-110"
                style={{
                  background: "rgba(0,212,255,0.12)",
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
    </section>
  );
}
