"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    number: "01",
    title: "InsureLLM",
    subtitle: "RAG-Powered AI Agent for Business Knowledge Automation",
    description:
      "Built an end-to-end RAG AI agent for an InsureTech company to automate employee access to policy, contract, and HR knowledge. Replaces manual lookups with a conversational, LLM-powered workflow.",
    highlights: [
      "MRR of 0.875 on 150 business test cases",
      "95.7% keyword coverage — production-ready accuracy",
      "Semantic search + re-ranking pipeline",
    ],
    tech: ["Python", "LangChain", "ChromaDB", "OpenAI GPT-4.1", "LiteLLM", "Gradio"],
    github: "https://github.com/upratham",
    color: "#00d4ff",
    featured: true,
  },
  {
    number: "02",
    title: "MediNotes AI",
    subtitle: "Generative AI Integrated into Clinical Business Workflow",
    description:
      "Production SaaS product that automates clinical documentation. Doctors input consultation notes and receive AI-generated visit summaries, action items, and patient-facing emails via real-time streaming.",
    highlights: [
      "Full-cycle SaaS: auth, billing, multi-tenancy",
      "JWT auth + Clerk Billing for subscription-gated access",
      "Dockerized, deployed serverlessly on Vercel + AWS",
    ],
    tech: ["Python", "FastAPI", "Next.js", "TypeScript", "OpenAI API", "Clerk", "Docker", "AWS"],
    github: "https://github.com/upratham",
    color: "#7c3aed",
    featured: true,
  },
  {
    number: "03",
    title: "Vehicle Predictive Maintenance",
    subtitle: "MLOps & Automated Retraining Pipeline",
    description:
      "End-to-end predictive analytics pipeline for vehicle failure forecasting with automated model retraining on data drift — zero manual intervention required.",
    highlights: [
      "CI/CD triggers auto-retraining on data drift detection",
      "DVC data versioning + MLflow experiment tracking",
      "FastAPI REST API containerized on Docker + AWS",
    ],
    tech: ["Python", "DVC", "MLflow", "FastAPI", "Docker", "AWS", "scikit-learn"],
    github: "https://github.com/upratham",
    color: "#06b6d4",
    featured: false,
  },
  {
    number: "04",
    title: "Student Attentiveness Monitor",
    subtitle: "Real-time CV Agent for Online Education",
    description:
      "Multi-threaded computer vision pipeline using facial recognition and landmark tracking to assess student attentiveness in real-time during remote classes.",
    highlights: [
      "~70% reduction in manual review time",
      "Face detection + facial landmark analysis",
      "Live monitoring dashboard for instructors",
    ],
    tech: ["Python", "OpenCV", "face_recognition", "FastAPI", "React"],
    github: "https://github.com/upratham",
    color: "#00d4ff",
    featured: false,
  },
  {
    number: "05",
    title: "Brain Tumor CNN Classifier",
    subtitle: "Medical AI — Health Informatics Research",
    description:
      "CNN model for brain tumor classification from MRI images, published as part of health informatics research at Vishwakarma University's research centre.",
    highlights: [
      "96% classification accuracy on MRI dataset",
      "Published in IEEE / Elsevier",
      "Full pipeline documentation for research team",
    ],
    tech: ["Python", "TensorFlow", "Keras", "Medical Imaging", "CNN"],
    github: "https://github.com/upratham",
    color: "#7c3aed",
    featured: false,
  },
  {
    number: "06",
    title: "Autonomous Vehicle GAN",
    subtitle: "Synthetic Data for AV Perception — NTU Singapore",
    description:
      "GAN-based model generating realistic road scenarios from pedestrian data to expand AV training datasets with synthetic but realistic traffic environments.",
    highlights: [
      "India Connect Research Fellowship, NTU Singapore",
      "Diverse synthetic traffic scenario generation",
      "Improves AV perception accuracy in dynamic conditions",
    ],
    tech: ["Python", "PyTorch", "GANs", "Computer Vision"],
    github: "https://github.com/upratham",
    color: "#06b6d4",
    featured: false,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="section-label mb-3">What I&apos;ve Built</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span style={{ color: "var(--foreground)" }}>Featured</span>{" "}
            <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm mb-16 max-w-xl"
          style={{ color: "var(--text-muted)" }}
        >
          Portfolio links coming soon — drop me a message for demos, code walkthroughs, or
          live previews.
        </motion.p>

        {/* Featured 2 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects.filter((p) => p.featured).map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
              className="glass-card rounded-2xl p-7 flex flex-col group hover:shadow-lg transition-all duration-300"
              style={{ borderColor: `${project.color}20` }}
            >
              <div className="flex items-start justify-between mb-5">
                <span
                  className="text-4xl font-bold font-mono opacity-20"
                  style={{ color: project.color }}
                >
                  {project.number}
                </span>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = project.color)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                    }
                  >
                    <FiGithub size={18} />
                  </a>
                </div>
              </div>

              <h3 className="font-bold text-xl mb-1" style={{ color: "var(--foreground)" }}>
                {project.title}
              </h3>
              <p className="text-xs mb-3" style={{ color: project.color }}>
                {project.subtitle}
              </p>
              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-muted)" }}>
                {project.description}
              </p>

              <ul className="space-y-1.5 mb-5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: project.color }} />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      background: `${project.color}10`,
                      color: project.color,
                      border: `1px solid ${project.color}25`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other 4 in grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.filter((p) => !p.featured).map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="glass-card rounded-xl p-5 flex flex-col group hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <span
                className="text-2xl font-bold font-mono opacity-20 mb-3 block"
                style={{ color: project.color }}
              >
                {project.number}
              </span>
              <h3 className="font-bold text-sm mb-1" style={{ color: "var(--foreground)" }}>
                {project.title}
              </h3>
              <p className="text-xs mb-3 flex-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      background: `${project.color}10`,
                      color: project.color,
                      border: `1px solid ${project.color}20`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center glass-card rounded-2xl py-10 px-6"
          style={{ borderStyle: "dashed" }}
        >
          <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
            Full portfolio with live demos
          </p>
          <h3 className="text-2xl font-bold gradient-text mb-4">Coming Soon</h3>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            In-depth case studies, GitHub repos, and live demos will be linked here as they ship.
          </p>
          <a
            href="https://github.com/upratham"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold border transition-all hover:bg-[rgba(0,212,255,0.08)]"
            style={{
              borderColor: "rgba(0,212,255,0.3)",
              color: "var(--accent-blue)",
            }}
          >
            <FiGithub size={16} />
            github.com/upratham
          </a>
        </motion.div>
      </div>
    </section>
  );
}
