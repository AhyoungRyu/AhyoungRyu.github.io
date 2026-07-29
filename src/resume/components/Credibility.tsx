type CredibilityItem = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

type CredibilityProps = {
  items: CredibilityItem[];
};

export function Credibility({ items }: CredibilityProps) {
  return (
    <div className="credibility-grid">
      {items.map((item) => (
        <a className="credibility-card" href={item.href} key={item.title}>
          <span className="eyebrow">{item.eyebrow}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className="card-link" aria-hidden="true">
            Explore →
          </span>
        </a>
      ))}
    </div>
  );
}
