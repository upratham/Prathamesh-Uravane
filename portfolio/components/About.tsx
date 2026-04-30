"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiMapPin, FiBook, FiZap, FiGlobe } from "react-icons/fi";

const orbs = [
  { size: 320, x: "85%", y: "10%", color: "rgba(0,212,255,0.05)", delay: 0 },
  { size: 240, x: "5%", y: "70%", color: "rgba(124,58,237,0.06)", delay: 2 },
];

const highlights = [
  {
    icon: <FiZap size={18} />,
    title: "Production-First",
    desc: "I ship systems that run in production — not notebooks. FastAPI backends, Docker containers, AWS deployments.",
  },
  {
    icon: <FiGlobe size={18} />,
    title: "Global Experience",
    desc: "Worked across India, Singapore (NTU), and Peru (UMA). Cross-cultural collaboration is second nature.",
  },
  {
    icon: <FiBook size={18} />,
    title: "Published Researcher",
    desc: "5 peer-reviewed papers in IEEE/Elsevier spanning healthcare AI, computer vision, and predictive analytics.",
  },
  {
    icon: <FiMapPin size={18} />,
    title: "Based in DC/Maryland",
    desc: "MS student at University of Maryland, College Park. Actively seeking Summer 2026 internships.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 relative overflow-hidden" ref={ref}>
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

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--foreground)" }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              <p>
                I&apos;m an AI engineer who translates complex requirements into clean, measurable
                systems. My work sits at the intersection of machine learning engineering,
                computer vision, and health informatics — building pipelines that go all the way
                from raw data to production APIs.
              </p>
              <p>
                What sets me apart is the full-stack perspective: I can design a model architecture,
                wire it into a FastAPI backend, containerize it with Docker, deploy it to AWS, and
                ship a polished Next.js dashboard on top — independently, from brief to delivery.
              </p>
              <p>
                My research roots keep me honest about what matters: rigorous evaluation, clear
                metrics, and solutions that hold up under real-world conditions. Whether it&apos;s
                a RAG agent evaluated on 150 business test cases or a CNN achieving 96% on MRI
                classification, I measure everything.
              </p>
              <p>
                Outside of work, I officiate 11v11 soccer — which has made me very good at
                making quick, accurate decisions under pressure. Turns out that skill translates
                well to ML engineering too.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Python", "TensorFlow", "LangChain", "FastAPI", "OpenCV", "Next.js", "Docker", "AWS"].map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-full font-mono"
                  style={{
                    background: "rgba(0,212,255,0.07)",
                    color: "var(--accent-blue)",
                    border: "1px solid rgba(0,212,255,0.15)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                className="relative group"
              >
                {/* Floating glow background */}
                <motion.div
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3.5 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-[rgba(0,212,255,0.12)] via-[rgba(124,58,237,0.08)] to-transparent opacity-40 -z-10 blur-sm"
                />
                <div
                  className="glass-card rounded-xl p-5 relative h-full border border-[rgba(0,212,255,0.1)] group-hover:border-[rgba(0,212,255,0.3)] transition-all"
                >
                  {/* Icon with glow */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 8px rgba(0,212,255,0.3)",
                        "0 0 20px rgba(0,212,255,0.6)",
                        "0 0 8px rgba(0,212,255,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2.8 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mb-3 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(0,212,255,0.1)",
                      color: "var(--accent-blue)",
                      border: "1px solid rgba(0,212,255,0.2)",
                    }}
                  >
                    {h.icon}
                  </motion.div>
                  <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--foreground)" }}>
                    {h.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {h.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
