import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://www.ti2026calculator.com/sitemap.xml",
    host: "https://www.ti2026calculator.com"
  };
}
