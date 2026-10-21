import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Category range card.
 *
 * image -> badge -> title + count -> description -> divider -> Explore Range
 *
 * Fixed 280px width so every card in a row is identical. The body is a
 * flex column with the CTA pinned to the bottom via `mt-auto`, so the
 * "Explore Range" row lines up across all cards regardless of how many
 * lines the title or description take.
 *
 * Works as a router Link when `to` is given, otherwise as a plain button
 * driven by `onClick`.
 */
export default function CategoryRangeCard({
  title,
  subtitle,
  image,
  badge,
  count,
  to,
  onClick,
  className = "",
}) {
  const shell =
    "group flex h-full w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-white text-left transition-colors hover:border-primary";

  const body = (
    <>
      {/* Image — category assets are portrait packshots, so they are shown
          whole on a light plate rather than cropped. */}
      <div className="relative flex h-[220px] w-full shrink-0 items-center justify-center bg-bg-light p-4">
        <img
          src={image || "/images/product-placeholder.webp"}
          alt={title}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
          style={{ mixBlendMode: "multiply" }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
        />
        {badge && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-text shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title + count: fixed 2-line block so every card lines up */}
        <div className="flex min-h-[56px] items-baseline justify-between gap-2">
          <h3 className="line-clamp-2 min-w-0 text-lg font-semibold leading-snug text-text group-hover:text-primary transition-colors">
            {title}
          </h3>
          {count > 0 && (
            <span className="shrink-0 text-sm font-medium text-text-light">
              {count} {count === 1 ? "Product" : "Products"}
            </span>
          )}
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-light">
          {subtitle}
        </p>

        {/* CTA pinned to the bottom of every card */}
        <div className="mt-auto pt-4">
          <div className="divider mb-4" />
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Explore Range
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${shell} ${className}`}>
        {body}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${shell} cursor-pointer ${className}`}
    >
      {body}
    </button>
  );
}
