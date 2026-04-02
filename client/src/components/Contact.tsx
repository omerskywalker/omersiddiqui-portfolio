import { MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profilePhoto from "@assets/omerskywalker_1762452408837.jpeg";

const jsonEntries: {
  key: string;
  value: string;
  href?: string;
  isLast?: boolean;
}[] = [
  { key: "name", value: "Omer Siddiqui" },
  { key: "role", value: "Software Engineer" },
  { key: "location", value: "Dallas, Texas" },
  { key: "status", value: "open_to_work" },
  { key: "email", value: "oasiddiqui1@gmail.com", href: "mailto:oasiddiqui1@gmail.com" },
  { key: "github", value: "github.com/omerskywalker", href: "https://github.com/omerskywalker" },
  { key: "linkedin", value: "linkedin.com/in/omerasiddiqui", href: "https://linkedin.com/in/omerasiddiqui" },
  { key: "twitter", value: "x.com/0merskywalker", href: "https://x.com/0merskywalker", isLast: true },
];

function TerminalWindow() {
  const keyColor = "#bd93f9";
  const valueColor = "#50fa7b";
  const braceColor = "#e2e8f0";
  const colonColor = "#cbd5e1";
  const commaColor = "#94a3b8";
  const commentColor = "#6272a4";

  return (
    <div
      className="rounded-xl transition-shadow hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
      style={{ border: "1px solid rgba(255,255,255,0.08)", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}
      data-testid="card-terminal"
    >
      <div
        className="flex items-center rounded-t-xl shrink-0"
        style={{
          height: "36px",
          backgroundColor: "#1e1e2e",
          padding: "0 16px",
        }}
      >
        <div className="flex items-center" style={{ gap: "8px" }}>
          <span className="rounded-full shrink-0" style={{ width: "12px", height: "12px", backgroundColor: "#FF5F57" }} />
          <span className="rounded-full shrink-0" style={{ width: "12px", height: "12px", backgroundColor: "#FFBD2E" }} />
          <span className="rounded-full shrink-0" style={{ width: "12px", height: "12px", backgroundColor: "#28C840" }} />
        </div>

        <div
          className="flex items-center font-mono ml-auto"
          style={{
            fontSize: "0.75rem",
            color: "#cbd5e1",
            backgroundColor: "#2a2a3e",
            padding: "0 12px",
            height: "36px",
          }}
        >
          <span
            className="rounded-full shrink-0"
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "hsl(var(--primary))",
              marginRight: "8px",
            }}
          />
          omer.contact.json
        </div>
      </div>

      <div
        className="rounded-b-xl font-mono"
        style={{
          backgroundColor: "#13131f",
          padding: "20px 24px",
          fontSize: "0.82rem",
          lineHeight: "1.8",
          flex: 1,
        }}
      >
        <div style={{ color: commentColor, fontStyle: "italic" }}>
          {"// omer.contact.json"}
        </div>
        <div>&nbsp;</div>
        <div style={{ color: braceColor }}>{"{"}</div>
        {jsonEntries.map((entry) => (
          <div key={entry.key} style={{ paddingLeft: "24px" }}>
            <span style={{ color: keyColor }}>{`"${entry.key}"`}</span>
            <span style={{ color: colonColor }}>{": "}</span>
            {entry.href ? (
              <a
                href={entry.href}
                target={entry.href.startsWith("mailto") ? undefined : "_blank"}
                rel={entry.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="transition-colors"
                style={{ color: valueColor, textDecoration: "none", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                  e.currentTarget.style.filter = "brightness(1.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                  e.currentTarget.style.filter = "none";
                }}
                data-testid={`link-${entry.key}`}
              >
                {`"${entry.value}"`}
              </a>
            ) : (
              <span style={{ color: valueColor }}>{`"${entry.value}"`}</span>
            )}
            {!entry.isLast && <span style={{ color: commaColor }}>,</span>}
          </div>
        ))}
        <div>
          <span style={{ color: braceColor }}>{"}"}</span>
          <span
            style={{
              color: "hsl(var(--primary))",
              marginLeft: "4px",
              animation: "blink 1.1s step-end infinite",
            }}
          >
            |
          </span>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function LinkedInCard() {
  return (
    <div
      className="rounded-xl border transition-shadow hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "hsl(var(--card))",
        height: "100%",
        display: "flex",
        flexDirection: "column" as const,
      }}
      data-testid="card-linkedin-profile"
    >
      <div
        className="relative flex items-end justify-end px-6 pb-4 rounded-t-xl"
        style={{
          height: "100px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <div className="text-right">
          <div
            className="font-bold text-white leading-tight"
            style={{ fontSize: "1.1rem", letterSpacing: "0.12em" }}
          >
            OMER SIDDIQUI
          </div>
          <div className="font-mono text-slate-400" style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}>
            SOFTWARE ENGINEER
          </div>
          <div className="font-mono text-slate-500" style={{ fontSize: "0.65rem" }}>
            frontend / backend / systems
          </div>
        </div>

        <img
          src={profilePhoto}
          alt="Omer Siddiqui"
          className="absolute rounded-full object-cover"
          style={{
            width: "80px",
            height: "80px",
            bottom: "-40px",
            left: "20px",
            border: "3px solid hsl(var(--card))",
            zIndex: 1,
          }}
          data-testid="img-linkedin-avatar"
        />
      </div>

      <div style={{ padding: "60px 24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" as const }}>
        <div style={{ marginBottom: "6px" }}>
          <div className="font-bold text-foreground" style={{ fontSize: "1.1rem" }}>
            Omer Siddiqui
          </div>
        </div>
        <div className="text-slate-400" style={{ fontSize: "0.8rem", marginBottom: "6px" }}>
          Dallas, Texas · Software Engineer
        </div>
        <div className="italic text-slate-400" style={{ fontSize: "0.78rem", margin: "4px 0" }}>
          Building production systems since 2018.
        </div>
        <div className="flex items-center gap-1.5" style={{ marginBottom: "6px" }}>
          <span
            className="rounded-full shrink-0"
            style={{ width: "8px", height: "8px", backgroundColor: "#0A66C2" }}
          />
          <span className="font-mono text-slate-400" style={{ fontSize: "0.72rem" }}>
            linkedin.com/in/omerasiddiqui
          </span>
        </div>

        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", margin: "12px 0" }} />

        <div className="font-mono text-slate-400" style={{ fontSize: "0.72rem", marginBottom: "4px" }}>
          6+ years · Fintech · E-commerce · Enterprise
        </div>

        <div style={{ marginTop: "auto" }}>
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", margin: "16px 0" }} />

          <a
            href="https://linkedin.com/in/omerasiddiqui"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2 rounded-md text-white text-sm font-medium transition-all"
            style={{ backgroundColor: "rgba(10,102,194,0.9)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(10,102,194,1)";
              e.currentTarget.style.filter = "brightness(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(10,102,194,0.9)";
              e.currentTarget.style.filter = "none";
            }}
            data-testid="button-view-linkedin"
          >
            View LinkedIn Profile →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="py-12 md:py-20 px-6" data-testid="section-contact">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{ marginBottom: "40px" }}>
            <p className="font-mono text-sm text-primary/80 tracking-wider mb-4">— reach out</p>
            <h2
              className="font-display font-semibold text-foreground leading-tight"
              style={{ fontSize: "clamp(2rem, 8vw, 3.75rem)" }}
              data-testid="text-contact-heading"
            >
              Let's build
              <br />
              <span className="text-primary italic">something.</span>
            </h2>
            <div className="flex items-center mt-4" style={{ gap: "16px" }}>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-muted-foreground/60">Texas, US</span>
              </div>
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Open to work</span>
              </div>
            </div>
          </div>

          <div
            className="grid md:grid-cols-2"
            style={{ gap: "48px", alignItems: "stretch" }}
          >
            <div className="flex flex-col" style={{ height: "100%" }}>
              <TerminalWindow />
            </div>

            <div className="flex flex-col" style={{ height: "100%" }}>
              <LinkedInCard />
            </div>
          </div>
        </motion.div>

        <div className="mt-24 pt-10 border-t border-border">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 text-sm text-muted-foreground font-mono text-center md:text-left">
            <span data-testid="text-copyright">© {currentYear} Omer Siddiqui</span>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-3">
              {[
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "build", label: "Build" },
                { id: "approach", label: "Approach" },
                { id: "contact", label: "Contact" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className="hover:text-foreground transition-colors"
                  data-testid={`footer-link-${id}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
