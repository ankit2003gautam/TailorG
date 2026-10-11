"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export default function CopyrightYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => "",
  );

  return <>© {year ? `${year} ` : ""}TailorG. All rights reserved.</>;
}
