import { notFound } from "next/navigation";
import { ResumeHome } from "@/src/resume/components/ResumeHome";
import { locales, type Locale } from "@/src/resume/types";

type ResumePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <ResumeHome locale={locale as Locale} />;
}
