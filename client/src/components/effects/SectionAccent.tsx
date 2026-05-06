import { motion } from "framer-motion";

export default function SectionAccent({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`h-[2px] w-32 bg-gradient-to-r from-primary via-primary/60 to-transparent origin-left mb-6 ${className}`}
      data-testid="section-accent"
    />
  );
}
