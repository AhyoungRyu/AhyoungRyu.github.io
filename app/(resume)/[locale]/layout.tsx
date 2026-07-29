import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
import { buildLocaleMetadata } from "@/src/resume/metadata";
import { locales, type Locale } from "@/src/resume/types";

type LocalizedLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Pick<LocalizedLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return {};
  }

  return buildLocaleMetadata(locale as Locale, "/");
}

export default async function LocalizedLayout({
  children,
  params,
}: LocalizedLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
