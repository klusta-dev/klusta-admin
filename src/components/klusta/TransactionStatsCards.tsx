"use client";

import React from "react";
import Link from "next/link";
import { DollarLineIcon, BoxCubeIcon, CheckCircleIcon } from "@/icons";
import { useAdminStats } from "@/lib/api/hooks";
import { TransactionStatsSkeleton } from "@/components/ui/skeleton";

type EarningsKey = "total_earnings" | "in_escrow" | "platform_revenue";

const cards: {
  key: string;
  label: string;
  valueKey: EarningsKey;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "total_earnings",
    label: "Total Earnings",
    valueKey: "total_earnings",
    href: "/transactions",
    icon: <DollarLineIcon className="size-6" />,
  },
  {
    key: "in_escrow",
    label: "In Escrow",
    valueKey: "in_escrow",
    href: "/transactions",
    icon: <BoxCubeIcon className="size-6" />,
  },
  {
    key: "platform_revenue",
    label: "Platform Revenue",
    valueKey: "platform_revenue",
    href: "/withdrawals",
    icon: <CheckCircleIcon className="size-6" />,
  },
];

export default function TransactionStatsCards() {
  const { data: apiData, isLoading, isSuccess } = useAdminStats();
  const stats = apiData?.data as Record<string, number> | undefined;

  if (isLoading) return <TransactionStatsSkeleton />;

  const getValue = (valueKey: EarningsKey) => {
    if (isSuccess && stats && typeof stats[valueKey] === "number") {
      return `₦${stats[valueKey].toLocaleString()}`;
    }
    return "₦0";
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
