import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const ACCENT = "#2563EB";
const DARK = "#0F172A";
const MID = "#334155";
const LIGHT = "#64748B";
const RULE = "#E2E8F0";
const BG_ACCENT = "#EFF6FF";
const BORDER_ACCENT = "#BFDBFE";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingBottom: 36,
    paddingHorizontal: 44,
    color: DARK,
  },
  // Header
  header: {
    marginBottom: 18,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    letterSpacing: -0.5,
    lineHeight: 1.2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 6,
    gap: 6,
  },
  title: {
    fontSize: 13,
    color: ACCENT,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 9,
    color: LIGHT,
    marginTop: 2,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    alignItems: "center",
  },
  contactItem: {
    fontSize: 8.5,
    color: LIGHT,
  },
  contactLink: {
    fontSize: 8.5,
    color: ACCENT,
    textDecoration: "none",
  },
  contactDot: {
    fontSize: 8.5,
    color: RULE,
  },
  // Divider
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: RULE,
    marginVertical: 12,
  },
  // Section
  section: {
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: LIGHT,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginRight: 8,
  },
  sectionRule: {
    flex: 1,
    borderBottomWidth: 0.75,
    borderBottomColor: RULE,
  },
  // Experience
  expItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  expRole: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  expPeriod: {
    fontSize: 8,
    color: LIGHT,
  },
  expCompanyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  expCompany: {
    fontSize: 9,
    color: ACCENT,
    fontFamily: "Helvetica-Bold",
  },
  expLocation: {
    fontSize: 8,
    color: LIGHT,
  },
  bullet: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 2.5,
    paddingLeft: 2,
  },
  bulletArrow: {
    fontSize: 8.5,
    color: ACCENT,
    lineHeight: 1.4,
    marginTop: 0.5,
    width: 8,
    flexShrink: 0,
  },
  bulletText: {
    fontSize: 8.5,
    color: MID,
    lineHeight: 1.5,
    flex: 1,
  },
  // Two-column layout
  columns: {
    flexDirection: "row",
    gap: 16,
  },
  leftCol: {
    flex: 2,
  },
  rightCol: {
    flex: 1,
  },
  // Skills
  skillGroup: {
    marginBottom: 8,
  },
  skillGroupTitle: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: LIGHT,
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  skillPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillPill: {
    backgroundColor: BG_ACCENT,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 0.5,
    borderColor: BORDER_ACCENT,
  },
  skillPillText: {
    fontSize: 7,
    color: ACCENT,
  },
  // Project
  projectItem: {
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 1.5,
    borderLeftColor: ACCENT,
  },
  projectTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  projectSubtitle: {
    fontSize: 8,
    color: LIGHT,
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 8.5,
    color: MID,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginBottom: 3,
  },
  techBadge: {
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderWidth: 0.5,
    borderColor: RULE,
  },
  techText: {
    fontSize: 7,
    color: MID,
  },
  // Open source
  osItem: {
    marginBottom: 6,
  },
  osTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  osDescription: {
    fontSize: 8.5,
    color: MID,
    lineHeight: 1.5,
  },
  // Philosophy quote
  quoteBox: {
    backgroundColor: BG_ACCENT,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    borderLeftWidth: 2,
    borderLeftColor: ACCENT,
  },
  quoteText: {
    fontSize: 8.5,
    color: MID,
    fontFamily: "Helvetica-Oblique",
    lineHeight: 1.5,
  },
  // Education
  eduBlock: {
    backgroundColor: "#F8FAFC",
    borderRadius: 4,
    padding: 8,
    borderWidth: 0.5,
    borderColor: RULE,
  },
  eduSchool: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  eduDegree: {
    fontSize: 8.5,
    color: MID,
    marginTop: 1,
  },
  eduPeriod: {
    fontSize: 8,
    color: LIGHT,
    marginTop: 1,
  },
  // Links
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: "#F8FAFC",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: RULE,
  },
  linkLabel: {
    fontSize: 8.5,
    color: MID,
    flex: 1,
  },
  linkUrl: {
    fontSize: 7.5,
    color: ACCENT,
    textDecoration: "none",
  },
  // Summary
  summaryText: {
    fontSize: 9,
    color: MID,
    lineHeight: 1.6,
  },
  // Stats row
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: BG_ACCENT,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: BORDER_ACCENT,
    padding: 8,
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 7,
    color: LIGHT,
    marginTop: 2,
    textAlign: "center",
  },
});

const RESUME = {
  name: "Omer Siddiqui",
  title: "Senior Frontend Engineer",
  subtitle: "TypeScript · React & Next.js · Java · PostgreSQL",
  email: "oasiddiqui1@gmail.com",
  phone: "318-503-5641",
  location: "Dallas, Texas",
  linkedinUrl: "https://www.linkedin.com/in/omerasiddiqui",
  githubUrl: "https://www.github.com/omerskywalker",
  websiteUrl: "https://www.omersiddiqui.com",
  summary:
    "Senior Frontend Engineer with 6+ years of experience building and operating production web applications across fintech and large-scale consumer platforms (3.5M+ DAU). Specializes in React and TypeScript, with a strong focus on accessibility (WCAG), performance optimization, and scalable component architecture. Experienced leading major frontend features end-to-end — from design collaboration through deployment and production support.",
  experience: [
    {
      company: "JPMorgan Chase",
      role: "Software Engineer III",
      period: "Feb 2026 – Present",
      location: "Plano, TX",
      bullets: [
        "Led front-end development for a custom Money Movement web application serving Commercial & Investment Bank clients.",
        "Designed and built internal tooling to streamline operational workflows, improving efficiency and reducing manual processing overhead.",
        "Partnered with product, design, backend engineering, and QA to deliver high-quality features in an agile environment.",
        "Contributed to UI architecture decisions ensuring scalable, maintainable, and performant front-end systems.",
      ],
    },
    {
      company: "Launchpad Labs",
      role: "Software Engineer (Front End / Full Stack)",
      period: "Mar 2024 – Oct 2025",
      location: "Remote",
      bullets: [
        "Built front-end experiences using Next.js, implemented APIs and data flows with GraphQL, and worked with AWS for deployment.",
        "Collaborated with non-technical stakeholders to translate requirements into scalable, user-friendly features.",
        "Supported performance, reliability, and ongoing iteration across a software education platform.",
      ],
    },
    {
      company: "Macy's Technologies",
      role: "Software Engineer",
      period: "Dec 2021 – Sep 2023",
      location: "Remote",
      bullets: [
        "Developed product recommendation features for macys.com and bloomingdales.com serving 3.5M daily active users.",
        "Built 'Recently Viewed,' 'Recommended,' and 'Frequently Bought Together' carousels across PDPs, search, homepage, and checkout.",
        "Contributed to a proprietary component-based UI framework focused on performance, accessibility, and design consistency.",
      ],
    },
    {
      company: "Lumen Technologies",
      role: "Senior Software Engineer",
      period: "Apr 2021 – Dec 2023",
      location: "Remote",
      bullets: [
        "Built internal applications supporting 30K+ employees; highest-traffic tools handling ~3K requests daily.",
        "Developed RPA automation tools that reduced task completion time from hours to minutes, saving hundreds of thousands in operational costs.",
        "Engineered full-stack features using Java/Spring Boot and Oracle SQL; designed RESTful APIs with role-based access control.",
        "Owned DevOps workflows: Kubernetes/Docker deployments, Jenkins CI/CD pipelines, and onboarding for 10+ engineers.",
      ],
    },
    {
      company: "CenturyLink",
      role: "Frontend Web Developer",
      period: "Sep 2018 – Apr 2021",
      location: "Denver, CO",
      bullets: [
        "Architected a modular component library (15–20 reusable React components) adopted as team standard, used by 20K+ users.",
        "Delivered cross-browser compatibility (including legacy IE) and responsive designs with ARIA labels and WCAG compliance.",
        "Led a team of 2–4 onshore and offshore developers building and maintaining internal enterprise applications.",
      ],
    },
  ],
  skills: {
    "Frontend": ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "Material UI", "CodeMirror 6"],
    "State Mgmt": ["Redux", "Zustand", "React Query"],
    "Backend & Data": ["Node.js/Express", "REST & GraphQL", "PostgreSQL", "MongoDB", "Redis/Upstash", "Java/Spring Boot"],
    "Testing": ["Jest", "React Testing Library", "Cypress"],
    "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitHub Actions", "Vercel"],
  },
  personalProjects: [
    {
      title: "Parchment",
      subtitle: "Minimalist Blogging Platform",
      description: "End-to-end publishing platform for independent writers. CodeMirror 6 markdown editor, scheduled publishing, PostgreSQL full-text search, dynamic OpenGraph images, OAuth (Google/GitHub), rate-limited auth via Upstash Redis.",
      url: "https://parchment-blog.vercel.app",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Upstash Redis", "AWS S3"],
    },
    {
      title: "Weekbook",
      subtitle: "SMS-driven Social App",
      description: "Authenticity-first social platform. Users reply to weekly prompts via SMS (Twilio); entries stay private until distilled into a public weekly wrap. Follow graph, personalized feed, and S3-backed photo uploads.",
      url: "https://weekbook.onrender.com",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Twilio", "AWS S3"],
    },
  ],
  openSource: [
    {
      title: "StratumV2 – Bitcoin Mining Protocol",
      description: "Contributed media hub feature with embedded podcasts, articles, and educational content. Refined VuePress UI components.",
    },
    {
      title: "Bitcoin.org – Hardware Wallet Docs",
      description: "Led 6-week process to add SeedSigner to official Bitcoin.org documentation, coordinating with maintainers on image optimization, feature flags, and compliance.",
    },
  ],
  quote: "I'd rather have an uncomfortable conversation about scope today than explain a rewrite in six months. The shortcut always has a return address.",
  education: {
    school: "University of Louisiana at Monroe",
    degree: "Business Administration and Management",
    period: "2009 – 2013",
  },
};

export function ResumePDFDocument() {
  return (
    <Document
      title={`${RESUME.name} — Resume`}
      author={RESUME.name}
      subject="Senior Frontend Engineer Resume"
      keywords="React, TypeScript, Next.js, Frontend Engineer, Software Engineer"
      language="en"
      creator="omersiddiqui.com"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{RESUME.name}</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{RESUME.title}</Text>
          </View>
          <Text style={styles.subtitle}>{RESUME.subtitle}</Text>
          <View style={styles.contactRow}>
            <Link src={`mailto:${RESUME.email}`} style={styles.contactLink}>{RESUME.email}</Link>
            <Text style={styles.contactDot}> · </Text>
            <Text style={styles.contactItem}>{RESUME.phone}</Text>
            <Text style={styles.contactDot}> · </Text>
            <Text style={styles.contactItem}>{RESUME.location}</Text>
            <Text style={styles.contactDot}> · </Text>
            <Link src={RESUME.linkedinUrl} style={styles.contactLink}>linkedin.com/in/omerasiddiqui</Link>
            <Text style={styles.contactDot}> · </Text>
            <Link src={RESUME.githubUrl} style={styles.contactLink}>github.com/omerskywalker</Link>
            <Text style={styles.contactDot}> · </Text>
            <Link src={RESUME.websiteUrl} style={styles.contactLink}>omersiddiqui.com</Link>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { value: "6+", label: "Years Experience" },
            { value: "3.5M", label: "Daily Active Users" },
            { value: "30K+", label: "Employees Supported" },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.sectionRule} />
          </View>
          <Text style={styles.summaryText}>{RESUME.summary}</Text>
        </View>

        {/* Two-column */}
        <View style={styles.columns}>
          {/* Left: Experience + Projects */}
          <View style={styles.leftCol}>
            {/* Experience */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Experience</Text>
                <View style={styles.sectionRule} />
              </View>
              {RESUME.experience.map((exp) => (
                <View key={exp.company + exp.role} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={styles.expPeriod}>{exp.period}</Text>
                  </View>
                  <View style={styles.expCompanyRow}>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    <Text style={styles.expLocation}>{exp.location}</Text>
                  </View>
                  {exp.bullets.map((bullet, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={styles.bulletArrow}>›</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Personal Projects */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Personal Projects</Text>
                <View style={styles.sectionRule} />
              </View>
              {RESUME.personalProjects.map((proj) => (
                <View key={proj.title} style={styles.projectItem}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                    <Text style={styles.projectTitle}>{proj.title}</Text>
                    <Link src={proj.url} style={styles.linkUrl}>{proj.url.replace("https://", "")}</Link>
                  </View>
                  <Text style={styles.projectSubtitle}>{proj.subtitle}</Text>
                  <Text style={styles.projectDescription}>{proj.description}</Text>
                  <View style={styles.techStack}>
                    {proj.stack.map((tech) => (
                      <View key={tech} style={styles.techBadge}>
                        <Text style={styles.techText}>{tech}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Open Source */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Open Source</Text>
                <View style={styles.sectionRule} />
              </View>
              {RESUME.openSource.map((os) => (
                <View key={os.title} style={[styles.osItem]}>
                  <Text style={styles.osTitle}>{os.title}</Text>
                  <Text style={styles.osDescription}>{os.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right: Skills + Education + Links */}
          <View style={styles.rightCol}>
            {/* Skills */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.sectionRule} />
              </View>
              {Object.entries(RESUME.skills).map(([group, skills]) => (
                <View key={group} style={styles.skillGroup}>
                  <Text style={styles.skillGroupTitle}>{group}</Text>
                  <View style={styles.skillPills}>
                    {skills.map((skill) => (
                      <View key={skill} style={styles.skillPill}>
                        <Text style={styles.skillPillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={[styles.section, { marginTop: 4 }]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Education</Text>
                <View style={styles.sectionRule} />
              </View>
              <View style={styles.eduBlock}>
                <Text style={styles.eduSchool}>{RESUME.education.school}</Text>
                <Text style={styles.eduDegree}>{RESUME.education.degree}</Text>
                <Text style={styles.eduPeriod}>{RESUME.education.period}</Text>
              </View>
            </View>

            {/* Links */}
            <View style={[styles.section, { marginTop: 4 }]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Links</Text>
                <View style={styles.sectionRule} />
              </View>
              {[
                { label: "Portfolio", url: RESUME.websiteUrl, display: "omersiddiqui.com" },
                { label: "LinkedIn", url: RESUME.linkedinUrl, display: "in/omerasiddiqui" },
                { label: "GitHub", url: RESUME.githubUrl, display: "omerskywalker" },
              ].map((link) => (
                <View key={link.label} style={styles.linkItem}>
                  <Text style={styles.linkLabel}>{link.label}</Text>
                  <Link src={link.url} style={styles.linkUrl}>{link.display}</Link>
                </View>
              ))}
            </View>

            {/* Philosophy */}
            <View style={[styles.section, { marginTop: 4 }]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Philosophy</Text>
                <View style={styles.sectionRule} />
              </View>
              <View style={styles.quoteBox}>
                <Text style={styles.quoteText}>"{RESUME.quote}"</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
