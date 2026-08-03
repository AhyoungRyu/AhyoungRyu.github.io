import { getResume } from "../selectors";
import type { Locale } from "../types";
import { AdditionalRecord } from "./AdditionalRecord";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SectionHeading } from "./SectionHeading";
import { SelectedProjects } from "./SelectedProjects";
import { SiteShell } from "./SiteShell";
import { ResumeImage } from "./ResumeImage";

type ResumeHomeProps = {
  locale: Locale;
};

const copy = {
  ko: {
    greeting: "안녕하세요, 류아영입니다.",
    experience: "경력",
    projects: "주요 프로젝트",
    record: "그 밖의 기록",
  },
  en: {
    greeting: "Hi, I'm Ahyoung Ryu.",
    experience: "Experience",
    projects: "Selected work",
    record: "More of my work",
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

      <section className="intro-section" id="overview">
        <div className="intro-layout">
          <div className="intro-copy">
            <p className="intro-meta">
              {resume.profile.role}
              <span aria-hidden="true"> · </span>
              {resume.profile.location}
            </p>
            <h1>{labels.greeting}</h1>
            <p className="intro-summary">{resume.profile.summary}</p>
            <div className="contact-links">
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
            </div>
          </div>
          <ResumeImage
            className="profile-portrait"
            image={resume.profile.portrait}
            loading="eager"
          />
        </div>
      </section>

      <section className="resume-section" id="experience">
        <SectionHeading title={labels.experience} />
        <ExperienceTimeline locale={locale} experiences={resume.experiences} />
      </section>

      <section className="resume-section" id="projects">
        <SectionHeading title={labels.projects} />
        <SelectedProjects locale={locale} projects={resume.selectedProjects} />
      </section>

      <section className="resume-section" id="record">
        <SectionHeading title={labels.record} />
        <AdditionalRecord
          archiveHref={resume.archiveHref}
          locale={locale}
          record={resume.additionalRecord}
        />
      </section>
    </SiteShell>
  );
}
