import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { useEffect, useState } from "react";
import logoImage from "@assets/logo.svg";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Work", id: "projects" },
  { label: "Build", id: "build" },
  { label: "Approach", id: "approach" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved || "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    if (initial === "light") document.documentElement.classList.add("light");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ["hero", ...navLinks.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.toggle("light", next === "light");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        data-testid="nav-main"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 group"
            data-testid="button-logo"
          >
            <img
              src={logoImage}
              alt="OS"
              className="w-7 h-7 rounded-md opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activeSection === link.id
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <a href="/resume" data-testid="link-resume-nav">
              <Button
                size="sm"
                className="hidden md:flex gap-2 font-sans font-medium border-0 text-black"
                style={{
                  backgroundColor: "hsl(var(--primary))",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </Button>
            </a>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/96 backdrop-blur-xl flex flex-col pt-20 px-6 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left py-3.5 px-4 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover-elevate"
                data-testid={`mobile-nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <a href="/resume">
              <Button size="lg" className="w-full gap-2 font-sans">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
