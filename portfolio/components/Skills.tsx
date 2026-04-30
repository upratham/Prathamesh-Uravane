"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "AI Agents & Automation",
    color: "#00d4ff",
    skills: [
      { name: "LangChain / LangGraph", level: 92 },
      { name: "OpenAI Agents SDK", level: 88 },
      { name: "RAG Pipelines", level: 90 },
      { name: "Workflow Orchestration", level: 85 },
    ],
  },
  {
    category: "Machine Learning",
    color: "#7c3aed",
    skills: [
      { name: "TensorFlow / Keras", level: 90 },
      { name: "PyTorch", level: 82 },
      { name: "scikit-learn", level: 94 },
      { name: "HuggingFace", level: 80 },
    ],
  },
  {
    category: "Computer Vision",
    color: "#06b6d4",
    skills: [
      { name: "OpenCV", level: 93 },
      { name: "Pose Estimation", level: 88 },
      { name: "Medical Imaging (CNN)", level: 85 },
      { name: "GANs / Generative", level: 78 },
    ],
  },
  {
    category: "Backend & MLOps",
    color: "#00d4ff",
    skills: [
      { name: "FastAPI / Flask", level: 91 },
      { name: "Docker / AWS", level: 85 },
      { name: "DVC / MLflow", level: 83 },
      { name: "CI/CD Pipelines", level: 80 },
    ],
  },
  {
    category: "LLMs & GenAI",
    color: "#a78bfa",
    skills: [
      { name: "OpenAI GPT-4 / API", level: 92 },
      { name: "Prompt Engineering", level: 90 },
      { name: "ChromaDB / VectorDBs", level: 86 },
      { name: "Ollama / LiteLLM", level: 80 },
    ],
  },
  {
    category: "Frontend & Data",
    color: "#06b6d4",
    skills: [
      { name: "Next.js / TypeScript", level: 80 },
      { name: "Pandas / NumPy", level: 94 },
      { name: "SQL / PostgreSQL", level: 85 },
      { name: "Power BI / Tableau", level: 80 },
    ],
  },
];

const tools = [
  "Python", "TypeScript", "SQL", "TensorFlow", "PyTorch", "scikit-learn",
  "LangChain", "LangGraph", "OpenAI SDK", "FastAPI", "Flask", "Next.js",
  "OpenCV", "HuggingFace", "ChromaDB", "Docker", "AWS (EC2/ECR/S3)", "Vercel",
  "DVC", "MLflow", "Git", "Linux", "PostgreSQL", "MySQL", "Power BI",
  "Gradio", "Snowflake", "Pandas", "NumPy", "Matplotlib",
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-28 relative grid-bg" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Technical Arsenal</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span style={{ color: "var(--foreground)" }}>Skills &</span>{" "}
            <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + gi * 0.08 }}
              className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              style={{ borderColor: `${group.color}15` }}
            >
              <h3
                className="text-xs font-semibold tracking-widest uppercase mb-5 transition-colors duration-300 group-hover:text-opacity-100"
                style={{ color: group.color, textShadow: `0 0 8px ${group.color}30` }}
              >
                ✓ {group.category}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {skill.name}
                      </span>
                      <span
                        className="text-xs font-mono"
                        style={{ color: group.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + gi * 0.06 + si * 0.05, ease: "easeOut" }}
                        style={{
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}80)`,
                          boxShadow: `0 0 6px ${group.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="section-label mb-5">Full Tool Belt</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.02 }}
                className="text-xs px-3 py-1.5 rounded-full font-mono cursor-default transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--text-muted)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(0,212,255,0.08)";
                  el.style.color = "var(--accent-blue)";
                  el.style.borderColor = "rgba(0,212,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.color = "var(--text-muted)";
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
