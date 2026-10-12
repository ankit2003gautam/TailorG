import ExploreClient from "@/components/ExploreClient";

export const metadata = { title: "Explore Tailors — TailorG" };

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "" } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">Explore tailors</h1>
      <ExploreClient key={`${q}|${category}`} initialQ={q} initialCategory={category} />
    </div>
  );
}