import type { Review } from "@/types";
import StarRating from "./StarRating";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="card-elevated flex h-full flex-col p-6">
      <StarRating rating={review.rating} size={16} />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-700/85">&ldquo;{review.comment}&rdquo;</p>
      <div className="mt-5 flex items-center justify-between border-t border-charcoal-900/5 pt-4">
        <div>
          <p className="text-sm font-semibold text-charcoal-950">{review.name}</p>
          {review.roomName && <p className="text-xs text-charcoal-700/60">{review.roomName}</p>}
        </div>
        <span className="text-xs text-charcoal-700/50">{format(new Date(review.date), "MMM yyyy", { locale: es })}</span>
      </div>
    </div>
  );
}
