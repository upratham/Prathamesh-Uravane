"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend } from "react-icons/fi";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Prathamesh's knowledge base
const PRATHAMESH_CONTEXT = {
  name: "Prathamesh Uravane",
  title: "AI Engineer & ML Researcher",
  education: "MS in Applied ML at University of Maryland (GPA 4.0)",
  location: "DC/Maryland",
  status: "Actively seeking Summer 2026 internships",
  
  expertise: {
    aiAgents: ["LangChain", "LangGraph", "OpenAI Agents SDK", "RAG Pipelines"],
    ml: ["TensorFlow", "PyTorch", "scikit-learn", "HuggingFace"],
    cv: ["OpenCV", "Pose Estimation", "Medical Imaging", "GANs"],
    backend: ["FastAPI", "Flask", "Docker", "AWS"],
    llms: ["GPT-4", "Prompt Engineering", "ChromaDB", "Vector Databases"],
    frontend: ["Next.js", "TypeScript", "React"],
    data: ["Pandas", "NumPy", "SQL", "PostgreSQL"],
  },

  projects: [
    {
      name: "InsureLLM",
      description: "RAG-Powered AI Agent for Business Knowledge Automation",
      details: "Built RAG agent for InsureTech company with MRR 0.875 on 150 test cases, 95.7% accuracy",
      tech: ["LangChain", "ChromaDB", "OpenAI GPT-4", "Python"],
    },
    {
      name: "MediNotes AI",
      description: "Clinical Documentation Automation SaaS",
      details: "Full-stack SaaS automating medical documentation with real-time streaming, JWT auth, Clerk billing",
      tech: ["FastAPI", "Next.js", "OpenAI", "Docker", "AWS"],
    },
    {
      name: "Vehicle Predictive Maintenance",
      description: "MLOps Pipeline with Auto-Retraining",
      details: "End-to-end predictive analytics with CI/CD triggers, DVC versioning, MLflow tracking",
      tech: ["Python", "DVC", "MLflow", "FastAPI", "Docker"],
    },
    {
      name: "Student Attentiveness Monitor",
      description: "Real-time Computer Vision Agent",
      details: "70% reduction in manual review time using face detection and facial landmark analysis",
      tech: ["OpenCV", "Python", "FastAPI"],
    },
  ],

  research: "5 peer-reviewed papers in IEEE/Elsevier on AI, computer vision, and healthcare",
  
  strengths: [
    "Full-stack ML: from data pipelines to production APIs",
    "Building production-ready AI systems, not notebooks",
    "RAG systems and LLM agents",
    "Clinical/Healthcare AI applications",
    "Computer vision and medical imaging",
    "Production deployment with Docker and AWS",
  ],

  experience: "Worked across India, Singapore (NTU), and Peru (UMA) in global teams",
  
  contact: "upratham2002@gmail.com",
};

// Generate contextual responses
const generateResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Greeting
  if (
    lowerMessage.match(/^(hey|hi|hello|greetings|good (morning|afternoon|evening))/)
  ) {
    return `Hey! 👋 I'm Prathamesh's AI assistant. Feel free to ask me anything about his ${PRATHAMESH_CONTEXT.title} background, projects, skills, or experience! What interests you?`;
  }

  // Skills/Expertise queries
  if (
    lowerMessage.match(
      /skills|expertise|good at|capable of|can ?(you|he) do|what (can|do) ?(you|he)/
    )
  ) {
    if (lowerMessage.match(/ai|agents|rag|llm|language model/)) {
      return `Prathamesh is expert in AI agents and LLMs! 🤖 He specializes in LangChain, RAG pipelines, OpenAI integration, and building production LLM applications. He built InsureLLM - a RAG agent achieving 95.7% accuracy on business queries!`;
    }
    if (lowerMessage.match(/machine learning|ml|deep learning|models|training/)) {
      return `He's strong in ML! 🧠 TensorFlow, PyTorch, scikit-learn, HuggingFace - you name it. Built predictive maintenance systems, medical imaging CNNs (96% accuracy), and data-driven analytics pipelines.`;
    }
    if (lowerMessage.match(/computer vision|cv|image|video|detection|recognition/)) {
      return `Computer vision is his strength! 👁️ OpenCV expert, facial recognition, pose estimation, medical imaging. Built real-time student attentiveness monitoring system reducing manual review by 70%.`;
    }
    if (lowerMessage.match(/backend|devops|deployment|docker|aws|production/)) {
      return `He's a full-stack engineer! 🚀 FastAPI expert, Docker containerization, AWS deployment, CI/CD pipelines. All his projects go from prototype to production-ready systems.`;
    }
    return `Prathamesh excels at building full-stack production AI systems! 💪 AI Agents, ML pipelines, Computer Vision, Backend engineering, and DevOps. Which area interests you most?`;
  }

  // Project queries
  if (lowerMessage.match(/projects?|built|work|portfolio|experience/)) {
    if (lowerMessage.match(/insurellm|insurance|rag|knowledge|business/)) {
      return `InsureLLM was a great RAG project! 🎯 It automated employee access to insurance policies and contracts using semantic search + re-ranking. Achieved MRR of 0.875 on 150 business test cases with 95.7% keyword coverage. Tech: LangChain, ChromaDB, GPT-4.`;
    }
    if (lowerMessage.match(/medinotes|medical|clinical|health|doctor|documentation/)) {
      return `MediNotes AI is a full-cycle SaaS product! 🏥 Automates clinical documentation - doctors input notes, get AI-generated summaries, action items, and patient emails via real-time streaming. Built with FastAPI, Next.js, OpenAI, Clerk billing on AWS.`;
    }
    if (lowerMessage.match(/vehicle|maintenance|predictive|mlops|data drift/)) {
      return `Vehicle Predictive Maintenance showcases MLOps! 🔧 End-to-end pipeline predicting failures with automated retraining on data drift. Uses DVC versioning, MLflow tracking, FastAPI REST API, all Dockerized on AWS.`;
    }
    if (lowerMessage.match(/student|attentive|education|video|monitoring/)) {
      return `Student Attentiveness Monitor used real-time CV! 📹 Face detection + facial landmarks to assess attention during remote classes. 70% reduction in manual review time. Multi-threaded OpenCV pipeline.`;
    }
    return `Prathamesh has built impressive projects! 🏆 InsureLLM (RAG agent), MediNotes AI (clinical SaaS), Vehicle Predictive Maintenance (MLOps), and more. Want details on any specific project?`;
  }

  // Research/Publications
  if (lowerMessage.match(/research|paper|published|ieee|elsevier|citation/)) {
    return `Prathamesh is a published researcher! 📚 5 peer-reviewed papers in IEEE/Elsevier spanning healthcare AI, computer vision, and predictive analytics. His work bridges academic rigor with production systems.`;
  }

  // Education
  if (lowerMessage.match(/education|degree|university|umd|maryland|gpa|school/)) {
    return `Prathamesh is pursuing an MS in Applied ML at University of Maryland, College Park with a 4.0 GPA! 🎓 He's actively seeking Summer 2026 internships in AI/ML engineering roles.`;
  }

  // Experience/Background
  if (lowerMessage.match(/experience|background|history|where|worked|location/)) {
    return `He has global experience! 🌍 Worked across India, Singapore (NTU), and Peru (UMA) in cross-cultural ML/AI teams. Based in DC/Maryland. His diverse background gives him unique perspective on production AI systems.`;
  }

  // Contact/Hiring
  if (lowerMessage.match(/contact|email|hire|internship|opportunity|job|reach/)) {
    return `Great interest! 🎯 You can reach Prathamesh at ${PRATHAMESH_CONTEXT.contact} or through the Contact section below. He's actively seeking Summer 2026 internships in production ML/AI roles.`;
  }

  // Healthcare/Medical AI
  if (lowerMessage.match(/health|medical|clinical|hospital|patient|imaging|mri/)) {
    return `Prathamesh is passionate about Healthcare AI! 🏥 He built MediNotes AI (clinical documentation), medical imaging CNNs, and researches health informatics. His healthcare AI systems handle real-world clinical workflows.`;
  }

  // Default helpful response
  return `That's an interesting question! 💭 I'm here to tell you about Prathamesh's AI/ML expertise, projects, research, and experience. Feel free to ask about his skills, specific projects, education, or how to work with him!`;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hey! 👋 I'm Prathamesh's Digital Twin. I have access to his background, projects, and expertise. Ask me anything about his AI/ML work, skills, projects, or experience!`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Generate contextual bot response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-40" ref={chatContainerRef}>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="chat-open"
              initial={{ scale: 0.3, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.3, opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              }}
              className="absolute bottom-20 right-0 w-[450px] h-[350px] bg-gradient-to-br from-[rgba(13,13,31,0.95)] to-[rgba(13,13,31,0.85)] backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-[rgba(0,212,255,0.3)] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/40">
                    <img
                      src="/profile.png"
                      alt="Prathamesh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Prathamesh's AI
                    </p>
                    <p className="text-xs text-white/80">Digital Twin</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 rounded-full transition-all"
                  aria-label="Close chat"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[rgba(0,212,255,0.3)] scrollbar-track-transparent">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-br-none"
                          : "bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.9)] border border-[rgba(0,212,255,0.2)] rounded-bl-none"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.9)] px-4 py-2 rounded-2xl rounded-bl-none border border-[rgba(0,212,255,0.2)]">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                          }}
                          className="w-2 h-2 rounded-full bg-[#00d4ff]"
                        />
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            delay: 0.1,
                            repeat: Infinity,
                          }}
                          className="w-2 h-2 rounded-full bg-[#00d4ff]"
                        />
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            delay: 0.2,
                            repeat: Infinity,
                          }}
                          className="w-2 h-2 rounded-full bg-[#00d4ff]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-[rgba(0,212,255,0.2)] p-3 flex-shrink-0 bg-[rgba(0,0,0,0.2)]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about projects, skills..."
                    className="flex-1 bg-[rgba(255,255,255,0.08)] border border-[rgba(0,212,255,0.2)] rounded-lg px-3 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.5)] focus:outline-none focus:border-[rgba(0,212,255,0.5)] focus:bg-[rgba(255,255,255,0.12)] transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Floating Avatar Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 400,
          }}
          onClick={() => setIsOpen(true)}
          className="relative group"
          aria-label="Open chatbot"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />

          {/* Avatar button */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#00d4ff] shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] p-0.5 cursor-pointer hover:scale-110">
            <img
              src="/profile.png"
              alt="Prathamesh's Digital Twin"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Notification badge */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full border-2 border-[rgba(13,13,31,0.9)] shadow-lg"
          />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-[rgba(0,212,255,0.9)] text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
          >
            Chat with me! 💬
          </motion.div>
        </motion.button>
      </div>

      {/* Backdrop when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
}
