"use client";

import React from "react";
import Link from "next/link";
import { UserCircleIcon, BoxCubeIcon, ListIcon, GroupIcon, FolderIcon, DollarLineIcon } from "@/icons";
import { useAdminStats } from "@/lib/api/hooks";
import { StatCardsSkeleton } from "@/components/ui/skeleton";

type StatKey =
  | "total_users"
  | "total_properties"
  | "total_bookings"
  | "pending_withdrawal_count";

const statCards: {
  key: string;
  label: string;
  dataKey: StatKey;
  href: string;
  icon: React.ReactNode;
  bgIcon: string;
  textIcon: string;
}[] = [
  {
    key: "users",
    label: "Total Users",
    dataKey: "total_users",
    href: "/users",
    icon: <GroupIcon className="size-6" />,
    bgIcon: "bg-primary-10",
    textIcon: "text-primary",
  },
  {
    key: "properties",
    label: "Properties",
    dataKey: "total_properties",
    href: "/properties",
    icon: <FolderIcon className="size-6" />,
    bgIcon: "bg-secondary-10",
    textIcon: "text-secondary",
  },
  {
    key: "bookings",
    label: "Total Bookings",
    dataKey: "total_bookings",
    href: "/transactions",
    icon: <BoxCubeIcon className="size-6" />,
    bgIcon: "bg-primary-10",
    textIcon: "text-primary",
  },
  {
    key: "pending_withdrawals",
    label: "Pending Withdrawals",
    dataKey: "pending_withdrawal_count",
    href: "/withdrawals",
    icon: <ListIcon className="size-6" />,
    bgIcon: "bg-secondary-10",
    textIcon: "text-secondary",
  },
];

export default function DashboardStats() {
  const { data: apiData, isLoading, isSuccess } = useAdminStats();

  if (isLoading) return <StatCardsSkeleton count={4} />;

  const getValue = (dataKey: StatKey) => {
    if (isSuccess && apiData?.data && dataKey in apiData.data) {
      const v = (apiData.data as Record<string, number>)[dataKey];
      if (typeof v === "number") return v.toLocaleString();
    }
    return "0";
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => (
        <Link key={card.key} href={card.href}>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.bgIcon} ${card.textIcon}`}
            >
              {card.icon}
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">{card.label}</span>
              <h4 className="mt-2 font-bold text-typography text-title-sm dark:text-white/90">
                {getValue(card.dataKey)}
              </h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
