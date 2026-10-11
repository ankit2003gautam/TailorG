export interface Tailor {
  id: string;
  shopName: string;
  area: string;
  rating: number;
  reviewCount: number;
  specialisations: string[];
  startingPrice: number; // indicative, INR
}

export interface Category {
  slug: string;
  name: string;
}