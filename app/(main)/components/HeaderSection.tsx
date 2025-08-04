"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeaderSection() {
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <motion.div 
      className="prose bg-gradient-to-b p-4 md:p-12 from-slate-200/20 dark:from-slate-800/20 to-transparent backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl prose-lg prose-slate max-w-2xl text-left dark:prose-invert md:prose-xl prose-h1:mb-1 prose-h2:my-1 prose-p:mt-1"
      style={{
        y: headerY,
        scale: headerScale,
      }}
    >
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 md:text-5xl">
        Hi there! 👋
      </h1>
      <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 md:text-2xl">
        I&apos;m Kacey
      </h2>
      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
        A software developer passionate about building digital experiences
      </p>
    </motion.div>
  );
}