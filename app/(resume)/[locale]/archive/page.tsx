import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchivePage } from "@/src/resume/components/ArchivePage";
import { buildLocaleMetadata } from "@/src/resume/metadata";
import { locales, type Locale } from "@/src/resume/types";

type ArchiveRouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ArchiveRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const metadata = buildLocaleMetadata(locale as Locale, "/archive/");
  return {
    ...metadata,
    title:
      locale === "ko"
        ? "경력 아카이브 · 류아영"
        : "Career archive · Ahyoung Ryu",
  };
}

export default async function ArchiveRoute({ params }: ArchiveRouteProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <ArchivePage locale={locale as Locale} />;
}
