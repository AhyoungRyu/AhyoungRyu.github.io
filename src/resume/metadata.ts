import { resumeContent } from "./content";
import { getLocalizedPath, getProject } from "./selectors";
import type { Locale } from "./types";

type LocaleMetadata = {
  title: string;
  description: string;
  alternates: {
    canonical: string;
    languages: Record<"ko" | "en" | "x-default", string>;
  };
  openGraph: {
    title: string;
    description: string;
    locale: "ko_KR" | "en_US";
    type: "profile";
  };
};

function normalizePath(path: string): string {
  if (path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/|\/$/g, "")}/`;
}

export function buildLocaleMetadata(
  locale: Locale,
  path: string,
): LocaleMetadata {
  const normalizedPath = normalizePath(path);
  const projectSlug = normalizedPath.match(/^\/projects\/([^/]+)\/$/)?.[1];
  const project = projectSlug ? getProject(locale, projectSlug) : undefined;
  const name = resumeContent.profile.name[locale];
  const role = resumeContent.profile.role[locale];
  const title = project ? `${project.title} · ${name}` : `${name} · ${role}`;
  const description =
    project?.summary ?? resumeContent.profile.summary[locale];

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(locale, normalizedPath),
      languages: {
        ko: getLocalizedPath("ko", normalizedPath),
        en: getLocalizedPath("en", normalizedPath),
        "x-default": getLocalizedPath("en", normalizedPath),
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "profile",
    },
  };
}
