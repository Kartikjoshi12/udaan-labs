import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/seo/PageShell";
import { site } from "@/lib/site";

const offers = [
  { href: "/saas", label: "SaaS products" },
  { href: "/web-apps", label: "Web apps" },
  { href: "/mobile-apps", label: "Mobile apps" },
  { href: "/custom-software", label: "Custom software" },
];

export const metadata: Metadata = {
  title: "Services",
  description:
    "Udaan Labs builds web applications, mobile apps, internal tools, MVPs, and business automation for startups and companies.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageShell
      title="Services"
      lede="We make SaaS products, web apps, mobile apps, and custom software."
    >
      <nav className="flex flex-wrap gap-3 font-mono text-sm font-bold">
        {offers.map((offer) => (
          <Link key={offer.href} href={offer.href} className="border-2 border-ink bg-cream px-3 py-2">
            {offer.label}
          </Link>
        ))}
      </nav>
      {site.services.map((service) => (
        <article key={service.title} className="border-2 border-ink bg-cream p-4">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
            {service.title}
          </h2>
          <p className="mt-2 font-mono text-sm leading-relaxed">{service.body}</p>
        </article>
      ))}
    </PageShell>
  );
}
