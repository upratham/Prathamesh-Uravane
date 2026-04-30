"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Intramural Sports Official",
    org: "University of Maryland",
    location: "College Park, MD",
    period: "Mar 2026 – Present",
    current: true,
    tags: [],
    bullets: [
      "Officiate 11v11 intramural soccer matches, enforcing rules and maintaining match control in high-pressure environments.",
    ],
    color: "#06b6d4",
  },
  {
    role: "AI Engineer",
    org: "UMA – Universidad María Auxiliadora",
    location: "Lima, Peru",
    period: "Apr 2024 – Jun 2025",
    current: false,
    tags: ["Python", "OpenCV", "NLP", "FastAPI", "React"],
    bullets: [
      "Designed and deployed an AI-powered virtual lab simulator with an NLP feedback pipeline, increasing student engagement by 34%.",
      "Built a real-time student attentiveness monitoring agent using computer vision (face detection, facial landmarks), reducing manual review time by ~70%.",
      "Collaborated with cross-functional educators and developers; documented AI solutions for ongoing client support.",
    ],
    color: "#00d4ff",
  },
  {
    role: "Student Researcher Intern",
    org: "Energy Research Institute @ NTU",
    location: "Singapore",
    period: "Jan 2024 – Mar 2024",
    current: false,
    tags: ["GANs", "PyTorch", "Computer Vision"],
    bullets: [
      "Implemented a GAN-based model to synthesize realistic road scenarios from pedestrian data, automating training-data generation for autonomous vehicle perception systems.",
      "India Connect Research Fellowship — competitive national program for research exchange.",
    ],
    color: "#7c3aed",
  },
  {
    role: "AI Engineer Intern",
    org: "Yodda Elder Care Technologies",
    location: "Pune, India",
    period: "Jul 2023 – Dec 2023",
    current: false,
    tags: ["OpenCV", "Pose Estimation", "Python", "FastAPI"],
    bullets: [
      "Developed an OpenCV-based fall-detection agent with 95% accuracy using pose estimation and classification models.",
      "Integrated automated alarm triggering and snapshot delivery in milliseconds, eliminating manual monitoring for elderly care facilities.",
      "Delivered fully documented Python backend with integration guides enabling independent client extension.",
    ],
    color: "#00d4ff",
  },
  {
    role: "Student Researcher",
    org: "VU Research Centre — Health Informatics",
    location: "Pune, India",
    period: "Jun 2022 – Aug 2022",
    current: false,
    tags: ["CNN", "TensorFlow", "Medical Imaging"],
    bullets: [
      "Trained and evaluated a CNN model for brain tumor classification from MRI images, achieving 96% accuracy.",
      "Produced model pipeline documentation and performance metrics for the research team.",
    ],
    color: "#7c3aed",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-28 relative grid-bg" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Career Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span style={{ color: "var(--foreground)" }}>Where I&apos;ve</span>{" "}
            <span className="gradient-text">Worked</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: "linear-gradient(to bottom, var(--accent-blue), rgba(124,58,237,0.4), transparent)",
            }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.org}-${exp.role}`}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
                className="md:pl-16 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2 top-5 hidden md:flex items-center justify-center"
                  style={{ width: "24px", height: "24px" }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: exp.color,
                      boxShadow: `0 0 12px ${exp.color}80`,
                    }}
                  />
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base" style={{ color: "var(--foreground)" }}>
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{
                              background: "rgba(0,212,255,0.15)",
                              color: "var(--accent-blue)",
                              border: "1px solid rgba(0,212,255,0.3)",
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: exp.color }}>
                        {exp.org}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {exp.location}
                      </p>
                    </div>
                    <span
                      className="text-xs font-mono whitespace-nowrap px-3 py-1 rounded"
                      style={{
                        background: "rgba(0,212,255,0.06)",
                        color: "var(--text-muted)",
                        border: "1px solid rgba(0,212,255,0.1)",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        <span
                          className="mt-2 shrink-0 w-1 h-1 rounded-full"
                          style={{ background: exp.color }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded font-mono"
                          style={{
                            background: "rgba(124,58,237,0.08)",
                            color: "#a78bfa",
                            border: "1px solid rgba(124,58,237,0.2)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
