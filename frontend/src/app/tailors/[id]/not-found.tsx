import Link from "next/link";

export default function TailorNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">Tailor not found</h1>
      <p className="mt-2 text-charcoal/70">This shop doesn&apos;t exist or isn&apos;t available yet.</p>
      <Link href="/explore" className="mt-6 inline-block rounded-full bg-primary px-5 py-2 text-white">
        Back to explore
      </Link>
    </div>
  );
}