import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import TailorCard from "@/components/TailorCard";
import { categories } from "@/lib/sample-data";
import { searchTailors } from "@/lib/tailors";

export default function CategoryResultsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="mx-auto max-w-6xl px-4 py-10">Loading category…</p>}>
      <CategoryResultsContent params={params} />
    </Suspense>
  );
}

async function CategoryResultsContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const tailors = searchTailors({ category: slug, sort: "rating" });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">{category.name}</h1>
      <p className="mt-1 mb-6 text-charcoal/70">
        {tailors.length} {tailors.length === 1 ? "tailor" : "tailors"} ·{" "}
        <Link href={`/explore?category=${slug}`} className="text-primary underline">
          Filter by price, rating and location
        </Link>
      </p>
      {tailors.length === 0 ? (
        <p>No tailors in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tailors.map((t) => (
            <TailorCard key={t.id} tailor={t} />
          ))}
        </div>
      )}
    </div>
  );
}