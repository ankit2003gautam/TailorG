export interface Category {
  slug: string;
  name: string;
}

export interface Tailor {
  id: string;
  shopName: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  specialisations: string[];
  categories: string[]; // category slugs
  startingPrice: number; // indicative, INR
  about: string;
  hours: string;
  homeMeasurement: boolean;
  verificationStatus: "verified" | "pending" | "rejected";
}

export interface Service {
  id: string;
  tailorId: string;
  name: string;
  categorySlug: string;
  description: string;
  indicativePrice: number;
  priceType: "fixed" | "estimated";
  durationDays: number;
}

export interface PortfolioItem {
  id: string;
  tailorId: string;
  caption: string;
  tags: string[];
}