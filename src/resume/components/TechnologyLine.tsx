type TechnologyLineProps = {
  technologies: string[];
  limit: number;
};

export function TechnologyLine({
  technologies,
  limit,
}: TechnologyLineProps) {
  const visibleTechnologies = technologies.slice(0, limit);

  if (visibleTechnologies.length === 0) {
    return null;
  }

  return (
    <p className="technology-line">
      <span className="technology-label">Tech</span>
      <span>{visibleTechnologies.join(" · ")}</span>
    </p>
  );
}
