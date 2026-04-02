import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    num: "01",
    title: "High-stakes production environments",
    body: "When failure has a real cost — financial, reputational, operational — the engineering has to be different. I've built in fintech where a bug means bad data on a banking dashboard, and e-commerce where a bad deploy costs real revenue. That pressure sharpens how I work.",
    proof: "→ JPMorgan · Macy's · Lumen Technologies",
  },
  {
    num: "02",
    title: "End-to-end product work",
    body: "I'm most useful when I own the whole problem — not just the ticket. Schema, API, UI, observability, deployment. I've gone from Figma file to production feature at JPMorgan, Macy's, and in my own projects. I don't need someone to hand me a slice.",
    proof: "→ JPMC Digital Banking · Parchment · Weekbook",
  },
  {
    num: "03",
    title: "Systems meant to last",
    body: "I've inherited bad codebases and I've written code that outlasted me. The difference is intentionality — writing for the next engineer, treating documentation as part of the work, and making decisions you can defend a year later.",
    proof: "→ Bitcoin.org · Stratum V2 · internal tooling at scale",
  },
  {
    num: "04",
    title: "Environments I haven't seen yet",
    body: "Fintech, enterprise, e-commerce, open-source protocol work — each one was new at some point. I pick up domains fast because I focus on the fundamentals first: what breaks, what scales, what the users actually need.",
    proof: "→ 4 industries · 6+ years · still learning",
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
            Six years across four industries. Here's what I've learned about where I'm most effective.
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
