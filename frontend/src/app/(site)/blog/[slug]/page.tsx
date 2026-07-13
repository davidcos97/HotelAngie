import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { BLOG_POSTS, getPostBySlug } from "@/lib/data";
import ShareButtons from "@/components/blog/ShareButtons";
import CommentsSection from "@/components/blog/CommentsSection";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { images: [{ url: post.coverImage }], type: "article", publishedTime: post.publishedAt }
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://614coliving.com";

  return (
    <article className="pb-24 pt-32">
      <BreadcrumbJsonLd items={[{ name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }]} />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <nav className="mb-6 text-xs text-charcoal-700/60">
          <Link href="/" className="hover:text-gold-700">Inicio</Link> / <Link href="/blog" className="hover:text-gold-700">Blog</Link>
        </nav>

        <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">{post.category}</span>
        <h1 className="section-title mt-2">{post.title}</h1>
        <p className="mt-4 text-sm text-charcoal-700/60">
          Por <span className="font-medium text-charcoal-800">{post.author}</span> · {format(new Date(post.publishedAt), "d 'de' MMMM yyyy", { locale: es })} · {post.readingMinutes} min de lectura
        </p>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl">
          <Image src={post.coverImage} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        </div>

        <div className="prose prose-neutral mt-10 max-w-none text-charcoal-800 prose-headings:font-display prose-a:text-gold-700">
          <p className="text-lg leading-relaxed">{post.excerpt}</p>
          <p className="leading-relaxed">{post.content}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-charcoal-900/5 pt-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-charcoal-900/5 px-3 py-1 text-xs text-charcoal-700">#{tag}</span>
            ))}
          </div>
          <ShareButtons title={post.title} url={`${siteUrl}/blog/${post.slug}`} />
        </div>

        <CommentsSection postSlug={post.slug} />

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-charcoal-950">Artículos relacionados</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={r.coverImage} alt={r.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-charcoal-950 group-hover:text-gold-700">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
