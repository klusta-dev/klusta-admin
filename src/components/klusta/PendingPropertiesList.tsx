"use client";

import React from "react";
import { usePropertyList } from "@/lib/api/hooks";
import { mapApiPropertyToDisplay } from "@/lib/api/types";
import PropertiesTable from "@/components/klusta/PropertiesTable";
import type { PropertyDisplay } from "@/lib/api/types";

const MOCK_PENDING_PROPERTIES: PropertyDisplay[] = [
  {
    id: "pending-1",
    title: "Skyline Loft",
    city: "Lagos",
    status: "pending",
    price: "₦95,000/night",
    image: "/images/user/user-17.jpg",
    images: ["/images/user/user-17.jpg"],
    categoryName: "Apartments",
    createdAt: "2026-02-22",
    address: "12 Bourdillon Rd",
    slug: "skyline-loft",
  },
  {
    id: "pending-2",
    title: "Coral Bay Villa",
    city: "Abuja",
    status: "pending",
    price: "₦180,000/night",
    image: "/images/user/user-18.jpg",
    images: ["/images/user/user-18.jpg"],
    categoryName: "Villas",
    createdAt: "2026-02-21",
    address: "7 Crescent View",
    slug: "coral-bay-villa",
  },
];

export default function PendingPropertiesList() {
  const { data, isLoading, isError } = usePropertyList({ page_size: 100 });
  const raw = data?.data as { properties?: unknown[] } | unknown[] | undefined;
  const list = Array.isArray(raw) ? raw : raw?.properties ?? [];
  const pending = list
    .map((p) => mapApiPropertyToDisplay(p as Parameters<typeof mapApiPropertyToDisplay>[0]))
    .filter((p) => p.status === "pending");

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-theme-sm text-gray-500 dark:border-gray-800 dark:bg-white/3 dark:text-gray-400">
        Loading pending properties...
      </div>
    );
  }

  if (isError) {
    return <PropertiesTable properties={MOCK_PENDING_PROPERTIES} />;
  }

  return <PropertiesTable properties={pending.length > 0 ? pending : MOCK_PENDING_PROPERTIES} />;
}
