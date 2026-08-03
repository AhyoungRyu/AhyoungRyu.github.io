import { getProject } from "../selectors";
import type { Locale } from "../types";
import { ResumeImage } from "./ResumeImage";

type ProjectDetailProps = {
  locale: Locale;
  slug: string;
};

const copy = {
  ko: {
    home: "이력서",
    archive: "전체 경력",
    context: "배경",
    problem: "문제",
    contributions: "기여",
    outcomes: "결과",
    technology: "기술",
    references: "관련 링크",
    previous: "이전 프로젝트",
    next: "다음 프로젝트",
  },
  en: {
    home: "Resume",
    archive: "Career archive",
    context: "Context",
    problem: "Problem",
    contributions: "Contributions",
    outcomes: "Outcomes",
    technology: "Technology",
    references: "References",
    previous: "Previous project",
    next: "Next project",
  },
} as const;

export function ProjectDetail({ locale, slug }: ProjectDetailProps) {
  const project = getProject(locale, slug);
  const labels = copy[locale];
  const alternateLocale = locale === "ko" ? "en" : "ko";

  if (!project) {
    return null;
  }

  return (
    <main className="subpage-shell project-detail">
      <header className="subpage-nav">
        <a href={`/${locale}/`}>
          <span aria-hidden="true">AR</span>
          {labels.home}
        </a>
        <div>
          <a href={`/${locale}/archive/`}>{labels.archive}</a>
          <a
            href={`/${alternateLocale}/projects/${slug}/`}
            hrefLang={alternateLocale}
          >
            {alternateLocale === "ko" ? "한국어" : "English"}
          </a>
        </div>
      </header>

      <article>
        <header className="project-hero">
          <div className="project-hero-meta">
            <a href={project.companyUrl} rel="noreferrer" target="_blank">
              {project.company}
            </a>
            <span>{project.period}</span>
          </div>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </header>

        {project.thumbnail ? (
          <figure className="project-primary-image-frame">
            <ResumeImage
              className="project-primary-image"
              image={project.thumbnail}
              loading="eager"
            />
          </figure>
        ) : null}

        <div className="project-story">
          <aside className="project-facts">
            <div>
              <h2>{labels.technology}</h2>
              <ul className="tag-list">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
            {project.links.length ? (
              <div>
                <h2>{labels.references}</h2>
                <div className="project-reference-list">
                  {project.links.map((link) => (
                    <a
                      href={link.href}
                      key={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <div className="story-sections">
            <section>
              <span className="story-index">01</span>
              <h2>{labels.context}</h2>
              <p>{project.context}</p>
            </section>
            <section>
              <span className="story-index">02</span>
              <h2>{labels.problem}</h2>
              <ul>
                {project.problem.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <span className="story-index">03</span>
              <h2>{labels.contributions}</h2>
              <ul>
                {project.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="outcome-section">
              <span className="story-index">04</span>
              <h2>{labels.outcomes}</h2>
              <ul>
                {project.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {project.gallery.length ? (
          <div className="project-gallery">
            {project.gallery.map((image) => (
              <figure key={image.src}>
                <ResumeImage image={image} loading="eager" />
              </figure>
            ))}
          </div>
        ) : null}
      </article>

      <nav className="project-pagination" aria-label="Project navigation">
        {project.previous ? (
          <a href={project.previous.href}>
            <span>{labels.previous}</span>
            <strong>← {project.previous.title}</strong>
          </a>
        ) : (
          <span />
        )}
        {project.next ? (
          <a href={project.next.href}>
            <span>{labels.next}</span>
            <strong>{project.next.title} →</strong>
          </a>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
