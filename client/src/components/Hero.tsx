import { Button } from "@/components/ui/button";
import { Mail, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import profilePhoto from "@assets/omerskywalker_1762452408837.jpeg";

const DAYS = Math.floor(
  (new Date().getTime() - new Date("2018-09-05").getTime()) / (1000 * 60 * 60 * 24)
);

function FlipDigit({ from, to, delay }: { from: string; to: string; delay: number }) {
  const controls = useAnimationControls();
  const [displayed, setDisplayed] = useState(from);
  const shouldFlip = from !== to;

  useEffect(() => {
    if (!shouldFlip) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      await controls.start({
        rotateX: 90,
        transition: { duration: 0.38, ease: "easeIn" },
      });
      if (cancelled) return;
      setDisplayed(to);
      controls.set({ rotateX: -90 });
      await controls.start({
        rotateX: 0,
        transition: { duration: 0.48, ease: "easeOut" },
      });
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.span
      animate={controls}
      style={{
        display: "inline-block",
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontWeight: 800,
        fontSize: "1.05em",
        lineHeight: 1,
        background: "#ffffff",
        color: "#0a0a0a",
        padding: "0.15em 0.22em",
        borderRadius: "3px",
        minWidth: "0.7em",
        textAlign: "center",
        boxShadow:
          "0 2px 5px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.8)",
        backgroundImage:
          "linear-gradient(to bottom, #f9f9f9 0%, #ffffff 48%, #cccccc 48%, #cccccc 52%, #f0f0f0 52%, #f9f9f9 100%)",
        transformStyle: "preserve-3d",
        perspective: "300px",
        verticalAlign: "middle",
      }}
    >
      {displayed}
    </motion.span>
  );
}

function FlipCounter({ value }: { value: number }) {
  const toStr = String(value);
  const fromStr = String(value - 1).padStart(toStr.length, "0");

  return (
    <span
      style={{
        display: "inline-flex",
        gap: "2px",
        verticalAlign: "middle",
        position: "relative",
        top: "-1px",
      }}
    >
      {toStr.split("").map((toChar, i) => {
        const fromChar = fromStr[i];
        const isChanging = toChar !== fromChar;
        const rightDistance = toStr.length - 1 - i;
        const delay = isChanging ? 900 + rightDistance * 100 : 0;
        return (
          <FlipDigit key={i} from={fromChar} to={toChar} delay={delay} />
        );
      })}
    </span>
  );
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const { data: contribData } = useQuery<{
    contributions: Array<{ date: string; count: number }>;
  }>({ queryKey: ["/api/github/contributions"] });

  const thisYear = new Date().getFullYear().toString();
  const commitsThisYear = contribData
    ? contribData.contributions
        .filter((d) => d.date.startsWith(thisYear))
        .reduce((sum, d) => sum + d.count, 0)
    : null;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const parallaxY = scrollY * 0.35;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-background"
      data-testid="section-hero"
    >
      {/* Diagonal background shape */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/15 dark:via-primary/5"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 82%)",
          transform: `translateY(${parallaxY * 0.2}px)`,
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main hero content */}
      <div
        className="relative z-10 min-h-screen flex items-center px-6 md:px-12"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center pt-16">
          {/* Text column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="font-mono text-sm text-primary/80 mb-3 tracking-wider">
                — software engineer
              </p>
              <h1
                className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.9] tracking-tight text-foreground"
                data-testid="text-name"
              >
                Omer
                <br />
                <span className="text-primary italic">Siddiqui</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground max-w-md leading-relaxed font-sans"
              data-testid="text-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <FlipCounter value={DAYS} />{" "}
              days of writing code that actually works — on my machine and yours.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="gap-2 font-sans bg-primary text-primary-foreground hover:brightness-90"
                onClick={() => scrollTo("contact")}
                data-testid="button-contact"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </Button>
            </motion.div>

            <motion.div
              className="flex gap-6 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[
                { label: "7+", sub: "years" },
                { label: "1M+", sub: "users served" },
                { label: "4", sub: "industries" },
                {
                  label: commitsThisYear !== null ? `${commitsThisYear}+` : "—",
                  sub: "commits this year",
                },
              ].map((stat) => (
                <div key={stat.sub} className="text-center" data-testid={`stat-${stat.sub.replace(/\s+/g, "-")}`}>
                  <div className="text-2xl font-display font-semibold text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div
            className="flex justify-center md:justify-end pb-12 md:pb-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
              <img
                src={profilePhoto}
                alt="Omer Siddiqui"
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-2 border-primary/20"
                data-testid="img-profile-photo"
              />
              <div className="absolute -bottom-3 -right-3 bg-card border border-border rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground">
                    Texas, US
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        data-testid="button-scroll-down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs font-mono uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
