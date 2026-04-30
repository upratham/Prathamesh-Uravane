"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiAward, FiBook } from "react-icons/fi";

const education = [
  {
    degree: "Master of Science in Applied Machine Learning",
    school: "University of Maryland, College Park",
    period: "Sep 2025 – May 2027",
    gpa: "4.0 / 4.0",
    location: "College Park, Maryland",
    highlights: [
      "Perfect GPA in first graduate semester",
      "Focus areas: deep learning, NLP, computer vision, MLOps",
    ],
    color: "#00d4ff",
    icon: "🎓",
  },
  {
    degree: "India Connect Research Fellowship",
    school: "Nanyang Technological University Singapore",
    period: "Jan 2024 – Mar 2024",
    location: "Singapore",
    highlights: [
      "Competitive national fellowship for research exchange",
      "Research: Gen AI for Autonomous Vehicles, GAN-based road scenario synthesis",
    ],
    color: "#7c3aed",
    icon: "🔬",
  },
  {
    degree: "B.Tech in Artificial Intelligence & Data Science",
    school: "Vishwakarma University",
    period: "Sep 2020 – Jan 2024",
    gpa: "3.75 / 4.0",
    location: "Pune, India",
    highlights: [
      "AI/ML Core Team Member — Google Developer Student Club",
      "Multiple IEEE/Elsevier research publications during undergrad",
    ],
    color: "#06b6d4",
    icon: "🤖",
  },
];

const certifications = [
  "Business Intelligence for Consultants",
  "Power BI Essential Training",
  "Power BI: Dashboards for Beginners",
  "Getting Started with Power BI",
  "Power BI Top Skills",
];

const publications = [
  {
    title: "CNN-Based Brain Tumor Classification from MRI Images",
    venue: "IEEE / Elsevier",
    note: "96% accuracy on benchmark dataset",
  },
  {
    title: "ANN-Based Dyslexia Detection with Gamified Data Collection",
    venue: "IEEE / Elsevier",
    note: "Health Informatics / EdTech AI",
  },
  {
    title: "Student Dropout Prediction using Pre-trained ML Models",
    venue: "IEEE",
    note: "Predictive Analytics for Education",
  },
  {
    title: "GAN-Based Synthetic Road Scenario Generation for AV Perception",
    venue: "Research Paper",
    note: "NTU Singapore — Autonomous Vehicles",
  },
  {
    title: "Real-time Student Attentiveness Monitoring via Computer Vision",
    venue: "IEEE / Elsevier",
    note: "CV + Landmark Tracking",
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Academic Foundation</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span style={{ color: "var(--foreground)" }}>Education &</span>{" "}
            <span className="gradient-text">Research</span>
          </h2>
        </motion.div>

        {/* Education cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {education.map((ed, i) => (
            <motion.div
              key={ed.school}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
              className="glass-card rounded-xl p-6 flex flex-col"
              style={{ borderColor: `${ed.color}20` }}
            >
              <div className="text-3xl mb-4">{ed.icon}</div>
              <div
                className="text-xs font-mono mb-2 px-2 py-1 rounded self-start"
                style={{
                  background: `${ed.color}15`,
                  color: ed.color,
                  border: `1px solid ${ed.color}30`,
                }}
              >
                {ed.period}
              </div>
              <h3 className="font-bold text-sm mb-1 leading-snug" style={{ color: "var(--foreground)" }}>
                {ed.degree}
              </h3>
              <p className="text-xs mb-1" style={{ color: ed.color }}>
                {ed.school}
              </p>
              <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                {ed.location}
              </p>
              {ed.gpa && (
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>GPA:</span>
                  <span className="font-bold text-sm" style={{ color: ed.color }}>
                    {ed.gpa}
                  </span>
                </div>
              )}
              <ul className="space-y-1.5 mt-auto">
                {ed.highlights.map((h) => (
                  <li key={h} className="flex gap-2 items-start text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: ed.color }} />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Publications + Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <FiBook style={{ color: "var(--accent-blue)" }} size={16} />
              <p className="section-label">Publications (5 Papers)</p>
            </div>
            <div className="space-y-3">
              {publications.map((pub, i) => (
                <div
                  key={i}
                  className="glass-card rounded-lg p-4"
                >
                  <h4 className="text-sm font-medium mb-1 leading-snug" style={{ color: "var(--foreground)" }}>
                    {pub.title}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{
                        background: "rgba(0,212,255,0.08)",
                        color: "var(--accent-blue)",
                        border: "1px solid rgba(0,212,255,0.2)",
                      }}
                    >
                      {pub.venue}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {pub.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <FiAward style={{ color: "#7c3aed" }} size={16} />
              <p className="section-label">Certifications</p>
            </div>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="glass-card rounded-lg p-4 flex items-center gap-3"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#7c3aed", boxShadow: "0 0 6px #7c3aed80" }}
                  />
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {cert}
                  </span>
                </div>
              ))}
              <div className="glass-card rounded-lg p-4 flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: "#7c3aed", boxShadow: "0 0 6px #7c3aed80" }}
                />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Google Developer Student Clubs — Core Team
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
