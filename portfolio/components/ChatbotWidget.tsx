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

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! 👋 I'm Prathamesh's Digital Twin. Let's chat about AI, ML, or anything cool you'd like to discuss!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Simulate bot response delay
    setTimeout(() => {
      const botResponses = [
        "That's a great question! Let me think about that... 🤔",
        "Interesting! I love discussing that topic. 💡",
        "You know, that's something Prathamesh is really passionate about! 🚀",
        "Great point! We should explore that more. 👍",
        "I completely agree with you on that! 🎯",
        "Feel free to contact Prathamesh directly for more detailed discussions! 📧",
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
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
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="chat-open"
              initial={{ scale: 0.3, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.3, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="absolute bottom-20 right-0 w-96 h-[500px] bg-gradient-to-br from-[rgba(13,13,31,0.95)] to-[rgba(13,13,31,0.85)] backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-[rgba(0,212,255,0.3)] flex flex-col"
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
                    <p className="text-xs text-white/80">
                      Always online
                    </p>
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
                          transition={{ duration: 0.6, repeat: Infinity }}
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
                    placeholder="Type a message..."
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
          transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
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
            transition={{ duration: 2, repeat: Infinity }}
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
