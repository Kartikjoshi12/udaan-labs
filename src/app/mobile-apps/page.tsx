import type { Metadata } from "next";
import { OfferPage } from "@/components/seo/OfferPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mobile app development",
  description:
    "Udaan Labs builds mobile apps for iOS and Android. LiftFit is a workout tracker we shipped.",
  alternates: { canonical: "/mobile-apps" },
};

export default function MobileAppsPage() {
  return (
    <OfferPage
      title="Mobile app development"
      lede="We build mobile apps for iOS and Android. The app does one job well, and it still works when the network is bad."
      points={[
        {
          heading: "What we make",
          body: "Cross-platform apps with Flutter or React Native, and native screens when the product needs them. Plans, logs, and tools people open every day.",
        },
        {
          heading: "How a build runs",
          body: "We pick the first screens, ship a build you can install, and add the rest only after that version is in use.",
        },
      ]}
      project={site.projects[0]}
    />
  );
}
