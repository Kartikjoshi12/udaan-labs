import type { Metadata } from "next";
import { OfferPage } from "@/components/seo/OfferPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SaaS product development",
  description:
    "Udaan Labs makes SaaS products: accounts, billing, and a web app people can log into. From idea to a working product.",
  alternates: { canonical: "/saas" },
};

export default function SaasPage() {
  const project = site.projects[1];
  return (
    <OfferPage
      title="SaaS product development"
      lede="We make SaaS products. You get a web app with accounts, a clear job for the user, and a build you can ship."
      points={[
        {
          heading: "What we make",
          body: "Multi-tenant web apps, customer accounts, and the screens a product needs on day one. We leave out the features that can wait.",
        },
        {
          heading: "How a build runs",
          body: "We name the user and the job, cut a first version, and ship a working build you can click through. Billing and permissions land when the product needs them.",
        },
      ]}
      project={project}
    />
  );
}
