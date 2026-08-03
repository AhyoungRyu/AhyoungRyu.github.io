import type { Locale } from "../types";
import { ResumeImage } from "./ResumeImage";

type ImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
};

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
  logo: ImageData;
};

type ExperienceTimelineProps = {
  locale: Locale;
  experiences: ExperienceItem[];
};

export function ExperienceTimeline({
  locale,
  experiences,
}: ExperienceTimelineProps) {
  const currentLabel = locale === "ko" ? "현재" : "Present";

  return (
    <div className="experience-list">
      {experiences.map((experience) => (
        <article className="experience-item" key={experience.id}>
          <div className="experience-date">
            <time dateTime={experience.start}>
              {experience.start.replace("-", ".")}
            </time>
            <span aria-hidden="true">-</span>
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
            </div>
            <p className="experience-summary">{experience.summary}</p>
            <ul className="impact-list">
              {experience.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
          <a
            aria-label={`${experience.company} website`}
            className="experience-logo-link"
            href={experience.companyUrl}
            rel="noreferrer"
            target="_blank"
          >
            <ResumeImage
              className="experience-logo"
              image={experience.logo}
            />
          </a>
        </article>
      ))}
    </div>
  );
}
