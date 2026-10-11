import type { Tailor, Category } from "@/types/tailor";

export const categories: Category[] = [
  { slug: "blouse", name: "Blouse Stitching" },
  { slug: "suits", name: "Suits & Sherwanis" },
  { slug: "lehenga", name: "Lehenga" },
  { slug: "kurta", name: "Kurta & Salwar" },
  { slug: "alterations", name: "Alterations" },
  { slug: "kids", name: "Kids Wear" },
];

export const sampleTailors: Tailor[] = [
  { id: "1", shopName: "Stitch & Thread Studio", area: "Lajpat Nagar", rating: 4.7, reviewCount: 128, specialisations: ["Blouse", "Lehenga"], startingPrice: 500 },
  { id: "2", shopName: "Royal Cut Tailors", area: "Karol Bagh", rating: 4.5, reviewCount: 96, specialisations: ["Suits", "Sherwani"], startingPrice: 2500 },
  { id: "3", shopName: "Needle & Co. Boutique", area: "Vasant Kunj", rating: 4.8, reviewCount: 210, specialisations: ["Designer wear", "Bridal"], startingPrice: 1800 },
  { id: "4", shopName: "Quick Fix Alterations", area: "Rajouri Garden", rating: 4.3, reviewCount: 64, specialisations: ["Alterations", "Kurta"], startingPrice: 150 },
];