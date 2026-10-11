import Image from "next/image";
import Link from "next/link";
import TailorCard from "@/components/TailorCard";
import { categories, sampleTailors } from "@/lib/sample-data";

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:py-14 md:grid-cols-2 md:gap-8 md:py-20">
          <div className="text-center md:text-left">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-medium text-primary">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              Made for your neighbourhood
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">
              Your Style.
              <br />
              Our Stitch.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-charcoal/80 sm:text-lg md:mx-0">
              Discover trusted local tailors and boutiques, browse their work, and book an appointment in minutes.
            </p>
            <form action="/explore" className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row md:mx-0">
              <label htmlFor="q" className="sr-only">Search tailors or services</label>
              <input
                id="q"
                name="q"
                placeholder="Search blouse, suit, alterations…"
                className="min-w-0 flex-1 rounded-full border border-charcoal/20 px-5 py-3"
              />
              <button type="submit" className="rounded-full bg-primary px-6 py-3 text-white hover:opacity-90">
                Search
              </button>
            </form>
          </div>

          <div className="relative mx-auto aspect-4/3 w-full max-w-xl overflow-hidden rounded-3xl bg-cream p-3 shadow-sm sm:p-5 md:aspect-5/4">
            <Image
              src="/sewing-machine.svg"
              alt="An animated illustration of a sewing machine stitching fabric"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-contain p-2 sm:p-4"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-surface/90 px-4 py-2 text-xs font-medium text-primary shadow-sm sm:bottom-6 sm:left-6 sm:text-sm">
              Craftsmanship, close to home
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Browse by category</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="block rounded-xl border border-accent bg-surface p-4 text-center font-medium hover:bg-accent/20"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Featured tailors</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sampleTailors.map((t) => (
            <TailorCard key={t.id} tailor={t} />
          ))}
        </div>
      </section>
    </>
  );
}