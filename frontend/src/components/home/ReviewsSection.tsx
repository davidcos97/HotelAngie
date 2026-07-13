import { REVIEWS } from "@/lib/data";
import ReviewCard from "@/components/shared/ReviewCard";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";
import StarRating from "@/components/shared/StarRating";
import ReviewForm from "@/components/shared/ReviewForm";

export default function ReviewsSection() {
  const average = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Opiniones" title="Lo que dice nuestra comunidad" />
          <div className="flex items-center gap-3 rounded-2xl border border-charcoal-900/5 bg-white px-5 py-3 shadow-soft">
            <span className="font-display text-3xl font-semibold text-charcoal-950">{average}</span>
            <div>
              <StarRating rating={Number(average)} />
              <p className="text-xs text-charcoal-700/60">{REVIEWS.length}+ reseñas · Google Reviews</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
            {REVIEWS.slice(0, 4).map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 0.1}>
                <ReviewCard review={review} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2}>
            <ReviewForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
