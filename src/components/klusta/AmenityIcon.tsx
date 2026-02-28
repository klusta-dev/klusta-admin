"use client";

import React from "react";

const icons: Record<string, React.ReactNode> = {
  Gym: (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5h11v11h-11z" />
      <path d="M12 3v4M12 17v4M9 6H6V3M18 6h3V3M9 18H6v3M18 18h3v3" />
    </svg>
  ),
  TV: (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" />
      <path d="M17 2l-5 5-5-5" />
    </svg>
  ),
  Wifi: (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8 16a6 6 0 0 1 8 0" />
      <path d="M12 19h.01" />
    </svg>
  ),
  "Air Conditioning": (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M8 8h8M8 12h8M8 16h8" />
    </svg>
  ),
  AC: (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M8 8h8M8 12h8M8 16h8" />
    </svg>
  ),
  Pool: (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  ),
  Heater: (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M12 6v12M8 10v4M16 10v4M6 14v-4M18 14v-4" />
    </svg>
  ),
  Parking: (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 8h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9V8z" />
    </svg>
  ),
};

interface AmenityIconProps {
  name: string;
  className?: string;
}

export default function AmenityIcon({ name, className = "" }: AmenityIconProps) {
  const icon = icons[name] ?? (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
  return <span className={className}>{icon}</span>;
}
