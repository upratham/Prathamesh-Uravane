"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const bootLines = [
  "> PRATHAMESH://system/boot",
  "> INITIALIZING PORTFOLIO CORE",
  "> LOADING AI/ML PROJECT MEMORY",
  "> SYNCHRONIZING DIGITAL TWIN",
];

export default function BootIntro() {
  const [visible, setVisible] = useState(true);
  const [lineCount, setLineCount] = useState(1);

  const progress = useMemo(() => (lineCount / bootLines.length) * 100, [lineCount]);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setLineCount(2), 650),
      window.setTimeout(() => setLineCount(3), 1250),
      window.setTimeout(() => setLineCount(4), 1900),
      window.setTimeout(() => setVisible(false), 3800),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed inset-0 z-[70] overflow-hidden bg-[#05050f] text-white"
        >
          <div className="absolute inset-0 grid-bg opacity-60" />
          <motion.div
            initial={{ y: "-20%" }}
            animate={{ y: "120%" }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-60"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.16),transparent_30%)]" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:100%_3px] mix-blend-soft-light"
            />
            <motion.div
              animate={{ x: ["-8%", "8%", "-8%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-32 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.18),transparent_70%)] blur-3xl"
            />
            <motion.div
              animate={{ x: ["8%", "-8%", "8%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-6rem] right-[-3rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] blur-3xl"
            />
          </div>

          <div className="relative flex min-h-screen items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[rgba(0,212,255,0.25)] bg-[rgba(8,10,24,0.92)] shadow-[0_0_80px_rgba(0,212,255,0.14)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-[rgba(0,212,255,0.12)] px-5 py-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#00d4ff]">
                    Prathamesh Uravane
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    AI Engineer · ML Researcher · Digital Twin
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-[#00d4ff]/40 hover:text-white"
                >
                  Press to skip
                </button>
              </div>

              <div className="grid gap-8 px-5 py-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-8 md:py-10">
                <div className="space-y-5 font-mono">
                  <p className="text-sm text-white/50">SYSTEM ONLINE</p>
                  <div className="space-y-2 text-lg sm:text-xl md:text-2xl">
                    {bootLines.slice(0, lineCount).map((line, index) => (
                      <motion.p
                        key={line}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                        className={index === lineCount - 1 ? "text-white" : "text-white/70"}
                      >
                        {line}
                        {index === lineCount - 1 && <span className="ml-1 inline-block h-[1em] w-[0.65ch] animate-pulse bg-[#00d4ff] align-[-0.15em]" />}
                      </motion.p>
                    ))}
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.28em] text-white/45">
                      <span>Boot progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#00d4ff]"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-center md:justify-end">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-auto h-64 w-64 rounded-full border border-dashed border-[#00d4ff]/25"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex h-48 w-48 items-center justify-center rounded-full border border-[#00d4ff]/25 bg-[radial-gradient(circle,rgba(0,212,255,0.18),rgba(13,13,31,0.85))] shadow-[0_0_50px_rgba(0,212,255,0.18)]"
                  >
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#00d4ff]">Twin Ready</p>
                      <p className="mt-2 text-2xl font-semibold text-white">Prathamesh</p>
                      <p className="mt-1 text-sm text-white/55">Loading portfolio atmosphere</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}