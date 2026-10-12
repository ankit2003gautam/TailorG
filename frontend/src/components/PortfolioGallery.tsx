"use client";

import { useMemo, useState } from "react";
import type { PortfolioItem } from "@/types/tailor";

const gradients = [
  "from-primary to-accent",
  "from-accent to-primary",
  "from-primary to-charcoal",
  "from-charcoal to-accent",
];

export default function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const [tag, setTag] = useState("all");
  const tags = useMemo(() => Array.from(new Set(items.flatMap((i) => i.tags))), [items]);
  const visible = tag === "all" ? items : items.filter((i) => i.tags.includes(tag));

  if (items.length === 0) {
    return <p className="text-charcoal/70">This shop hasn&apos;t added portfolio items yet.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter portfolio by tag">
        {["all", ...tags].map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={`rounded-full px-4 py-1 text-sm border ${
              tag === t ? "bg-primary text-white border-primary" : "bg-surface border-charcoal/20"
            }`}
          >
            {t === "all" ? "All" : t}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {visible.map((item, i) => (
          <li key={item.id}>
            <figure>
              {/* Placeholder tile. Replaced by a real <Image> once Cloudinary uploads exist. */}
              <div
                className={`aspect-[4/5] rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]}`}
                aria-hidden="true"
              />
              <figcaption className="mt-2 text-sm">{item.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}