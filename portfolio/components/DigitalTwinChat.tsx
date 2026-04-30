"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiCpu, FiLoader, FiMessageCircle, FiSend, FiUser } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import EmailAction from "@/components/EmailAction";
import { digitalTwinProfile, digitalTwinSuggestions } from "@/lib/digitalTwin";

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
        strong: ({ children }) => <strong className="font-semibold text-[var(--foreground)]">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
          <code
            className="rounded px-1.5 py-0.5 font-mono text-[0.85em]"
            style={{ background: "rgba(0,212,255,0.08)", color: "var(--accent-blue)" }}
          >
            {children}
          </code>
        ),
        h1: ({ children }) => <h3 className="m-0 text-base font-semibold">{children}</h3>,
        h2: ({ children }) => <h3 className="m-0 text-base font-semibold">{children}</h3>,
        h3: ({ children }) => <h4 className="m-0 text-sm font-semibold">{children}</h4>,
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-blue)] underline underline-offset-2">
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

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Ask me anything about my career, projects, research, or the kind of roles I am targeting. I will answer as Prathamesh's digital twin.",
  },
];

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);
    scrollToBottom();

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const payload = (await response.json()) as { reply?: string; error?: string; details?: string };

      if (!response.ok) {
        throw new Error(payload.error || payload.details || "Unable to reach the digital twin.");
      }

      setMessages((current) => [...current, { role: "assistant", content: payload.reply ?? "No response returned." }]);
    } catch (requestError) {
      const fallbackMessage = requestError instanceof Error ? requestError.message : "Something went wrong.";
      setError(fallbackMessage);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I could not answer right now. Please check the server environment or try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <section id="digital-twin" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-3">Digital Twin</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Talk to my
            <span className="gradient-text block">career twin.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Ask questions about my work history, projects, research, or skills. This chat uses Groq with
            {" "}
            <span style={{ color: "var(--foreground)" }}>{digitalTwinProfile.role}</span> context and replies in first person.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="glass-card rounded-3xl p-6 md:p-8 h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.12)", color: "var(--accent-blue)" }}>
                <FiCpu size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Prathamesh Digital Twin</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Groq-powered portfolio assistant
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              <p>{digitalTwinProfile.summary}</p>
              <div>
                <p className="section-label mb-3">What it knows</p>
                <ul className="space-y-2">
                  {digitalTwinProfile.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--accent-blue)" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <p className="section-label mb-3">Try asking</p>
                <div className="flex flex-wrap gap-2">
                  {digitalTwinSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(suggestion)}
                      className="text-left text-xs px-3 py-2 rounded-full border transition-all duration-200"
                      style={{
                        borderColor: "rgba(0,212,255,0.18)",
                        color: "var(--foreground)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <FiArrowUpRight size={14} />
                <a href={digitalTwinProfile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-blue)] transition-colors">
                  LinkedIn
                </a>
                <span>·</span>
                <EmailAction email={digitalTwinProfile.contact.email} className="hover:text-[var(--accent-blue)] transition-colors">
                  Email
                </EmailAction>
                <span>·</span>
                <a href={digitalTwinProfile.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-blue)] transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-4 md:p-6 h-full flex flex-col min-h-[640px] max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-2 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2">
                <FiMessageCircle size={16} style={{ color: "var(--accent-blue)" }} />
                <span className="text-sm font-semibold">Live conversation</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.08)", color: "var(--accent-blue)" }}>
                Model: openai/gpt-oss-120b
              </span>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto py-4 pr-1 space-y-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,212,255,0.12)", color: "var(--accent-blue)" }}>
                      <FiCpu size={16} />
                    </div>
                  )}
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={{
                      background: message.role === "user" ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "var(--foreground)",
                    }}
                  >
                    {message.role === "assistant" ? <AssistantMarkdown content={message.content} /> : message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}>
                      <FiUser size={16} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,212,255,0.12)", color: "var(--accent-blue)" }}>
                    <FiCpu size={16} />
                  </div>
                  <div className="rounded-2xl px-4 py-3 text-sm flex items-center gap-2" style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-muted)" }}>
                    <FiLoader className="animate-spin" size={14} />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {error && (
              <div className="mb-4 rounded-2xl px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.18)" }}>
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="pt-2">
              <div className="flex flex-col gap-3 rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about projects, research, skills, internships, or career goals..."
                  rows={3}
                  className="w-full resize-none bg-transparent outline-none text-sm leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    The reply is grounded in this portfolio and Groq model output.
                  </p>
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                      color: "#fff",
                    }}
                  >
                    Send
                    <FiSend size={14} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
