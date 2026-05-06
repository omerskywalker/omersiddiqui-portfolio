import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface HighlightProps {
  children: ReactNode;
  delay?: number;
  color?: string;
}

export default function Highlight({ children, delay = 0, color = "hsl(var(--primary))" }: HighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className="relative inline-block">
      <span className="relative z-10 text-foreground font-medium">{children}</span>
      <svg
        aria-hidden
        className="absolute left-0 -bottom-0.5 w-full pointer-events-none"
        height="6"
        viewBox="0 0 100 6"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 1 3 Q 25 1, 50 3 T 99 3"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
        />
      </svg>
    </span>
  );
}
