"use client";

import React from "react";
import Link from "next/link";
import { DollarLineIcon, BoxCubeIcon, CheckCircleIcon } from "@/icons";
import { useAdminStats } from "@/lib/api/hooks";

const cards = [
  {
    key: "bookings",
    label: "Total Transactions",
    valueKey: "bookings" as const,
    href: "/transactions",
    icon: <BoxCubeIcon className="size-6" />,
  },
  {
    key: "earnings",
    label: "Total Earnings",
    valueKey: "earnings" as const,
    href: "/transactions",
    icon: <DollarLineIcon className="size-6" />,
  },
  {
    key: "withdrawals",
    label: "Total Withdrawals",
    valueKey: "withdrawals" as const,
    href: "/transactions",
    icon: <CheckCircleIcon className="size-6" />,
  },
];

export default function TransactionStatsCards() {
  const { data: apiData, isLoading, isSuccess } = useAdminStats();
  const stats = apiData?.data as Record<string, number> | undefined;

  const getValue = (valueKey: (typeof cards)[number]["valueKey"]) => {
    if (isSuccess && stats && typeof stats[valueKey] === "number") {
      const value = stats[valueKey];
      if (valueKey === "earnings" || valueKey === "withdrawals") {
        return `₦${value.toLocaleString()}`;
      }
      return value.toLocaleString();
    }
    if (isLoading) return "…";
    return valueKey === "earnings" || valueKey === "withdrawals" ? "₦0" : "0";
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.key}
          href={card.href}
          className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-theme-md dark:border-gray-800 dark:bg-white/3 md:p-6"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-10 text-primary">
              {card.icon}
            </span>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
              <h4 className="mt-1 font-bold text-typography text-title-sm dark:text-white/90">
                {getValue(card.valueKey)}
              </h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
