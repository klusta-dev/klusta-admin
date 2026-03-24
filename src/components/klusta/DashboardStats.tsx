"use client";

import React from "react";
import Link from "next/link";
import { UserCircleIcon, BoxCubeIcon, ListIcon, GroupIcon, FolderIcon } from "@/icons";
import { useAdminStats } from "@/lib/api/hooks";
import { formatNumber } from "@/lib/format";

const statCards = [
  { key: "users", label: "Total Regular Users", dataKey: "total_users" as const, href: "/users", icon: <GroupIcon className="size-6" />, bgIcon: "bg-primary-10", textIcon: "text-primary" },
  { key: "active", label: "Active Regular Users", dataKey: "active_users" as const, href: "/users", icon: <UserCircleIcon className="size-6" />, bgIcon: "bg-secondary-10", textIcon: "text-secondary" },
  { key: "amenities", label: "Amenities", dataKey: "total_amenities" as const, href: "/amenities", icon: <BoxCubeIcon className="size-6" />, bgIcon: "bg-primary-10", textIcon: "text-primary" },
  { key: "properties", label: "Properties", dataKey: "total_properties" as const, href: "/properties", icon: <FolderIcon className="size-6" />, bgIcon: "bg-primary-10", textIcon: "text-primary" },
  { key: "categories", label: "Categories", dataKey: "total_categories" as const, href: "/categories", icon: <ListIcon className="size-6" />, bgIcon: "bg-secondary-10", textIcon: "text-secondary" },
];

export default function DashboardStats() {
  const { data: apiData, isLoading, isSuccess } = useAdminStats();

  const getValue = (card: (typeof statCards)[0]) => {
    if (isSuccess && apiData?.data && card.dataKey in apiData.data) {
      const v = (apiData.data as Record<string, number>)[card.dataKey];
      if (typeof v === "number") return String(v);
    }
    return isLoading ? "…" : "0";
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statCards.map((card) => (
        <Link key={card.key} href={card.href}>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.bgIcon} ${card.textIcon}`}>
              {card.icon}
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">{card.label}</span>
              <h4 className="mt-2 font-bold text-typography text-title-sm dark:text-white/90">
                {getValue(card)}
              </h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
