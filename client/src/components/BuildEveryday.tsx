import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, GitCommit } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsData {
  contributions: ContributionDay[];
  total: { [year: string]: number };
}

interface RecentCommit {
  message: string;
  repo: string;
  sha: string;
  date: string;
}

function ContribGrid({ contributions }: { contributions: ContributionDay[] }) {
  const padded = [...contributions];
  while (padded.length % 7 !== 0) {
    padded.unshift({ date: "", count: 0, level: 0 });
  }
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  const levelClass = ["gh-cell-0", "gh-cell-1", "gh-cell-2", "gh-cell-3", "gh-cell-4"] as const;

  return (
    <div className="flex gap-[3px] md:gap-[3px] overflow-x-auto justify-center">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day, di) => (
            <div
              key={di}
              className={`w-[14px] h-[14px] md:w-3 md:h-3 rounded-sm ${levelClass[day.level]} transition-opacity`}
              title={day.date ? `${day.date}: ${day.count} contributions` : ""}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function BuildEveryday() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { data: contribData, isLoading: loadingContribs } = useQuery<ContributionsData>({
    queryKey: ["/api/github/contributions"],
  });

  const { data: recentCommits } = useQuery<RecentCommit[]>({
    queryKey: ["/api/github/recent-commits"],
  });

  const filteredContribs = (contribData?.contributions ?? []).filter(
    (d) => d.date >= "2026-01-26"
  );
  const totalLast = contribData?.total
    ? Object.values(contribData.total).reduce((a, b) => a + b, 0)
    : 0;

  const commits = (recentCommits ?? []).slice(0, 3);

  return (
    <section id="build" className="py-12 md:py-20 px-6 bg-muted/20" data-testid="section-build">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="font-mono text-sm text-primary/80 tracking-wider mb-4">— proof of work</p>
          <h2 className="font-display font-semibold text-foreground leading-tight" style={{ fontSize: "clamp(2rem, 8vw, 3.75rem)" }}>
            Build
            <br />
            <span className="text-primary italic">everyday.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg font-sans">
            Shipping code is a habit. Every square is a day I showed up.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-xl border border-border/60 bg-card overflow-hidden"
          data-testid="div-contrib-chart"
        >
          <div className="flex flex-col md:grid md:grid-cols-2 md:divide-x divide-border/60">
            {/* Left — contribution chart */}
            <div className="p-5 md:p-5 flex flex-col gap-4 border-b md:border-b-0 border-border/60">
              <div className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-2 text-center md:text-left">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-muted-foreground" />
                  <a
                    href="https://github.com/omerskywalker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-github-profile"
                  >
                    github.com/omerskywalker
                  </a>
                </div>
                {totalLast > 0 && (
                  <span className="font-mono text-xs text-muted-foreground">
                    <span className="text-foreground font-medium">{totalLast}</span> contributions
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="flex justify-center">
                  {loadingContribs ? (
                    <div className="flex gap-[3px]">
                      {Array.from({ length: 14 }).map((_, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {Array.from({ length: 7 }).map((_, di) => (
                            <div
                              key={di}
                              className="w-[14px] h-[14px] md:w-3 md:h-3 rounded-sm bg-muted animate-pulse"
                              style={{ animationDelay: `${(wi * 7 + di) * 5}ms` }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ContribGrid contributions={filteredContribs} />
                  )}
                </div>

                <div className="flex items-center gap-1.5 justify-center">
                  <span className="text-xs text-muted-foreground font-mono">Less</span>
                  {[0, 1, 2, 3, 4].map((l) => (
                    <div key={l} className={`w-[14px] h-[14px] md:w-3 md:h-3 rounded-sm gh-cell-${l}`} />
                  ))}
                  <span className="text-xs text-muted-foreground font-mono">More</span>
                </div>
              </div>
            </div>

            {/* Right — 3 recent commits, evenly spaced to fill height */}
            <div className="p-5 flex flex-col">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Recent commits
              </p>
              <div className="flex flex-col flex-1 justify-between">
                {commits.length > 0
                  ? commits.map((commit, i) => (
                      <motion.div
                        key={`${commit.sha}-${i}`}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07, duration: 0.4 }}
                        className="flex items-start gap-3"
                        data-testid={`div-commit-${i}`}
                      >
                        <GitCommit className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <div className="font-mono text-sm min-w-0 flex-1">
                          <p className="text-foreground truncate leading-snug">{commit.message}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <a
                              href={`https://github.com/omerskywalker/${commit.repo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-xs"
                              data-testid={`link-commit-repo-${i}`}
                            >
                              {commit.repo}
                            </a>
                            <span className="text-muted-foreground/50 text-xs">{commit.sha}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  : Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-3.5 h-3.5 rounded-full bg-muted animate-pulse mt-0.5 shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 bg-muted animate-pulse rounded w-4/5" />
                          <div className="h-2.5 bg-muted animate-pulse rounded w-2/5" />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
