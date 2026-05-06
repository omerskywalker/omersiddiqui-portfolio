import { motion, useInView, useMotionValue, useSpring, useTransform, MotionStyle } from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";
import SectionAccent from "@/components/effects/SectionAccent";

interface Domain {
  label: string;
  company: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  gradientStyle: CSSProperties;
  accentStyle: CSSProperties;
  current?: boolean;
}

function DomainCard({ domain, index, children }: { domain: Domain; index: number; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative p-7 rounded-xl border border-border/50 bg-card group hover-elevate overflow-visible"
      style={{
        ...domain.gradientStyle,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } as MotionStyle}
      data-testid={`experience-domain-${index}`}
    >
      {children}
    </motion.div>
  );
}


const domains = [
  {
    label: "Fintech",
    company: "JPMorgan Chase",
    metric: "Fortune 5",
    metricLabel: "$3.7T AUM",
    description:
      "Built onboarding flows for the Commercial Investment Bank's digital banking app. Shipped full-stack features across product, design, and QA.",
    tags: ["React", "TypeScript", "Spring Boot", "AWS"],
    gradientStyle: { backgroundImage: "linear-gradient(135deg, rgba(17,122,202,0.14) 0%, rgba(17,122,202,0.03) 100%)" },
    accentStyle: { background: "rgba(17,122,202,0.18)", color: "#117ACA" },
    current: true,
  },
  {
    label: "E-commerce",
    company: "Macy's",
    metric: "6M",
    metricLabel: "DAU",
    description:
      "Shipped product discovery, personalization, and checkout features. Owned A/B tested experiences with measurable conversion impact.",
    tags: ["Vue.js", "TypeScript", "GraphQL", "Redis"],
    gradientStyle: { backgroundImage: "linear-gradient(135deg, rgba(255,30,30,0.14) 0%, rgba(255,30,30,0.03) 100%)" },
    accentStyle: { background: "rgba(255,30,30,0.18)", color: "#FF2020" },
  },
  {
    label: "Enterprise",
    company: "Lumen Technologies",
    metric: "30K+",
    metricLabel: "employees",
    description:
      "Owned 100+ automation tools replacing manual workflows across departments. Built for scale, reliability, and cross-team adoption.",
    tags: ["React", "Spring Boot", "SQL", "UiPath"],
    gradientStyle: { backgroundImage: "linear-gradient(135deg, rgba(0,153,204,0.14) 0%, rgba(0,153,204,0.03) 100%)" },
    accentStyle: { background: "rgba(0,153,204,0.22)", color: "#0099CC" },
  },
  {
    label: "FOSS",
    company: "Bitcoin.org / Stratum V2",
    metric: "FOSS",
    metricLabel: "enjoyer",
    description:
      "Led efforts to list SeedSigner on Bitcoin.org and improved Stratum V2 mining protocol documentation. Open-source contributor, not a protocol author.",
    tags: ["VuePress", "Git", "Markdown", "CI/CD"],
    gradientStyle: { backgroundImage: "linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(245,158,11,0.03) 100%)" },
    accentStyle: { background: "rgba(245,158,11,0.18)", color: "#F59E0B" },
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-12 md:py-20 px-6 bg-muted/20" data-testid="section-experience">
      <div className="max-w-5xl mx-auto">
        <SectionAccent />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="font-mono text-sm text-primary/80 tracking-wider mb-4">— where I've worked</p>
          <h2
            className="font-display font-semibold text-foreground leading-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 3.75rem)" }}
            data-testid="text-experience-heading"
          >
            Experience
            <br />
            <span className="text-primary italic">by domain.</span>
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-2 gap-5" style={{ perspective: 1200 }}>
          <motion.div
            aria-hidden
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent origin-top pointer-events-none"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          {domains.map((domain, i) => (
            <DomainCard key={domain.company} domain={domain} index={i}>
              {"current" in domain && domain.current && (
                <motion.span
                  initial={{ scale: 0, rotate: -45, opacity: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" }}
                  whileInView={{
                    scale: [0, 1.25, 0.92, 1.05, 1],
                    rotate: [-45, -2, -7, -4, -5],
                    opacity: [0, 1, 1, 1, 1],
                    filter: [
                      "drop-shadow(0 0 0 rgba(0,0,0,0))",
                      "drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
                      "drop-shadow(0 3px 6px rgba(0,0,0,0.28))",
                      "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                      "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                    ],
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    times: [0, 0.35, 0.55, 0.78, 1],
                    delay: i * 0.1 + 0.4,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: "center center" }}
                  className="absolute -top-3 -left-3 px-2.5 py-1 rounded-md bg-emerald-500 text-xs font-mono font-medium text-black uppercase tracking-widest z-10 will-change-transform"
                >
                  Current role
                </motion.span>
              )}
              <div className="flex items-start justify-between mb-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <motion.span
                      className="text-xs font-mono px-2 py-1 rounded-md font-medium uppercase tracking-widest inline-block"
                      style={domain.accentStyle}
                      initial={{ scale: 0, rotate: -20, opacity: 0 }}
                      whileInView={{ scale: [0, 1.2, 1], rotate: [-20, 4, 0], opacity: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                    >
                      {domain.label}
                    </motion.span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2">
                    {domain.company}
                  </h3>
                </div>
                <div className="text-right shrink-0 whitespace-nowrap">
                  <div className="font-display text-2xl font-semibold text-foreground">{domain.metric}</div>
                  <div className="text-xs font-mono text-muted-foreground">{domain.metricLabel}</div>
                </div>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed mb-4">{domain.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {domain.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-1 rounded-md bg-background/60 text-muted-foreground border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </DomainCard>
          ))}
        </div>
      </div>
    </section>
  );
}
