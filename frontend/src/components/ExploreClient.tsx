"use client";

import { useMemo, useState } from "react";
import TailorCard from "@/components/TailorCard";
import { categories } from "@/lib/sample-data";
import { knownAreas, type LatLng } from "@/lib/geo";
import { searchTailors, type SortOption } from "@/lib/tailors";

const field = "w-full rounded-lg border border-charcoal/20 bg-surface px-3 py-2";

export default function ExploreClient({
  initialQ = "",
  initialCategory = "",
}: {
  initialQ?: string;
  initialCategory?: string;
}) {
  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [homeOnly, setHomeOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [originLabel, setOriginLabel] = useState("");
  const [radiusKm, setRadiusKm] = useState(0);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "error">("idle");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(
    () => searchTailors({ q, category, minRating, maxPrice, homeOnly, sort, origin, radiusKm }),
    [q, category, minRating, maxPrice, homeOnly, sort, origin, radiusKm]
  );

  function useMyLocation() {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setOriginLabel("Your current location");
        setSort("distance");
        setGeoStatus("idle");
      },
      () => setGeoStatus("error"),
      { timeout: 10000 }
    );
  }

  function chooseArea(name: string) {
    const area = knownAreas.find((a) => a.name === name);
    if (area) {
      setOrigin({ lat: area.lat, lng: area.lng });
      setOriginLabel(area.name);
      setSort("distance");
    } else {
      clearLocation();
    }
    setGeoStatus("idle");
  }

  function clearLocation() {
    setOrigin(null);
    setOriginLabel("");
    setRadiusKm(0);
    if (sort === "distance") setSort("recommended");
  }

  function resetAll() {
    setQ("");
    setCategory("");
    setMinRating(0);
    setMaxPrice(0);
    setHomeOnly(false);
    setSort("recommended");
    clearLocation();
    setGeoStatus("idle");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div>
        <button
          type="button"
          className="lg:hidden mb-4 w-full rounded-lg border border-primary px-4 py-2 text-primary"
          aria-expanded={showFilters}
          aria-controls="filters"
          onClick={() => setShowFilters((s) => !s)}
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>

        <aside
          id="filters"
          aria-label="Filters"
          className={`${showFilters ? "block" : "hidden"} lg:block space-y-5 rounded-2xl bg-surface p-5 border border-charcoal/5`}
        >
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-1">Search</label>
            <input
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Shop, service, or area"
              className={field}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium mb-1">Location</legend>
            <label htmlFor="area" className="sr-only">Choose an area</label>
            <select
              id="area"
              value={knownAreas.some((a) => a.name === originLabel) ? originLabel : ""}
              onChange={(e) => chooseArea(e.target.value)}
              className={field}
            >
              <option value="">Select an area</option>
              {knownAreas.map((a) => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={useMyLocation}
              disabled={geoStatus === "loading"}
              className="w-full rounded-lg border border-primary px-3 py-2 text-sm text-primary hover:bg-primary/5 disabled:opacity-60"
            >
              {geoStatus === "loading" ? "Locating…" : "Use my current location"}
            </button>
            {geoStatus === "error" && (
              <p role="alert" className="text-sm text-red-700">
                Couldn&apos;t get your location. Please choose an area above instead.
              </p>
            )}
            {origin && (
              <p className="text-sm text-charcoal/70">
                Near: <strong>{originLabel}</strong>{" "}
                <button type="button" onClick={clearLocation} className="text-primary underline">Clear</button>
              </p>
            )}
            <label htmlFor="radius" className="block text-sm">Within</label>
            <select
              id="radius"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              disabled={!origin}
              className={`${field} disabled:opacity-50`}
            >
              <option value={0}>Any distance</option>
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
            </select>
          </fieldset>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-1">Minimum rating</label>
            <select id="rating" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className={field}>
              <option value={0}>Any</option>
              <option value={4}>4.0 and above</option>
              <option value={4.5}>4.5 and above</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">Starting price up to</label>
            <select id="price" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className={field}>
              <option value={0}>Any</option>
              <option value={500}>₹500</option>
              <option value={1000}>₹1,000</option>
              <option value={2500}>₹2,500</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={homeOnly} onChange={(e) => setHomeOnly(e.target.checked)} />
            Offers home measurement
          </label>

          <button type="button" onClick={resetAll} className="text-sm text-primary underline">
            Reset all filters
          </button>
        </aside>
      </div>

      <section aria-label="Results">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-charcoal/80">
            {results.length} {results.length === 1 ? "tailor" : "tailors"} found
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-charcoal/20 bg-surface px-3 py-2"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Rating</option>
              <option value="price">Price: low to high</option>
              <option value="distance" disabled={!origin}>Distance</option>
            </select>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl bg-surface p-10 text-center border border-charcoal/5">
            <p className="font-medium">No tailors match your filters.</p>
            <p className="mt-1 text-charcoal/70">Try widening the distance or removing a filter.</p>
            <button type="button" onClick={resetAll} className="mt-4 rounded-full bg-primary px-5 py-2 text-white">
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((t) => (
              <TailorCard key={t.id} tailor={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}