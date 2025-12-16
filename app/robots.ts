import { site } from "@/lib/site";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `https://${site.domain}/sitemap.xml`,
    host: `https://${site.domain}`
  };
}
