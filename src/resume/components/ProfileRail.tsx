import type { Locale } from "../types";
import { PrintActions } from "./PrintActions";

type ProfileRailProps = {
  locale: Locale;
  profile: {
    name: string;
    role: string;
    location: string;
    email: string;
    links: { label: string; href: string }[];
  };
};

const labels = {
  ko: {
    nav: "이력서 섹션",
    overview: "소개",
    experience: "경력",
    projects: "프로젝트",
    community: "오픈소스·발표",
    archive: "전체 기록",
    alternate: "English",
    pdf: "PDF 다운로드",
    print: "인쇄",
  },
  en: {
    nav: "Resume sections",
    overview: "Overview",
    experience: "Experience",
    projects: "Projects",
    community: "Open source & speaking",
    archive: "Full archive",
    alternate: "한국어",
    pdf: "Download PDF",
    print: "Print",
  },
} as const;

export function ProfileRail({ locale, profile }: ProfileRailProps) {
  const copy = labels[locale];
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return (
    <aside className="profile-rail">
      <a className="monogram" href={`/${locale}/`} aria-label={profile.name}>
        AR
      </a>
      <div className="rail-identity">
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
        <span>{profile.location}</span>
      </div>

      <nav className="rail-nav" aria-label={copy.nav}>
        <a href="#overview">
          <span>01</span>
          {copy.overview}
        </a>
        <a href="#experience">
          <span>02</span>
          {copy.experience}
        </a>
        <a href="#projects">
          <span>03</span>
          {copy.projects}
        </a>
        <a href="#community">
          <span>04</span>
          {copy.community}
        </a>
      </nav>

      <div className="rail-actions">
        <PrintActions
          pdfHref={`/resume-ahyoung-ryu-${locale}.pdf`}
          pdfLabel={copy.pdf}
          printLabel={copy.print}
        />
        <a className="text-link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        {profile.links.map((link) => (
          <a
            className="text-link"
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

      <div className="rail-footer">
        <a href={`/${locale}/archive/`}>{copy.archive}</a>
        <a href={`/${alternateLocale}/`} hrefLang={alternateLocale}>
          {copy.alternate}
        </a>
      </div>
    </aside>
  );
}
