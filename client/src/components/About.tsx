import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const principles = [
  {
    num: "01",
    title: "Clarity is the feature",
    body: "I've read enough code at 11pm during an incident to know that \"clever\" is the enemy. The best code I've ever written looks obvious in hindsight. That's the goal."
  },
  {
    num: "02",
    title: "Real systems fail in real ways",
    body: "I don't design for the demo. I design for the retry, the timeout, the malformed input, the concurrent write. Constraints aren't obstacles — they're the actual job."
  },
  {
    num: "03",
    title: "Be intentional or pay later",
    body: "I'd rather have an uncomfortable conversation about scope today than explain a rewrite in six months. The shortcut always has a return address."
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 px-6" data-testid="section-about">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="mb-8">
            <p className="font-mono text-sm text-primary/80 tracking-wider mb-4">— who I am</p>
            <h2
              className="font-display font-semibold text-foreground leading-tight"
              style={{ fontSize: "clamp(2rem, 8vw, 3.75rem)" }}
              data-testid="text-about-heading"
            >
              10,000+ hours in.
              <br />
              <span className="text-primary italic">Still getting better.</span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeUp delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed" data-testid="text-about-content">
              <p className="text-foreground/90 text-lg">
                I'm a software engineer with{" "}
                <span className="text-foreground font-medium">7+ years</span> of experience
                building and operating production systems across fintech, e-commerce,
                telecom, healthcare, open-source, and enterprise environments.
              </p>
              <p className="text-muted-foreground">
                My work has spanned internal productivity platforms used by tens of thousands
                of employees, consumer-facing apps serving millions of daily users, and fintech
                products where correctness and data integrity are non-negotiable.
              </p>
              <p className="text-muted-foreground">
                I care about software that actually gets used — real users, real stakes, real feedback loops.
              </p>

              <p className="text-muted-foreground pt-1">
                When I'm not at the keyboard, you can find me:{" "}
                <a
                  href="https://x.com/0merskywalker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors"
                  data-testid="link-lifting"
                >
                  lifting
                </a>
                {", "}
                <a
                  href="https://www.goodreads.com/user/show/omerasiddiqui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors"
                  data-testid="link-reading"
                >
                  reading
                </a>
                {", or climbing the ranks on "}
                <a
                  href="https://www.chess.com/member/omerskywalker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors"
                  data-testid="link-chess"
                >
                  chess.com
                </a>
                {"."}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-6">
                — how I think about code
              </p>
              <div className="space-y-6">
                {principles.map((p, i) => (
                  <motion.div
                    key={p.num}
                    className="flex gap-5 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.1 * i + 0.3, duration: 0.6 }}
                  >
                    <span className="font-mono text-xs text-primary/60 mt-1 shrink-0">{p.num}</span>
                    <div>
                      <h3 className="font-display text-lg font-medium text-foreground mb-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
