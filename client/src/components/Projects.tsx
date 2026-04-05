import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import desktopScreenshot from "@assets/image_1775025355711.png";
import weekbookScreenshot from "@assets/image_1775029189262.png";

const parchmentFeatures = [
  "CodeMirror 6 markdown editor with live preview",
  "Scheduled publishing via daily cron (9 AM UTC)",
  "Full-text search powered by PostgreSQL tsvector",
  "Dynamic OpenGraph images (1200×630) per post",
  "Fire reactions with anonymous visitor cookie tracking",
  "OAuth via Google & GitHub with account linking",
  "RSS feed, XML sitemap, cursor-based pagination",
  "Rate-limited auth via Upstash Redis sliding window",
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-12 md:py-20 px-6" data-testid="section-projects">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="font-mono text-sm text-primary/80 tracking-wider mb-4">— apps I've shipped</p>
          <h2
            className="font-display font-semibold text-foreground leading-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 3.75rem)" }}
            data-testid="text-projects-heading"
          >
            Things I've
            <br />
            <span className="text-primary italic">shipped.</span>
          </h2>
        </motion.div>

        {/* Featured: Parchment */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 rounded-2xl border border-border/60 bg-card overflow-hidden"
          data-testid="card-parchment-featured"
        >
          <div className="flex flex-col-reverse md:grid md:grid-cols-[1.1fr_1fr]">
            {/* Details — left on desktop, bottom on mobile */}
            <div className="p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-r border-border/60">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-primary/70 uppercase tracking-widest whitespace-nowrap">Solo build</span>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest whitespace-nowrap">• In prod</span>
              </div>
              <h3 className="font-display text-3xl font-semibold text-foreground mt-1 mb-3">Parchment</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-5">
                A minimalist blogging platform for independent writers. No algorithmic feeds. No engagement traps. Just your words.
              </p>

              <ul className="space-y-2 mb-6">
                {parchmentFeatures.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 shrink-0">→</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma", "AWS S3", "CodeMirror 6", "Vercel"].map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                <a href="https://github.com/omerskywalker/parchment-blog" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-1.5 font-sans" data-testid="button-parchment-github">
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </Button>
                </a>
                <a href="https://parchment-blog.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-1.5 font-sans" data-testid="button-parchment-live">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Site
                  </Button>
                </a>
              </div>
            </div>

            {/* Screenshot — right on desktop */}
            <div className="bg-gradient-to-br from-muted/60 to-background p-5 flex flex-col justify-center">
              <div className="rounded-lg overflow-hidden border border-border/40 shadow-xl">
                <div className="bg-muted/80 border-b border-border/40 px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 mx-2 bg-background/60 rounded text-xs font-mono text-muted-foreground/60 px-2 py-0.5 text-center truncate">
                    parchment-blog.vercel.app
                  </div>
                </div>
                <img
                  src={desktopScreenshot}
                  alt="Parchment desktop view"
                  className="w-full h-auto object-cover object-top"
                  data-testid="img-parchment-desktop"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary: Weekbook */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-2xl border border-border/60 bg-card overflow-hidden"
          data-testid="card-weekbook-featured"
        >
          <div className="flex flex-col-reverse md:grid md:grid-cols-[1.1fr_1fr]">
            {/* Details — left on desktop, bottom on mobile */}
            <div className="p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-r border-border/60">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-primary/70 uppercase tracking-widest whitespace-nowrap">Solo build</span>
                <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest whitespace-nowrap">• In dev</span>
              </div>
              <h3 className="font-display text-3xl font-semibold text-foreground mt-1 mb-3">Weekbook</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-5">
                A calm, authenticity-first social app. Users reply to short prompts via SMS throughout the week — entries stay private, then get distilled into a clean public weekly wrap on their profile grid for followers.
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "SMS-driven weekly prompt responses via Twilio",
                  "Private entries → auto-generated public weekly wraps",
                  "Follow graph with personalized digest feed",
                  "Photo uploads with S3-backed storage",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 shrink-0">→</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Ruby on Rails", "PostgreSQL", "Hotwire", "Tailwind CSS", "SMS Integration", "OpenAI API"].map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                <a href="https://github.com/omerskywalker/weekbook" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-1.5 font-sans" data-testid="button-weekbook-github">
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </Button>
                </a>
                <a href="https://weekbook.onrender.com/" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-1.5 font-sans" data-testid="button-weekbook-live">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Site
                  </Button>
                </a>
              </div>
            </div>

            {/* Screenshot — right on desktop, top on mobile */}
            <div className="bg-gradient-to-br from-muted/60 to-background p-5 flex flex-col justify-center">
              <div className="rounded-lg overflow-hidden border border-border/40 shadow-xl">
                <div className="bg-muted/80 border-b border-border/40 px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 mx-2 bg-background/60 rounded text-xs font-mono text-muted-foreground/60 px-2 py-0.5 text-center truncate">
                    weekbook.onrender.com
                  </div>
                </div>
                <img
                  src={weekbookScreenshot}
                  alt="Weekbook app screenshot"
                  className="w-full h-auto object-cover object-top"
                  data-testid="img-weekbook-screenshot"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
