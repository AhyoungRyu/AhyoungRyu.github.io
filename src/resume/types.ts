export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;

export type ResumeLink = {
  label: string;
  href: string;
};

export type ResumeImage = {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
  fit: "cover" | "contain";
};

export type Profile = {
  name: LocalizedText;
  role: LocalizedText;
  location: LocalizedText;
  summary: LocalizedText;
  email: string;
  links: ResumeLink[];
  portrait: ResumeImage;
};

export type Capability = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type Experience = {
  id: string;
  company: string;
  companyUrl: string;
  role: LocalizedText;
  team?: LocalizedText;
  start: string;
  end: string | null;
  summary: LocalizedText;
  highlights: Record<Locale, string[]>;
  technologies: string[];
  projectIds: string[];
  logo: ResumeImage;
};

export type Project = {
  id: string;
  slug: string;
  companyId: string;
  title: LocalizedText;
  period: string;
  summary: LocalizedText;
  context: LocalizedText;
  problem: Record<Locale, string[]>;
  contributions: Record<Locale, string[]>;
  outcomes: Record<Locale, string[]>;
  technologies: string[];
  links: ResumeLink[];
  selected: boolean;
  thumbnail?: ResumeImage;
  gallery: ResumeImage[];
};

export type ArchiveEntry = {
  id: string;
  title: LocalizedText;
  period?: string;
  description: LocalizedText;
  bullets: Record<Locale, string[]>;
  links: ResumeLink[];
};

export type ArchiveGroup = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  entries: ArchiveEntry[];
};

export type Education = {
  school: string;
  degree: LocalizedText;
  period: string;
  logo: ResumeImage;
};

export type Language = {
  name: LocalizedText;
  proficiency: LocalizedText;
};

export type ResumeContent = {
  profile: Profile;
  capabilities: Capability[];
  experiences: Experience[];
  projects: Project[];
  archiveGroups: ArchiveGroup[];
  education: Education[];
  languages: Language[];
};
