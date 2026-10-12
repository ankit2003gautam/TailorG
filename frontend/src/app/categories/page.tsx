import Link from "next/link";
import { categories } from "@/lib/sample-data";
import { searchTailors } from "@/lib/tailors";

export const metadata = { title: "Categories — TailorG" };

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">Categories</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = searchTailors({ category: c.slug }).length;
          return (
            <li key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="block rounded-2xl border border-accent bg-surface p-6 hover:bg-accent/20"
              >
                <h2 className="font-semibold text-lg">{c.name}</h2>
                <p className="text-sm text-charcoal/70">{count} {count === 1 ? "tailor" : "tailors"}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}