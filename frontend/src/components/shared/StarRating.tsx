import { Star } from "lucide-react";

export default function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Calificación ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i && rating < i + 1;
        return (
          <span key={i} className="relative inline-block text-gold-500">
            <Star size={size} className="text-charcoal-900/10" fill="currentColor" />
            {(filled || half) && (
              <Star
                size={size}
                className="absolute inset-0 text-gold-500"
                fill="currentColor"
                style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
