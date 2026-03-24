"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon, DollarLineIcon } from "@/icons";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  createdAt: string;
  href?: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "rtx-1",
    description: "Carla George paid for Ocean View Suite",
    amount: 85000,
    createdAt: "2026-02-28T08:10:00Z",
    href: "/transactions",
  },
  {
    id: "rtx-2",
    description: "Withdrawal processed for Bliss Rowland",
    amount: 320000,
    createdAt: "2026-02-28T06:40:00Z",
    href: "/home-owners",
  },
  {
    id: "rtx-3",
    description: "Kaiya George payment pending verification",
    amount: 45000,
    createdAt: "2026-02-27T20:15:00Z",
    href: "/transactions",
  },
  {
    id: "rtx-4",
    description: "Refund issued for Backpacker Hostel booking",
    amount: 8500,
    createdAt: "2026-02-27T16:05:00Z",
    href: "/transactions",
  },
];

function formatTimeAgo(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function RecentTransactions() {
  const items = TRANSACTIONS.slice(0, 8);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="border-b border-gray-100 px-5 py-4 dark:border-white/5 md:px-6">
        <h2 className="text-base font-semibold text-typography dark:text-white/90">
          Recent transactions
        </h2>
        <p className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400">
          Latest transaction updates
        </p>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-white/5">
        {items.length === 0 ? (
          <div className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400 md:px-6">
            No recent transactions
          </div>
        ) : (
          items.map((txn) => {
            const content = (
              <div className="flex items-start gap-3 px-5 py-4 md:px-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-10 text-primary">
                  <DollarLineIcon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-theme-sm font-medium text-typography dark:text-white/90">
                    {txn.description}
                  </p>
                  <p className="mt-0.5 text-theme-xs text-gray-500 dark:text-gray-400">
                    ₦{txn.amount.toLocaleString()} • {formatTimeAgo(txn.createdAt)}
                  </p>
                </div>
                {txn.href && (
                  <span className="shrink-0 text-primary dark:text-primary-50">
                    <ArrowRightIcon className="size-4" />
                  </span>
                )}
              </div>
            );

            if (!txn.href) return <div key={txn.id}>{content}</div>;
            return (
              <Link
                key={txn.id}
                href={txn.href}
                className="block transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
              >
                {content}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
