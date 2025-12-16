import { site } from "@/lib/site";

export default function sitemap() {
  return [
    {
      url: `https://${site.domain}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
