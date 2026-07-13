import type { MetadataRoute } from "next";
import { ROOMS, BLOG_POSTS } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://614coliving.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/habitaciones",
    "/reservas",
    "/servicios",
    "/promociones",
    "/blog",
    "/nosotros",
    "/faq",
    "/contacto"
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const roomRoutes = ROOMS.map((room) => ({
    url: `${siteUrl}/habitaciones/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...roomRoutes, ...blogRoutes];
}
