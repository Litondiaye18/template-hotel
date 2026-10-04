import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { rooms } from "@/data/rooms";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/chambres",
    "/services",
    "/galerie",
    "/a-propos",
    "/reservation",
    "/contact",
    ...rooms.map((room) => `/chambres/${room.slug}`),
  ];
  const lastModified = new Date();

  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
  }));
}
