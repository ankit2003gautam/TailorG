export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 31h27M11 31V18h5v-5h11c4 0 6 2 6 6v12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 18h12c2 0 3 1 3 3v2H16v-5ZM21 13V8h7l4 5M26 23v5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="27" r="2" stroke="currentColor" strokeWidth="2.2" />
      <path d="M8 35h26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
