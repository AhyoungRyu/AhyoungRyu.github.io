import type { Locale } from "../types";
import { PrintActions } from "./PrintActions";

type ResumeHeaderProps = {
  locale: Locale;
  profile: {
    name: string;
  };
};

const labels = {
  ko: {
    nav: "이력서 섹션",
    experience: "경력",
    projects: "주요 프로젝트",
    record: "기타 기록",
    alternate: "English",
    pdf: "PDF 다운로드",
    print: "인쇄",
  },
  en: {
    nav: "Resume sections",
    experience: "Experience",
    projects: "Selected work",
    record: "More",
    alternate: "한국어",
    pdf: "Download PDF",
    print: "Print",
  },
} as const;

export function ResumeHeader({ locale, profile }: ResumeHeaderProps) {
  const copy = labels[locale];
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return (
    <header className="resume-header">
      <a className="header-name" href={`/${locale}/`}>
        {profile.name}
      </a>

      <nav aria-label={copy.nav}>
        <a href={`/${locale}/#experience`}>{copy.experience}</a>
        <a href={`/${locale}/#projects`}>{copy.projects}</a>
        <a href={`/${locale}/#record`}>{copy.record}</a>
      </nav>

      <div className="header-actions">
        <PrintActions
          pdfHref={`/resume-ahyoung-ryu-${locale}.pdf`}
          pdfLabel={copy.pdf}
          printLabel={copy.print}
        />
        <a href={`/${alternateLocale}/`} hrefLang={alternateLocale}>
          {copy.alternate}
        </a>
      </div>
    </header>
  );
}
