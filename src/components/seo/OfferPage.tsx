import Link from "next/link";
import { PageShell } from "@/components/seo/PageShell";

export function OfferPage({
  title,
  lede,
  points,
  project,
}: {
  title: string;
  lede: string;
  points: { heading: string; body: string }[];
  project: {
    title: string;
    type: string;
    blurb: string;
    image: string;
    year: string;
  };
}) {
  return (
    <PageShell title={title} lede={lede}>
      {points.map((point) => (
        <section key={point.heading} className="border-2 border-ink bg-cream p-4">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
            {point.heading}
          </h2>
          <p className="mt-2 font-mono text-sm leading-relaxed">{point.body}</p>
        </section>
      ))}
      <article className="border-2 border-ink bg-cream">
        <img
          src={project.image}
          alt={`${project.title}, ${project.type}`}
          className="h-48 w-full border-b-2 border-ink object-cover"
        />
        <div className="space-y-2 p-4">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
            {project.title}
          </h2>
          <p className="font-mono text-[10px] font-bold uppercase text-muted">
            {project.type} · {project.year}
          </p>
          <p className="font-mono text-sm leading-relaxed">{project.blurb}</p>
          <Link href="/projects" className="inline-block font-mono text-xs font-bold underline">
            All projects
          </Link>
        </div>
      </article>
      <p className="font-mono text-sm">
        <Link href="/contact" className="font-bold underline">
          Start a project
        </Link>
      </p>
    </PageShell>
  );
}
