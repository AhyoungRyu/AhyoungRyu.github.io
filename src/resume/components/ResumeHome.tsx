import { getResume } from "../selectors";
import type { Locale } from "../types";
import { Credibility } from "./Credibility";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SectionHeading } from "./SectionHeading";
import { SelectedProjects } from "./SelectedProjects";
import { SiteShell } from "./SiteShell";

type ResumeHomeProps = {
  locale: Locale;
};

const copy = {
  ko: {
    availability: "서울을 기반으로 글로벌 제품을 만듭니다",
    capabilities: "일하는 방식",
    capabilitiesDescription:
      "제품의 문제를 정의하고, 오래 운영될 구조와 측정 가능한 결과를 함께 만듭니다.",
    experience: "경력",
    experienceDescription:
      "최근 경력을 중심으로 제품과 조직에 만든 변화를 정리했습니다.",
    projects: "선택한 프로젝트",
    projectsDescription:
      "문제의 크기, 기술적 판단, 제품에 남긴 결과가 잘 드러나는 작업입니다.",
    community: "오픈소스와 커뮤니티",
    communityDescription:
      "코드 밖에서도 문서, 교육, 발표를 통해 기술 생태계에 기여합니다.",
    foundations: "기본 정보",
    education: "교육",
    languages: "언어",
    archiveTitle: "더 자세한 기록이 필요하신가요?",
    archiveDescription:
      "초기 경력, 전체 오픈소스 기여, 강의와 발표 자료를 경력 아카이브에 보존했습니다.",
    archiveLink: "전체 경력 아카이브 보기",
    updated: "마지막 업데이트 · 2026년 7월",
  },
  en: {
    availability: "Building global products from Seoul",
    capabilities: "How I work",
    capabilitiesDescription:
      "I define product problems, build systems that last, and measure what changes.",
    experience: "Experience",
    experienceDescription:
      "A focused view of the product and organizational impact from my recent roles.",
    projects: "Selected projects",
    projectsDescription:
      "Work that best shows the problem scale, technical judgment, and product outcomes.",
    community: "Open source & community",
    communityDescription:
      "I contribute beyond product code through documentation, teaching, and speaking.",
    foundations: "Foundations",
    education: "Education",
    languages: "Languages",
    archiveTitle: "Looking for the complete record?",
    archiveDescription:
      "Earlier roles, the full open-source record, teaching, and talks are preserved in the career archive.",
    archiveLink: "View full career archive",
    updated: "Last updated · July 2026",
  },
} as const;

export function ResumeHome({ locale }: ResumeHomeProps) {
  const resume = getResume(locale);
  const labels = copy[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: resume.profile.name,
      jobTitle: resume.profile.role,
      email: `mailto:${resume.profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: locale === "ko" ? "서울" : "Seoul",
        addressCountry: "KR",
      },
      sameAs: resume.profile.links.map((link) => link.href),
      description: resume.profile.summary,
    },
  };

  return (
    <SiteShell locale={locale} profile={resume.profile}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero-section" id="overview">
        <p className="eyebrow">{labels.availability}</p>
        <h1>{resume.profile.name}</h1>
        <p className="hero-role">{resume.profile.role}</p>
        <p className="hero-summary">{resume.profile.summary}</p>
        <div className="hero-links">
          <a href={`mailto:${resume.profile.email}`}>
            {resume.profile.email}
            <span aria-hidden="true"> ↗</span>
          </a>
          {resume.profile.links.map((link) => (
            <a
              href={link.href}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          ))}
          <a
            href={`/${resume.alternateLocale}/`}
            hrefLang={resume.alternateLocale}
          >
            {locale === "ko" ? "English" : "한국어"}
          </a>
        </div>
      </section>

      <section className="resume-section capability-section">
        <SectionHeading
          index="01"
          title={labels.capabilities}
          description={labels.capabilitiesDescription}
        />
        <div className="capability-grid">
          {resume.capabilities.map((capability) => (
            <article key={capability.id}>
              <span className="capability-dot" aria-hidden="true" />
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section" id="experience">
        <SectionHeading
          index="02"
          title={labels.experience}
          description={labels.experienceDescription}
        />
        <ExperienceTimeline
          locale={locale}
          experiences={resume.experiences}
          archiveHref={resume.archiveHref}
        />
      </section>

      <section className="resume-section" id="projects">
        <SectionHeading
          index="03"
          title={labels.projects}
          description={labels.projectsDescription}
        />
        <SelectedProjects projects={resume.selectedProjects} />
      </section>

      <section className="resume-section" id="community">
        <SectionHeading
          index="04"
          title={labels.community}
          description={labels.communityDescription}
        />
        <Credibility items={resume.credibility} />
      </section>

      <section className="resume-section foundations-section">
        <SectionHeading index="05" title={labels.foundations} />
        <div className="foundations-grid">
          <div>
            <h3>{labels.education}</h3>
            {resume.education.map((education) => (
              <div className="foundation-item" key={education.school}>
                <strong>{education.school}</strong>
                <span>{education.degree}</span>
                <span>{education.period}</span>
              </div>
            ))}
          </div>
          <div>
            <h3>{labels.languages}</h3>
            {resume.languages.map((language) => (
              <div className="language-row" key={language.name}>
                <strong>{language.name}</strong>
                <span>{language.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="archive-banner">
        <div>
          <p className="eyebrow">{labels.updated}</p>
          <h2>{labels.archiveTitle}</h2>
          <p>{labels.archiveDescription}</p>
        </div>
        <a className="archive-cta" href={resume.archiveHref}>
          {labels.archiveLink}
          <span aria-hidden="true"> →</span>
        </a>
      </section>
    </SiteShell>
  );
}
