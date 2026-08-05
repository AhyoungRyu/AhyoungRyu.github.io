import type { Locale } from "../types";
import { ResumeImage } from "./ResumeImage";

type ImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
};

type AdditionalRecordProps = {
  locale: Locale;
  archiveHref: string;
  record: {
    openSource: string;
    openSourceHref: string;
    teaching: string;
    education: {
      school: string;
      degree: string;
      period: string;
      logo: ImageData;
    }[];
    languages: {
      name: string;
      proficiency: string;
    }[];
  };
};

const labels = {
  ko: {
    openSource: "오픈소스",
    teaching: "강의와 발표",
    education: "학력",
    languages: "언어",
    archive: "전체 경력과 발표 기록 보기",
  },
  en: {
    openSource: "Open source",
    teaching: "Teaching and talks",
    education: "Education",
    languages: "Languages",
    archive: "View the full archive",
  },
} as const;

export function AdditionalRecord({
  locale,
  archiveHref,
  record,
}: AdditionalRecordProps) {
  const copy = labels[locale];

  return (
    <div className="additional-grid">
      <div className="additional-evidence">
        <article>
          <h3>{copy.openSource}</h3>
          <a
            className="evidence-link"
            href={record.openSourceHref}
            rel="noreferrer"
            target="_blank"
          >
            <p>{record.openSource}</p>
          </a>
        </article>
        <article>
          <h3>{copy.teaching}</h3>
          <p>{record.teaching}</p>
        </article>
      </div>

      <div className="additional-facts">
        <section>
          <h3>{copy.education}</h3>
          {record.education.map((education) => (
            <div className="education-fact" key={education.school}>
              <ResumeImage
                className="education-logo"
                image={education.logo}
                loading="eager"
              />
              <div className="fact-item">
                <strong>{education.school}</strong>
                <span>{education.degree}</span>
                <span>{education.period}</span>
              </div>
            </div>
          ))}
        </section>
        <section>
          <h3>{copy.languages}</h3>
          {record.languages.map((language) => (
            <div className="language-row" key={language.name}>
              <strong>{language.name}</strong>
              <span>{language.proficiency}</span>
            </div>
          ))}
        </section>
      </div>

      <a className="archive-link" href={archiveHref}>
        {copy.archive}
        <span aria-hidden="true"> →</span>
      </a>
    </div>
  );
}
