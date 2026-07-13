import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/data";
import BlogExplorer from "@/components/blog/BlogExplorer";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Historias, guías de viaje y vida de comunidad desde 6/14 Co-Living en Medellín.",
  alternates: { canonical: "/blog" }
};

export default function BlogPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Blog" title="Historias desde 6/14" description="Guías, comunidad y vida de nómada digital en Medellín." />
        <div className="mt-12">
          <BlogExplorer posts={BLOG_POSTS} />
        </div>
      </div>
    </div>
  );
}
