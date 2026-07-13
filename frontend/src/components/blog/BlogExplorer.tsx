"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import type { BlogPost } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const categories = ["Todas", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = category === "Todas" || p.category === category;
      const matchesQuery = `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-700/40" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos..."
            className="w-full rounded-full border border-charcoal-900/10 py-3 pl-10 pr-4 text-sm outline-none focus:border-gold-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                category === cat ? "border-gold-600 bg-gold-gradient text-charcoal-950" : "border-charcoal-900/10 text-charcoal-700 hover:border-gold-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-charcoal-700/60">No encontramos artículos con esa búsqueda.</p>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="card-elevated group block overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={post.coverImage} alt={post.title} fill loading="lazy" sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">{post.category}</span>
                <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-charcoal-950 group-hover:text-gold-700">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-charcoal-700/70">{post.excerpt}</p>
                <p className="mt-3 text-xs text-charcoal-700/50">
                  {post.author} · {format(new Date(post.publishedAt), "d MMM yyyy", { locale: es })} · {post.readingMinutes} min
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
