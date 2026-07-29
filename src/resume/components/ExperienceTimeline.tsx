import type { Locale } from "../types";

type ExperienceItem = {
  id: string;
  company: string;
  companyUrl: string;
  role: string;
  team?: string;
  start: string;
  end: string | null;
  summary: string;
  highlights: string[];
  technologies: string[];
  projects: { id: string; title: string; href: string }[];
};

type ExperienceTimelineProps = {
  locale: Locale;
  experiences: ExperienceItem[];
  archiveHref: string;
};

export function ExperienceTimeline({
  locale,
  experiences,
  archiveHref,
}: ExperienceTimelineProps) {
  const currentLabel = locale === "ko" ? "현재" : "Present";
  const olderLabel =
    locale === "ko" ? "전체 경력 타임라인 보기" : "View the complete timeline";

  return (
    <div className="experience-list">
      {experiences.slice(0, 4).map((experience) => (
        <article className="experience-item" key={experience.id}>
          <div className="experience-date">
            <time dateTime={experience.start}>
              {experience.start.replace("-", ".")}
            </time>
            <span aria-hidden="true">—</span>
            {experience.end ? (
              <time dateTime={experience.end}>
                {experience.end.replace("-", ".")}
              </time>
            ) : (
              <span>{currentLabel}</span>
            )}
          </div>
          <div className="experience-body">
            <div className="experience-title-row">
              <div>
                <h3>
                  <a
                    href={experience.companyUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {experience.company}
                  </a>
                </h3>
                <p className="role-line">
                  {experience.role}
                  {experience.team ? ` · ${experience.team}` : ""}
                </p>
              </div>
              <span className="item-mark" aria-hidden="true">
                {experience.company.slice(0, 1)}
              </span>
            </div>
            <p className="experience-summary">{experience.summary}</p>
            <ul className="impact-list">
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <ul className="tag-list" aria-label="Technologies">
              {experience.technologies.slice(0, 6).map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            {experience.projects.length ? (
              <div className="inline-links">
                {experience.projects.map((project) => (
                  <a href={project.href} key={project.id}>
                    {project.title}
                    <span aria-hidden="true"> →</span>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
      <a className="archive-cta compact" href={archiveHref}>
        {olderLabel}
        <span aria-hidden="true"> →</span>
      </a>
    </div>
  );
}
