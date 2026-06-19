"use client";

import React, { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";
import { useAdminUsers } from "@/lib/api/hooks";
import { TableBodySkeleton } from "@/components/ui/skeleton";

function formatAccountType(raw: string | undefined | null): string {
  const t = (raw ?? "").toUpperCase();
  if (t === "ADMIN") return "Admin";
  if (t === "CLIENT") return "Client";
  if (t === "MERCHANT" || t === "HOST") return "Merchant";
  return raw ?? "—";
}

const PAGE_SIZE = 20;

export default function HomeOwnersOverview() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const { data, isLoading, isError } = useAdminUsers({ limit: PAGE_SIZE, offset });
  const allUsers = data?.data?.users ?? [];
  const total = data?.data?.total ?? 0;
  console.log(allUsers, "users")

  const displayUsers = allUsers.filter((u) => {
    const type = ((u.account_type ?? (u as Record<string, unknown>).accountType ?? "") as string).toUpperCase();
    return type === "MERCHANT" || type === "HOST";
  });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="overflow-x-auto no-scrollbar">
        <table className="min-w-full">
          <thead className="border-b border-gray-100 dark:border-white/5">
            <tr>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Name
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Email
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Account Type
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Joined
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {isLoading && <TableBodySkeleton cols={6} rows={6} />}
            {isError && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-theme-sm text-error-600 dark:text-error-400">
                  Failed to load home owners.
                </td>
              </tr>
            )}
            {!isLoading && !isError && displayUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                  No home owners found.
                </td>
              </tr>
            )}
            {displayUsers.map((owner) => {
              const name =
                [owner.first_name, owner.last_name].filter(Boolean).join(" ") ||
                owner.email?.split("@")[0] ||
                "—";
              return (
                <tr key={owner.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90">
                    <Link href={`/home-owners/${owner.id}`} className="text-primary hover:underline">
                      {name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                    {owner.email}
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                    {formatAccountType(owner.account_type)}
                  </td>
                  <td className="px-5 py-4">
                    <Badge size="sm" color={owner.emailVerifiedAt ?? owner.email_verified_at ? "success" : "error"}>
                      {owner.emailVerifiedAt ?? owner.email_verified_at ? "Verified" : "Unverified"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                    {owner.created_at ? new Date(owner.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/home-owners/${owner.id}`}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 dark:border-white/5">
        <p className="text-theme-sm text-gray-500 dark:text-gray-400">
          {total === 0
            ? "No home owners"
            : `Showing ${offset + 1}–${Math.min(offset + PAGE_SIZE, total)} of ${total}`}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
          >
            Previous
          </button>
          <span className="text-theme-sm text-gray-600 dark:text-gray-400">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
