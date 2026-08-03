import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.ti2026calculator.com/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    }
  ];
}
