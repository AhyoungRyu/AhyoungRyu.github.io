import { resumeContent } from "./content";
import type { Locale, LocalizedText } from "./types";

function text(value: LocalizedText, locale: Locale): string {
  return value[locale];
}

function localizedPath(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path.replace(/^\/|\/$/g, "");
  return suffix ? `/${locale}/${suffix}/` : `/${locale}/`;
}

export function getResume(locale: Locale) {
  const apacheProject = resumeContent.projects.find(
    (project) => project.id === "apache-zeppelin",
  );
  const speakingGroup = resumeContent.archiveGroups.find(
    (group) => group.id === "teaching-speaking",
  );
  const selectedProjects = resumeContent.projects
    .filter((project) => project.selected)
    .slice(0, 6)
    .map((project) => ({
      id: project.id,
      slug: project.slug,
      title: text(project.title, locale),
      summary: text(project.summary, locale),
      period: project.period,
      technologies: project.technologies,
      href: localizedPath(locale, `/projects/${project.slug}/`),
      company:
        resumeContent.experiences.find(
          (experience) => experience.id === project.companyId,
        )?.company ?? project.companyId,
    }));

  return {
    locale,
    profile: {
      name: text(resumeContent.profile.name, locale),
      role: text(resumeContent.profile.role, locale),
      location: text(resumeContent.profile.location, locale),
      summary: text(resumeContent.profile.summary, locale),
      email: resumeContent.profile.email,
      links: resumeContent.profile.links,
    },
    capabilities: resumeContent.capabilities.map((capability) => ({
      id: capability.id,
      title: text(capability.title, locale),
      description: text(capability.description, locale),
    })),
    experiences: resumeContent.experiences.map((experience) => ({
      id: experience.id,
      company: experience.company,
      companyUrl: experience.companyUrl,
      role: text(experience.role, locale),
      team: experience.team ? text(experience.team, locale) : undefined,
      start: experience.start,
      end: experience.end,
      summary: text(experience.summary, locale),
      highlights: experience.highlights[locale],
      technologies: experience.technologies,
      projects: experience.projectIds
        .map((projectId) =>
          resumeContent.projects.find((project) => project.id === projectId),
        )
        .filter((project) => project !== undefined)
        .map((project) => ({
          id: project.id,
          title: text(project.title, locale),
          href: localizedPath(locale, `/projects/${project.slug}/`),
        })),
    })),
    selectedProjects,
    credibility: [
      apacheProject
        ? {
            eyebrow: "Apache Software Foundation",
            title: text(apacheProject.title, locale),
            description: apacheProject.outcomes[locale][0],
            href: localizedPath(locale, `/projects/${apacheProject.slug}/`),
          }
        : undefined,
      speakingGroup
        ? {
            eyebrow: locale === "ko" ? "Teaching & Speaking" : "Community",
            title: text(speakingGroup.title, locale),
            description: text(speakingGroup.description, locale),
            href: localizedPath(locale, "/archive/"),
          }
        : undefined,
    ].filter((item) => item !== undefined),
    education: resumeContent.education.map((education) => ({
      school: education.school,
      degree: text(education.degree, locale),
      period: education.period,
    })),
    languages: resumeContent.languages.map((language) => ({
      name: text(language.name, locale),
      proficiency: text(language.proficiency, locale),
    })),
    archiveHref: localizedPath(locale, "/archive/"),
    pdfHref: `/resume-ahyoung-ryu-${locale}.pdf`,
    alternateLocale: locale === "ko" ? ("en" as const) : ("ko" as const),
  };
}

export function getProjectSlugs(): string[] {
  return resumeContent.projects.map((project) => project.slug);
}

export function getProject(locale: Locale, slug: string) {
  const projectIndex = resumeContent.projects.findIndex(
    (project) => project.slug === slug,
  );
  const project = resumeContent.projects[projectIndex];

  if (!project) {
    return undefined;
  }

  const company = resumeContent.experiences.find(
    (experience) => experience.id === project.companyId,
  );
  const previous = resumeContent.projects[projectIndex - 1];
  const next = resumeContent.projects[projectIndex + 1];

  return {
    id: project.id,
    slug: project.slug,
    title: text(project.title, locale),
    period: project.period,
    summary: text(project.summary, locale),
    context: text(project.context, locale),
    problem: project.problem[locale],
    contributions: project.contributions[locale],
    outcomes: project.outcomes[locale],
    technologies: project.technologies,
    links: project.links,
    company: company?.company ?? project.companyId,
    companyUrl: company?.companyUrl,
    previous: previous
      ? {
          title: text(previous.title, locale),
          href: localizedPath(locale, `/projects/${previous.slug}/`),
        }
      : undefined,
    next: next
      ? {
          title: text(next.title, locale),
          href: localizedPath(locale, `/projects/${next.slug}/`),
        }
      : undefined,
  };
}

export function getArchive(locale: Locale) {
  return {
    locale,
    groups: resumeContent.archiveGroups.map((group) => ({
      id: group.id,
      title: text(group.title, locale),
      description: text(group.description, locale),
      entries: group.entries.map((entry) => ({
        id: entry.id,
        title: text(entry.title, locale),
        period: entry.period,
        description: text(entry.description, locale),
        bullets: entry.bullets[locale],
        links: entry.links,
      })),
    })),
    experiences: getResume(locale).experiences,
    homeHref: localizedPath(locale, "/"),
  };
}

export function getLocalizedPath(locale: Locale, path: string): string {
  return localizedPath(locale, path);
}
