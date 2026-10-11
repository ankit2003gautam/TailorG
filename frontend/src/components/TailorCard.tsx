import Link from "next/link";
import type { Tailor } from "@/types/tailor";

export default function TailorCard({ tailor }: { tailor: Tailor }) {
  const initials = tailor.shopName
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <article className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-charcoal/5 hover:shadow-md transition">
      <div
        className="h-40 flex items-center justify-center bg-gradient-to-br from-primary to-accent text-white font-display text-4xl"
        aria-hidden="true"
      >
        {initials}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{tailor.shopName}</h3>
        <p className="text-sm text-charcoal/70">{tailor.area}</p>
        <p className="text-sm">
          <span aria-hidden="true">★</span> {tailor.rating}{" "}
          <span className="text-charcoal/60">({tailor.reviewCount} reviews)</span>
        </p>
        <ul className="flex flex-wrap gap-2">
          {tailor.specialisations.map((s) => (
            <li key={s} className="text-xs rounded-full bg-cream px-3 py-1">{s}</li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm">From <strong>₹{tailor.startingPrice}</strong> <span className="text-charcoal/60">(est.)</span></p>
          <Link href={`/tailors/${tailor.id}`} className="text-sm font-medium text-primary hover:underline">
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}