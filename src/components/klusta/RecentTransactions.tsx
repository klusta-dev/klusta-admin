"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon, DollarLineIcon } from "@/icons";
import { useAdminBookings } from "@/lib/api/hooks";
import { RecentTransactionsSkeleton } from "@/components/ui/skeleton";

export default function RecentTransactions() {
  const { data, isLoading } = useAdminBookings({ page: 1, limit: 6 });
  const bookings = data?.data?.bookings ?? [];

  if (isLoading) return <RecentTransactionsSkeleton />;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="border-b border-gray-100 px-5 py-4 dark:border-white/5 md:px-6">
        <h2 className="text-base font-semibold text-typography dark:text-white/90">Recent Bookings</h2>
        <p className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400">Latest booking activity</p>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-white/5">
        {!isLoading && bookings.length === 0 && (
          <div className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400 md:px-6">
            No recent bookings
          </div>
        )}
        {bookings.map((booking) => (
          <Link
            key={booking.id}
            href="/transactions"
            className="block transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <div className="flex items-start gap-3 px-5 py-4 md:px-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-10 text-primary">
                <DollarLineIcon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-theme-sm font-medium text-typography dark:text-white/90">
                  {booking.guest_name} booked {booking.property_name}
                </p>
                <p className="mt-0.5 text-theme-xs text-gray-500 dark:text-gray-400">
                  ₦{booking.total_amount.toLocaleString()} • {booking.booking_status} • {booking.escrow_status}
                </p>
              </div>
              <span className="shrink-0 text-primary dark:text-primary-50">
                <ArrowRightIcon className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
