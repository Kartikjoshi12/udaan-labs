import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work from Udaan Labs: LiftFit, Northline, and Harbor Desk. Mobile apps, web apps, and internal tools.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      lede="Software we have shipped for products, brands, and operations teams."
    >
      {site.projects.map((project) => (
        <article key={project.id} className="border-2 border-ink bg-cream">
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
          </div>
        </article>
      ))}
    </PageShell>
  );
}
