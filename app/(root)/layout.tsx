import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ahyoung Ryu · Senior Software Engineer",
  description:
    "Bilingual resume and project archive for Ahyoung Ryu, a senior front-end software engineer in Seoul.",
};

export default function RedirectRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
