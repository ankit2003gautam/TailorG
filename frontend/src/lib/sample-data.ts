import type { Tailor, Category, Service, PortfolioItem } from "@/types/tailor";

export const categories: Category[] = [
  { slug: "blouse", name: "Blouse Stitching" },
  { slug: "suits", name: "Suits & Sherwanis" },
  { slug: "lehenga", name: "Lehenga" },
  { slug: "kurta", name: "Kurta & Salwar" },
  { slug: "alterations", name: "Alterations" },
  { slug: "kids", name: "Kids Wear" },
];

export const sampleTailors: Tailor[] = [
  {
    id: "1", shopName: "Stitch & Thread Studio", area: "Lajpat Nagar", city: "New Delhi",
    lat: 28.5677, lng: 77.2433, rating: 4.7, reviewCount: 128,
    specialisations: ["Blouse", "Lehenga"], categories: ["blouse", "lehenga"], startingPrice: 500,
    about: "A family-run studio known for detailed blouse work and festive lehengas, with over 15 years of experience.",
    hours: "Mon–Sat, 10:00 AM – 8:00 PM", homeMeasurement: true, verificationStatus: "verified",
  },
  {
    id: "2", shopName: "Royal Cut Tailors", area: "Karol Bagh", city: "New Delhi",
    lat: 28.6519, lng: 77.1909, rating: 4.5, reviewCount: 96,
    specialisations: ["Suits", "Sherwani"], categories: ["suits", "kurta"], startingPrice: 2500,
    about: "Made-to-measure suits, sherwanis, and formal wear with a focus on clean finishing.",
    hours: "Mon–Sat, 11:00 AM – 9:00 PM", homeMeasurement: false, verificationStatus: "verified",
  },
  {
    id: "3", shopName: "Needle & Co. Boutique", area: "Vasant Kunj", city: "New Delhi",
    lat: 28.52, lng: 77.159, rating: 4.8, reviewCount: 210,
    specialisations: ["Designer wear", "Bridal"], categories: ["lehenga", "blouse", "kids"], startingPrice: 1800,
    about: "A boutique for designer and bridal outfits, offering design consultation and fittings.",
    hours: "Tue–Sun, 10:30 AM – 7:30 PM", homeMeasurement: true, verificationStatus: "verified",
  },
  {
    id: "4", shopName: "Quick Fix Alterations", area: "Rajouri Garden", city: "New Delhi",
    lat: 28.6492, lng: 77.1217, rating: 4.3, reviewCount: 64,
    specialisations: ["Alterations", "Kurta"], categories: ["alterations", "kurta"], startingPrice: 150,
    about: "Fast, affordable alterations and repairs, usually ready within two days.",
    hours: "Mon–Sun, 9:30 AM – 8:30 PM", homeMeasurement: false, verificationStatus: "verified",
  },
  {
    id: "5", shopName: "Little Threads", area: "Dwarka", city: "New Delhi",
    lat: 28.5921, lng: 77.046, rating: 4.6, reviewCount: 52,
    specialisations: ["Kids wear", "Festive"], categories: ["kids", "kurta"], startingPrice: 400,
    about: "Comfortable, durable outfits for children, including festive and school wear.",
    hours: "Mon–Sat, 10:00 AM – 7:00 PM", homeMeasurement: true, verificationStatus: "verified",
  },
  {
    id: "6", shopName: "Sector 18 Stitch House", area: "Sector 18, Noida", city: "Noida",
    lat: 28.57, lng: 77.3219, rating: 4.4, reviewCount: 77,
    specialisations: ["Suits", "Alterations"], categories: ["suits", "alterations"], startingPrice: 300,
    about: "Everyday tailoring and office wear, with quick turnaround on alterations.",
    hours: "Mon–Sat, 10:00 AM – 8:00 PM", homeMeasurement: false, verificationStatus: "verified",
  },
  {
    // Pending shops must NOT appear in public discovery.
    id: "7", shopName: "New Stitch House", area: "Connaught Place", city: "New Delhi",
    lat: 28.6315, lng: 77.2167, rating: 0, reviewCount: 0,
    specialisations: ["Blouse"], categories: ["blouse"], startingPrice: 600,
    about: "Awaiting verification.", hours: "Mon–Sat, 10:00 AM – 7:00 PM",
    homeMeasurement: false, verificationStatus: "pending",
  },
];

// [tailorId, name, categorySlug, price, priceType, durationDays, description]
type ServiceRow = [string, string, string, number, "fixed" | "estimated", number, string];

const serviceRows: ServiceRow[] = [
  ["1", "Basic blouse stitching", "blouse", 500, "fixed", 5, "Plain blouse with lining."],
  ["1", "Designer blouse", "blouse", 1500, "estimated", 10, "Embroidery or custom neck and sleeve designs."],
  ["1", "Lehenga stitching", "lehenga", 4500, "estimated", 21, "Price depends on fabric and work."],
  ["2", "Two-piece suit", "suits", 8000, "estimated", 14, "Made to measure, fabric not included."],
  ["2", "Sherwani", "suits", 12000, "estimated", 20, "Includes one trial fitting."],
  ["2", "Kurta set", "kurta", 2500, "fixed", 7, "Kurta with pyjama or churidar."],
  ["3", "Bridal outfit consultation", "lehenga", 1800, "fixed", 1, "Design discussion and measurements."],
  ["3", "Designer lehenga", "lehenga", 15000, "estimated", 30, "Fully custom design."],
  ["3", "Kids festive outfit", "kids", 2000, "estimated", 10, "Lehenga choli or sherwani for children."],
  ["4", "Hemming", "alterations", 150, "fixed", 2, "Trousers, skirts, and dresses."],
  ["4", "Resizing", "alterations", 350, "estimated", 3, "Taking in or letting out garments."],
  ["4", "Kurta stitching", "kurta", 600, "fixed", 5, "Simple kurta."],
  ["5", "Kids kurta set", "kids", 400, "fixed", 4, "Cotton kurta set."],
  ["5", "School uniform alteration", "kids", 200, "fixed", 2, "Resize and hem."],
  ["5", "Festive kids outfit", "kids", 1200, "estimated", 8, "Designer festive wear."],
  ["6", "Trouser alteration", "alterations", 300, "fixed", 2, "Waist and length adjustments."],
  ["6", "Formal shirt", "suits", 900, "fixed", 6, "Made to measure."],
  ["6", "Blazer", "suits", 4500, "estimated", 12, "Includes lining."],
];

export const sampleServices: Service[] = serviceRows.map(
  ([tailorId, name, categorySlug, indicativePrice, priceType, durationDays, description], i) => ({
    id: `s${i + 1}`, tailorId, name, categorySlug, description, indicativePrice, priceType, durationDays,
  })
);

// [tailorId, caption, tags]
type PortfolioRow = [string, string, string[]];

const portfolioRows: PortfolioRow[] = [
  ["1", "Embroidered bridal blouse", ["blouse", "bridal"]],
  ["1", "Festive lehenga set", ["lehenga"]],
  ["1", "Boat-neck silk blouse", ["blouse"]],
  ["2", "Navy two-piece suit", ["suits"]],
  ["2", "Ivory wedding sherwani", ["suits", "wedding"]],
  ["2", "Linen kurta set", ["kurta"]],
  ["3", "Pastel bridal lehenga", ["lehenga", "bridal"]],
  ["3", "Hand-worked blouse", ["blouse"]],
  ["3", "Girls' festive lehenga", ["kids"]],
  ["4", "Dress hem repair", ["alterations"]],
  ["4", "Jacket resizing", ["alterations"]],
  ["4", "Cotton kurta", ["kurta"]],
  ["5", "Boys' kurta set", ["kids"]],
  ["5", "Festive frock", ["kids"]],
  ["5", "Printed cotton set", ["kids", "kurta"]],
  ["6", "Charcoal blazer", ["suits"]],
  ["6", "Tailored trousers", ["alterations"]],
  ["6", "Formal shirts", ["suits"]],
];

export const samplePortfolio: PortfolioItem[] = portfolioRows.map(([tailorId, caption, tags], i) => ({
  id: `p${i + 1}`, tailorId, caption, tags,
}));