import BrandMark from "@/components/BrandMark";
import CopyrightYear from "@/components/CopyrightYear";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl font-bold">
            <BrandMark className="h-7 w-7" />
            TailorG
          </p>
          <p className="text-white/80">Your Style. Our Stitch.</p>
        </div>
        <p className="text-sm text-white/70 md:text-right">
          <CopyrightYear />
        </p>
      </div>
    </footer>
  );
}