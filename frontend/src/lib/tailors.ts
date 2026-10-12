import { sampleTailors, sampleServices, samplePortfolio } from "@/lib/sample-data";
import { distanceKm, type LatLng } from "@/lib/geo";
import type { Tailor, Service, PortfolioItem } from "@/types/tailor";

export type SortOption = "recommended" | "rating" | "price" | "distance";
export type TailorWithDistance = Tailor & { distanceKm?: number };

export interface TailorFilters {
  q?: string;
  category?: string;
  minRating?: number;
  maxPrice?: number; // 0 or undefined = any
  homeOnly?: boolean;
  sort?: SortOption;
  origin?: LatLng | null;
  radiusKm?: number; // 0 or undefined = any
}

// Business rule: only verified shops appear publicly.
const publicTailors = () => sampleTailors.filter((t) => t.verificationStatus === "verified");

export function searchTailors(f: TailorFilters = {}): TailorWithDistance[] {
  const q = f.q?.trim().toLowerCase();
  let list: TailorWithDistance[] = publicTailors();

  if (q) {
    list = list.filter((t) => {
      const serviceNames = sampleServices.filter((s) => s.tailorId === t.id).map((s) => s.name);
      return [t.shopName, t.area, ...t.specialisations, ...serviceNames]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }
  if (f.category) list = list.filter((t) => t.categories.includes(f.category!));
  if (f.minRating) list = list.filter((t) => t.rating >= f.minRating!);
  if (f.maxPrice) list = list.filter((t) => t.startingPrice <= f.maxPrice!);
  if (f.homeOnly) list = list.filter((t) => t.homeMeasurement);

  if (f.origin) {
    list = list.map((t) => ({ ...t, distanceKm: distanceKm(f.origin!, t) }));
    if (f.radiusKm) list = list.filter((t) => (t.distanceKm ?? Infinity) <= f.radiusKm!);
  }

  const score = (t: Tailor) => t.rating * Math.log(t.reviewCount + 1);
  list.sort((a, b) => {
    switch (f.sort) {
      case "rating":
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      case "price":
        return a.startingPrice - b.startingPrice;
      case "distance":
        return (a.distanceKm ?? 0) - (b.distanceKm ?? 0);
      default:
        return score(b) - score(a);
    }
  });

  return list;
}

export function getTailor(id: string): Tailor | undefined {
  return publicTailors().find((t) => t.id === id);
}

export function getServices(tailorId: string): Service[] {
  return sampleServices.filter((s) => s.tailorId === tailorId);
}

export function getPortfolio(tailorId: string): PortfolioItem[] {
  return samplePortfolio.filter((p) => p.tailorId === tailorId);
}