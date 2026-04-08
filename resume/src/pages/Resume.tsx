import { useState, useEffect, useRef } from "react";
import { SiGithub } from "react-icons/si";
import { Mail, MapPin, Globe, ExternalLink, Linkedin, Moon, Sun, ChevronDown, ChevronUp, Download, Loader2 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDFDocument } from "@/components/ResumePDF";

const RESUME_DATA = {
  name: "Omer Siddiqui",
  title: "Senior Frontend Engineer",
  subtitle: "TypeScript · React & Next.js · Java · PostgreSQL",
  location: "Dallas, Texas",
  email: "oasiddiqui1@gmail.com",
  linkedin: "linkedin.com/in/omerasiddiqui",
  linkedinUrl: "https://www.linkedin.com/in/omerasiddiqui",
  github: "github.com/omerskywalker",
  githubUrl: "https://www.github.com/omerskywalker",
  website: "www.omersiddiqui.com",
  websiteUrl: "https://www.omersiddiqui.com",
  summary:
    "Senior Frontend Engineer with 6+ years of experience building and operating production web applications across fintech and large-scale consumer platforms (3.5M+ DAU). Specializes in React and TypeScript, with a strong focus on accessibility (WCAG), performance optimization, and scalable component architecture. Experienced leading major frontend features end-to-end — from design collaboration through deployment and production support — while improving reliability, code quality, and engineering processes in fast-moving environments.",
  experience: [
    {
      company: "JPMorgan Chase",
      role: "Software Engineer III",
      period: "February 2026 – Present",
      location: "Plano, TX",
      bullets: [
        "Led front-end development for a custom Money Movement web application serving Commercial & Investment Bank clients.",
        "Designed and built internal tooling to streamline operational workflows, improving efficiency and reducing manual processing overhead.",
        "Partnered cross-functionally with product, design, backend engineering, and QA to deliver high-quality features in an agile environment with rapid release cycles.",
        "Contributed to UI architecture decisions, ensuring scalable, maintainable, and performant front-end systems.",
      ],
    },
    {
      company: "Launchpad Labs",
      role: "Software Engineer (Front End / Full Stack)",
      period: "March 2024 – October 2025",
      location: "Remote",
      bullets: [
        "Contributed to the design and development of a software education platform focused on modern web-based learning tools, involved across the full development lifecycle.",
        "Built front-end experiences using Next.js, implemented APIs and data flows with GraphQL, and worked with AWS for deployment and infrastructure.",
        "Collaborated with non-technical stakeholders to translate requirements into scalable, user-friendly features.",
        "Supported performance, reliability, and ongoing iteration across the product.",
      ],
    },
    {
      company: "Macy's Technologies",
      role: "Software Engineer",
      period: "December 2021 – September 2023",
      location: "Remote",
      bullets: [
        "Developed product recommendation features for macys.com and bloomingdales.com serving 3.5M daily active users.",
        "Built and integrated 'Recently Viewed,' 'Recommended,' and 'Frequently Bought Together' carousels across PDPs, search, homepage, and checkout.",
        "Collaborated cross-functionally across domains with the PROS (Product Recommendations) team to deliver personalization features that improved engagement.",
        "Contributed to a proprietary component-based UI framework with a strong focus on performance, accessibility, and design consistency.",
      ],
    },
    {
      company: "Lumen Technologies",
      role: "Senior Software Engineer",
      period: "April 2021 – December 2023",
      location: "Remote",
      bullets: [
        "Built internal productivity applications supporting 30K+ employees across network operations, customer service, and telecom provisioning, with highest-traffic tools handling ~3K requests daily.",
        "Developed RPA-integrated automation tools that eliminated manual Excel workflows, reducing task completion time from hours to minutes and saving hundreds of thousands in operational costs.",
        "Engineered full-stack features using Java/Spring Boot and Oracle SQL, designing RESTful APIs, implementing MVC architecture, and enforcing role-based access control.",
        "Owned DevOps workflows including Kubernetes/Docker deployments, Jenkins CI/CD pipelines, uptime monitoring, and onboarding for 10+ engineers.",
        "Led migration of enterprise blockchain UI from Angular.js to React.js and backend from Spring Boot to Node.js.",
      ],
    },
    {
      company: "CenturyLink",
      role: "Frontend Web Developer",
      period: "September 2018 – April 2021",
      location: "Denver, CO",
      bullets: [
        "Architected a modular component library (15–20 reusable React components) adopted as team standard, accelerating feature development across internal tooling used by 20K users.",
        "Improved application performance through modularization and DRY principles, enabling rapid rollout of similar use cases across business units.",
        "Delivered cross-browser compatibility (including legacy IE support) and responsive tablet-friendly designs with accessibility features (ARIA labels, WCAG compliance).",
        "Led design and development of client-facing code, guiding a team of 2–4 onshore and offshore developers.",
      ],
    },
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "Material UI", "CodeMirror 6"],
    stateManagement: ["Redux", "Zustand", "React Query"],
    architecture: ["Component Architecture", "Design Systems", "SPA/SSR", "Responsive Design", "Core Web Vitals", "Accessibility (WCAG)", "Performance Optimization"],
    testing: ["Jest", "React Testing Library", "Cypress"],
    backend: ["Node.js / Express", "REST & GraphQL APIs", "WebSockets", "PostgreSQL", "MongoDB", "Redis / Upstash", "AWS S3", "Twilio"],
    devops: ["Git", "AWS", "Docker", "CI/CD", "Jenkins", "GitHub Actions", "Kubernetes", "Vercel"],
    tools: ["Figma", "UiPath (RPA)", "HyperLedger Fabric"],
  },
  personalProjects: [
    {
      title: "Parchment",
      subtitle: "Minimalist Blogging Platform",
      description:
        "A publishing platform for independent writers focused on words over algorithms. Built end-to-end with a rich feature set.",
      url: "https://parchment-blog.vercel.app",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Upstash Redis", "AWS S3"],
      features: [
        "CodeMirror 6 markdown editor with live preview",
        "Scheduled publishing via daily cron (9 AM UTC)",
        "Full-text search powered by PostgreSQL tsvector",
        "Dynamic OpenGraph images (1200×630) per post",
        "OAuth via Google & GitHub with account linking",
        "Rate-limited auth via Upstash Redis sliding window",
        "RSS feed, XML sitemap, cursor-based pagination",
      ],
    },
    {
      title: "Weekbook",
      subtitle: "SMS-driven Social App",
      description:
        "A calm, authenticity-first social app. Users reply to short prompts via SMS throughout the week; entries stay private until distilled into a public weekly wrap.",
      url: "https://weekbook.onrender.com",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Twilio", "AWS S3"],
      features: [
        "SMS-driven weekly prompt responses via Twilio",
        "Private entries automatically transformed into public weekly wraps",
        "Follow graph with a personalized digest feed",
        "Photo uploads with S3-backed storage",
      ],
    },
  ],
  openSource: [
    {
      title: "StratumV2 – Bitcoin Mining Protocol",
      type: "Open Source",
      description:
        "Contributed a media hub feature with embedded media (podcasts, articles, educational content). Refined VuePress UI components and documented setup for future maintainers.",
      url: "https://stratumprotocol.org",
    },
    {
      title: "Bitcoin.org – Hardware Wallet Docs",
      type: "Open Source",
      description:
        "Led a 6-week process to add SeedSigner hardware wallet to official Bitcoin.org documentation, coordinating between project maintainer and reviewers to meet specs for image optimization, feature flags, and compliance guidelines.",
      url: "https://bitcoin.org",
    },
  ],
  philosophy: {
    quote:
      "I'd rather have an uncomfortable conversation about scope today than explain a rewrite in six months. The shortcut always has a return address.",
    principles: [
      {
        title: "High-Stakes Environments",
        body: "Fintech and large-scale e-commerce shape the work — failure has a real cost, and that pressure sharpens every decision.",
      },
      {
        title: "End-to-End Ownership",
        body: "From Figma designs and database schemas to APIs, UI, observability, and deployment — I own the full problem, not just my slice.",
      },
      {
        title: "Systems Meant to Last",
        body: "Documentation is core to the work. Code is written with the next engineer in mind. Shortcuts have a return address.",
      },
    ],
  },
  education: {
    school: "University of Louisiana at Monroe",
    degree: "Business Administration and Management",
    period: "2009 – 2013",
  },
};

function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SkillPill({ label }: { label: string }) {
  return (
    <span
      data-testid={`skill-${label.toLowerCase().replace(/[\s/()]/g, "-")}`}
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors duration-200"
    >
      {label}
    </span>
  );
}

function ExperienceCard({ exp, index }: { exp: typeof RESUME_DATA.experience[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      data-testid={`experience-${exp.company.toLowerCase().replace(/\s+/g, "-")}`}
      className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-primary mt-1.5 shrink-0 ring-4 ring-primary/20" />
          {index < RESUME_DATA.experience.length - 1 && (
            <div className="w-0.5 bg-border flex-1 mt-2" />
          )}
        </div>
        <div className="pb-8 flex-1">
          <div
            className="bg-card border border-card-border rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-primary/30 cursor-pointer group"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-medium text-primary text-sm">{exp.company}</span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{exp.location}
                  </span>
                  <span className="text-muted-foreground text-xs">{exp.period}</span>
                </div>
              </div>
              <button
                data-testid={`expand-${exp.company.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 shrink-0"
                aria-label={expanded ? "Collapse" : "Expand"}
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {expanded && (
              <ul className="mt-4 space-y-2 border-t border-border pt-4">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 shrink-0">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ proj, index }: { proj: typeof RESUME_DATA.personalProjects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      data-testid={`project-${proj.title.toLowerCase()}`}
      className="bg-card border border-card-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{proj.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{proj.subtitle}</p>
          </div>
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`project-link-${index}`}
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-primary transition-colors shrink-0 mt-0.5 p-1.5 rounded-lg hover:bg-primary/5"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{proj.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {proj.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          data-testid={`toggle-features-${proj.title.toLowerCase()}`}
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? "Hide features" : `Show all ${proj.features.length} features`}
        </button>

        {expanded && (
          <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
            {proj.features.map((feature, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Resume() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("resume-dark-mode");
    if (stored !== null) {
      setDarkMode(stored === "true");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("resume-dark-mode", String(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <img
            src={`${import.meta.env.BASE_URL}${darkMode ? "favicon.svg" : "favicon-light.svg"}`}
            alt="OS"
            className="w-8 h-8 rounded-lg transition-all duration-300"
          />
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${RESUME_DATA.email}`}
              data-testid="nav-email"
              className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
            >
              <Mail className="w-3.5 h-3.5" />
              {RESUME_DATA.email}
            </a>
            <button
              data-testid="toggle-dark-mode"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <PDFDownloadLink
              document={<ResumePDFDocument />}
              fileName="Omer_Siddiqui_Resume.pdf"
            >
              {({ loading }) => (
                <button
                  data-testid="download-pdf"
                  disabled={loading}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-60 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all duration-200"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">{loading ? "Building…" : "Download PDF"}</span>
                  <span className="sm:hidden">{loading ? "…" : "PDF"}</span>
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <section className="mb-14" data-testid="hero-section">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="animate-fade-in-up opacity-0-init">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Open to opportunities
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-2">
                {RESUME_DATA.name}
              </h1>
              <p className="text-xl sm:text-2xl text-primary font-medium mb-1">{RESUME_DATA.title}</p>
              <p className="text-sm text-muted-foreground mb-5">{RESUME_DATA.subtitle}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href={`mailto:${RESUME_DATA.email}`}
                    data-testid="contact-email"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    {RESUME_DATA.email}
                  </a>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {RESUME_DATA.location}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={RESUME_DATA.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-linkedin"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4 shrink-0" />
                    LinkedIn
                  </a>
                  <a
                    href={RESUME_DATA.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-github"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <SiGithub className="w-4 h-4 shrink-0" />
                    GitHub
                  </a>
                  <a
                    href={RESUME_DATA.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-website"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Globe className="w-4 h-4 shrink-0" />
                    Portfolio
                  </a>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="animate-fade-in-up opacity-0-init delay-200 flex flex-row sm:flex-col gap-4 sm:gap-3">
              {[
                { value: "6+", label: "Years Experience" },
                { value: "3.5M", label: "Daily Users Served" },
                { value: "30K+", label: "Employees Supported" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-card border border-card-border rounded-xl px-4 py-3 min-w-[90px]">
                  <div className="text-2xl font-bold text-primary leading-none">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary */}
        <AnimatedSection className="mb-12">
          <SectionHeading title="Summary" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-3xl">
            {RESUME_DATA.summary}
          </p>
        </AnimatedSection>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left: Experience + Projects */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience */}
            <AnimatedSection>
              <SectionHeading title="Experience" />
              <div>
                {RESUME_DATA.experience.map((exp, index) => (
                  <ExperienceCard key={exp.company + exp.role} exp={exp} index={index} />
                ))}
              </div>
            </AnimatedSection>

            {/* Personal Projects */}
            <AnimatedSection>
              <SectionHeading title="Personal Projects" />
              <div className="space-y-4">
                {RESUME_DATA.personalProjects.map((proj, i) => (
                  <ProjectCard key={proj.title} proj={proj} index={i} />
                ))}
              </div>
            </AnimatedSection>

            {/* Open Source */}
            <AnimatedSection>
              <SectionHeading title="Open Source" />
              <div className="space-y-4">
                {RESUME_DATA.openSource.map((proj, i) => (
                  <div
                    key={proj.title}
                    data-testid={`open-source-${i}`}
                    className="bg-card border border-card-border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-xs font-medium text-primary/70 uppercase tracking-wider">{proj.type}</span>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{proj.title}</h3>
                      </div>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`open-source-link-${i}`}
                        className="text-muted-foreground hover:text-primary transition-colors shrink-0 mt-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Philosophy */}
            <AnimatedSection>
              <SectionHeading title="How I Work" />
              <blockquote className="border-l-2 border-primary pl-4 mb-6">
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  "{RESUME_DATA.philosophy.quote}"
                </p>
              </blockquote>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {RESUME_DATA.philosophy.principles.map((p) => (
                  <div
                    key={p.title}
                    data-testid={`principle-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-card border border-card-border rounded-xl p-4"
                  >
                    <h4 className="font-medium text-foreground text-sm mb-1.5">{p.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Skills + Education + Links */}
          <div className="lg:col-span-1 space-y-8">
            <AnimatedSection delay={100}>
              <SectionHeading title="Skills" />
              <div className="space-y-5">
                <SkillGroup title="Frontend" skills={RESUME_DATA.skills.frontend} />
                <SkillGroup title="State Management" skills={RESUME_DATA.skills.stateManagement} />
                <SkillGroup title="Architecture & QA" skills={RESUME_DATA.skills.architecture} />
                <SkillGroup title="Testing" skills={RESUME_DATA.skills.testing} />
                <SkillGroup title="Backend & Data" skills={RESUME_DATA.skills.backend} />
                <SkillGroup title="Cloud & DevOps" skills={RESUME_DATA.skills.devops} />
              </div>
            </AnimatedSection>

            {/* Education */}
            <AnimatedSection delay={200}>
              <SectionHeading title="Education" />
              <div
                data-testid="education-section"
                className="bg-card border border-card-border rounded-xl p-5"
              >
                <p className="font-semibold text-foreground text-sm">{RESUME_DATA.education.school}</p>
                <p className="text-muted-foreground text-sm mt-1">{RESUME_DATA.education.degree}</p>
                <p className="text-muted-foreground text-xs mt-1">{RESUME_DATA.education.period}</p>
              </div>
            </AnimatedSection>

            {/* Links */}
            <AnimatedSection delay={300}>
              <SectionHeading title="Links" />
              <div className="space-y-2">
                {[
                  { label: "Portfolio", url: RESUME_DATA.websiteUrl, icon: <Globe className="w-4 h-4" /> },
                  { label: "LinkedIn", url: RESUME_DATA.linkedinUrl, icon: <Linkedin className="w-4 h-4" /> },
                  { label: "GitHub", url: RESUME_DATA.githubUrl, icon: <SiGithub className="w-4 h-4" /> },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-${link.label.toLowerCase()}`}
                    className="flex items-center gap-3 p-3 bg-card border border-card-border rounded-xl text-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    <span className="text-primary">{link.icon}</span>
                    <span className="group-hover:text-primary transition-colors">{link.label}</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {RESUME_DATA.name}
          </p>
          <a
            href={RESUME_DATA.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-website"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            {RESUME_DATA.website}
          </a>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div data-testid={`skill-group-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <p className="text-xs font-medium text-muted-foreground mb-2">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <SkillPill key={skill} label={skill} />
        ))}
      </div>
    </div>
  );
}
