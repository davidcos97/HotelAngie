import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function BlogPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Blog" title="Historias desde 6/14" description="Guías, comunidad y vida de nómada digital." />
          <Link href="/blog" className="btn-outline">
            Ver todo el blog
          </Link>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {BLOG_POSTS.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="card-elevated group block overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">{post.category}</span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-charcoal-950 group-hover:text-gold-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-charcoal-700/60">
                    {format(new Date(post.publishedAt), "d MMM yyyy", { locale: es })} · {post.readingMinutes} min de lectura
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
