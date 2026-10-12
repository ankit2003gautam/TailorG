import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortfolioGallery from "@/components/PortfolioGallery";
import { getPortfolio, getServices, getTailor } from "@/lib/tailors";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tailor = getTailor(id);
  return { title: tailor ? `${tailor.shopName} — TailorG` : "Tailor not found — TailorG" };
}

export default function TailorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p className="mx-auto max-w-6xl px-4 py-10">Loading tailor profile…</p>}>
      <TailorProfileContent params={params} />
    </Suspense>
  );
}

async function TailorProfileContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tailor = getTailor(id);
  if (!tailor) notFound();

  const services = getServices(tailor.id);
  const portfolio = getPortfolio(tailor.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-charcoal/70">
        <Link href="/explore" className="hover:underline">Explore</Link> / {tailor.shopName}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <header>
            <div
              className="mb-6 h-48 rounded-2xl bg-linear-to-br from-primary to-accent"
              aria-hidden="true"
            />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">{tailor.shopName}</h1>
            <p className="mt-1 text-charcoal/70">{tailor.area}, {tailor.city}</p>
            <p className="mt-2">
              <span aria-hidden="true">★</span> {tailor.rating}{" "}
              <span className="text-charcoal/60">({tailor.reviewCount} reviews)</span>
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              <li className="rounded-full bg-accent/25 px-3 py-1 text-xs">Verified</li>
              {tailor.homeMeasurement && (
                <li className="rounded-full bg-accent/25 px-3 py-1 text-xs">Home measurement available</li>
              )}
              {tailor.specialisations.map((s) => (
                <li key={s} className="rounded-full bg-surface border border-charcoal/10 px-3 py-1 text-xs">{s}</li>
              ))}
            </ul>
          </header>

          <section aria-labelledby="about">
            <h2 id="about" className="font-display text-2xl font-bold mb-2">About</h2>
            <p className="text-charcoal/90">{tailor.about}</p>
            <p className="mt-2 text-sm text-charcoal/70">Hours: {tailor.hours}</p>
          </section>

          <section aria-labelledby="services">
            <h2 id="services" className="font-display text-2xl font-bold mb-4">Services</h2>
            {services.length === 0 ? (
              <p className="text-charcoal/70">No services listed yet.</p>
            ) : (
              <ul className="space-y-3">
                {services.map((s) => (
                  <li
                    key={s.id}
                    className="flex flex-col gap-3 rounded-xl bg-surface p-4 border border-charcoal/5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{s.name}</h3>
                      <p className="text-sm text-charcoal/70">{s.description}</p>
                      <p className="mt-1 text-sm">
                        ₹{s.indicativePrice.toLocaleString("en-IN")}{" "}
                        <span className="text-charcoal/60">
                          ({s.priceType === "fixed" ? "fixed price" : "estimated"}) · about {s.durationDays}{" "}
                          {s.durationDays === 1 ? "day" : "days"}
                        </span>
                      </p>
                    </div>
                    <Link
                      href={`/tailors/${tailor.id}/book?service=${s.id}`}
                      className="shrink-0 rounded-full border border-primary px-4 py-2 text-center text-sm text-primary hover:bg-primary hover:text-white"
                    >
                      Select
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="portfolio">
            <h2 id="portfolio" className="font-display text-2xl font-bold mb-4">Portfolio</h2>
            <PortfolioGallery items={portfolio} />
          </section>

          <section aria-labelledby="reviews">
            <h2 id="reviews" className="font-display text-2xl font-bold mb-2">Reviews</h2>
            <p className="text-charcoal/70">
              Reviews from completed bookings will appear here once booking and reviews are built.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl bg-surface p-5 border border-charcoal/5 space-y-3">
          <p className="text-sm text-charcoal/70">Starting from</p>
          <p className="text-2xl font-bold">
            ₹{tailor.startingPrice.toLocaleString("en-IN")} <span className="text-sm font-normal text-charcoal/60">(est.)</span>
          </p>
          <Link
            href={`/tailors/${tailor.id}/book`}
            className="block rounded-full bg-primary px-5 py-3 text-center text-white hover:opacity-90"
          >
            Request appointment
          </Link>
          <p className="text-xs text-charcoal/60">
            You won&apos;t be charged. The tailor confirms availability and the final price.
          </p>
        </aside>
      </div>
    </div>
  );
}