import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const domains = [
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
    label: "E-commerce",
    company: "Macy's",
    metric: "M+",
    metricLabel: "daily users",
    description:
      "Shipped product discovery, personalization, and checkout features. Owned A/B tested experiences with measurable conversion impact.",
    tags: ["React", "TypeScript", "GraphQL", "Redis"],
    gradientStyle: { backgroundImage: "linear-gradient(135deg, rgba(255,30,30,0.14) 0%, rgba(255,30,30,0.03) 100%)" },
    accentStyle: { background: "rgba(255,30,30,0.18)", color: "#FF2020" },
  },
  {
    label: "Open Source",
    company: "Bitcoin.org / Stratum V2",
    metric: "Protocol",
    metricLabel: "contributor",
    description:
      "Led efforts to add SeedSigner to Bitcoin.org and improved mining protocol documentation. Documentation-first, security-focused.",
    tags: ["Vue", "Git", "Markdown", "CI/CD"],
    gradientStyle: { backgroundImage: "linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(245,158,11,0.03) 100%)" },
    accentStyle: { background: "rgba(245,158,11,0.18)", color: "#F59E0B" },
  },
  {
    label: "Fintech",
    company: "JPMorgan Chase",
    metric: "Fortune 5",
    metricLabel: "$3.7T AUM",
    description:
      "Built onboarding flows for the Commercial Investment Bank's digital banking app. Shipped full-stack features across product, design, and QA.",
    tags: ["React", "TypeScript", "Spring Boot", "Figma", "AWS"],
    gradientStyle: { backgroundImage: "linear-gradient(135deg, rgba(17,122,202,0.14) 0%, rgba(17,122,202,0.03) 100%)" },
    accentStyle: { background: "rgba(17,122,202,0.18)", color: "#117ACA" },
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-12 md:py-20 px-6 bg-muted/20" data-testid="section-experience">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
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

        <div className="grid md:grid-cols-2 gap-5">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-7 rounded-xl border border-border/50 bg-card group hover-elevate"
              style={domain.gradientStyle}
              data-testid={`experience-domain-${i}`}
            >
              <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
                <div>
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-md font-medium"
                    style={domain.accentStyle}
                  >
                    {domain.label}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2">
                    {domain.company}
                  </h3>
                </div>
                <div className="text-right shrink-0">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
