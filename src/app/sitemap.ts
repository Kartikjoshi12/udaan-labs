import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/saas",
    "/web-apps",
    "/mobile-apps",
    "/custom-software",
    "/projects",
    "/services",
    "/contact",
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-10-07"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
