"use client";

import React from "react";
import { usePropertyList } from "@/lib/api/hooks";
import { mapApiPropertyToDisplay } from "@/lib/api/types";
import PropertiesTable from "@/components/klusta/PropertiesTable";
import type { PropertyDisplay } from "@/lib/api/types";
import { PropertyGridSkeleton } from "@/components/ui/skeleton";

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
  const { data, isLoading, isError } = usePropertyList({ page: 1, limit: 100 });
  const raw = data?.data as { properties?: unknown[]; data?: unknown[] } | unknown[] | undefined;
  const list = Array.isArray(raw) ? raw : (raw?.properties ?? raw?.data ?? []);
  const pending = list
    .map((p) => mapApiPropertyToDisplay(p as Parameters<typeof mapApiPropertyToDisplay>[0]))
    .filter((p) => p.status === "pending");

  if (isLoading) return <PropertyGridSkeleton count={4} />;

  if (isError) {
    return <PropertiesTable properties={MOCK_PENDING_PROPERTIES} />;
  }

  return <PropertiesTable properties={pending.length > 0 ? pending : MOCK_PENDING_PROPERTIES} />;
}
