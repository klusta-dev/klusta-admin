"use client";

import React from "react";
import Link from "next/link";
import { HOME_OWNERS } from "@/lib/mock/home-owners";

export default function HomeOwnersOverview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-100 dark:border-white/5">
            <tr>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Home Owner
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Transactions
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Last Withdrawal
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Properties
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {HOME_OWNERS.map((owner) => (
              <tr key={owner.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90">
                  <Link href={`/home-owners/${owner.id}`} className="text-primary hover:underline">
                    {owner.name}
                  </Link>
                </td>
                <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                  {owner.transactions}
                </td>
                <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                  {owner.lastWithdrawal ?? "—"}
                </td>
                <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                  {owner.properties.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {HOME_OWNERS.length === 0 && (
        <div className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
          No home owners found.
        </div>
      )}
    </div>
  );
}
