"use client";

import Link from "next/link";
import { useState } from "react";
import BrandMark from "@/components/BrandMark";

const links = [
  { href: "/explore", label: "Explore Tailors" },
  { href: "/categories", label: "Categories" },
  { href: "/login", label: "Login" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-charcoal/10 sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-primary">
          <BrandMark className="h-8 w-8" />
          TailorG
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-primary">{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/register" className="rounded-full bg-primary px-5 py-2 text-white hover:opacity-90">
              Sign up
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="md:hidden border-t border-charcoal/10 px-4 py-3 space-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block py-1">{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/register" onClick={() => setOpen(false)} className="block rounded-full bg-primary px-5 py-2 text-center text-white">
              Sign up
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}