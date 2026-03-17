"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";
import { ListIcon, TableIcon } from "@/icons";
import PropertiesTable from "@/components/klusta/PropertiesTable";
import { usePropertyList } from "@/lib/api/hooks";
import { mapApiPropertyToDisplay, type PropertyDisplay } from "@/lib/api/types";

const statusColor: Record<string, "success" | "warning" | "error"> = {
  listed: "success",
  pending: "warning",
  unlisted: "error",
};

const LocationPin = () => (
  <svg className="size-4 shrink-0 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="size-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 5h14M3 10h14M3 15h6" strokeLinecap="round" />
    <circle cx="14" cy="5" r="1.5" fill="currentColor" />
    <circle cx="14" cy="10" r="1.5" fill="currentColor" />
    <circle cx="8" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const SearchIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
  </svg>
);

const CITIES = ["All locations", "Abuja", "Lagos", "Calabar"];
const FILTER_CHIPS = [
  { id: "all", label: "All" },
  { id: "listed", label: "Listed" },
  { id: "pending", label: "Pending" },
  { id: "unlisted", label: "Unlisted" },
] as const;

export default function PropertyListingCards() {
  const { data, isLoading, isError, error } = usePropertyList({ page_size: 50, page_id: 1 });
  const [viewMode, setViewMode] = useState<"listings" | "table">("listings");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [filter, setFilter] = useState<"all" | "listed" | "pending" | "unlisted">("all");

  // const { data, isLoading, isError, error } = usePropertyList({
  //   page_size: 10,
  //   page_id: 1,
  //   search: search.trim() || undefined,
  // });

  const raw = data?.data as { properties?: unknown[] } | unknown[] | undefined;
  const list = Array.isArray(raw) ? raw : raw?.properties ?? [];
  const allItems: PropertyDisplay[] = list.map((p) =>
    mapApiPropertyToDisplay(p as Parameters<typeof mapApiPropertyToDisplay>[0])
  );

  const filtered = useMemo(() => {
    let result = allItems;
    if (location !== "All locations") result = result.filter((p) => p.city === location);
    if (filter !== "all") result = result.filter((p) => p.status === filter);
    return result;
  }, [allItems, location, filter]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-typography dark:text-white/90 md:text-3xl">Welcome to Klusta</h1>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">Book your accommodations and sail smoothly.</p>
        </div>
        <div className="flex items-center justify-center py-16 text-theme-sm text-gray-500 dark:text-gray-400">
          Loading properties…
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-typography dark:text-white/90 md:text-3xl">Welcome to Klusta</h1>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">Book your accommodations and sail smoothly.</p>
        </div>
        <p className="text-theme-sm text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load properties."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-typography dark:text-white/90 md:text-3xl">Welcome to Klusta</h1>
        <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">Book your accommodations and sail smoothly.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder="Search for apartment"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-theme-sm text-typography placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary bg-primary-10 text-primary dark:border-primary dark:bg-primary/20 dark:text-primary-50"
            aria-label="Filter"
          >
            <FilterIcon />
          </button>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-theme-sm text-typography focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="hidden rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800 sm:flex">
            <button
              type="button"
              onClick={() => setViewMode("listings")}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-theme-sm font-medium transition-colors ${viewMode === "listings" ? "bg-white text-primary shadow-theme-xs dark:bg-gray-900 dark:text-primary-50" : "text-gray-600 dark:text-gray-400"
                }`}
            >
              <ListIcon className="size-4" />
              Listings
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-theme-sm font-medium transition-colors ${viewMode === "table" ? "bg-white text-primary shadow-theme-xs dark:bg-gray-900 dark:text-primary-50" : "text-gray-600 dark:text-gray-400"
                }`}
            >
              <TableIcon className="size-4" />
              Table
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setFilter(chip.id)}
            className={`rounded-lg border px-4 py-2.5 text-theme-sm font-medium transition-colors ${filter === chip.id
              ? "border-primary bg-primary text-white dark:bg-primary dark:text-white"
              : "border-primary bg-transparent text-primary hover:bg-primary-10 dark:text-primary-50 dark:hover:bg-primary/20"
              }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {viewMode === "table" ? (
        <PropertiesTable properties={filtered} />
      ) : (
        <section>
          {isLoading && (
            <p className="py-8 text-center text-theme-sm text-gray-500 dark:text-gray-400">
              Loading properties...
            </p>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((property) => (
              <PropertyLargeCard key={property.id} property={property} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
              No properties match your filters.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

function PropertyLargeCard({ property }: { property: PropertyDisplay }) {
  const imgSrc = property.images?.[0] ?? property.image;
  return (
    <Link
      href={`/properties/${property.id}`}
      className="flex min-w-[280px] max-w-[340px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-sm transition-shadow hover:shadow-theme-md dark:border-gray-800 dark:bg-white/3"
    >
      <div className="relative aspect-[4/3] bg-gray-200 dark:bg-gray-700">
        {imgSrc ? (
          <Image src={imgSrc} alt={property.title} fill className="object-cover" sizes="340px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-gray-400">—</div>
        )}
        <div className="absolute left-3 top-3">
          <span className="rounded-lg bg-white/90 px-2 py-1 text-theme-xs font-medium text-typography dark:bg-gray-900/90 dark:text-white/90">
            {property.categoryName}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <Badge size="sm" color={statusColor[property.status] ?? "success"}>
            {property.status}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-semibold text-typography dark:text-white/90">{property.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-theme-sm text-gray-500 dark:text-gray-400">
          <LocationPin />
          {property.city}
          {property.distance && ` (${property.distance})`}
        </p>
        {(property.rating != null || property.reviewCount != null) && (
          <p className="mt-1.5 flex items-center gap-1.5 text-theme-sm text-gray-600 dark:text-gray-300">
            <StarIcon />
            {property.rating ?? "—"} ({(property.reviewCount ?? 0) >= 1000 ? `${((property.reviewCount ?? 0) / 1000).toFixed(1)}k` : property.reviewCount} reviews)
          </p>
        )}
        <p className="mt-2 font-semibold text-primary text-theme-sm dark:text-primary-50">{property.price}</p>
      </div>
    </Link>
  );
}
