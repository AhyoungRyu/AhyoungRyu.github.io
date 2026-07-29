import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/src/resume/components/ProjectDetail";
import { buildLocaleMetadata } from "@/src/resume/metadata";
import { getProject, getProjectSlugs } from "@/src/resume/selectors";
import { locales, type Locale } from "@/src/resume/types";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale) || !getProject(locale as Locale, slug)) {
    return {};
  }

  return buildLocaleMetadata(
    locale as Locale,
    `/projects/${slug}/`,
  ) as Metadata;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (
    !locales.includes(locale as Locale) ||
    !getProject(locale as Locale, slug)
  ) {
    notFound();
  }

  return <ProjectDetail locale={locale as Locale} slug={slug} />;
}
