type SectionHeadingProps = {
  title: string;
};

export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <h2>{title}</h2>
    </header>
  );
}
