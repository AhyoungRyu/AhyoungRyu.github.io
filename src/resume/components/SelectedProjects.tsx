import type { Locale } from "../types";
import { ResumeImage } from "./ResumeImage";

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
  const detailLabel = locale === "ko" ? "자세히 보기" : "Read details";

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
            <a className="row-link" href={project.href}>
              {detailLabel}
              <span aria-hidden="true"> →</span>
            </a>
          </div>
          {project.thumbnail ? (
            <a
              aria-label={`${project.title} — ${detailLabel}`}
              className="project-thumbnail-link"
              href={project.href}
            >
              <ResumeImage
                className="project-thumbnail"
                image={project.thumbnail}
              />
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}
