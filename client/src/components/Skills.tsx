import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    num: "01",
    title: "Where mistakes cost money",
    body: "In fintech, a bug can mean wrong numbers on a banking dashboard. At Macy's, a bad deploy shows up in revenue. I check things twice.",
    proof: "→ JPMorgan · Macy's · Lumen Technologies",
  },
  {
    num: "02",
    title: "Start to finish",
    body: "Schema, API, UI, deploy. I'm happiest when I can follow a feature all the way through.",
    proof: "→ JPMC Digital Banking · Parchment · Weekbook",
  },
  {
    num: "03",
    title: "Code other people inherit",
    body: "I've inherited bad codebases and I've written code that outlasted me. I try to write for whoever opens it next, and keep decisions I can still explain a year later.",
    proof: "→ Bitcoin.org · Stratum V2 · internal tooling at scale",
  },
  {
    num: "04",
    title: "Starting from zero",
    body: "Each industry I've worked in was new to me once. I ramp up by asking what breaks, what scales, and who uses it.",
    proof: "→ 4 industries · 7+ years",
  },
];

export default function Approach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="approach" className="py-12 md:py-20 px-6" data-testid="section-approach">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="font-mono text-sm text-primary/80 tracking-wider mb-4">— how I think</p>
          <h2
            className="font-display font-semibold text-foreground leading-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 3.75rem)" }}
            data-testid="text-approach-heading"
          >
            Where I do
            <br />
            <span className="text-primary italic">my best work.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl font-sans text-lg leading-relaxed">
            Seven years, four industries. A few things I've figured out about how I work best.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className="relative overflow-hidden rounded-xl bg-card border border-border/60 p-6 md:p-7 flex flex-col min-h-[220px] cursor-default"
              style={{
                borderLeftWidth: "3px",
                borderLeftColor: "hsl(var(--foreground))",
                boxShadow: undefined,
              }}
              data-testid={`card-approach-${i}`}
            >
              <span
                className="absolute top-3 right-4 font-display font-semibold leading-none select-none pointer-events-none text-foreground"
                style={{ fontSize: "7rem", opacity: 0.05 }}
                aria-hidden="true"
              >
                {card.num}
              </span>

              <div className="relative flex flex-col flex-1 gap-3">
                <h3
                  className="font-display text-lg font-semibold text-foreground leading-snug"
                  data-testid={`text-approach-title-${i}`}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {card.body}
                </p>
                <p
                  className="font-mono text-xs text-muted-foreground/70 mt-auto pt-3 border-t border-border/40"
                  data-testid={`text-approach-proof-${i}`}
                >
                  {card.proof}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
