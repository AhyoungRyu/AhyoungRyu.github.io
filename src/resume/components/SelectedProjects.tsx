import type { Locale } from "../types";
import { ResumeImage } from "./ResumeImage";
import { TechnologyLine } from "./TechnologyLine";

type ImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
};

type ProjectSummary = {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
  period: string;
  technologies: string[];
  href: string;
  company: string;
  thumbnail?: ImageData;
};

type SelectedProjectsProps = {
  locale: Locale;
  projects: ProjectSummary[];
};

export function SelectedProjects({ locale, projects }: SelectedProjectsProps) {
  const thumbnailLabel =
    locale === "ko" ? "프로젝트 기록 보기" : "project record";

  return (
    <div className="project-list">
      {projects.map((project) => (
        <article className="project-row" key={project.id}>
          <div className="project-meta">
            <span>{project.company}</span>
            <span>{project.period.replaceAll("—", "-")}</span>
          </div>
          <div className="project-copy">
            <h3>
              <a href={project.href}>{project.title}</a>
            </h3>
            <p>{project.summary}</p>
            <ul className="project-evidence">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <TechnologyLine limit={5} technologies={project.technologies} />
          </div>
          {project.thumbnail ? (
            <a
              aria-label={`${project.title} ${thumbnailLabel}`}
              className="project-thumbnail-link"
              href={project.href}
            >
              <ResumeImage
                className="project-thumbnail"
                image={project.thumbnail}
                loading="eager"
              />
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}
