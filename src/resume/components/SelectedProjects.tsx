type ProjectSummary = {
  id: string;
  title: string;
  summary: string;
  period: string;
  technologies: string[];
  href: string;
  company: string;
};

type SelectedProjectsProps = {
  projects: ProjectSummary[];
};

export function SelectedProjects({ projects }: SelectedProjectsProps) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <article className="project-card" key={project.id}>
          <a href={project.href}>
            <header>
              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="project-company">{project.company}</span>
            </header>
            <div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <footer>
              <span>{project.period}</span>
              <span aria-hidden="true">↗</span>
            </footer>
          </a>
        </article>
      ))}
    </div>
  );
}
