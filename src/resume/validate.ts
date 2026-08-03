import {
  locales,
  type LocalizedText,
  type ResumeContent,
  type ResumeImage,
  type ResumeLink,
} from "./types";

function hasCompleteLocalizedText(value: LocalizedText): boolean {
  return locales.every((locale) => value[locale]?.trim().length > 0);
}

function isSafeHref(href: string): boolean {
  const normalized = href.trim();

  if (
    !normalized ||
    normalized.includes("dummy") ||
    normalized.includes("%20http") ||
    /^https:\/{3,}/i.test(normalized) ||
    normalized.endsWith(")")
  ) {
    return false;
  }

  if (normalized.startsWith("/")) {
    return !normalized.startsWith("//");
  }

  if (normalized.startsWith("mailto:")) {
    return normalized.length > "mailto:".length;
  }

  try {
    const url = new URL(normalized);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function validateLinks(
  links: ResumeLink[],
  path: string,
  errors: string[],
): void {
  if (links.some((link) => !link.label.trim() || !isSafeHref(link.href))) {
    errors.push(`${path} contains a placeholder or malformed URL`);
  }
}

function validateImage(
  image: ResumeImage,
  path: string,
  errors: string[],
): void {
  if (
    !image.src.startsWith("/images/resume/") ||
    image.src.includes("..") ||
    !hasCompleteLocalizedText(image.alt) ||
    !Number.isFinite(image.width) ||
    image.width <= 0 ||
    !Number.isFinite(image.height) ||
    image.height <= 0 ||
    !["cover", "contain"].includes(image.fit)
  ) {
    errors.push(`${path} must be a complete local resume image`);
  }
}

function validateDates(content: ResumeContent, errors: string[]): void {
  const currentCount = content.experiences.filter(
    (experience) => experience.end === null,
  ).length;

  if (currentCount !== 1) {
    errors.push("experiences must contain exactly one current position");
  }

  for (const experience of content.experiences) {
    if (experience.end && experience.start > experience.end) {
      errors.push(`experiences.${experience.id} has an invalid date range`);
    }
  }
}

function validateUniqueValues(
  values: string[],
  label: string,
  errors: string[],
): void {
  if (new Set(values).size !== values.length) {
    errors.push(`${label} must be unique`);
  }
}

export function validateResumeContent(content: ResumeContent): string[] {
  const errors: string[] = [];

  if (
    !hasCompleteLocalizedText(content.profile.name) ||
    !hasCompleteLocalizedText(content.profile.role) ||
    !hasCompleteLocalizedText(content.profile.location) ||
    !hasCompleteLocalizedText(content.profile.summary)
  ) {
    errors.push("profile must contain complete Korean and English copy");
  }

  validateLinks(content.profile.links, "profile.links", errors);
  validateImage(content.profile.portrait, "profile.portrait", errors);
  validateDates(content, errors);
  validateUniqueValues(
    content.experiences.map((experience) => experience.id),
    "experience IDs",
    errors,
  );
  validateUniqueValues(
    content.projects.map((project) => project.id),
    "project IDs",
    errors,
  );
  validateUniqueValues(
    content.projects.map((project) => project.slug),
    "project slugs",
    errors,
  );

  const projectIds = new Set(content.projects.map((project) => project.id));

  for (const capability of content.capabilities) {
    if (
      !hasCompleteLocalizedText(capability.title) ||
      !hasCompleteLocalizedText(capability.description)
    ) {
      errors.push(`capabilities.${capability.id} is missing localized copy`);
    }
  }

  for (const experience of content.experiences) {
    if (
      !hasCompleteLocalizedText(experience.role) ||
      !hasCompleteLocalizedText(experience.summary) ||
      experience.highlights.ko.length === 0 ||
      experience.highlights.en.length === 0
    ) {
      errors.push(`experiences.${experience.id} is missing localized copy`);
    }

    if (experience.projectIds.some((projectId) => !projectIds.has(projectId))) {
      errors.push(`experiences.${experience.id} references an unknown project`);
    }

    validateLinks(
      [{ label: experience.company, href: experience.companyUrl }],
      `experiences.${experience.id}.companyUrl`,
      errors,
    );
    validateImage(experience.logo, `experiences.${experience.id}.logo`, errors);
  }

  for (const project of content.projects) {
    if (
      !hasCompleteLocalizedText(project.title) ||
      !hasCompleteLocalizedText(project.summary) ||
      !hasCompleteLocalizedText(project.context) ||
      project.problem.ko.length === 0 ||
      project.problem.en.length === 0 ||
      project.contributions.ko.length === 0 ||
      project.contributions.en.length === 0 ||
      project.outcomes.ko.length === 0 ||
      project.outcomes.en.length === 0
    ) {
      errors.push(`projects.${project.id} is missing localized copy`);
    }

    validateLinks(project.links, `projects.${project.id}.links`, errors);
    if (project.thumbnail) {
      validateImage(
        project.thumbnail,
        `projects.${project.id}.thumbnail`,
        errors,
      );
    }
    project.gallery.forEach((image, index) => {
      validateImage(image, `projects.${project.id}.gallery.${index}`, errors);
    });
  }

  for (const group of content.archiveGroups) {
    if (
      !hasCompleteLocalizedText(group.title) ||
      !hasCompleteLocalizedText(group.description)
    ) {
      errors.push(`archiveGroups.${group.id} is missing localized copy`);
    }

    for (const entry of group.entries) {
      if (
        !hasCompleteLocalizedText(entry.title) ||
        !hasCompleteLocalizedText(entry.description) ||
        entry.bullets.ko.length === 0 ||
        entry.bullets.en.length === 0
      ) {
        errors.push(
          `archiveGroups.${group.id}.${entry.id} is missing localized copy`,
        );
      }

      validateLinks(
        entry.links,
        `archiveGroups.${group.id}.${entry.id}.links`,
        errors,
      );
    }
  }

  for (const education of content.education) {
    validateImage(
      education.logo,
      `education.${education.school}.logo`,
      errors,
    );
  }

  return errors;
}
