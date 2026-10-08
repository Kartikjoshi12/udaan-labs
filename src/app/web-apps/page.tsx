import type { Metadata } from "next";
import { OfferPage } from "@/components/seo/OfferPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web application development",
  description:
    "Udaan Labs builds web applications: portals, dashboards, and business platforms. Northline is one we shipped.",
  alternates: { canonical: "/web-apps" },
};

export default function WebAppsPage() {
  return (
    <OfferPage
      title="Web application development"
      lede="We build web apps for businesses: portals, dashboards, and catalogs that load fast and match the way the team works."
      points={[
        {
          heading: "What we make",
          body: "Customer portals, internal dashboards, and brand sites with a real purchasing or account flow. Next.js when it fits. A simpler stack when it does not.",
        },
        {
          heading: "How a build runs",
          body: "We map the screens, build them in short passes, and put a working version in front of you before the project goes quiet.",
        },
      ]}
      project={site.projects[1]}
    />
  );
}
