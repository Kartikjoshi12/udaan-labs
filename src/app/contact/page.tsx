import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Udaan Labs. Email hello@udaanlabs.com with what you want to build.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell title="Contact" lede={site.contact.body}>
      <p className="font-mono text-sm">
        <a className="font-bold underline" href={`mailto:${site.contact.email}`}>
          {site.contact.email}
        </a>
      </p>
      <p className="font-mono text-xs text-muted">{site.contact.location}</p>
    </PageShell>
  );
}
