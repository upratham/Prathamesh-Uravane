"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCpu, FiLoader, FiSend, FiX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

function AssistantMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="m-0 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="m-0 space-y-1 pl-5 list-disc">{children}</ul>,
        ol: ({ children }) => <ol className="m-0 space-y-1 pl-5 list-decimal">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
          <code
            className="rounded px-1.5 py-0.5 font-mono text-[0.85em]"
            style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff" }}
          >
            {children}
          </code>
        ),
        h1: ({ children }) => <h3 className="m-0 text-base font-semibold">{children}</h3>,
        h2: ({ children }) => <h3 className="m-0 text-base font-semibold">{children}</h3>,
        h3: ({ children }) => <h4 className="m-0 text-sm font-semibold">{children}</h4>,
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] underline underline-offset-2">
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="m-0 border-l-2 pl-3 italic" style={{ borderColor: "rgba(0,212,255,0.3)" }}>
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

const initialMessages: Message[] = [
  {
    id: "1",
    text:
      "Ask me anything about Prathamesh's career, projects, research, or target roles. I use the same Groq-powered digital twin backend as the main portfolio chat.",
    sender: "bot",
    timestamp: new Date(),
  },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

    return undefined;
  }, [isOpen]);

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage || isTyping) {
      return;
    }

    const nextUserMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      sender: "user",
      timestamp: new Date(),
    };

    const nextMessages = [...messages, nextUserMessage];
    setMessages(nextMessages);
    setInputValue("");
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.sender === "bot" ? "assistant" : "user",
            content: message.text,
          })) as ChatMessage[],
        }),
      });

      const payload = (await response.json()) as { reply?: string; error?: string; details?: string };

      if (!response.ok) {
        throw new Error(payload.error || payload.details || "Unable to reach the digital twin backend.");
      }

      setMessages((current) => [
        ...current,
        {
          id: (Date.now() + 1).toString(),
          text: payload.reply ?? "No response returned.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (requestError) {
      const fallbackMessage =
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while contacting the digital twin.";

      setError(fallbackMessage);
      setMessages((current) => [
        ...current,
        {
          id: (Date.now() + 1).toString(),
          text:
            "I could not reach the shared digital twin backend right now. Please try again in a moment.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
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
              className="absolute bottom-20 right-0 w-[min(90vw,540px)] h-[350px] bg-gradient-to-br from-[rgba(13,13,31,0.95)] to-[rgba(13,13,31,0.85)] backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-[rgba(0,212,255,0.3)] flex flex-col"
            >
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
                    <p className="text-sm font-bold text-white">Prathamesh's AI</p>
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

              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[rgba(0,212,255,0.3)] scrollbar-track-transparent">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mr-3" style={{ background: "rgba(0,212,255,0.12)", color: "#00d4ff" }}>
                        <FiCpu size={16} />
                      </div>
                    )}
                    <div
                      className={`max-w-[88%] px-4 py-2 rounded-2xl text-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-br-none"
                          : "bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.92)] border border-[rgba(0,212,255,0.2)] rounded-bl-none"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <AssistantMarkdown content={message.text} />
                      ) : (
                        message.text
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mr-3" style={{ background: "rgba(0,212,255,0.12)", color: "#00d4ff" }}>
                      <FiCpu size={16} />
                    </div>
                    <div className="bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.9)] px-4 py-2 rounded-2xl rounded-bl-none border border-[rgba(0,212,255,0.2)]">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-[#00d4ff]"
                        />
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, delay: 0.1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-[#00d4ff]"
                        />
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-[#00d4ff]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {error && !isTyping && (
                  <p className="text-xs text-red-300 px-1">{error}</p>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-[rgba(0,212,255,0.2)] p-3 flex-shrink-0 bg-[rgba(0,0,0,0.2)]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about projects, skills..."
                    className="flex-1 bg-[rgba(255,255,255,0.08)] border border-[rgba(0,212,255,0.2)] rounded-lg px-3 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.5)] focus:outline-none focus:border-[rgba(0,212,255,0.5)] focus:bg-[rgba(255,255,255,0.12)] transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    {isTyping ? <FiLoader className="animate-spin" size={18} /> : <FiSend size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

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
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />

          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#00d4ff] shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] p-0.5 cursor-pointer hover:scale-110">
            <img
              src="/profile.png"
              alt="Prathamesh's Digital Twin"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full border-2 border-[rgba(13,13,31,0.9)] shadow-lg"
          />

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-[rgba(0,212,255,0.9)] text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
          >
            Chat with me! 💬
          </motion.div>
        </motion.button>
      </div>

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
