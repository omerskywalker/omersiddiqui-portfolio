import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  triggerOnView?: boolean;
}

export default function ScrambleText({
  text,
  className = "",
  delay = 0,
  duration = 900,
  triggerOnView = false,
}: ScrambleTextProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldRun = !triggerOnView || inView;

  const [output, setOutput] = useState<string>(() =>
    reduce ? text : text.split("").map((c) => (c === " " ? " " : "\u00A0")).join("")
  );

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return;
    }
    if (!shouldRun) return;

    const startAt = performance.now() + delay;
    let raf = 0;
    const lockDuration = duration * 0.55;
    const perCharDelay = (duration - lockDuration) / Math.max(text.length, 1);

    const tick = (now: number) => {
      const elapsed = now - startAt;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      let allDone = true;
      const next = text.split("").map((char, i) => {
        if (char === " ") return " ";
        const lockAt = i * perCharDelay + lockDuration;
        if (elapsed >= lockAt) return char;
        allDone = false;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setOutput(next.join(""));
      if (!allDone) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration, reduce, shouldRun]);

  return (
    <span ref={ref} className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
