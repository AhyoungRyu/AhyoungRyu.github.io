import type { ReactNode } from "react";
import type { Locale } from "../types";
import { ResumeHeader } from "./ResumeHeader";

type SiteShellProps = {
  locale: Locale;
  profile: {
    name: string;
    role: string;
    location: string;
    email: string;
    links: { label: string; href: string }[];
  };
  children: ReactNode;
};

export function SiteShell({ locale, profile, children }: SiteShellProps) {
  const skipLabel = locale === "ko" ? "본문으로 이동" : "Skip to content";

  return (
    <>
      <a className="skip-link" href="#main-content">
        {skipLabel}
      </a>
      <div className="site-shell">
        <ResumeHeader locale={locale} profile={profile} />
        <main id="main-content" className="resume-main">
          {children}
        </main>
      </div>
    </>
  );
}
