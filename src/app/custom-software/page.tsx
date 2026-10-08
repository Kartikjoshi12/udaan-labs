import type { Metadata } from "next";
import { OfferPage } from "@/components/seo/OfferPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom software development",
  description:
    "Udaan Labs builds custom software: internal tools, ops dashboards, and systems around your workflow. Harbor Desk is one we shipped.",
  alternates: { canonical: "/custom-software" },
};

export default function CustomSoftwarePage() {
  return (
    <OfferPage
      title="Custom software development"
      lede="We build custom software around a real workflow. Internal tools, dispatch boards, and systems your team uses on the floor."
      points={[
        {
          heading: "What we make",
          body: "Operations dashboards, inventory and order tools, and software that replaces a spreadsheet or a chain of manual steps.",
        },
        {
          heading: "How a build runs",
          body: "We sit with the workflow first. Then we build the smallest system that removes the slow part, and extend it after people are using it.",
        },
      ]}
      project={site.projects[2]}
    />
  );
}
