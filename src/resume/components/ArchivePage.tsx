import { getArchive } from "../selectors";
import type { Locale } from "../types";
import { ResumeImage } from "./ResumeImage";

type ArchivePageProps = {
  locale: Locale;
};

const copy = {
  ko: {
    eyebrow: "전체 기록 · 2015—현재",
    title: "경력 아카이브",
    intro:
      "요약 이력서에서 덜어낸 초기 경력, 제품 기능, 오픈소스 문서, 강의와 발표를 한곳에 보존합니다.",
    home: "요약 이력서로 돌아가기",
    timeline: "전체 경력",
    groups: "프로젝트 밖의 기록",
    current: "현재",
  },
  en: {
    eyebrow: "Complete record · 2015—Present",
    title: "Career archive",
    intro:
      "A complete record of earlier roles, product work, open-source documentation, teaching, and talks beyond the concise resume.",
    home: "Back to concise resume",
    timeline: "Complete experience",
    groups: "Beyond selected projects",
    current: "Present",
  },
} as const;

export function ArchivePage({ locale }: ArchivePageProps) {
  const archive = getArchive(locale);
  const labels = copy[locale];
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return (
    <main className="subpage-shell archive-page">
      <header className="subpage-nav">
        <a href={archive.homeHref}>
          <span aria-hidden="true">AR</span>
          {labels.home}
        </a>
        <a href={`/${alternateLocale}/archive/`} hrefLang={alternateLocale}>
          {alternateLocale === "ko" ? "한국어" : "English"}
        </a>
      </header>

      <header className="archive-hero">
        <p className="eyebrow">{labels.eyebrow}</p>
        <h1>{labels.title}</h1>
        <p>{labels.intro}</p>
      </header>

      <section className="archive-block">
        <h2>{labels.timeline}</h2>
        <div className="archive-timeline">
          {archive.experiences.map((experience) => (
            <article key={experience.id}>
              <div>
                <time dateTime={experience.start}>
                  {experience.start.replace("-", ".")}
                </time>
                <span>—</span>
                {experience.end ? (
                  <time dateTime={experience.end}>
                    {experience.end.replace("-", ".")}
                  </time>
                ) : (
                  <span>{labels.current}</span>
                )}
              </div>
              <div>
                <h3>{experience.company}</h3>
                <p className="role-line">{experience.role}</p>
                <p>{experience.summary}</p>
                <ul>
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <a
                aria-label={`${experience.company} website`}
                className="archive-company-logo-link"
                href={experience.companyUrl}
                rel="noreferrer"
                target="_blank"
              >
                <ResumeImage
                  className="archive-company-logo"
                  image={experience.logo}
                />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="archive-block">
        <h2>{labels.groups}</h2>
        <div className="archive-groups">
          {archive.groups.map((group) => (
            <section key={group.id}>
              <header>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </header>
              <div className="archive-entry-list">
                {group.entries.map((entry) => (
                  <article key={entry.id}>
                    <div>
                      <span>{entry.period}</span>
                      <h4>{entry.title}</h4>
                      <p>{entry.description}</p>
                    </div>
                    <div>
                      <ul>
                        {entry.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                      {entry.links.map((link) => (
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
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
