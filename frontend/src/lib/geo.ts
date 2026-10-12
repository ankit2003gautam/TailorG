export interface LatLng {
  lat: number;
  lng: number;
}

/** Great-circle distance in km (haversine formula). */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Manual-location options until a geocoding API is added. */
export const knownAreas: (LatLng & { name: string })[] = [
  { name: "Connaught Place, Delhi", lat: 28.6315, lng: 77.2167 },
  { name: "Dwarka, Delhi", lat: 28.5921, lng: 77.046 },
  { name: "Karol Bagh, Delhi", lat: 28.6519, lng: 77.1909 },
  { name: "Lajpat Nagar, Delhi", lat: 28.5677, lng: 77.2433 },
  { name: "Noida Sector 18", lat: 28.57, lng: 77.3219 },
  { name: "Rajouri Garden, Delhi", lat: 28.6492, lng: 77.1217 },
  { name: "Vasant Kunj, Delhi", lat: 28.52, lng: 77.159 },
];